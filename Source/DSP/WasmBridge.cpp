#include "SceneProcessor.h"
namespace {
sourcerune::dsp::SceneProcessor processor;
sourcerune::dsp::Parameters parameters;
float input[2][128],output[2][128];
}
extern "C" {
int sr_version(){return 1;}
void sr_prepare(float sampleRate){processor.prepare(sampleRate);}
float* sr_input(int channel){return input[channel==1?1:0];}
float* sr_output(int channel){return output[channel==1?1:0];}
void sr_parameters(float character,float bad,float bandwidth,float in,float mix,float out,
                   int source,int transmission,int sourceBypass,int transmissionBypass,int bypass){
    parameters={character,bad,bandwidth,in,mix,out,source,transmission,
                sourceBypass!=0,transmissionBypass!=0,bypass!=0};
    processor.setParameters(parameters);
}
void sr_reset(){processor.reset();}
void sr_process(int frames){if(frames>0&&frames<=128)processor.process(input[0],input[1],output[0],output[1],frames);}
}
