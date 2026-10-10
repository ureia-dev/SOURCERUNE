// One-shot real Chromium knob interaction check used by existing Web Preview.
// No new CI tier, repeated runs or changes to approved UI geometry.
const assert=require("node:assert/strict");
const {auditUi02Intelligibility}=require("./ui02_ref_audit.cjs");
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
  const eqInline=await auditEqMiniInline(page,ui);
  const eqFocus=await auditEqFocus(page,ui);
  const ui02Ref=ui==="UI_02"?await auditUi02Intelligibility(page):null;
  return {ok:true,ui,before,dragged,scrolled,keyed,advanced,undid,redid,restored,ambience,allVisible,dialogs,motion,knobValues,hpf,eq,eqMouse,eqInline,eqFocus,ui02Ref};
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
  // A real mini-graph HPF point is the ONLY compact cutoff control.
  const selector='.macro-eq-svg [data-eq-node="hpf"]';
  assert.equal(await page.$('[data-eq-hpf]'),null,ui+' redundant HPF slider must be removed');
  assert(await page.$(selector),ui+' HPF integrated frequency-graph node missing');
  assert(await page.$('.macro-eq-svg [data-eq-node="lpf"]'),ui+' LPF node missing');
  const init=await page.$eval('[data-eq-readout="hpf"]',e=>e.textContent.trim());
  assert.equal(init,'OFF',ui+' untouched HPF must be neutral/OFF');
  await page.$eval(selector,e=>e.focus());
  await page.keyboard.press('ArrowRight');
  const changed=await page.$eval('[data-eq-readout="hpf"]',e=>e.textContent.trim());
  assert.equal(changed,'21 Hz',ui+' mini graph HPF keyboard ArrowRight must change one 1Hz step');
  assert.equal(await page.$eval('.sr-eq-float',e=>e.hidden),true,
    ui+' small graph must NEVER display the black EQ values popup');
  const points=await page.$eval('[data-eq-hpf-path]',e=>e.getAttribute('d'));
  assert(points!=='M0 50H100',ui+' actual HPF transfer curve did not update');
  await page.click('.macro-eq h3');
  assert.equal(await page.$eval('[data-param="hpf"]',e=>Number(e.value)),21,
    ui+' Advanced HPF must sync from integrated graph point');
  await page.click('#advancedCloseBtn');
  await page.$eval('#undoBtn',e=>e.click());
  assert.equal(await page.$eval('[data-eq-readout="hpf"]',e=>e.textContent.trim()),'OFF',
    ui+' direct HPF-point Undo failed');
  await page.$eval('#redoBtn',e=>e.click());
  assert.equal(await page.$eval('[data-eq-readout="hpf"]',e=>e.textContent.trim()),'21 Hz',
    ui+' direct HPF-point Redo failed');
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
  return {ok:true,ui,init,changed,integratedGraph:true,noStandaloneSlider:true,
    noBlackPopup:true,undo:true,redo:true,curve:points,audio,realWorklet};
}
async function auditMiniEq(page,ui){
  // Validate graph-only display zoom for a flat, medium and even out-of-range
  // bell without changing a live parameter or touching the C++ DSP.
  const fixedScale=await page.evaluate(async()=>{
    const {eqGraph}=await import('./eq_graph.js');
    const p={hpf:20,lpf:20000,b1Freq:120,b1Gain:0,b1Q:.7,
      b2Freq:600,b2Gain:0,b2Q:1,b3Freq:2400,b3Gain:0,b3Q:1};
    const state={params:p,bypass:{EQ_TONE:false}};
    return [0,6,9,14,-18].map(g=>{
      p.b2Gain=g;
      const result=eqGraph(state,48000);
      return {gain:g,displayRange:result.displayRange,nodeY:result.nodes.find(n=>n.id==='b2').y};
    });
  });
  assert(fixedScale.every(x=>x.displayRange===24),ui+' EQ graph must remain fixed +/-24 dB for any active Gain');
  assert.equal(fixedScale[0].nodeY,50,ui+' fixed +/-24 dB must keep zero dB on centreline');
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
  return {ok:true,nodes:names,values:results,fixedScale};
}


async function auditEqMouseGestures(page,ui){
  // Compact editor has no black floating values UI; full Focus retains it.
  const node=id=>'.macro-eq-svg [data-eq-node="'+id+'"]';
  const xy=selector=>page.$eval(selector,e=>{
    const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};
  });
  const position=async id=>{
    const pt=await xy(node(id));await page.mouse.move(pt.x,pt.y);return pt;
  };
  const popupVisible=()=>page.$eval('.sr-eq-float',e=>!e.hidden);
  const param=async key=>{
    await page.$eval('.macro-eq h3',e=>e.click());
    const value=await page.$eval('[data-param="'+key+'"]',e=>Number(e.value));
    await page.$eval('#advancedCloseBtn',e=>e.click());
    return value;
  };
  await position('b2');
  assert.equal(await popupVisible(),false,ui+' mini graph hover spawned unwanted black box');
  const initialQ=await param('b2Q');
  await position('b2');await page.mouse.wheel({deltaY:-120});
  const adjustedQ=await param('b2Q');
  assert(adjustedQ<initialQ,ui+' wheel-up must lower band Q like VVChain');
  assert.equal(await popupVisible(),false,ui+' mini wheel spawned unwanted information box');
  const initialGain=await param('b2Gain');
  const pt=await position('b2');await page.mouse.down();
  await page.mouse.move(pt.x,pt.y-18,{steps:4});await page.mouse.up();
  const gained=await param('b2Gain');
  assert(gained>initialGain,ui+' mini direct drag failed to update Bell Gain');
  // Visual focus proof: transparent SVG hit targets must never produce an
  // opaque black selection rectangle. Verify after an actual pointer drag.
  const selectedVisual=await page.$eval('.macro-eq [data-eq-node="b2"]',el=>{
    const css=getComputedStyle(el);
    const ring=getComputedStyle(document.querySelector('.macro-eq [data-eq-ring="b2"]'));
    const fill=css.fill.match(/[\d.]+/g)?.map(Number)||[];
    return {outline:css.outlineStyle,background:css.backgroundColor,
      boxShadow:css.boxShadow,filter:css.filter,fill,
      selectedRing:ring.stroke};
  });
  assert.equal(selectedVisual.outline,'none',ui+' selected mini EQ node has black outline');
  assert.equal(selectedVisual.boxShadow,'none',ui+' selected mini EQ node has rectangular shadow');
  assert.equal(selectedVisual.filter,'none',ui+' selected mini EQ node has rectangular filter');
  assert(selectedVisual.background==='rgba(0, 0, 0, 0)'||selectedVisual.background==='transparent',
    ui+' selected mini EQ node has opaque background');
  assert((selectedVisual.fill[3]??1)<.02,
    ui+' selected mini EQ hit area is opaque instead of transparent');
  assert.equal(await popupVisible(),false,ui+' mini node drag spawned unwanted black information box');
  const double=await position('b2');
  await page.mouse.click(double.x,double.y,{clickCount:2,delay:60});
  assert.equal(await param('b2Gain'),0,ui+' double click must reset Bell Gain only');
  assert.equal(await param('b2Q'),adjustedQ,ui+' double click must preserve Q');
  await position('hpf');assert.equal(await popupVisible(),false,ui+' HPF point spawned popup');
  await position('lpf');assert.equal(await popupVisible(),false,ui+' LPF point spawned popup');
  for(let i=0;i<3;i++)await page.$eval('#undoBtn',el=>el.click());
  assert.equal(await param('b2Q'),initialQ,ui+' node wheel Undo baseline changed');
  assert.equal(await param('b2Gain'),initialGain,ui+' node Gain Undo baseline changed');
  const colorAndAnalyzer=await page.evaluate(async()=>{
    const styles=['hpf','b1','b2','b3','lpf'].map(id=>
      getComputedStyle(document.querySelector('.macro-eq [data-eq-ring="'+id+'"]')).stroke);
    const {updateEqAnalyzer}=await import('./eq_analyzer_v1.js');
    const bins=new Float32Array(1024).fill(-85);
    for(let i=2;i<260;i++)bins[i]=-27-i/80;
    updateEqAnalyzer(bins,48000,10000,true);
    const svg=document.querySelector('.macro-eq-svg');
    const line=svg.querySelector('.macro-eq-analyzer-line')?.getAttribute('d')||'';
    const area=svg.querySelector('.macro-eq-analyzer-fill')?.getAttribute('d')||'';
    updateEqAnalyzer(bins,48000,10100,false);
    return {styles,linePoints:(line.match(/[CL]/g)||[]).length,areaClose:area.endsWith(' Z'),
      cleared:svg.querySelector('.macro-eq-analyzer-line').getAttribute('d')===''};
  });
  assert.equal(new Set(colorAndAnalyzer.styles).size,5,ui+' five EQ handles must have distinct vivid colors');
  assert.deepEqual(colorAndAnalyzer.styles,[
    'rgb(34, 197, 94)','rgb(239, 68, 68)','rgb(250, 204, 21)',
    'rgb(59, 130, 246)','rgb(244, 114, 182)'
  ],ui+' approved HPF/3 bands/LPF vivid five-color palette shifted');
  assert(colorAndAnalyzer.linePoints>=128&&colorAndAnalyzer.areaClose&&colorAndAnalyzer.cleared,
    ui+' VVChain-referenced logarithmic smoother/analyzer visual data must render and clear');
  assert.equal(await page.$eval('body',e=>e.classList.contains('advanced-open')),false,
    ui+' compact direct EQ gesture opened Advanced');
  return {ok:true,onlyMiniNodes:true,noBlackPopup:true,noOpaqueNodeFocus:true,
    nodeWheelQ:[initialQ,adjustedQ],gainDrag:[initialGain,gained],
    bellDoubleClickGain:0,cutPoints:true,vividNodes:colorAndAnalyzer.styles,
    analyzerReference:true,noAdvanced:true,undo:true};
}

async function auditEqMiniInline(page,ui){
  const root='.macro-eq [data-eq-mini-inline]';
  const pick=id=>'.macro-eq .macro-eq-svg [data-eq-node="'+id+'"]';
  const field=kind=>root+' [data-eq-mini-value="'+kind+'"]';
  const middle=selector=>page.$eval(selector,e=>{
    const b=e.getBoundingClientRect();
    return{x:b.x+b.width/2,y:b.y+b.height/2,w:b.width,h:b.height};
  });
  const val=kind=>page.$eval(field(kind),e=>e.value);
  const visible=await page.$eval(root,e=>{
    const b=e.getBoundingClientRect(),parent=e.closest('.macro-eq').getBoundingClientRect();
    return{w:b.width,h:b.height,within:b.left>=parent.left-2&&b.right<=parent.right+2
      &&b.bottom<=parent.bottom+3};
  });
  assert(visible.within&&visible.w>155&&visible.h>=24,ui+' mini editable row must fit in EQ card');
  const b2=await middle(pick('b2'));
  await page.mouse.click(b2.x,b2.y);
  assert.equal(await page.$eval(root,e=>e.dataset.eqMiniSelected),'b2',
    ui+' mini EQ node click did not select band values');
  assert.equal(await page.$eval('.sr-eq-float',e=>e.hidden),true,
    ui+' mini EQ values accidentally opened the floating info popup');
  const originalGain=await val('gain');
  const gainSpot=await middle(field('gain'));
  await page.mouse.move(gainSpot.x,gainSpot.y);
  await page.mouse.wheel({deltaY:-120});
  const wheelGain=await val('gain');
  assert(Math.abs(parseFloat(wheelGain)-parseFloat(originalGain)-.1)<.011,
    ui+' mini inline Gain wheel must be exactly one 0.1dB step');
  await page.$eval('#undoBtn',el=>el.click());
  assert.equal(await val('gain'),originalGain,ui+' mini inline wheel missing undo');
  // One vertical drag, one Undo; true shared Bell Gain parameter.
  const dragSpot=await middle(field('gain'));
  await page.mouse.move(dragSpot.x,dragSpot.y);
  await page.mouse.down();await page.mouse.move(dragSpot.x,dragSpot.y-18,{steps:4});await page.mouse.up();
  const movedGain=await val('gain');
  assert(parseFloat(movedGain)>parseFloat(originalGain),ui+' mini numeric drag failed');
  await page.$eval('#undoBtn',el=>el.click());
  assert.equal(await val('gain'),originalGain,ui+' mini numeric drag missing atomic Undo');
  // Focus/Enter can type numbers directly, without showing a floating popup.
  const originalFreq=await val('freq');
  await page.$eval(field('freq'),el=>{el.focus();el.select()});
  await page.keyboard.type('1700');
  await page.keyboard.press('Enter');
  assert.equal(await val('freq'),'1.7 kHz',ui+' mini direct frequency typed edit not committed');
  await page.$eval('#undoBtn',el=>el.click());
  assert.equal(await val('freq'),originalFreq,ui+' mini typed frequency undo failed');
  const h=await middle(pick('hpf'));await page.mouse.click(h.x,h.y);
  assert.equal(await page.$eval(root,e=>e.dataset.eqMiniSelected),'hpf',ui+' HPF selection unavailable');
  assert.equal(await page.$eval(field('gain'),e=>e.disabled),true,
    ui+' HPF cut has no real Gain; must not show fake active control');
  assert.equal(await page.$eval(field('q'),e=>e.disabled),true,
    ui+' HPF cut has no real Q; must not show fake active control');
  const l=await middle(pick('lpf'));await page.mouse.click(l.x,l.y);
  assert.equal(await page.$eval(root,e=>e.dataset.eqMiniSelected),'lpf',ui+' LPF selection unavailable');
  assert.equal(await page.$eval(field('freq'),e=>e.disabled),false,ui+' LPF frequency must stay editable');
  assert.equal(await page.$eval('.sr-eq-float',e=>e.hidden),true,
    ui+' compact selected EQ values must never open black popup');
  return {ok:true,contained:true,selectedB2:true,wheel:[originalGain,wheelGain],
    verticalDrag:[originalGain,movedGain],typedFreq:'1700 Hz',atomicUndo:true,
    cutsFreqOnly:true,miniPopupNever:true};
}

async function auditEqFocus(page,ui){
  const zoom='.macro-eq [data-eq-zoom-in]',focus='#eqFocusDialog',node=id=>focus+' [data-eq-node="'+id+'"]';
  const mid=selector=>page.$eval(selector,e=>{
    const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};
  });
  const read=id=>page.$eval('[data-eq-focus-value="'+id+'"]',e=>e.textContent);
  const graphPath=()=>page.$eval(focus+' .macro-eq-line',e=>e.getAttribute('d'));
  assert(await page.$(zoom),ui+' Zoom In action missing on compact EQ');
  assert.equal(await page.$(focus),null,ui+' Focus should not be open by default');
  await page.$eval(zoom,e=>e.click());
  assert(await page.$(focus),ui+' Zoom In did not create in-plugin EQ Focus');
  const layout=await page.evaluate(()=>{
    const app=document.querySelector('.app').getBoundingClientRect();
    const dialog=document.querySelector('#eqFocusDialog').getBoundingClientRect();
    const svg=document.querySelector('#eqFocusDialog .macro-eq-svg');
    const mini=document.querySelector('.macro-eq .macro-eq-svg');
    return {app:{x:app.x,y:app.y,w:app.width,h:app.height},
      dialog:{x:dialog.x,y:dialog.y,w:dialog.width,h:dialog.height},
      focusNodes:[...svg.querySelectorAll('[data-eq-node]')].map(n=>n.dataset.eqNode),
      ghost:Boolean(mini?.inert&&mini.dataset.eqFocusGhost==='1'&&mini.style.pointerEvents==='none'),
      dialogs:document.querySelectorAll('#eqFocusDialog').length};
  });
  assert.deepEqual(layout.focusNodes,['hpf','b1','b2','b3','lpf'],ui+' big EQ must own five live nodes');
  assert(layout.ghost,ui+' mini preview must be inert while Focus is active');
  assert.equal(layout.dialogs,1,ui+' must never create more than one Focus');
  assert(layout.dialog.w>350&&layout.dialog.h>230,ui+' Focus is not enlarged');
  assert(layout.dialog.x>=layout.app.x-2&&layout.dialog.y>=layout.app.y-2,ui+' Focus outside plugin origin');
  assert(layout.dialog.x+layout.dialog.w<=layout.app.x+layout.app.w+3,ui+' Focus outside plugin width');
  assert(layout.dialog.y+layout.dialog.h<=layout.app.y+layout.app.h+3,ui+' Focus outside plugin height');
  assert.equal(await page.$eval(focus+' .sr-eq-focus-title small',e=>e.textContent.includes('±24 dB')),true);
  // Precision handle optics: real circles regardless of SVG aspect ratio.
  const precision=await page.evaluate(()=>{
    const read=selector=>{
      const e=document.querySelector(selector);if(!e)return null;
      const b=e.getBoundingClientRect();return {w:b.width,h:b.height};
    };
    return {
      mini:read('.macro-eq .sr-eq-node-ring'),
      miniHit:read('.macro-eq [data-eq-node="b2"]'),
      focus:read('#eqFocusDialog .sr-eq-node-ring'),
      focusHit:read('#eqFocusDialog [data-eq-node="b2"]'),
      line:document.querySelector('#eqFocusDialog .macro-eq-line')?.getAttribute('stroke')
    };
  });
  for(const type of ['mini','focus']){
    assert(precision[type],ui+' missing visible precision EQ node');
    assert(Math.abs(precision[type].w-precision[type].h)<1.4,
      ui+' '+type+' EQ node rendered as a stretched ellipse');
  }
  assert(precision.mini.w<6&&precision.mini.w>2.5,ui+' mini EQ point still too large');
  assert(precision.focus.w<9&&precision.focus.w>4,ui+' Focus EQ point still too large');
  assert(precision.miniHit.w>=14&&precision.focusHit.w>=18,
    ui+' precision node lost its usable transparent mouse target');
  assert(precision.line?.startsWith('url(#sr-eq-line-'),ui+' curve missing subtle multi-band gradient');
  const controlIds=await page.$$eval('#eqFocusDialog [data-eq-focus-control]',xs=>xs.map(x=>x.dataset.eqFocusControl));
  assert.deepEqual(controlIds,['hpf','b1Freq','b1Gain','b1Q','b2Freq','b2Gain','b2Q','b3Freq','b3Gain','b3Q','lpf'],
    ui+' must expose exactly 11 REAL EQ controls, no unimplemented 24dB slope option');
  const before=await read('b2-gain');
  const initialPath=await graphPath();
  const pt=await mid(node('b2'));await page.mouse.move(pt.x,pt.y);
  await page.mouse.down();await page.mouse.move(pt.x+25,pt.y-12,{steps:5});await page.mouse.up();
  const dragged=await read('b2-gain');
  assert.notEqual(dragged,before,ui+' dragged Focus node did not change real Gain');
  const focusHitStyle=await page.$eval('#eqFocusDialog [data-eq-node="b2"]',el=>{
    const st=getComputedStyle(el);
    return {outline:st.outlineStyle,shadow:st.boxShadow,filter:st.filter,
      background:st.backgroundColor};
  });
  assert.equal(focusHitStyle.outline,'none',ui+' Focus selected node outline is an opaque block');
  assert.equal(focusHitStyle.shadow,'none',ui+' Focus selected node has a shadow rectangle');
  assert.equal(focusHitStyle.filter,'none',ui+' Focus selected node uses a blocking filter');
  assert(['rgba(0, 0, 0, 0)','transparent'].includes(focusHitStyle.background),
    ui+' Focus selected node has opaque background');
  const newPath=await graphPath();
  assert.notEqual(newPath,initialPath,ui+' Focus did not recompute the same EQ response');
  const miniPath=await page.$eval('.macro-eq .macro-eq-line',e=>e.getAttribute('d'));
  assert.equal(miniPath,newPath,ui+' miniature and Focus response diverged');
  assert.equal(await page.$eval('.macro-eq .macro-eq-svg',e=>e.inert),true);
  // Existing global history still works even if its toolbar is behind Focus.
  await page.$eval('#undoBtn',e=>e.click());
  assert.equal(await read('b2-gain'),before,ui+' Focus drag did not undo atomically');
  await page.$eval('#redoBtn',e=>e.click());
  assert.equal(await read('b2-gain'),dragged,ui+' Focus drag redo mismatch');
  await page.$eval('#undoBtn',e=>e.click());
  assert.equal(await read('b2-gain'),before,ui+' Focus baseline not restored');
  // Bell wheel is Q, not gain, as in the existing approved compact editor.
  const wheelXY=await mid(node('b2'));await page.mouse.move(wheelXY.x,wheelXY.y);
  const initialQ=await read('b2-q');await page.mouse.wheel({deltaY:-120});
  const wheelQ=await read('b2-q');
  assert.notEqual(wheelQ,initialQ,ui+' Focus bell wheel did not change Q');
  await page.$eval('#undoBtn',e=>e.click());
  assert.equal(await read('b2-q'),initialQ,ui+' Focus Q wheel undo mismatch');
  // Actual Focus knobs use exactly the same state, mouse gesture semantics
  // and global history as nodes. One vertical gesture is one Undo entry.
  const knobXY=await mid('[data-eq-focus-control="b2Gain"]');
  const knobBefore=await read('b2-gain');
  await page.mouse.move(knobXY.x,knobXY.y);
  await page.mouse.down();
  await page.mouse.move(knobXY.x,knobXY.y-17,{steps:4});
  await page.mouse.up();
  const knobDragged=await read('b2-gain');
  assert.notEqual(knobDragged,knobBefore,ui+' Focus Gain dial not functional');
  await page.$eval('#undoBtn',el=>el.click());
  assert.equal(await read('b2-gain'),knobBefore,ui+' Focus dial missing atomic Undo');
  await page.$eval('#redoBtn',el=>el.click());
  assert.equal(await read('b2-gain'),knobDragged,ui+' Focus dial missing Redo');
  await page.$eval('#undoBtn',el=>el.click());
  // One wheel increment on a real Gain knob equals one 0.1 dB step.
  const gainWheelXY=await mid('[data-eq-focus-control="b1Gain"]');
  const gainAt0=await read('b1-gain');
  await page.mouse.move(gainWheelXY.x,gainWheelXY.y);
  await page.mouse.wheel({deltaY:-120});
  const gainAt1=await read('b1-gain');
  assert.equal(Math.round((parseFloat(gainAt1)-parseFloat(gainAt0))*10),1,
    ui+' dial wheel should change only one 0.1dB step');
  await page.$eval('#undoBtn',el=>el.click());
  assert.equal(await read('b1-gain'),gainAt0,ui+' dial wheel undo failed');
  const accessible=await page.evaluate(()=>{
    const ids=[...document.querySelectorAll('#eqFocusDialog [data-eq-focus-control]')];
    return ids.every(x=>x.getAttribute('role')==='slider'
      &&Number.isFinite(Number(x.getAttribute('aria-valuemin')))
      &&Number.isFinite(Number(x.getAttribute('aria-valuemax')))
      &&Number.isFinite(Number(x.getAttribute('aria-valuenow')))
      &&Boolean(x.getAttribute('aria-valuetext')));
  });
  assert(accessible,ui+' Focus dials must expose real keyboard slider ranges/values');
  const keyQ=await read('b1-q');
  await page.$eval('[data-eq-focus-control="b1Q"]',el=>el.focus());
  await page.keyboard.press('ArrowUp');
  assert.notEqual(await read('b1-q'),keyQ,ui+' keyboard Q increment must edit live EQ');
  await page.$eval('#undoBtn',e=>e.click());
  assert.equal(await read('b1-q'),keyQ,ui+' keyboard Q change missing Undo');
  await page.$eval('[data-eq-focus-control="b3Freq"]',el=>el.focus());
  await page.keyboard.press('Enter');
  assert.equal(await page.$eval('.sr-eq-float',e=>!e.hidden),true,
    ui+' keyboard activation must open the existing numeric editor');
  // Readout buttons must navigate to the REAL SVG node and open its popup.
  await page.$eval('[data-eq-focus-select="b3"]',el=>el.click());
  assert.equal(await page.$eval('.sr-eq-float',e=>!e.hidden),true,
    ui+' readout button must focus node and open editable floating values');
  const selected=await page.$$eval('.sr-eq-float [data-eq-float-value]',els=>els.map(e=>e.dataset.eqFloatValue));
  assert.deepEqual(selected,['freq','gain','q'],ui+' focused Bell must show existing F/G/Q editor');
  // Keyboard Escape cancels the Focus surface without changing EQ state.
  await page.keyboard.press('Escape');
  assert.equal(await page.$(focus),null,ui+' Escape must close Focus');
  assert.equal(await page.$eval(zoom,e=>e===document.activeElement),true,
    ui+' closing Focus must restore keyboard focus');
  assert.equal(await page.$eval('.macro-eq .macro-eq-svg',e=>Boolean(!e.inert&&!e.dataset.eqFocusGhost)),true,
    ui+' closing Focus must restore original interactive mini graph');
  assert.equal(await readOrNull(page,'.sr-eq-float'),false,ui+' numeric hover box not dismissed');
  await page.$eval(zoom,e=>e.click());
  assert(await page.$(focus),ui+' second open did not work');
  // A scaled/resized app must keep the floating editor within the plugin.
  const viewport=page.viewport();
  await page.setViewport({width:1200,height:730,deviceScaleFactor:1});
  await page.evaluate(()=>new Promise(requestAnimationFrame));
  const contained=await page.evaluate(()=>{
    const a=document.querySelector('.app').getBoundingClientRect();
    const d=document.querySelector('#eqFocusDialog').getBoundingClientRect();
    return d.left>=a.left-2&&d.top>=a.top-2&&d.right<=a.right+3&&d.bottom<=a.bottom+3;
  });
  assert(contained,ui+' Focus escaped plugin bounds after host/viewport resize');
  await page.setViewport(viewport);
  await page.evaluate(()=>new Promise(requestAnimationFrame));
  await page.$eval('[data-eq-focus-zoom-out]',e=>e.click());
  assert.equal(await page.$(focus),null,ui+' Zoom Out did not close the floating editor');
  await page.$eval(zoom,e=>e.click());
  await page.$eval('[data-eq-focus-close]',e=>e.click());
  assert.equal(await page.$(focus),null,ui+' X button did not close the floating editor');
  return {ok:true,sharedLiveSVG:true,inertSmall:true,nodes:layout.focusNodes,
    largeSize:[Math.round(layout.dialog.w),Math.round(layout.dialog.h)],
    b2Gain:[before,dragged],qWheel:[initialQ,wheelQ],
    undo:true,redo:true,readoutPopup:true,escape:true,reopen:true,
    viewportContained:contained,zoomOut:true,closeX:true,fixedRange:24,
    nodeDimensions:precision,liveControls:controlIds,knobGesture:[knobBefore,knobDragged],knobWheel:true,
    accessibleSliders:accessible,keyboardPopup:true};
}
async function readOrNull(page,selector){
  return page.$eval(selector,e=>!e.hidden).catch(()=>false);
}

module.exports={auditKnobs};
