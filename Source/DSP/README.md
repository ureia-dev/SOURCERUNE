# Shared DSP MVP

`SceneProcessor` is framework-independent C++20. Native clients own one instance per plugin; `WasmBridge` owns one instance per isolated worklet. No audio algorithm lives in JavaScript. Zero structural latency; 20 ms parameter/coefficient smoothing; preallocated stereo buffers. Prepare/reset outside active playback. No heap, locks or I/O in `process()`.

Current MVP chain: input gain → transmission HP/LP → source HP/LP → dry/wet → output gain → overload knee → **independent shared-C++ HPF 12 dB/oct stage**. The final product contract places tone before MIX; current MVP HPF is intentionally post-scene and will require later re-integration when full modules/MIX are implemented. Global bypass crossfades to unmodified input (including bypass of gains); the processed path's soft knee is transparent below 0.95 and bounded below 1. Float over-range input is preserved by global bypass. Unsupported stages/model IDs skip processing and remain stored in UI state.

Filter equations: [W3C Audio EQ Cookbook](https://www.w3.org/TR/audio-eq-cookbook/) Butterworth high/low-pass sections. Model cutoffs are **PROVISIONAL audition choices**, not measured hardware, real codecs or forum consensus. SOURCE 001/002/003/011/040 and TRANSMISSION 001/002/003/005/011 only. GSM is bandwidth coloration only. No third-party DSP source/assets included.

## Build

From repository root, with clang++ and wasm-ld installed:

```sh
bash Tools/Build/build_wasm.sh
```

Alternatively set `ZIG=/path/to/zig`; first checkpoint used Zig 0.17.0. The checked-in WASM allows static HTTPS/localhost deployment without a browser compiler. Math sin/cos/pow imports are used when preparing coefficients; no audio processing is delegated to browser effects.

## Validation levels

- Fast: existing repository syntax/data/assets/structure CI unchanged. Native smoke is a single bounded developer check, no stress loops or automatic safety expansion.
- Deep: manual default-size native/WASM fixture and real browser integration. No workflow trigger/round count changed.
- Release: native VST3 now has a Linux development build and manual SDK mini-host smoke (`Source/Plugin/VST3/README.md`); macOS/Windows DAW and release acceptance remain pending.

```sh
g++ -std=c++20 -O2 -ffp-contract=off -Wall -Wextra -Werror Source/DSP/SceneProcessor.cpp Tests/Audio/native_smoke.cpp -o /tmp/sourcerune-smoke
/tmp/sourcerune-smoke --fixture > /tmp/sourcerune-native.f32
node Tests/Audio/wasm_parity.cjs /tmp/sourcerune-native.f32
# Requires Playwright and an installed Chromium:
CHROME_PATH=/path/to/chrome node Tests/Audio/browser_smoke.cjs
```

Browser smoke starts/stops a local server, loads a generated WAV, checks actual output and parameter changes, transport, preset loading, both existing layouts and real offline AudioWorklet output. It is not human audition, Safari/Firefox validation, VST3 Host testing or a release safety suite.

## EQ / TONE — tested HPF stage (2026-10-10)

- Shared `Source/DSP/Tone/Hpf.h`: fixed-allocation stereo DF2T Butterworth high-pass, [W3C/RBJ biquad](https://www.w3.org/TR/audio-eq-cookbook/), 12 dB/oct. Frequency is existing stable `hpf` ID 42 (20–1000 Hz), **20 Hz = exactly OFF** to preserve existing scenes. `EQ_TONE` module bypass also disables it. Cutoff coefficients are recalculated on parameter changes, smoothed around 20 ms; no per-sample trig, no oversampling, no allocation/locks/I/O in render. Completely idle OFF.
- Native VST3 uses the very same C++ header; Web AudioWorklet uses **1,538-byte** compiled `Web/App/audio/hpf.wasm` via `Source/DSP/Tone/HpfWasm.cpp`/`Tools/Build/build_hpf_wasm.sh`, after existing MVP scene WASM. Both share source and cutoff/enable semantics, although Native 13-parameter VST3 host retest/release is not yet confirmed.
- Developer native test: `clang++ -std=c++20 -O2 Tests/Audio/hpf_smoke.cpp -o /tmp/sr-hpf && /tmp/sr-hpf` PASS at 48kHz cutoff240Hz: 40Hz relative to 4kHz −31.13dB, exact OFF bypass. WASM measured −31.12dB and same exact OFF. Git blob `994816dd4b8857eb765bb33d6d537e6ba67252fc` (1,538 bytes).
- Real Chromium [Web Preview #38031171637](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38031171637) source `1a0d1b6d`: `UI_01/02.geometry.ok`, `knobSmoke.hpf.ok`, direct WASM low40 0.004914/high4k 0.176775; real `OfflineAudioContext` AudioWorklet 40Hz RMS OFF 0.176777 / ON 0.004908. Tested HPF keyboard, Advanced, Undo/Redo and live curve on both REF layouts. Existing Chrome console one unrelated 404 continues, but render-log ends `render audit completed successfully`.
- **PENDING**: final LPF, 4-band EQ with genuine frequency/gain/Q node gestures, Final Tone, full TONE→MIX placement, completed Native VST3 Host acceptance, CPU profiler benchmark and user audition. Do not claim all EQ is done.
