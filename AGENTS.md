# SOURCERUNE — 所有 GPT／Codex／Copilot 的專案入口

> 專案僅指 **`ureia-dev/SOURCERUNE`**（單一 **Public** repo）。與使用者溝通一律**繁體中文**。本檔負責**閱讀順序與最低限度護欄**，不再複製各份完整規範。

## 最高優先：DSP 聲音演算法凍結（2026-10-10）

**在任何修 UI／Native／Web／DSP 的工作之前，先讀 [DSP 嚴格凍結與還原制度](docs/architecture/DSP_FREEZE_AND_RESTORE_POLICY.md)。未經使用者對該次具體聲音改動核准，嚴禁更動 DSP／聲音路徑。** 授權後仍須三次精確核對，**每次修改前另建並遠端驗證全新 DSP 還原點**，缺一不做；本原則優先於「GPT 主責 DSP」與舊的自主改善提案。普通 PR 的 DSP Guard 為 fail-closed；不得以改 guard、改名、換平台逃避鎖定。每次回報是否有變更、還原分支／SHA／驗證證據，無法實證即停止。

## 跨對話的自動識別與第一動作（最高啟動規則）

**適用於每一個新對話／舊對話／GPT、Codex、Copilot／工作代理，不限定使用者說「繼續 SOURCERUNE」。** 只要使用者明確提及 `SOURCERUNE`、`ureia-dev/SOURCERUNE`，或從當前對話的上下文、repo/branch/檔案、已接續的工作可**清楚辨識**是在處理 SOURCERUNE，無論任務是詢問進度、分析論壇、UI_01/UI_02、DSP/音質、PNG/REF、美術、Factory Preset、研究、CI、修程式、部署或只讀核對，都必須依序：

1. **先實際讀取最新** [`ureia-dev/SOURCERUNE/AGENTS.md`](https://github.com/ureia-dev/SOURCERUNE/blob/main/AGENTS.md)（即本檔）而非只依賴聊天記憶、前一版摘要或舊 SHA。公開 repo 可用可用的 GitHub 連接器或一般 Web 讀取；**閱讀不以具有寫入權限為前提**。
2. 按下方**必讀順序**取得 `PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、原始產品決議、DSP 工作分工、所需研究規則、`SOURCERUNE_MASTER_HANDOFF.md` 與**這次任務相關**的 UI／DSP／Preset／資產／CI 專屬資料。核心規則和專屬實作證據不可略過；不必無關任務每次重新讀完整歷史封存。
3. **重新查 live GitHub** main、相關 branch／PR／CI／deploy／最後有效 checkpoint；再回答或執行。不可只憑 `AGENTS.md` 就以為已掌握最新狀態，不得把文字規範當成已實作的結果。
4. 無法實際讀取時，**明確說明讀取失敗及阻塞**；不得聲稱「已讀／已依規則核對」。能用公開網址讀就不因未安裝 GitHub 寫入連接器而要求使用者重貼規格。
5. 當前對話若明確是在**其他專案**（例如 VVChain）或只是泛問音訊知識，且沒有 SOURCERUNE 關聯，**不得誤判**並套用此專案規則。

**目標：使用者在不同視窗無須重複貼規則、重講已核准決議或指定固定觸發句；辨識 SOURCERUNE 任務後自動從 repo 的唯一入口讀取。** 這是 repo 對 AI 的行為要求；是否能在新 ChatGPT 視窗被自動喚起仍取決於該視窗是否有相應專案脈絡／帳號指示及網路存取，不能承諾未提供脈絡也會神奇識別。

## 必讀順序（按任務載入）

1. **[PROJECT_RULES.md](PROJECT_RULES.md)**：最高優先的實證大數據產品決策原則、立即執行與排程界線、Fast／Deep／Release、VST3／WEB 同步；不得跳過。
2. **[PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md)**：當前有效的永久產品規格與已核准方向；**[最初產品決議](docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md)** 記錄最初討論的需求與取捨（舊方案不得覆蓋新核准版本）。
3. **[DSP 主責與試聽契約](docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md)**：GPT 負責 DSP 研究、建模、實作、量測、低 CPU 最佳化及可試聽版本；使用者只主責聽感判斷，**不必提供 IR、錄音或量測**。
4. **[研究證據規範](docs/research/RESEARCH_EVIDENCE_STANDARD.md)**：要動功能、參數、算法與 Preset 時詳讀。跨論壇持續研究；10,000 候選／1,000 高價值是**初始里程碑，不是已完成數量或八小時截止**；不准虛構資料。
5. **[最新進度](SOURCERUNE_MASTER_HANDOFF.md)** 及 **GitHub live main／branch／open PR／CI／Pages**：後者優先；不要拿已過時的快照或上一回合口頭進度當現況。
6. **依工作類型才加讀**：DSP→`docs/architecture/DSP_BEHAVIOR_CONTRACT_V1.md`；UI→`docs/product/UI_FUNCTION_CONTRACT.md` 與 `docs/product/reference/` 的 REF MD/JSON／`VISUAL_STYLE_V2.md`；圖資→`Assets/UI/*manifest*` 與 `SCENE_HERO_049_074_PRODUCTION_V1.md`；Preset→`Assets/FactoryPresets/scene_presets_v1.json`；GitHub CI→`.github/workflows/`。

## 不可違反的工作界線

- **真正研究才有資格定產品參數**：搜尋 Gearspace、KVR、Avid DUC、Steinberg、VI-Control、Creative COW、Reddit、Cockos/REAPER、game-audio 等多個獨立社群，跨來源去重、聚類、記真實連結與常見參數搭配，區分高頻需求及少見高價值；以聲學、實測與用戶試聽核驗。產品重心 SOURCE **40%**／MOTION **30%**／SPACE **30%**；**74 個 Active Factory Preset** 不得任意刪回 50。
- **實際聲學優先**：SOURCE／WALL-COVER／SPACE／AMBIENCE 優先可解釋的程序化模型，沒有使用者 IR 一樣可開發。Native VST3 + WEB 是同等主線，共用 C++ DSP／state／stable parameter ID，Web 用 WASM／AudioWorklet；未實作或未實測要標 `PENDING`。1× 原生取樣率為基準，低 CPU，Pro Tools 類的 automation／recall／offline render 穩定性要考慮。
- **UI_01 與 UI_02 皆正式**：UI_01 左四卡，UI_02 場景為主；功能與聲音共用，不得用歷史概念圖覆蓋已核准 REF。PNG 為獨立可重排元件；REF 全頁／atlas 只作參考，數值、Meter、Spectrum、Motion／Listener 由 live code 渲染。細座標只能依核准原圖標 `CONFIRMED`，不足標 `APPROX`。
- **可中斷、可恢復、可驗證**：先查 live HEAD/PR/CI/部署，沿最後 checkpoint 工作；小步 commit、單一目標一條有效 PR、通過必要檢查才 merge。相同錯誤最多重試兩次再查根因，runner／空 steps 等外部故障不得無限 rerun。能自己做的 PR/merge/deploy 不推給使用者。
- **立即做與排程分開**：用戶說「做／繼續／部署」就當次執行可授權工作；只有明確「排程／每小時」才建立排程。Fast 日常；Deep、Release、Host Safety／壓測加次數要依 `PROJECT_RULES.md` 及使用者授權，不能把研究 10k 或美術 50 輪當 CI 授權。
- **每次回報實況**：branch/commit/PR/CI/Pages、做完什麼、缺什麼、下一步。圖、schema、可運作聲音、真量測、VST3 Host、用户試聽是不同驗收門檻，不得混稱「完成」。

## 文件分工（不要再造重複的永久規格）

- 永久新決策寫 `PROJECT_CONSTITUTION.md`／相應專業規格；研究證據寫 `docs/research/`；原始決議的追溯寫 `docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md`（不要求每個任務重讀整份）。
- **UI_01／UI_02 缺項的固定工作日誌**：先讀 [`docs/product/reference/UI_REF_GAP_WORKLOG.md`](docs/product/reference/UI_REF_GAP_WORKLOG.md)（18 個 UI_01、22 個 UI_02、15 個共用待辦，10 個限縮範圍已驗基礎）。每完成一個 ID，必須**同時更新日誌原 ID 的 `[ ]→[x]` 與 PR／Commit／Fast CI／真 Web 或 Native 驗收證據**；部分完成寫 `PARTIAL`、待核准寫 `NEEDS-DECISION`，不能擅自勾完成。`SOURCERUNE_MASTER_HANDOFF.md` 只保留本日誌入口、最新 checkpoint 與摘要，禁止重複整張工作清單。
- 進度只更新 `SOURCERUNE_MASTER_HANDOFF.md`；歷史原稿 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md` 僅作封存，不再當目前執行指令。
- 原始產品聊天只有**可見部分**已與永久決議對照，中間省略內容仍 `PENDING-VERBATIM`；不能聲稱第一句至末句逐字 100% 已核對。
- 無法讀取 GitHub 檔案時，要明講，不可自稱已讀；不要重問使用者已在 repo 核准的決定。

## 修改前能力檢查（永久工作入口）

開始新的實作前，必須遵守 PROJECT_RULES.md 的「修改前的取檔、執行與驗收能力檢查」：先測通正式大型檔案落地、真正執行入口及本次必要驗收證據，再修改。各平台分開記錄；無法執行時標明阻塞，不把文件提交當產品完成，不讓使用者搬運除錯指令。未來建立新專案時亦須納入此流程。
