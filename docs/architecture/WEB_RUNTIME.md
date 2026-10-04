# SOURCERUNE WEB Runtime / TEST Architecture

## Status

WEB is a mainline SOURCERUNE target alongside VST3.

The WEB version exists for two purposes:
1. a fast browser-based TEST/listening environment during development;
2. a real browser runtime using the same product DSP core.

It must not become a separate sound implementation.

## Current deployment policy

SOURCERUNE currently uses **one public repository** for both native and browser development.

The WEB TEST target is built and deployed from this same repository. Do not introduce a second private core repository or cross-repository deployment dependency in the current phase, because that would slow normal iteration and complicate parity/debugging.

This does not permit a separate browser sound path: WEB still compiles the shared C++ core to WebAssembly.


## Runtime split

```text
Browser UI / App
      │
      ▼
parameter + state messages
      │
      ▼
AudioWorklet
      │
      ▼
WebAssembly bindings
      │
      ▼
Shared C++ State / Scene / DSP
```

The DOM/main JavaScript thread is never the timing source for realtime DSP.

## Shared code

WEB should compile these shared areas to WebAssembly:
- `Source/Core`
- `Source/DSP`
- `Source/Scene`
- compatible portions of `Source/State`

Browser-specific code belongs under `Web/`.

## TEST webpage minimum feature set

The first functional TEST page should provide:
- drag/drop or file-picker audio loading,
- play / stop / loop / seek,
- global bypass and A/B comparison,
- every public SOURCERUNE parameter,
- preset/state import/export,
- deterministic seed display/change,
- IN/OUT meters,
- basic spectrum/response views,
- sample-rate/block-size/version readout,
- optional offline render/export for verification.

Microphone/live-input support can follow after file-based deterministic testing is stable.

## Parity rule

Given the same:
- input PCM,
- sample rate,
- block-independent parameter trajectory,
- scene state,
- random seed,

VST3 core processing and WEB core processing should match within documented numerical tolerance.

Browser I/O resampling and device routing are tested separately from the DSP parity test.

## Performance rule

The WEB engine should favor:
- one long-lived Wasm DSP instance,
- preallocated buffers,
- bounded message passing,
- no per-block object churn,
- no DOM access from AudioWorklet,
- no unnecessary analyzer computation when hidden.

## Why TEST is separate from App

`Web/TestHarness` is intentionally utilitarian and exposes diagnostics useful during development.
`Web/App` is the eventual polished browser product UI.

The TEST harness must stay available even after the product UI exists because it is part of regression verification.
