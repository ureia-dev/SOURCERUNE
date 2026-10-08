# SOURCERUNE

## 永久製作原則：任何新 GPT / 開發者都必須先讀

1. **[AGENTS.md](AGENTS.md)** — AI 的根目錄第一入口，標記必讀順序與最低限度硬規則。
2. **[PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md)** — **永久且完整**的產品方向、使用者要求、REF/所有元件與材質標準、UI01/02、工作方法、禁止事項；第幾篇交接都不得覆蓋。
3. **[PROJECT_RULES.md](PROJECT_RULES.md)** — **產品大數據實證先行最高原則**，加上 Fast／Deep／Release CI 規則與 VST3／WEB 同步。
4. **[docs/research/RESEARCH_EVIDENCE_STANDARD.md](docs/research/RESEARCH_EVIDENCE_STANDARD.md)** — 持續循環的八個研究維度（非八小時限制）／初始約 10,000 候選／去重保留約 1,000 真實證據里程碑方法、40/30/30 核心方向、74 Factory 與參數／DSP 工程驗證。
5. **[SOURCERUNE_MASTER_HANDOFF.md](SOURCERUNE_MASTER_HANDOFF.md)** — 只有**當前工作進度、checkpoint、未完成事項**（先查最新 GitHub 才能相信）。
6. **[docs/product/reference/](docs/product/reference/)** — REF 像素座標／文字旋鈕／材質與 runtime 缺件明細。

> **注意：交接文件只交接進度；新增永久原則必須更新 PROJECT_CONSTITUTION.md。**


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
