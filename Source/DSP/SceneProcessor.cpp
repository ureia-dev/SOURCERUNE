#include "SceneProcessor.h"
// Supplied by libm in native builds and Math imports in WebAssembly.
#ifdef __wasm__
#define SR_MATH(name) __attribute__((import_module("env"),import_name(#name)))
#else
#define SR_MATH(name)
#endif
extern "C" SR_MATH(sinf) float sinf(float);
extern "C" SR_MATH(cosf) float cosf(float);
extern "C" SR_MATH(powf) float powf(float, float);

namespace sourcerune::dsp {
namespace {
float clamp(float x, float lo, float hi) { return !(x>=lo) ? lo : x>hi ? hi : x; }
float clean(float x) { return x==x && x<1e20f && x>-1e20f ? x : 0; }
float quiet(float x) { return x<1e-20f && x>-1e-20f ? 0 : x; }
float approach(float x,float target,float rate) {
    const float d=target-x;
    const float next=x+d*rate;
    return (d<1e-7f && d>-1e-7f)||next==x ? target : next;
}
// Transparent below -0.45 dBFS; bounded soft knee for processed overloads.
float protect(float x) {
    const float a=x<0?-x:x;
    if(a<=0.95f)return x;
    const float y=0.95f+0.05f*(a-0.95f)/(0.05f+a-0.95f);
    return x<0?-y:y;
}
}
bool SceneProcessor::supportsSource(int id) {return id==1||id==2||id==3||id==11||id==40;}
bool SceneProcessor::supportsTransmission(int id) {return id==1||id==2||id==3||id==5||id==11;}

SceneProcessor::Coefficients SceneProcessor::design(float f,float sr,bool hp) {
    // RBJ/W3C Audio EQ Cookbook Butterworth HP/LP, Q=1/sqrt(2).
    const float w=6.28318530718f*clamp(f,20,sr*0.45f)/sr;
    const float c=cosf(w), a=sinf(w)*0.70710678118f, den=1+a;
    const float b=(hp ? 1+c : 1-c)*0.5f/den;
    return {b,(hp?-2:2)*b,b,-2*c/den,(1-a)/den};
}
void SceneProcessor::Filter::step(float r) {
    current.b0=approach(current.b0,target.b0,r);current.b1=approach(current.b1,target.b1,r);
    current.b2=approach(current.b2,target.b2,r);current.a1=approach(current.a1,target.a1,r);
    current.a2=approach(current.a2,target.a2,r);
}
float SceneProcessor::Filter::tick(float x,unsigned ch) {
    const float y=current.b0*x+z1[ch];
    z1[ch]=quiet(current.b1*x-current.a1*y+z2[ch]);
    z2[ch]=quiet(current.b2*x-current.a2*y);
    return y;
}
void SceneProcessor::prepare(float sr) {
    sampleRate=clamp(sr,8000,192000);smoothing=1/(0.02f*sampleRate);
    setParameters(params);reset();
}
void SceneProcessor::setParameters(const Parameters& p) {
    params=p;
    const float damage=clamp(p.badSignal,0,100)*0.005f+clamp(p.bandwidthLoss,0,100)*0.005f;
    float th=300,tl=3400;
    if(p.transmissionModel==11){th=400;tl=3000;}
    filters[0].target=design(th+damage*300,sampleRate,true);
    filters[1].target=design(tl*(1-0.65f*damage),sampleRate,false);
    float sh=350,sl=6000;
    switch(p.sourceModel){case 1:sh=300;sl=4000;break;case 2:sh=500;sl=6500;break;
    case 11:sh=450;sl=3500;break;case 40:sh=650;sl=4500;break;default:break;}
    filters[2].target=design(sh,sampleRate,true);filters[3].target=design(sl,sampleRate,false);
    targetSource=!p.sourceBypass&&supportsSource(p.sourceModel)?clamp(p.sourceCharacter,0,100)*0.01f:0;
    targetTransmission=!p.transmissionBypass&&supportsTransmission(p.transmissionModel)&&p.transmissionModel!=1?1:0;
    targetWet=clamp(p.mix,0,100)*0.01f;targetActive=p.globalBypass?0:1;
    targetIn=powf(10,clamp(p.inputGain,-24,24)/20);targetOut=powf(10,clamp(p.outputGain,-24,24)/20);
}
void SceneProcessor::reset() {
    for(auto& f:filters){f.current=f.target;for(unsigned c=0;c<2;++c)f.z1[c]=f.z2[c]=0;}
    sourceWet=targetSource;transmissionWet=targetTransmission;wet=targetWet;
    active=targetActive;inGain=targetIn;outGain=targetOut;
}
void SceneProcessor::process(const float* l,const float* r,float* ol,float* or_,unsigned frames) {
    for(unsigned i=0;i<frames;++i){
        sourceWet=approach(sourceWet,targetSource,smoothing);
        transmissionWet=approach(transmissionWet,targetTransmission,smoothing);
        wet=approach(wet,targetWet,smoothing);active=approach(active,targetActive,smoothing);
        inGain=approach(inGain,targetIn,smoothing);outGain=approach(outGain,targetOut,smoothing);
        for(auto& f:filters)f.step(smoothing);
        const float input[2]={clean(l?l[i]:0),clean(r?r[i]:(l?l[i]:0))};
        float output[2];
        for(unsigned c=0;c<2;++c){
            const float dry=input[c]*inGain;
            const float tr=filters[1].tick(filters[0].tick(dry,c),c);
            const float transmitted=dry+(tr-dry)*transmissionWet;
            const float src=filters[3].tick(filters[2].tick(transmitted,c),c);
            const float scene=transmitted+(src-transmitted)*sourceWet;
            const float processed=protect(clean((dry+(scene-dry)*wet)*outGain));
            output[c]=input[c]+(processed-input[c])*active;
        }
        ol[i]=output[0];if(or_)or_[i]=output[1];
    }
}
}
