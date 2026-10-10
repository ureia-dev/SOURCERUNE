#pragma once

// No framework, allocation, locks or I/O. The same processor is used by native
// clients and the WebAssembly adapter. Parameters use existing public IDs.
namespace sourcerune::dsp {
struct Parameters {
    float sourceCharacter = 50, badSignal = 20, bandwidthLoss = 0;
    float inputGain = 0, mix = 100, outputGain = 0;
    int sourceModel = 3, transmissionModel = 5;
    bool sourceBypass = false, transmissionBypass = false, globalBypass = false;
    // One shared final EQ: HPF, LPF and exactly three bell sections.
    // Legacy b4 public parameter IDs remain reserved, never processed.
    float hpf=20, lpf=20000;
    float eqFreq[3]{120,600,2400};
    float eqGain[3]{0,0,0};
    float eqQ[3]{0.7f,1,1};
    bool eqBypass=false;
};

class SceneProcessor {
public:
    void prepare(float sampleRate);
    void setParameters(const Parameters& parameters);
    void reset();
    void process(const float* left, const float* right, float* outLeft,
                 float* outRight, unsigned frames);
    static bool supportsSource(int id);
    static bool supportsTransmission(int id);
private:
    struct Coefficients { float b0=1, b1=0, b2=0, a1=0, a2=0; };
    struct Filter {
        Coefficients current, target;
        float z1[2]{}, z2[2]{};
        void step(float rate);
        float tick(float input, unsigned channel);
    } filters[9];  // 0..3 existing transmission/source, 4 HPF, 5 LPF, 6..8 three bells
    static Coefficients design(float frequency, float sampleRate, bool highpass);
    static Coefficients designBell(float frequency, float gainDb, float q, float sampleRate);
    bool eqEnabled[5]{};
    Parameters params;
    float sampleRate=48000, smoothing=0.001f;
    float sourceWet=0, transmissionWet=0, wet=0, active=0, inGain=1, outGain=1;
    float targetSource=0, targetTransmission=0, targetWet=1, targetActive=1;
    float targetIn=1, targetOut=1;
    float eqWet=1,targetEqWet=1;
};
}
