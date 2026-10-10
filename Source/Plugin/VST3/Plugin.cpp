#include "../../DSP/SceneProcessor.h"
#include "../../State/NativeParameterIds.h"
#include "public.sdk/source/vst/vstaudioeffect.h"
#include "public.sdk/source/vst/vsteditcontroller.h"
#include "public.sdk/source/main/pluginfactory.h"
#include "pluginterfaces/vst/ivstparameterchanges.h"
#include "base/source/fstreamer.h"
#include <algorithm>
#include <atomic>
#include <cmath>

using namespace Steinberg;
using namespace Steinberg::Vst;
namespace sr = sourcerune::state::native;
namespace sourcerune::plugin {
// Permanent component/controller identities, independent of model/preset/UI.
const FUID processorId(0x5749BC01,0xEB244D2D,0x9D4475AC,0xAE23D901);
const FUID controllerId(0x5749BC02,0xEB244D2D,0x9D4475AC,0xAE23D901);
using Values=std::array<double,23>;
static_assert(std::atomic<double>::is_always_lock_free);

bool readState(IBStream* stream,Values& values){
    if(!stream)return false;
    IBStreamer reader(stream,kLittleEndian);int32 magic=0,version=0;Values candidate=sr::defaults;
    if(!reader.readInt32(magic)||magic!=0x53524E31||!reader.readInt32(version)||(version!=1&&version!=2))return false;
    // V1 recall had exactly 11 floats. Fill new EQ controls with flat defaults.
    for(unsigned i=0;i<(version==1?11U:23U);++i)
        if(!reader.readDouble(candidate[i])||!std::isfinite(candidate[i])||candidate[i]<0||candidate[i]>1)return false;
    values=candidate;return true;
}
bool writeState(IBStream* stream,const Values& values){
    if(!stream)return false;IBStreamer writer(stream,kLittleEndian);
    if(!writer.writeInt32(0x53524E31)||!writer.writeInt32(2))return false;
    for(double x:values)if(!writer.writeDouble(x))return false;
    return true;
}
dsp::Parameters toDSP(const Values& v){
    dsp::Parameters p={float(v[0]*100),float(v[1]*100),float(v[2]*100),float(v[3]*48-24),
        float(v[4]*100),float(v[5]*48-24),sr::sourceModels[std::min(4,int(v[6]*5))],
        sr::transmissionModels[std::min(4,int(v[7]*5))],v[8]>=.5,v[9]>=.5,v[10]>=.5};
    const auto scale=[](double x,double lo,double hi){return float(lo+x*(hi-lo));};
    p.hpf=scale(v[11],20,1000);p.lpf=scale(v[12],1000,20000);
    for(unsigned i=0;i<3;++i){
        p.eqFreq[i]=scale(v[13+i*3],20,20000);
        p.eqGain[i]=scale(v[14+i*3],-18,18);
        p.eqQ[i]=scale(v[15+i*3],0.1,12);
    }
    p.eqBypass=v[22]>=.5;return p;
}

class Processor final : public AudioEffect {
public:
    Processor(){setControllerClass(controllerId);for(unsigned i=0;i<values.size();++i)values[i].store(sr::defaults[i]);}
    static FUnknown* create(void*){return static_cast<IAudioProcessor*>(new Processor);}
    tresult PLUGIN_API initialize(FUnknown* context) override {
        const auto result=AudioEffect::initialize(context);if(result!=kResultOk)return result;
        addAudioInput(STR16("Input"),SpeakerArr::kStereo);addAudioOutput(STR16("Output"),SpeakerArr::kStereo);
        return kResultOk;
    }
    tresult PLUGIN_API setBusArrangements(SpeakerArrangement* inputs,int32 ni,SpeakerArrangement* outputs,int32 no) override {
        if(ni!=1||no!=1||!inputs||!outputs||inputs[0]!=outputs[0]||
           (inputs[0]!=SpeakerArr::kMono&&inputs[0]!=SpeakerArr::kStereo))return kResultFalse;
        return AudioEffect::setBusArrangements(inputs,ni,outputs,no);
    }
    tresult PLUGIN_API canProcessSampleSize(int32 size) override {return size==kSample32?kResultTrue:kResultFalse;}
    tresult PLUGIN_API setupProcessing(ProcessSetup& setup) override {
        if(setup.symbolicSampleSize!=kSample32||!std::isfinite(setup.sampleRate)||setup.sampleRate<8000||setup.sampleRate>192000)return kResultFalse;
        engine.prepare(float(setup.sampleRate));engine.setParameters(toDSP(snapshot()));engine.reset();
        return AudioEffect::setupProcessing(setup);
    }
    tresult PLUGIN_API setActive(TBool active) override {if(active){engine.setParameters(toDSP(snapshot()));engine.reset();}return AudioEffect::setActive(active);}
    tresult PLUGIN_API setProcessing(TBool active) override {if(active){engine.setParameters(toDSP(snapshot()));engine.reset();}return kResultOk;}
    uint32 PLUGIN_API getLatencySamples() override {return 0;}
    uint32 PLUGIN_API getTailSamples() override {return 0;}
    tresult PLUGIN_API setState(IBStream* state) override {
        Values candidate;if(!readState(state,candidate))return kResultFalse;
        for(unsigned i=0;i<values.size();++i)values[i].store(candidate[i],std::memory_order_relaxed);
        return kResultOk;
    }
    tresult PLUGIN_API getState(IBStream* state) override {return writeState(state,snapshot())?kResultOk:kResultFalse;}
    tresult PLUGIN_API process(ProcessData& data) override {
        // MVP block-rate automation, bounded by the host's parameter queues.
        // Sample-offset automation is explicitly a subsequent milestone.
        if(data.inputParameterChanges)for(int32 q=0;q<data.inputParameterChanges->getParameterCount();++q){
            auto* queue=data.inputParameterChanges->getParameterData(q);if(!queue)continue;
            const int i=sr::index(queue->getParameterId());double value=0;int32 offset=0;
            if(i>=0&&queue->getPointCount()>0&&queue->getPoint(queue->getPointCount()-1,offset,value)==kResultTrue&&std::isfinite(value))
                values[unsigned(i)].store(std::clamp(value,0.0,1.0),std::memory_order_relaxed);
        }
        engine.setParameters(toDSP(snapshot()));
        if(data.numSamples<=0||data.numOutputs==0)return kResultOk;
        if(data.symbolicSampleSize!=kSample32||!data.outputs||data.outputs[0].numChannels<1||data.outputs[0].numChannels>2)return kResultFalse;
        auto& out=data.outputs[0];if(!out.channelBuffers32||!out.channelBuffers32[0]||(out.numChannels==2&&!out.channelBuffers32[1]))return kResultFalse;
        auto* in=data.numInputs>0&&data.inputs?&data.inputs[0]:nullptr;
        const float* left=nullptr;const float* right=nullptr;
        if(in&&in->channelBuffers32){
            if(in->numChannels>0&&!(in->silenceFlags&1))left=in->channelBuffers32[0];
            if(in->numChannels>1&&!(in->silenceFlags&2))right=in->channelBuffers32[1];
        }
        // Shared core duplicates mono when right==nullptr; explicit stereo
        // silence must instead supply zeros, even if a host's buffer is dirty.
        for(int32 offset=0;offset<data.numSamples;offset+=128){
            const int32 n=std::min(128,data.numSamples-offset);
            engine.process(left?left+offset:nullptr,
                right?right+offset:out.numChannels==2?zeros:nullptr,
                out.channelBuffers32[0]+offset,out.numChannels==2?out.channelBuffers32[1]+offset:nullptr,unsigned(n));
        }
        out.silenceFlags=0;
        return kResultOk;
    }
private:
    Values snapshot() const {Values out;for(unsigned i=0;i<values.size();++i)out[i]=values[i].load(std::memory_order_relaxed);return out;}
    std::array<std::atomic<double>,11> values;
    dsp::SceneProcessor engine;
    const float zeros[128]{};
};

class Controller final : public EditController {
public:
    static FUnknown* create(void*){return static_cast<IEditController*>(new Controller);}
    tresult PLUGIN_API initialize(FUnknown* context) override {
        const auto result=EditController::initialize(context);if(result!=kResultOk)return result;
        const TChar* names[]{STR16("Source Character"),STR16("Bad Signal"),STR16("Bandwidth Loss"),STR16("Input Gain"),STR16("Mix"),STR16("Output Gain")};
        for(unsigned i=0;i<6;++i){const bool db=i==3||i==5;parameters.addParameter(new RangeParameter(names[i],sr::ids[i],db?STR16("dB"):STR16("%"),db?-24:0,db?24:100,db?0:sr::defaults[i]*100));}
        auto* source=new StringListParameter(STR16("Source Model"),1000);
        for(auto* name:{STR16("Smartphone Earpiece"),STR16("Smartphone Bottom Speaker"),STR16("Smartphone Speakerphone"),STR16("Walkie-Talkie"),STR16("Megaphone")})source->appendString(name);
        parameters.addParameter(source);
        source->getInfo().defaultNormalizedValue=sr::defaults[6];
        auto* transmission=new StringListParameter(STR16("Transmission Model"),1001);
        for(auto* name:{STR16("Direct Clean"),STR16("Narrowband"),STR16("PSTN Landline"),STR16("GSM (bandwidth only)"),STR16("Walkie Narrowband")})transmission->appendString(name);
        parameters.addParameter(transmission);
        transmission->getInfo().defaultNormalizedValue=sr::defaults[7];
        parameters.addParameter(STR16("Source Bypass"),nullptr,1,0,ParameterInfo::kCanAutomate,1100);
        parameters.addParameter(STR16("Transmission Bypass"),nullptr,1,0,ParameterInfo::kCanAutomate,1101);
        parameters.addParameter(STR16("Bypass"),nullptr,1,0,ParameterInfo::kCanAutomate|ParameterInfo::kIsBypass,2000);
        // Native host generic editor controls the SAME shared C++ EQ as Web.
        auto eqAdd=[&](const TChar* name,const TChar* unit,unsigned index,double lo,double hi,double plain){
            auto* param=new RangeParameter(name,sr::ids[index],unit,lo,hi,plain);
            param->getInfo().defaultNormalizedValue=sr::defaults[index];
            parameters.addParameter(param);
        };
        eqAdd(STR16("EQ HPF"),STR16("Hz"),11,20,1000,20);
        eqAdd(STR16("EQ LPF"),STR16("Hz"),12,1000,20000,20000);
        for(unsigned band=0;band<3;++band){
            const TChar* freq[]{STR16("EQ Band 1 Freq"),STR16("EQ Band 2 Freq"),STR16("EQ Band 3 Freq")};
            const TChar* db[]{STR16("EQ Band 1 Gain"),STR16("EQ Band 2 Gain"),STR16("EQ Band 3 Gain")};
            const TChar* q[]{STR16("EQ Band 1 Q"),STR16("EQ Band 2 Q"),STR16("EQ Band 3 Q")};
            const double frequency[]{120,600,2400},quality[]{0.7,1,1};
            eqAdd(freq[band],STR16("Hz"),13+band*3,20,20000,frequency[band]);
            eqAdd(db[band],STR16("dB"),14+band*3,-18,18,0);
            eqAdd(q[band],STR16(""),15+band*3,0.1,12,quality[band]);
        }
        parameters.addParameter(STR16("EQ Bypass"),nullptr,1,0,ParameterInfo::kCanAutomate,1102);
        for(unsigned i=0;i<sr::ids.size();++i)setParamNormalized(sr::ids[i],sr::defaults[i]);
        return kResultOk;
    }
    tresult PLUGIN_API setComponentState(IBStream* state) override {
        Values candidate;if(!readState(state,candidate))return kResultFalse;
        for(unsigned i=0;i<sr::ids.size();++i)setParamNormalized(sr::ids[i],candidate[i]);
        return kResultOk;
    }
    // Host generic parameter editor for MVP; existing UI_01/UI_02 artwork
    // and native layout specifications remain untouched for later integration.
};
}

BEGIN_FACTORY_DEF("SOURCERUNE","https://github.com/ureia-dev/SOURCERUNE","")
DEF_CLASS2(INLINE_UID_FROM_FUID(sourcerune::plugin::processorId),PClassInfo::kManyInstances,
    kVstAudioEffectClass,"SOURCERUNE",Vst::kDistributable,"Fx|Filter","0.1.0",kVstVersionString,sourcerune::plugin::Processor::create)
DEF_CLASS2(INLINE_UID_FROM_FUID(sourcerune::plugin::controllerId),PClassInfo::kManyInstances,
    kVstComponentControllerClass,"SOURCERUNE Controller",0,"","0.1.0",kVstVersionString,sourcerune::plugin::Controller::create)
END_FACTORY
