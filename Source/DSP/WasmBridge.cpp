#include "SceneProcessor.h"
namespace {
sourcerune::dsp::SceneProcessor processor;
sourcerune::dsp::Parameters parameters;
float input[2][128],output[2][128];
}
extern "C" {
int sr_version(){return 2;}
void sr_prepare(float sampleRate){processor.prepare(sampleRate);}
float* sr_input(int channel){return input[channel==1?1:0];}
float* sr_output(int channel){return output[channel==1?1:0];}
void sr_parameters(float character,float bad,float bandwidth,float in,float mix,float out,
                   int source,int transmission,int sourceBypass,int transmissionBypass,int bypass,
                   float hpf,float lpf,float b1f,float b1g,float b1q,
                   float b2f,float b2g,float b2q,float b3f,float b3g,float b3q,int eqBypass){
    parameters={character,bad,bandwidth,in,mix,out,source,transmission,
                sourceBypass!=0,transmissionBypass!=0,bypass!=0};
    parameters.hpf=hpf;parameters.lpf=lpf;
    parameters.eqFreq[0]=b1f;parameters.eqGain[0]=b1g;parameters.eqQ[0]=b1q;
    parameters.eqFreq[1]=b2f;parameters.eqGain[1]=b2g;parameters.eqQ[1]=b2q;
    parameters.eqFreq[2]=b3f;parameters.eqGain[2]=b3g;parameters.eqQ[2]=b3q;
    parameters.eqBypass=eqBypass!=0;
    processor.setParameters(parameters);
}
void sr_reset(){processor.reset();}
void sr_process(int frames){if(frames>0&&frames<=128)processor.process(input[0],input[1],output[0],output[1],frames);}
}
