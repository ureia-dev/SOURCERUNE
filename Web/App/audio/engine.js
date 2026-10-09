export const supportedSource = new Set([1,2,3,11,40]);
export const supportedTransmission = new Set([1,2,3,5,11]);
const modelNumber = id => Number(String(id).split('_')[1]) || 0;
export function parametersFromState(state) {
  const p=state.params, b=state.bypass;
  return [p.sourceCharacter,p.badSignal,p.bandwidthLoss,p.inputGain,p.mix,p.outputGain,
    modelNumber(state.selection.SOURCE),modelNumber(state.selection.TRANSMISSION),
    Number(!!b.SOURCE),Number(!!b.TRANSMISSION),Number(!!state.globalBypass)];
}
export function audioSupportNote(state) {
  const source=supportedSource.has(modelNumber(state.selection.SOURCE));
  const transmission=supportedTransmission.has(modelNumber(state.selection.TRANSMISSION));
  return `MVP DSP · SOURCE ${source?'頻響已接入':'此型號尚未接入'} · TRANSMISSION ${transmission?'頻寬已接入':'此型號尚未接入'} · 其餘模組待開發`;
}
export async function createSceneNode(context, state) {
  if(!context.audioWorklet)throw new Error('需要支援 AudioWorklet 的瀏覽器與 HTTPS／localhost');
  const response=await fetch(new URL('./sourcerune.wasm',import.meta.url));
  if(!response.ok)throw new Error(`DSP 載入失敗 (${response.status})`);
  const bytes=await response.arrayBuffer();
  await context.audioWorklet.addModule(new URL('./processor.js',import.meta.url));
  const node=new AudioWorkletNode(context,'sourcerune-scene',{
    numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,
    channelCountMode:'explicit',processorOptions:{bytes,parameters:parametersFromState(state)}
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
