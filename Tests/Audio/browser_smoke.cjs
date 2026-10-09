// Deep (manual), one bounded Web transport/DSP integration check.
// NODE_PATH=/path/to/node_modules CHROME_PATH=/path/to/chrome node Tests/Audio/browser_smoke.cjs
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs'),assert=require('node:assert/strict');
const port=4174;
function wav(){
  const n=48000*3,b=Buffer.alloc(44+n*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);
  b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);
  b.writeUInt32LE(48000,24);b.writeUInt32LE(96000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);
  b.write('data',36);b.writeUInt32LE(n*2,40);
  for(let i=0;i<n;i++)b.writeInt16LE(Math.round(8000*(Math.sin(2*Math.PI*1000*i/48000)+Math.sin(2*Math.PI*8000*i/48000))),44+i*2);
  return b;
}
(async()=>{
 const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1'],{stdio:'ignore'});
 let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROME_PATH,args:['--no-sandbox','--disable-dev-shm-usage','--no-zygote','--autoplay-policy=no-user-gesture-required'],headless:true});
  const page=await browser.newPage({viewport:{width:1499,height:807}}),errors=[];
  page.setDefaultTimeout(7000);
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/Web/App/`);
  await page.waitForFunction(()=>window.__geometryAudit);
  assert.equal(await page.evaluate(()=>window.__geometryAudit.ok),true);
  await page.locator('#audioFile').setInputFiles({name:'dsp-smoke.wav',mimeType:'audio/wav',buffer:wav()});
  await page.waitForFunction(()=>document.querySelector('#stateStatus').textContent.includes('AUDIO LOADED'),{},{timeout:15000});
  await page.locator('#loopToggle').check();await page.locator('#playBtn').click();
  await page.waitForFunction(()=>document.querySelector('#audioElement').currentTime>0.3);
  const read=()=>page.evaluate(()=>({input:Number(document.querySelector('#rmsInValue').textContent),output:Number(document.querySelector('#rmsOutValue').textContent)}));
  const wet=await read();assert(Number.isFinite(wet.output)&&wet.output<-3);
  await page.locator('#globalBypass').click();await page.waitForTimeout(400);
  const bypass=await read();assert(Math.abs(bypass.input-bypass.output)<0.6,JSON.stringify(bypass));
  assert(wet.output<bypass.output-2,JSON.stringify({wet,bypass}));
  await page.locator('#globalBypass').click();
  await page.locator('[data-edit="TRANSMISSION"]').click();
  await page.locator('[data-param="bandwidthLoss"]').evaluate(e=>{e.value=100;e.dispatchEvent(new Event('input',{bubbles:true}));});
  await page.locator('[data-param="badSignal"]').evaluate(e=>{e.value=100;e.dispatchEvent(new Event('input',{bubbles:true}));});
  await page.waitForTimeout(400);const changed=await read();assert(changed.output<wet.output-1,JSON.stringify({wet,changed}));
  await page.locator('#advancedCloseBtn').click();
  await page.locator('#playBtn').click();assert.equal(await page.locator('#audioElement').evaluate(e=>e.paused),true);
  const paused=await page.locator('#audioElement').evaluate(e=>e.currentTime);await page.waitForTimeout(100);
  assert.equal(await page.locator('#audioElement').evaluate(e=>e.currentTime),paused);
  await page.locator('#playBtn').click();await page.waitForFunction(()=>!document.querySelector('#audioElement').paused);
  await page.locator('#stopBtn').click();assert.equal(await page.locator('#audioElement').evaluate(e=>e.currentTime),0);
  await page.locator('[data-ui="UI_02"]').click();await page.waitForFunction(()=>window.__geometryAudit.ui==='UI_02');
  assert.equal(await page.evaluate(()=>window.__geometryAudit.ok),true);
  assert.equal(await page.locator('#presetSelect option').count(),75);
  await page.locator('#presetSelect').selectOption({index:1});
  await page.locator('#playBtn').click();await page.waitForFunction(()=>document.querySelector('#audioElement').currentTime>0.1);
  await page.locator('#stopBtn').click();
  // Validate the real AudioWorklet in OfflineAudioContext, without speakers.
  const offline=await page.evaluate(async()=>{
    const {createSceneNode}=await import('./audio/engine.js');
    const context=new OfflineAudioContext(2,4800,48000);
    const state={params:{sourceCharacter:100,badSignal:50,bandwidthLoss:0,inputGain:0,mix:100,outputGain:0},selection:{SOURCE:'SRC_003_Smartphone_Speakerphone',TRANSMISSION:'TRN_003_PSTN_Landline'},bypass:{},globalBypass:false};
    const node=await createSceneNode(context,state),src=context.createBufferSource();
    src.buffer=context.createBuffer(2,4800,48000);
    for(let c=0;c<2;c++)for(let i=0;i<4800;i++)src.buffer.getChannelData(c)[i]=Math.sin(2*Math.PI*8000*i/48000)*0.3*(c?0.5:1);
    src.connect(node);node.connect(context.destination);src.start();
    const rendered=await context.startRendering();let energy=0,error=0;
    for(let i=1000;i<4800;i++){const l=rendered.getChannelData(0)[i],r=rendered.getChannelData(1)[i];energy+=l*l;error=Math.max(error,Math.abs(r-l*0.5));}
    return {rms:Math.sqrt(energy/3800),stereoError:error};
  });
  // A narrowband voice path must attenuate 8 kHz by at least 20 dB.
  const attenuationDb=20*Math.log10(offline.rms/(0.3/Math.sqrt(2)));
  assert(offline.rms>0&&attenuationDb < -20,JSON.stringify({offline,attenuationDb}));assert(offline.stereoError<1e-6);
  assert.deepEqual(errors,[]);
  if(process.env.SMOKE_SCREENSHOT)await page.screenshot({path:process.env.SMOKE_SCREENSHOT});
  console.log(JSON.stringify({result:'PASS',browser:await browser.version(),wet,bypass,changed,offline,transport:'load/play/pause/resume/stop/loop',geometry:'UI_01 + UI_02',factoryPresets:74,errors},null,2));
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
