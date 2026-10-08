# SOURCERUNE

## 新的 GPT／開發者請先讀（正式交接）

- **[SOURCERUNE_MASTER_HANDOFF.md](SOURCERUNE_MASTER_HANDOFF.md)**：完整需求、使用者指示、GitHub/CI/斷線恢復規則、UI_01／UI_02 REF pixel 工作、元件缺口、歷史 checkpoints、最新查核方式。
- **[AGENTS.md](AGENTS.md)**：給 AI 助手的快速操作入口；必須先查最新 main／PR／CI，不能從歷史 SHA 盲目重做。
- REF 細部座標與元件／材質缺口：**[docs/product/reference/](docs/product/reference/)**。

SOURCERUNE is an audio-post/worldizing scene processor focused on source transformation, transmission, occlusion, distance and motion, acoustic space, ambience, intelligibility, and reliable recall.

## Mainline targets

SOURCERUNE now has two equal mainline runtime targets:

- **VST3** — native DAW/plugin build.
- **WEB** — browser test/product runtime built from the same C++ DSP core through WebAssembly.

AAX is not part of the current mainline. It may be added later as a secondary target without changing the core DSP architecture.

## Current repository policy

Development currently stays in this **single public repository** so VST3/WEB/UI iteration and WEB TEST deployment remain fast. No separate private core repository is part of the current plan.


## Architecture rules

- C++20 shared DSP/scene/state core.
- VST3 and WEB must share algorithms and parameter/state definitions; no separate "web-only sound".
- WEB audio processing must run through WebAssembly/AudioWorklet, not the browser UI thread.
- Low-CPU native sample-rate processing; no routine oversampling baseline.
- Deterministic state/render behavior where applicable.
- Modular scene engine with directly testable DSP stages.
- WEB has a dedicated TEST harness for fast listening, regression, and parameter verification.

See:
- `docs/architecture/PROJECT_STRUCTURE.md`
- `docs/architecture/STRUCTURE_REVIEW_100.md`
- `docs/architecture/WEB_RUNTIME.md`
