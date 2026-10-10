// Visual-only spectrum overlay modeled after VVChain's logarithmic, smoothed
// analyzer presentation. Reuse SOURCERUNE's existing post-DSP AnalyserNode
// samples: NO AudioContext, additional FFT, audio node, timer, or DSP changes.
const POINTS=129;
const raw=new Float32Array(POINTS).fill(-90);
const frequencySmooth=new Float32Array(POINTS).fill(-90);
const trace=new Float32Array(POINTS).fill(-90);
let power=new Float64Array(0),prefix=new Float64Array(0),lastFrame=-Infinity,visible=false;
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const yFor=db=>(98-clamp((db+90)/90,0,1)*77);
function paint(graphs){
  let line="",fill="";
  for(let i=0;i<POINTS;i++){
    const x=i*100/(POINTS-1),y=yFor(trace[i]);
    const part=(i?"L":"M")+x.toFixed(3)+" "+y.toFixed(3);
    line+=part;
  }
  fill=line+" L100 100 L0 100 Z";
  for(const svg of graphs){
    svg.querySelector(".macro-eq-analyzer-line")?.setAttribute("d",line);
    svg.querySelector(".macro-eq-analyzer-fill")?.setAttribute("d",fill);
  }
}
export function updateEqAnalyzer(bins,sampleRate=48000,now=0,enabled=true){
  const graphs=document.querySelectorAll(".macro-eq-svg");
  if(!graphs.length)return;
  if(!enabled||!bins?.length){
    if(visible){
      visible=false;lastFrame=-Infinity;trace.fill(-90);
      for(const svg of graphs){
        svg.querySelector(".macro-eq-analyzer-line")?.setAttribute("d","");
        svg.querySelector(".macro-eq-analyzer-fill")?.setAttribute("d","");
      }
    }
    return;
  }
  // One visual frame per ~42 ms; upstream canvas already performed the FFT read.
  if(now-lastFrame<42)return;
  lastFrame=now;
  if(power.length!==bins.length){
    power=new Float64Array(bins.length);
    prefix=new Float64Array(bins.length+1);
    trace.fill(-90);
  }
  const binsPerHz=bins.length/(sampleRate*.5);
  prefix[0]=0;
  for(let b=0;b<bins.length;b++){
    const db=Number.isFinite(bins[b])?clamp(bins[b],-120,0):-120;
    power[b]=Math.pow(10,db/10);
    prefix[b+1]=prefix[b]+power[b];
  }
  for(let i=0;i<POINTS;i++){
    const centre=20*Math.pow(1000,i/(POINTS-1));
    const lower=centre/Math.pow(2,1/48),upper=centre*Math.pow(2,1/48);
    const first=clamp(Math.floor(lower*binsPerHz),1,bins.length-1);
    const last=clamp(Math.ceil(upper*binsPerHz),first,bins.length-1);
    let meanPower;
    if(last<=first+1){
      const at=clamp(centre*binsPerHz,1,bins.length-1);
      const lo=Math.floor(at),hi=Math.min(lo+1,bins.length-1);
      meanPower=power[lo]*(1-(at-lo))+power[hi]*(at-lo);
    }else meanPower=(prefix[last+1]-prefix[first])/(last-first+1);
    const db=10*Math.log10(Math.max(1e-12,meanPower));
    // VVChain-style visual tilt compensates the display's low-frequency weight.
    raw[i]=clamp(db+4.5*Math.log2(centre/1000),-90,0);
  }
  const at=i=>raw[clamp(i,0,POINTS-1)];
  for(let i=0;i<POINTS;i++){
    frequencySmooth[i]=(at(i-3)+6*at(i-2)+15*at(i-1)+20*at(i)+
      15*at(i+1)+6*at(i+2)+at(i+3))/64;
  }
  for(let i=0;i<POINTS;i++){
    const target=frequencySmooth[i],old=trace[i];
    trace[i]=old+(target>old?.70:.21)*(target-old);
  }
  visible=true;paint(graphs);
}
