# SOURCERUNE — Agent / GPT 交接入口

**任何進入本 repo 執行任務的 AI 助手或開發者，先讀以下文件，不要請使用者重新貼長篇歷史對話。**

1. [SOURCERUNE_MASTER_HANDOFF.md](SOURCERUNE_MASTER_HANDOFF.md) — 本對話至 2026-10-08 的完整要求、工作方式、經核對 checkpoint、REF/元件缺口、下一步與斷線恢復程序。
2. [PROJECT_RULES.md](PROJECT_RULES.md) — Fast/Deep/Release、安全測試次數鎖定、VST3／WEB 同步部署的最高優先專案規則。
3. [docs/product/reference/](docs/product/reference/) — UI_01／UI_02 REF 像素規格、machine-readable 座標、元件／材質 gap audit。
4. [docs/product/UI_FUNCTION_CONTRACT.md](docs/product/UI_FUNCTION_CONTRACT.md) — 兩版 UI 共有的功能、DSP/state、VST3/WEB parity。
5. [docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md](docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md) — 尚需補製的獨立 Scene Hero 圖像契約。

## 每次開始工作的強制程序

先重新取得 GitHub **最新 main、相關工作 branch／HEAD、open PR、Actions checks／logs、部署、最後成功 checkpoint**；不得從本文件的歷史 SHA 盲目繼續。只做下一個未完成的小步；每一步保留 commit/checkpoint；失敗不得從頭重做或無限重跑。要改動的範圍嚴守當次使用者授權與上列文件。

只用繁體中文回覆使用者。正式 REF 圖像不准作 runtime 截圖素材；必須使用可拆 PNG/9-slice 或 live code。未驗證不能標 100% 完成。不要自行變更 DSP 音色、Preset、processing order、安全測試的次數或觸發規則。

## 防止讀到過期狀態

本 repo 的部分舊 docs 記錄過「PNG=0」、「UI_01 四卡 521px」、「PR #24 OPEN」，這些都是歷史快照；**最新 GitHub 和已驗證 checkpoint 優先**。交接主文件已記載後續更正。任何新工作先 compare 實際 HEAD，勿覆寫他線進度。
