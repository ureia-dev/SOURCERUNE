#pragma once
// Fixed-allocation 12 dB/oct Butterworth stereo HPF shared by Native VST3
// and the tiny Web AudioWorklet WASM bridge. RBJ/W3C coefficients.
// OFF at schema-default 20 Hz: exact transparent bypass, near-zero work.
#ifdef __wasm__
extern "C" __attribute__((import_module("env"),import_name("sinf"))) float sinf(float);
extern "C" __attribute__((import_module("env"),import_name("cosf"))) float cosf(float);
#else
extern "C" float sinf(float) noexcept;
extern "C" float cosf(float) noexcept;
#endif
namespace sourcerune::dsp {
class HighPass {
public:
    void prepare(float sr){rate=sr>=8000&&sr<=192000?sr:48000;smooth=1/(.02f*rate);reset();set(20,false);}
    void reset(){for(int i=0;i<2;i++){z1[i]=0;z2[i]=0;}mix=targetMix;current=target;}
    void set(float hz,bool enabled){
        const float capped=hz>=20?(hz<=1000?hz:1000):20;
        const bool on=enabled&&capped>20;
        targetMix=on?1.0f:0.0f;
        if(!on||lastHz==capped)return;
        lastHz=capped;
        const float omega=6.283185307179586f*capped/rate;
        const float c=cosf(omega),alpha=sinf(omega)*0.7071067811865475f;
        const float den=1+alpha,b=(1+c)*0.5f/den;
        target={b,-2*b,b,-2*c/den,(1-alpha)/den};
        if(mix==0)current=target;
    }
    bool active()const{return mix>0.00001f||targetMix>0.00001f;}
    void process(float* left,float* right,unsigned frames){
        if(!active())return;
        for(unsigned i=0;i<frames;i++){
            mix=advance(mix,targetMix);
            current.b0=advance(current.b0,target.b0);
            current.b1=advance(current.b1,target.b1);
            current.b2=advance(current.b2,target.b2);
            current.a1=advance(current.a1,target.a1);
            current.a2=advance(current.a2,target.a2);
            const float a=left[i],b=right?right[i]:a;
            left[i]=tick(a,0);
            if(right)right[i]=tick(b,1);
        }
    }
private:
    struct Coeff{float b0=1,b1=0,b2=0,a1=0,a2=0;};
    float advance(float x,float t)const{
        const float y=x+(t-x)*smooth;
        return (t-y<0.0000001f&&t-y>-0.0000001f)?t:y;
    }
    float tick(float x,int ch){
        const float y=current.b0*x+z1[ch];
        const float a=current.b1*x-current.a1*y+z2[ch];
        const float b=current.b2*x-current.a2*y;
        z1[ch]=(a>-1e-20f&&a<1e-20f)?0:a;
        z2[ch]=(b>-1e-20f&&b<1e-20f)?0:b;
        return x+(y-x)*mix;
    }
    Coeff current{},target{};
    float rate=48000,smooth=1.0f/960.0f,targetMix=0,mix=0,lastHz=20;
    float z1[2]{},z2[2]{};
};
}
