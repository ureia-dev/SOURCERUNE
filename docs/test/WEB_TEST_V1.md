# WEB TEST V1

## Purpose

Provide a public, zero-build browser surface for rapid UI/transport testing before the shared C++ DSP bridge exists.

## Current behavior

Audio loaded from the user's machine is passed through Web Audio unchanged. Peak/RMS and spectrum are measured from that pass-through stream. LUFS is intentionally left pending rather than displaying a fake value.

The UI can switch between UI_01 and UI_02 without changing state.

## Asset binding

The browser consumes `Web/App/data/catalog.json`, derived from `Assets/UI/asset_manifest_v2.csv`.

Runtime image paths are stable even if a PNG is not yet present. Missing images fall back to restrained CSS panels and do not change state.

## Run

- GitHub Pages: publish the repository root, then open `/SOURCERUNE/`.
- Local static server: serve the repository root and open `/Web/App/`.
- Diagnostic mode: `/Web/App/?test=1`.

Opening the HTML directly from `file://` is not supported because the catalog is fetched as JSON.

## Next phase

Connect:
`AudioWorklet → Wasm bindings → shared C++ State / Scene / DSP`

Do not add a parallel JavaScript audio algorithm.
