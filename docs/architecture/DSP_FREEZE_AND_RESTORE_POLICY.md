# SOURCERUNE — DSP 嚴格凍結、核准與還原點制度

> 生效決議：2026-10-10。最高優先；適用 GPT、Codex、Copilot、人工開發者、所有分支、PR、Web／VST3／WASM。此制度**取代**任何先前籠統的「GPT 可自行改善 DSP」默示授權。目標：不經精確確認，嚴禁修改已存在的 DSP 聲音演算法。

## 1. 最高限制：預設唯讀

- **未取得使用者對本次具體 DSP 變更的明確核准，禁止修改、重構、優化、移動、刪除或用等價演算法替換任何現有聲音演算法。** 「修小 Bug」、「保養」、「比較好聽」、「降低 CPU」、「統一 Web/VST3」、「建置順手」、「配合 UI」皆不構成自動授權。
- DSP 工作在授權前**僅可**唯讀分析、量測、比較、研究、提出方案及草擬驗收計畫；不能先改後問。已有的「GPT 主責 DSP 工程」只是責任分工，**不等於開放修改授權**。
- 受保護範圍包含 `Source/DSP/**`（含 Tone、濾波係數、參數平滑、失真、訊號處理流程），Web WASM／AudioWorklet 的音訊計算、Native VST3 音訊處理／參數映射、公開參數語意與會改變聲音的 Preset 數值和 processing order。不能靠改檔名、移到 UI 或改產物而繞過。
- 介面、圖資、建置流程修改不得順手改動上列音訊行為。新增功能若必須更動既有 DSP，**先停在提案**，由使用者確認受影響範圍與方案。
- 使用者要求「研究／計算／繼續／修 UI／部署／編 VST3」不等於授權 DSP 修改；僅明確指向該次 DSP 變更的核准才算。

## 2. 三次精確核對（每次新變更必做）

1. **改前核對（PRE）**：鎖定 live main 與實際工作 HEAD；列出將改的檔名、受影響參數 ID、算法、訊號路徑及使用者同意的具體目標；保存舊版碼與客觀測試基線（頻響、相位、group delay、latency、peak/RMS、null/parity、CPU、不同 sample-rate／mono/stereo／offline／bypass，取實際適用的項目）。沒有測量能力時標 `BLOCKED`，不得改。
2. **獨立核對（REVIEW）**：在動筆前再讀一遍原始算法、既有核准聲音契約、Web 與 Native 的路徑和與其它模組交互；確認不引入未授權的參數、聲音變化、重新排序或安全測試增量。寫出變更前後預期差異與容許誤差、回退條件；取得使用者針對**確切方案與檔案範圍**的明確核准。
3. **改後核對（POST）**：只修改經核准最小範圍，逐行 diff，重跑既有授權的最小客觀測試／Web Native parity；對目標內改變提出數字與證據，目標外必須證明沒有聲音差異（或揭露誤差與阻塞）。沒有真實可重現結果、相位/延遲/CPU 有問題、使用者聽感未核准則標 `PENDING`，不合併、不部署。**三次核對不是憑空宣稱做了三輪推算；各次都需附可核對紀錄。**

## 3. 100% 強制 DSP 還原點（先備份，後修改）

每一次**實際 DSP 修改之前**，皆須獨立建立新的 GitHub 遠端還原點；不接受「Git 本來就有歷史」、「舊的還原點還在」、「PR 能 revert」當作已做備份。

必須依序：
1. 取當次**未改之前**的來源 commit 完整 40 碼 SHA（pre-change SHA），確定工作樹乾淨、來源與依賴可追溯；以該 SHA 為基礎建立**單獨遠端 ref**，命名如 `dsp-restore/YYYYMMDD-HHMMSS-<sha8>`，最好同時建立不可變的帶註記 tag；**成功 push GitHub 並由遠端重新讀回 ref SHA == 原始 SHA** 後才准動程式。
2. 寫入本次獨立 DSP 變更記錄：核准來源、精確用途、pre-change SHA、遠端還原 ref、受保護檔案清單／檔案 SHA-256、基準音訊測試及預期差異、測試和復原步驟。
3. 如同一個工作中需要**再次修改 DSP**（即使只是第二次細微調整），修改之前又須以當下未改的 commit **新增新的遠端還原點**。不可共用第一次的還原點冒稱 100%。
4. 還原必須**從實際遠端 ref 讀回**，在隔離工作分支驗證檔案/建置/聲音；禁止把 force-push main 當作一般還原。失敗時先停止，依本次的 pre-change SHA 逐檔復原受影響範圍，再檢查其他平台及狀態／Preset。
5. **任何一項缺少：不准寫入 DSP、不准合併、不准部署。** 建置成品、生成 WASM binary 或修正音訊路徑若會改變 DSP 行為，亦須按同等標準檢查。

### 初始只讀基準（不代表發生了 DSP 變更）

- 2026-10-10 查證當時 `main` 的 pre-policy commit：`feff1774ab2f63e8f8a2aea9b982fa418689c583`。
- 已建立獨立 GitHub 遠端基準分支：`dsp-restore/baseline-20261010-feff1774`，指向同一個 commit；保存**整個 repo 當時的 Git snapshot（包含 DSP）**，而非只存聊天記憶。
- 此基準**不能取代未來每一次修改前另建還原點**。遠端分支如被刪除或移動仍有遺失風險；需保持不刪、不覆寫，最好另設 ref 保護／tag。

## 4. GitHub 防護與例外

- 一般 Fast PR 加入唯讀聲音路徑 guard：凡涉及受保護的 source、Web Worklet/WASM、Native 處理/參數檔，**預設直接失敗**，即使該 PR 有其餘綠燈。核准的 DSP 任務仍需另外經確認與可稽核的限定例外流程，**不得在同一筆 DSP PR 偷改 guard／CI 使其放行**；不可信「變更紀錄裡自己寫已核准」。
- PR guard 只是阻擋一般合併，**不是能阻止所有人直接推 main 的不可竄改鎖**。必須在 GitHub repository ruleset／branch protection 另行要求 main 只能經 PR、Fast guard 必須成功、禁止一般推送及繞過；獨立還原 ref 的刪除／改寫也應禁止。**沒有實際設定和驗證上述保護時，不得聲稱 100% 自動阻止任何人改 DSP**。
- 必須取得授權的合法 DSP 更新另立一筆工作線，先存每次遠端還原點，附 PRE/REVIEW/POST 證據，最後才由使用者確認是否放行合併。不能拿 CI success 取代使用者對演算法改動的核准。

## 5. 新對話標準回報

每次 DSP 相關 PR 須明示：`DSP changed? YES/NO`、`user approval proof`、`PRE/REVIEW/POST status`、`pre-change SHA`、`remote restore ref + verified SHA`、`affected files`、`Golden/parity/phase/latency/CPU evidence`、`DAW/Web outcome`、`rollback procedure`、`pending`。沒有依據就寫未確認，**絕不宣稱安全、已備份或聲音不變**。

此規則的權威入口是 `PROJECT_RULES.md`、`AGENTS.md`；如與先前泛稱「GPT 主責 DSP」或「自動持續 DSP 研發」衝突，**以本次 DSP 凍結指示優先**。
