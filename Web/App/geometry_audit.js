/* SOURCERUNE runtime geometry self-audit.
   Visual/debug only. No DSP/state/preset semantics. */
function auditReferenceGeometry(){
  const ui2=document.body.classList.contains("ui-02");
  const app=document.querySelector(".app");
  const ws=document.querySelector(".workspace");
  const center=document.querySelector(".center");
  const scene=document.querySelector(".scene-panel");
  const macro=document.querySelector(".macro-strip");
  if(!app||!ws||!center||!scene||!macro)return {ok:false,reason:"missing-root"};
  const px=e=>{const r=e.getBoundingClientRect();return {w:r.width,h:r.height,x:r.x,y:r.y}};
  const scale=parseFloat((app.style.transform.match(/scale\(([^)]+)\)/)||[])[1]||"1")||1;
  const norm=e=>{const r=px(e);return {w:r.w/scale,h:r.h/scale,x:r.x/scale,y:r.y/scale}};
  const near=(a,b,t=1)=>Math.abs(a-b)<=t;
  if(!ui2){
    const mods=[...document.querySelectorAll(".module-card")].map(norm);
    const ana=document.querySelector(".analysis-panel");
    const meter=document.querySelector(".meter-rail");
    const checks={
      appW:near(norm(app).w,1499),appH:near(norm(app).h,807),
      wsH:near(norm(ws).h,528),
      sceneH:near(norm(scene).h,262),
      analysisH:ana?near(norm(ana).h,247):false,
      meterH:meter?near(norm(meter).h,520):false,
      macroH:near(norm(macro).h,221),
      cards:mods.length===4&&mods.every(x=>near(x.h,124))
    };
    return {ui:"UI_01",ok:Object.values(checks).every(Boolean),checks};
  }
  const cards=Object.fromEntries([...document.querySelectorAll(".module-card")].map(e=>[e.dataset.type,norm(e)]));
  const checks={
    appW:near(norm(app).w,1672),appH:near(norm(app).h,941),
    wsH:near(norm(ws).h,653),
    scenePanelH:near(norm(scene).h,641),
    sourceH:cards.SOURCE?near(cards.SOURCE.h,196):false,
    transmissionH:cards.TRANSMISSION?near(cards.TRANSMISSION.h,183):false,
    wallH:cards.WALL_COVER?near(cards.WALL_COVER.h,244):false,
    spaceH:cards.SPACE_ENVIRONMENT?near(cards.SPACE_ENVIRONMENT.h,279):false,
    macroH:near(norm(macro).h,210)
  };
  return {ui:"UI_02",ok:Object.values(checks).every(Boolean),checks};
}
window.auditReferenceGeometry=auditReferenceGeometry;
