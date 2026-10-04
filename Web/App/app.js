const $=(q,r=document)=>r.querySelector(q);
const $$=(q,r=document)=>[...r.querySelectorAll(q)];
const TYPES=["SOURCE","TRANSMISSION","WALL_COVER","SPACE_ENVIRONMENT"];
const TYPE_LABEL={SOURCE:"SOURCE",TRANSMISSION:"TRANSMISSION",WALL_COVER:"WALL / COVER",SPACE_ENVIRONMENT:"SPACE / ENVIRONMENT"};
const defaults={
  SOURCE:"SRC_003_Smartphone_Speakerphone",
  TRANSMISSION:"TRN_005_GSM_Stable",
  WALL_COVER:"CVR_001_None_Open",
  SPACE_ENVIRONMENT:"SPC_022_Busy_City_Street"
};
const state={
  ui:"UI_01",view:"3D",tab:"spectrum",selection:{...defaults},
  controls:{motion:50,badSignal:20,condition:20,intelligibility:70,ambience:35,mix:100,speed:60},
  preset:null,bypass:true,snapshots:{A:null,B:null,C:null,D:null}
};
let catalog=[],byId=new Map(),activeBrowserType="SOURCE";
let audioCtx,sourceNode,analyser,gainNode,audioReady=false;
const audio=$("#audioElement");

function assetUrl(item){
  const rel=state.ui==="UI_01"?item.ui01:item.ui02;
  return "../../Assets/UI/"+rel;
}
function db(v){return v<=1e-7?-Infinity:20*Math.log10(v)}
function fmtDb(v){return !isFinite(v)?"−∞":v.toFixed(1)}

async function init(){
  const data=await fetch("./data/catalog.json").then(r=>r.json());
  catalog=data.items; byId=new Map(catalog.map(x=>[x.id,x]));
  const presets=catalog.filter(x=>x.type==="SCENE_PRESET_HERO");
  $("#presetSelect").innerHTML='<option value="">— Select scene preset —</option>'+presets.map(x=>`<option value="${x.id}">${x.name}</option>`).join("");
  if(new URLSearchParams(location.search).has("test")) $("#diagnosticBar").classList.remove("hidden");
  renderModules(); renderMacros(); renderSignalFlow(); bind(); drawSpaceFallback(); animate();
}
function renderModules(){
  $("#moduleRail").innerHTML=TYPES.map(t=>{
    const item=byId.get(state.selection[t]); if(!item) return "";
    return `<article class="module-card" data-type="${t}">
      <div class="module-art"><img src="${assetUrl(item)}" alt="" onerror="this.closest('.module-card').classList.add('missing');this.remove()"></div>
      <div class="module-meta"><span>${TYPE_LABEL[t]}</span><strong>${item.name}</strong><em>SELECT</em></div>
    </article>`;
  }).join("");
  $$(".module-card").forEach(el=>el.onclick=()=>openBrowser(el.dataset.type));
  const s=byId.get(state.selection.SOURCE); if(s) $("#sourceLabel").textContent=s.name.toUpperCase();
}
function renderMacros(){
  const defs=[
    ["MOTION","motion","%"],["BAD SIGNAL","badSignal","%"],["CONDITION","condition","%"],
    ["INTELLIGIBILITY","intelligibility","%"],["AMBIENCE","ambience","%"],["MIX","mix","%"],["SPEED","speed","km/h"]
  ];
  $("#macroStrip").innerHTML=defs.map(([label,key,unit])=>`<div class="macro"><h3>${label}</h3>
    <div class="macro-read"><strong id="v_${key}">${state.controls[key]}</strong><span>${unit}</span></div>
    <input type="range" min="0" max="${key==="speed"?180:100}" step="1" value="${state.controls[key]}" data-control="${key}">
  </div>`).join("");
  $$("#macroStrip input").forEach(sl=>sl.addEventListener("input",e=>{
    const k=e.target.dataset.control; state.controls[k]=+e.target.value; $("#v_"+k).textContent=e.target.value;
    updateScene();
  }));
}
function renderSignalFlow(){
  const nodes=["INPUT","TRANSMISSION","SOURCE","CONDITION","COVER","DISTANCE / MOTION","SPACE","AMBIENCE","INTELLIGIBILITY","TONE","MIX / OUTPUT"];
  $("#signalFlow").innerHTML=nodes.map((n,i)=>`<span class="flow-node">${n}</span>${i<nodes.length-1?'<span class="flow-arrow">→</span>':""}`).join("");
}
function bind(){
  $$("[data-ui]").forEach(b=>b.onclick=()=>setUI(b.dataset.ui));
  $$("[data-view]").forEach(b=>b.onclick=()=>{$$("[data-view]").forEach(x=>x.classList.toggle("active",x===b));state.view=b.dataset.view;updateScene()});
  $$("[data-tab]").forEach(b=>b.onclick=()=>{state.tab=b.dataset.tab;$$("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));$$(".tab-content").forEach(x=>x.classList.toggle("active",x.dataset.content===state.tab))});
  $("#browserClose").onclick=closeBrowser; $("#assetBrowser").onclick=e=>{if(e.target.id==="assetBrowser")closeBrowser()};
  $("#assetSearch").oninput=renderBrowserList; $("#categorySelect").onchange=renderBrowserList;
  $("#presetSelect").onchange=e=>{state.preset=e.target.value||null; const p=byId.get(state.preset); $("#sceneTitle").textContent=p?p.name:"Scene View"};
  $("#globalBypass").onclick=()=>{state.bypass=!state.bypass;$("#globalBypass").classList.toggle("active",state.bypass);$("#globalBypass").textContent=state.bypass?"BYPASS":"PROCESS"};
  $("#audioFile").onchange=loadAudio; $("#playBtn").onclick=playAudio; $("#stopBtn").onclick=stopAudio; $("#loopToggle").onchange=e=>audio.loop=e.target.checked;
  $$("[data-snapshot]").forEach(b=>b.onclick=()=>snapshot(b.dataset.snapshot,b));
}
function setUI(ui){
  state.ui=ui; document.body.classList.toggle("ui-01",ui==="UI_01");document.body.classList.toggle("ui-02",ui==="UI_02");
  $$("[data-ui]").forEach(b=>b.classList.toggle("active",b.dataset.ui===ui)); renderModules();
}
function openBrowser(type){
  activeBrowserType=type; $("#browserTitle").textContent=TYPE_LABEL[type];
  const cats=[...new Set(catalog.filter(x=>x.type===type).map(x=>x.category))];
  $("#categorySelect").innerHTML='<option value="">All categories</option>'+cats.map(c=>`<option>${c}</option>`).join("");
  $("#assetSearch").value=""; $("#assetBrowser").classList.remove("hidden"); renderBrowserList(); previewAsset(byId.get(state.selection[type]));
}
function closeBrowser(){ $("#assetBrowser").classList.add("hidden") }
function renderBrowserList(){
  const q=$("#assetSearch").value.trim().toLowerCase(),cat=$("#categorySelect").value;
  const items=catalog.filter(x=>x.type===activeBrowserType&&(!cat||x.category===cat)&&(!q||x.name.toLowerCase().includes(q)||x.id.toLowerCase().includes(q)));
  $("#assetList").innerHTML=items.map(x=>`<button class="asset-item ${state.selection[activeBrowserType]===x.id?"active":""}" data-id="${x.id}"><span>${x.category}</span><strong>${x.name}</strong></button>`).join("");
  $$(".asset-item").forEach(b=>{b.onmouseenter=()=>previewAsset(byId.get(b.dataset.id));b.onclick=()=>{state.selection[activeBrowserType]=b.dataset.id;renderModules();renderBrowserList();previewAsset(byId.get(b.dataset.id)}})
}
function previewAsset(item){
  if(!item)return;
  $("#assetPreview").innerHTML=`<div class="preview-art"><img src="${assetUrl(item)}" alt="" onerror="this.remove()"></div><div class="preview-title">${item.name}</div><div class="preview-id">${item.id}</div>`;
}
function updateScene(){
  const p=state.controls.motion/100;
  const x=110+(790*p), y=325-55*Math.sin(Math.PI*p);
  $("#sourceNode").setAttribute("transform",`translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  $("#distanceLine").setAttribute("x1",x);$("#distanceLine").setAttribute("y1",y);
  const dx=x-500,dy=y-270,dist=Math.max(3,Math.sqrt(dx*dx+dy*dy)/4.9);
  $("#distanceText").setAttribute("x",(x+500)/2);$("#distanceText").setAttribute("y",(y+270)/2-10);
  $("#distanceText").textContent=dist.toFixed(1)+" m";$("#currentDistance").textContent=dist.toFixed(1)+" m";
  $("#speedReadout").textContent=state.controls.speed+" km/h";
  $("#sceneBuildings").setAttribute("opacity",state.view==="TOP"?".28":".9");
}
function snapshot(slot,button){
  if(!state.snapshots[slot]) state.snapshots[slot]=JSON.parse(JSON.stringify({selection:state.selection,controls:state.controls,preset:state.preset}));
  else {const s=state.snapshots[slot];state.selection={...s.selection};state.controls={...s.controls};state.preset=s.preset;renderModules();renderMacros();$("#presetSelect").value=state.preset||"";updateScene()}
  $$("[data-snapshot]").forEach(x=>x.classList.toggle("active",x===button));
}
async function setupAudio(){
  if(audioReady)return;
  audioCtx=new (window.AudioContext||window.webkitAudioContext)(); sourceNode=audioCtx.createMediaElementSource(audio); analyser=audioCtx.createAnalyser(); gainNode=audioCtx.createGain();
  analyser.fftSize=2048; analyser.smoothingTimeConstant=.72; sourceNode.connect(analyser); analyser.connect(gainNode);gainNode.connect(audioCtx.destination);audioReady=true;
}
async function loadAudio(e){
  const f=e.target.files?.[0]; if(!f)return; await setupAudio(); audio.src=URL.createObjectURL(f); $("#buildLabel").textContent="WEB TEST · "+f.name+" · DSP PASS-THROUGH";
}
async function playAudio(){await setupAudio();await audioCtx.resume(); if(audio.src) audio.play()}
function stopAudio(){audio.pause();audio.currentTime=0}
function animate(){
  requestAnimationFrame(animate); updateTime(); drawSpectrum(); updateMeters(); updateScene();
}
function updateTime(){
  const t=audio.currentTime||0,m=Math.floor(t/60),s=Math.floor(t%60),ms=Math.floor((t%1)*1000);$("#transportTime").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(ms).padStart(3,"0")}`;
}
function drawSpectrum(){
  const c=$("#spectrumCanvas"),ctx=c.getContext("2d"),w=c.width,h=c.height;ctx.clearRect(0,0,w,h);ctx.fillStyle="#0b1013";ctx.fillRect(0,0,w,h);
  ctx.strokeStyle="#233038";ctx.lineWidth=1;for(let i=1;i<8;i++){ctx.beginPath();ctx.moveTo(i*w/8,0);ctx.lineTo(i*w/8,h);ctx.stroke()}for(let i=1;i<5;i++){ctx.beginPath();ctx.moveTo(0,i*h/5);ctx.lineTo(w,i*h/5);ctx.stroke()}
  if(!analyser)return;const data=new Uint8Array(analyser.frequencyBinCount);analyser.getByteFrequencyData(data);ctx.strokeStyle="#89c8d8";ctx.lineWidth=2;ctx.beginPath();for(let x=0;x<w;x++){const i=Math.floor((x/w)*(data.length-1));const y=h-(data[i]/255)*h*.92;(x?ctx.lineTo(x,y):ctx.moveTo(x,y))}ctx.stroke();
}
function drawSpaceFallback(){}
function updateMeters(){
  if(!analyser){$("#inMeter").style.height="0%";$("#outMeter").style.height="0%";return}
  const d=new Uint8Array(analyser.fftSize);analyser.getByteTimeDomainData(d);let peak=0,sum=0;for(const x of d){const v=(x-128)/128;peak=Math.max(peak,Math.abs(v));sum+=v*v}const rms=Math.sqrt(sum/d.length),pdb=db(peak),rdb=db(rms),pct=Math.max(0,Math.min(100,(pdb+60)/60*100));
  $("#inMeter").style.height=pct+"%";$("#outMeter").style.height=pct+"%";$("#peakValue").textContent=fmtDb(pdb);$("#rmsValue").textContent=fmtDb(rdb);
}
init().catch(err=>{console.error(err);$("#buildLabel").textContent="WEB TEST · INIT ERROR"});
