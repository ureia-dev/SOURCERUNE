// One bounded Fast shared-C++ Tone/EQ smoke; no stress iterations.
#include "../../Source/DSP/Tone/Parametric3.h"
#include <cassert>
#include <cmath>
#include <cstdio>
int main(){
    sourcerune::dsp::Parametric3 eq;
    eq.prepare(48000);
    assert(!eq.active()); // Flat controls cost no sample processing.
    sourcerune::dsp::Parametric3::Params p;
    p.lpf=5500;p.gain[0]=6;p.gain[1]=-5;p.gain[2]=3;
    eq.set(p);eq.reset();assert(eq.active());
    float left[128],right[128],original[128];
    for(int i=0;i<128;i++){
        left[i]=original[i]=.2f*std::sin(6.283185307179586*12000*i/48000)
            +.2f*std::sin(6.283185307179586*1000*i/48000);
        right[i]=left[i];
    }
    double delta=0;
    eq.process(left,right,128);
    for(int i=0;i<128;i++){
        assert(std::isfinite(left[i])&&std::isfinite(right[i]));
        assert(left[i]==right[i]);
        delta+=std::abs(left[i]-original[i]);
    }
    assert(delta>.01);
    p.bypass=true;eq.set(p);eq.reset();
    assert(!eq.active());
    for(int i=0;i<128;i++)left[i]=right[i]=original[i];
    eq.process(left,right,128);
    for(int i=0;i<128;i++)assert(left[i]==original[i]&&right[i]==original[i]);
    std::puts("Shared three-band EQ DSP PASS: real filtering, stereo, exact bypass, flat no-work");
}
