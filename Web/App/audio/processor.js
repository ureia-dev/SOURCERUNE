// Thin transport adapter only: every audio calculation is in shared C++.
class SceneWorklet extends AudioWorkletProcessor {
  constructor(options) {
    super();
    try {
      const module=new WebAssembly.Module(options.processorOptions.bytes);
      const instance=new WebAssembly.Instance(module,{env:{
        sinf:Math.sin,cosf:Math.cos,powf:Math.pow
      }});
      this.dsp=instance.exports;
      if(this.dsp.sr_version()!==2)throw new Error('DSP ABI 不相容');
      this.dsp.sr_prepare(sampleRate);
      this.dsp.sr_parameters(...options.processorOptions.parameters);
      this.dsp.sr_reset();
      this.input=[0,1].map(c=>new Float32Array(this.dsp.memory.buffer,this.dsp.sr_input(c),128));
      this.output=[0,1].map(c=>new Float32Array(this.dsp.memory.buffer,this.dsp.sr_output(c),128));
      this.port.onmessage=({data})=>{
        if(data.type==='parameters')this.dsp.sr_parameters(...data.values);
        if(data.type==='reset')this.dsp.sr_reset();
      };
      this.port.postMessage({type:'ready'});
    } catch(error) { this.dsp=null;this.port.postMessage({type:'error',message:String(error)}); }
  }
  process(inputs,outputs) {
    const output=outputs[0],input=inputs[0];
    if(!this.dsp)return false;
    // Bounded chunks also support browsers with a non-128 render quantum.
    for(let offset=0;offset<output[0].length;offset+=128){
      const n=Math.min(128,output[0].length-offset);
      for(let c=0;c<2;c++){
        const src=input[c]||input[0];
        for(let i=0;i<n;i++)this.input[c][i]=src?src[offset+i]:0;
      }
      this.dsp.sr_process(n);
      for(let c=0;c<output.length;c++)for(let i=0;i<n;i++)output[c][offset+i]=this.output[c][i];
    }
    return true;
  }
}
registerProcessor('sourcerune-scene',SceneWorklet);
