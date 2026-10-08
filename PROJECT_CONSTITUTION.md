# SOURCERUNE PROJECT CONSTITUTION — 永久製作原則與完整規格

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

### 避免聊天斷線與可恢復工作

使用者先說：「**一次做不完就分批多次，不然我這邊一點結果都沒有，一直斷線**」，後續多次要求「一步一步」、「一次一點點」，後來改為「**每小時做多一點，其他不變**」。這不是要求所有工作變慢，而是要求**有實際成果、頻繁 checkpoint、不要長時間黑箱、不可中斷後歸零**。

- 開始前先給一句短計畫；每有一個獨立成果，立即 commit 並報告。2–4 個相近步驟一批是曾核准的排程預設，不是不可突破的硬限制；若使用者指定「更快／盡量做」，仍須每步留 checkpoint，不能偷省。
- 每個大步報告 branch、HEAD commit、PR／可合併狀態、CI、部署、已完成、失敗原因、下一步。分支前進後必須以新 HEAD 重核對，不能照舊 SHA 寫入。
- 同一錯誤**最多直接重試兩次**；第二次仍同錯立即停止重跑，閱讀 workflow、job、steps、runner、log、分支差、GitHub 基礎設施、最小重現。
- Runner 未啟動、steps 為空、測試前即失敗、GitHub 平台故障：標為**外部阻塞**；不可為了跑綠改 DSP/UI 或無限 rerun。
- 相同修復目標**一條正式 branch／一個 PR**；新的線取代舊線時必須標註 superseded、關閉舊 PR／說明舊 branch 停用。不同目的（UI、DSP、CI、素材、版本）可拆就拆。
- 不要盲目 force push／覆蓋最新 main；main 前進就先比較 merge-base 與變動檔案，只有確知衝突才手動合併重疊內容，保留兩邊成果。

### 操作自主權

使用者原話：「**該合併就合併，該部署就部署，全部你盯進度**」、「**有遇到不能過的全部自己解決**」，以及「沒叫你停就繼續做到完成為止」。意思是：**在既有授權與 CI 規則內，能安全做的要真的做，不要只擬計畫或一直反問；真正外部阻塞要回報，不准虛稱完成**。

### 每小時排程的演變與現況

- 曾設 8 小時 UI 收斂（結束後停用）。
- 2026-10-07 建立每小時 UI 微步工作：起初每次一小步，後來擴為每次 2–4 小步，並加入**UI_01／UI_02 全量 REF 像素／物件／材質稽核**；再由其他執行輪次改成在同一主線可持續安全前進、每步仍獨立 checkpoint。
- 使用者曾要求「**做到我說暫停並檢查狀況為止**」。
- 若使用者說「暫停」，應停止相應自動化、先查 main／branch／PR／CI／部署／最後 checkpoint 再回報，不可只答收到。
- 「未來應持續做」是工作目標；每輪是否真的執行與是否可排程，要以當下任務／工具狀態為準，不承諾工具不支援的背景工作。

### CI／Fast／Deep／Release

`PROJECT_RULES.md` 高優先。**Fast** 是日常唯一自動 CI；**Deep／Release** 只可依使用者明確授權觸發。舊任務曾提及 Deep 20、Release 100，是歷史指定情境，**絕不是授權每次 UI 修正都跑 20／100 次**。任何 safety、stress、regression 額外 loop、rounds、iterations、matrix 增量都先取得同意；不可為了「更保險」偷偷加乘。

採「受影響最小靜態檢查 → Fast CI（如果流程要求）→ 只有必要且授權才做 Deep／Release」。純文件／樣式可依 repo 現有 `[skip ci]` 政策，**但不得以 commit 訊息猜測真正沒有 CI**，應查 run。舊 8 小時排程還曾明確禁止主動 dispatch GitHub Actions；不能把那段階段性指令錯當永遠可以停掉正常 Fast CI。

### 語言與回報

與使用者對話**只用繁體中文**。直接報實測成果，不要泛泛說「已處理」卻無 SHA／檔名，沒有完成就標示「未驗證／待完成」。不要問使用者已經授權的 PR／Merge／Deploy 要不要做。一次回報以目前小批次為單位。

---

## 正式 UI REF 五階段收斂製程

使用者提出的 01–05 工作方向：

1. **01 最高精度 REF 掃描**：外框、各欄、區塊、微小座標、字體、按鈕、Knob、meter、Scene、分析圖、控制狀態、功能顯示／隱藏；盡可能逐 pixel。REF 是外觀與布局標準，不是 runtime bitmap。
2. **02 掃描現存元素與功能／可沿用資產**：核對 `Assets/UI`、Web、Native、manifests；找現成素材、缺少的部件、缺少的狀態；列出用途／大小／座標／相容性。嚴禁把截圖當正式元件。
3. **03 算出真正需要補的元件並製作**：先驗證 Common 的可重用 PNG／9-slice／CSS/SVG；只有符合「REF 確實有獨立 raster 材質、庫內無等效素材、重用經 overlay 證明無法達標」三條件才生新 PNG。每張為可拆元件，必須有可追蹤 manifest。
4. **04 完整拼裝 Web/Native、對照正式 REF 再收斂**：實際渲染於 REF 原尺寸、統一座標後 overlay／difference；局部比較，發現有證據的偏差才改；不得只因 CSS 算式閉合就說 100% pixel 一致。不足則回到 01–03，不斷收斂至沒有可辨識偏差。
5. **05 自主交付**：commit、PR、解衝突、Fast CI／驗證、merge、Web Preview、必要 VST3 對應 parity、部署後檢查，全程留下 checkpoints。需外部權限或基礎設施阻塞再回報。

**先完成 UI_01，逐區到 UI_02**；兩種 UI 必須不同布局、相同功能與 state。不要因修 UI_01 損壞 UI_02；每改共用 CSS／JS／Runtime 必須雙邊 regression。

---

## UI_01／UI_02 所有物件的像素規格與資產缺口

**使用者不是只要看一張圖；要永久可追溯的 REF 規格與缺件表，其他 GPT 都可讀取接續。**

對 UI_01 和 UI_02 **每一個**可辨識物件，按正式 REF 原生像素記錄：

- Identity：UI 版本、region、元件唯一 ID、名稱／用途、可見／隱藏／bypassed／hover／active／disabled 等狀態、z-order、是否共用。
- Geometry：原圖座標系與 plugin-local 座標系、shell origin、x/y/w/h、右下 exclusive 邊界、center x/y、top/bottom/left/right、padding、gap、alignment、容器／子物件 parent。
- 背景與材質：shell／topbar／workspace、panel、card、image-holder、9-slice frame、border/radius、divider、金屬／石墨／玻璃／橡膠／啞光質感、凹槽、陰影、反光、微細紋理、透明度、glow、meter bed、graph grid／底層、overlay。
- **所有文字**：品牌、preset、module title/name、button/tab/select、數值、單位、指示文字、tick、meter scale、軸標、time/frequency label；文字 bounding box、baseline、字級、weight、line-height、letter spacing、字色、不透明度、alignment。字型無法從 raster 確認就寫 `unknown`，不能亂猜。
- **所有旋鈕／控制**：Knob face/cap/tick-ring 直徑、中心、pointer origin/長度/角度、sweep、數值／label bounding、slider track/thumb、箭頭、Edit、dropdown、bypass、checkbox、A/B、工具、menu、meter slot/fill/scale、EQ node、Spectrum、Scene/Source/Listener、Motion path/points、distance indicator、waveform、transport 等。
- 每一項標記 `CONFIRMED` 或 `APPROX`（幾何可信度），以及 `EXISTS-RUNTIME`、`MISSING-IN-RUNTIME`、`MISSING-IN-SPEC`、`NEEDS-NEW-ASSET`、`CODE-DRAWN`、`NOT-AUTOMATIC-GAP`（實作狀態）。兩種維度可並存，不能混淆。
- 真缺件要有**具體 ID 與用途**：例如 `UI01_SOURCE_CARD_EDIT_IDLE`、`UI01_METER_SCALE_LABELS`、`UI02_MOTION_KNOB_TICK_RING`；標「可沿用 PNG／新 PNG／9-slice／CSS/SVG／live code」，並核對現有資料夾。不能只寫「還缺一些材質」。
- **進度與證據必須直接寫進 repo 的 REF 文字資料夾**，不是對話訊息。每次新測量同步更新 MD＋必要的 machine-readable JSON／CSV。

正式位置（已存在）：
- `docs/product/reference/UI_01_REF_PIXEL_SPEC.md`
- `docs/product/reference/UI_02_REF_PIXEL_SPEC.md`
- `docs/product/reference/UI_01_REF_COORDS.json`
- `docs/product/reference/UI_02_REF_COORDS.json`
- `docs/product/reference/REF_COMPONENT_GAP_AUDIT.md`
- 歷史驗證：`docs/product/REF_PIXEL_AUDIT_V6.md`、`docs/product/UI_01_PIXEL_AUDIT_V1.md`。
- 正式 bitmap／ReferenceSheets 的目錄依 repo 實際存在情況為準。**不要任意移動已核准圖片。** Repo 的 `Assets/UI/ReferenceSheets` 主要是語意圖片圖鑑與 style atlas，不等於 UI_01/UI_02 全頁 REF 原圖。

---

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

### UI_01 canonical shell

| 區域 | 確定的主要規格 |
|---|---|
| 全殼 | 1499 × 807 |
| Topbar | 高 58 |
| Workspace | 高 528 |
| 左欄／中央／右 Meter | 寬 313／967／179 |
| 水平邊距／欄間隙 | 左右各 10；兩處 gap 各 10 |
| 橫向閉合 | 10 + 313 + 10 + 967 + 10 + 179 + 10 = **1499** |
| 中央 | Scene 高 262 + gap 8 + Analysis 高 247 = **517** |
| 底部 Macro strip | 高 221 = 216 macro + 5 bottom |
| 垂直閉合 | 58 + 528 + 221 = **807** |
| 左欄有效內容 | **520px**，其餘 workspace bottom padding 8 |
| 中央比左右 rail 低端提早結束 | REF 約 3px，不能為了算式同高硬拉長 |

### UI_01 左欄最重要的 521→520 修正

前幾輪錯把 137+6+125+8+131+6+108 = **521** 當成外框；使用者要求不能亂刪任意 1px。後來使用 **[top,bottom) exclusive** 同一邊界慣例重新量正式四卡 REF，得到：

~~~text
SOURCE              y174..310  136 px
gap                 310..317     7
TRANSMISSION        317..449   132
gap                 449..456     7
WALL/COVER          456..588   132
gap                 588..594     6
SPACE/ENVIRONMENT   594..691    97
bottom residual     691..694     3
TOTAL                          520 px
~~~

plugin-local：SOURCE y58/h136、TRANSMISSION y201/h132、WALL y340/h132、SPACE y478/h97；最後 3px 是 bottom residual，不是最後一張卡的一部分。**Web V7、Native LayoutSpec、REF JSON 曾同步更新並加 compile-time closure assertion**。再後面的 commit 有其他 geometry／frame／render audit 修正，使用前仍要讀最新檔。

### UI_01 卡片內部 REF 工作

- 現行四卡不能用「全部等高 124」或「image top 48、right 47」的舊模板套到底。
- 第一輪 REF 內部掃描得出 shared horizontal structure（plugin-local）：卡 x10/w313；icon box 約 x18–19/w47–48；title/name x80–82；Edit 約 x270/w48/h34；image holder 約 x19/w239；右 arrow box 約 x269/w49。
- 掃描後曾把四卡 image-holder 的 top/bottom、Edit、箭頭 hit-box 逐張套到 `Web/App/ref_geometry_lock_v7.css`；後續 checkpoints 又修了 CSS cascade、border-box / 9-slice 與右側 Edit/arrow 的 1px raster offset。
- 細部 icon 形狀、文字 baseline/font、cap 材質、button states 只有有正式 REF 證據的欄位才能封存；不可從 CSS 反推成已核准。

### UI_02 已確定主要布局

- 尺寸 **1672×941**，Topbar **78**、Workspace 約 **653**。
- 主三欄寬 **334 / 972 / 322**；central scene 主要部分 **358**，Motion deck 約 **283**。
- 上方四列主要高度 **213 / 63 / 94 / 247**，row gap **9**；SOURCE 213、TRANSMISSION span166、WALL/COVER247、SPACE285、AMBIENCE 約 322×350。
- 下方五塊寬度 **337 / 315 / 297 / 316 / 337**，欄間 **11**、左右 padding **13**；數值與 CSS/Native 對照。
- UI_02 Distance dial 約 **300px**，Motion 小旋鈕 face 約 **54px**，底部通用 macro knob face **76px**（曾修正 high-specificity 覆寫導致 MIX 變 88px 的錯誤）。
- UI_02 Topbar 的 Prev/Next/Preset/A-B/Folder/Meter/Gear 大致位置已盤點；**Shuffle icon 有圖但獨立按鍵與功能語意未正式確認**，不得憑 icon 自己發明行為。
- UI_02 的 fine font/ticks/material/center 等有些仍為 APPROX；不是全頁 pixel 100% 完成。

---

## 影音世界觀、美術風格與獨立素材標準

正式美術方向以 `docs/product/VISUAL_STYLE_V2.md`、`Assets/UI/ReferenceSheets/STYLE_GUIDE_V1.png`、`SCENE_PRESET_HERO_48_ATLAS.png` 為主要基準。

- 真實、低調、有攝影／後期製作感的 cinematic/documentary photoreal；著重**環境與聲源關係**、真實曝光、可辨識 emitter、實際使用情境。
- 中間調先清楚：不要壓死暗部、不要過量對比、炫光、HDR 廣告質感、過重青橘色調、霓虹科幻 HUD、假金屬／過度 AI 電影風、誇張淺景深。接近正常 35–50mm 的可信空間景深，材質偏啞光、飽和度克制。
- UI 本體深灰／石墨／黑，清楚可讀的微細邊線、分隔、凹槽、物理旋鈕／meter；cyan 是受控的互動／數據重點，不是滿版發亮裝飾。
- 透明 PNG、9-slice、card frame、knob、icon 各自獨立；**不准直接貼完整核准 REF 或切局部 REF 假裝成可拆 runtime 元件**。
- 與舊 SCN001–048、P0/P1/P2 runtime 元件比較風格；任何新元件須經實際單件對比與 UI01／UI02 runtime 插入驗收，避免「看起來更炫」反而偏離 REF。
- Scene 動態資料、源／聽者相對位置、Motion curve、Spectrum、Space Response、waveform、EQ、meter、數值、字、Knob pointer、基於 state 的顯示／隱藏都要 live 生成與互動，不能 baked 進圖片。

---

## SCN_049–074 的 26 場景／78 個 PNG 生產契約

Factory scene identity 已延伸至 SCN_074，但舊核准 artwork 只有 SCN_001～048。這 78 張是否已完成，要逐檔檢查 manifest／GitHub tree；不能因 preset identity 已存在，就宣稱 artwork 已交付。完整製圖合約 `docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md`。

需 26 場景 × 3 個**各自獨立的** PNG ＝**78 檔**：
- Shared **226×115**
- UI_01 **384×144**
- UI_02 **512×256**

逐一獨立生成 clean photographic master；套既有一致的 Scene Hero frame/header/title，**編號與文字必須由 compositor/typesetting 決定，不要讓生成圖片自己畫字**；三版按 safe zone 單獨檢查，不能先合成拼貼圖再裁 tile 當 asset。風格與 48 張核准 hero 保持一致。

26 個 scene 名稱／語意（細節構圖見 production 文件）：

| ID | Approved identity |
|---|---|
| SCN_049 | Flat TV - Living Room |
| SCN_050 | Baby Monitor - Bedroom |
| SCN_051 | Voice Approaches - Hallway |
| SCN_052 | Voice Walks Past - Quiet Street |
| SCN_053 | Voice Leaves - Down Corridor |
| SCN_054 | Train PA Approaches - Platform |
| SCN_055 | Train PA Pass By - Platform |
| SCN_056 | Subway Announcement - Pull Away |
| SCN_057 | Bullhorn Marcher Approaches |
| SCN_058 | Portable PA Pass By - Courtyard |
| SCN_059 | Car Radio Through Window - Pass By |
| SCN_060 | Phone In Backpack - Walk By Concourse |
| SCN_061 | Bus PA Pull Away - Bus Stop |
| SCN_062 | Car Door Speaker Approaches - Parking Lot |
| SCN_063 | ADR Match - Small Office |
| SCN_064 | Direct Voice - Bathroom |
| SCN_065 | Direct Voice - Stairwell |
| SCN_066 | Direct Voice - Warehouse |
| SCN_067 | Direct Voice - Tunnel / Underpass |
| SCN_068 | Direct Voice - Open Field |
| SCN_069 | Direct Voice - Forest |
| SCN_070 | Direct Voice - Canyon |
| SCN_071 | Direct Voice - Beach |
| SCN_072 | Direct Voice - Sedan Interior |
| SCN_073 | Direct Voice - Airplane Cabin |
| SCN_074 | Voice Behind Concrete Wall |

每張檢查 preset heroId、Shared/UI01/UI02 命名、材質一致性、場景可辨度、安全裁切；圖片完成≠DSP audition 已驗收。不要把這個**視覺圖庫目標**混到單純 UI pixel audit PR 中。

---

## 功能、互動控制、VST3/WEB 等價性

兩版共有完整處理能力，縱然布局不一樣，以下功能不得在其中一版憑空消失。底部與 Advanced 的具體顯示位置依正式 UI 合約；沒有的真 DSP 不可製造假的互動完成狀態。

- **Global**：Global Bypass、IN/OUT gain、Original↔Full Scene Mix、Factory Preset load、User save/load、Import/Export、A/B/C/D、Copy/Paste、Undo/Redo、音訊檔載入、WEB transport（Play/Stop/Loop/Seek）、版本、Seed／New Seed、Host sync。
- **SOURCE**：device/model、聲學來源角色、amount／bypass／名稱；以源器具真實音色／非線性／頻響為核心。
- **TRANSMISSION／Bad Signal**：Clean／Telephone／Cellular／VoIP／AM-FM／Walkie／Dispatch／Intercom／Low Bitrate 等；bandwidth、noise/static、dropout／packet-loss、interference、bitrate artifact、compression；有傳輸媒介相關行為。
- **CONDITION**：NEW／USED／OLD／DAMAGED、Amount、Rattle／Buzz／compression／instability／imbalance／wow-flutter／intermittent contact。
- **WALL/COVER**：材料、Amount、漏音、共振、透射損失；**不許拿 WALL 圖片代替 acoustic occlusion DSP**。
- **MOTION/DISTANCE**：STATIC、APPROACH、PASS BY、LEAVE、MANUAL；Start／Closest／End／Current Distance、Speed km/h、Doppler、Width、Perspective、Sync DAW、Set Start/Closest/End。
- **SPACE/ENVIRONMENT**：真室內外／車艙聲場、Early／Late／Direct、Room ／城市街道／隧道；Source/Listener 位置與比例即時同步。
- **AMBIENCE**：各 ambience family、Amount/Level、Duck、Seed、Preview、bypass；確定性／可持續程序環境聲與人群質感。
- **INTELLIGIBILITY**：0–100、Natural／More Clear／Muffled 或核准模式，維持語音可懂度而不把場景效果歸零。
- **EQ/TONE**：HPF、LPF、4 Band、最終 Tone、顯示曲線與控制值、bypass。
- **FEEDBACK／GENERATORS／ANALYSIS**：contract 定義存在，布局可在 Advanced。Spectrum input/output、Space Response Direct/Early/Tail、Signal Flow、Peak/RMS/LUFS，沒有真實量測的 meter/LUFS 不可用常數假裝真值。
- **VST3**：host automation、stable IDs、save/reopen recall、offline render、timeline jump、複製 state。**WEB**：相同參數／state／scene 與真 wasm/worklet（若尚未完成就列 pending）。
- 需要核對事件绑定（Edit 開 browser、右箭頭循環相應 semantic family、bypass、A/B、Undo、shuffle 的已授權語意）與 pointer 操作座標；**圖示存在 ≠ 功能已實作**。

---

## REF ↔ 現有資料夾逐件缺口判定法

必掃：`Assets/UI/Runtime/**`、`Shared/**`、`UI_01/**`、`UI_02/**`、`ReferenceSheets/**`、`Assets/UI/*manifest*`、`Web/App/{index.html,styles.css,components.css,ref_geometry_lock_v*.css,geometry_audit.js,app.js}`、`Source/UI/UI_01/LayoutSpec.h` 與 `UI_02/LayoutSpec.h`、runtime skin spec、workflow。

每個 REF component 必須登記：

| 欄位 | 必填 |
|---|---|
| ID／類別／UI 版本／目標區域 | 是 |
| REF x/y/w/h／中心／parent／edge convention | 能量到才 CONFIRMED；否則 APPROX |
| Runtime/CSS/Native 對應 path／selectors／parameter binding | 是 |
| 檔案是否實際存在／CRC/尺寸／manifest ID | 對 raster 是 |
| 視覺差：幾何／baseline／色彩／材質／狀態 | 是 |
| 處置：重用／CSS-SVG-live／新 independent PNG／9-slice | 是 |
| 狀態 + 證據來源 + commit + owner／下一步 | 是 |

具體曾列的缺口／待確認：
- UI01_SOURCE_CARD_EDIT_IDLE/HOVER（先核對 Common button caps，未證實必需新 PNG）。
- UI01_METER_SCALE_LABELS、UI02_METER_SCALE_LABELS（live text + 確認位置，不是要烘焙成 PNG）。
- UI01_KNOB_TICK_RINGS、UI02_MOTION_KNOB_TICKS、UI02_DISTANCE_DIAL_TICKS（實測離散刻度／角度，**用 live CSS/SVG**，不假定必需 raster）。
- UI02_POST_PRESET_SHUFFLE（shuffle idle/hover 圖存在，但功能 binding／語意未核准）。
- UI02_TOPBAR_FOLDER（已有 icon，核對真正 runtime binding）。
- UI02_SCENE_ENV_BED（先沿用 existing semantic SPACE image）。
- UI02_CARD_CHROME（先用 existing Common RT_CARD_FRAME 與 9-slice；overlay 無法吻合再建 dedicated）。
- metal/graphite grain、meter recess、knob-cap highlight、rubber ring、cyan/amber glow、card bevel 等都要精掃材質。沒量過應是 **MISSING-IN-SPEC**，不能直接說 PNG 缺失。
- **新 SCN049–074 78 張**是已知真正 art production backlog，不是現有 672 semantic 缺漏。

### 永久禁止

- 整張 UI REF、局部 REF 裁圖、拼貼 atlas tile 當 runtime 素材。
- 靜態 baked 的數值、刻度文字、knob pointer、meter fill、waveform、EQ curve、Motion path、Listener/Source 座標。
- 看到「不完全一樣」就直接畫全新整套 skin，造成風格／比例退步與 asset 重複。
- 「不存在渲染 overlay」卻在文件聲稱與 REF 100% pixel-perfect。

---

## PR、CI、部署與可驗證回報格式

每個小批次提交完成後回報：

~~~text
SOURCERUNE / 本輪工作：<區域與目的>
main HEAD: <SHA>
branch HEAD: <SHA>
PR: #<number> OPEN / MERGED / NONE，mergeable=<true|false|unknown>
CI: <workflow 名稱> / run ID / SHA / status / conclusion
部署：<Web Pages 最新可核對 URL/結果>、<VST3 編譯或 artifact 結果>；未驗證就寫「未驗證」
checkpoint：<編號／具體檔案／實測差值／PASS/FAIL>
已完成：<真正提交且測過的內容>
未完成／阻塞：<具體根因／外部或內部>
下一步：<只需下一個未完成小步>
~~~

- Fast 成功 ≠ Release 成功；`[skip ci]` ≠ 保證 workflow 沒啟動。
- 若 `mergeable=false`，先 compare merge base / 兩邊 changed files，必要時手動合併**唯一重疊文件**，不能直接覆蓋整份新版 LayoutSpec／CSS。曾遇過 main 往前 24 commits／branch 24 commits，實際只重疊 LayoutSpec，安全 merge 後 Fast 綠。
- PR 合併前確認 required checks 於**當下 HEAD** 成功、沒有進行中／失敗／外部阻塞。合併後查 main，確認功能／asset/preview 沒倒退；同一目標不要留下多個無註記 PR。
- Pages 預覽曾設 `?ui=UI_01`／`?ui=UI_02` direct target、完整 assets copy、cache bust、redirect preserving target、rendered geometry audit。應核對 `.github/workflows/web-preview-pages.yml`、`Web/App/preview/rendered/`、actual artifact/url，不得因 workflow 文件存在就宣稱已發布。
- 任何新 UI 對應的 Native/Web 一致性改動，檢查 `Source/UI` + `Web/App`。單純文件不需要偽造二端編譯成果。

---

## 使用者的原始要求及其強制含義

此處原話是永久意圖的證據，不代表在後來對話中被更新過的排程仍處於啟用狀態。

這些意思已展開在各節，下列留作下一位 GPT 的直接約束提醒：

> 「突然對話都沒了，幫我回溯做到哪個步驟」→ **先查 GitHub 最後 checkpoint，不要求重述或重做。**

> 「繼續一步一步做」／「一次做不完就分批多次，不然我這邊一點結果都沒有，一直斷線」→ **分批、短回報、每步 commit。**

> 「排程，一小時一小時一點點慢慢做……有遇到不能過的全部自己解決，改部署該合併也都你自己去操作，做到我說暫停並檢查狀況為止」→ **自主處理＋直到使用者停止的意圖；但實際排程是否啟用要查，不得假報。**

> 「改成每小時做多一點，其他不變，再加一工作：UI01/02 REF 精確掃描所有物件的位置大小座標，背景所有文字旋鈕的位置大小座標，新增 REF 資料夾說明；缺哪些物件／材質、現有資料夾有什麼少什麼全部對照」→ **全面規格與真庫存差異，不只修幾個 CSS。**

> 「所以你還沒做!?」→ **不要只說已設定排程，必須用實際 commits／檔案／測試證明工作。**

> 「現在跑」／「繼續」→ **立刻執行下一個未完成微步，不要重新排一份空計畫。**

> 「把我們討論好要做的所有內容還有工作方式方向與提出的所有內容整理到 GitHub 文字檔，給每一篇 GPT 都知道……從本對話頭開始」→ **本文件與根目錄入口就是這項交付；維持長期可讀、可更新。**

---

## 權威規格、程式與資產路徑索引

**進入專案：**
- `AGENTS.md`：repo 根目錄 AI／GPT 快速入口，會導向本文件與高優先專案規則。
- `README.md`：產品與主線架構。
- `PROJECT_RULES.md`：CI 三層／safety 觸發次數／VST3-Web 部署規則。
- `docs/architecture/PROJECT_STRUCTURE.md`、`WEB_RUNTIME.md`：架構詳情。
- `docs/product/UI_FUNCTION_CONTRACT.md`、`UI_COMPONENT_MAP_V1.md`：功能、參數與 layout parity。
- `docs/product/UI_ASSET_PLACEMENT_V2.md`、`UI_NATIVE_IMPLEMENTATION_HANDOFF.md`：資產與 Native。
- `docs/product/UI_01.md`、`UI_02.md`、`UI_01_LAYOUT_EXACT_V1.md`、`UI_02_LAYOUT_EXACT_V1.md`：兩版布局。
- `docs/product/reference/UI_01_REF_PIXEL_SPEC.md`、`UI_02_REF_PIXEL_SPEC.md`、`UI_01_REF_COORDS.json`、`UI_02_REF_COORDS.json`、`REF_COMPONENT_GAP_AUDIT.md`：精準座標與缺件主檔。
- `docs/product/REF_PIXEL_AUDIT_V6.md`、`UI_01_PIXEL_AUDIT_V1.md`：掃描／測量歷史。
- `docs/product/VISUAL_STYLE_V2.md`、`SCENE_HERO_049_074_PRODUCTION_V1.md`：美術、26 場景。
- `docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md`、`ASSET_MANIFEST_V1.md`、`ASSET_DELIVERY_STATUS.md`：元件與歷史資產狀態。
- `docs/product/CONVERSATION_REQUIREMENTS_AUDIT_V1.md`：早期產品設計十項稽核，**當年的 PNG=0 已過時**。
- `Assets/UI/asset_manifest_v2.csv`、`Assets/UI/Runtime/*manifest*`、`Assets/UI/scene_hero_049_074_manifest_v1.json`：manifest。
- `Web/App/geometry_audit.js`、`Web/App/preview/rendered/`、`Web/App/ref_geometry_lock_v*.css`、`Web/App/app.js`：rendered／Web 實作。
- `Source/UI/UI_01/LayoutSpec.h`、`Source/UI/UI_02/LayoutSpec.h`、`Source/UI/Common/RuntimeSkinSpec.h`：Native 實作。
- `.github/workflows/ci.yml`、`web-preview-pages.yml`：CI／預覽工作流程。

---

## 永久資產分類、共用邏輯與驗證標準

這些是**規劃與 ID 類別**，不是宣稱 GitHub 現在有幾張已完成的 binary；實際現存檔案、尺寸、CRC、工作進度必須每次重新查 manifest／GitHub tree，記在動態交接。

- **Semantic master 共 224 個已定義類型**：SOURCE **64**、TRANSMISSION **24**、WALL/COVER **32**、SPACE/ENVIRONMENT **56**、Scene Preset Hero **48**。每個 semantic identity 各有 Shared、UI_01、UI_02 三個不同 display export。**224×3=672** 是舊一代 semantic 交付計畫的總規格，不代表永遠不擴增。
- ReferenceSheets 是設計比對圖譜／style guide／review atlas，**不能替代真正語意圖、正式 full UI REF 原圖，也不能直接作 runtime skin**。
- Runtime chrome 按 P0（基礎 shell/frame/button/knob）、P1（卡片、icon、刻度／meter/marker/divider）、P2（進階 control caps/flow/utilities）分類，**既有 Common Runtime 元件優先共用**，不要因 UI_02 另一外觀就自動複製一套相同 PNG。
- 最後缺少的四張 Shared SPACE master `SPC_053_Drive_Thru_Window.png`、`SPC_054_Security_Checkpoint.png`、`SPC_055_Prison_Visiting_Room.png`、`SPC_056_Phone_Booth.png` 曾由使用者最初的 V2 ZIP 精確還原。舊 V2 的完成紀錄保存在歷史交接；此處記錄**不可重製或拿截圖替代原圖**的原則。
- Scene Hero 擴充 SCN049–074 是 **26×3＝78 張獨立 PNG 的新增專案**，不是 672 舊 V2 semantic 檔案缺失；需獨立工作 branch／manifest／美術驗證／state mapping／audition status。不得把圖片完成等同音效審聽完成。
- 所有 raster 先核尺寸、RGBA/alpha（適用時）、PNG integrity／CRC、色調、足夠 HiDPI、是否符合共享 runtime skin；所有 CSS/HTML/Native binding 要有 machine-readable id 映射，不可靜態圖檔有了卻 selector 永遠沒用到。
- **永遠區分：缺實體二進位圖片、缺 binding、缺 REF 測量、缺某個 UI 狀態、缺 live 控件、缺聲學行為**；這六種缺口不能混稱「缺圖」或「已修復」。

## 不同 AI 平台的正式閱讀入口

- Repo 任何 coding agent：**`AGENTS.md` → 本文件**；`AGENTS.md` 是**真正的根目錄入口和精簡硬規則**，不能只寫「請看上一份交接」。
- GitHub Copilot：`.github/copilot-instructions.md` 明確要求先讀同一套永久憲章；避免建立與本文件競爭的另一份製作原則。
- GitHub README：於專案首頁直接連結 `AGENTS.md` 與 `PROJECT_CONSTITUTION.md`。
- **一般 ChatGPT 新對話不保證自動載入 GitHub 文件**。若新聊天沒有 repo 的上下文或未讀到連結，必須先取得 GitHub 資料，而非聲稱已自動遵守；如使用 ChatGPT Project，可在 Project 指示中固定「先讀 repo 的 AGENTS.md」，這個 ChatGPT 設定不屬於 GitHub repository API 所能代改。

## 永久規範的修訂流程與防遺失機制

- **新的一篇 ChatGPT 對話的交接不是新規範的取代品。** 交接永遠要指回 `AGENTS.md` + 本文件；不可只靠上一個聊天室的記憶。
- 新永久要求／否決項／核准 REF 尺寸／獨立素材規範：先加入本文件或其 authoritative 專門規格，並更新 `AGENTS.md` 對應入口。每次變更須有 commit／必要 PR 與驗證證據。
- 工作現況、SHA、PR、CI／部署、排程是否開啟、剩餘缺件數：只寫 `SOURCERUNE_MASTER_HANDOFF.md` 與可追溯工作紀錄；不要每次更新這個永久憲章的主要文字。
- 真實逐 pixel 表格持續更新 `docs/product/reference/UI_01_REF_COORDS.json`、`UI_02_REF_COORDS.json`、`UI_01_REF_PIXEL_SPEC.md`、`UI_02_REF_PIXEL_SPEC.md`、`REF_COMPONENT_GAP_AUDIT.md`；本文件保存量測方法與核准重大錨點。
- 如果本文件與 authoritative machine-readable 座標在較新 checkpoint 不同，先比對依據與日期，將歷史結論標 SUPERSEDED；**不能偷偷選一個值或重新算已完成部分**。
- 不得因整理文件擅自改音效算法、Preset、CI/安全壓測觸發與倍數、或把舊未合併 PR 假裝已進 main。
- 任何 AI 的任務起手式：`Read AGENTS.md and PROJECT_CONSTITUTION.md and PROJECT_RULES.md before editing. Read the latest HANDOFF and inspect current GitHub main/branches/PRs/CI. Continue from the last verified checkpoint.`

**本文件是 SOURCERUNE 長期的唯一總原則入口。後續第 2、3、10 篇交接都不能取代它。**
