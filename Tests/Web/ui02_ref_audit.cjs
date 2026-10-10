// Existing-tier UI_02 visual + real state/Undo check, called by knob_smoke.
// No synthetic screenshot, DSP change, new runner, or additional CI tier.
const assert=require("node:assert/strict");
const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
const inside=(outer,inner)=>inner.left>=outer.left-1&&inner.top>=outer.top-1&&inner.right<=outer.right+1&&inner.bottom<=outer.bottom+1;
const overlaps=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1;
async function auditUi02Intelligibility(page){
  const layout=await page.evaluate(()=>{
    const card=document.querySelector('body.ui-02 .macro-intelligibility');
    const row=card?.querySelector('.macro-mode-row');
    const readout=card?.querySelector('.macro-knob-value');
    const rect=e=>{const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
    if(!card||!row||!readout)return null;
    const buttons=[...row.querySelectorAll('button')].map(e=>({value:e.dataset.value,active:e.classList.contains('active'),pressed:e.getAttribute('aria-pressed'),bounds:rect(e),background:getComputedStyle(e).backgroundImage}));
    return {card:rect(card),row:rect(row),readout:rect(readout),buttons,
      styles:['a','b','c'].map(x=>!!document.querySelector('link[href="./ui02_ref_batch_'+x+'_v1.css"]'))};
  });
  assert(layout,'UI_02 intelligibility REF card, modes or readout missing');
  assert(layout.styles.every(Boolean),'UI_02 three scoped REF CSS bundles not directly linked');
  assert.equal(layout.buttons.length,3,'UI_02 must expose three existing modes');
  assert(inside(layout.card,layout.row),'UI_02 mode row outside locked card: '+JSON.stringify(layout));
  assert(inside(layout.card,layout.readout),'UI_02 readout clipped by locked card: '+JSON.stringify(layout));
  assert(!overlaps(layout.row,layout.readout),'UI_02 mode row overlaps real knob readout');
  for(let i=0;i<layout.buttons.length;i++){
    assert(inside(layout.card,layout.buttons[i].bounds),'UI_02 mode button outside card: '+layout.buttons[i].value);
    for(let j=0;j<i;j++)assert(!overlaps(layout.buttons[i].bounds,layout.buttons[j].bounds),'UI_02 mode buttons overlap');
  }
  const active=layout.buttons.filter(x=>x.active);
  assert.equal(active.length,1,'UI_02 needs exactly one selected real mode');
  assert(active[0].background.includes('RT_SEGMENT_CAP_ACTIVE.png'),'UI_02 active mode artwork not applied');
  assert(layout.buttons.every(x=>x.pressed===(x.active?'true':'false')),'UI_02 pressed accessibility state not synced');
  const before=active[0].value;
  const next=before==='DIALOGUE'?'NATURAL':'DIALOGUE';
  const selector='[data-macro-select="intelligibilityMode"][data-value="'+next+'"]';
  await page.click(selector);
  const after=await page.$eval('.macro-intelligibility .macro-mode-row',e=>{
    const active=e.querySelector('button.active');return {value:active?.dataset.value,pressed:active?.getAttribute('aria-pressed')};
  });
  assert.deepEqual(after,{value:next,pressed:'true'},'UI_02 mode click did not update live state');
  await page.$eval('#undoBtn',e=>e.click());
  const restored=await page.$eval('.macro-intelligibility .macro-mode-row',e=>{
    const active=e.querySelector('button.active');return {value:active?.dataset.value,pressed:active?.getAttribute('aria-pressed')};
  });
  assert.deepEqual(restored,{value:before,pressed:'true'},'UI_02 mode Undo did not restore state');
  return {ok:true,inside:true,overlap:false,modeCount:3,styles:true,activePng:true,ariaPressed:true,modeChanged:[before,next],undo:true};
}
module.exports={auditUi02Intelligibility};
