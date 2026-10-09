// Deep (manual): one native/WASM fixture, default sample rate 48 kHz.
const fs=require('node:fs'),assert=require('node:assert/strict');
const module_=new WebAssembly.Module(fs.readFileSync('Web/App/audio/sourcerune.wasm'));
const e=new WebAssembly.Instance(module_,{env:{cosf:Math.cos,sinf:Math.sin,powf:Math.pow}}).exports;
const l=new Float32Array(e.memory.buffer,e.sr_input(0),128),r=new Float32Array(e.memory.buffer,e.sr_input(1),128);
const out=new Float32Array(e.memory.buffer,e.sr_output(0),128);
const data=fs.readFileSync(process.argv[2]);
assert.equal(data.length,160*128*4);
const params=[100,60,0,0,100,0,3,5,0,0,0];
e.sr_prepare(48000);e.sr_parameters(...params);e.sr_reset();
let seed=7,maxError=0,delta=0;
for(let b=0;b<160;b++){
  if(b===40){params[1]=0;params[2]=80;e.sr_parameters(...params);}
  if(b===80){params[10]=1;e.sr_parameters(...params);}
  if(b===120){params[10]=0;params[6]=40;e.sr_parameters(...params);}
  for(let i=0;i<128;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;l[i]=((seed>>>16)-32768)/65536;r[i]=l[i]*0.5;}
  e.sr_process(128);
  for(let i=0;i<128;i++){assert(Number.isFinite(out[i]));maxError=Math.max(maxError,Math.abs(out[i]-data.readFloatLE((b*128+i)*4)));delta+=Math.abs(out[i]-l[i]);}
}
assert(maxError<0.0002,`native/WASM mismatch ${maxError}`);assert(delta>100);
console.log(JSON.stringify({result:'PASS',sampleRate:48000,samples:20480,maxError,delta}));
