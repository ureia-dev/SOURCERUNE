#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
mkdir -p Web/App/audio
# clang++ + wasm-ld, or ZIG=/path/to/zig (no Emscripten runtime needed).
if [[ -n "${ZIG:-}" ]]; then compiler=("$ZIG" c++ -target wasm32-freestanding); else compiler=("${CXX_WASM:-clang++}" --target=wasm32); fi
"${compiler[@]}" -std=c++20 -O2 -nostdlib -fno-exceptions -fno-rtti -fno-builtin \
  -ffp-contract=off -Wl,--no-entry -Wl,--export-memory \
  -Wl,-z,stack-size=65536 -Wl,--initial-memory=131072 -Wl,--max-memory=131072 \
  -Wl,--export=sr_version -Wl,--export=sr_prepare -Wl,--export=sr_input \
  -Wl,--export=sr_output -Wl,--export=sr_parameters -Wl,--export=sr_reset \
  -Wl,--export=sr_process Source/DSP/SceneProcessor.cpp Source/DSP/WasmBridge.cpp \
  -o Web/App/audio/sourcerune.wasm
