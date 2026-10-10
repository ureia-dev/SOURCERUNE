#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
# Tiny standalone shared-C++ HPF WASM, deliberately not recompiling the
# larger SOURCE/TRANSMISSION scene module on every UI change.
clang++ --target=wasm32 -std=c++20 -Oz -nostdlib -fno-exceptions -fno-rtti \
  -ffp-contract=off -Wl,--no-entry -Wl,--export-memory -Wl,--import-undefined \
  -Wl,--initial-memory=131072 -Wl,--max-memory=131072 -Wl,--strip-all \
  -Wl,--export=sr_hpf_version -Wl,--export=sr_hpf_prepare \
  -Wl,--export=sr_hpf_set -Wl,--export=sr_hpf_reset \
  -Wl,--export=sr_hpf_buffer -Wl,--export=sr_hpf_active \
  -Wl,--export=sr_hpf_process \
  Source/DSP/Tone/HpfWasm.cpp -o Web/App/audio/hpf.wasm
