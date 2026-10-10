# SOURCERUNE — 工作交接與最新核查點

## 2026-10-10 更新：EQ 畫面固定 ±12 dB；Zoom In 放大視窗僅完成設計（尚未新增按鈕）

- **目前這輪修改（Web）**：`Web/App/eq_graph.js` 的 `displayRange=12` 永久固定，移除以前依三段 Gain 自動跳 ±6/±12/±18 的邏輯；只動計算曲線 Y 軸及節點畫面位置，原 HPF+LPF+B1–B3 真正 C++ DSP／Gain 參數範圍、Automation、74 個 Factory Preset、EQ 滑鼠感度都不改。`Tests/Web/knob_smoke.cjs` 既有一次 Chromium UI01／UI02 驗收中增加 0、6、9、14、-18dB 皆顯示固定 `displayRange===12` 的不變條件；實際驗收結果須看當輪 `Web/App/preview/rendered/geometry-report.json`／`render-log.txt`，不能只看 Pages 綠燈。
- **Zoom In 全面規劃／仍 PENDING 實作**：右下 `EQ / TONE` 主卡新增 Zoom In 圖示（緊鄰 Power、不移 REF 座標），點後於原 Plugin 內部開啟約 900×500px、上限可用畫面 90% 的可定位 EQ Focus 面板，頻譜 X 20Hz–20k、Y 永遠 ±12dB，五節點全部操作放大，沿用數值小框、Bell 節點 wheel Q、數值直接輸入／Shift／雙擊 Gain 歸零／Undo，只有一份 state/C++ DSP，不雙算 EQ／FFT，不改 preset。關閉／Esc／Zoom Out 恢復小 EQ 原樣且參數不丟，彈出期間背後小 EQ 不能收滑鼠，需 keyboard focus/host resize/re-render 清除 handler 與 viewport scaling 真測。
- **唯一正式細規**：`docs/product/UI_FUNCTION_CONTRACT.md` 的 **EQ Zoom In / Focus editor — APPROVED PLANNING ONLY**。沒有新增大視窗實體、按鈕、第二組 EQ；Native VST3 自訂圖形介面未存在，Web 及 Native Zoom parity 不可誤報。UI 01/02 U01-17/U02-22 仍 [ ]／PARTIAL。本輪完成證據在對應 PR 和 Fast CI／Web Preview 後補；後續對話從這份新決定接續，不得恢復以前的 auto-fit。

## 最新 checkpoint：VVChain UI_A 操作方式移植到 SOURCERUNE EQ（2026-10-10）

- **需求來源／界線**：使用者核准只參考 Private `nevemn-code/VVChain` 最新 UI_A 的 mouse/popup 操作（參照 private main `e388fa86`、`assets/ui/candidates/UI_A/UI_A位置與大小說明.md`、`docs/index.html`、`Source/PluginEditor.cpp`）。不複製其 DSP、filter type、Dynamic EQ、M/S、SOLO、座標/素材；SOURCERUNE 永遠只 HPF／LPF／B1–3，原 `b4` IDs deprecated/reserved。正式 Web source `Web/App/eq_interactions.js`、`eq_interactions_v1.css`、`app.js`、`eq_graph.js`，UI_01、UI_02 共用同一組 state/AudioWorklet/DSP。
- **操作已接入 WEB**：hover 節點顯示 158px 小型 FREQ／GAIN／Q 編輯框（HPF、LPF 僅 Freq），可直接鍵盤輸入後 Enter 提交／Escape 取消、數值上下拖曳、Shift 精調、滑鼠滾輪微調（popup Freq 1Hz、Gain 0.1dB、Q .01，觸控板細微 delta 累積，不暴衝）。Bell 節點滾輪調 **Q**，方向依 VVChain 真行為：wheel up Q 下降／較寬；點拖 XY 左右 Freq、上下 Gain；Bell 雙擊只歸零 Gain，**保留 Freq/Q**；cut 節點只改 Freq、雙擊回預設；游標至浮動框 mouse tunnel，離開延遲 260ms 自動收起，從框外放開拖曳不即刻消失；每動作保留 Undo/history，參數變化同步 Advanced/DSP，指標縮放座標由 getBoundingClientRect 轉換。±6/12/18 dB 自動視覺 zoom 僅影響 graph，不寫入 DSP/preset。
- **合併／真證據**：PR [#92](https://github.com/ureia-dev/SOURCERUNE/pull/92) `da0715ef` 主實作；#93 的無效測試修改經檢查後由 [#94](https://github.com/ureia-dev/SOURCERUNE/pull/94) `f94fd050` 修正真正 Puppeteer `$eval`；[#95](https://github.com/ureia-dev/SOURCERUNE/pull/95) `fa12aa95` 調整 Q wheel direction test；[#96](https://github.com/ureia-dev/SOURCERUNE/pull/96) `6d04c943` 補 Enter commit；[#97](https://github.com/ureia-dev/SOURCERUNE/pull/97) `f08ed004` 補 SVG pointer-capture 雙擊 hit-test；均已合併，Fast 各對應 head PASS。**真 [Web Preview #38034895001](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38034895001)** 實際 `Web/App/preview/rendered/geometry-report.json` 紀錄 `commit=f08ed004cc99558c2527b0e86cc281b607e60e87`，UI01/UI02 `geometry.ok`、`knobSmoke.ok`、`eqMouse.ok` 全部 true。兩版 real Chrome 證據：Q 1.00→0.90、Gain numeric drag 0→+1.2dB、value wheel +0.1dB、type 1700Hz→1.7kHz、Bell dblclick Gain→0 保留 Q/Freq、HPF/LPF Freq only、hover tunnel／hide、未誤開 Advanced；log 結束 `render audit completed successfully`（另有既存非阻塞 404）。Web Pages：https://ureia-dev.github.io/SOURCERUNE/Web/App/ 。
- **嚴格未完成／不可誤報**：Native VST3 目前只有 generic host params／C++ EQ processing，**沒有自訂 UI_01／UI_02 Editor、浮動框或滑鼠命中/拖曳**，Native mouse parity 和 Windows/macOS host 實測 PENDING。VVChain 專有 EQ curve-type、SOLO、Dynamic／M-S 不移植，因 SOURCE EQ 無對應功能／DSP。最終 Final Tone、REF 逐像素、完整最終 signal-flow/CPU 容量量測仍 PENDING。U01-17/U02-22 保留 [ ]／PARTIAL，**但 Web EQ 滑鼠互動子項已驗收 DONE**。

## EQ 最新正式 checkpoint — 三段 EQ＋HPF／LPF（2026-10-10）

- **最新核准 3 Band 取代舊的 4 Band**：真正 UI/DSP 只有 HPF、LPF、Band 1/2/3。舊 b4Freq、b4Gain、b4Q public IDs 53–55 僅保留 reserved/deprecated，不當成第四段濾波、不出現在 active controls；舊 Web 匯入 State 移除 b4 欄位；74 Factory Presets 無 b4 使用，不改內容。
- **共用真 DSP**：已存在的 Source/DSP/Tone/Hpf.h 真 HPF 保留；新 Source/DSP/Tone/Parametric3.h 有二階 Butterworth LPF + 三組 RBJ Bell，inactive/flat 跳過運算、native 1×、無新增演算法延遲；C++ 單次 bounded audio smoke 通過左右聲道、非平坦可聽音頻變化、旁通原樣輸出。Web 使用同一份 C++ 編出的獨立 eq3.wasm，在 AudioWorklet 舊真 HPF 後處理。Native VST3 generic editor 保持前 13 ID 不變，新增十個 EQ 控制共 23，V1 11 / V2 13 讀取兼容，現行 V3；但 Windows/macOS VST3 Host、真正 Plugin UI 以及真實 CPU benchmark 未驗。
- **Repo PR 與真 Chrome 證據**：#86 e3328e46（三段 EQ/LPF C++ + Web/Native 控制）、#87 eec98aaf（WASM freestanding memcpy/memset）、#88 345de82a（重新部署）、#89 4f755569（修正 Puppeteer 單節點讀取），均已合併；舊衝突 #83、#85 已關閉。真正 Web Preview https://github.com/ureia-dev/SOURCERUNE/actions/runs/38032900735 的 Web/App/preview/rendered/geometry-report.json 來源 commit 4f755569e6eccefdbeaa51737a382e2bda873fc0：UI01/UI02 geometry.ok、knobSmoke.ok、eq.ok 均 true；兩版 HPF/B1/B2/B3/LPF 均真 pointer drag、Advanced 數值同步、Undo 恢復成功；真 HPF OfflineAudioContext smoke 仍 PASS。render-log 顯示 render audit completed successfully（有舊非阻塞 404）。Pages 已部署 https://ureia-dev.github.io/SOURCERUNE/Web/App/ 。
- **仍 PENDING / PARTIAL**：Final Tone 對聲音作用、REF 細節 1:1、真正 EQ3 Web AudioWorklet 獨立量化頻率響應/CPU 實測、Native VST3 Host（含 Win11/macOS）、Native UI/editor、TONE→MIX 最終 processing order；不能只憑 UI 或 Pages green 虛稱全 DSP/Native 完成。正式缺項 U01-17/U02-22 仍維持 [ ]。

## 最新 checkpoint：右下 EQ 真 HPF / 最省資源優先（2026-10-10）

- **本輪僅授權 HPF 第一階段**，未擅改 74 Factory Preset 或其他 EQ/TONE 聲音。正式已有 public parameter `hpf` ID42（20–1000Hz；20Hz=exact OFF），`EQ_TONE` module bypass。採用同一份 `Source/DSP/Tone/Hpf.h` 立體聲 Butterworth 二階 HPF（12dB/oct, RBJ/W3C），不 oversample／不 allocation/lock/I/O／不 per-sample sin/cos；OFF 後整段完全跳過 HPF 運算。Native 測試 cutoff240Hz，40Hz 相對4kHz −31.13dB、OFF 原樣輸出。
- **Web 真 DSP 已驗**：`Source/DSP/Tone/HpfWasm.cpp` + `Tools/Build/build_hpf_wasm.sh` 生成 1,538-byte `Web/App/audio/hpf.wasm`，Git blob `994816dd4b8857eb765bb33d6d537e6ba67252fc`；`Web/App/audio/engine.js` + `processor.js` 接真正 AudioWorklet 後段，port 更新 HPF；OFF 不進模組也不複製緩衝。UI_01/UI_02 的右下 EQ 新增可滑、可滾輪／鍵盤改、雙擊 OFF、Undo/Redo、Advanced 同值、12dB HPF 曲線與 EQ Power。數值保持現有 hpf 參數範圍與 State；LPF／4-band／Final Tone 只顯示 PENDING，不冒稱有 DSP。
- **真瀏覽器證據**：PR [#81](https://github.com/ureia-dev/SOURCERUNE/pull/81) merge `3f627bd8`，[#82](https://github.com/ureia-dev/SOURCERUNE/pull/82) merge `1a0d1b6d`；Fast CI PASS。[Web Preview #38031171637](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38031171637) `geometry-report.json` 來源 `1a0d1b6d`，UI_01/UI_02 `geometry.ok=true`、`knobSmoke.ok=true`、`knobSmoke.hpf.ok=true`，HPF 20→21/Undo/Redo/曲線/Advanced；真 `OfflineAudioContext` 聲鏈 40Hz RMS OFF 0.17677669 / ON(240Hz) 0.00490798，直接同 C++ HPF WASM 測得40Hz相對4kHz -31.1189dB、OFF bit exact；render-log 成功（另有既存一筆 404，另案）。
- **Native 本輪做到了來源但未達 Host 驗收**：`Source/Plugin/VST3/Plugin.cpp` 接相同 C++ HPF；`Source/State/NativeParameterIds.h` 原 11 ID 不動，新增 #42 HPF / #1102 EQ Bypass，共13；state V2寫13個值且相容舊 V1 11個值。更新 `Tests/Audio/vst3_host_smoke.cpp` 的13 ID期待；未經新版實際SDK Host/DAW 編譯、載入與儲存回讀驗證，不把舊版11 IDs mini-host PASS當此次完成。
- **重要音訊順序差異**：這版 sidecar/Native HPF 位於舊 Scene MVP 的混合／Output 後，先求兩端同算法且可試聽。產品最終契約 `TONE → MIX/OUTPUT` 尚待完整主 DSP 整合。LPF、4-band（Freq/Gain/Q）、真正 EQ 主曲線拖節點、Final Tone、Host sample-offset automation、CPU profiler benchmark及使用者試聽都 PENDING。唯一工作日誌 U01-17/U02-22 保持 PARTIAL/[ ]。下一對話先查 live main/PR/Pages 並從 checkpoint 續做。

## 旋鈕／Live 數值依 UI_01、UI_02 REF 排版（2026-10-10）

- 已合併 PR #78 `9393bc32`、#79 `73964644`，UI Web `Web/App/knob_value_ref_alignment_v1.css` 最後覆蓋既有圖面與輸入 hitbox：UI_01 小旋鈕 43px、一般 68px、Mix 82px，數字在下／標籤在上；UI_02 Motion 54px、底部四顆 76px，Bad Signal／Intelligibility 數字右、Mix 數字下、Condition 保留 Used selector。真參數／真單位仍沿用 ui_controls.json（Speed 為 km/h），**不照搬 REF 示意 60%／75% 等到 State/Preset**。沒有改原音效、Factory74、公共 ID 或 Native。
- UI_02 真核准 REF 1672×941 RGB SHA256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff` 從已有來源核對；UI_01 正式 1508×808 RGBA SHA256 `96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916` **仍缺 GitHub binary**，因此 UI01 的 142 項掃描僅 `APPROX`，不可聲稱 pixel-perfect。
- 真 Chromium [Web Preview #38026732851](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38026732851) 成功，最新 `Web/App/preview/rendered/geometry-report.json` 來源 `73964644`，UI01/02 `geometry.ok=true`、`knobSmoke.ok=true`、`knobValues.ok=true`；UI01 8 顆 knob label 上/value 下，UI02 4 顆底部 knob value right/below、Speed/Doppler/Width 3 顆互動，沒有超出卡片或破壞 Undo/滾輪。日志結尾為 `render audit completed successfully`。UI_02 已有真原圖但還沒有全面 1:1 像素疊圖；UI01 缺原圖 binary，REF 材質/字距/指針角度仍需詳細掃描。Native VST3 generic editor 未有兩套 custom UI。
- 本輪誤將檔案更新寫進 main，已以**非強制**的原樹 revert commit `3df08f49` 恢復，真正修改整理在 PR #78 後正式合併；不以被取消／舊 Pages run 冒充驗收。唯一缺項日誌見 `docs/product/reference/UI_REF_GAP_WORKLOG.md`，目前範圍維持 PARTIAL。

## 最新 checkpoint：UI_01／UI_02 主旋鈕與 Advanced 視窗修復（2026-10-10）

- **起因與根因**：前次雖把範圍值事件接上，但較晚的 `.macro input {position:relative}` 與 range 的 margin 使透明 hitbox 離開正式 PNG 旋鈕，使用者實際拖動反而按到卡片觸發 Advanced；Advanced 又受 `.app` scale、overflow 裁切，使用 `left/right/top/bottom` 填滿整個 Web shell，必須按 CLOSE。不能把舊 `knobSmoke` 單顆 Bad Signal 成功視為全 UI 完成。
- **實際修復**：PR [#75](https://github.com/ureia-dev/SOURCERUNE/pull/75) merge `4bf937dd`：最後載入 `Web/App/main_controls_dialog_v1.css` 使透明控制層真正覆蓋正式旋鈕 face，不移動 REF 圖像，卡片 `.macro-knob` 不再觸發開詳細視窗。Advanced panel 移到 document.body，真 backdrop 點外關閉、Esc／CLOSE 保留，依實際模組控制數量用 470／600／750／940px 寬（本輪選定測試小/中/大為 470/750/940）；限制最大視窗高度，內容過多才捲動，UI_02 Ambience 保留橫向滑桿。
- **驗收與再補足**：PR [#76](https://github.com/ureia-dev/SOURCERUNE/pull/76) merge `dca77fe8` 新增 UI_02 場景區 Speed／Doppler／Width 小旋鈕真操作測試。最新 [Web Preview #38025720819](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38025720819) true Chrome: `Web/App/preview/rendered/geometry-report.json` `commit=dca77fe8...` 且 UI_01/UI_02 `geometry.ok=true`, `knobSmoke.ok=true`；UI_01 8 顆圓形、UI_02 下方 4 顆圓形、UI_02 上方 3 顆小旋鈕，真 mouse drag、wheel、keyboard、Undo 恢復，且未開 Advanced。正式 PNG 解碼 PASS，UI_02 Ambience slider PASS。Dialog outside click / Esc / CLOSE、small 470×223px、medium 750×382px、large 940×464px 均 PASS。`render-log.txt` 結尾 `render audit completed successfully`，不可只以 workflow SUCCESS 判定。
- **不影響與仍未完成**：未改 74 Factory Preset、已核准版面座標、UI 圖檔、參數 public IDs、共用 DSP、CI 安全次數。Native VST3 還是 host generic editor，正式 UI_01/UI_02 插件編輯器與不少模組真 DSP 仍 PENDING；其餘卡片/開關/REF 細節 E2E 未全部驗。唯一工作日誌 `docs/product/reference/UI_REF_GAP_WORKLOG.md` CROSS-03、U02-13 保持 PARTIAL/[ ]，勿誤勾完整。

## Web 旋鈕接線與 Chromium 驗收（2026-10-10）

- **範圍**：UI_01/UI_02 既有 speed/doppler/width/badSignal/condition/intelligibility/ambience/mix 八個 Web macro 控制已接上下拖曳、單步滾輪、鍵盤、雙擊預設值、單手勢 Undo/Redo 與 Advanced／Shared State 即時同步；UI_02 Ambience 橫向滑桿保留。原有 UI 外觀尺寸/素材、State schema、74 Factory Preset、DSP 算法及 CI 次數不變。部分參數仍僅保存 State，不代表真 DSP 功能已完成。
- **GitHub checkpoints**：PR #69 (9c97e836)、#70 (57e8df37 修 selector 初始化)、#71 (da8b216a 修透明旋鈕操作範圍)、#72 (ba9a8f81 修測試游標)、#73 (d7cd7118 更新 Web 說明及依原本 Pages 規則部署)。以上均已 merge，Fast PASS。
- **真 Web 證據**：Web Preview [run #38024619544](https://github.com/ureia-dev/SOURCERUNE/actions/runs/38024619544)，report來源 d7cd7118，UI01/02 均 geometry.ok=true / knobSmoke.ok=true，Bad Signal 20→42 drag、42→41 wheel、41→42 keyboard、Advanced 42、Undo/Redo 復原 20；UI02 Ambience 35→82→35。render-log 結尾成功，Pages 已部署至 https://ureia-dev.github.io/SOURCERUNE/Web/App/ 。特別注意舊 Pages run #38024098734/#38024256300/#38024421902 雖然工作流程綠燈，但 render-audit 曾失敗；驗收必須核最新 report/log，不能只看 workflow 顏色。
- **未完成**：Native VST3 現仍只有 11 個 host generic editor 參數，沒有兩套 custom Native UI；Condition/Intelligibility/Ambience 等 DSP 仍 PENDING，本輪只驗主宏旋鈕與 UI_02 Ambience，不是所有 UI E2E。唯一工作日誌 docs/product/reference/UI_REF_GAP_WORKLOG.md 的 CROSS-03 維持 PARTIAL/[ ]；下一輪讀 live main/PR/CI，不要重做已驗證項。

## Native VST3 MVP checkpoint — 2026-10-10 第二批

- **Web 已上線**：PR #66 已 merge `d82f4420`，Fast run `37970139055` PASS；Pages run `37970747320` SUCCESS，render audit `074b085e` 記錄成功。網址 https://ureia-dev.github.io/SOURCERUNE/Web/App/ 。本輪另查 HTTP 200、線上 app.js 與 main 相同、線上 WASM SHA-256 `3d0ce6b0aa610e008a1308d030b453905b07e3320f1185bcd42452bc2e1ad714` 與已測 binary 相同。未重跑既有成功 Web 聲音驗證。
- **新分支**：`feat/native-vst3-mvp`，由 `074b085e` 起步。根 CMake 及 `Source/Plugin/VST3/Plugin.cpp` 建立可載入 Native target，直接 link 原有 `SceneProcessor.cpp`，不改 Web DSP、Preset、圖資或 UI geometry。
- **已實作**：11 個基本控制、既有 public IDs 對應的永久 host 數字 ID、mono/stereo float32、global/module bypass、versioned state save/recall、block-rate parameter queue。Native 先採 host generic editor，不宣稱 UI_01/02 已 native 嵌入。
- **已驗收範圍**：Linux x86_64／g++ 13.3／CMake／固定官方 SDK 3.8.1 `3cdf9ca5`。真 `.vst3` bundle 編譯、SDK mini-host 載入、11 unique/default params、48 kHz stereo 音訊與共用 core 最大誤差 0、parameter change、exact bypass、state recall／offline audio parity PASS。最初遺漏 SDK enable macro 導致 ModuleEntry 缺失、setProcessing 繼承 kNotImplemented；均已最小修復，不以失敗 build 作完成證據。
- **執行入口**：`Source/Plugin/VST3/README.md`；`Tests/Audio/vst3_host_smoke.cpp` 為一次性 bounded Deep/manual 整合，build 屬 Release/manual。本輪未改 CI trigger／matrix／safety/stress 次數，未自動跑完整 validator 或安裝至 DAW。
- **仍 PENDING**：macOS／Windows 原生建置、真正 DAW Host、完整 validator／release、sample-offset automation、Web JSON／74 Factory 完整 recall、native UI、使用者實際試聽。不能把 SDK mini-host 當 DAW 測試，不能把 Linux bundle 當 Mac/Windows 成品。
- **下一步**：在使用者核准前不擅增 Release matrix/runner；取得 macOS／Windows Release 建置 runner 的核准後，製作對應可下載插件並做真 DAW 驗證。先保存本分支、PR、必要 Fast CI；接近 token 上限時照使用者要求停在 GitHub checkpoint。

## Web DSP MVP checkpoint — 2026-10-10

- 起點 main `ef3c7324`；分支 `feat/shared-dsp-web-mvp`。本次明確授權以 Web 真聲音 → Native VST3 優先，取代舊 UI-only 工作順序；保留 UI、64 public IDs、74 Preset 及既有安全測試次數。
- 新增共用 C++20 `Source/DSP/SceneProcessor.*`、WASM adapter／build script、AudioWorklet 與現有兩套 UI 的即時參數／Bypass／Mix／Gain 接線，PLAY 可切換 PAUSE。
- 模型是 PROVISIONAL 頻響／頻寬 audition 起點：SOURCE 001/002/003/011/040；TRANSMISSION 001/002/003/005/011。GSM 005 僅頻寬，沒有真 GSM codec。未支援型號跳過該模組且畫面明示；其他模組仍只存 state，不宣稱完整 Factory 聲音。
- 能力：完整 git clone；正式 UI02 REF 1,976,915 bytes 的 Git blob `dbb2c3cd` 與 HEAD 相同；修改前 Chromium 真頁 geometry PASS、5 張圖載入。g++ Native 與 Zig WASM 可編譯。
- 已驗：48 kHz、20,480 samples 的 Native/WASM 相同 fixture 最大誤差 0；有限輸出、有真 dry/wet 差異、reset 後 exact bypass/stereo PASS。Chromium 153 真 AudioWorklet 與 OfflineAudioContext PASS：處理 RMS -15.4 dBFS、Bypass IN/OUT 同為 -12.3 dBFS、即時加重頻寬損失後 -17.7 dBFS；8 kHz 輸入衰減約 26.3 dB，stereo error 0；load/play/pause/resume/stop、Factory load、兩 UI geometry PASS。可重現入口 `Tests/Audio/browser_smoke.cjs`。
- 建置：`ZIG=/path/to/zig bash Tools/Build/build_wasm.sh`，或 clang++ + wasm-ld；無 Emscripten runtime／第三方聲音引擎。WASM binary 連同 source 保存，Pages 可直接使用。
- GitHub 第一個有效開發 checkpoint：`f352d3d82072419945db2ed36facd9d7ce0382b7`（本機 `3f84758` 的同內容；經 connector 上傳，SHA 不相同）。本批後續驗收修復保存在相同遠端分支；Fast CI／PR merge／Pages 狀態需查 live GitHub，未確認前不得報完成。
- 根因修復：舊 CSS 隱藏 LOAD/PLAY/STOP/LOOP/Bypass，現移到 plugin shell 外的 Web audition bar；`.module-meta` 原本攔住 EDIT click，改為不攔截指標。不改兩套 shell 幾何或原素材。試聽使用頁底 LOAD AUDIO → PLAY，TRANSMISSION EDIT 調 Bad Signal／Bandwidth Loss；GLOBAL BYPASS 比較原音。
- Native VST3 wrapper/Host、完整聲學／LUFS／使用者試聽仍 PENDING；下一批沿用這份 C++ 建立最小 VST3 wrapper，先驗載入/參數/狀態，再擴 DSP。不得再把 Web 描述成純 pass-through。
- 使用者補充（2026-10-10）：接近本輪 token 上限即停在有效節點、將程式與交接存 GitHub，等待使用者額度重置後說「繼續」；不假設背景會自行續作。


## 最新 P0 UI_01 控制功能／集中部署 checkpoint（2026-10-09）

- **本輪**：U01-13 CONDITION Rattle/Wow-Flutter 真 Checkbox 接既有數值；U01-17 EQ/TONE 主卡 ON/OFF 真 Power 接既有 EQ_TONE bypass。未修改 UI_02 外觀、DSP、74 Preset、參數 ID、REF 外框。
- **五個 micro-checkpoints**：9b49b1bc（Checkbox）、7e28b217（EQ Power）、4e6e5155（局部 CSS）、25538158（原有 Chrome 一次性 smoke）、0f7c8e45（唯一工作日誌 PARTIAL）。[PR #63](https://github.com/ureia-dev/SOURCERUNE/pull/63) merge 3e3799d3，Fast CI #108 PASS。
- **真正失敗的首次驗收**：Web Preview #80 雖然 workflow SUCCESS，但 Chrome 顯示 INIT ERROR，原因是兩個新事件用了單元素 selector 卻呼叫 forEach，產生新的 geometry report 失敗；不得將 #80 當作 Browser PASS。
- **最小修復**：[PR #64](https://github.com/ureia-dev/SOURCERUNE/pull/64) 修兩個 selector 為雙美元符號集合選取器；實作 c472b14f、merge 43bfcb6a，Fast #109 PASS；沒有修改其他 CI/音效或測試次數。
- **真正驗收通過**：[Web Preview #81](https://github.com/ureia-dev/SOURCERUNE/actions/runs/37926258273) 部署 SUCCESS，Web/App/preview/rendered/geometry-report.json 由 43bfcb6a 產生；UI_01/02 幾何 ok=true；U01-12 四組、U01-13 兩組及 U01-17-POWER 的可見/切換/Advanced/Undo/Redo/復原全為 true；render-log.txt 明確記錄 render audit completed successfully。
- **仍 PENDING**：U01-13 的 Native/聲學未驗；U01-17 僅 Power 通過，HPF/LPF/Tone 選單、EQ 曲線/節點與 Native 未完成。兩項在唯一 UI_REF_GAP_WORKLOG.md 保留未勾 PARTIAL。Chrome 尚有未定位的一筆 HTTP 404，由 CROSS-06 追查。
- **下次恢復**：以最新 GitHub main/PR/CI/Pages 為準，從單一 UI_REF_GAP_WORKLOG.md 未完成 ID 續做；已驗證 Web 事件不要重做。部署後 render audit bot 會另行產生新的 main commit，勿誤判為未合併。

## 最新插入 checkpoint — Shared 224 張高清美術重製（2026-10-09）

- 使用者已核准 **全部 Shared 舊圖重做同樣樣子但清楚**。真圖尺寸只有 169～228px；Web 另用 `UI_01` 384×144、`UI_02` 512×256，故需同批重建 Shared 224 + Web/UI01 224 + Web/UI02 224，共 672 張；不是直接將糊 PNG 放大就算完成。
- 正式目標：3× 1536px 起可編輯母圖；一般 runtime 2×（UI01 768×288、UI02 1024×512），細 icon 個別 3×。以 `docs/artwork/shared_hires/PRODUCTION_RULES.md` 與 `asset_inventory_v1.json` 作來源/逐件狀態，唯一總工作日誌新增 `ART-SHARED-001`，仍 `[ ]`。
- GitHub One-off run `37824025285` 成功：完整驗了 224 Shared + 448 UI 既有圖 PNG，建立 224 個原始 SHA/尺寸/ID 資料；三張 TRN_001、TRN_002、TRN_023 **真正 SVG 重畫候選**已放 `docs/artwork/shared_hires/pilots/`，尚未獲正式核准或覆寫 runtime；其餘照片類需獨立高解析美術來源，0/672 正式版更換。
- 本作業只是插入材質品質改善線。之前 P0 U01-12 Web Controls 已完成不重做；CROSS-01 正式 UI01 REF PNG 缺檔、其他 P0／P2／P3 保留原狀。


## P0 最新可恢復 Checkpoint — UI_01 BAD SIGNAL 四 Checkbox（2026-10-09）

- **U01-12 = `[x]` Web 主卡功能完成**：四個 Checkbox 對應既有 noiseStatic/dropout/interference/bitrateArtifacts；UI_02 沒改排版。PR #58 `9212424b`（實作）／#59 `d3e52f9a`（修正 `data-macro-selectbox` 單元素 forEach 啟動回歸）／#60 `a9b1ddb1`（完整四組 Browser smoke）；Fast #103–#105 成功。
- **Web Preview #79 真驗收**：run `37818887999` 已實際跑完；`Web/App/preview/rendered/geometry-report.json` 由 commit `a9b1ddb19cda51274b3a28d27d9b8175a6b24212` 產生；`UI_01.interactionSmoke.U01-12.ok=true`，四組 `noiseStatic/dropout/interference/bitrateArtifacts` 的 toggled、Advanced、Undo／Redo／復原**各自全部 true**，`UI_01.ok=true`／`UI_02.ok=true`，failures=[]；真 `render-log.txt` 顯示 render audit completed successfully。先前 Web Preview #77 的初始化失敗已在 #59 修好，不可仍當現況。
- **CROSS-01 保留 `[ ] BLOCKED`**：使用者核准的 UI_01 原圖 1508×808 及 2.5× 3770×2020 本機 bytes/sha 都已核對，但 GitHub repo 尚無兩份 PNG。connector 不接受 container 本機檔案位元組，DNS 無法連 github.com；不能假裝已入庫，也不能用 AI 重畫取代。詳見唯一工單。
- **尚缺**：Chrome log 仍有一項未定位 404，`CROSS-06` 跟進；真正 Native VST3 Host 與聲學 DSP 仍 PENDING（`CROSS-07/08/15`）；REF 細材質/字型與 UI01 其他 P0 項仍在單一日誌。
- **工作入口**：`docs/product/reference/UI_REF_GAP_WORKLOG.md`（此輪標記 11 項 `[x]`、54 項 `[ ]`）；以後每項驗收照樣在原 ID 更新，不另生清單。
## UI_01／UI_02 REF 正式缺項工作日誌（2026-10-09）

- **最新唯一可勾選工作單**：[`docs/product/reference/UI_REF_GAP_WORKLOG.md`](docs/product/reference/UI_REF_GAP_WORKLOG.md)；逐項保存使用者本輪貼出的 **UI_01 18 項、UI_02 22 項、共同 15 項待辦**，另保留 **10 項有實際證據且範圍有限的已驗基礎**。詳細內容只在該工作單，不複製第二份清單。
- **往後有做完就必須更新同一份日誌**：保留原 ID，把 `[ ]` 改 `[x]`，補上實際 PR／Commit／Fast CI／Web REF 局部疊圖或 Native Host／聲音測試證據；未完成或部分完成維持未勾，留下 `PENDING`／`PARTIAL`／`BLOCKED`／`NEEDS-DECISION` 與 checkpoint。
- 初始缺項順序：**P0** 真 PNG／缺少的主卡操作／UI_02 Shuffle 語意待核；**P1** REF 細部和真 Scene 美術；**P2** 交互及像素疊圖；**P3** 真 DSP／WASM／LUFS／VST3 Host。UI_01 原圖兩張 PNG binary 仍未入庫；UI_02 三張已在 GitHub。Web 幾何 PASS 不能當 REF 外觀或 VST3 真功能完成。


## UI_02 — 核准 2.5 倍 REF 真圖片掃描（2026-10-09）

- GitHub 正式原圖 1672×941 RGB，SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`，由 GitHub Actions artifact 實際取回與核驗；2.5× 最近鄰檢視 PNG 4180×2353 SHA-256 `734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6`（本機真實生成，42 個像素點位 PASS）。
- 從未合併 PR #53 沿用 25 大區、8 Topbar 錨點、8 控制直徑、139 個部件與功能清冊、15 組真 RGB 邊界差分，全部原圖座標不變、2.5× 座標浮點換算。新文件 `docs/product/reference/UI_02_REF_2_5X_*_20261009` MD/JSON。
- 目前此工作分支的 2.5× PNG 已經使用一次性 GitHub Action 真正入庫，GitHub 已產生真 PNG binary，Action #1 run `37811957946` 與分支 commit `47a702691503b672655b2f0d527d67473104ce25` 確認 SVG/PNG 路徑（實際為 PNG）、檔案尺寸及來源/產物 SHA-256 完全相符，42/42 像素對照 PASS；臨時 Workflow 會隨產物提交一併移除。
- 10 倍舊 PR #53 不得合併；現行 UI_01 142 筆 2.5 倍規格與原圖完全保留；不改 DSP、Preset、Web/Native 實際 Runtime。


## UI_01 清潔 REF 正式 2.5× 檢視（新決定取代 10×）

- 正式無說明來源 1508×808 RGBA，SHA-256 `96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916`，原圖不改；正式掃描倍率為 **2.5 倍**，3770×2020 PNG，Pillow NEAREST，SHA-256 `f67c59046f2c1f90379837f1898a63a98e9abbf3d0e57a82945f4e5b2afb773e`，本機兩次重現及逐像素比對通過。
- 更新 `docs/product/reference/UI_01_REF_CLEAN_SCAN_20261008.json` 及同名 MD：**142 筆** `bbox_1x`、`bbox_2_5x`、`center_1x`、`center_2_5x`，保留內容、功能候選、Web 元件與精度。
- `Assets/UI/UI_01/UI_01_REF/` 尚只有 README；原圖及 2.5× PNG 檔案**仍待二進位 GitHub 上傳**，不可報完成。原圖目標 `UI_01_REF_ORIGINAL_1508x808.png`，掃描圖目標 `UI_01_REF_2_5X_PIXEL.png`。
- 1499×807 既有 Web/Native shell 與 1508×808 REF 不是同一座標系；疊圖校準/細字與狀態/互動/Native 實測仍 PENDING。此步不改 UI_02、DSP、Preset 或 CI 門檻。


> 本檔**只放最新可核對狀態、待完成清單與下一步**。不是產品憲章／DSP 規格／論壇研究規則；永久原則從 [AGENTS.md](AGENTS.md) 讀取。任何快照只代表當日，**執行時先查 live main/branches/open PR/CI/Pages**，不要沿用這裡的舊 SHA。

## 本次文件整併的 checkpoint（2026-10-08）

- 工作目的：刪掉多份「永久原則」與歷史交接間重複敘述；以 `AGENTS.md` 作短入口，`PROJECT_RULES.md` 管最高研究／CI 原則，`PROJECT_CONSTITUTION.md` 管永久產品方向，`ORIGINAL_PRODUCT_DECISIONS_20261008.md` 管初始決議與取捨，`DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md` 管「GPT 做 DSP／使用者試聽／不必 IR」，`RESEARCH_EVIDENCE_STANDARD.md` 管實證方法。
- **沒有刪失落歷史來源**：`docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md` 是後續 UI/REF 工作的**封存快照**，`docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md` 是決議來源追蹤；不是新 GPT 每輪必重讀的執行指令。
- 原始產品聊天的**可見決議**已寫入 `docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md`；中間部分訊息缺逐字稿，仍為 `PENDING-VERBATIM`，不得聲稱全部逐字 100% 復原。
- 本輪僅改**文件**，不變更 UI bitmap／C++ DSP／WASM／VST3／Factory Preset／CI 門檻或自動化。完成後新的 commit/PR 應以 live GitHub 為準，不在本檔硬寫會立刻失效的最新 HEAD。

## 上次已確認的實際庫存（**快照，非保證現況**）

- Repo：`ureia-dev/SOURCERUNE`，**Public 單一 repo**，Native VST3＋WEB TEST 同等主線；**不回到雙 repo**。
- 2026-10-08 前次主線樹掃描：PNG **793** = Shared **224** + UI_01 **224** + UI_02 **224** + ReferenceSheets **6** + Runtime **113**。舊 V2 **672 張 semantic + 6 張 atlas** 已入 GitHub；`PNG=0`／789／791 是已過時的不同時間點報告。
- 224 種初代 semantic：SOURCE **64**、TRANSMISSION **24**、WALL/COVER **32**、SPACE/ENVIRONMENT **56**、Scene Hero **48**。**後續 Factory 74 Active**（50 核心+24 恢復）；`SCN_049–074` 需 **26×3＝78 張獨立 Hero**，不能因 preset ID 存在就稱 artwork 已交付。
- P0／P1／P2 Runtime chrome 曾完成 **33／52／26** 張，隨後另有元件達 113；精確檔案以 `Assets/UI/Runtime/*manifest*.json`、`docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md` 與 live tree 為準。
- 歷史已完成：V5/V6 等比例 UI geometry、UI_01/02 reference MD/JSON、四卡 520px 關鍵修正、部分 Web/Native layout parity、Web preview workflow、PNG 補齊；**禁止因讀到舊交接就重新造圖或回退版面**。

## 尚未被真實驗收的主要工作

| 方向 | 真正需要的完成證據 | 優先注意 |
|---|---|---|
| UI_01／UI_02 微像素收斂 | 核准 full REF 對照、各元件局部 1:1 overlay、狀態/座標/材質、Web/Native 實際畫面 | 查 `docs/product/reference/`、`REF_COMPONENT_GAP_AUDIT.md` 及最新分支；不要把 CSS 值當真 REF |
| 26 個新增 Scene Hero | `SCN_049–074` 各 Shared/UI01/UI02 **78 獨立 PNG**、manifest、尺寸/完整性/美術驗收 | 不能裁圖集代替獨立製圖 |
| 真正聲音引擎 | C++ DSP 可編譯及可試聽；WebAssembly＋AudioWorklet、Native VST3 host automation／recall／offline bounce、低 CPU/固定 PDC | GPT 主責自主建模，使用者只負責聽感，不必交 IR；未跑就 `PENDING` |
| 音訊驗證與 Preset | 真 LUFS、Golden/Native-Web Parity、phase/latency/CPU、74 Factory 實際聽感與 Scene mapping | UI/data 存在不等於 audio DSP 和 audition 完成 |
| 跨論壇研究資料 | 可追溯的真實 `candidate/reviewed/independent/dedup/retained` 和 URL／參數／搭配統計 | 10k→1k 是研究起始目標，`docs/research/EVIDENCE_LEDGER.md` 仍需實際填充 |

## 下一個 GPT 的續做步驟

1. 先讀 [AGENTS.md](AGENTS.md) 的順序，**重查** `main` HEAD、open PR、分支、CI run/jobs/steps、Pages URL/commit、最後成功 checkpoint。
2. UI 如果涉及早期分支 `ui/ui01-action-pixel-closure-v1`（歷史曾有 CP87），先 **compare 最新 main**，判斷已合併／已被新實作取代／尚有唯一真缺；不得從 CP01 重做。歷史 PR #24 已合併，相關細節見封存全文。
3. 只對**當次使用者指令的目標**動手；研究、DSP、UI pixel、Scene Hero 各自單一工作線，不跨題混做；小步 commit/快速驗證，再由 GPT 自行安全 PR/merge/deploy。
4. Fast 日常且最小必要；Deep/Release／Host Safety 壓測依 `PROJECT_RULES.md` 取得明確授權。相同錯誤兩次停止重跑查根因；外部 runner/空 steps 標 `EXTERNAL-BLOCKED`。
5. 回報 branch、SHA、PR/CI、部署（Web 實際 URL／VST artifact）、本步實作與測試／下一步；**未確認的事不報 PASS**。

## 資料來源與更新規則

- **永久**：`PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、`docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md`、各專業規格；`docs/research/RESEARCH_EVIDENCE_STANDARD.md` 專管研究方法。
- **動態**：本檔只記最後 checkpoint、經 live 驗證的資產數/功能測試/PR/阻塞；每完成大步更新，不複製一整段永久規則。
- **歷史／追溯**：`docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md`、`docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md`；過時數值按本輪最新實查修正**動態檔**，不偷偷刪原始歷史證據。
