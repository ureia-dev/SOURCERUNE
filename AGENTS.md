# SOURCERUNE — 所有 AI / GPT / Codex 的永久啟動規則

> **這是 repo 根目錄的 AI 規範入口，永遠有效；不是某一篇聊天的交接摘要。**
>
> **專案：`ureia-dev/SOURCERUNE`。** 不得和任何 VVChain 專案混淆。與使用者只用繁體中文溝通。

## 在回答、修改、部署或研究此專案之前，必須依序讀

1. **[PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md)** — 永久專案憲章：使用者提出過的長期製作原則／全部功能方向／UI01-UI02／所有 REF 物件與文字旋鈕坐標、背景材質、獨立 PNG、Scene Hero、工作流程與禁止事項。**後續幾十次聊天交接都不能取代它。**
2. **[PROJECT_RULES.md](PROJECT_RULES.md)** — 最高優先的 Fast/Deep/Release CI、安全／壓測倍數與 VST3／WEB 同步規則。
3. **[SOURCERUNE_MASTER_HANDOFF.md](SOURCERUNE_MASTER_HANDOFF.md)** — 當前最新 checkpoint、已合併/未合併工作、歷史及下一步；**此檔是會更新的進度紀錄，不是產品原則的唯一來源**。
4. **[docs/product/reference/](docs/product/reference/)** 的 `UI_01_REF_PIXEL_SPEC.md`、`UI_02_REF_PIXEL_SPEC.md`、`UI_01_REF_COORDS.json`、`UI_02_REF_COORDS.json`、`REF_COMPONENT_GAP_AUDIT.md` — 精確數值的權威規格與缺件。
5. 按任務閱讀 `docs/product/UI_FUNCTION_CONTRACT.md`、`docs/product/VISUAL_STYLE_V2.md`、`docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md`、`Assets/UI/*manifest*`、`Web/App`、`Source/UI` 與 `.github/workflows`。

**即使使用者只說「繼續」、「照原則做」、「修 UI」，也不能跳過永久憲章，只看最新交接。** 在不同對話、不同 branch、重新連線時都要執行。

## 每次動手的不可跳過步驟

- **先查最新** `main` HEAD、現有工作 branch HEAD、open PR／CI／workflow jobs/steps/log、Pages/部署、最後成功 checkpoint；只從最新未完成步驟前進。所有舊 SHA、舊 PNG count、舊 PR 號都是歷史，不代表現況。
- 「可恢復、可中斷、可驗證」：採最小安全改動與最小必要測試；每個獨立小步驟 commit/checkpoint，回報 branch、commit、PR、CI、部署、成功／阻塞、下一步。對話可能斷線，禁止長時間黑箱、不准從頭重做。
- 同錯誤最多直接重試 2 次。runner 未啟動／steps 空／GitHub infra 故障標「外部阻塞」，禁止無限 rerun 或亂改程式掩飾問題。
- 相同目標僅一條正式 branch／PR；舊線 superseded 要註明。可安全處理的 PR、merge、部署由 AI 自己處理，不能叫使用者去按 GitHub；不可在 required checks 未成功時擅自 merge。
- Fast 是日常層；Deep／Release、Host Safety、壓力／安全／回歸增次需遵守 PROJECT_RULES.md 與使用者明示授權；**不可自行改倍數或觸發**。
- Native VST3 與 Web 必須維持共同 DSP/state/parameter/preset 行為；未經授權不得更動聲音、Preset、processing order、測試門檻。

## REF／UI 的絕對規範

- UI_01 與 UI_02 都是正式產品。最高精度逐 pixel，**所有**物件、背景、文字、旋鈕、刻度、控件、Meter、圖表、狀態與材質記錄 x/y/w/h、centers、gap、padding、層級、baseline，且需要在 REF 資料夾有長期 MD + JSON 規格與具體缺件清單。
- 核准原始 REF 才能做 `CONFIRMED` 精掃；不明為 `APPROX`，缺正式 bitmap 就不能宣稱 100% 或從 CSS 反推。UI_01 正式左欄是**四卡**，不能誤用舊五卡圖。
- 禁止把整張／局部 REF 截圖或 atlas tile 當正式 UI 素材；優先重用可拆 Runtime PNG／9-slice，必要時新增真正獨立素材。文字、值、Knob pointer、Meter fill、Spectrum、EQ curves、Motion path、waveform、Source/Listener 必須 live code。
- REF ↔ 現有 `Assets/UI/{Runtime,Shared,UI_01,UI_02,ReferenceSheets}`、Web/Native／manifests **逐件對照**，只在證明需要時補圖；Scene Hero 049–074 要 26 個不同場景 × 3 種尺寸各自輸出，不能靠 atlas 裁片。
- 缺件、缺材質、缺狀態／binding、缺測量必須分別明確標出；圖存在不等於控制功能已完成，文件存在也不等於實際部署成功。

## 如何維護跨多篇對話的知識

- **永久製作方向、新增或修訂的使用者原則**：更新 `PROJECT_CONSTITUTION.md`（以及相關 authoritative 子規格），必須留下 commit。
- **本輪進度、日期、branch、commit、PR、CI、下一步**：更新 `SOURCERUNE_MASTER_HANDOFF.md`／任務記錄，不要重複抄憲章，也不能覆蓋憲章。
- **新 AI 平台適配**：`.github/copilot-instructions.md` 應指向本文件與永久憲章；不同平台只要有入口也必須指回同一套權威文件。
- 當使用者要求「繼續」時，要先閱讀永久文件與最新 repo 狀態，然後**真的做下一個小步並建立 checkpoint**，不只是報告計畫。

> 若這個 AI 對話環境不能自動取 repo 文件，不能假稱已讀；必須先取得 repo 存取或明確說明限制。
