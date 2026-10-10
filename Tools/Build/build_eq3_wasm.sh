#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
# Same C++ Tone/Parametric3.h is consumed by VST3 and this minimal WASM.
clang++ --target=wasm32 -std=c++20 -Oz -nostdlib -fno-exceptions -fno-rtti \
  -ffp-contract=off -Wl,--no-entry -Wl,--export-memory -Wl,--import-undefined \
  -Wl,--initial-memory=131072 -Wl,--max-memory=131072 -Wl,--strip-all \
  -Wl,--export=sr_eq3_version -Wl,--export=sr_eq3_prepare \
  -Wl,--export=sr_eq3_set -Wl,--export=sr_eq3_reset \
  -Wl,--export=sr_eq3_buffer -Wl,--export=sr_eq3_active \
  -Wl,--export=sr_eq3_process \
  Source/DSP/Tone/Parametric3Wasm.cpp -o Web/App/audio/eq3.wasm
