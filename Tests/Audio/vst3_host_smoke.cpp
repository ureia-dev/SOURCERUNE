// Deep/manual: one bounded SDK mini-host integration case, not a DAW or stress suite.
#include "../../Source/DSP/SceneProcessor.h"
#include "../../Source/State/NativeParameterIds.h"
#include "public.sdk/source/vst/hosting/module.h"
#include "public.sdk/source/vst/hosting/hostclasses.h"
#include "public.sdk/source/vst/hosting/parameterchanges.h"
#include "public.sdk/source/common/memorystream.h"
#include "pluginterfaces/vst/ivstaudioprocessor.h"
#include "pluginterfaces/vst/ivsteditcontroller.h"
#include <algorithm>
#include <cmath>
#include <iostream>
#include <stdexcept>
#include <set>
using namespace Steinberg;
using namespace Steinberg::Vst;
namespace sr=sourcerune::state::native;
void require(bool result,const char* message){if(!result)throw std::runtime_error(message);}
int main(int argc,char** argv){try{
    require(argc==2,"Usage: sourcerune_host_smoke /absolute/path/SOURCERUNE.vst3");
    std::string error;
    auto module=VST3::Hosting::Module::create(argv[1],error);
    if(!module)throw std::runtime_error(error);
    auto host=owned(new HostApplication);
    auto& factory=module->getFactory();factory.setHostContext(host);
    IPtr<IComponent> component;IPtr<IEditController> controller;
    for(const auto& info:factory.classInfos()){
        if(info.category()==kVstAudioEffectClass)component=factory.createInstance<IComponent>(info.ID());
        if(info.category()==kVstComponentControllerClass)controller=factory.createInstance<IEditController>(info.ID());
    }
    require(component&&controller,"factory instances");
    require(component->initialize(host)==kResultOk,"component initialize");
    require(controller->initialize(host)==kResultOk,"controller initialize");
    FUnknownPtr<IAudioProcessor> processor(component);require(bool(processor),"audio processor interface");
    require(controller->getParameterCount()==int32(sr::ids.size()),"parameter count");
    std::set<ParamID> ids;
    for(int32 i=0;i<int32(sr::ids.size());++i){ParameterInfo info{};require(controller->getParameterInfo(i,info)==kResultOk,"parameter info");ids.insert(info.id);
        require(info.id==sr::ids[unsigned(i)],"stable parameter mapping");
        require(info.defaultNormalizedValue==sr::defaults[unsigned(i)],"controller/processor defaults");}
    require(ids.size()==sr::ids.size(),"unique parameter IDs");
    SpeakerArrangement arrangement=SpeakerArr::kStereo;
    require(processor->setBusArrangements(&arrangement,1,&arrangement,1)==kResultOk,"stereo arrangement");
    ProcessSetup setup{kRealtime,kSample32,512,48000};
    require(processor->setupProcessing(setup)==kResultOk,"prepare");
    require(processor->getLatencySamples()==0,"latency");
    require(component->activateBus(kAudio,kInput,0,true)==kResultOk,"input bus");
    require(component->activateBus(kAudio,kOutput,0,true)==kResultOk,"output bus");
    require(component->setActive(true)==kResultOk,"activate");
    require(processor->setProcessing(true)==kResultOk,"start processing");
    float l[512],r[512],ol[512]{},orr[512]{},refL[512],refR[512];
    for(int i=0;i<512;++i){l[i]=float(.3*std::sin(i*.17)+.2*std::sin(i*1.1));r[i]=l[i]*.5f;}
    float* input[]{l,r};float* output[]{ol,orr};
    AudioBusBuffers in{},out{};in.numChannels=out.numChannels=2;in.channelBuffers32=input;out.channelBuffers32=output;
    ProcessData data{};data.processMode=kRealtime;data.symbolicSampleSize=kSample32;data.numSamples=512;data.numInputs=data.numOutputs=1;data.inputs=&in;data.outputs=&out;
    sourcerune::dsp::SceneProcessor reference;reference.prepare(48000);
    reference.process(l,r,refL,refR,512);
    require(processor->process(data)==kResultOk,"process");
    double maxError=0,wetDifference=0;
    for(int i=0;i<512;++i){require(std::isfinite(ol[i]),"finite audio");maxError=std::max(maxError,double(std::abs(ol[i]-refL[i])));wetDifference+=std::abs(ol[i]-l[i]);require(std::abs(orr[i]-refR[i])<1e-6,"stereo parity");}
    require(maxError<1e-6&&wetDifference>1,"shared-core parity and real processing");
    ParameterChanges changes;int32 queueIndex=0,point=0;
    changes.addParameterData(5,queueIndex)->addPoint(0,1,point);data.inputParameterChanges=&changes;
    require(processor->process(data)==kResultOk,"parameter automation");
    MemoryStream saved;require(component->getState(&saved)==kResultOk,"save state");
    saved.seek(0,IBStream::kIBSeekSet,nullptr);
    require(controller->setComponentState(&saved)==kResultOk,"controller recall");
    require(controller->getParamNormalized(5)==1,"recall parameter value");
    changes.clearQueue();changes.addParameterData(2000,queueIndex)->addPoint(0,1,point);
    data.numSamples=0;require(processor->process(data)==kResultOk,"zero-frame parameter flush");data.inputParameterChanges=nullptr;
    processor->setProcessing(false);component->setActive(false);component->setActive(true);processor->setProcessing(true);
    data.numSamples=512;require(processor->process(data)==kResultOk,"bypass process");
    for(int i=0;i<512;++i)require(ol[i]==l[i]&&orr[i]==r[i],"exact global bypass");
    processor->setProcessing(false);component->setActive(false);
    saved.seek(0,IBStream::kIBSeekSet,nullptr);require(component->setState(&saved)==kResultOk,"processor restore");
    saved.seek(0,IBStream::kIBSeekSet,nullptr);require(controller->setComponentState(&saved)==kResultOk,"restored UI state");
    require(controller->getParamNormalized(2000)==0&&controller->getParamNormalized(5)==1,"restored bypass and bandwidth");
    setup.processMode=kOffline;require(processor->setupProcessing(setup)==kResultOk,"offline prepare");
    component->setActive(true);processor->setProcessing(true);data.processMode=kOffline;
    require(processor->process(data)==kResultOk,"offline processing");
    sourcerune::dsp::Parameters restored;restored.bandwidthLoss=100;
    reference.prepare(48000);reference.setParameters(restored);reference.reset();reference.process(l,r,refL,refR,512);
    for(int i=0;i<512;++i)require(std::abs(ol[i]-refL[i])<1e-6,"offline restored audio parity");
    processor->setProcessing(false);component->setActive(false);controller->terminate();component->terminate();
    std::cout<<"PASS: bundle load, 23 stable parameters, stereo audio, shared-core max error="<<maxError
        <<", block automation, exact bypass, state recall, offline process. SDK mini-host only; DAW pending.\n";
    return 0;
}catch(const std::exception& e){std::cerr<<"FAIL: "<<e.what()<<'\n';return 1;}}
