# SOURCERUNE DSP 主責、素材來源與聆聽驗收契約

> **永久產品製作原則，優先級與 PROJECT_RULES.md 的實證研究、安全測試及 VST3/WEB 同步規則並列。**
> 這份契約把使用者在多次討論中要求、卻未在永久文件寫清的**工作分工**明文化。這是「誰負責工作」的要求，**不是宣稱目前 DSP 已完成**。任何後續 GPT 必須讀本文，不可把工程工作退回要求使用者做。

## 1. 角色分工——GPT 做工程，使用者做最後聽感決策

**GPT／開發助手負責**（在現有工具、合法資料與實際存取權限內自主完成）：

1. 多來源研究聲學、音訊後期真實需求、開源 DSP／學術資料、演算法候選與物理／感知合理性。
2. 設計、實作、修正及維護 SOURCE、TRANSMISSION、CONDITION、WALL/COVER、MOTION/DISTANCE、SPACE/ENVIRONMENT、AMBIENCE、INTELLIGIBILITY、EQ/TONE 等實際 **C++ DSP**，以及必要的 State／Parameter／Preset binding。
3. 以一個 C++20 共用聲學引擎供 Native VST3 和 WebAssembly/AudioWorklet 使用，保持處理順序與 host automation／state recall、Offline render、sample-rate behavior 的一致性。
4. 建立可重現的合成測試訊號／合法可用的測試音源、客觀測試、頻響/相位/脈衝或階躍響應/延遲/峰值/失真/alias/不連續/CPU/記憶體的量測與追蹤（按已有 CI 強度與授權）。
5. 選擇與驗證生成式／參數化聲學模型、程序化反射／混響、source resonances、材質透射、距離、多普勒、ambient textures；合理最小化外部 IR/素材依賴。
6. 寫程式、調參候選、版本管理、最小測試、Fast CI、PR、修 conflict、必要的 VST3／WEB 部署並產出使用者**可實際試聽**的構建／Preset。
7. 聽感回饋後將「使用者聽到的問題」轉成可重現測試與候選修正，小步迭代；不得把任務說成由使用者去編 DSP、測相位或自行蒐集 IR。

**使用者負責**：
- 試聽 GPT 交付的音效／實際 VST3 或 Web 測試成品；指出例如「不夠遠」「移動不自然」「太假」「像 EQ 而不是裝置」或接受／拒絕結果。
- 決定主觀聲音方向與是否核准重大算法、產品行為、Factory 變更；選擇是否提供個人特殊素材**完全自願**，不是啟動條件。
- 原則上**不需要替 GPT 收集 IR、錄製特定場地、提供實測資料、下載第三方素材、寫 DSP、做工程測試、替 GPT 修 GitHub CI／手動合併或手動部署**。遇到真正不可代行的權限、法律、付費、私人檔案存取或不可逆動作時，具體說明缺口；不要虛構已完成。

這不是叫 GPT 宣稱具有人的主觀聽覺能力。**客觀自動驗證由 GPT 實作；真正的主觀試聽評價以使用者為最終依據。** 若當下無可運行的 DSP 或構建能力，須標 `PENDING` 並留下可恢復工作，不得以空白 UI／文件代替完成品。

## 2. 「不用你給 IR」的精確意思

- **不得以「請你先提供 IR、房間錄音、麥克風量測或數據庫」作為一般產品開發必要前提。** 預設依已有開源知識、可合法引用的研究、聲學模型與自行產生的測試訊號開發。
- SOURCE／WALL/COVER／SPACE／AMBIENCE **優先生成式、參數式或可解釋的模型**；使用者沒有 IR 一樣要能開發與使用其核心功能。IR 或實測資料可作**研究、校準、客觀對照**，但不是使用者必交的資產，也不能沒有來源或權利就拷入可散布產品。
- 歷史概念草圖曾寫「大量真實後期 IR」；它是**早期設計參考**，不能凌駕這份正式責任／素材契約。不是絕對禁止一切 IR 技術：需要 IR 作校準／特殊可選功能時，應先比較物理合理性、CPU／延遲／素材授權與量測需求，再經使用者批准產品變更；不能把「沒有 IR 就不做 DSP」變成藉口。
- **不得假造 IR、實測房間響應、合法性／授權證據或客觀測試已成功**；開源 code license、measurement data 及第三方錄音的權利分開審核。
- 若特定輸入音檔是最終使用者的私有工作素材，並非演算法研發所必需；測試階段使用程式化激勵訊號或有合法授權的示範素材。可交付成品後再由使用者自行用喜歡的聲音做主觀聆聽。

## 3. 完成 DSP 任務的實際交付標準

「我做 DSP、你聽」代表**要有真的可執行／可試聽的音訊流程**，不能只交設計稿：
- algorithm design / references 和原理、已實作的 source files、parameter/control/state mapping。
- 最小客觀 test setup，註明 sample rate、input、expected behavior、相位/延遲/失真/alias/CPU 等測量；失敗案例要留存。
- Native/Web actual build status：`BUILD-PASS`、`NOT-BUILDABLE`、`RUNTIME-TESTED` 或 `PENDING`，分開回報；沒有 host run 不說 VST3 正式可用。
- 可試聽 artifact／Web 音訊流程或 VST3 build 的真實連結／操作；未建成時不捏造路徑。
- 提供專業情境／Preset 對照例，可被重現；等使用者聆聽回報再修正，不把主觀喜好說成已有盲測證據。

## 4. 與現有專案規範的關係

- 產品需求／算法／參數決策依 `PROJECT_RULES.md` 與 `docs/research/RESEARCH_EVIDENCE_STANDARD.md` 的持續多來源實證；研究是持續工作，不是限八小時。
- 真正 DSP signal flow／CPU realtime 約束依 `docs/architecture/DSP_BEHAVIOR_CONTRACT_V1.md`、`docs/architecture/STRUCTURE_REVIEW_100.md`；IR 不得在 realtime callback 載入，大量動態 IR swapping 應避免。
- 使用者提出「GPT 負責 DSP」是**長期分工授權與期待**，不是允許每個 UI 小任務無關地改 DSP、Preset 或 test rounds。尊重使用者當次工作範圍；若目前是 UI pixel audit 只做 UI，不偷改音色。
- 日常 Fast、手動 Deep／Release 與壓力／安全測試次數嚴格遵守 `PROJECT_RULES.md`，不能因要音質更好就自行增加。
- 每次實作須可恢復、每小步 checkpoint；有真 blocker 誠實回報；不可讓使用者承擔本應由開發者處理的工程細節。

## 5. 證據／決議來源與不確定性

- **本次對話可見的明確使用者主張**：「你做 DSP，我只負責聽，我不用給 IR」，並指出此前長期討論未被完整收入最高原則。
- **已在 GitHub 記錄的技術方向**：`docs/architecture/DSP_BEHAVIOR_CONTRACT_V1.md` 明載 prefer generated/modelled Source/Cover/Space/Ambience、外部 measurements 作 R&D／calibration；`docs/architecture/STRUCTURE_REVIEW_100.md` 禁止 realtime IR loading、避免持續換大型 IR；`docs/architecture/PROJECT_STRUCTURE.md` 明載 VST3／Web 一份 C++ 核心。
- 過往完整逐字討論可能不在當下 GitHub／工具可存取範圍，**不能聲稱已逐字復原所有舊訊息**。本文件記錄此刻使用者明確表述、GitHub 現有契約與能被交叉支持的分工；更早來源若補回，應用 checkpoint 更新溯源，不要憑空引述。

**不可再把「IR 需要使用者提供」、「DSP 實作需要使用者自己處理」寫成預設工作流程。**
