#pragma once
// Real low-CPU final tone: one LPF and three RBJ peaking biquads.
// HPF is already shared by both targets via Tone/Hpf.h.
// Fixed allocation, no heap/locks/oversampling or additional algorithmic latency.
#ifdef __wasm__
extern "C" __attribute__((import_module("env"),import_name("sinf"))) float sinf(float);
extern "C" __attribute__((import_module("env"),import_name("cosf"))) float cosf(float);
extern "C" __attribute__((import_module("env"),import_name("powf"))) float powf(float,float);
#else
extern "C" float sinf(float) noexcept;
extern "C" float cosf(float) noexcept;
extern "C" float powf(float,float) noexcept;
#endif
namespace sourcerune::dsp {
class Parametric3 {
public:
    struct Params{
        float lpf=20000;
        float frequency[3]{120,600,2400};
        float gain[3]{0,0,0};
        float q[3]{0.7f,1,1};
        bool bypass=false;
    };
    void prepare(float sampleRate){rate=sampleRate>=8000&&sampleRate<=192000?sampleRate:48000;smooth=1/(.02f*rate);reset();set(Params{});}
    void reset(){for(auto& f:filters){f.current=f.target;for(int c=0;c<2;c++){f.z1[c]=0;f.z2[c]=0;}}mix=targetMix;}
    void set(const Params& p){
        targetMix=p.bypass?0:1;
        if(!lastValid||!same(p,last)){
            const Coeff flat{};
            const bool low=p.lpf<19995;
            filters[0].enabled=low;
            filters[0].target=low?designLow(p.lpf):flat;
            for(int i=0;i<3;i++){
                const bool used=p.gain[i]>0.0001f||p.gain[i]<-0.0001f;
                filters[i+1].enabled=used;
                filters[i+1].target=used?designBell(p.frequency[i],p.gain[i],p.q[i]):flat;
            }
            last=p;lastValid=true;
        }
    }
    bool active() const {
        if(mix<0.00001f&&targetMix<0.00001f)return false;
        for(const auto& f:filters)if(f.enabled)return true;
        return false;
    }
    void process(float* left,float* right,unsigned frames){
        if(!active())return;
        for(unsigned n=0;n<frames;n++){
            mix=advance(mix,targetMix);
            for(auto& f:filters)if(f.enabled){
                f.current.b0=advance(f.current.b0,f.target.b0);
                f.current.b1=advance(f.current.b1,f.target.b1);
                f.current.b2=advance(f.current.b2,f.target.b2);
                f.current.a1=advance(f.current.a1,f.target.a1);
                f.current.a2=advance(f.current.a2,f.target.a2);
            }
            for(int c=0;c<(right?2:1);c++){
                const float input=c?right[n]:left[n];float value=input;
                for(auto& f:filters)if(f.enabled)value=f.tick(value,c);
                value=input+(value-input)*mix;
                if(c)right[n]=value;else left[n]=value;
            }
        }
    }
private:
    struct Coeff{float b0=1,b1=0,b2=0,a1=0,a2=0;};
    struct Filter {
        Coeff current{},target{};
        float z1[2]{},z2[2]{};
        bool enabled=false;
        float tick(float x,int ch){
            const float y=current.b0*x+z1[ch];
            const float a=current.b1*x-current.a1*y+z2[ch];
            const float b=current.b2*x-current.a2*y;
            z1[ch]=(a>-1e-20f&&a<1e-20f)?0:a;
            z2[ch]=(b>-1e-20f&&b<1e-20f)?0:b;
            return y;
        }
    } filters[4];
    static float clamp(float v,float lo,float hi){return v<lo?lo:v>hi?hi:v;}
    float advance(float x,float target)const{
        const float y=x+(target-x)*smooth;
        return (target-y<1e-7f&&target-y>-1e-7f)?target:y;
    }
    Coeff designLow(float f)const{
        const float w=6.283185307179586f*clamp(f,20,rate*.45f)/rate;
        const float c=cosf(w),alpha=sinf(w)*0.7071067811865475f;
        const float den=1+alpha,b=(1-c)*.5f/den;
        return {b,2*b,b,-2*c/den,(1-alpha)/den};
    }
    Coeff designBell(float f,float g,float q)const{
        const float w=6.283185307179586f*clamp(f,20,rate*.45f)/rate;
        const float c=cosf(w),alpha=sinf(w)/(2*clamp(q,.1f,12.f));
        const float a=powf(10.f,clamp(g,-18.f,18.f)/40.f),den=1+alpha/a;
        return {(1+alpha*a)/den,-2*c/den,(1-alpha*a)/den,
            -2*c/den,(1-alpha/a)/den};
    }
    static bool same(const Params& x,const Params& y){
        if(x.lpf!=y.lpf)return false;
        for(int i=0;i<3;i++)if(x.frequency[i]!=y.frequency[i]||x.gain[i]!=y.gain[i]||x.q[i]!=y.q[i])return false;
        return true;
    }
    Params last{};
    float rate=48000,smooth=1.0f/960.0f,mix=1,targetMix=1;
    bool lastValid=false;
};
}
