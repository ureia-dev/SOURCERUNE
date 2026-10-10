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

## Final tone EQ — three bands (2026-10-10)

Shared C++ chain now includes HPF + LPF + exactly 3 peaking RBJ biquads before the original Mix/Output stage. Active controls: hpf, lpf, b1..b3 Freq/Gain/Q and eqBypass. The legacy b4Freq/b4Gain/b4Q public IDs are deprecated/reserved, not processed. Flat/default bell gain, HPF at 20Hz, LPF at 20kHz, and EQ bypass skip EQ audio processing where possible. Per-sample section coefficients smooth on changes, no oversampling or added algorithmic latency. WebAssembly ABI is now version 2 with 23 total bridge parameters. Verify the compiled WASM against C++ source; version 1 binaries MUST NOT be used with the new transport. Real host/audio measurements and listen tests are distinct gates.
