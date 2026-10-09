// Fast: one bounded compile/execution smoke, not a stress suite.
#include "../../Source/DSP/SceneProcessor.h"
#include <cassert>
#include <cmath>
#include <cstdio>
int main(int argc,char**) {
    sourcerune::dsp::SceneProcessor dsp;
    sourcerune::dsp::Parameters p;
    dsp.prepare(48000);p.sourceCharacter=100;p.badSignal=60;dsp.setParameters(p);dsp.reset();
    float left[128],right[128],out[128],outR[128];
    double delta=0,energy=0;
    unsigned seed=7;
    for(int block=0;block<160;++block){
        if(block==40){p.badSignal=0;p.bandwidthLoss=80;dsp.setParameters(p);}
        if(block==80){p.globalBypass=true;dsp.setParameters(p);}
        if(block==120){p.globalBypass=false;p.sourceModel=40;dsp.setParameters(p);}
        for(int i=0;i<128;++i){seed=seed*1664525u+1013904223u;left[i]=(float(int(seed>>16))-32768)/65536;right[i]=left[i]*0.5f;}
        dsp.process(left,right,out,outR,128);
        for(int i=0;i<128;++i){assert(std::isfinite(out[i])&&std::abs(out[i])<=1);delta+=std::abs(out[i]-left[i]);energy+=out[i]*out[i];}
        if(argc>1)std::fwrite(out,sizeof(float),128,stdout);
    }
    assert(delta>100&&energy>1);
    p.globalBypass=true;dsp.setParameters(p);dsp.reset();dsp.process(left,right,out,outR,128);
    for(int i=0;i<128;++i){assert(out[i]==left[i]);assert(outR[i]==right[i]);}
    if(argc==1)std::puts("Native DSP smoke PASS: audible delta, finite output, exact bypass, stereo");
}
