# SOURCERUNE — UI_01／UI_02 REF 缺項修復工作日誌（唯一有效）

> **最新 P0 Checkpoint（2026-10-09）**：U01-12 `[x]`（UI_01 Web 四個 Checkbox／共用 State／Advanced／Undo/Redo 已 Chrome 真驗收），**目前 11 項 `[x]`、55 項 `[ ]`（含 ART-SHARED-001）**；CROSS-01（兩張 UI_01 正式 PNG binary 入 GitHub）仍 BLOCKED，其他 P0 仍待辦。文末「初次登錄統計」是歷史數值，不可當現況。

> 2026-10-09 建立；承接使用者選取的完整缺項稽核。**每完成一個工作 ID，要直接在這份 GitHub 文件中將 `[ ]` 更新為 `[x]`，填入 PR／Commit／CI／正式 REF 與真 Web/Native 驗收證據。** 不另建立重複競爭工作清單。純文件的登錄不等於任何修復完成。

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
