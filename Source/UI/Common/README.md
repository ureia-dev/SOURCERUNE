# Native UI section contract

This folder mirrors the complete UI component partition already used by the WEB App.

Authoritative functional inventories:
- `Web/App/data/ui_controls.json`
- `docs/product/UI_COMPONENT_MAP_V1.md`

Native layout contract:
- `Common/UISectionIds.h` — complete semantic section inventory
- `UI_01/LayoutSpec.h` — engineer-oriented partition
- `UI_02/LayoutSpec.h` — scene/spatial partition

These files intentionally do **not** contain DSP algorithms or host-specific UI widgets yet. They prevent later VST3 UI work from silently dropping a section or inventing a different sound/state model.

UI_01 and UI_02 may arrange sections differently, but both must bind to the same future parameter/state IDs.
