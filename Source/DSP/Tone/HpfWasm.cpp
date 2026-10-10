#include "Hpf.h"
namespace {sourcerune::dsp::HighPass hpf;float buffers[2][128]{};}
extern "C" {
int sr_hpf_version(){return 1;}
void sr_hpf_prepare(float sr){hpf.prepare(sr);}
void sr_hpf_set(float hz,int on){hpf.set(hz,on!=0);}
void sr_hpf_reset(){hpf.reset();}
float* sr_hpf_buffer(int channel){return buffers[channel==1?1:0];}
int sr_hpf_active(){return hpf.active()?1:0;}
void sr_hpf_process(int n){if(n>0&&n<=128)hpf.process(buffers[0],buffers[1],unsigned(n));}
}
