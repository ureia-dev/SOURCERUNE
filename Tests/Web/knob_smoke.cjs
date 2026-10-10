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
  return {ok:true,ui,before,dragged,scrolled,keyed,advanced,undid,redid,restored,ambience};
}
module.exports={auditKnobs};
