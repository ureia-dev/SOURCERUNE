// Render-only transfer function of the *shared* RBJ HPF/LPF + exactly three bells.
// Frequency response recomputes on UI state changes, never in the audio callback.
export function eqGraph(state,sampleRate=48000){
  const p=state.params,sections=[];
  const design=(kind,f,g=0,q=Math.SQRT1_2)=>{
    const w=2*Math.PI*Math.max(20,Math.min(f,sampleRate*.45))/sampleRate;
    const cs=Math.cos(w),sn=Math.sin(w),alpha=sn/(2*q),A=Math.pow(10,g/40);
    let b0,b1,b2,a0,a1,a2;
    if(kind==="bell"){b0=1+alpha*A;b1=-2*cs;b2=1-alpha*A;a0=1+alpha/A;a1=-2*cs;a2=1-alpha/A;}
    else {const hp=kind==="hp";b0=(hp?1+cs:1-cs)*.5;b1=(hp?-2:2)*b0;b2=b0;a0=1+alpha;a1=-2*cs;a2=1-alpha;}
    sections.push([b0/a0,b1/a0,b2/a0,a1/a0,a2/a0]);
  };
  if(!state.bypass.EQ_TONE){
    if(p.hpf>20.5)design("hp",p.hpf);
    if(p.lpf<19995)design("lp",p.lpf);
    for(let b=1;b<=3;b++)if(Math.abs(p["b"+b+"Gain"])>.0001)
      design("bell",p["b"+b+"Freq"],p["b"+b+"Gain"],p["b"+b+"Q"]);
  }
  const freqX=f=>Math.log10(Math.max(20,Math.min(f,20000))/20)/3*100;
  const response=f=>{
    const w=2*Math.PI*f/sampleRate,c=Math.cos(w),s=Math.sin(w),c2=Math.cos(2*w),s2=Math.sin(2*w);
    let v=0;for(const [b0,b1,b2,a1,a2] of sections){
      const nr=b0+b1*c+b2*c2,ni=-b1*s-b2*s2,dr=1+a1*c+a2*c2,di=-a1*s-a2*s2;
      v+=10*Math.log10(Math.max(1e-12,(nr*nr+ni*ni)/(dr*dr+di*di)));
    }
    return Math.max(-36,Math.min(18,v));
  };
  const y=f=>Math.max(4,Math.min(96,50-response(f)/18*34));
  const path=Array.from({length:101},(_,i)=>{
    const f=20*Math.pow(1000,i/100);
    return(i?"L":"M")+i+" "+y(f).toFixed(2);
  }).join(" ");
  const nodes=[["hpf",p.hpf],["b1",p.b1Freq],["b2",p.b2Freq],["b3",p.b3Freq],["lpf",p.lpf]]
    .map(([id,f])=>({id,x:Math.max(3,Math.min(97,freqX(f))),y:y(f)}));
  return {path,nodes};
}
export function miniEqSvg(state,sampleRate=48000){
  const {path,nodes}=eqGraph(state,sampleRate);
  return `<svg class="macro-eq-svg" viewBox="0 0 100 100" preserveAspectRatio="none"
    role="group" aria-label="Drag HPF LPF or EQ band 1 to 3">
    <g class="macro-eq-grid"><path d="M0 25H100M0 50H100M0 75H100M25 0V100M50 0V100M75 0V100"/></g>
    <path class="macro-eq-line" data-eq-hpf-path d="${path}"/>
    ${nodes.map(n=>`<circle data-eq-node="${n.id}" ${n.id==="hpf"?"data-eq-hpf-marker":""} role="slider" tabindex="0"
      aria-label="${n.id==="hpf"?"HPF":n.id==="lpf"?"LPF":n.id.toUpperCase()}"
      cx="${n.x.toFixed(2)}" cy="${n.y.toFixed(2)}" r="3.5"/>`).join("")}
  </svg>`;
}
