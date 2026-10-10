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
  return {ok:true,ui,before,dragged,scrolled,keyed,advanced,undid,redid,restored,ambience,allVisible,dialogs};
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

module.exports={auditKnobs};
