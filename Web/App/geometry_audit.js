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
    const panelHead=document.querySelector(".scene-panel .panel-head");
    const sceneSvg=document.querySelector("#sceneSvg");
    const tabs=document.querySelector(".analysis-panel .tabs");
    const meterSlot=document.querySelector(".meter-slot");
    const meterMode=document.querySelector(".meter-mode-toggle");
    const gear=document.querySelector("#settingsBtn");
    const macros=Object.fromEntries([...document.querySelectorAll("#macroStrip .macro")].map(e=>[e.dataset.open,box(e)]));
    const cardPart=(type,sel)=>document.querySelector(`.module-card[data-type="${type}"] ${sel}`);
    const art=Object.fromEntries(["SOURCE","TRANSMISSION","WALL_COVER","SPACE_ENVIRONMENT"].map(t=>[t,cardPart(t,".module-art")]));
    const edit=Object.fromEntries(["SOURCE","TRANSMISSION","WALL_COVER","SPACE_ENVIRONMENT"].map(t=>[t,cardPart(t,"[data-edit]")]));
    const arrow=Object.fromEntries(["SOURCE","TRANSMISSION","WALL_COVER","SPACE_ENVIRONMENT"].map(t=>[t,cardPart(t,".module-cycle-next")]));
    const checks={
      appW:near(box(app).w,1499), appH:near(box(app).h,807),
      topH:near(box(topbar).h,58),
      wsH:near(box(ws).h,528),
      sceneH:near(box(scene).h,262),
      sceneRect:near(box(scene).x,333)&&near(box(scene).y,58)&&near(box(scene).w,967)&&near(box(scene).h,262),
      sceneHeadH:panelHead?near(box(panelHead).h,34):false,
      sceneGraphH:sceneSvg?near(box(sceneSvg).h,186):false,
      sceneViewBox:sceneSvg?sceneSvg.getAttribute("viewBox")==="0 140 1000 192":false,
      analysisH:ana?near(box(ana).h,247):false,
      analysisRect:ana?near(box(ana).x,333)&&near(box(ana).y,328)&&near(box(ana).w,967)&&near(box(ana).h,247):false,
      analysisTabsH:tabs?near(box(tabs).h,37):false,
      meterH:meter?near(box(meter).h,376):false,
      meterRect:meter?near(box(meter).x,1310)&&near(box(meter).y,58)&&near(box(meter).w,179)&&near(box(meter).h,376):false,
      moduleRailH:rail?near(box(rail).h,520):false,
      meterSlot:meterSlot?near(box(meterSlot).w,20)&&near(box(meterSlot).h,178):false,
      meterMode:meterMode?near(box(meterMode).y,331)&&near(box(meterMode).h,30):false,
      macroStripH:near(box(macro).h,221),
      macroStripRect:near(box(macro).x,0)&&near(box(macro).y,586)&&near(box(macro).w,1499)&&near(box(macro).h,221),
      gear:gear?near(box(gear).w,38)&&near(box(gear).h,38)&&near(box(gear).y,9)&&near(box(gear).x,1451):false,

      sourceCard:cards.SOURCE?near(cards.SOURCE.h,136)&&near(cards.SOURCE.x,10)&&near(cards.SOURCE.y,58):false,
      transmissionCard:cards.TRANSMISSION?near(cards.TRANSMISSION.h,132)&&near(cards.TRANSMISSION.y,201):false,
      wallCard:cards.WALL_COVER?near(cards.WALL_COVER.h,132)&&near(cards.WALL_COVER.y,340):false,
      spaceCard:cards.SPACE_ENVIRONMENT?near(cards.SPACE_ENVIRONMENT.h,97)&&near(cards.SPACE_ENVIRONMENT.y,478):false,

      sourceArt:art.SOURCE?near(box(art.SOURCE).x,19)&&near(box(art.SOURCE).y,115)&&near(box(art.SOURCE).w,239)&&near(box(art.SOURCE).h,72):false,
      transmissionArt:art.TRANSMISSION?near(box(art.TRANSMISSION).x,19)&&near(box(art.TRANSMISSION).y,257)&&near(box(art.TRANSMISSION).w,239)&&near(box(art.TRANSMISSION).h,70):false,
      wallArt:art.WALL_COVER?near(box(art.WALL_COVER).x,19)&&near(box(art.WALL_COVER).y,397)&&near(box(art.WALL_COVER).w,239)&&near(box(art.WALL_COVER).h,69):false,
      spaceArt:art.SPACE_ENVIRONMENT?near(box(art.SPACE_ENVIRONMENT).x,19)&&near(box(art.SPACE_ENVIRONMENT).y,533)&&near(box(art.SPACE_ENVIRONMENT).w,239)&&near(box(art.SPACE_ENVIRONMENT).h,35):false,

      sourceEdit:edit.SOURCE?near(box(edit.SOURCE).x,270)&&near(box(edit.SOURCE).y,72)&&near(box(edit.SOURCE).w,48)&&near(box(edit.SOURCE).h,34):false,
      transmissionEdit:edit.TRANSMISSION?near(box(edit.TRANSMISSION).x,270)&&near(box(edit.TRANSMISSION).y,213)&&near(box(edit.TRANSMISSION).w,48)&&near(box(edit.TRANSMISSION).h,34):false,
      wallEdit:edit.WALL_COVER?near(box(edit.WALL_COVER).x,270)&&near(box(edit.WALL_COVER).y,353)&&near(box(edit.WALL_COVER).w,48)&&near(box(edit.WALL_COVER).h,34):false,
      spaceEdit:edit.SPACE_ENVIRONMENT?near(box(edit.SPACE_ENVIRONMENT).x,270)&&near(box(edit.SPACE_ENVIRONMENT).y,489)&&near(box(edit.SPACE_ENVIRONMENT).w,48)&&near(box(edit.SPACE_ENVIRONMENT).h,34):false,

      sourceArrow:arrow.SOURCE?near(box(arrow.SOURCE).x,269)&&near(box(arrow.SOURCE).y,115)&&near(box(arrow.SOURCE).w,49)&&near(box(arrow.SOURCE).h,72):false,
      transmissionArrow:arrow.TRANSMISSION?near(box(arrow.TRANSMISSION).x,269)&&near(box(arrow.TRANSMISSION).y,257)&&near(box(arrow.TRANSMISSION).w,49)&&near(box(arrow.TRANSMISSION).h,70):false,
      wallArrow:arrow.WALL_COVER?near(box(arrow.WALL_COVER).x,269)&&near(box(arrow.WALL_COVER).y,397)&&near(box(arrow.WALL_COVER).w,49)&&near(box(arrow.WALL_COVER).h,70):false,
      spaceArrow:arrow.SPACE_ENVIRONMENT?near(box(arrow.SPACE_ENVIRONMENT).x,269)&&near(box(arrow.SPACE_ENVIRONMENT).y,532)&&near(box(arrow.SPACE_ENVIRONMENT).w,49)&&near(box(arrow.SPACE_ENVIRONMENT).h,36):false,

      centerX:near(box(center).x,333),
      meterX:meter?near(box(meter).x,1310):false,

      macroMotion:macros.MOTION?near(macros.MOTION.x,10)&&near(macros.MOTION.y,586)&&near(macros.MOTION.w,269)&&near(macros.MOTION.h,216):false,
      macroTransmission:macros.TRANSMISSION?near(macros.TRANSMISSION.x,287)&&near(macros.TRANSMISSION.y,586)&&near(macros.TRANSMISSION.w,178)&&near(macros.TRANSMISSION.h,216):false,
      macroCondition:macros.CONDITION?near(macros.CONDITION.x,473)&&near(macros.CONDITION.y,586)&&near(macros.CONDITION.w,201)&&near(macros.CONDITION.h,216):false,
      macroIntelligibility:macros.INTELLIGIBILITY?near(macros.INTELLIGIBILITY.x,682)&&near(macros.INTELLIGIBILITY.y,586)&&near(macros.INTELLIGIBILITY.w,201)&&near(macros.INTELLIGIBILITY.h,216):false,
      macroAmbience:macros.AMBIENCE?near(macros.AMBIENCE.x,891)&&near(macros.AMBIENCE.y,586)&&near(macros.AMBIENCE.w,155)&&near(macros.AMBIENCE.h,216):false,
      macroMix:macros.MIX?near(macros.MIX.x,1054)&&near(macros.MIX.y,586)&&near(macros.MIX.w,115)&&near(macros.MIX.h,216):false,
      macroEq:macros.EQ_TONE?near(macros.EQ_TONE.x,1177)&&near(macros.EQ_TONE.y,586)&&near(macros.EQ_TONE.w,312)&&near(macros.EQ_TONE.h,216):false
    };
    const measurements={
      scene:box(scene),
      analysis:ana?box(ana):null,
      meter:meter?box(meter):null,
      moduleRail:rail?box(rail):null,
      cards,
      art:Object.fromEntries(Object.entries(art).map(([k,e])=>[k,e?box(e):null])),
      edit:Object.fromEntries(Object.entries(edit).map(([k,e])=>[k,e?box(e):null])),
      arrow:Object.fromEntries(Object.entries(arrow).map(([k,e])=>[k,e?box(e):null])),
      macros
    };
    return {ui:"UI_01",ok:Object.values(checks).every(Boolean),checks,failures:fail(checks),measurements};
  }

  const cards=Object.fromEntries([...document.querySelectorAll(".module-card")].map(e=>[e.dataset.type,box(e)]));
  const meter=document.querySelector(".meter-rail");
  const sceneSvg=document.querySelector("#sceneSvg");
  const motionDeck=document.querySelector(".motion-readouts");
  const meterSlot=document.querySelector(".meter-slot");
  const gear=document.querySelector("#settingsBtn");
  const prev=document.querySelector("#presetPrevBtn");
  const next=document.querySelector("#presetNextBtn");
  const folder=document.querySelector("#presetVisualsBtn");
  const bottomKnob=document.querySelector(".macro-badsignal .macro-knob-face");
  const mixKnob=document.querySelector(".macro-mix .macro-knob-face");
  const macros=Object.fromEntries([...document.querySelectorAll("#macroStrip .macro")].map(e=>[e.dataset.open,box(e)]));
  const checks={
    appW:near(box(app).w,1672), appH:near(box(app).h,941),
    topH:near(box(topbar).h,78),
    wsH:near(box(ws).h,653),
    workspaceRect:near(box(ws).x,0)&&near(box(ws).y,78)&&near(box(ws).w,1672)&&near(box(ws).h,653),
    scenePanelH:near(box(scene).h,641),
    scenePanelRect:near(box(scene).x,356)&&near(box(scene).y,86)&&near(box(scene).w,972)&&near(box(scene).h,641),
    sceneVisualH:sceneSvg?near(box(sceneSvg).h,358):false,
    sceneVisualRect:sceneSvg?near(box(sceneSvg).x,356)&&near(box(sceneSvg).y,86)&&near(box(sceneSvg).w,972)&&near(box(sceneSvg).h,358):false,
    sceneViewBox:sceneSvg?sceneSvg.getAttribute("viewBox")==="0 0 1000 420":false,
    motionDeckH:motionDeck?near(box(motionDeck).h,283):false,
    motionDeckRect:motionDeck?near(box(motionDeck).x,356)&&near(box(motionDeck).y,444)&&near(box(motionDeck).w,972)&&near(box(motionDeck).h,283):false,

    sourceCard:cards.SOURCE?near(cards.SOURCE.w,334)&&near(cards.SOURCE.h,213)&&near(cards.SOURCE.x,13)&&near(cards.SOURCE.y,86):false,
    transmissionCard:cards.TRANSMISSION?near(cards.TRANSMISSION.w,334)&&near(cards.TRANSMISSION.h,166)&&near(cards.TRANSMISSION.x,13)&&near(cards.TRANSMISSION.y,308):false,
    wallCard:cards.WALL_COVER?near(cards.WALL_COVER.w,334)&&near(cards.WALL_COVER.h,247)&&near(cards.WALL_COVER.x,13)&&near(cards.WALL_COVER.y,483):false,
    spaceCard:cards.SPACE_ENVIRONMENT?near(cards.SPACE_ENVIRONMENT.w,322)&&near(cards.SPACE_ENVIRONMENT.h,285)&&near(cards.SPACE_ENVIRONMENT.x,1337)&&near(cards.SPACE_ENVIRONMENT.y,86):false,

    centerX:near(box(center).x,356),
    centerWidth:near(box(center).w,972),
    meter:meter?near(box(meter).w,440)&&near(box(meter).h,62)&&near(box(meter).x,1160)&&near(box(meter).y,8):false,
    meterSlot:meterSlot?near(box(meterSlot).w,150)&&near(box(meterSlot).h,15):false,
    macroStripH:near(box(macro).h,210),
    macroStripRect:near(box(macro).x,0)&&near(box(macro).y,731)&&near(box(macro).w,1672)&&near(box(macro).h,210),
    gear:gear?near(box(gear).w,38)&&near(box(gear).h,38)&&near(box(gear).y,18)&&near(box(gear).x,1624):false,
    presetPrev:prev?near(box(prev).w,42)&&near(box(prev).h,42):false,
    presetNext:next?near(box(next).w,42)&&near(box(next).h,42):false,
    presetFolder:folder?near(box(folder).w,44)&&near(box(folder).h,42):false,
    bottomKnob76:bottomKnob?near(box(bottomKnob).w,76)&&near(box(bottomKnob).h,76):false,
    mixKnob76:mixKnob?near(box(mixKnob).w,76)&&near(box(mixKnob).h,76):false,

    bottomTransmission:macros.TRANSMISSION?near(macros.TRANSMISSION.w,337)&&near(macros.TRANSMISSION.h,172)&&near(macros.TRANSMISSION.x,13)&&near(macros.TRANSMISSION.y,751):false,
    bottomCondition:macros.CONDITION?near(macros.CONDITION.w,315)&&near(macros.CONDITION.h,172)&&near(macros.CONDITION.x,361)&&near(macros.CONDITION.y,751):false,
    bottomIntelligibility:macros.INTELLIGIBILITY?near(macros.INTELLIGIBILITY.w,297)&&near(macros.INTELLIGIBILITY.h,172)&&near(macros.INTELLIGIBILITY.x,687)&&near(macros.INTELLIGIBILITY.y,751):false,
    bottomMix:macros.MIX?near(macros.MIX.w,316)&&near(macros.MIX.h,172)&&near(macros.MIX.x,995)&&near(macros.MIX.y,751):false,
    bottomEq:macros.EQ_TONE?near(macros.EQ_TONE.w,337)&&near(macros.EQ_TONE.h,172)&&near(macros.EQ_TONE.x,1322)&&near(macros.EQ_TONE.y,751):false,

    ambience:macros.AMBIENCE?near(macros.AMBIENCE.w,322)&&near(macros.AMBIENCE.h,350)&&near(macros.AMBIENCE.x,1337)&&near(macros.AMBIENCE.y,380):false
  };
  const measurements={
    workspace:box(ws),
    center:box(center),
    scene:box(scene),
    sceneSvg:sceneSvg?box(sceneSvg):null,
    motionDeck:motionDeck?box(motionDeck):null,
    meter:meter?box(meter):null,
    cards,
    macros,
    bottomKnob:bottomKnob?box(bottomKnob):null,
    mixKnob:mixKnob?box(mixKnob):null
  };
  return {ui:"UI_02",ok:Object.values(checks).every(Boolean),checks,failures:fail(checks),measurements};
}
window.auditReferenceGeometry=auditReferenceGeometry;
