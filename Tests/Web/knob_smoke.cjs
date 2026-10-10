// One-shot real Chromium knob interaction check used by existing Web Preview.
// No new CI tier, repeated runs or changes to approved UI geometry.
const assert=require("node:assert/strict");
async function auditKnobs(page,ui){
  const selector='[data-macro="badSignal"]';
  const value=()=>page.$eval(selector,e=>Number(e.value));
  const before=await value();
  const box=await page.$eval(selector,e=>{
    const r=e.getBoundingClientRect();
    return {x:r.left+r.width/2,y:r.top+r.height/2,width:r.width,height:r.height,display:getComputedStyle(e).display,faceWidth:e.parentElement.querySelector('.macro-knob-face')?.getBoundingClientRect().width};
  });
  assert(box.width>10&&box.height>10,ui+" BAD SIGNAL hit area missing: "+JSON.stringify(box));
  await page.mouse.move(box.x,box.y);
  await page.mouse.down();
  await page.mouse.move(box.x,box.y-40,{steps:5});
  await page.mouse.up();
  const dragged=await value();
  assert(dragged>before,ui+" vertical drag did not change the control");
  // The previous drag ends above the face; hover again before testing wheel.
  await page.mouse.move(box.x,box.y);
  await page.mouse.wheel({deltaY:120});
  const scrolled=await value();
  assert.equal(scrolled,dragged-1,ui+" wheel must move one schema step");
  await page.keyboard.press("ArrowUp");
  const keyed=await value();
  assert.equal(keyed,dragged,ui+" keyboard adjustment differs from wheel");
  await page.$eval(".macro-badsignal h3",e=>e.click());
  const advanced=await page.$eval('[data-param="badSignal"]',e=>Number(e.value));
  assert.equal(advanced,keyed,ui+" macro/Advanced state not shared");
  await page.$eval("#advancedCloseBtn",e=>e.click());
  await page.$eval("#undoBtn",e=>e.click());
  const undid=await value();
  assert.equal(undid,scrolled,ui+" undo did not restore last knob step");
  await page.$eval("#redoBtn",e=>e.click());
  const redid=await value();
  assert.equal(redid,keyed,ui+" redo did not restore knob step");
  for(let i=0;i<3;i++)await page.$eval("#undoBtn",e=>e.click());
  const restored=await value();
  assert.equal(restored,before,ui+" baseline not restored after three knob changes");
  let ambience=null;
  if(ui==="UI_02"){
    const amb='[data-macro="ambience"]';
    const first=await page.$eval(amb,e=>Number(e.value));
    const track=await page.$eval(amb,e=>{
      const r=e.getBoundingClientRect();
      return {x:r.left+r.width*.8,y:r.top+r.height/2,width:r.width};
    });
    assert(track.width>20,"UI_02 exposed ambience slider not visible");
    await page.mouse.click(track.x,track.y);
    const changed=await page.$eval(amb,e=>Number(e.value));
    assert(changed>first,"UI_02 ambience horizontal track did not change");
    await page.$eval("#undoBtn",e=>e.click());
    const reverted=await page.$eval(amb,e=>Number(e.value));
    assert.equal(reverted,first,"UI_02 ambience native-slider history missing");
    ambience={first,changed,reverted};
  }
  const allVisible=await auditAllVisibleRoundKnobs(page,ui);
  const dialogs=await auditCompactAdvanced(page,ui);
  const motion=ui==="UI_02"?await auditUi02MotionSmallKnobs(page):[];
  const knobValues=await auditRefKnobValueComposition(page,ui);
  const hpf=await auditHpf(page,ui);
  const eq=await auditMiniEq(page,ui);
  const eqMouse=await auditEqMouseGestures(page,ui);
  return {ok:true,ui,before,dragged,scrolled,keyed,advanced,undid,redid,restored,ambience,allVisible,dialogs,motion,knobValues,hpf,eq,eqMouse};
}

// Verify every rendered main-screen round knob, not only BAD SIGNAL.
// Operate the exact face centre and check that no detail window opens.
async function auditAllVisibleRoundKnobs(page,ui){
  // A painted CSS circle does not prove the actual approved knob bitmap loaded.
  const art=await page.evaluate(async()=>{
    const face=document.querySelector('.macro-badsignal .macro-knob-face');
    const background=face&&getComputedStyle(face).backgroundImage;
    const url=background&&background.match(/url\(["']?([^"')]+)/)?.[1];
    if(!url)return {loaded:false,reason:'no knob image URL',background};
    const img=new Image();
    img.src=url;
    try{await img.decode();return {loaded:img.naturalWidth>0,width:img.naturalWidth,height:img.naturalHeight,url};}
    catch(e){return {loaded:false,url,error:String(e)};}
  });
  assert(art.loaded,ui+" approved knob bitmap unavailable: "+JSON.stringify(art));
  const ids=await page.evaluate(()=>{
    return [...document.querySelectorAll('.macro-knob > input.macro-knob-range')]
      .filter(input=>{
        const el=input.closest('.macro-knob'),r=input.getBoundingClientRect();
        const style=getComputedStyle(input);
        return style.display!=="none"&&r.width>12&&r.height>12&&
          style.opacity==="0"&&!!el.querySelector('.macro-knob-face')&&
          r.left>=0&&r.right<=window.innerWidth&&r.top>=0&&r.bottom<=window.innerHeight;
      }).map(el=>el.dataset.macro);
  });
  assert(ids.length>=(ui==="UI_01"?8:4),ui+" missing expected round controls: "+ids);
  const changed=[];
  for(const id of ids){
    const selector='[data-macro="'+id+'"]';
    const geom=await page.$eval(selector,el=>{
      const r=el.getBoundingClientRect(),f=el.closest('.macro-knob').querySelector('.macro-knob-face').getBoundingClientRect();
      const x=r.x+r.width/2,y=r.y+r.height/2;
      return {x,y,width:r.width,height:r.height,
        faceWidth:f.width,faceHeight:f.height,
        centreError:Math.hypot(x-(f.x+f.width/2),y-(f.y+f.height/2)),
        directlyHits:document.elementFromPoint(x,y)===el,
        old:Number(el.value),min:Number(el.min),max:Number(el.max)};
    });
    assert(geom.directlyHits,ui+" "+id+" cannot be clicked on its face: "+JSON.stringify(geom));
    assert(geom.centreError<3,ui+" "+id+" actual control displaced from artwork: "+JSON.stringify(geom));
    assert(Math.abs(geom.width-geom.faceWidth)<4,ui+" "+id+" face/control dimensions differ");
    const move=geom.old>geom.min+(geom.max-geom.min)*.85?24:-24;
    await page.mouse.move(geom.x,geom.y);
    await page.mouse.down();
    await page.mouse.move(geom.x,geom.y+move,{steps:4});
    await page.mouse.up();
    const current=await page.$eval(selector,el=>Number(el.value));
    assert.notEqual(current,geom.old,ui+" "+id+" cannot change by dragging");
    assert.equal(await page.$eval('body',e=>e.classList.contains('advanced-open')),false,
      ui+" "+id+" drag accidentally opened Advanced");
    await page.$eval('#undoBtn',el=>el.click());
    assert.equal(await page.$eval(selector,el=>Number(el.value)),geom.old,
      ui+" "+id+" undo does not restore its initial value");
    changed.push({id,before:geom.old,dragged:current,hit:geom.directlyHits,alignment:geom.centreError});
  }
  return changed;
}
async function auditCompactAdvanced(page,ui){
  const isOpen=()=>page.$eval('body',e=>e.classList.contains('advanced-open'));
  // Use pointer, not DOM click: heading must be accessible without activating a knob.
  await page.click('.macro-intelligibility h3');
  assert.equal(await isOpen(),true,ui+" Advanced did not open from card heading");
  const small=await page.$eval('.advanced-drawer',e=>{
    const r=e.getBoundingClientRect();
    return {width:r.width,height:r.height,parent:e.parentElement.tagName,cols:e.style.getPropertyValue('--advanced-cols')};
  });
  assert.equal(small.parent,'BODY',ui+" Advanced must escape scaled plugin shell");
  assert(small.width<550,ui+" few-control dialog is unnecessarily wide");
  assert(small.height<700,ui+" small dialog should not fill the entire page");
  // Actual click on real backdrop outside dialog must dismiss and keep focus behaviour.
  await page.mouse.click(4,4);
  assert.equal(await isOpen(),false,ui+" outside click did not dismiss dialog");
  await page.click('.macro-badsignal h3');
  const medium=await page.$eval('.advanced-drawer',e=>{
    const r=e.getBoundingClientRect();
    return {width:r.width,height:r.height};
  });
  assert(medium.width>small.width,ui+" dialog must grow for more controls");
  await page.keyboard.press('Escape');
  assert.equal(await isOpen(),false,ui+" ESC should close Advanced");
  await page.click('.macro-eq h3');
  const large=await page.$eval('.advanced-drawer',e=>{
    const r=e.getBoundingClientRect();
    return {width:r.width,height:r.height,viewportHeight:innerHeight};
  });
  assert(large.width>medium.width,ui+" dense EQ dialog should be wider");
  assert(large.height<=large.viewportHeight*.83+1,ui+" dialog must fit browser height");
  await page.click('#advancedCloseBtn');
  assert.equal(await isOpen(),false,ui+" close control no longer works");
  return {small,medium,large,outsideDismiss:true,escapeDismiss:true};
}

// UI_02's three small scene-view metal dials are outside the bottom macro strip.
// They must work from the real pointer target, without opening Advanced.
async function auditUi02MotionSmallKnobs(page){
  const results=[];
  for(const id of ['speed','doppler','width']){
    const selector='[data-motion-adjust="'+id+'"]';
    const geom=await page.$eval(selector,el=>{
      const r=el.getBoundingClientRect();
      return {x:r.x+r.width/2,y:r.y+r.height/2,width:r.width,height:r.height,
        start:Number(el.getAttribute('aria-valuenow')),art:getComputedStyle(el).backgroundImage};
    });
    assert(geom.width>40&&geom.height>40, id+' small motion knob absent');
    assert(geom.art.includes('RT_KNOB_S_BASE.png'),id+' approved small knob image not bound');
    await page.mouse.move(geom.x,geom.y);
    await page.mouse.down();
    await page.mouse.move(geom.x,geom.y-24,{steps:4});
    await page.mouse.up();
    const after=await page.$eval(selector,el=>Number(el.getAttribute('aria-valuenow')));
    assert(after>geom.start,id+' real scene knob drag failed');
    assert.equal(await page.$eval('body',e=>e.classList.contains('advanced-open')),false,
      id+' scene knob drag opened Advanced unexpectedly');
    await page.mouse.move(geom.x,geom.y);
    await page.mouse.wheel({deltaY:120});
    const wheel=await page.$eval(selector,el=>Number(el.getAttribute('aria-valuenow')));
    assert.equal(wheel,after-1,id+' scene knob wheel step wrong');
    await page.keyboard.press('ArrowUp');
    const keyed=await page.$eval(selector,el=>Number(el.getAttribute('aria-valuenow')));
    assert.equal(keyed,after,id+' scene knob keyboard step wrong');
    for(let i=0;i<3;i++)await page.$eval('#undoBtn',el=>el.click());
    const restored=await page.$eval(selector,el=>Number(el.getAttribute('aria-valuenow')));
    assert.equal(restored,geom.start,id+' scene knob undo did not recover baseline');
    results.push({id,before:geom.start,dragged:after,wheel,keyed,restored,art:'RT_KNOB_S_BASE.png'});
  }
  return results;
}
// REF numeric appearance must stay linked to live DOM values, not a picture.
async function auditRefKnobValueComposition(page,ui){
  const result=await page.evaluate(ui=>{
    const data={};
    const ids=ui==="UI_01"?["speed","doppler","width","badSignal","condition","intelligibility","ambience","mix"]:
      ["badSignal","condition","intelligibility","mix"];
    for(const id of ids){
      const control=document.querySelector('[data-macro="'+id+'"]');
      const knob=control?.closest('.macro-knob');
      const face=knob?.querySelector('.macro-knob-face');
      const value=knob?.querySelector('.macro-knob-value');
      const label=knob?.querySelector('.macro-knob-label');
      if(!control||!face||!value)continue;
      const f=face.getBoundingClientRect(),v=value.getBoundingClientRect(),c=knob.closest('.macro').getBoundingClientRect();
      const hidden=getComputedStyle(value).visibility==="hidden";
      data[id]={valueText:value.textContent,controlValue:control.value,hidden,
        faceDiameter:parseFloat(getComputedStyle(face).width),labelAbove:label?label.getBoundingClientRect().bottom<=f.top+3:null,
        valueBelow:v.top>=f.bottom-2,valueRight:v.left>=f.right+6,
        insideCard:v.right<=c.right+1&&v.bottom<=c.bottom+1,
        faceLeft:f.left,faceTop:f.top};
    }
    return data;
  },ui);
  const ids=Object.keys(result),expected=ui==="UI_01"?8:4;
  assert.equal(ids.length,expected,ui+" numeric/knob controls not all present");
  for(const [id,x] of Object.entries(result)){
    assert(x.valueText.startsWith(String(x.controlValue)),ui+" "+id+" displayed value not live");
    if(ui==="UI_01"){
      assert(x.labelAbove,ui+" "+id+" REF label must be above its metal face");
      assert(x.valueBelow,ui+" "+id+" REF numeric value must be below its face");
    }else if(id==="condition")assert(x.hidden,ui+" condition uses its Used selector, not a duplicate percent readout");
    else if(id==="mix")assert(x.valueBelow,ui+" MIX value belongs below its face");
    else assert(x.valueRight,ui+" "+id+" numeric value belongs beside its face");
    if(!(ui==="UI_02"&&id==="condition"))
      assert(x.insideCard,ui+" "+id+" live numeric text clipped by its card: "+JSON.stringify(x));
  }
  if(ui==="UI_01"){
    for(const id of ["speed","doppler","width"])assert(Math.abs(result[id].faceDiameter-43)<1,
      "UI_01 approved scan uses small 41–44px dial for "+id);
  }else{
    for(const id of ids)assert(Math.abs(result[id].faceDiameter-76)<1,
      "UI_02 approved bottom metal dial uses 76px for "+id);
  }
  return {ok:true,values:result};
}

// Same existing one-shot Web Preview Chrome smoke, no extra CI tier.
async function auditHpf(page,ui){
  const selector='[data-eq-hpf]';
  const box=await page.$eval(selector,e=>{
    const r=e.getBoundingClientRect();
    return {x:r.left+r.width/2,y:r.top+r.height/2,w:r.width,h:r.height};
  });
  assert(box.w>45&&box.h>0,ui+" bottom EQ HPF control is not visible");
  const init=await page.$eval(selector,e=>Number(e.value));
  assert.equal(init,20,ui+" untouched HPF default must be neutral/OFF");
  await page.$eval(selector,e=>e.focus());
  await page.keyboard.press('ArrowRight');
  const changed=await page.$eval(selector,e=>Number(e.value));
  assert.equal(changed,21,ui+" real keyboard did not change HPF cutoff");
  assert.equal(await page.$eval('[data-eq-hpf-value]',e=>e.textContent.trim()),'21 Hz');
  const points=await page.$eval('[data-eq-hpf-path]',e=>e.getAttribute('d'));
  assert(points!=='M0 50H100',ui+" HPF curve did not update");
  await page.click('.macro-eq h3');
  assert.equal(await page.$eval('[data-param="hpf"]',e=>Number(e.value)),21,
    ui+" Advanced HPF does not reflect main-control state");
  await page.click('#advancedCloseBtn');
  await page.$eval('#undoBtn',e=>e.click());
  assert.equal(await page.$eval(selector,e=>Number(e.value)),20,ui+" HPF Undo failed");
  await page.$eval('#redoBtn',e=>e.click());
  assert.equal(await page.$eval(selector,e=>Number(e.value)),21,ui+" HPF Redo failed");
  await page.$eval('#undoBtn',e=>e.click());
  // Test actual real shared C++ WASM filter, not merely state/visual updates.
  const audio=await page.evaluate(async()=>{
    const response=await fetch('./audio/hpf.wasm');
    if(!response.ok)throw new Error('HPF WASM HTTP '+response.status);
    const exp=new WebAssembly.Instance(new WebAssembly.Module(await response.arrayBuffer()),
      {env:{sinf:Math.sin,cosf:Math.cos}}).exports;
    if(exp.sr_hpf_version()!==1)throw new Error('invalid HPF ABI');
    exp.sr_hpf_prepare(48000);
    exp.sr_hpf_set(240,1);
    exp.sr_hpf_reset();
    const a=new Float32Array(exp.memory.buffer,exp.sr_hpf_buffer(0),128);
    const b=new Float32Array(exp.memory.buffer,exp.sr_hpf_buffer(1),128);
    const rms=f=>{
      exp.sr_hpf_reset();let sum=0;
      for(let j=0;j<375;j++){
        for(let i=0;i<128;i++){const v=.25*Math.sin(2*Math.PI*f*(j*128+i)/48000);a[i]=b[i]=v;}
        exp.sr_hpf_process(128);
        if(j>=188)for(let i=0;i<128;i++)sum+=a[i]*a[i];
      }
      return Math.sqrt(sum/(187*128));
    };
    const low=rms(40),high=rms(4000);
    const attenuation=20*Math.log10(low/high);
    exp.sr_hpf_set(20,1);exp.sr_hpf_reset();
    const bypassIdle=exp.sr_hpf_active()===0;
    for(let i=0;i<128;i++)a[i]=b[i]=i/128*.2;
    exp.sr_hpf_process(128);
    const bypassExact=a.every((v,i)=>v===Math.fround(i/128*.2));
    return {low,high,attenuation,bypassIdle,bypassExact};
  });
  assert(audio.attenuation<-20,ui+" real HPF failed frequency attenuation "+JSON.stringify(audio));
  assert(audio.bypassIdle&&audio.bypassExact,ui+" OFF must be sample-exact");
  let realWorklet=null;
  if(ui==="UI_01"){
    // Real end-to-end OfflineAudioContext -> existing SOURCE WASM -> new
    // shared C++ HPF WASM, without speakers or a separate CI tier.
    realWorklet=await page.evaluate(async()=>{
      const {createSceneNode}=await import('./audio/engine.js');
      async function run(hpf){
        const context=new OfflineAudioContext(2,24000,48000);
        const state={
          params:{sourceCharacter:50,badSignal:0,bandwidthLoss:0,inputGain:0,mix:100,outputGain:0,hpf},
          selection:{SOURCE:'SRC_003_Smartphone_Speakerphone',TRANSMISSION:'TRN_001_Direct_Clean'},
          bypass:{SOURCE:true,TRANSMISSION:true,EQ_TONE:false},globalBypass:false
        };
        const node=await createSceneNode(context,state);
        const input=context.createBuffer(2,24000,48000);
        for(let c=0;c<2;c++)for(let i=0;i<24000;i++)
          input.getChannelData(c)[i]=.25*Math.sin(2*Math.PI*40*i/48000);
        const source=context.createBufferSource();
        source.buffer=input;source.connect(node);node.connect(context.destination);
        source.start();const rendered=await context.startRendering();
        let energy=0;for(let i=12000;i<24000;i++){
          const y=rendered.getChannelData(0)[i];energy+=y*y;
        }
        return Math.sqrt(energy/12000);
      }
      return {off:await run(20),on:await run(240)};
    });
    assert(realWorklet.off>.16&&realWorklet.on<realWorklet.off*.12,
      "HPF not working in actual Web AudioWorklet: "+JSON.stringify(realWorklet));
  }
  return {ok:true,ui,init,changed,undo:true,redo:true,curve:points,audio,realWorklet};
}
async function auditMiniEq(page,ui){
  const names=await page.$$eval('.macro-eq-svg [data-eq-node]',els=>els.map(e=>e.dataset.eqNode));
  assert.deepEqual(names,['hpf','b1','b2','b3','lpf'],ui+' must have HPF LPF and exactly 3 EQ bands');
  const results={};
  for(const id of names){
    const node='.macro-eq-svg [data-eq-node="'+id+'"]';
    const key=id==='hpf'||id==='lpf'?id:'b'+id.slice(1)+'Gain';
    // Read active values from the Advanced form, without clicking the graph.
    await page.$eval('.macro-eq h3',e=>e.click());
    const before=await page.$eval('[data-param="'+key+'"]',e=>Number(e.value));
    await page.$eval('#advancedCloseBtn',e=>e.click());
    const box=await page.$eval(node,e=>{const b=e.getBoundingClientRect();return{x:b.x+b.width/2,y:b.y+b.height/2};});
    const move=id==='hpf'?14:id==='lpf'?-14:0;
    await page.mouse.move(box.x,box.y);await page.mouse.down();
    await page.mouse.move(box.x+move,box.y+(id.startsWith('b')?-9:0),{steps:4});
    await page.mouse.up();
    await page.$eval('.macro-eq h3',e=>e.click());
    const after=await page.$eval('[data-param="'+key+'"]',e=>Number(e.value));
    await page.$eval('#advancedCloseBtn',e=>e.click());
    assert.notEqual(after,before,ui+' EQ '+id+' does not really change live state');
    assert.equal(await page.$eval('body',e=>e.classList.contains('advanced-open')),false,
      ui+' dragging EQ node opened detail window');
    await page.$eval('#undoBtn',e=>e.click());
    await page.$eval('.macro-eq h3',e=>e.click());
    const undone=await page.$eval('[data-param="'+key+'"]',e=>Number(e.value));
    await page.$eval('#advancedCloseBtn',e=>e.click());
    assert.equal(undone,before,ui+' '+id+' EQ drag missing atomic undo');
    results[id]={before,dragged:after,undone};
  }
  return {ok:true,nodes:names,values:results};
}


async function auditEqMouseGestures(page,ui){
  const node=id=>'.macro-eq-svg [data-eq-node="'+id+'"]';
  const xy=selector=>page.$eval(selector,el=>{
    const r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};
  });
  const position=async id=>{
    const pt=await xy(node(id));await page.mouse.move(pt.x,pt.y);return pt;
  };
  const boxVisible=()=>page.$eval('.sr-eq-float',e=>!e.hidden&&getComputedStyle(e).display!=='none');
  const read=kind=>page.$eval('[data-eq-float-value="'+kind+'"]',e=>parseFloat(e.value));
  const hidden=()=>page.$eval('body',e=>e.classList.contains('advanced-open'));
  await position('b2');
  assert(await boxVisible(),ui+' hovering EQ point must reveal floating readout');
  const fields=await page.$$eval('[data-eq-float-value]',xs=>xs.map(x=>x.dataset.eqFloatValue));
  assert.deepEqual(fields,['freq','gain','q'],ui+' bell popup fields missing');
  const firstQ=await read('q'),firstGain=await read('gain');
  await page.mouse.wheel({deltaY:-120});
  const wheelQ=await read('q');
  assert(wheelQ<firstQ,ui+' VVChain wheel-up should decrease Q (wider bell)');
  assert.equal(await read('gain'),firstGain,ui+' EQ point wheel must NOT change gain');
  const input=await xy('[data-eq-float-value="gain"]');
  await page.mouse.move(input.x,input.y);
  assert(await boxVisible(),ui+' popup must survive move from EQ point');
  const gBefore=await read('gain');
  await page.mouse.move(input.x,input.y);await page.mouse.down();
  await page.mouse.move(input.x,input.y-18,{steps:4});await page.mouse.up();
  assert((await read('gain'))>gBefore,ui+' vertical numeric drag must adjust Gain');
  const gDragged=await read('gain');
  // Clicking one value selects text; typing commits on Enter without Advanced.
  await page.$eval('[data-eq-float-value="freq"]',el=>{el.focus();el.select();});
  await page.keyboard.type('1700');
  await page.keyboard.press('Enter');
  const typedFrequency=await read('freq');
  assert.equal(typedFrequency,1.7,ui+' direct numeric frequency should show 1.7 kHz');
  await page.mouse.move(input.x,input.y);
  await page.mouse.wheel({deltaY:-120});
  const gWheel=await read('gain');
  assert(Math.abs(gWheel-gDragged-.1)<.015,ui+' popup wheel must change one 0.1dB step, not accelerate');
  const qAfter=await read('q');
  const bell=await position('b2');
  await page.mouse.click(bell.x,bell.y,{clickCount:2,delay:80});
  assert.equal(await read('gain'),0,ui+' double-click should reset only Gain');
  assert.equal(await read('freq'),typedFrequency,ui+' double-click must preserve Freq');
  assert.equal(await read('q'),qAfter,ui+' double-click must preserve Q');
  assert(!await hidden(),ui+' small EQ editor must not open full Advanced dialog');
  await position('hpf');
  assert.deepEqual(await page.$$eval('[data-eq-float-value]',xs=>xs.map(e=>e.dataset.eqFloatValue)),['freq'],ui+' HPF must show only frequency');
  await position('lpf');
  assert.deepEqual(await page.$$eval('[data-eq-float-value]',xs=>xs.map(e=>e.dataset.eqFloatValue)),['freq'],ui+' LPF must show only frequency');
  await page.mouse.move(2,2);
  await new Promise(done=>setTimeout(done,350));
  assert(!await boxVisible(),ui+' floating EQ popup did not dismiss after leaving interaction area');
  // Revert wheel, drag, text entry, and double-click changes so the next
  // UI layout runs from the same baseline and other audits are deterministic.
  for(let i=0;i<5;i++)await page.$eval('#undoBtn',el=>el.click());
  return {ok:true,hover:true,nodeWheelQ:[firstQ,wheelQ],numericDrag:[gBefore,gDragged],
    typedFrequency,gainWheel:[gDragged,gWheel],bellDoubleClickGain:0,
    noAdvanced:true,hpfLpfFreqOnly:true,autoDismiss:true};
}

module.exports={auditKnobs};
