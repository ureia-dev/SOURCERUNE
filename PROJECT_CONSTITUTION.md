# SOURCERUNE PROJECT CONSTITUTION — 永久製作原則與完整規格

## 2026-10-10 最新核准決策：EQ 固定 ±24 dB 的高精度 Web 圖形（取代 ±12）

右下小 EQ 及內建 Zoom In 放大視窗須採 **同一套真實 HPF／LPF／Band1–3 EQ**。其顯示固定 ±24 dB，不再自動縮放；**實際 Band Gain 範圍仍為 −18～+18 dB**，不得為了圖改演算法。按核准專業 EQ 示意圖，節點要細小等比例圓形（Web 實測 mini 4.4–4.5 px、Focus 6.9 px），保留獨立透明滑鼠命中區以方便拖曳；曲線細緻、彩色柔和漸層、網格低對比。Focus 11 個 Freq/Gain/Q 旋鈕必須對應既有同一份狀態／Undo／AudioWorklet，控制方式沿用 VVChain UI_A 的滑鼠操作語意，但嚴禁搬 VVChain DSP。未實作的 24 dB/oct 滤波斜率、額外 Band Bypass、Phase/濾波 Type 不可呈現成假功能，現有 HPF／LPF 仍固定真 12 dB/oct。主實作 [PR #104](https://github.com/ureia-dev/SOURCERUNE/pull/104) 已合併，Fast #38047626674 PASS，真 Web Preview #38047739428 UI_01/02 eqFocus/eqMouse/geometry PASS。Native 自訂 EQ GUI 仍 PENDING；DSP unchanged，未觸發新 DSP restore。完整可操作數值規格與 10+10+10+2 證據參照 `docs/product/UI_FUNCTION_CONTRACT.md`、`docs/product/reference/EQ_24DB_MOUSE_PRECISION_AUDIT_20261010.md`。

> **永久規範；任何 GPT、Codex、GitHub Copilot、開發者、排程、PR、分支、交接與後續新對話均應遵守。**
>
> **唯一專案：`ureia-dev/SOURCERUNE`。** 不要與 VVChain 或其他專案混淆。
>
> **本文保存「做什麼、怎麼做、必須有什麼、永遠不能做什麼」。研究持續進行、不受歷史八小時限制。不儲存可過期的最新 commit/branch/CI 作為事實。當前進度只看 `SOURCERUNE_MASTER_HANDOFF.md` 與 GitHub 最新狀態。**
>
> 準則優先序：使用者當次明確要求及權限 → `PROJECT_RULES.md` 的 CI／安全次數與 VST3-Web 同步規則 → **本永久規範** → 區域詳細規格／已確認 REF 檔 → 近期進度交接。若互相衝突，先確認而不覆蓋，留下修訂 checkpoint。
>
> **本文件不應每次交接重寫一份。** 接手的人都應從 repo 根目錄 `AGENTS.md` 進入，並直接閱讀本永久規範；每次進度變更應更新 HANDOFF 而不是竄改已核准的長期準則。

> **原始決議來源警示（2026-10-08）**：使用者已指定 SOURCERUNE 最初完整產品討論正本為 `https://chatgpt.com/c/6abfd770-e594-83e8-adc4-992fa6ed47b3`。這是私人聊天連結，當前尚未讀到全文；此前的完整交接檔是後續聊天整理而非原始正本。詳見 `docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md` §0A。**永久原則已保存可確認部分，但不能稱所有最初討論已 100% 覆蓋**。若日後取得正本全文，需逐訊息核對並把確認的新最終決議修訂於本憲章及相關規格。

## DSP 最高優先凍結補充決議（2026-10-10）

正式核准的新規範：現有 DSP 聲音演算法在沒有**使用者對本次精確變更的明確核准**前一律不准動；獲准後改前、獨立再審、改後須三次核對，**每次實際修改前必須另建立且從 GitHub 遠端驗證一筆 DSP 還原點**。任何自主 DSP 研發責任、舊版規劃、UI/CI 建置授權均不能取代此條。細節、範圍、例外、驗收及不宣稱虛假保護等，單一權威見 [DSP_FREEZE_AND_RESTORE_POLICY.md](docs/architecture/DSP_FREEZE_AND_RESTORE_POLICY.md)。

## 開始任何工作的固定程序

1. 讀 `AGENTS.md` → `PROJECT_RULES.md` → **本文件全部適用章節** → `SOURCERUNE_MASTER_HANDOFF.md`（僅當前進度）→ 受影響子系統 authoritative MD/JSON/manifest/程式碼。
2. 即時讀 GitHub `main` HEAD、工作 branch、open PR、mergeability、CI run/job/steps、Preview/部署、相關 commit；以最後成功 checkpoint 繼續，不從頭重做。沒有真正核對不能說「已完成」。
3. 每輪 2–4 個或使用者指定量的相關微步驟，**每一個可驗證小步都獨立 commit/checkpoint**；對話易斷線，應在形成可持續成果後立即回報，不要長時間黑箱。
4. 需變更 UI/DSP/CI/資產前先確定權限／目的；能自行安全開 PR、合併、部署就自行處理；同錯 2 次停止盲目重試，查根因；外部 runner/infra 明確標記外部阻塞。
5. 只用**繁體中文**回覆使用者。任何未知寫 UNKNOWN／APPROX／PENDING／BLOCKED，不能推測成 100% 完成。

## 其他容易被交接摘要遺漏的已核准開發方向

- **單一 repo**：DSP、VST3、Web、UI、Presets、tests 與文件採 `ureia-dev/SOURCERUNE` 單一 repo，同步修改與驗證，避免拆出第二套來源造成 VST／Web 部署延遲；權威技術文件為 `docs/architecture/SINGLE_REPO_PUBLIC_POLICY.md`。
- **Plugin 介面縮放**：先在核准 REF 原生尺寸鎖定 pixel geometry，再以等比例縮放／Fit Window 方式支援不同視窗，不要一改為滿版就扭曲原始位置、旋鈕比例或文字；先前方向包含約 75%～125% 的目標區間，但**實際支援範圍以最新 runtime/build 驗證，不能只靠文件宣稱已完成**。
- **正式旋鈕美術製程**：先前 UI 製作方向偏好可重製、參數化的 Blender／3D 類比金屬質感、固定燈光和材質與多 frame 合成；不是每次要求修改時重新生成不一致的新 AI 外觀。此方向有較早討論摘要，尚未取得每一則逐字原文，參數或工法變更需和現行核准 REF/manifest 交叉核對，不得憑摘要取代使用者最新核准圖。
- **不要混同個別概念圖、核准 REF、實際 runtime**：早期五卡 UI01 與其他音效空間草圖只供歷史參考；正式座標、啟用/停用狀態與材質需以核准 REF 和已驗證 JSON/spec 為準。
- **工程驗證等級分開**：設計契約／素材庫存在／UI rendered／DSP build／VST3 host 可用／Web audio 可用／使用者 audition 核准為不同 gate。聲稱「已完成」必須指出哪一 gate、哪一個真 artifact 和 SHA。

## 永久工作責任與執行時間界線（不得從交接遺失）

**角色分工是正式最高產品原則，不只是單次工作安排。** SOURCERUNE 的 DSP 研究、聲學算法選型、程式設計、測試訊號與客觀驗證、實作修復、音質／CPU 最佳化、Native VST3／WEB parity、可試聽成品準備，**由 GPT／開發助手在有工具和權限的前提下主導並完成**。使用者負責實際聽成品、提出聽感差異、接受／否決聲音方向；**無須提供任何 IR、場地錄音、麥克風量測或親自做技術測試作為一般研發前提**。

優先建模／生成 SOURCE、WALL/COVER、SPACE、AMBIENCE，不以 IR 為強制核心依賴；合法的 IR/measurements 可作研發或校準參考，不從使用者索取，也不可在未知授權下打包。早期含「大量真實 IR」的概念屬歷史視覺提案，**不得覆蓋最新已核准的 GPT 主責研發、使用者只負責試聽**。真正音訊驗證必須有可重現程式／資料與試聽成品；空有 DSP 規格不等於 DSP 已編譯／驗收。

**立即執行比錯誤排程優先**：用戶直接要求「做、修、繼續、現在跑」就當回合做，保持小步 checkpoint；任務大可多批連續完成，**不是將一個可完成指令擅自切成八小時或每小時一個動作**。只有用戶明確說「排程」才使用定時工作；任務時程不能變成產品研究時間上限，也不得以排程代替本輪實作。若用戶只是詢問／要求只讀檢查，不得擅改。

本次追溯修正詳見 `docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md`，永久領域契約見 **[docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md](docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md)**。沒有可取得的全部失落逐字稿時，只能宣稱**已核對可用來源及標記缺口**，不許寫 100% 全部歷史已復原。

## 最高製作原則：SOURCERUNE 由真實大數據需求與工程驗證決定

> 這是**產品方向、功能取捨、參數設定、Preset／場景選擇、聲學模型**的最上層決策原則，不是可做可不做的市場調查。**完整研究方法必讀 [docs/research/RESEARCH_EVIDENCE_STANDARD.md](docs/research/RESEARCH_EVIDENCE_STANDARD.md)**；最高優先限制亦寫於 `PROJECT_RULES.md`。所有後續 GPT 都要先照此原則理解整個產品。

- **先大量蒐集、再整合、再決定**：依使用者要求**不設八小時截止、持續循環**的八個研究維度跨專業音訊／後期／game-audio 論壇與書籍論文，初始里程碑約 **10,000 候選相關討論／頁面**，必須展開檢視、canonical URL 去重、群聚、交叉論壇驗證，初期精選約 **1,000 筆真正反覆、多人需求或高度獨特有用的證據**，之後持續增補與更新。這是初期里程碑，非已達成宣告或永久上限，不能湊數、編論壇、假 URL、假用戶比例。
- **論壇範圍**：Gearspace/Gearslutz、KVR、Avid DUC、Reddit r/AudioPost / r/SoundDesign、Creative COW、VI-Control、Cockos/REAPER 與 game-audio；另以開源 DSP、論文、學術／聲學書籍、官方技術 manuals 查證實現可行性。廠商行銷是功能參考，不能算需求人氣。
- **保留真正高價值資訊**：重複提問、抱怨、工作流程不足、設備與場景典型用途、實際工程師願意使用的參數、起始值／可用範圍／數值分布、模組先後順序／搭配鏈路、跨功能問題、相位／音質／CPU／host automation 經驗；並保留少見但非常有特色的需求，不因量少就抹掉。
- **排序要有根據**：跨社群重複 > 同社群多位獨立使用者 > 長期高互動討論 > 具體參數搭配 > 稀有高價值。所有分類、來源數、獨立數、參數、決策記錄要留 machine-readable evidence／URL／去重 key。沒有讀到的來源不能宣稱已研究。
- **核心 40／30／30**：SOURCE/EMITTER（發音體／裝置）**40%**，MOTION/DISTANCE（移動／距離）**30%**，SPACE/ENVIRONMENT（場域／遮蔽）**30%**。這是產品核心研究／代表性設計的優先級，**不是 Factory 只能有 50 個或能刪掉 CONDITION 等模組的配額**。
- **使用者已核准保留 74 個 Factory Preset**：50 核心（20/15/15）曾配 24 reserve，但使用者明確要求 24 個也恢復 active，不可任意刪除電話／無線電／PA／cover 變體。先檢視 `docs/research/PRESET_PORTFOLIO_REBALANCE_2026-10-05.md` 與最新 preset JSON，再決定新增／修改；數值只是 audition 起點，不等於「公認最佳參數」。
- **產品結果還要物理與 DSP 正確**：重複被推薦不代表聲學正確；用聲源頻響／傳輸失真／材質透射／移動與 Doppler／direct-early-late／戶外反射等物理模型、可信開源算法、真量測與受控聆聽比較，不可只用「AI 估算很多次」取代測試。工程方法要低 CPU、可靠 latency、同一 C++ DSP 對 Native/Web 行為一致。
- **必須先比對現有功能與 74 Preset 才談缺口**：每項需求標記 `already-supported`、`partially-supported`、`missing`、`duplicate`、`research-insufficient`、`audition-pending`；保留數據、工程與最小可重現案例，不可用個人偏好直接替換核准設計。
- **不可虛報進度**：曾有歷史八小時研究摘要與加權重排，但 `docs/research/EVIDENCE_LEDGER.md` 仍記錄大型證據填充未完成。**無可核對 10k 原始池／1k 獨立留存證據，不准宣稱大數據研究 100% 完成。** 當前研究統計必須分別記 candidate/reviewed/independent/deduplicated/retained 真實數字。
- **研究不等於擅自部署／壓測**：研究結果進 evidence ledger 和決策表；實作需符合使用者當次授權、既有 UI/DSP/Factory 鎖定與 Fast/Deep/Release 次數規則。不要因八階段研究就自行觸發 100 次 Release。
- **跨對話永久保存**：每次新研究、產品決策必須更新本憲章的相應決策與 `docs/research/` 規格／資料，禁止只留在一次聊天交接。AGENTS.md 應迫使每篇 GPT 一開始就先讀本節和研究標準。

### 原始產品討論：不可遺漏的設計理由

**[最初產品決議對照](docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md)** 從原始可見對話依主題復原：Speakerphone 常用核心與 ADV 簡化 LFO；FutzBox／AudioThing Speakers／Audacity 合法功能借鑑；SOURCE／COVER／SPACE 自主建模與程序化無限 Ambience、背景交談語言特徵；真正 Distance/Motion 與 Pro Tools 級 Automation；1× native rate、極低 CPU；全球音訊工程師定位；UI_01/UI_02 可重排元件；224 語意圖資與後續 74 Factory。**SOURCERUNE 是產品型號／專案名稱，品牌／公司名稱未定。** 此檔只保存最終有效決策，不用舊配色／早期圖集／已被取代方案覆蓋現行 REF。

新 GPT 依序用研究 evidence standard 判斷「為何要做」，DSP ownership 判斷「誰做與如何試聽」，原始決議對照理解「最初核准什麼」，最後以最新 Factory／REF／真實程式及 HEAD 驗證「目前實際是什麼」。

## 原則與規格正文

本文件將 2026-10-08 完整交接中屬於**長期製作契約**的內容完整收編，與歷史進度拆開。章內曾提及的舊測量與改善歷程僅用於解釋**為什麼規格如此**；最新 runtime/commit/測試一律重新查證。

## 永久產品定位、音訊引擎與架構

**SOURCERUNE** 是音訊後期／世界化（worldizing）／聲學場景模擬處理器，讓聲音像真的從不同來源、傳輸方式、遮蔽物、距離、移動路徑與真實空間傳出；不只是換一個混響、加 EQ 或做裝飾性的空間 UI。

- 正式同等主線：**VST3 Native 與 WEB TEST**。UI_01、UI_02 是兩種正式 UI；應使用相同的 DSP、parameter ID、scene/state schema、preset 與處理語意。不可以「Web 一套聲音、VST 一套聲音」。
- 核心規劃：共用 **C++20** DSP/scene/state；WEB 透過 **WebAssembly + AudioWorklet**，實際音訊不應放在 UI thread。AAX 目前不是主線，只能列未來選項，不可因此重構正在完成的主線。
- 主要處理次序：**INPUT → TRANSMISSION → SOURCE → CONDITION → WALL/COVER → DISTANCE/MOTION → SPACE → AMBIENCE → INTELLIGIBILITY → EQ/TONE → MIX/OUTPUT**。真正執行次序以 engine contract / 已實作程式及測試證據核對；Signal Flow 顯示不得造假。
- 即時與 CPU：原生取樣率為基準、低 CPU、非必要不常態 oversample；inactive module near-zero work、hidden analyzer/UI throttling、預配置變動 delay 緩衝、音訊執行緒不得配置記憶體／鎖／I/O、可回報的固定結構延遲、平滑切換與確定性 state/seed。保留 DSP 模組化與可單測性。
- 已記錄的聲學方向：真實 source response／resonance／nonlinearity／directivity、電話與無線電傳輸失真、device condition、cover transmission loss／leak／panel resonance、直接聲與早期反射及低 CPU late field、室外地面反射與 air absorption、Doppler／移動視角、具 Seed 的 ambience。
- 使用者此段任務**授權 UI/REF/元件／部署收斂，不授權任意修改 DSP 聲音、Preset 內容、processing order、參數語意或安全門檻**。
- 完整功能、64 public parameter ID、host automation、VST/WEB parity 等以 `docs/product/UI_FUNCTION_CONTRACT.md`、`docs/product/UI_COMPONENT_MAP_V1.md`、`PROJECT_RULES.md` 為契約；未真正實作的 C++、Wasm bridge、真 LUFS、Golden parity、release build，不能因文件有契約就宣稱已完成。

---

## 使用者長期有效工作規則、GitHub 與 CI

**永久規範不再在本憲章複寫**，以 [PROJECT_RULES.md](PROJECT_RULES.md) 與 [AGENTS.md](AGENTS.md) 為準。重點不可省略：小步 checkpoint、每次核對 main/branch/open PR/CI/preview、同錯兩次先查根因、外部 runner 不盲重跑；自行安全 PR/merge/deploy；Fast 日常、Deep/Release/Host Safety 不擅跑；指令能當次做就當次做，只有明確排程才排程。繁體中文回報真實結果。歷史每小時任務的原話和日期在 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md`，**不是永久限速**。

## 正式 UI REF 五階段收斂製程

1. 逐像素讀**經核准的 UI_01/UI_02 原始 REF**（無原圖標 `APPROX`）。
2. 以 Web/Native 實際渲染圖與 REF 1:1 overlay，建立可重現的 geometry／pixel gap audit。
3. 先盤現有 `Assets/UI/Runtime` 與 Semantic／Shared 資產；只替真正缺少的 raster 材質補**獨立可拆** PNG／9-slice，其他用 live code。
4. 修可證明的差異後再渲染測試；兩版 UI 均收斂，不要用舊概念圖覆蓋正式 REF。
5. 留 checkpoint、PR、必要 Fast/CI 與真正 Web/Native 驗證；詳細 pixel／material 名單請直接查 `docs/product/reference/` 的兩套 MD/JSON 和 `REF_COMPONENT_GAP_AUDIT.md`。

## UI_01／UI_02 所有物件的像素規格與資產缺口

**所有**外框、panel、card、Knob、scale、文字／字級／baseline、icon、button states、meter、Scene、Spectrum、Motion、layer、z-index、hitbox 都要在各自核准的 REF 原始尺寸記錄 `x/y/w/h`、centers、gap、padding、父層、狀態、證據。幾何可信度 `CONFIRMED/APPROX` 與實作狀態 `EXISTS-RUNTIME/MISSING-IN-RUNTIME/MISSING-IN-SPEC/NEEDS-NEW-ASSET/CODE-DRAWN` **分開標記**；缺正式 full REF，不能只從 CSS 反推精準數字。禁止把圖片、排版規格、控制行為或測試通過混為一談。

**唯一精細數據來源**：
- `docs/product/reference/UI_01_REF_PIXEL_SPEC.md`、`UI_01_REF_COORDS.json`
- `docs/product/reference/UI_02_REF_PIXEL_SPEC.md`、`UI_02_REF_COORDS.json`
- `docs/product/reference/REF_COMPONENT_GAP_AUDIT.md`；舊測量與失敗追查在 `docs/history/`。

## 核准 REF 身分與 UI01/UI02 產品版面

### UI_01（專業工程版）

- 正式核准參考是一張有外圍說明標籤的 **1536 × 1024** 海報；需**只量內部 plugin shell**，shell 約全圖 `x=17, y=116`、尺寸 **1499 × 807**。
- **左欄正式是四張 semantic cards：SOURCE、TRANSMISSION、WALL/COVER、SPACE/ENVIRONMENT。** 歷史的五卡 `CONDITION` 版本不是此 UI_01 正式 pixel 目標，不能用它量尺寸或偷偷加第五卡。CONDITION 功能仍須在底部 macro／Advanced 等位置存在。
- 中央上是 Scene View（motion curve + distance + waveform + live source/listener/points），中央下是 Spectrum／Space Response／Signal Flow；右側是 IN/OUT 垂直 Meter／Peak-RMS／LUFS；底部七區是 Motion、Bad Signal、Condition、Intelligibility、Ambience、Mix、EQ/Tone。
- 與 `docs/product/UI_01.md`、`UI_01_LAYOUT_EXACT_V1.md`、`Source/UI/UI_01/LayoutSpec.h` 交叉驗證，不准圖省事變成裝飾性的整張背景。

### UI_02（場景視覺版）

- 正式核准參考原圖 **1672 × 941**。
- 左 SOURCE／TRANSMISSION／WALL/COVER cards；中央巨大真實空間 Scene/3D/Top、source/listener、方向路徑、**大 Distance Dial** 與 Motion deck；右 SPACE/ENVIRONMENT／Ambience；上方 preset、A/B、工具、IN/OUT 橫向小 Meter；下方 Bad Signal／Condition／Intelligibility／Mix／EQ Tone。
- 強調深度／前後／路徑與實景素材，不是「把 UI_01 壓扁重排」。細節以 `docs/product/UI_02.md`、`UI_02_LAYOUT_EXACT_V1.md`、`Source/UI/UI_02/LayoutSpec.h` 為準。
- 維持 UI_01/UI_02 同功能、同 DSP state；不同只在呈現及控制排版。

### 正式 REF 的可用性限制

取得正式核准 UI_01/UI_02 全頁 REF 原始像素是進行 fine pixel scan 的前提；若 GitHub repo 只有 semantic atlases／styles，絕對不可偽稱能精掃全頁。當前是否擁有正式 full REF 與阻塞狀態，以最新 HANDOFF／實際上傳附件查證。

---

## 已核准幾何基準與量測邊界慣例

**所有曾確認的細數值以最新核准的 REF MD/JSON 為準**，不得從過時 handoff 回寫程式。重要歷史修正：UI_01 左四卡使用 `[top,bottom)` 邊界規則，**520px**（不是舊 521px）；plugin-local SOURCE `y58/h136`、TRANSMISSION `y201/h132`、WALL/COVER `y340/h132`、SPACE `y478/h97`，末端留 3px。UI_02 的歷史錨點約 Distance dial 300px、Motion face 54px、bottom macro face 76px；這些只作**已核對舊 checkpoint**，新 UI 變動必須先比對 live MD/JSON/commit 再更動。

1:1 渲染／overlay 的 parent coordinate 與 box model 必須一致；不允許為了滿足總和擅自增減 1px。所有主框／卡座標細節請查 `docs/product/reference/`，而不是本文件重複保存一張會變舊的表。

## 影音世界觀、美術風格與獨立素材標準

**正式美術依 [VISUAL_STYLE_V2.md](docs/product/VISUAL_STYLE_V2.md) 和核准 REF**。專業高價位的聲音後期產品感：克制對比、霧面材質、統一透視與構圖、清楚辨識 emitter 與 acoustic space；拒絕 AI 味、超高反差／HDR、淺景深／bokeh、濫用 teal/orange、過度霓虹。保留場景張力與情境訊息。**ReferenceSheets／整頁 REF 只能比對，不得裁下當 runtime UI**；icon、frame、knob、scene hero、9-slice 各自獨立可重排。字／值／meter fill／EQ／Spectrum／Motion／Source/Listener 必須 live code。

## SCN_049–074 的 26 場景／78 個 PNG 生產契約

**Factory 74 Active** 已核准；既有 48 Hero 不等於 74 Hero 都完成。新 `SCN_049–074` 要按 `docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md` 與 `Assets/UI/scene_hero_049_074_manifest_v1.json` 製作 **26 個真正不同的場景 × Shared/UI01/UI02 三個尺寸 = 78 個獨立 PNG**，每張有語意場景、原生設計與 crop 驗收；Atlas 可作 review，不能切成低品質 runtime 假成品。檔名/heroId/尺寸/CRC/美術/State 映射、User audition 各自獨立驗證，未做就 `PENDING`。

## 功能、互動控制、VST3/WEB 等價性

**UI_01、UI_02 皆不可缺功能**：Global bypass／IN-OUT／Mix、Factory74＋User preset、A/B/C/D、Undo/Redo／Copy/Paste／Import/Export；SOURCE 64、TRANSMISSION 24 與 Bad Signal、CONDITION（NEW/USED/OLD/DAMAGED、Rattle、Buzz、Compression、Imbalance、Wow/Flutter、Intermittent）、WALL/COVER 32、MOTION/DISTANCE（Static/Approach/Pass-by/Leave/Manual、Start/Closest/End、Speed/Doppler/Width/Perspective、DAW sync）、SPACE 56、AMBIENCE（Duck、Seed、Loop）、INTELLIGIBILITY、EQ/TONE、FEEDBACK、GENERATORS、實際 Analysis/Spectrum/Space Response/Peak-RMS-LUFS／Signal Flow。詳見**唯一控制權威** `docs/product/UI_FUNCTION_CONTRACT.md`、`Web/App/data/ui_controls.json`、Preset JSON／Stable Parameter registry。

VST3 Host automation、Save/Recall、offline render、timeline jump 與 WEB WASM／AudioWorklet 應共用相同 C++ DSP/ID/state/seed。**表面控制、可執行聲學、編譯通過、Native-Web Golden parity、用戶聆聽核准是不同完成等級**；沒有真實測試不得報 DONE。

## REF ↔ 現有資料夾逐件缺口判定法

對照核准 REF → `Assets/UI/{Shared,UI_01,UI_02,Runtime,ReferenceSheets}`／manifest → `Web/App` 實際 DOM/CSS/binding → `Source/UI` Native 位置與 state。每個元件至少標 **ID、UI、幾何/來源、資產/程式路徑、CSS/Native/binding、差異類別、證據、目前狀態、處置、commit**；證明現成 PNG／9-slice/CSS/SVG 不能符合 REF 才製作新 raster。文字 scale／Spectrum／Motion path 必須 live；不可用截圖、atlas 或缺圖 fallback 冒充正式元件。具體真缺與狀態查 `docs/product/reference/REF_COMPONENT_GAP_AUDIT.md`；歷史示例不構成今天仍缺件的證明。

## PR、CI、部署與可驗證回報格式

依 `PROJECT_RULES.md` 與 `AGENTS.md`：先查 live main/branch/PR/CI/Pages、從最後 checkpoint 往前；小步 commit；確認必要 Fast checks 後安全合併，再核對新 main 與實際 Web URL／VST3 artifact。每次回報 **branch、SHA、PR、CI、部署結果、真實量測／已做／未做、下一步**，未驗證標明 `PENDING`。舊 PR/runner 修復故事與完整回報模板保存在 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md`，**不是今日狀態**。

## 使用者的原始要求及其強制含義

當初為避免多篇 GPT 斷線與重覆勞動，使用者反覆要求：**真正做、分批留下 checkpoint、自己處理可授權 PR/CI/部署、從最後成功步驟恢復；研究必須大量獨立證據，不湊數；GPT 算 DSP／用戶只聽且不必交 IR；兩套 UI 全元件與可拆 PNG；未完成不假稱完成**。原始產品決議及後續取捨請看 `docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md`，原始口語及逐項決議來源查 `docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md`。**本檔不再逐段重貼原話**。

## 權威規格、程式與資產路徑索引

- 產品入口／研究／責任：`AGENTS.md`、`PROJECT_RULES.md`、`docs/research/RESEARCH_EVIDENCE_STANDARD.md`、`docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md`、`docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md`。
- DSP／Web／Single repo：`docs/architecture/{DSP_BEHAVIOR_CONTRACT_V1,PROJECT_STRUCTURE,WEB_RUNTIME,SINGLE_REPO_PUBLIC_POLICY}.md`。
- UI 行為／材質／REF：`docs/product/{UI_FUNCTION_CONTRACT,VISUAL_STYLE_V2,RUNTIME_COMPONENT_INVENTORY_V1,SCENE_HERO_049_074_PRODUCTION_V1}.md`、`docs/product/reference/` 的 MD/JSON；實作在 `Web/App/` 與 `Source/UI/`。
- 素材／Preset：`Assets/UI/*manifest*`、`Assets/UI/Runtime/*manifest*`、`Assets/FactoryPresets/scene_presets_v1.json`、`docs/research/PRESET_PORTFOLIO_REBALANCE_2026-10-05.md`。
- 流程／最新進度：`.github/workflows/`、`SOURCERUNE_MASTER_HANDOFF.md`；歷史封存 `docs/history/` 不當作最新 checkpoint。

## 永久資產分類、共用邏輯與驗證標準

舊版 Semantic **224 IDs**：SOURCE **64**、TRANSMISSION **24**、WALL/COVER **32**、SPACE **56**、Hero **48**，各 Shared/UI01/UI02 變體共 **672**；另有 ReferenceSheets 比對圖（不當 runtime）。Runtime 可拆 Chrome 按 P0/P1/P2 管理，優先共用 9-slice／已有 knob/frame/button；不要重造。同時 Factory 擴充 **74 Active**，SCN049–074 的 **78 個獨立 PNG** 為另一個 art backlog。**實際 PNG 數量只由 live Git tree 檢查，不能永遠寫 0／791／793。**

PNG presence、alpha/尺寸/CRC、manifest ID、runtime binding、REF 測量、互動控制、真實聲音與使用者試聽**必須分開驗證**。是否缺檔或需要新素材由 `docs/product/reference/REF_COMPONENT_GAP_AUDIT.md` 與 `Assets/UI` 目前庫存決定。

## 不同 AI 平台的正式閱讀入口

ChatGPT/GPT／Codex／Copilot 統一從 `AGENTS.md` 讀本憲章、研究與分工規範；`.github/copilot-instructions.md` 只指向相同權威文件，README 提供入口。新對話不保證自動讀 GitHub，沒實際讀檔不得假裝已看。不要建立另一份互相競爭的「最新永久規則」。

## 永久規範的修訂流程與防遺失機制

- **新核准永久決策**：更新本憲章與該領域 MD/JSON/manifest，必要時更新 `AGENTS.md` 的入口，不複製多份全文。被取代的方案寫入原始決議的 supersession 或歷史決議追溯。
- **新的實作進度**：只更新 `SOURCERUNE_MASTER_HANDOFF.md`，具體坐標寫 `docs/product/reference/`、研究來源記 `docs/research/`；不要把會過時的 PNG/PR/CI 數據寫成本憲章的永久事實。
- **來源不足**：原始聊天省略的段落標 `PENDING-VERBATIM`；沒有真正 REF/測試/用戶聆聽不能升為 `CONFIRMED`／`DONE`。已完成的測量不要無證重算。
- **變更應有真 commit/PR/必要 Fast 與可檢查的成果**；純整理文件不可順手改 DSP、Preset、UI 或 CI 壓測倍數。


## 全專案通用交接要求（使用者最新明確要求）

此要求適用目前 VVChain、SOURCERUNE 及以後所有新開發專案，包含 UI、DSP、功能、Preset、素材、程式、測試與部署，不限任何介面或分支。各 repo 只保存自身規格，不得跨專案混用素材、座標、參數或 CI 規則。

使用者本次回報交接部署耗費一整天、來回幾十次；主要工作方式是在工作對話反覆確認，交給另一對話集中部署。開發助手必須在交付前補齊資訊，不把重新追查、挑版本、搬附件、重講需求與補漏交給使用者。

每個專案固定一份有效交接入口（SOURCERUNE 為 SOURCERUNE_MASTER_HANDOFF.md，專業規格由它明確索引）。每次新決定立即取代舊要求；放棄方案退出有效清單，核對無引用後移出當前樹，Git 歷史只供恢復，不再觸發舊方案部署／CI。交付必須清楚交代：
1. 做什麼：最後核准要求與被取代方案。
2. 東西在哪：原檔、正式檔、程式／組裝腳本、雜湊與衍生方式。
3. 放在哪／如何接：適用座標系、位置、尺寸、倍率、文字基線、圖層或 DSP／資料處理順序及平台修改入口。
4. 怎麼動：操作、狀態、參數 ID／功能綁定、automation／recall 等適用行為。
5. 怎麼驗收部署：真實畫面／音訊／功能證據、必要測試、產物與步驟；分清已記錄、已接入、已驗收、已部署。
6. 還缺什麼：確切缺項、阻塞原因、下一步與最後可恢復 checkpoint。

交付前核對實際載入來源、覆蓋層與功能路徑，不生成未核准替代品、不用近似或測試綠燈冒充產品核准；部署者查最新 live main／branch／HEAD／PR／CI 後接續，不重做已完成部分。同錯兩次即查根因，外部阻塞不得盲跑。測試強度、CI 與部署授權沿各專案既有規則，不因本要求擅增。

同等規模且交付完整、無新阻塞的 UI 批次，先前目標估算為交接至部署 30～90 分鐘、使用者來回 1～3 次、集中部署 1 次；尚未實測，不能承諾所有專案／DSP／大型變更一律此工期。重點是交付前解決可避免的追查與重做，不能隱藏準備時間。新專案建立時將本要求納入該 repo 的 AGENTS.md 與有效交接入口；此 repo 紀錄不代表尚未建立專案已自動寫入，也不代表帳號跨對話記憶體已更新。
