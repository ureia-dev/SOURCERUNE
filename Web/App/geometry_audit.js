/* SOURCERUNE runtime geometry self-audit.
   Visual/debug only. No DSP/state/preset semantics. */
function auditReferenceGeometry(){
  const ui2=document.body.classList.contains("ui-02");
  const app=document.querySelector(".app");
  const ws=document.querySelector(".workspace");
  const center=document.querySelector(".center");
  const scene=document.querySelector(".scene-panel");
  const macro=document.querySelector(".macro-strip");
  const topbar=document.querySelector(".topbar");
  if(!app||!ws||!center||!scene||!macro||!topbar)return {ok:false,reason:"missing-root"};

  const scale=parseFloat((app.style.transform.match(/scale\(([^)]+)\)/)||[])[1]||"1")||1;
  const appRect=app.getBoundingClientRect();
  const box=e=>{const r=e.getBoundingClientRect();return {
    w:r.width/scale,h:r.height/scale,
    x:(r.x-appRect.x)/scale,y:(r.y-appRect.y)/scale
  }};
  const near=(a,b,t=1)=>Math.abs(a-b)<=t;
  const fail=checks=>Object.entries(checks).filter(([,v])=>!v).map(([k])=>k);

  if(!ui2){
    const cards=Object.fromEntries([...document.querySelectorAll(".module-card")].map(e=>[e.dataset.type,box(e)]));
    const ana=document.querySelector(".analysis-panel");
    const rail=document.querySelector(".module-rail");
    const meter=document.querySelector(".meter-rail");
    const macros=Object.fromEntries([...document.querySelectorAll("#macroStrip .macro")].map(e=>[e.dataset.open,box(e)]));
    const checks={
      appW:near(box(app).w,1499), appH:near(box(app).h,807),
      topH:near(box(topbar).h,58),
      wsH:near(box(ws).h,528),
      sceneH:near(box(scene).h,262),
      analysisH:ana?near(box(ana).h,247):false,
      meterH:meter?near(box(meter).h,376):false,
      moduleRailH:rail?near(box(rail).h,520):false,
      macroStripH:near(box(macro).h,221),

      sourceCard:cards.SOURCE?near(cards.SOURCE.h,136)&&near(cards.SOURCE.x,10)&&near(cards.SOURCE.y,58):false,
      transmissionCard:cards.TRANSMISSION?near(cards.TRANSMISSION.h,132)&&near(cards.TRANSMISSION.y,201):false,
      wallCard:cards.WALL_COVER?near(cards.WALL_COVER.h,132)&&near(cards.WALL_COVER.y,340):false,
      spaceCard:cards.SPACE_ENVIRONMENT?near(cards.SPACE_ENVIRONMENT.h,97)&&near(cards.SPACE_ENVIRONMENT.y,478):false,

      centerX:near(box(center).x,333),
      meterX:meter?near(box(meter).x,1310):false,

      macroMotion:macros.MOTION?near(macros.MOTION.w,269)&&near(macros.MOTION.x,10):false,
      macroTransmission:macros.TRANSMISSION?near(macros.TRANSMISSION.w,178)&&near(macros.TRANSMISSION.x,287):false,
      macroCondition:macros.CONDITION?near(macros.CONDITION.w,201)&&near(macros.CONDITION.x,473):false,
      macroIntelligibility:macros.INTELLIGIBILITY?near(macros.INTELLIGIBILITY.w,201)&&near(macros.INTELLIGIBILITY.x,682):false,
      macroAmbience:macros.AMBIENCE?near(macros.AMBIENCE.w,155)&&near(macros.AMBIENCE.x,891):false,
      macroMix:macros.MIX?near(macros.MIX.w,115)&&near(macros.MIX.x,1054):false,
      macroEq:macros.EQ_TONE?near(macros.EQ_TONE.w,312)&&near(macros.EQ_TONE.x,1177):false
    };
    return {ui:"UI_01",ok:Object.values(checks).every(Boolean),checks,failures:fail(checks)};
  }

  const cards=Object.fromEntries([...document.querySelectorAll(".module-card")].map(e=>[e.dataset.type,box(e)]));
  const meter=document.querySelector(".meter-rail");
  const macros=Object.fromEntries([...document.querySelectorAll("#macroStrip .macro")].map(e=>[e.dataset.open,box(e)]));
  const checks={
    appW:near(box(app).w,1672), appH:near(box(app).h,941),
    topH:near(box(topbar).h,78),
    wsH:near(box(ws).h,653),
    scenePanelH:near(box(scene).h,641),

    sourceCard:cards.SOURCE?near(cards.SOURCE.w,334)&&near(cards.SOURCE.h,213)&&near(cards.SOURCE.x,13)&&near(cards.SOURCE.y,86):false,
    transmissionCard:cards.TRANSMISSION?near(cards.TRANSMISSION.w,334)&&near(cards.TRANSMISSION.h,166)&&near(cards.TRANSMISSION.x,13)&&near(cards.TRANSMISSION.y,308):false,
    wallCard:cards.WALL_COVER?near(cards.WALL_COVER.w,334)&&near(cards.WALL_COVER.h,247)&&near(cards.WALL_COVER.x,13)&&near(cards.WALL_COVER.y,483):false,
    spaceCard:cards.SPACE_ENVIRONMENT?near(cards.SPACE_ENVIRONMENT.w,322)&&near(cards.SPACE_ENVIRONMENT.h,285)&&near(cards.SPACE_ENVIRONMENT.x,1337)&&near(cards.SPACE_ENVIRONMENT.y,86):false,

    centerX:near(box(center).x,356),
    meter:meter?near(box(meter).w,440)&&near(box(meter).x,1160)&&near(box(meter).y,8):false,
    macroStripH:near(box(macro).h,210),

    bottomTransmission:macros.TRANSMISSION?near(macros.TRANSMISSION.w,337)&&near(macros.TRANSMISSION.x,13)&&near(macros.TRANSMISSION.y,751):false,
    bottomCondition:macros.CONDITION?near(macros.CONDITION.w,315)&&near(macros.CONDITION.x,361):false,
    bottomIntelligibility:macros.INTELLIGIBILITY?near(macros.INTELLIGIBILITY.w,297)&&near(macros.INTELLIGIBILITY.x,687):false,
    bottomMix:macros.MIX?near(macros.MIX.w,316)&&near(macros.MIX.x,995):false,
    bottomEq:macros.EQ_TONE?near(macros.EQ_TONE.w,337)&&near(macros.EQ_TONE.x,1322):false,

    ambience:macros.AMBIENCE?near(macros.AMBIENCE.w,322)&&near(macros.AMBIENCE.h,350)&&near(macros.AMBIENCE.x,1337)&&near(macros.AMBIENCE.y,380):false
  };
  return {ui:"UI_02",ok:Object.values(checks).every(Boolean),checks,failures:fail(checks)};
}
window.auditReferenceGeometry=auditReferenceGeometry;
