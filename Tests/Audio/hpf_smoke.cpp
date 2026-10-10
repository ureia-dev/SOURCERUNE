// One-shot native HPF audio correctness (not safety-stress loop).
#include "../../Source/DSP/Tone/Hpf.h"
#include <cmath>
#include <cstdio>
#include <cassert>
static double energy(sourcerune::dsp::HighPass& hp,int freq){
  constexpr int N=128,rate=48000;float l[N]{},r[N]{};double sum=0;
  for(int off=0;off<rate;off+=N){
    for(int i=0;i<N;i++){float x=0.25f*std::sin(6.283185307179586*(off+i)*freq/rate);l[i]=r[i]=x;}
    hp.process(l,r,N);
    if(off>=rate/2)for(int i=0;i<N;i++){
      assert(std::isfinite(l[i])&&std::abs(l[i]-r[i])<1e-6);sum+=l[i]*l[i];
    }
  }
  return std::sqrt(sum/(rate-rate/2));
}
int main(){
  sourcerune::dsp::HighPass hp;hp.prepare(48000);hp.set(240,true);
  double low=energy(hp,40);hp.reset();double high=energy(hp,4000);
  const double attenuation=20*std::log10(low/high);
  assert(attenuation<-20&&high>.15);
  hp.set(20,true);hp.reset();float a[128],b[128];
  for(int i=0;i<128;i++)a[i]=b[i]=i*.0001f;
  hp.process(a,b,128);for(int i=0;i<128;i++)assert(a[i]==b[i]);
  std::printf("HPF PASS: 40 Hz vs 4k Hz attenuation %.2f dB; bypass bit-exact\n",attenuation);
}
