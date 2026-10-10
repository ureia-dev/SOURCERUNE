export const supportedSource = new Set([1,2,3,11,40]);
export const supportedTransmission = new Set([1,2,3,5,11]);
const modelNumber = id => Number(String(id).split('_')[1]) || 0;
export function parametersFromState(state) {
  const p=state.params, b=state.bypass;
  return [p.sourceCharacter,p.badSignal,p.bandwidthLoss,p.inputGain,p.mix,p.outputGain,
    modelNumber(state.selection.SOURCE),modelNumber(state.selection.TRANSMISSION),
    Number(!!b.SOURCE),Number(!!b.TRANSMISSION),Number(!!state.globalBypass)];
}
export function hpfFromState(state) {
  const hz=Number(state.params?.hpf??20);
  const bypass=!!(state.globalBypass||state.bypass?.EQ_TONE);
  return [Math.max(20,Math.min(1000,Number.isFinite(hz)?hz:20)),Number(!bypass&&hz>20)];
}
export function eq3FromState(state){
  const p=state.params;
  return [p.lpf,p.b1Freq,p.b1Gain,p.b1Q,p.b2Freq,p.b2Gain,p.b2Q,
    p.b3Freq,p.b3Gain,p.b3Q,Number(!!(state.globalBypass||state.bypass?.EQ_TONE))];
}
export function audioSupportNote(state) {
  const source=supportedSource.has(modelNumber(state.selection.SOURCE));
  const transmission=supportedTransmission.has(modelNumber(state.selection.TRANSMISSION));
  return `MVP DSP · SOURCE ${source?'頻響已接入':'此型號尚未接入'} · TRANSMISSION ${transmission?'頻寬已接入':'此型號尚未接入'} · HPF ${hpfFromState(state)[1]?'12 dB/oct 已啟用':'可調/目前關閉'} · LPF／3-band EQ 已接入，Final Tone／其餘模組待開發`;
}
export async function createSceneNode(context, state) {
  if(!context.audioWorklet)throw new Error('需要支援 AudioWorklet 的瀏覽器與 HTTPS／localhost');
  const [response,toneResponse,eqResponse]=await Promise.all([
    fetch(new URL('./sourcerune.wasm',import.meta.url)),
    fetch(new URL('./hpf.wasm',import.meta.url)),
    fetch(new URL('./eq3.wasm',import.meta.url))
  ]);
  if(!response.ok||!toneResponse.ok||!eqResponse.ok)throw new Error(`DSP 載入失敗 (scene ${response.status}, HPF ${toneResponse.status}, EQ3 ${eqResponse.status})`);
  const [bytes,toneBytes,eqBytes]=await Promise.all([response.arrayBuffer(),toneResponse.arrayBuffer(),eqResponse.arrayBuffer()]);
  await context.audioWorklet.addModule(new URL('./processor.js',import.meta.url));
  const node=new AudioWorkletNode(context,'sourcerune-scene',{
    numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,
    channelCountMode:'explicit',processorOptions:{bytes,toneBytes,eqBytes,parameters:parametersFromState(state),hpf:hpfFromState(state),eq3:eq3FromState(state)}
  });
  await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error('DSP 啟動逾時')),10000);
    node.onprocessorerror=()=>{clearTimeout(timer);reject(new Error('DSP 啟動失敗'));};
    node.port.onmessage=({data})=>{
      if(data.type==='ready'){clearTimeout(timer);resolve();}
      if(data.type==='error'){clearTimeout(timer);reject(new Error(data.message));}
    };
  });
  return node;
}
