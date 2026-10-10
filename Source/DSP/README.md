# Shared DSP MVP

`SceneProcessor` is framework-independent C++20. Native clients own one instance per plugin; `WasmBridge` owns one instance per isolated worklet. No audio algorithm lives in JavaScript. Zero structural latency; 20 ms parameter/coefficient smoothing; preallocated stereo buffers. Prepare/reset outside active playback. No heap, locks or I/O in `process()`.

Current chain: input gain → transmission HP/LP → source HP/LP → dry/wet → output gain → overload knee. Global bypass crossfades to unmodified input (including bypass of gains); the processed path's soft knee is transparent below 0.95 and bounded below 1. Float over-range input is preserved by global bypass. Unsupported stages/model IDs skip processing and remain stored in UI state.

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

## Final EQ — exactly three active bands (2026-10-10)

This extends the previously approved real HPF (Tone/Hpf.h) without replacing it: a new shared C++ Tone/Parametric3.h provides 12 dB/oct LPF and **only Band 1, Band 2, Band 3** RBJ peaking EQ; no fourth-band processing. Public b4Freq/b4Gain/b4Q IDs 53–55 are **retired and reserved**, not exposed or renumbered. The 74 existing Factory presets require no rewriting. Neutral bands skip processing, LPF at 20 kHz is an inactive stage, EQ bypass has a bounded low-CPU idle path. Web uses the same C++ standalone EQ WASM loaded by AudioWorklet after the existing HPF; VST3 adds compatible host parameters (23 total) and reads older 11/13-value states. The two Web layouts share HPF + LPF + three draggable EQ graph nodes and Advanced values; Final Tone itself remains state-only. An actual compiled WASM, one-shot browser audit and separate Native/VST3 host evidence are required before claiming each platform is verified.
