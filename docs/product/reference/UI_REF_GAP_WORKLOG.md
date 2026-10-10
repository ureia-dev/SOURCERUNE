# SOURCERUNE — UI_01／UI_02 REF 缺項修復工作日誌（唯一有效）

## 部署完成 Checkpoint｜PR #114＋#115（2026-10-11）

- **使用者正式授權**：明確表示「部署」表示自動合併及打包，無須每次確認；本次指定立刻部署，並核對 GitHub UI 黃色 `Action required`。
- **外部告警根因**：PR #114、#115 中 `github-actions[bot]` 提交截圖／JSON 時，`pull_request` 事件會留下 `action_required`，該類 run 的 **jobs=[]**，並非 UI JS 或 test step 執行失敗。上一次成功人工 head 的 Chromium run 為 #38067016670（#115，SUCCESS），#114 為 #38065542025 等；兩者快照提交後沒有修改已測程式。合併前已從 PR #114/#115 **刪除臨時預覽 workflow**，保留最終 PNG、JSON 證據，避免上線後繼續污染 Actions 清單。
- **合併和 Fast CI**：[PR #114](https://github.com/ureia-dev/SOURCERUNE/pull/114) 在最新正式 Fast [#38067377365](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38067377365) **SUCCESS（含 DSP protected path guard）** 後，已由 merge commit `7f8712b4ebe1e52a962652077229caa5d3686260` 進入 main。[PR #115](https://github.com/ureia-dev/SOURCERUNE/pull/115) 在 Fast [#38067512752](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38067512752) **SUCCESS** 後，已由 merge commit `b5676adf1aa2d1b29f7679f66c203f180829b431` 進入 main。兩 PR 都不是 Draft、都已合併，且 UI_01/02 主程式的來源在 main。
- **真 Web 發布**：[GitHub Pages](https://ureia-dev.github.io/SOURCERUNE/Web/App/?ui=UI_01) 正式 [run #38067588972](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38067588972) **SUCCESS**：Shared three-band EQ WASM build、Render audit、Pages package upload、Pages deployment steps 均 SUCCESS；發布所用主程式是 `b5676adf1aa2d1b29f7679f66c203f180829b431`。工作流另提交渲染稽核 `e35a761a060d3c5a5295d2026de0cc0e524ba8c6`（只變更 `Web/App/preview/rendered/**`）；最終 repo 上的 `Web/App/preview/rendered/geometry-report.json` 指回發布版本，`UI_01.ok=true`、`UI_02.ok=true`、雙 UI `knobSmoke.ok=true`、failures=[]。網頁外部實際 HTTP 存取未能由聊天端直接驗證，不以 Actions success 冒稱真人在瀏覽器已看見。
- **打包邊界**：正式 run 的 `github-pages` artifact 已產出（artifact #11675309884），**Web 靜態包存在**；這個 artifact **不是 Windows/macOS VST3 安裝包**。main 目前只含 `ci.yml` / `web-preview-pages.yml`，沒有 Windows/macOS Native 套件工作流、沒有 `Tools/Build/package_native.py`。相關打包仍在未合併、有舊 Native 狀態（11 ID，與目前 13 ID 不一致）的 [PR #68](https://github.com/ureia-dev/SOURCERUNE/pull/68)；依專案 Release 手動觸發與 Host acceptance 規則，**本輪未出新的 VST3 ZIP／未進行真正的 DAW Host 驗收**。不得自行加入未核准的自動 Release 壓測或聲稱完成雙平台打包。
- **DSP**：#114/#115 及這次合併均無 `Source/DSP/**`、WASM/AudioWorklet 音訊演算法、公開參數語意或 Factory Preset 改動；無 DSP 還原點需要建立。S/M／Presence／Dynamic／Ø 等視覺控件仍刻意 disabled，不能誤判為真正音效處理功能已完成。
- **恢復點**：Web 正式來源 commit `b5676adf`，Render audit checkpoint `e35a761a`；下輪修改前先重讀最新 `main`、PR、CI；下一項仍依唯一工作單從剩餘 Condition / EQ/Tone / 旋鈕材質起進行，切勿重做本輪成功三模組。



> **最新 P0 Checkpoint（2026-10-09）**：U01-12 `[x]`（UI_01 Web 四個 Checkbox／共用 State／Advanced／Undo/Redo 已 Chrome 真驗收），**目前 11 項 `[x]`、55 項 `[ ]`（含 ART-SHARED-001）**；CROSS-01（兩張 UI_01 正式 PNG binary 入 GitHub）仍 BLOCKED，其他 P0 仍待辦。文末「初次登錄統計」是歷史數值，不可當現況。

> 2026-10-09 建立；承接使用者選取的完整缺項稽核。**每完成一個工作 ID，要直接在這份 GitHub 文件中將 `[ ]` 更新為 `[x]`，填入 PR／Commit／CI／正式 REF 與真 Web/Native 驗收證據。** 不另建立重複競爭工作清單。純文件的登錄不等於任何修復完成。

## 2026-10-10｜UI_01 主 Spectrum 共用算法及右側 Meter 待驗收（PR #114）

> **這節為現行最新狀態，取代下方歷史紀錄中「PR #113 尚未合併」及「Spectrum 尚用舊繪圖語法」的敘述。** 先前 UI_01 Scene／Spectrum 控制／四卡已經使用者授權，PR #113 **合併** `e10fa05c47723dbb287f59418ee55e33046d454b`，並由 [正式 Web Pages run #38064099009](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38064099009) 完成部署。原工作內容沒有重做。

- **使用者此輪插單**：紅圈主分析區 `SPECTRUM` 要套用**小型 EQ 同一套頻譜算法**，換掉原本 Canvas 直接 FFT 取點、逐像素畫線的視覺語法；再繼續下一項 UI（既有第四步 U01-11 右側 Meter）。不碰 `Source/DSP/**`、WASM／AudioWorklet 計算、公開參數 ID、Factory Preset，亦不動 `Assets/UI/ReferenceSheets/**` 解析度。
- **單一進行中工作線**：[PR #114](https://github.com/ureia-dev/SOURCERUNE/pull/114) ／ `feat/ui01-meter-ref-pr114`；最後候選程式 checkpoint `00568969a612255071bbb2b0d6c83afd69c8ecea`，真 Chromium 圖／報告更新 commit `0d48d1b06193d255081b8fca0f4381b2c373b9fc`，**draft，未合併，未重新部署**。PR #113 不重開；舊打包 PR #68 與本 UI 無關，未合併。沒有新 DSP 還原點，因本輪未改任何受保護 DSP。
- **主 SPECTRUM 真正共用**：`Web/App/eq_analyzer_v1.js` 導出同一 `createSpectrumDisplayTrace()` 顯示用演算法；迷你 EQ 與主分析器皆走原 129 點、20 Hz–20 kHz 對數頻率取樣、FFT bin **power average**、7 點頻率平滑、`attack=.70 / release=.21`、42ms 視覺節流、+4.5 dB/octave-of-frequency（公式 `4.5 * log2(f/1000)`）只供顯示補償。大畫面改用相同的保持曲線形狀之三次 Bézier 繪圖；保留真 PRE／POST 兩路現有 analyser、RTA 開關、1/3 octave 功率平滑／RAW、靜態 L+R。該演算法只繪畫：**音訊處理聲音完全不變**。Main Canvas 的填色採獨立 Path2D，避免把封閉填色底框也描邊。
- **真實播放證據**：在 GitHub Actions 由真正 Web/App 將臨時 48 kHz、3 秒、1 kHz PCM WAV 經現有播放器 + DSP AudioWorklet 播放，真正的 Canvas 採樣色彩與 mini EQ overlay 同時成功。測得 `playing=true`、播放時間約 `0.272s`、mini SVG 線段長度 `5476`、主頻譜有效青色像素 `248`；相同模型 129 個樣本逐點數值相等（`same=true`），三分之一八度的取樣結果與窄頻取樣不同而有限；**並非在正式畫面畫假峰值**。實際畫面 [SPECTRUM 真 1kHz 輸入圖](../../../Web/App/preview/rendered/UI_01_SPECTRUM_PR114.png)。
- **同輪 Meter 續作**：`Web/App/ui01_meter_ref_pr114.css` 復用批准 `RT_METER_FRAME.png`／`RT_METER_SEGMENT.png` 與 `RT_SEGMENT_CAP_IDLE/HOVER/ACTIVE.png`；既有 IN／OUT 20×178px 真 Peak/RMS 指示保留，加入中間 `0,-6,-12,-24,-36,-60` dB 文字與分段 LED。V9 舊 `.meters::after` 六行刻度造成雙疊、`.meter-values` 舊 Grid 推走 LUFS 文字的真實問題已清除，現 `LUFS` 區真正位於 Meter 鎖定框內，**讀數只保持 `—`／pending，未有 LUFS DSP 不得仿造數值**。其餘精確 REF 文字字型與 Native Host 視覺仍未確認；U01-11 仍原始 `[ ]` 待人工視覺核准。
- **正式驗證證據**：[Meter 真空檔畫面](../../../Web/App/preview/rendered/UI_01_METER_PR114.png)／[JSON 報告](../../../Web/App/preview/rendered/UI_01_METER_PR114_report.json)；[Chromium run #38065399265](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38065399265) **SUCCESS**、[Fast CI #38065399202](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38065399202) **SUCCESS**；`geometry.ok=true`、`lufsLayout.inside=true`／`labelVisible=true`／`pendingVisible=true`／`duplicateScale=none`、正式 Meter PNG 已讀取、Peak↔RMS click PASS。先前 run #38064554279 因瀏覽器 transform 尺寸驗證錯誤失敗，#38064953484 的不正確「1/3 峰值必定較低」測試假設也已診斷修正，未盲目重跑；後續 run 已成功。
- **剩餘邊界**：正式 UI_01 REF 原 PNG 仍未入庫，沒有 1:1 同來源 overlay；VST3 Native 自訂 UI 與真 Host 尚未驗證，本輪沒有包版 VST；如使用者日後說「部署」，依最新指示可直接合併、正式 Web 部署與**既有核准流程允許的**打包，無需重問，但**不可跳過 CI／DSP 鎖定或假稱 Native 已出包**。UI 工作後續依序為 U01-13～17 底部七模組、U01-18 旋鈕與材質；待真畫面檢查後沿現有計畫小步繼續。

## 2026-10-10｜UI_01 底部三模組 ×3 階段實作與視覺驗證（PR #115，最新）

- **本次核准範圍**：使用者「繼續，這次三倍進度再跟我報告」。沿 UI_01 REF 待辦 U01-14、15、16 一輪完成三個獨立 Web 顯示／既有 State 串接步驟，**不碰** `Source/DSP/**`、WASM／AudioWorklet 音訊計算、已公開參數、Factory Preset、Native DSP 或 `Assets/UI/ReferenceSheets/**` 解析度。
- **PR 與上游依賴**：唯一新工作線 `feat/ui01-bottom-three-ref-20261010`、[Draft PR #115](https://github.com/ureia-dev/SOURCERUNE/pull/115)，原先 base 為 `feat/ui01-meter-ref-pr114`；**目前 [PR #114](https://github.com/ureia-dev/SOURCERUNE/pull/114) 已經在 Fast CI #38067377365 成功之後，先以 merge commit `7f8712b4ebe1e52a962652077229caa5d3686260` 合併入 main。** GitHub 自動將本 [PR #115](https://github.com/ureia-dev/SOURCERUNE/pull/115) 的 base 改為 `main`，mergeable=true、沒有衝突，#115 仍 Draft、**尚未合併或完成最終 Web 部署**。PR #114 的一次性畫面工作流已清除，#115 的一次性 Chromium 工作流也已清除（正式 PNG 與驗證報告保留）。
- **Checkpoint A — Ambience** `f28552c4e2dd4594e6d7176217b76171a063f049`：`Web/App/ui01_bottom_ref.js`／`Web/App/ui01_bottom_ref_v1.css` 接入 UI_01 卡片，`Duck` 勾選連既有 `ambienceDuck` 數值 45↔0 與 Undo／Redo 狀態、保留選單與 Amount 旋鈕。S/M 正式 `RT_SEGMENT_CAP_DISABLED.png` 呈現 **disabled**，等待獨立聲道／Mid-Side 語意核准，**不假裝已可操作**。底部是真正 `outAn.getByteTimeDomainData()` 描繪的 **OUT** wave（明確不是可分離 Ambience 訊號），無音訊時只保留細基準線；未產生任何虛構 Ambience 波形。
- **Checkpoint B — Intelligibility** `270ef21b3375de2b2e6f58ff2f8fbe91e60ab6fd`：既有 Natural／More Clear／Muffled 維持原 `intelligibilityMode` State 按鍵，只調正式按鈕圖與大小。加回 REF 的 Presence／Dynamic 標籤及 `RT_CHECKBOX_DISABLED.png` 外觀，但因既有 `ui_controls.json` 未登錄二者、DSP 語意未核准，兩項 **disabled**，沒有新增假的參數、音質處理；三個 mode 改動可操作且未溢出。光學精修待驗 commit `961ead1054a0b952a9f95688af470f1ad993bdc3` 拉開 70% 數值與 Presence 的垂直距離。
- **Checkpoint C — Mix** `962d67297a05ed703fe14706c3d0e56fd1b72d23`：用既有可控 `mix` 比例顯示真正 WET／DRY 互補百分比，Ø 按鍵使用正式 `RT_BUTTON_CAP_DISABLED.png` 但 **不可按**（未授權 phase inversion DSP）。實際 Chrome 測得既有鍵盤旋鈕更新 State 時，新增文字不會同步；最小修復 `e6def090752322e3e5a2508d124eea7a70cb9cc8` 由 `setMacroKnob()` 呼叫獨立 `syncMixRef()` 同步，而不是重建整張 UI，實測 ArrowDown／ArrowUp WET 100→99→100 皆即時更新。光學精修 `961ead10` 改為兩行 WET／DRY 讀數，避免窄卡文字擠壓。
- **最後成功真 Chromium**：[run #38066876017](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38066876017) **SUCCESS**，由 UI_01 真 Web 入口與 Runtime PNG 渲染，source commit `961ead1054a0b952a9f95688af470f1ad993bdc3`，其後只有 GitHub Actions 截圖 checkpoint；完整真圖 [UI_01_BOTTOM_THREE_PR115.png](../../../Web/App/preview/rendered/UI_01_BOTTOM_THREE_PR115.png) 與實際 880 Hz PCM/WAV 播放真輸出波形圖 [UI_01_BOTTOM_THREE_LIVE_PR115.png](../../../Web/App/preview/rendered/UI_01_BOTTOM_THREE_LIVE_PR115.png)，[報告](../../../Web/App/preview/rendered/UI_01_BOTTOM_THREE_PR115_report.json)。
- **實測細項**：原鎖定 UI_01 `geometry=true`，新增 6 個子區矩形完全包含在母卡內，5 個未核准視覺控件皆 `disabled=true` 且讀到各自正式 PNG，Duck 修改與 Undo `PASS`、模式切換 `PASS`、Mix 鍵盤即時文字 `PASS`；真 WAV 送進現有 Web AudioWorklet 後 `playing=true`、`currentTime≈0.251s`、OUT waveform 960 個非零可見像素。真圖 PNG SHA256 `d281c6963dfe369c24e88987963610aa8280852f1f9aa8c1bff63b3882477c94`；音訊圖 SHA256 `30d5c4341ec7f95045b2e973d425d4c1f046d810b3731812fc97e941585a042f`。
- **尚未完成，不能勾掉待辦**：Presence/Dynamic 的參數與 DSP、Ambience S/M 聲道路由或確切語意、可獨立抽出的 Ambience 波形、Mix Ø phase inversion、完整 REF PNG 逐像素疊圖、Native VST3 Editor parity 與主程式實際試聽。**U01-14～16 仍保持原有 `[ ]` 待後續核准／DSP 申請**；不因畫面有 disabled 按鈕就聲稱功能完成。本 stacked PR 的專用 Chromium PASS；普通 Fast CI 目前只在上游 PR #114 實際成功版本確認，**不能將上游 Fast PASS 冒稱為 #115 Fast PASS**。
- **下一步**：待使用者確認三卡的真圖後，再依原 UI 工作序列處理 U01-13 Condition、U01-17 EQ/Tone、U01-18 旋鈕材質的真正缺項；涉及聲音語意一律先提案，不擅自解凍 DSP。若使用者明示「部署」，才依合併授權先核 CI、先 #114 後 #115、Web 後 Native 合法可用打包流程；不能冒稱未完成的 Native 打包完成。

## 2026-10-10｜UI_01／UI_02 與正式 REF 對照盤點（本輪只登錄、不修復）

> **Checkpoint 性質：盤點／待辦優先級整理；沒有新完成的 UI ID。** 本節只對應以下原有工作 ID，**不新增第二份 TODO 或獨立產品規格**。底下既有 `[ ]` 保留原狀；日後實際修正與驗收才可把對應 ID 改為 `[x]`。

### 來源與能證明的範圍

- 查核時 repo `ureia-dev/SOURCERUNE`，`main=e457eba0153d0d6e624cc93cc9c3ddb39f83bd6c`；當時 open PR 僅 `#68`（Native 打包，與本盤點分離）。
- 現有實際畫面：[`UI_01.png`](../../../Web/App/preview/rendered/UI_01.png)、[`UI_02.png`](../../../Web/App/preview/rendered/UI_02.png)；Chrome 量測：[`geometry-report.json`](../../../Web/App/preview/rendered/geometry-report.json) 與 [`render-log.txt`](../../../Web/App/preview/rendered/render-log.txt)。
- 最後成功的 Web Preview：[run 38055341443](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38055341443)，**報告內標記的來源 commit 是 `2aaee45953bd3b39aeecc0ad7beb5ead93e56b63`，與本次 main HEAD 不同**；因此只能宣稱該次報告驗證項目通過，**不可把它冒稱為 e457eba 全畫面的新一輪逐像素驗收**。當時 CI 38055528325 success。
- 該份 Chrome 報告：UI_01 幾何 51/51、UI_02 幾何 41/41，兩版 `knobSmoke`、`eqMouse`、`eqInline`、`eqFocus` 皆 `ok=true`；這是已測幾何與操作通過，**不等於 REF 逐像素一致、獨立圖片畫質合格、Native VST3 Host 完成、全 DSP 已驗收**。
- 正式 REF：UI_02 原始 `Assets/UI/UI_02/UI_02_REF/UI_02_REF.png`（1672×941）及 2.5× PNG 已入 Git；**UI_01 最新正式無說明圖 1508×808 與 2.5× PNG 仍未入 Git**，只有 142 個元件掃描/座標文件；所以 UI_01 細節是以現有掃描規格比對，**不是同一批原始像素的完整 overlay 結果**。早期 1536×1024 含註解海報/1499×807 UI shell 的不同座標系不能直接視為 1:1。

### UI_01｜差異歸屬（維持原有 ID）

| 原 ID | REF 對比後的剩餘工作／限制 | 本輪判定 |
|---|---|---|
| U01-01～05 | Logo/上方工具/預設展示模型與四張素材卡：版位已有，品牌、照片、裁切、亮度、框線、圖示與 REF 未逐項對齊；REF 展示車載聲音／行動通話等，Web 初始模型不同 **不代表應強制改產品預設**。 | `PENDING / 部分待決策` |
| U01-06～09 | 中央 Scene：補核對 REF 的明亮距離／時間曲線、車/人物或節點、Start/Closest/End、Zoom/Reset、波形與 seek marker；線、點、值必須維持 Live，不能用 REF 圖裁切冒充。 | `PENDING` |
| U01-10 | Spectrum 分析列與模式：REF 的 Pre/Post、RTA、1/3、L+R 等可見操作，當前主介面未完整具備等價控制；需要真 analyzer/state 與互動驗收，不只補字。 | `PENDING / P0` |
| U01-11 | Meter/Peak/RMS/LUFS：彩色分段、完整刻度、文字及材質仍未精細對齊；Peak/RMS 保持真 Live，LUFS 不可填假讀數（另見 CROSS-10）。 | `PARTIAL / P1` |
| U01-13～16 | 底部七區控件：Condition 的 USED/勾選雖有已驗子項，但整區未完成；Intelligibility Presence/Dynamic、Ambience S/M/Duck/波形、Mix Ø 等仍要核產品語意與真控制綁定。 | `PARTIAL / 待核准項不得自行發明 DSP` |
| U01-17 | EQ 五節點顏色、迷你框不顯黑塊、Zoom In/drag/wheel/Undo 已有 Web Chromium 子項 PASS；**整體仍未完成 REF 細像素對位、Final Tone/Native Host 驗收**。 | `PARTIAL` |
| U01-18 | 七區的金屬旋鈕、指針、刻度環、面板反光、字體大小/基線、控制留白與 REF 還有視覺差距；固定外框尺寸不應任意重排。 | `PENDING / 視覺重點` |

### UI_02｜差異歸屬（維持原有 ID）

| 原 ID | REF 對比後的剩餘工作／限制 | 本輪判定 |
|---|---|---|
| U02-01～04 | 頂部 Shuffle、Folder/A-B 排列與橫向 IN/OUT Meter：主幾何已建立，部分圖示、位置、完整色段/標尺仍不符；Shuffle 用途不能由圖案擅自決定。 | `PENDING / 部分待決策` |
| U02-05～07、15～17 | SOURCE/Transmission/Wall/Space/Ambience 照片或選取模型與 REF 展示場景不同；尤其 Ambience 使用與環境重複圖片，須獨立素材及正確 state；70%/35% 是比較場景差，不能直接更改預設。 | `PENDING` |
| U02-08～09、CROSS-02 | **最顯眼的視覺缺口：中央 Scene REF 為細緻夜景、前景汽車/人物與深度關係，現行 Web 顯示模糊白日街景與簡化物件**。須使用獨立高品質背景/前景資產，而非銳化模糊小圖或把整張 REF 當背景。 | `PENDING / 優先修復美術品質` |
| U02-10～14 | 大 Distance 300px、三個小旋鈕 54px 的配置已立基礎，但刻度、指針、∞、文字、Motion 車輛動線仍待比對；Speed % vs km/h 屬待核准單位，不擅改物理速度。 | `PARTIAL / 部分待決策` |
| U02-18～21 | 底部波形/Mobile selector、Condition 材質、Intelligibility 模式鈕可能溢出底框、Mix Wet/箭頭等尚須確實完整顯示並驗證操作；尤其先修 Intelligibility 溢出。 | `PENDING / P0、P1 各依原 ID` |
| U02-22 | EQ Web 五節點互動已有真 Chrome PASS；REF Natural/完整外觀與 Native 編輯器/Host 未完成，不因 EQ 子項 PASS 而勾整項。 | `PARTIAL` |

### 2026-10-10 使用者最新執行覆蓋規則：逐步給實際組裝圖、逐步核准、不合併

> **這節規則取代上文「先修 UI_02 高解析場景美術」的排序，但不刪除該既存待辦 ID。** 使用者明確要求 `Assets/UI/ReferenceSheets/` **圖片解析度修復暫緩**；目前階段不得觸碰這個資料夾的圖檔，也不以高解析重製當作先決步驟。ART-SHARED-001、CROSS-02 等圖片品質任務仍保留原樣並保持待辦，不宣稱已完成。

- **執行序列鎖定**：① **UI_01 Scene View**（U01-06～09：真汽車獨立 Runtime 圖層、距離／Motion 曲線、時間軸刻度、ZOOM/RESET、Live waveform；逐項核已有元件和真操作）→ ② Spectrum（U01-10）→ ③ 左四張素材卡之狀態／圖片對照（U01-03～05；REF 範例值不直接改 Factory 或啟動預設）→ ④ 右側 Meter（U01-11；不得假造 LUFS）→ ⑤ 底部七模組缺漏真控件（U01-13～17；涉及待核准語意先停止該項）→ ⑥ 旋鈕／材質／字體／間距（U01-18；避免擅改大區幾何）。UI_02 對應同質項目留在既有 U02-01～22，後續按使用者核准再接續。
- **硬性使用者驗收關卡**：只做當前一項；**用真正 SOURCERUNE Web/App 與正式 `Assets/UI/Runtime` 元件拼回實際畫面**，不得以示意圖、AI 生成類似畫面、REF 全頁截圖冒充可運作 UI；提供工作分支的實際畫面及可檢查連結，記錄來源 SHA。用戶檢查／明確同意後才做下一項；**全部保持未合併**，不得以 Fast CI 綠燈代替用戶觀感核准。
- **改碼前能力關卡仍有效**：先實測完整必要 Web 來源／素材在執行環境落地、真 Chrome 啟動與基準截圖；如環境缺網路、GitHub 連接器拿不到真正完整大圖或無法執行任務所需入口，記 `BLOCKED-VERIFICATION`，僅允許文件／診斷，不在無法驗證時盲改正式程式。成功後依現有流程少量修改、最小 Fast、實際 Chrome screenshot 比 REF，留 branch/commit/PR/CI/預覽證據。
- **DSP 凍結**：上述都是顯示與 UI 互動工作；已存在的音訊路徑、DSP、WASM、Factory Preset、公開參數 ID、Safety/CI 次數**全部保持不動**；若某個聲音行為必須實際改動，另行取得授權並先遠端建立全新還原點。

**本輪實際觀察／驗收限制**：主介面真正入口 `Web/App/index.html`、程式 `Web/App/app.js`、UI_01 Runtime 元件、真 Chromium 主線最近已於 Pages run 38055341443 在 main 來源 2aaee459 成功，並有 `Web/App/preview/rendered/UI_01.png` 實際畫面；但該證據不是本分支新版本真實截圖。此回合容器 `curl https://github.com` 回報 `Could not resolve host`，GitHub 文字連接器可讀而完整本機 repo／正式大型 PNG／完整瀏覽器重建管道尚未確立。因此截至本 checkpoint，**Scene View 尚未改碼、尚無新組裝截圖；U01-06～09 仍 `[ ]`；首項為 `BLOCKED-VERIFICATION`**。既有 CSS `Web/App/layout_convergence_v1.css` 明確將 UI_01 `.motion-readouts` 隱藏，也隱藏 `.scene-commandbar button`／`.marker-status`；既有 `app.js` 的 `updateScene()`、`setMarker()` 與 `waveform()` 已具部分 Live 能力，日後僅在能力關卡實際過關後復用，勿從零再做。
 
### Scene View 第一階段：2026-10-10 實際能力診斷及最小交付點（未修復、未完成）

- **固定 repo/branch/PR**：`ureia-dev/SOURCERUNE`，`main=e457eba0153d0d6e624cc93cc9c3ddb39f83bd6c`，本工作 `docs/ui01-ui02-ref-comparison-log-20261010`，草稿 PR [#113](https://github.com/ureia-dev/SOURCERUNE/pull/113)，最新基準 `ee110f236bbe2c9dcba9ee0901b07007a1dde8e8`，既有 PR Fast [#38057041831](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38057041831) success；PR 保持 draft / unmerged。重新接手必須再次核對最新 main、PR、CI。
- **已實測執行環境**：`git=/usr/bin/git`、`chromium=/usr/bin/chromium`、`node` 可用，但 `/mnt/data` 沒有 SOURCERUNE 工作樹。環境 `NETWORK=caas_packages_only`、HTTPS/HTTP Proxy 空、DNS `nameserver 168.63.129.16`。 `curl -I -L https://github.com/ureia-dev/SOURCERUNE/archive/refs/heads/main.zip` → `curl: (6) Could not resolve host: github.com`；對 `1.1.1.1` 直連也 ConnectionError。故不是盲猜 ZIP 太大，也不是 GitHub CI 故障，而是當前 container 對外網路權限限制，標示 `EXTERNAL-BLOCKED / CAPABILITY`；**沒有反覆重跑 GitHub Actions、沒有更改 runner/測試次數**。
- **GitHub 讀取可用，但不能冒充已落地**：GitHub connector 可讀 `Web/App/index.html`、`app.js`、CSS、REF 142 筆掃描文件，也可讀先前 `Web/App/preview/rendered/UI_01.png` 真實舊截圖；但這不等於正式大型 PNG、所有 JS/CSS/assets 已完整到容器，也不等於這個分支有新 Chrome 畫面。GitHub REST 的 binary 路徑不能直接變成本機完整 repo；沒有合法可驗證的自動載入渠道時嚴禁用 AI 補圖/假資料替代。
- **第一項確切 UI 工作**：只做 U01-06～09 的 UI_01 上方 Scene（REF 新圖檔 `SCENE_PANEL` approx x337/y57/w969/h268；真 Web 既有 plugin-local center x333/y58/w967、Scene 高 262，header 34、SVG 186、Waveform strip 38）。這兩個來源座標不一致；不得硬算 1:1。此階段只復用 `RT_MOTION_CAR_GLYPH.png`、`RT_SCENE_*_MARKER_*.png`、`RT_DISTANCE_CALLOUT.png`、`RT_SCENE_GRID.png`、`RT_WAVEFORM_STRIP_BG.png`，搭配現有真動態 SVG/Canvas；**不動 ReferenceSheets、DSP、Preset、參數與 Native 聲音**。
- **需優先核查的實作掛點**：`Web/App/index.html` 的 `#sceneSvg`、`#motionPath`、`#motionCarGlyph`、`#sourceNode`、`#listenerNode`、`#distanceLine`、`#distanceCallout`、`#sceneWaveformCanvas`、`#sceneFullscreenBtn`、`.scene-commandbar`、`.motion-readouts`；`Web/App/app.js` 的 `applySceneViewportProfile()`、`updateScene()`、`setMarker()`、`waveform()`、`time()`、`bind()`；`Web/App/layout_convergence_v1.css` 的 UI_01 隱藏命令/讀數規則及 `Web/App/ref_geometry_lock_v11.css` 的 final 尺寸。真 Zoom/Reset、時間/距離軸、車輛跟隨、波形需和 state/transport 即時連動，不能畫不可操作的假控制；開關/縮放不能破壞 geometry audit 或 UI_02。
- **驗收閘**：先恢復合法完整來源與正式素材取檔、檔案 SHA 檢查；在實際入口 `Web/App/index.html?ui=UI_01` 以 Chromium 渲染並取得 **baseline**；進行最小 Scene UI 實作，透過同一真入口產生 **after 截圖**，驗 hitbox/Zoom/Reset/Mode/時間/距離/車輛/波形、未動 UI_02；必要的 Fast 一次成功後，讓使用者看**真元件組裝畫面**並確認，保持草稿 PR 不合併。任何一項證據缺失都留 `PENDING`。
- **截至本紀錄**：能力關卡未通過，故沒有修改任何正式 `Web/App` 程式或 PNG，沒有產生新組裝截圖；**U01-06～09 仍 `[ ]`**。本紀錄是可恢復的根因與工作定位 checkpoint，不是已完成 Scene 子項。

### 2026-10-10｜UI_01 左側四張語意素材卡（U01-04／05）真實組裝候選，等待使用者審核

- **使用者最新階段要求**：在 Scene View／Spectrum 成果後接續第三步「左側四張卡」，沿用唯一草稿 [PR #113](https://github.com/ureia-dev/SOURCERUNE/pull/113) 之 `docs/ui01-ui02-ref-comparison-log-20261010`，**不能合併、不能切新 PR、不能動 DSP／WASM／Factory Preset／ReferenceSheets 的解析度，也不擅自改成 REF 範例的 Car Speaker/Mobile Call/Wooden Door 模型**。
- **正式素材確認**：四張語意照片目前由 `Web/App/app.js` 的 `renderModules()`／`selected(t)`／`assetUrl(art)` 綁定原本獨立的 `Assets/UI/UI_01/<TYPE>/*.png`；外框是 `Assets/UI/Runtime/Common/Shell/RT_CARD_FRAME.png`；四顆圖示是正式 `RT_MODULE_ICON_SOURCE/TRANSMISSION/WALL/SPACE_DEFAULT.png`／hover ACTIVE；箭頭是正式 `RT_IMAGE_ARROW_R_IDLE/HOVER.png`。這輪沒有新增任何 PNG，也沒有借用整張 REF 截圖作介面。
- **實作**：`Web/App/ui01_asset_cards_pr113.css` 與 `Web/App/index.html` 加入 UI_01-only 視覺層：四卡圖示框統一 45×41 px，標題與目前模型名稱實際 browser x=82px 對齊；細調文字亮度、長標題截斷、照片實際裁切時的亮度與對比，不更改真模型 ID。**已存在幾何鎖不得破壞**，經首次 Fast PASS／Chrome geometry 對四卡藝術框 FAIL 後立即診斷並恢復四張照片原確認矩形，不修改既有幾何測試：SOURCE x19/y115/w239/h72、TRANSMISSION x19/y257/w239/h70、WALL x19/y397/w239/h69、SPACE x19/y533/w239/h35；卡片外框四張 313 寬、高 136/132/132/97。EDIT／箭頭原座標亦未改。
- **可中斷 commit**：首版 `1730a7c80bc87db6610adbb5ff79d8b97c026e6f` 只修卡圖與內部；幾何根因確認後修復 `38caf35b751e8cb8dc37a411b47cfd8c243db5ad`；驗收讀數符合原幾何之小型 browser 測試修正 `7a2360d824baebb5d6aecb777b60106bd8cf2baa`。第二步沒有擴大至其他 UI。
- **真實驗證證據**：[PR 分支實際 1499×807 組裝圖](../../../Web/App/preview/rendered/UI_01_PR113.png)、[結構化 Chromium 報告](../../../Web/App/preview/rendered/UI_01_PR113_report.json)。Chrome 預覽 [run 38062286363](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38062286363) PASS，原有 Fast [run 38062286335](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38062286335) PASS。預覽 source `7a2360d824baebb5d6aecb777b60106bd8cf2baa`，PNG SHA256 `acc903fb5b272bb844207e50cae9298e71a9d86e8739178a16df77354d2b5651`；report `geometryOk=true`、四張圖片載入且尺寸有效、全部正式圖示背景 PNG 正確、Card header text x82、45×41 圖示、原鎖定照片矩形；實際按 SOURCE 下一個箭頭後 Semantic img `src` 改變且解碼成功，`cardCycleSmoke.sourceNext=true`。**先取初始狀態截圖，後做互動驗證，不把 next 之後選項充作新預設**。
- **驗收限制**：UI_01 REF 最新原始完整 PNG 未入庫，因此卡片仍僅依掃描 142 點 APPROX 比對；PHOTO 風格是否需換成 REF 原所示 CAR/MOBILE 等模型、原圖是否設計核准、4 種 EDIT 對話視覺與 Native VST3 Host 仍待確認。**U01-04／05 保持原本 `[ ]`，直到使用者明確確認；U01-03 模型預設更不得自行決定。** 下一步按原清單為右側 Meter（U01-11），留待此次四卡實圖使用者審核後再前進。

### 2026-10-10｜使用者紅圈兩區與 Spectrum 下一步：正式 Runtime 組裝候選（未合併）

- **最新要求**：使用者用紅圈指出 ① Scene View 最底部時間／波形條 ② UI_01 底部 MOTION 的 APPROACH／PASS BY／LEAVE 三鍵，判斷 PNG 未正確使用或未製作，要求先修這兩處並繼續下一項。只改 `ureia-dev/SOURCERUNE` 的 PR #113、UI_01；不要停止在這兩項，不修改 `Assets/UI/ReferenceSheets/**`，**DSP changed? NO**。此節取代前面「等待 Scene 核准才做 Spectrum」的停工順序；**PR 仍然 draft，不合併**。
- **A：波形條 PNG**：已有正式 `Assets/UI/Runtime/UI_01/Scene/RT_WAVEFORM_STRIP_BG.png`；舊 UI 把小 raster 直接放大到 ~950px，造成圓角和刻度失真。新增 `Web/App/ui01_asset_frame_fix_pr113.css`，對正式 PNG 做 border-image 九宮格，分開保護邊角，再以低對比顯示格線；原來的真 Canvas／播放時間刻度／seek 游標維持原功能。靜音或沒有 LOAD AUDIO 時**不偽造錄音波形**。
- **B：Motion 三鍵 PNG**：專案原本已有 `Assets/UI/Runtime/Common/Controls/RT_SEGMENT_CAP_IDLE/HOVER/ACTIVE.png`，原按鈕用通用視覺樣式且位置過高。改接三種正式 PNG 狀態，移至 REF 低處（Chromium 真測 y=749、h=36，寬約 76.7／80.6／77.7），仍透過既有 `data-macro-select="motionMode"` 回寫既有狀態，不更改聲音參數含義。A+B 最小修正 commit：`1752f8e37a5f94ebca4488b39777ef605219af1a`；既有 Fast [#38061169413](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38061169413) PASS，真 Chromium [#38061169521](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38061169521) PASS，幾何 PASS。
- **C：UI_01 Spectrum（U01-10）下一步**：在 `Web/App/index.html` 的原 Analysis tabs 加上 PRE／POST／RTA／1/3／L+R，`Web/App/ui01_spectrum_ref_pr113.css` 使用既有正式 SEGMENT CAP PNG，五段總寬約 340px，靠右且未超過 Analysis 967px。  `Web/App/app.js` 新增 Web 可視化限定的控制：PRE/POST 讀現有 `inAn`/ `outAn`，RTA 真的控制可視曲線，1/3 使用 FFT 實際 bin power 的正負 1/6 octave 平均（關閉為 RAW），白色比較曲線是另一個真 analyser 的值；**Mini/Focus EQ 持續固定從原 post analyser 更新，完全不改變音訊訊號路徑**。L+R 是目前合併聲道的靜態、非可按指示標籤，**不假裝已具獨立左右聲道 FFT**。C 功能 commit `9df1d34cc3b7bcb377521f204147bd9c8de3eaf3`，前端 NodeList 綁定修正 commit `c19e8a189be3dd83671e403502608ed14c71ba99`，REF 尺寸修正 commit `a075066d7f49578f6056011df64c71898c355fe9`。
- **最終真證據**：[PR 內更新的 UI_01_PR113.png](../../../Web/App/preview/rendered/UI_01_PR113.png) 與 [UI_01_PR113_report.json](../../../Web/App/preview/rendered/UI_01_PR113_report.json)；截圖來源 `a075066d7f49578f6056011df64c71898c355fe9`，PNG SHA256 `73c37e88525e49521315b055ca622bacee76e94ce14b8cb598cb67e511b3f2a9`；Fast [#38061627853](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38061627853) **PASS**，PR Chromium [#38061627900](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38061627900) **PASS**。報告 `geometryOk=true`、Spectrum 4 個可操作按鍵以真 Chromium 點選切換回預設 POST／RTA ON／1/3 ON、L+R 靜態 label，Scene Zoom/Reset、時間尺及距離避讓仍 PASS。
- **不得誤判**：已驗的是實際組裝、選擇控制、Chrome 及 Node/C++ Fast；尚未載真測試音檔確認 PRE/POST 比較圖、1/3 波形精度、seek／WASM 實際播放 E2E，也未比對 UI_01 正式原 PNG 的 1:1 overlay（正式原圖仍未入 Git），**Native Host UI parity 未做**。原待辦 U01-06～10 保持 `[ ]` 直到使用者外觀核准及要求的端到端驗證；**不合併 PR #113**。下一個優先工作仍是使用者清單中的左四卡及後續 Meter，但先由使用者查看本輪圖片再決定具體場景／預設是否需要改動。

### 2026-10-10｜UI_01 Scene View 亮度 2× 候選（等待使用者看圖，不合併）

- **使用者最新指示**：「繼續，一次做剛剛兩倍亮」。此輪按 **UI_01 Scene View 畫面亮度 2 倍** 實作，只有視覺明暗，沒有延伸至整個 Plugin、UI_02、ReferenceSheets 或 DSP。
- **實際修改**：`Web/App/scene_view_ref_stage1_v1.css` 的 `body.ui-01 .scene-panel{filter:brightness(2)}`，等比例調亮已拼裝 Scene 子樹（背景、格線、動態曲線、文字、時間尺、控制列）；`.github/workflows/ui01-scene-pr113-preview.yml` 在原單次 Chromium 真截圖中增加 computed CSS `brightness(2)` 驗證；沒有調整 geometry／聲音／音訊參數。
- **實作 checkpoint**：`ad3760bc781204367641410aeb4938defd289f9e`；真實新版組裝圖 [UI_01_PR113.png](../../../Web/App/preview/rendered/UI_01_PR113.png)，真實報告 [UI_01_PR113_report.json](../../../Web/App/preview/rendered/UI_01_PR113_report.json)。報告以實作 commit 為 `source`，PNG SHA256 為 `c875486caebafe0aa9e3f579e49cc2b0e45bbfc350aa378703820306af945fba`，與舊暗版的截圖不同。
- **驗收證據**：原有 Fast CI [#38060116480](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38060116480) PASS，PR 真 Chromium [#38060116561](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38060116561) PASS。報告 `geometryOk=true`、`sceneBrightness=brightness(2)`、Scene height 262px、main 1499×807、`visualSmoke.zoomIn/zoomReset/labelNoOverlap=true`、時間刻度 5 格、5 張正式 Runtime 素材 HTTP 200、左 4 張正式圖片解碼成功。
- **邊界**：CSS `brightness(2)` 為顯示像素通道增亮，明部可能截頂；不是實測感知亮度恰好兩倍，也不是改原圖曝光。空音檔狀態的時間尺／seek 音訊 E2E、UI_01 REF 原圖逐像素疊圖與 Native Host 仍待驗。
- **等待使用者視覺核准**：PR #113 必須保持 draft / unmerged；U01-06～09 仍為原有 `[ ]`，本次未開始 Spectrum（U01-10）。若使用者要求再調亮／降低，沿同一工作線小改並真截圖，不得自行合併。

### 2026-10-10 Scene View 第一階段：真實組裝候選已完成，等待使用者檢查（不合併）

- **這是 U01-06～09 的 Web 候選，並非 REF 像素級最終 DONE；原有 U01-06/07/08/09 仍維持 \`[ ]\`，等使用者逐項檢查核准後才更新。** 下一項 Spectrum（U01-10）尚未開始。
- **真實預覽阻塞已解除**：本回合使用 PR #113 專屬獨立 screenshot workflow \`.github/workflows/ui01-scene-pr113-preview.yml\`；GitHub Actions 真正 checkout 同一個 PR 分支，從完整 \`Web/App/index.html?ui=UI_01\` 載入 Runtime PNG 及四張正式 UI01 素材，再以 Chromium 截取 \`.app\`，將照片及報告提交回 PR 分支。工作容器本身仍無 GitHub DNS，**不能宣稱本機可完整取檔**。預覽只供 PR #113，沒有 main 部署與合併，也沒有新增安全／壓力測試次數。
- **正式程式改動範圍**：\`Web/App/index.html\` 新增分層 Distance/Scene 指示、ZOOM/RESET 及 waveform 上的時間尺、游標；\`Web/App/app.js\` 僅接 sceneViewBox、Zoom state、Live Scene 更新與 time UI 更新；\`Web/App/scene_view_ref_stage1.js\` 為 UI01-only 動態 Motion/Distance 曲線、SOURCE 標籤、讀數框避讓、真時間／波形 seek；\`Web/App/scene_view_ref_stage1_v1.css\` 為新視覺規則。其他元件繼續從原 Runtime/semantic paths 載入，未製作或更換圖片，\`Assets/UI/ReferenceSheets\` **沒有修改**。
- **候選最終 SOURCE SHA**：\`1b3bc7140d7c07175283976a2985b5bb3caf7ab1\`（所有程序修正後）；**真 Chrome** [UI_01_PR113.png](../../../Web/App/preview/rendered/UI_01_PR113.png) 及 [UI_01_PR113_report.json](../../../Web/App/preview/rendered/UI_01_PR113_report.json) 已在本工作分支產出；report screenshot SHA256 \`1ea7af325b2746aaaf83d722ca5a8f99cac97cc587a9609693686467644372e1\`。首次基準實拍來自 \`31d50b854792133803f5074ee5b99c69b5981027\`，不可拿基準假稱 after。
- **真驗證**：[UI PR Screenshot Action #38059168605](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38059168605) **PASS**；[原有 Fast #38059168612](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38059168612) **PASS**；視覺 report \`geometryOk=true\`、\`visualSmoke.zoomIn=true\`、\`zoomReset=true\`、\`timeRulerTicks=5\`、\`labelNoOverlap=true\`；正式 Runtime Scene 五種圖均 HTTP 200，有效 semantic art 四張全成功解碼；1499×807 主外框、Scene 262px、SVG 186px 未變。檢查指出最初 SOURCE 名稱會蓋到 callout，已縮短、位移並用真 bbox 消除；另外修復 Zoom 刷新時舊曲線覆蓋真 live 曲線的錯誤，增加前後曲線 \`d\` 一致性的瀏覽器斷言。
- **尚未證明**：因 Web Screenshot 只載入空白播放器，截圖上時間尺顯示 Motion \`0%/25%/50%/75%/100%\`，載入實際音檔時切換分秒與拖曳 seek 的完整端到端還沒用音訊檔實測；REF 原圖 UI01 PNG 缺檔，不能宣稱整個 Scene 完成精確像素疊圖；Native VST3 自訂 UI、DAW/Host 操作、Web 與 Native 統一畫面仍 PENDING。尤其聲音 DSP、WASM、公開 parameter IDs、Factory Preset 完全未修改。
- **使用者驗收門檻**：只請使用者看真組裝圖對比正式 REF，確認目前 Scene View 的車、節點、距離線、Zoom/Reset、時間尺、波形外觀與比例；若要修，**沿 PR #113** 最小修改並再出同一路徑的新真截圖；直到明確核准**不合併、不修改 Spectrum**。完成後才繼續 U01-10。

### 下一步順序與驗收門檻

1. **先修 UI_02 場景美術**（U02-08/09、CROSS-02、ART-SHARED-001）：先核獨立高解析正式素材與場景狀態，建立一張 REF/實際 Web 同場景的局部疊圖；不擅自用 AI 重畫替換核准 REF。
2. **再補 UI_01 Scene/Spectrum 真控制**（U01-06～10）：縮放、時間、波形與分析器先核操作/State，再做像素外觀，不碰 DSP 演算法。
3. **兩套 UI 旋鈕與文字/金屬細節**（U01-18、U02-10/13/19、CROSS-04/05）：對照原有位置、尺寸、指針、刻度、字體基線、不同狀態，保留已 PASS 的主幾何；UI_01 必須先解 CROSS-01 正式 PNG 缺檔才能做真正同來源 pixel overlay。
4. **補底部真正缺少的操作並修溢出**（U01-13～16、U02-18～21、CROSS-03）：逐項 click、drag、wheel、keyboard、Undo/Redo、顯示/遮蔽；涉及 Shuffle/S-M/Ø/∞/速度單位一律先等產品語意核准。
5. **最後才做 1:1 REF 局部疊圖與跨平台驗收**（CROSS-04/05/08/15）：逐區驗位置/材質/字體/開關狀態/Hitbox，保存 Web Preview Chrome report、實際畫面、PR/commit/CI；Native Host 無實測不得宣稱完成。

**本節更新政策**：只登錄最新差異與最小修復順序，無任何 runtime UI/CSS/圖片/參數/Factory Preset/DSP 的修改；未新增或提高測試壓力/次數；不得重算下列既有 `[x]`／`[ ]`，亦不拿舊報告取代修正後的真驗收。

## 基準與不可誤判的事項

- 建立時 `main=2bf84e5ca05306324f995095f0aa26f1d2647e47`，無 open PR；Fast CI #100/#101 成功。**每次新對話仍須重新查 live HEAD/PR/CI**。
- REF 原圖與最新掃描倍率只有 **2.5×**：UI_01 核准無說明圖 1508×808 → 3770×2020（PNG binary 尚未入 Git）；UI_02 1672×941 → 4180×2353（原圖/2.5×/標註三 PNG 已入 Git）。已取消舊 10 倍。
- 基準實際 Chrome 畫面來源：GitHub `Web Preview #76`（run `37806243525`）、`Web/App/preview/rendered/{UI_01,UI_02}.png`、`geometry-report.json` 與 `render-log.txt`；UI_01 51 項幾何、UI_02 41 項幾何 PASS **不等於**細部 REF 外觀/功能/DSP PASS。
- UI_01 142 筆與 UI_02 139 筆掃描資料在 `docs/product/reference/`，UI_02 另有 25 大框、15 組 RGB 邊界。UI_01 新 REF 的 1508×808 與 Web 1499×807 不可直接當同一原點。
- **待核准語意**：SCENE Logo 與產品正式品牌、Shuffle、S/M、Ø、∞、Speed 60% vs km/h、REF 的範例 Preset/模型/數值。須先釐清，不能自行加 DSP 或更改已核准預設。

## 優先順序索引

- **P0 缺真主控**：CROSS-01、U01-10、U01-12～17、U02-01/16/18/20/21/22；待核准語意不自動決定。
- **P1 REF 外觀/圖片**：其他 UI 外觀、CROSS-02 Scene Hero 品質、CROSS-14 新 78 張美術。
- **P2 互動/疊圖實測**：CROSS-03～06/12/15。真 Chrome click/drag/wheel/keyboard、Undo/Redo、1:1 局部疊圖/刻度/焦點。
- **P3 真音效/VST3**：CROSS-07～11/13/15。C++ DSP、WebAssembly/AudioWorklet、真 LUFS、Host/Offline parity。

## 已完成的限定範圍（不表示 UI 全部驗收）

- [x] **BASE-01｜UI_01 大區塊幾何** — Web Preview #76 geometry-report UI_01 PASS／51 checks；非 REF 細節驗收。
- [x] **BASE-02｜UI_02 大區塊幾何** — Web Preview #76 geometry-report UI_02 PASS／41 checks；非 REF 細節驗收。
- [x] **BASE-03｜UI_01 左四卡及底部七區外框** — Web/App/geometry_audit.js 有 rectangles guards，未驗卡內控件。
- [x] **BASE-04｜UI_02 五個底部模組外框** — Web/App/geometry_audit.js 有尺寸/位置 guard。
- [x] **BASE-05｜UI_02 300px Distance/54px Motion 基礎幾何** — Source/UI/UI_02/LayoutSpec.h／Web audit 有 guard，外觀另驗。
- [x] **BASE-06｜UI_02 76px 底部 Knob 幾何** — Source/UI/UI_02/LayoutSpec.h／Web audit 有 guard，材質另驗。
- [x] **BASE-07｜64 個共同 State/參數 ID 已登錄** — ui_controls.json + ParameterIds.h；不代表 DSP 真完成。
- [x] **BASE-08｜UI_02 Speed/Doppler/Width Web Binding 已編寫** — bindMotionKnobs() 支援指標/滾輪/鍵盤，實際 E2E 尚待測。
- [x] **BASE-09｜UI_02 三張正式 REF PNG 已入 GitHub** — UI_02_REF 原圖/2.5×/標註圖，PR #55、Fast CI #100、Action 37811957946。
- [x] **BASE-10｜UI_01 142／UI_02 139 個 2.5× 清冊已保存** — UI_01_REF_CLEAN_SCAN_20261008.json、UI_02_REF_2_5X_DETAILED_COMPONENTS_20261009.json；UI_02 另有 15 組 RGB 邊界。

## UI_01：18 個待辦

- [ ] **U01-01｜頂部 Logo**（P1/待核准）— REF 是 SCENE 字型/金屬圖示，Web 是 SOURCERUNE；先核准正式品牌後再驗證字型、位置、材質，不得直接改產品名。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-02｜頂部按鈕**（P1）— X、小工具按鈕及部分圖示/位置和 REF 未對齊；須逐個驗尺寸、滑鼠操作與圖示/排列。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-03｜Preset 預設顯示**（P1/待核准）— REF 為 Car Pass By - City Street、Web 初始未選；先區分展示例圖與正式開機預設，再驗場景 State。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-04｜四張素材卡所選模型**（P1/待核准）— REF 是 Car Speaker、Mobile Call、Wooden Door、City Street，Web 初始不同；核正式模型 ID/圖片及場景映射，不擅改產品預設。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-05｜四張卡圖示/照片/框架**（P1）— 各卡圖示、照片風格及縮圖裁切、亮度、位置、邊框和 REF 不同；逐張 1:1 校準與獨立素材核對。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-06｜Scene 距離曲線**（P1）— REF 有亮藍時間/距離曲線、X/Y 刻度與節點；Web 不完整；補 Live SVG/Canvas 的曲線、網格、節點及值。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-07｜Scene 汽車/標記/浮動數值**（P1）— REF 有車、時間標記與浮動值，Web 是簡化標記；核對獨立 Live Source/Listener/汽車元件及其 Motion 位置。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-08｜Scene Zoom/RESET/距離小面板**（P1）— REF 有 Zoom、RESET、Start/Closest/End；Web 主畫面未完整；補可見及真操作且與現有 State 共用。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-09｜Waveform 與時間手柄**（P1）— REF 藍色波形、白色時間 marker；Web 簡化；驗真 live 波形、拖曳/seek/時間同步。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-10｜Spectrum Pre/Post/RTA/1/3/L+R**（P0）— REF 有完整分析主控制列，Web 缺等價控件；補真操作/狀態與 Audio Analyzer 綁定，禁止純裝飾。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-11｜Meter/Peak/RMS/LUFS**（P1/P3）— REF 彩色分段/完整 dB/LUFS，Web 簡化；修真外觀並使用 Live Peak/RMS，LUFS 須真標準測量。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [x] **U01-12｜BAD SIGNAL 四勾選**（P0 · WEB 主卡與共享 State 已驗收）— REF Static／Dropout／Interference／Low Bitrate 四項原本只顯示文字，現已修為四個可直接操作的 Checkbox。
  - **實作**：`Web/App/app.js` 以 `data-signal-checkbox` 對應 `noiseStatic`、`dropout`、`interference`、`bitrateArtifacts` 的既有 0–100 數值（關閉＝0、再啟用＝前次正值或 schema 預設）；`Web/App/visual_convergence_v3.css` 僅調整 UI_01 樣式。Advanced／Undo／Redo 直接共用既有 State，未新增 DSP ID；UI_02 仍用原本版面。
  - **正式驗收及證據**：PR [#58](https://github.com/ureia-dev/SOURCERUNE/pull/58) 合併 `9212424b8becf63f95ca1fd714b0de98eb7afd46`，啟動失敗後單選/複選 `$()`/ `$$()` 根因修復 PR [#59](https://github.com/ureia-dev/SOURCERUNE/pull/59) 合併 `d3e52f9a1b90ef15064f907237d6fcd4d4d1d75c`，四項完整 Chrome test PR [#60](https://github.com/ureia-dev/SOURCERUNE/pull/60) 合併 `a9b1ddb19cda51274b3a28d27d9b8175a6b24212`；Fast CI #103／#104／#105 PASS（Deep／Release skipped）。
  - **實際瀏覽器驗證：DONE（2026-10-09）**：GitHub [Web Preview #79](https://github.com/ureia-dev/SOURCERUNE/actions/runs/37818887999)；`Web/App/preview/rendered/geometry-report.json` 的 `results.UI_01.interactionSmoke.U01-12` **ok=true**，四 ID 各自 `toggled=true`、`advancedSynced=true`、`undoRestored=true`、`redoToggled=true`、`backToBaseline=true`，四控制均在原卡可見範圍；`results.UI_01.ok=true`／`results.UI_02.ok=true`，兩 UI failures=[]；`render-log.txt` 為 `render audit completed successfully`。截圖：`Web/App/preview/rendered/UI_01.png`。
  - **完成範圍**：本 ID 僅標示 **UI_01 Web 主介面可直接操作與共用數值/Undo/Redo PASS**。Chrome log 仍有未定位的一筆 404，另由 `CROSS-06` 處理；Native VST3 Host/DSP 仍 PENDING，見 `CROSS-07`／`CROSS-08`／`CROSS-15`；不得延伸宣稱聲音已實作、1:1 美術已全部收斂。
- [ ] **U01-13｜CONDITION 勾選/USED**（P0）— REF Rattle、Wow/Flutter checkbox、USED 比例，Web 簡化；補可直接操作和一套 State/數值。
  - **驗收/進度**：`PARTIAL：UI_01 Web 的 Rattle／Wow-Flutter 兩個勾選已綁定既有 rattle/wowFlutter 0–100 State；關閉 0、重新啟用回復正值或 schema default/step，且 Advanced／Undo／Redo 共用同一路徑；UI_02 仍顯示原數值。功能 commit `9b49b1bc`、CSS `4e6e5155`。Fast CI #108／#109 已通過，PR #63 實作合併 `3e3799d3`、PR #64 初始化 selector 修復合併 `43bfcb6a`；**Web Preview #81（run `37926258273`，Chrome 實際 `geometry-report.json` commit `43bfcb6a`）PASS**：rattle、wowFlutter 都 `visible/toggled/advancedSynced/undoRestored/redoToggled/backToBaseline=true`、UI_01/UI_02 幾何 ok=true。Native／完整聲學 DSP 尚未驗證，**本項保持 PARTIAL 未勾**。`
- [ ] **U01-14｜INTELLIGIBILITY Presence/Dynamic**（P0/待核准）— REF 有兩 checkbox，Web 無；先核實這兩項與現行參數的語意，再接入 State，不能憑圖新造 DSP。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-15｜AMBIENCE S/M、Duck、波形/箭頭**（P0/待核准）— REF 有 S/M、Duck、環境波形、切換箭頭；需核 S/M 真義及所有 Live controls/預覽。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-16｜MIX Wet/Ø**（P0/待核准）— REF 有 Wet 與 Ø 可點控制，Web 只有文字；先核准 Ø 功能再實作，勿擅加相位反轉。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U01-17｜EQ/TONE 彩色曲線/三下拉/On/Power**
  - **2026-10-10 最新小 EQ 底部欄位功能（PR #108 Fast／真 Chromium 已驗收 PASS）**：使用者圖示紅框內要直接顯示選中 Band 的 FREQ/GAIN/Q，滾輪、上下拖曳、Shift 微調、輸入與單次 Undo；HPF/LPF 現有真 DSP 僅有 FREQ，其他欄禁用，不做假 Shelf。小圖不顯示浮框，五點／彩色／±24dB 既有功能保留。正式參考 chen2622113/VVChain main `5767e459` 的 Analyzer cubic path 移到 SOURCERUNE 視覺檔，仍只使用舊 FFT。**新聲音目標 7 個 HPF slope 檔與 HPF High Shelf／LPF Low Shelf 尚未通過特定 DSP 批准與全新還原點，嚴禁改音訊**，保持 [ ]／PARTIAL；**真實驗收已 PASS**：本次 [PR #108](https://github.com/ureia-dev/SOURCERUNE/pull/108) 合併 `42463c4e9db566abaff077e2b2ecdafc49cce35f`；Fast CI [#38052597424](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38052597424) PASS（含 DSP Guard），Web Preview [#38052639610](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38052639610) PASS，遠端 `Web/App/preview/rendered/geometry-report.json` 來源與合併 SHA 相同，UI_01/UI_02 `geometry.ok=true`、`knobSmoke.eqInline.ok=true`、`eqMouse.ok=true`、`eqFocus.ok=true`。現場：GAIN 滾輪 +0→+0.1dB、上下拖曳 +0→+1.4dB、鍵入 1700Hz，逐一 Undo；HPF/LPF 選點時僅 FREQ 有效，Gain/Q Disabled、小圖沒有浮框，兩種卡片內數值列不溢出。原 VVChain Spectrum cubic 繪圖檢查 PASS。 `render-log.txt` 末尾 `render audit completed successfully`，已有不阻塞的 localhost 首次連線及 404 警示，需獨立處理。
  - **五項更正／Web 子項已實際驗收；2026-10-10 最終黑塊與配色防回歸通過**：**2026-10-10 目前最新用戶 EQ 五項更正（在 UI 產品契約中取代歷史小框／滑桿規則）**：節點旁/焦點不准出現黑色方塊；小 EQ 點選/拖曳/滾輪完全不顯示數值浮動資訊框，只有 Zoom In Focus 大 EQ 使用 Freq/Gain/Q 浮框；HPF 原獨立 slider 移除，HPF 與 LPF 直接作為小頻譜五個實際可拖曳點的兩端，另有 Band1–3 三點；配色採 VVChain 式分明 HPF 綠/B1 紅/B2 黃/B3 藍/LPF 粉的鮮明但不刺眼色彩；頻譜**只參考 private chen2622113/VVChain 的 UI 呈現**，對數頻率、功率平均、7-tap 空間平滑、快升慢降，並使用 SOURCERUNE 既有 post-DSP AnalyserNode 一次 FFT 讀數（不創第二 FFT／音訊節點、不變聲音）；真 EQ 曲線及 ±24dB 顯示不變。僅 Web UI_01/02；Native VST3 自訂視窗與 Host 驗收 PENDING。**DSP changed NO**。當輪工作分支 fix/eq-spectrum-node-ux-vvchain-reference-20261010，已修改 Web/App/eq_interactions.js、eq_analyzer_v1.js、eq_graph.js、app.js、eq_polish_v1.css、Tests/Web/knob_smoke.cjs；**PR #107／#108 已合併；Fast #38052597424 與 Web Preview #38052639610 的 UI_01／UI_02 五點與 EQ 頻譜真 Chromium 檢查已 PASS。** **最終 PR #110/#111：Fast [#38055156677](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38055156677) PASS，真 [Web Preview #38055341443](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38055341443) 來源 `2aaee459`，UI_01／UI_02 `eqMouse.noOpaqueNodeFocus=true`、五色 CSS 精確、`eqInline`／`eqFocus`／`geometry` 全通過；DSP 未改，音訊斜率與 Shelf 仍需另外授權。**
  - **最新覆蓋 2026-10-10：固定 ±24 dB，精品比例點線，11 個真 Web 控制**：舊固定 ±12／放大規劃文字均為歷史，**不得恢復**。PR #104 合併 `22674d4c`，Fast #38047626674 成功，真 [Web Preview #38047739428](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38047739428) UI_01/02 `eqMouse`／`eqFocus`／`geometry` 全過；精確量到小圓點 4.4–4.5px、大圓點 6.9px，透明命中 18/22px；固定 ±24 dB（非實際 Gain 範圍變更），細線漸層／低對比網格／真 EQ response、11 個既有狀態綁定旋鈕、原 VVChain 式拖曳／滾輪／Undo 已驗。**最終兩次修正真 Chrome 已完成 PASS**：PR [#105](https://github.com/ureia-dev/SOURCERUNE/pull/105) 合併 `c2a03a1f8f7ec2d8def4d2351d9589b1d3fef6fb`，Fast #38048132628 PASS；[Web Preview #38048168497](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38048168497) `geometry-report.json` source `c2a03a1f`，UI_01、UI_02 `geometry.ok`、`knobSmoke.eq.ok`、`eqMouse.ok`、`eqFocus.ok` 均 true，特別 `eqFocus.accessibleSliders=true`、`keyboardPopup=true`。兩版 11 個控制均有 ARIA slider min/max/value/text、鍵盤 Q 調整 Undo 正常、Enter 進入數值編輯；render log 結尾 `render audit completed successfully`，網站部署成功。既存非阻塞 localhost 初次 curl failed 和一筆 404 仍另案。**DSP changed NO；Native EQ 圖形 Host 尚 PENDING**。DSP/74 Factory 一律 unchanged；Native 自訂 Editor/Host 仍 PENDING，此 ID 保持 [ ]。
  - **2026-10-10 右下 EQ Zoom In Web 子項 DONE／整體仍 PARTIAL**：PR [#102](https://github.com/ureia-dev/SOURCERUNE/pull/102) 合併 `dacad916`，Web/App/eq_focus.js + eq_focus_v1.css，原 mini EQ 標題新 Zoom In；於 Plugin 內置 900×500 logical 浮出可拖曳的大 EQ 視窗、Zoom Out/X/Esc，真 **同一張有事件的 SVG 搬移** 到大圖、mini 留 inert 視覺預覽；B1–3、HPF/LPF、數值小框、Q wheel、Undo/Redo 共享 state/DSP，固定 ±12dB，不重啟 FFT/DSP。Fast [#38037200663](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38037200663) PASS (DSP-guard)，真 [Web Preview #38037254808](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38037254808) report `commit=dacad916` UI01/UI02 `geometry.ok`、`knobSmoke.eqFocus.ok` 全 true，量測大圖、五節點、mini inert、B2 Gain 0→1.6dB、Q wheel 1→0.90、Undo/Redo、點讀數框、Esc/ZoomOut/X、縮放/重開/焦點與曲線同步 PASS；原 DSP/74 Preset unchanged，未發生需備份的 DSP 改動。Native 自訂 UI 未做、Host 與 REF 像素/Preset 最終計量仍待驗，所以 **整體保留 [ ]**。
  - **2026-10-10 固定顯示尺度／Zoom In 新規**：使用者取消先前 ±6/±12/±18 dB 自動切換，**固定 ±12dB 顯示**（只改曲線圖形，EQ Gain/DSP 不限於 ±12）。Web `Web/App/eq_graph.js` 與原有 Browser smoke 新斷言同輪修改；完整驗收依當次 PR/Pages 真報告。右下 EQ 現有小窗維持原位／操作，**Zoom In 按鈕及 900×500 內部浮動大視窗目前只有規劃，尚未實作**；大視窗共用同一 state/C++ EQ、五節點、數值小框及 Undo，不新增 CPU 處理、第二套聲音，也不改 REF 原卡。唯一細則 `docs/product/UI_FUNCTION_CONTRACT.md` 的 EQ Zoom In / Focus editor。Native 自訂 GUI 仍未完成，本 ID 仍 [ ]／PARTIAL。
  - **2026-10-10 本輪 Web EQ 滑鼠互動子項 DONE／整體仍 PARTIAL**：使用者核准只參考 VVChain EQ 的操作/手感，不複製 DSP。PR #92/#94–#97 合併；[真 Chromium Web Preview #38034895001](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38034895001) report commit `f08ed004`：UI01／UI02 `knobSmoke.eqMouse.ok=true`，實測五節點、Bell hover 小型 Freq/Gain/Q 浮框、HPF/LPF Freq-only、節點滾輪 Q 1→0.90（上滾下降，照 VVChain）、數值上下拖 Gain 0→1.2 dB、popup wheel +0.1 dB、直接鍵入 1700Hz→1.7 kHz、雙擊 Bell 只歸零 Gain 保留 Freq/Q、游標離開自動隱藏、不開 Advanced；來源 `Web/App/eq_interactions.js`／`eq_interactions_v1.css`；Fast、UI geometry 真驗收 PASS。DSP/74 Factory、既有核准 REF 主卡尺寸不變；Native 自訂 GUI 尚不存在（只有 generic VST3 host parameters），Native 滑鼠 parity、整體 REF/FinalTone/CPU/Host 保持 PENDING，該 ID 不勾完成。
  - **2026-10-10 最新覆蓋規格：Band 1–3，不再是舊 4-band**。PR #86–#89 與真 Web Preview #38032900735 已驗 UI_01／UI_02 五節點 HPF、LPF、Band1、Band2、Band3 的實際拖曳、Advanced 同步與 Undo；共享 C++ LPF+3 Bell/舊 HPF 存在且 Fast 原生編譯及基本音訊 smoke PASS，eq3.wasm 編譯載入 PASS。公開 b4 IDs 保留 reserved 但不執行；74 Factory Presets 不變。Final Tone、Native 23 Host ID 在 Win/macOS 載入、最終 signal flow、CPU profiling 與像素級 REF 對位仍未驗，保持 [ ]／PARTIAL。（P0）— REF 有 HPF/LPF/Tone 選擇、節點、On/Power；須按現有 4-band 做真可調/Undo/Bypass，不憑圖增加 Band。
  - **驗收/進度**：`PARTIAL：UI_01 主卡 ON/OFF 已改為按鈕，可直接切換既有 EQ_TONE bypass、Advanced 及 Undo/Redo；UI_02 原標籤不變。實作 commit `7e28b217`、CSS `4e6e5155`。PR #63 合併 `3e3799d3`／#64 修復 `43bfcb6a`；Fast #108/#109 PASS，**Web Preview #81 Chrome `U01-17-POWER.ok=true`**：Power 切換、Advanced bypass、Undo、Redo、基準恢復皆通過。**HPF/LPF/TONE 主卡選單、曲線/節點、Native 仍 PENDING；本項保持 PARTIAL 未勾**。`
  - **HPF 獨立子項 DONE（2026-10-10）／整體仍 PARTIAL**：PR #81（`3f627bd8`）加入 UI_01 右下 EQ 主卡真 HPF 20–1000 Hz 橫向 slider、即時曲線、鍵盤／滾輪／Undo／Redo／Advanced 同步、EQ Power，並以同一份 C++ stereo Butterworth 12 dB/oct 程式接 Web 音訊真處理；PR #82（`1a0d1b6d`）修正 Chrome 隱藏 Undo 工具列測試方式。**真 Chrome [Web Preview #38031171637](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38031171637)**：UI01 geometry/knobSmoke/hpf 都 PASS、HPF 20→21、Undo/Redo、頻率曲線已驗；48 kHz actual OfflineAudioContext 40 Hz RMS OFF=0.17677669／240Hz ON=0.00490798，證實真正 WASM audio filtering；音訊路徑目前在 scene MVP 後端（最終 TONE→MIX 排序仍待完成）。LPF、4-band 的 Freq/Gain/Q、Tone、完整 REF 下拉／節點及 Native VST3 Host 新版驗收仍 PENDING，U01-17 不可勾 [x]。
- [ ] **U01-18｜底部七區材質/字型/刻度/間距**（P1）— 七卡旋鈕、金屬材質、對比、留白、刻度與 REF 不同；逐區 1:1 REF/實際 Web 重疊驗證。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
  - **2026-10-10 旋鈕／動態數值限定驗收**：PR #78 `9393bc32`、#79 `73964644` 合併；Web Preview [#38026732851](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38026732851) report commit `73964644`，UI01/UI02 geometry+knobSmoke+knobValues 均 true，檔案 `Web/App/knob_value_ref_alignment_v1.css`。UI01 Speed/Doppler/Width 各43px、一般68px、MIX82px，標籤在上／數字在下，八顆無文字裁切。UI02 Motion 54px、底部四顆76px，Bad Signal/Intelligibility 數值在右、Mix 下方，Condition 保留 Used 選單；內容仍使用真 live state，沒有照搬 REF 例圖預設數值。UI02 正式核准 1672×941 RGB REF SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff` 已核實；UI01 正式 1508×808 binary 仍未入庫，只依 142 點掃描 APPROX。**這次僅尺寸／值位置／操作驗收，未做每像素材質／字型疊圖與 Native editor；本項保持 [ ]／PARTIAL。**

## UI_02：22 個待辦

- [ ] **U02-01｜Topbar Shuffle**（P0/待核准）— REF 有交叉箭頭，Web 無獨立 Shuffle 控制；待核准 Shuffle/Seed/Scene/Undo 語意，不能自行加入功能。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-02｜Topbar Folder/A-B 排列**（P1）— Folder 位於 A/B 後，Web 圖示造型/排列不同；須保持已驗 Topbar 大框並校內部排列。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-03｜Preset 初始場景**（P1/待核准）— REF Car Pass By - City Street，Web 初始空白；釐清是否展示預設並驗載入 SCN037 真場景。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-04｜Input/Output Meter**（P1）— REF 亮藍橫向 Meter/刻度，Web 簡化；保留 440×62 幾何，補 Live 色段/值/標尺。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-05｜SOURCE 汽車圖片**（P1/待核准）— REF Car Speaker 車照，Web Smartphone Speakerphone；須按正式模型/SCN037 State 選圖。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-06｜TRANSMISSION Mobile Call**（P1/待核准）— REF Mobile Call，Web GSM Stable；確認例圖與正式預設後校模型/選單/照片。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-07｜WALL/COVER 玻璃場景圖片**（P1）— REF 玻璃室內圖、Web 其他場景；需正確獨立素材與照片裁切、框架驗證。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-08｜Scene 背景濕地夜景/車/人物**（P1/素材）— REF 細緻夜景、Web 模糊日間 Scene；需獨立高品質背景美術與角色層，非整張 REF 裁圖。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-09｜Source/Listener 前景**（P1）— REF 有真汽車/人物；Web 小圖示/文字；需可獨立移動人物、車輛及遮擋、深度位置。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-10｜Distance 300px 外圈/刻度/∞**（P1/待核准）— 300px 大框已有；缺 ∞、0.2/1/5/20/100 刻度及材質；先核 ∞ 語意再驗 Live 指針。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-11｜Distance 25.0m vs 3.0m**（P1/待核准）— REF 25.0m、Web 3.0m；應用相同 Scene/Time/Motion 重現狀態，不直接改全域預設。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-12｜Motion 路徑/汽車/點位**（P1）— REF 白色軌跡/汽車定位，Web 簡化；需 Live Scene SVG 跟 Motion/Transport 走。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-13｜三顆小旋鈕 Speed/Doppler/Width**（P1/P2）— Web drag/wheel/key binding 已寫，但 54px 指針、材質、字體與 REF 不同；驗真 pointer 值/Undo。
  - **驗收/進度**：`PARTIAL`（2026-10-10）。UI_02 真 Chromium [Web Preview #38025720819](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38025720819) 在正式場景區以滑鼠拖曳／滾輪／鍵盤驗收 Speed 60→84→83→84→Undo 60、Doppler 70→94→93→94→70、Width 40→64→63→64→40；三顆皆綁正式 RT_KNOB_S_BASE.png，沒有誤開 Advanced，Fast PR #76 PASS。此為 Web 功能驗收；54px 指針、REF 材質/字體與 Native UI 尚未全部比對，保持 [ ]。
  - **2026-10-10 旋鈕／動態數值限定驗收**：PR #78 `9393bc32`、#79 `73964644` 合併；Web Preview [#38026732851](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38026732851) report commit `73964644`，UI01/UI02 geometry+knobSmoke+knobValues 均 true，檔案 `Web/App/knob_value_ref_alignment_v1.css`。UI01 Speed/Doppler/Width 各43px、一般68px、MIX82px，標籤在上／數字在下，八顆無文字裁切。UI02 Motion 54px、底部四顆76px，Bad Signal/Intelligibility 數值在右、Mix 下方，Condition 保留 Used 選單；內容仍使用真 live state，沒有照搬 REF 例圖預設數值。UI02 正式核准 1672×941 RGB REF SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff` 已核實；UI01 正式 1508×808 binary 仍未入庫，只依 142 點掃描 APPROX。**這次僅尺寸／值位置／操作驗收，未做每像素材質／字型疊圖與 Native editor；本項保持 [ ]／PARTIAL。**
- [ ] **U02-14｜Speed 60% vs 60 km/h**（P1/待核准）— REF 百分比、Web 公里時速；須先確認產品單位，不可改掉物理速度。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-15｜SPACE/ENVIRONMENT 下拉與夜景**（P1）— REF City Street 夜景，Web Busy City Street/圖框不同；校 selector、State、獨立素材。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-16｜AMBIENCE Traffic 獨立圖/綁定**（P0）— REF 獨立夜間 Traffic，Web 重複 Environment 圖；應用真正 ambience 素材、Duck/Level/Selector 綁定。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-17｜AMBIENCE 70% vs 35%**（P1/待核准）— REF 範例 70%、Web 35%；依 Scene/State 核對，不擅改預設。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-18｜BAD SIGNAL 波形預覽/Mobile 下拉**（P0）— REF 有獨立 waveform 與 Mobile selector，Web 簡化小字；需要真操作/動態波形。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-19｜CONDITION 金屬旋鈕/USED**（P1）— REF 大金屬 Knob/USED，Web 材質/比例不同；保持既有 76px 幾何並核真操作。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
  - **2026-10-10 旋鈕／動態數值限定驗收**：PR #78 `9393bc32`、#79 `73964644` 合併；Web Preview [#38026732851](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38026732851) report commit `73964644`，UI01/UI02 geometry+knobSmoke+knobValues 均 true，檔案 `Web/App/knob_value_ref_alignment_v1.css`。UI01 Speed/Doppler/Width 各43px、一般68px、MIX82px，標籤在上／數字在下，八顆無文字裁切。UI02 Motion 54px、底部四顆76px，Bad Signal/Intelligibility 數值在右、Mix 下方，Condition 保留 Used 選單；內容仍使用真 live state，沒有照搬 REF 例圖預設數值。UI02 正式核准 1672×941 RGB REF SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff` 已核實；UI01 正式 1508×808 binary 仍未入庫，只依 142 點掃描 APPROX。**這次僅尺寸／值位置／操作驗收，未做每像素材質／字型疊圖與 Native editor；本項保持 [ ]／PARTIAL。**
- [ ] **U02-20｜INTELLIGIBILITY 數值/底部溢出**（P0）— REF 75% 且主旋鈕在框內，Web 70% 和模式鈕可能溢出；先測可見/遮蔽/互動，數值先核 Scene。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
  - **2026-10-10 旋鈕／動態數值限定驗收**：PR #78 `9393bc32`、#79 `73964644` 合併；Web Preview [#38026732851](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38026732851) report commit `73964644`，UI01/UI02 geometry+knobSmoke+knobValues 均 true，檔案 `Web/App/knob_value_ref_alignment_v1.css`。UI01 Speed/Doppler/Width 各43px、一般68px、MIX82px，標籤在上／數字在下，八顆無文字裁切。UI02 Motion 54px、底部四顆76px，Bad Signal/Intelligibility 數值在右、Mix 下方，Condition 保留 Used 選單；內容仍使用真 live state，沒有照搬 REF 例圖預設數值。UI02 正式核准 1672×941 RGB REF SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff` 已核實；UI01 正式 1508×808 binary 仍未入庫，只依 142 點掃描 APPROX。**這次僅尺寸／值位置／操作驗收，未做每像素材質／字型疊圖與 Native editor；本項保持 [ ]／PARTIAL。**
- [ ] **U02-21｜MIX Wet 下拉/箭頭**（P0/待核准）— REF 有 Wet 下拉、右箭頭，Web 缺同等可操作控件；先核真 Mix 語意，再做 State+Undo。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **U02-22｜EQ/TONE Natural/曲線/On-Power**
  - **2026-10-10 最新小 EQ 底部欄位功能（PR #108 Fast／真 Chromium 已驗收 PASS）**：使用者圖示紅框內要直接顯示選中 Band 的 FREQ/GAIN/Q，滾輪、上下拖曳、Shift 微調、輸入與單次 Undo；HPF/LPF 現有真 DSP 僅有 FREQ，其他欄禁用，不做假 Shelf。小圖不顯示浮框，五點／彩色／±24dB 既有功能保留。正式參考 chen2622113/VVChain main `5767e459` 的 Analyzer cubic path 移到 SOURCERUNE 視覺檔，仍只使用舊 FFT。**新聲音目標 7 個 HPF slope 檔與 HPF High Shelf／LPF Low Shelf 尚未通過特定 DSP 批准與全新還原點，嚴禁改音訊**，保持 [ ]／PARTIAL；**真實驗收已 PASS**：本次 [PR #108](https://github.com/ureia-dev/SOURCERUNE/pull/108) 合併 `42463c4e9db566abaff077e2b2ecdafc49cce35f`；Fast CI [#38052597424](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38052597424) PASS（含 DSP Guard），Web Preview [#38052639610](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38052639610) PASS，遠端 `Web/App/preview/rendered/geometry-report.json` 來源與合併 SHA 相同，UI_01/UI_02 `geometry.ok=true`、`knobSmoke.eqInline.ok=true`、`eqMouse.ok=true`、`eqFocus.ok=true`。現場：GAIN 滾輪 +0→+0.1dB、上下拖曳 +0→+1.4dB、鍵入 1700Hz，逐一 Undo；HPF/LPF 選點時僅 FREQ 有效，Gain/Q Disabled、小圖沒有浮框，兩種卡片內數值列不溢出。原 VVChain Spectrum cubic 繪圖檢查 PASS。 `render-log.txt` 末尾 `render audit completed successfully`，已有不阻塞的 localhost 首次連線及 404 警示，需獨立處理。
  - **五項更正／Web 子項已實際驗收；2026-10-10 最終黑塊與配色防回歸通過**：**2026-10-10 目前最新用戶 EQ 五項更正（在 UI 產品契約中取代歷史小框／滑桿規則）**：節點旁/焦點不准出現黑色方塊；小 EQ 點選/拖曳/滾輪完全不顯示數值浮動資訊框，只有 Zoom In Focus 大 EQ 使用 Freq/Gain/Q 浮框；HPF 原獨立 slider 移除，HPF 與 LPF 直接作為小頻譜五個實際可拖曳點的兩端，另有 Band1–3 三點；配色採 VVChain 式分明 HPF 綠/B1 紅/B2 黃/B3 藍/LPF 粉的鮮明但不刺眼色彩；頻譜**只參考 private chen2622113/VVChain 的 UI 呈現**，對數頻率、功率平均、7-tap 空間平滑、快升慢降，並使用 SOURCERUNE 既有 post-DSP AnalyserNode 一次 FFT 讀數（不創第二 FFT／音訊節點、不變聲音）；真 EQ 曲線及 ±24dB 顯示不變。僅 Web UI_01/02；Native VST3 自訂視窗與 Host 驗收 PENDING。**DSP changed NO**。當輪工作分支 fix/eq-spectrum-node-ux-vvchain-reference-20261010，已修改 Web/App/eq_interactions.js、eq_analyzer_v1.js、eq_graph.js、app.js、eq_polish_v1.css、Tests/Web/knob_smoke.cjs；**PR #107／#108 已合併；Fast #38052597424 與 Web Preview #38052639610 的 UI_01／UI_02 五點與 EQ 頻譜真 Chromium 檢查已 PASS。** **最終 PR #110/#111：Fast [#38055156677](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38055156677) PASS，真 [Web Preview #38055341443](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38055341443) 來源 `2aaee459`，UI_01／UI_02 `eqMouse.noOpaqueNodeFocus=true`、五色 CSS 精確、`eqInline`／`eqFocus`／`geometry` 全通過；DSP 未改，音訊斜率與 Shelf 仍需另外授權。**
  - **最新覆蓋 2026-10-10：固定 ±24 dB，精品比例點線，11 個真 Web 控制**：舊固定 ±12／放大規劃文字均為歷史，**不得恢復**。PR #104 合併 `22674d4c`，Fast #38047626674 成功，真 [Web Preview #38047739428](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38047739428) UI_01/02 `eqMouse`／`eqFocus`／`geometry` 全過；精確量到小圓點 4.4–4.5px、大圓點 6.9px，透明命中 18/22px；固定 ±24 dB（非實際 Gain 範圍變更），細線漸層／低對比網格／真 EQ response、11 個既有狀態綁定旋鈕、原 VVChain 式拖曳／滾輪／Undo 已驗。**最終兩次修正真 Chrome 已完成 PASS**：PR [#105](https://github.com/ureia-dev/SOURCERUNE/pull/105) 合併 `c2a03a1f8f7ec2d8def4d2351d9589b1d3fef6fb`，Fast #38048132628 PASS；[Web Preview #38048168497](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38048168497) `geometry-report.json` source `c2a03a1f`，UI_01、UI_02 `geometry.ok`、`knobSmoke.eq.ok`、`eqMouse.ok`、`eqFocus.ok` 均 true，特別 `eqFocus.accessibleSliders=true`、`keyboardPopup=true`。兩版 11 個控制均有 ARIA slider min/max/value/text、鍵盤 Q 調整 Undo 正常、Enter 進入數值編輯；render log 結尾 `render audit completed successfully`，網站部署成功。既存非阻塞 localhost 初次 curl failed 和一筆 404 仍另案。**DSP changed NO；Native EQ 圖形 Host 尚 PENDING**。DSP/74 Factory 一律 unchanged；Native 自訂 Editor/Host 仍 PENDING，此 ID 保持 [ ]。
  - **2026-10-10 右下 EQ Zoom In Web 子項 DONE／整體仍 PARTIAL**：PR [#102](https://github.com/ureia-dev/SOURCERUNE/pull/102) 合併 `dacad916`，Web/App/eq_focus.js + eq_focus_v1.css，原 mini EQ 標題新 Zoom In；於 Plugin 內置 900×500 logical 浮出可拖曳的大 EQ 視窗、Zoom Out/X/Esc，真 **同一張有事件的 SVG 搬移** 到大圖、mini 留 inert 視覺預覽；B1–3、HPF/LPF、數值小框、Q wheel、Undo/Redo 共享 state/DSP，固定 ±12dB，不重啟 FFT/DSP。Fast [#38037200663](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38037200663) PASS (DSP-guard)，真 [Web Preview #38037254808](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38037254808) report `commit=dacad916` UI01/UI02 `geometry.ok`、`knobSmoke.eqFocus.ok` 全 true，量測大圖、五節點、mini inert、B2 Gain 0→1.6dB、Q wheel 1→0.90、Undo/Redo、點讀數框、Esc/ZoomOut/X、縮放/重開/焦點與曲線同步 PASS；原 DSP/74 Preset unchanged，未發生需備份的 DSP 改動。Native 自訂 UI 未做、Host 與 REF 像素/Preset 最終計量仍待驗，所以 **整體保留 [ ]**。
  - **2026-10-10 固定顯示尺度／Zoom In 新規**：使用者取消先前 ±6/±12/±18 dB 自動切換，**固定 ±12dB 顯示**（只改曲線圖形，EQ Gain/DSP 不限於 ±12）。Web `Web/App/eq_graph.js` 與原有 Browser smoke 新斷言同輪修改；完整驗收依當次 PR/Pages 真報告。右下 EQ 現有小窗維持原位／操作，**Zoom In 按鈕及 900×500 內部浮動大視窗目前只有規劃，尚未實作**；大視窗共用同一 state/C++ EQ、五節點、數值小框及 Undo，不新增 CPU 處理、第二套聲音，也不改 REF 原卡。唯一細則 `docs/product/UI_FUNCTION_CONTRACT.md` 的 EQ Zoom In / Focus editor。Native 自訂 GUI 仍未完成，本 ID 仍 [ ]／PARTIAL。
  - **2026-10-10 本輪 Web EQ 滑鼠互動子項 DONE／整體仍 PARTIAL**：使用者核准只參考 VVChain EQ 的操作/手感，不複製 DSP。PR #92/#94–#97 合併；[真 Chromium Web Preview #38034895001](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38034895001) report commit `f08ed004`：UI01／UI02 `knobSmoke.eqMouse.ok=true`，實測五節點、Bell hover 小型 Freq/Gain/Q 浮框、HPF/LPF Freq-only、節點滾輪 Q 1→0.90（上滾下降，照 VVChain）、數值上下拖 Gain 0→1.2 dB、popup wheel +0.1 dB、直接鍵入 1700Hz→1.7 kHz、雙擊 Bell 只歸零 Gain 保留 Freq/Q、游標離開自動隱藏、不開 Advanced；來源 `Web/App/eq_interactions.js`／`eq_interactions_v1.css`；Fast、UI geometry 真驗收 PASS。DSP/74 Factory、既有核准 REF 主卡尺寸不變；Native 自訂 GUI 尚不存在（只有 generic VST3 host parameters），Native 滑鼠 parity、整體 REF/FinalTone/CPU/Host 保持 PENDING，該 ID 不勾完成。
  - **2026-10-10 最新覆蓋規格：Band 1–3，不再是舊 4-band**。PR #86–#89 與真 Web Preview #38032900735 已驗 UI_01／UI_02 五節點 HPF、LPF、Band1、Band2、Band3 的實際拖曳、Advanced 同步與 Undo；共享 C++ LPF+3 Bell/舊 HPF 存在且 Fast 原生編譯及基本音訊 smoke PASS，eq3.wasm 編譯載入 PASS。公開 b4 IDs 保留 reserved 但不執行；74 Factory Presets 不變。Final Tone、Native 23 Host ID 在 Win/macOS 載入、最終 signal flow、CPU profiling 與像素級 REF 對位仍未驗，保持 [ ]／PARTIAL。（P0）— REF 細緻 EQ 曲線與 Natural 下拉、On/Power；Web 簡化；需真 4-band/HPF/LPF/Tone/Bypass。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。

## 共用圖片品質／操作／DSP／VST3：15 個待辦

  - **HPF 獨立子項 DONE（2026-10-10）／整體仍 PARTIAL**：與 UI_01 共用同一 `hpf` public ID #42、EQ_TONE bypass、Web AudioWorklet 真 C++ WASM 高通；右下 EQ 20–1000 Hz slider／即時視覺、可按 EQ Power、Advanced、Undo/Redo。真 Chrome [Web Preview #38031171637](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38031171637) UI02 geometry/knobSmoke.hpf.ok=true，WASM cutoff240Hz 40 Hz 相對4kHz 約衰減31.12dB，OFF bit exact。Native 新 13 Host ID（42 HPF／1102 EQ bypass）**已接源碼但尚無新包實機 Host 驗收**；UI02 REF Natural 選單、LPF/4band/Tone、完整曲線／節點位置及音訊最後順序未完成，此整體 ID 保持 [ ]。
- [ ] **CROSS-01｜UI_01 正式兩張 PNG 真入 GitHub**（P0）— 1508×808 RGBA 原圖與 3770×2020 2.5× PNG 只在工作檔案，repo 目前只有 README；必須實際提交二進位、原 SHA256 96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916 與 2.5× SHA256 f67c59046f2c1f90379837f1898a63a98e9abbf3d0e57a82945f4e5b2afb773e 都驗證。
  - **驗收/進度**：`BLOCKED — TRANSFER ONLY`（2026-10-09）：本回合 container 核實 `/mnt/data/SOURCERUNE_UI01_REF_ORIGINAL_1508x808.png` 2,084,284 bytes，SHA-256 `96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916`；2.5× PNG 2,044,051 bytes，SHA-256 `f67c59046f2c1f90379837f1898a63a98e9abbf3d0e57a82945f4e5b2afb773e`。**原圖都在、未上 Git**；GitHub connector 只接受 text/base64 payload、不接受本機檔案路徑，container DNS 無法解析 github.com，故本回合不可實際推送 bytes。禁止重畫或以文檔冒充 PNG 已存。可恢復：取得授權 binary 傳輸管道→commit 兩檔→驗原 SHA→勾本項。
- [ ] **CROSS-02｜SCN037 Scene Hero 512×256 問題**（P1/素材）— 部署圖含烘焙文字且尺寸比 Scene 顯示小，與核准夜景 REF 不符；需真正高解析獨立美術/前景。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-03｜主介面全部操作 E2E**（P2）— 兩套 UI 真 click、drag、wheel、keyboard、開關、Undo/Redo、數值/Focus/Bypass；不可只憑 Geometry PASS 打勾。
  - **驗收/進度**：`PARTIAL`（2026-10-10，已取代較早的單一 Bad Signal 驗收）。PR #75／merge `4bf937dd` 真修正 UI_01／UI_02 底部旋鈕透明操作區被通用 CSS 改為 relative 的問題，改成與正式 PNG face 重合，不再拖曳時誤開 Advanced；真正 Advanced dialog 離開 scale/overflow 的 .app，點遮罩、Esc、CLOSE 可關閉，依控制項有 470px／750px／940px 寬度。PR #76／merge `dca77fe8` 補 UI_02 3 顆場景小旋鈕 pointer/wheel/key。**真 Chromium [Web Preview #38025720819](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38025720819)** 的 `geometry-report.json` 來源 `dca77fe8`：UI_01 8 顆、UI_02 4 顆底部圓形、UI_02 場景 3 顆均以真滑鼠調數值、Undo 正常、不誤開 Advanced；兩 UI dialog outsideDismiss/escapeDismiss=true、small/medium/large 470/750/940px、UI_02 Ambience 橫向滑桿仍正常，兩 UI geometry.ok=true、knobSmoke.ok=true，render-log `render audit completed successfully`。正式 PNG 載入已測。此非全部卡片/按鈕/預覽/Native custom editor E2E；Native DSP 覆蓋亦未完成，故本 ID 保留 [ ]。
- [ ] **CROSS-04｜UI_01 1508×808 ↔ 1499×807 註冊**（P2）— 兩套座標原點不同；需錨點對齊、局部 overlay、誤差及細字 baseline/刻度實測。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-05｜UI_02 REF 1:1 細節疊圖**（P2）— 25 大框/139 候選仍多 APPROX；需文字、邊框、Knob、材質、Hitbox、亮暗/開關逐區驗證。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
  - **2026-10-10 旋鈕／動態數值限定驗收**：PR #78 `9393bc32`、#79 `73964644` 合併；Web Preview [#38026732851](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38026732851) report commit `73964644`，UI01/UI02 geometry+knobSmoke+knobValues 均 true，檔案 `Web/App/knob_value_ref_alignment_v1.css`。UI01 Speed/Doppler/Width 各43px、一般68px、MIX82px，標籤在上／數字在下，八顆無文字裁切。UI02 Motion 54px、底部四顆76px，Bad Signal/Intelligibility 數值在右、Mix 下方，Condition 保留 Used 選單；內容仍使用真 live state，沒有照搬 REF 例圖預設數值。UI02 正式核准 1672×941 RGB REF SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff` 已核實；UI01 正式 1508×808 binary 仍未入庫，只依 142 點掃描 APPROX。**這次僅尺寸／值位置／操作驗收，未做每像素材質／字型疊圖與 Native editor；本項保持 [ ]／PARTIAL。**
- [ ] **CROSS-06｜Web Preview 未定位 404**（P2）— #76 render-log 有 404 但 URL 未查出；需查失敗資源與根因並以新 log 驗證解決。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-07｜完整可執行 C++ 聲學 DSP**（P3）— Source/Motion/Space/Transmission/Condition/Cover/Ambience 等真訊號模型、相位/延遲/CPU/Golden 需驗證。
  - **驗收/進度**：`PARTIAL`（2026-10-10）：`Source/DSP/SceneProcessor.*` 真共用 C++ MVP；Native/WASM 48 kHz、20,480 samples parity 最大誤差 0。SOURCE／TRANSMISSION 頻響子集已接，完整聲學／CPU／Golden 仍 PENDING。起始實作 GitHub `f352d3d8`；本批 PR/Fast/deploy 以 MASTER_HANDOFF 及 live GitHub 為準。

- [ ] **CROSS-08｜真正 Native VST3 可載入 Plugin**（P3）— Linux Native MVP 已有真 build/bundle；正式 editor、macOS/Windows DAW 與 release 待驗。
  - **驗收/進度**：`PARTIAL`（2026-10-10 第二批）：`Source/Plugin/VST3/Plugin.cpp` 直接連共用 C++，Linux x86_64 bundle 真載入 SDK mini-host、11 basic params、DSP、Bypass、state PASS。Native 先用 Host generic editor；不是 UI_01/02 嵌入完成，也不是商用 DAW/跨 OS 驗收。branch `feat/native-vst3-mvp`，PR/Fast 依 MASTER_HANDOFF 與 live GitHub。
- [ ] **CROSS-09｜WebAssembly/AudioWorklet DSP**（P3）— 共用 C++ MVP 已接入；完整聲學、音檔處理與跨平台 parity 持續驗證。
  - **驗收/進度**：`PARTIAL`（2026-10-10）：共用 C++ WASM / AudioWorklet 已在真 Chromium 153 跑通；兩 UI geometry、WAV load/play/pause/resume/stop、參數即時改音、Bypass、OfflineAudioContext 8 kHz 衰減與 stereo PASS。新增 Web 試聽列解開原本隱藏的 transport。完整模組／跨瀏覽器／Native VST3 parity 仍待驗，不勾整項完成。

- [ ] **CROSS-10｜真正 LUFS**（P3）— Web 有 Peak/RMS，不是真 LUFS；要標準計算、Live 更新及測試向量。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-11｜Host Automation/Recall/Offline Render**（P3）— 可載入 VST3 後驗 automation、保存/開啟、複製、離線輸出與正確聲音。
  - **驗收/進度**：`PARTIAL`（2026-10-10 第二批）：SDK mini-host 48 kHz stereo 的 block-rate parameter queue、11 值版本化 state restore、kOffline 輸出與共用 core parity PASS。sample-offset automation／真 DAW 保存重開與複製／74場景完整 recall 仍 PENDING；不勾整項完成。
- [ ] **CROSS-12｜EQ 曲線節點主區拖曳**（P2/P3）— 兩套 UI 需真拖 Freq/Gain/Q，反映到 4-band DSP、Advanced、Undo 及 Native。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-13｜DAW Sync/Motion 真時間**（P3）— 驗真 DAW timeline seek/loop/locate、Doppler/Distance/Scene 同步與 Host。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-14｜SCN049–074 新 78 張 Hero**（P1/素材）— Manifest 已有但 26 Scene×Shared/UI01/UI02 78 真獨立 PNG 未完成；需裁切、畫質、CRC/State 驗證。
  - **驗收/進度**：`PENDING`；真正補到 Web/Native/素材/聲音後，附來源、PR/Commit/Fast CI、相關截圖/操作/Host 證據並在原 ID 勾選。
- [ ] **CROSS-15｜Web/Native 64參數/74場景 parity**（P2/P3）— 64 參數 ID 已在規格，但兩 UI/Native state/Seed/Preset/A-B-C-D/Undo、Host recall 尚無完整證據。
  - **驗收/進度**：`PARTIAL`（2026-10-10）：保留 64 IDs／74 Preset，兩 UI 共用 MVP 音訊；本次 Native/WASM core fixture PASS，僅支援 sourceCharacter/badSignal/bandwidthLoss/inputGain/mix/outputGain、對應 selectors／bypass。完整 64 參數、74 場景與 VST3 Host recall PENDING。

- [ ] **ART-SHARED-001｜Shared 224 張真正高解析重製及兩套 UI 對應圖**（P1／插入執行）— 原圖只有約 169～228px 寬，用戶要求**全部跟原來一樣但清楚**，禁止直接放大糊圖交差。正式目標是 224 個 3× 高解析母圖（至少 1536px 寬）與 224×2 個 UI_01／UI_02 2× runtime PNG（預設 768×288／1024×512）；細 icon 可單張採 3×。
  - **來源及逐張工作單**：`docs/artwork/shared_hires/PRODUCTION_RULES.md`、`docs/artwork/shared_hires/asset_inventory_v1.json`。機器清單保留 224 個 ID 的三份舊 PNG SHA/尺寸/路徑，不開第二套重複 UI TODO。
  - **真完成條件**：每張的外觀、主體、文字、光影、構圖和原版一樣；從獨立重繪、可編輯高解析美術源產生 Shared/UI01/UI02 三份正式 PNG，同步 Web/Native 使用，通過 Chrome HiDPI/圖片檔案/CI/Host 可用時的真驗收；畫面/反覆使用需保持同一 State，不得烘焙動態控制。
  - **目前進度**：`PARTIAL: 224/224 已查原圖與 UI01/UI02 共 672 份檔案 SHA／尺寸；TRN_001／TRN_002／TRN_023 共 3/224 個真正向量重繪候選（未核准）；0/224 新母圖正式核准；0/672 正式 PNG 已替換；照片式重製、Web 和 Native 仍待辦。` **本項維持未勾選。** 候選來源及渲染證據：`docs/artwork/shared_hires/pilots/`；首次 GitHub One-off Action run `37824025285` 已成功。

## 後續 GPT 工作日誌維護契約

1. 每次動 UI_01/UI_02／REF／其 DSP parity：先讀 `AGENTS.md`、`PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、本工作日誌、當次專屬 REF/程式、`SOURCERUNE_MASTER_HANDOFF.md`；核 live main/PR/CI/Pages。**同一問題必須回填同一 ID，禁止重開新工作單。**
2. **有一項真的修好，就在同一 PR 或下一 checkpoint，把該 ID `[ ]→[x]`**；將該項 `PENDING` 更新為 `DONE: PR #、Commit SHA、Fast CI、來源/正式 PNG SHA、Web/Native 真實截圖/事件/聲音測試、日期`。若只完成部分，保留 `[ ]` 並註記 `PARTIAL: 已完成子項/尚缺子項`。
3. `NEEDS-DECISION`（產品語意）、`BLOCKED`（取檔/環境/Host）、`APPROX`（REF 細像素）都**不是 DONE**。正確圖在 repo、幾何 PASS、DOM 顯示、真操作、真正音效、Native Host 各有獨立驗收門檻；不能以任一項充數。
4. 真正修改正式 UI／參數／DSP 時依 `PROJECT_RULES.md` 同時評估 Web/Native；VST3 尚無可建置目標時不能回報 parity 已完成。Fast 為日常測試；Deep／Release／20/100 次安全測試須使用者另行同意。
5. 每次成功合併時更新 `SOURCERUNE_MASTER_HANDOFF.md` 的本日誌摘要與最後 checkpoint；本檔是**逐項狀態權威**，handoff 只放入口／總結，勿複製第二張全部待辦表。Fast CI 綠燈也要檢查真 Web Preview log/audit。

初次登錄統計：**已驗基礎 10 項**、**待辦 55 項**（UI_01 18、UI_02 22、共用 15）；不代表完成百分比。
