#include "Parametric3.h"
// Freestanding wasm32 has no libc. Clang's aggregate copies may lower to
// memcpy/memset even when the audio DSP itself uses no heap or I/O.
#ifdef __wasm__
extern "C" __attribute__((optnone)) void* memcpy(void* destination,const void* source,__SIZE_TYPE__ count){
    volatile unsigned char* dst=(volatile unsigned char*)destination;
    const volatile unsigned char* src=(const volatile unsigned char*)source;
    for(__SIZE_TYPE__ i=0;i<count;++i)dst[i]=src[i];
    return destination;
}
extern "C" __attribute__((optnone)) void* memset(void* destination,int value,__SIZE_TYPE__ count){
    volatile unsigned char* dst=(volatile unsigned char*)destination;
    for(__SIZE_TYPE__ i=0;i<count;++i)dst[i]=(unsigned char)value;
    return destination;
}
#endif

namespace {sourcerune::dsp::Parametric3 eq;float buffers[2][128]{};}
extern "C" {
int sr_eq3_version(){return 1;}
void sr_eq3_prepare(float sr){eq.prepare(sr);}
void sr_eq3_set(float lpf,float f1,float g1,float q1,float f2,float g2,float q2,
                float f3,float g3,float q3,int bypass){
    sourcerune::dsp::Parametric3::Params p;
    p.lpf=lpf;
    p.frequency[0]=f1;p.gain[0]=g1;p.q[0]=q1;
    p.frequency[1]=f2;p.gain[1]=g2;p.q[1]=q2;
    p.frequency[2]=f3;p.gain[2]=g3;p.q[2]=q3;
    p.bypass=bypass!=0;eq.set(p);
}
void sr_eq3_reset(){eq.reset();}
float* sr_eq3_buffer(int channel){return buffers[channel==1?1:0];}
int sr_eq3_active(){return eq.active()?1:0;}
void sr_eq3_process(int n){if(n>0&&n<=128)eq.process(buffers[0],buffers[1],unsigned(n));}
}
