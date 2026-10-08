# SOURCERUNE 總交接與完整工作規格（MASTER HANDOFF）

> **用途：每一個接手 SOURCERUNE 的 GPT／開發者，從這一份開始讀，不要再要求使用者重述。**
>
> **整理基準：2026-10-08（台灣時間）。範圍：本對話由「中午斷線、回溯進度」開始的全部指令、要求、執行紀錄，並交叉核對 GitHub 既存設計／資產／CI 文件。** 已遺失的逐字聊天無法憑空恢復；本文件不假裝擁有消失的逐字稿。較早的專案決策以 repo 正式文件為憑。
>
> **重要：這是「永久需求／作業守則 + 有日期的 checkpoint 快照」，不是永遠最新的 branch／CI 狀態。每次實作前都必須重新讀 GitHub 最新現況。**

---

## 0. 給下一篇 GPT 的第一分鐘操作

1. Repo 僅是 **\`ureia-dev/SOURCERUNE\`**，不可誤用 VVChain 或其他 repo。
2. 先完整讀本檔，再讀 \`PROJECT_RULES.md\`、\`docs/product/UI_FUNCTION_CONTRACT.md\`、\`docs/product/reference/\` 五個 REF 文件、\`docs/product/REF_PIXEL_AUDIT_V6.md\`、\`docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md\`。若工作涉 DSP，另讀 architecture／engine 規格。
3. **先重新查** latest \`main\` SHA、相關工作 branch HEAD、所有 open PR、CI workflows / jobs / steps / logs、Pages Preview／部署、最近完成的 checkpoint。不能只照本檔記載的 SHA 繼續寫。
4. 以「最後一個真正成功、可驗證的 checkpoint」為起點，只做下一個**未完成**的小步驟。保留別的 GPT / 排程已經推進的程式碼；禁止從頭做、盲目重跑、覆蓋他線成果。
5. 工作有實質成果就提交 commit，合適時自行開 PR、修衝突、依正常 checks 合併、驗證預覽；**不用叫使用者去 GitHub 按 Merge／Deploy**。有不可處理的權限、法律、付款、外部服務阻塞才具體回報。
6. 對話斷線風險很高。**一批只做 2–4 個高度相關微步（或當次使用者另指示的批量），每步都要留 commit/checkpoint，並即時用繁體中文報告**。不要跑一整天才給一段純計畫。
7. 本次使用者先要求**完整整理交接文件**，不是授權順便大幅修改 UI。交接文件完成後才回到各 UI 任務的正常工作流程。

### 證據優先級／防止過時資訊

- 現行 GitHub tree、commit、PR head、CI log、真實 Web/VST 渲染結果 > 最近已驗證的 docs/checkpoint > 本交接文件有日期的快照 > 歷史聊天中的推測／舊版本 docs。
- REF 真正的像素座標必須由**核准原圖**量得；CSS 設定數字與目前 runtime 截圖不能單方面作為 REF 的 CONFIRMED 證據。
- \`APPROX\` 永遠不准自行升格成 \`CONFIRMED\`；沒有 full REF bitmap 時保留外部輸入缺口，不可拿 atlas 當整頁 REF。
- 若正式資料彼此衝突，保留舊測量歷史，寫新 checkpoint 說明哪個被取代、原因與實測證據。

## 1. 專案方向、產品架構與已鎖定原則

**SOURCERUNE** 是音訊後期／世界化（worldizing）／聲學場景模擬處理器，讓聲音像真的從不同來源、傳輸方式、遮蔽物、距離、移動路徑與真實空間傳出；不只是換一個混響、加 EQ 或做裝飾性的空間 UI。

- 正式同等主線：**VST3 Native 與 WEB TEST**。UI_01、UI_02 是兩種正式 UI；應使用相同的 DSP、parameter ID、scene/state schema、preset 與處理語意。不可以「Web 一套聲音、VST 一套聲音」。
- 核心規劃：共用 **C++20** DSP/scene/state；WEB 透過 **WebAssembly + AudioWorklet**，實際音訊不應放在 UI thread。AAX 目前不是主線，只能列未來選項，不可因此重構正在完成的主線。
- 主要處理次序：**INPUT → TRANSMISSION → SOURCE → CONDITION → WALL/COVER → DISTANCE/MOTION → SPACE → AMBIENCE → INTELLIGIBILITY → EQ/TONE → MIX/OUTPUT**。真正執行次序以 engine contract / 已實作程式及測試證據核對；Signal Flow 顯示不得造假。
- 即時與 CPU：原生取樣率為基準、低 CPU、非必要不常態 oversample；inactive module near-zero work、hidden analyzer/UI throttling、預配置變動 delay 緩衝、音訊執行緒不得配置記憶體／鎖／I/O、可回報的固定結構延遲、平滑切換與確定性 state/seed。保留 DSP 模組化與可單測性。
- 已記錄的聲學方向：真實 source response／resonance／nonlinearity／directivity、電話與無線電傳輸失真、device condition、cover transmission loss／leak／panel resonance、直接聲與早期反射及低 CPU late field、室外地面反射與 air absorption、Doppler／移動視角、具 Seed 的 ambience。
- 使用者此段任務**授權 UI/REF/元件／部署收斂，不授權任意修改 DSP 聲音、Preset 內容、processing order、參數語意或安全門檻**。
- 完整功能、64 public parameter ID、host automation、VST/WEB parity 等以 \`docs/product/UI_FUNCTION_CONTRACT.md\`、\`docs/product/UI_COMPONENT_MAP_V1.md\`、\`PROJECT_RULES.md\` 為契約；未真正實作的 C++、Wasm bridge、真 LUFS、Golden parity、release build，不能因文件有契約就宣稱已完成。

## 2. 使用者逐次明確要求的不可妥協規則

### 2.1 避免聊天斷線與可恢復工作

使用者先說：「**一次做不完就分批多次，不然我這邊一點結果都沒有，一直斷線**」，後續多次要求「一步一步」、「一次一點點」，後來改為「**每小時做多一點，其他不變**」。這不是要求所有工作變慢，而是要求**有實際成果、頻繁 checkpoint、不要長時間黑箱、不可中斷後歸零**。

- 開始前先給一句短計畫；每有一個獨立成果，立即 commit 並報告。2–4 個相近步驟一批是曾核准的排程預設，不是不可突破的硬限制；若使用者指定「更快／盡量做」，仍須每步留 checkpoint，不能偷省。
- 每個大步報告 branch、HEAD commit、PR／可合併狀態、CI、部署、已完成、失敗原因、下一步。分支前進後必須以新 HEAD 重核對，不能照舊 SHA 寫入。
- 同一錯誤**最多直接重試兩次**；第二次仍同錯立即停止重跑，閱讀 workflow、job、steps、runner、log、分支差、GitHub 基礎設施、最小重現。
- Runner 未啟動、steps 為空、測試前即失敗、GitHub 平台故障：標為**外部阻塞**；不可為了跑綠改 DSP/UI 或無限 rerun。
- 相同修復目標**一條正式 branch／一個 PR**；新的線取代舊線時必須標註 superseded、關閉舊 PR／說明舊 branch 停用。不同目的（UI、DSP、CI、素材、版本）可拆就拆。
- 不要盲目 force push／覆蓋最新 main；main 前進就先比較 merge-base 與變動檔案，只有確知衝突才手動合併重疊內容，保留兩邊成果。

### 2.2 操作自主權

使用者原話：「**該合併就合併，該部署就部署，全部你盯進度**」、「**有遇到不能過的全部自己解決**」，以及「沒叫你停就繼續做到完成為止」。意思是：**在既有授權與 CI 規則內，能安全做的要真的做，不要只擬計畫或一直反問；真正外部阻塞要回報，不准虛稱完成**。

### 2.3 每小時排程的演變與現況

- 曾設 8 小時 UI 收斂（結束後停用）。
- 2026-10-07 建立每小時 UI 微步工作：起初每次一小步，後來擴為每次 2–4 小步，並加入**UI_01／UI_02 全量 REF 像素／物件／材質稽核**；再由其他執行輪次改成在同一主線可持續安全前進、每步仍獨立 checkpoint。
- 使用者曾要求「**做到我說暫停並檢查狀況為止**」。
- **2026-10-08 實際查詢結果：名為「SOURCERUNE 每小時持續收斂」的排程目前 is_enabled=false，最後一次執行記錄為 2026-10-07 21:15（UTC，約台灣 10/08 05:15），不是目前自動持續在跑。** 這是執行狀態快照；下一位不可只看到「曾要求每小時」就謊稱排程現仍啟用。若要開關排程，依當下使用者最新指示處理，不要在一般 UI commit 時擅自改動。
- 若使用者說「暫停」，應停止相應自動化、先查 main／branch／PR／CI／部署／最後 checkpoint 再回報，不可只答收到。
- 「未來應持續做」是工作目標；每輪是否真的執行與是否可排程，要以當下任務／工具狀態為準，不承諾工具不支援的背景工作。

### 2.4 CI／Fast／Deep／Release

\`PROJECT_RULES.md\` 高優先。**Fast** 是日常唯一自動 CI；**Deep／Release** 只可依使用者明確授權觸發。舊任務曾提及 Deep 20、Release 100，是歷史指定情境，**絕不是授權每次 UI 修正都跑 20／100 次**。任何 safety、stress、regression 額外 loop、rounds、iterations、matrix 增量都先取得同意；不可為了「更保險」偷偷加乘。

採「受影響最小靜態檢查 → Fast CI（如果流程要求）→ 只有必要且授權才做 Deep／Release」。純文件／樣式可依 repo 現有 \`[skip ci]\` 政策，**但不得以 commit 訊息猜測真正沒有 CI**，應查 run。舊 8 小時排程還曾明確禁止主動 dispatch GitHub Actions；不能把那段階段性指令錯當永遠可以停掉正常 Fast CI。

### 2.5 語言與回報

與使用者對話**只用繁體中文**。直接報實測成果，不要泛泛說「已處理」卻無 SHA／檔名，沒有完成就標示「未驗證／待完成」。不要問使用者已經授權的 PR／Merge／Deploy 要不要做。一次回報以目前小批次為單位。

## 3. 五階段 UI REF 工作流程（使用者原始完整要求）

使用者提出的 01–05 工作方向：

1. **01 最高精度 REF 掃描**：外框、各欄、區塊、微小座標、字體、按鈕、Knob、meter、Scene、分析圖、控制狀態、功能顯示／隱藏；盡可能逐 pixel。REF 是外觀與布局標準，不是 runtime bitmap。
2. **02 掃描現存元素與功能／可沿用資產**：核對 \`Assets/UI\`、Web、Native、manifests；找現成素材、缺少的部件、缺少的狀態；列出用途／大小／座標／相容性。嚴禁把截圖當正式元件。
3. **03 算出真正需要補的元件並製作**：先驗證 Common 的可重用 PNG／9-slice／CSS/SVG；只有符合「REF 確實有獨立 raster 材質、庫內無等效素材、重用經 overlay 證明無法達標」三條件才生新 PNG。每張為可拆元件，必須有可追蹤 manifest。
4. **04 完整拼裝 Web/Native、對照正式 REF 再收斂**：實際渲染於 REF 原尺寸、統一座標後 overlay／difference；局部比較，發現有證據的偏差才改；不得只因 CSS 算式閉合就說 100% pixel 一致。不足則回到 01–03，不斷收斂至沒有可辨識偏差。
5. **05 自主交付**：commit、PR、解衝突、Fast CI／驗證、merge、Web Preview、必要 VST3 對應 parity、部署後檢查，全程留下 checkpoints。需外部權限或基礎設施阻塞再回報。

**先完成 UI_01，逐區到 UI_02**；兩種 UI 必須不同布局、相同功能與 state。不要因修 UI_01 損壞 UI_02；每改共用 CSS／JS／Runtime 必須雙邊 regression。

## 4. 使用者後來追加的「REF 資料庫／文字檔」全量要求

**使用者不是只要看一張圖；要永久可追溯的 REF 規格與缺件表，其他 GPT 都可讀取接續。**

對 UI_01 和 UI_02 **每一個**可辨識物件，按正式 REF 原生像素記錄：

- Identity：UI 版本、region、元件唯一 ID、名稱／用途、可見／隱藏／bypassed／hover／active／disabled 等狀態、z-order、是否共用。
- Geometry：原圖座標系與 plugin-local 座標系、shell origin、x/y/w/h、右下 exclusive 邊界、center x/y、top/bottom/left/right、padding、gap、alignment、容器／子物件 parent。
- 背景與材質：shell／topbar／workspace、panel、card、image-holder、9-slice frame、border/radius、divider、金屬／石墨／玻璃／橡膠／啞光質感、凹槽、陰影、反光、微細紋理、透明度、glow、meter bed、graph grid／底層、overlay。
- **所有文字**：品牌、preset、module title/name、button/tab/select、數值、單位、指示文字、tick、meter scale、軸標、time/frequency label；文字 bounding box、baseline、字級、weight、line-height、letter spacing、字色、不透明度、alignment。字型無法從 raster 確認就寫 \`unknown\`，不能亂猜。
- **所有旋鈕／控制**：Knob face/cap/tick-ring 直徑、中心、pointer origin/長度/角度、sweep、數值／label bounding、slider track/thumb、箭頭、Edit、dropdown、bypass、checkbox、A/B、工具、menu、meter slot/fill/scale、EQ node、Spectrum、Scene/Source/Listener、Motion path/points、distance indicator、waveform、transport 等。
- 每一項標記 \`CONFIRMED\` 或 \`APPROX\`（幾何可信度），以及 \`EXISTS-RUNTIME\`、\`MISSING-IN-RUNTIME\`、\`MISSING-IN-SPEC\`、\`NEEDS-NEW-ASSET\`、\`CODE-DRAWN\`、\`NOT-AUTOMATIC-GAP\`（實作狀態）。兩種維度可並存，不能混淆。
- 真缺件要有**具體 ID 與用途**：例如 \`UI01_SOURCE_CARD_EDIT_IDLE\`、\`UI01_METER_SCALE_LABELS\`、\`UI02_MOTION_KNOB_TICK_RING\`；標「可沿用 PNG／新 PNG／9-slice／CSS/SVG／live code」，並核對現有資料夾。不能只寫「還缺一些材質」。
- **進度與證據必須直接寫進 repo 的 REF 文字資料夾**，不是對話訊息。每次新測量同步更新 MD＋必要的 machine-readable JSON／CSV。

正式位置（已存在）：
- \`docs/product/reference/UI_01_REF_PIXEL_SPEC.md\`
- \`docs/product/reference/UI_02_REF_PIXEL_SPEC.md\`
- \`docs/product/reference/UI_01_REF_COORDS.json\`
- \`docs/product/reference/UI_02_REF_COORDS.json\`
- \`docs/product/reference/REF_COMPONENT_GAP_AUDIT.md\`
- 歷史驗證：\`docs/product/REF_PIXEL_AUDIT_V6.md\`、\`docs/product/UI_01_PIXEL_AUDIT_V1.md\`。
- 正式 bitmap／ReferenceSheets 的目錄依 repo 實際存在情況為準。**不要任意移動已核准圖片。** Repo 的 \`Assets/UI/ReferenceSheets\` 主要是語意圖片圖鑑與 style atlas，不等於 UI_01/UI_02 全頁 REF 原圖。

## 5. 核准 REF 身分（不得混用歷史草圖）

### UI_01（專業工程版）

- 正式核准參考是一張有外圍說明標籤的 **1536 × 1024** 海報；需**只量內部 plugin shell**，shell 約全圖 \`x=17, y=116\`、尺寸 **1499 × 807**。
- **左欄正式是四張 semantic cards：SOURCE、TRANSMISSION、WALL/COVER、SPACE/ENVIRONMENT。** 歷史的五卡 \`CONDITION\` 版本不是此 UI_01 正式 pixel 目標，不能用它量尺寸或偷偷加第五卡。CONDITION 功能仍須在底部 macro／Advanced 等位置存在。
- 中央上是 Scene View（motion curve + distance + waveform + live source/listener/points），中央下是 Spectrum／Space Response／Signal Flow；右側是 IN/OUT 垂直 Meter／Peak-RMS／LUFS；底部七區是 Motion、Bad Signal、Condition、Intelligibility、Ambience、Mix、EQ/Tone。
- 與 \`docs/product/UI_01.md\`、\`UI_01_LAYOUT_EXACT_V1.md\`、\`Source/UI/UI_01/LayoutSpec.h\` 交叉驗證，不准圖省事變成裝飾性的整張背景。

### UI_02（場景視覺版）

- 正式核准參考原圖 **1672 × 941**。
- 左 SOURCE／TRANSMISSION／WALL/COVER cards；中央巨大真實空間 Scene/3D/Top、source/listener、方向路徑、**大 Distance Dial** 與 Motion deck；右 SPACE/ENVIRONMENT／Ambience；上方 preset、A/B、工具、IN/OUT 橫向小 Meter；下方 Bad Signal／Condition／Intelligibility／Mix／EQ Tone。
- 強調深度／前後／路徑與實景素材，不是「把 UI_01 壓扁重排」。細節以 \`docs/product/UI_02.md\`、\`UI_02_LAYOUT_EXACT_V1.md\`、\`Source/UI/UI_02/LayoutSpec.h\` 為準。
- 維持 UI_01/UI_02 同功能、同 DSP state；不同只在呈現及控制排版。

### 正式 REF 的可用性限制

2026-10-07 的 checkpoint 65 曾確認：**repo 中沒有這兩張完整 UI REF bitmap，只有 semantic/reference atlases**。原圖在聊天歷史／個別上傳附件可能可找回；如果接手時拿不到像素原圖，**不得把 raster font baseline、各個 knob tick、微小材質角度等推測為 CONFIRMED**。可繼續做程式 parity、文件、庫存／回歸 guard，並明確登記原圖取用阻塞。

## 6. 已確定的主要幾何常數；勿誤用舊版

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
- 掃描後曾把四卡 image-holder 的 top/bottom、Edit、箭頭 hit-box 逐張套到 \`Web/App/ref_geometry_lock_v7.css\`；後續 checkpoints 又修了 CSS cascade、border-box / 9-slice 與右側 Edit/arrow 的 1px raster offset。
- **2026-10-08 主分支後還有 \`ui/ui01-action-pixel-closure-v1\` branch 的 checkpoint 87（\`bd22b249\`）**，主要是 Edit/arrow 1px raster offset；是否已進 main 必須重新查，不可把它直接說成 merged。
- 細部 icon 形狀、文字 baseline/font、cap 材質、button states 只有有正式 REF 證據的欄位才能封存；不可從 CSS 反推成已核准。

### UI_02 已確定主要布局

- 尺寸 **1672×941**，Topbar **78**、Workspace 約 **653**。
- 主三欄寬 **334 / 972 / 322**；central scene 主要部分 **358**，Motion deck 約 **283**。
- 上方四列主要高度 **213 / 63 / 94 / 247**，row gap **9**；SOURCE 213、TRANSMISSION span166、WALL/COVER247、SPACE285、AMBIENCE 約 322×350。
- 下方五塊寬度 **337 / 315 / 297 / 316 / 337**，欄間 **11**、左右 padding **13**；數值與 CSS/Native 對照。
- UI_02 Distance dial 約 **300px**，Motion 小旋鈕 face 約 **54px**，底部通用 macro knob face **76px**（曾修正 high-specificity 覆寫導致 MIX 變 88px 的錯誤）。
- UI_02 Topbar 的 Prev/Next/Preset/A-B/Folder/Meter/Gear 大致位置已盤點；**Shuffle icon 有圖但獨立按鍵與功能語意未正式確認**，不得憑 icon 自己發明行為。
- UI_02 的 fine font/ticks/material/center 等有些仍為 APPROX；不是全頁 pixel 100% 完成。

## 7. 影音視覺品質、美術語言與材質標準

正式美術方向以 \`docs/product/VISUAL_STYLE_V2.md\`、\`Assets/UI/ReferenceSheets/STYLE_GUIDE_V1.png\`、\`SCENE_PRESET_HERO_48_ATLAS.png\` 為主要基準。

- 真實、低調、有攝影／後期製作感的 cinematic/documentary photoreal；著重**環境與聲源關係**、真實曝光、可辨識 emitter、實際使用情境。
- 中間調先清楚：不要壓死暗部、不要過量對比、炫光、HDR 廣告質感、過重青橘色調、霓虹科幻 HUD、假金屬／過度 AI 電影風、誇張淺景深。接近正常 35–50mm 的可信空間景深，材質偏啞光、飽和度克制。
- UI 本體深灰／石墨／黑，清楚可讀的微細邊線、分隔、凹槽、物理旋鈕／meter；cyan 是受控的互動／數據重點，不是滿版發亮裝飾。
- 透明 PNG、9-slice、card frame、knob、icon 各自獨立；**不准直接貼完整核准 REF 或切局部 REF 假裝成可拆 runtime 元件**。
- 與舊 SCN001–048、P0/P1/P2 runtime 元件比較風格；任何新元件須經實際單件對比與 UI01／UI02 runtime 插入驗收，避免「看起來更炫」反而偏離 REF。
- Scene 動態資料、源／聽者相對位置、Motion curve、Spectrum、Space Response、waveform、EQ、meter、數值、字、Knob pointer、基於 state 的顯示／隱藏都要 live 生成與互動，不能 baked 進圖片。

## 8. 資產庫已完成內容、實際目錄、避免重做

2026-10-08 實際 GitHub \`main\` recursive tree 掃描結果（**1032 tree entries；Asset PNG 合計 791**）：

| 資產路徑 | PNG 現存數量 | 說明 |
|---|---:|---|
| \`Assets/UI/Shared/\` | **224** | approved semantic master |
| \`Assets/UI/UI_01/\` | **224** | UI_01 semantic crop |
| \`Assets/UI/UI_02/\` | **224** | UI_02 semantic crop |
| \`Assets/UI/ReferenceSheets/\` | **6** | 來源／傳輸／牆／空間／48 scene／style atlas |
| \`Assets/UI/Runtime/\` | **113** | 可拆 runtime chrome，P0/P1/P2 加後續 icon |
| **總計** | **791** | 已進 main 的 PNG；不是 0、不是 761，也不是 789 |

Semantic 224 的五個類型：**SOURCE 64、TRANSMISSION 24、WALL/COVER 32、SPACE/ENVIRONMENT 56、SCENE PRESET HERO 48**；每類 Shared/UI01/UI02 三份，合計 672，再加六張 atlas ＝**678/678 舊 V2 完整**。

曾缺 **28 張**：UI01 transmission TRN005–024 共20、Shared SPACE SPC053–056 共4、UI01 SPACE SPC053–056 共4。已逐步補齊，**舊 V2 現在缺 0**。最後四張 Shared master 確實取自原始 \`SOURCERUNE_UI_ASSETS_V2.zip\`，是原圖 binary，不是截圖製造。此任務**已完成，禁止重做**。

P0/P1/P2 可沿用：
- P0 33 張：shell BG/frame、panel/card frame、topbar、button/dropdown/segmented/icon/slider 狀態、S/M/L knob bases、meter frame、graph grid、source/listener markers、9-slice。
- P1 52 張：dividers、UI01 strips、品牌／caret／checkbox／bypass、meter segment、EQ node、Scene grid／motion point/car glyph、左右箭頭、module icons／tool icons。
- P2 26 張：Signal Flow caps、UI01 distance callout/waveform strip、Undo/Redo、Copy/Paste、Fullscreen、Asset Browser、Advanced Drawer、control caps。
- 後續兩張 shuffle states 等加至 Runtime **113**。以 \`Assets/UI/Runtime/*manifest*.json\`、\`docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md\`、\`Web/App/runtime_skin_*.css\` 與實際 tree 為準。
- \`Assets/UI/asset_manifest_v2.csv\` 與 \`Assets/UI/scene_hero_049_074_manifest_v1.json\` 是精準路徑／ID 對照；圖片 presence 不改 DSP 行為。缺圖 fallback 應可辨且中性。

**歷史文件警告**：\`docs/product/CONVERSATION_REQUIREMENTS_AUDIT_V1.md\` 曾因製作日期早而寫「repo PNG=0」，\`ASSET_DELIVERY_STATUS.md\` 的部分 Runtime 數可能寫 111／總 789；那是舊快照，不能凌駕**2026-10-08 重新掃 main 的 791／Runtime 113**。此交接文件特別列出避免下一位 GPT 又聲稱圖片不存在。

## 9. SCN_049～SCN_074：仍需製作的 26 個獨立 Scene Hero

Factory scene identity 已延伸至 SCN_074，但舊核准 artwork 只有 SCN_001～048。2026-10-08 repo tree 未找到 SCN_049 的 PNG；**不能宣稱 26 張／78 PNG 已完成**。完整製圖合約 \`docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md\`。

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

## 10. UI runtime 元件與互動規格

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

## 11. REF 與現有 repo 的「缺少哪些東西」判定法

必掃：\`Assets/UI/Runtime/**\`、\`Shared/**\`、\`UI_01/**\`、\`UI_02/**\`、\`ReferenceSheets/**\`、\`Assets/UI/*manifest*\`、\`Web/App/{index.html,styles.css,components.css,ref_geometry_lock_v*.css,geometry_audit.js,app.js}\`、\`Source/UI/UI_01/LayoutSpec.h\` 與 \`UI_02/LayoutSpec.h\`、runtime skin spec、workflow。

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

## 12. 已做過哪些實際工作／重要 checkpoint 時間線

此段為**可追溯歷史**；不是要求新 GPT 重新做。

1. UI 與 runtime 早期：語意圖庫 224 種／三套、manifest、UI_01/UI_02 文件、P0(33)/P1(52)/P2(26) 元件、9-slice、Live Web UI、Native LayoutSpec、V3／V4／V5 幾何、Web Preview workflow 逐步落地。
2. 2026-10-06 中午斷線前：由 GitHub commit 回溯得知 V5 canonical geometry、responsive 改 scale-only、UI01／UI02 Native geometry、補 UI_01 Transmission/Space、Web Preview direct targets、完整 Assets 發佈與 cache bust、9-slice、VST shared runtime skin。中午曾以 \`6376019d\` 作為當時最後 checkpoint；**後來已被許多 main commits 超越**。
3. 補檔：缺圖 28→4→0，\`Assets/UI\` 實際 672 semantic + 6 sheets 全齊；曾更新資產文件 \`161cf681\`。
4. 2026-10-06 夜間：開 \`ui/ui01-pixel-audit-v1\`，Checkpoint 01 外框／三欄 1499、Checkpoint 02 高 807／底部閉合、Checkpoint 03 SOURCE card；後續 04–06 掃 TRANSMISSION／WALL／SPACE。
5. 2026-10-07 清晨：在 \`docs/product/reference/\` 建立 UI01/02 REF MD／machine-readable JSON／gap audit；Checkpoint 07 Meter、08 Scene live layer、09 Knob、10 live vs asset、11/12 JSON、13–16 521vs520 衝突追查、19/20 Native-Web parity。
6. 2026-10-07 晚間：Checkpoint 21 真正 520px exclusive-edge 修正（\`6052ec1f\`）、後來 CSS typo 修復，Checkpoint 23/24 semantic artwork inventory、REF fine 盤點。
7. 當次互動再續：因 main 前進而 #24 暫時無法 merge，檢查發現重疊主要在 \`Source/UI/UI_01/LayoutSpec.h\`，合併最新 main 保留雙方變動（\`67531553\`）、Fast CI 成功；修 \`geometry_audit.js\` 仍檢查舊 521px（\`5f9f3254\`）；Checkpoint 26 四卡內部 icon/text/image/Edit/arrow REF rectangles（\`2d4347c1\`）；Checkpoint 27 holder/Edit/arrow CSS（\`ac4b1d75\`）。此時 #24 OPEN 為**歷史狀態**。
8. 後續排程與其他 UI PR 做了更細的 icon/typography/Scene/Spectrum/Meter/Macro/UI02 座標與 guard。已追到 checkpoint 65：正式全頁 REF bitmap 未在 repo、細字／tick 暫時不能全數 confirmed；隨後又做 asset/binding/parity/geometry 自動 audit。
9. 2026-10-08 核對 main：**PR #24 已 merged**，merge commit \`9054c051b56d44057d6ae90ff768ae6fbc3f4aee\`；後續 main 已有 CP 76～86（包含資產 parity、catalog/preset 失配 guard、UI01/02 confirmed rectangle 測試、9-slice panel border-box 修正、render audit measured boxes）。
10. 2026-10-08 當時另有 branch \`ui/ui01-action-pixel-closure-v1\`，HEAD \`bd22b2491314eb21b8683d8e06991c17bfc77896\`（CP 87 修 Edit/arrow 1px raster offsets），**沒有 open PR**。此工作分支不能因沒有 PR 就刪除或假定已 merge，應先 compare。
11. 2026-10-08 main 快照：\`ceff103d22ccc0cd553c16c467fb9705d8728e94\`；commit message \`chore: update UI render audit [skip ci]\`。**下一位執行前再查 HEAD**。

## 13. 2026-10-08 完整交接製作時的狀態快照

| 項目 | 本次實際看到 |
|---|---|
| GitHub | \`ureia-dev/SOURCERUNE\` |
| \`main\` | \`ceff103d22ccc0cd553c16c467fb9705d8728e94\` |
| 最新 main 既有進度 | UI render audit + CP 86 |
| open PRs | **0** |
| PR #24 | **closed / merged**；merge SHA \`9054c051...\` |
| 未合併 UI01 分支 | \`ui/ui01-action-pixel-closure-v1\` at \`bd22b249...\`，CP 87 |
| 舊歷史 branch | \`ui/ref-convergence-v6-ui02\`、\`ui/runtime-p1-components\`、\`ui/runtime-p2-v1\` 等；應先查是否合併／superseded，不是新的開發起點 |
| semantic | **672/672** |
| ReferenceSheets | **6/6** |
| Runtime PNG | **113** |
| \`Assets/UI\` PNG | **791** |
| SCN 049–074 PNG | **未見已提交的 SCN_049，整套 78 張不得視為完成** |
| 每小時 UI 自動化 | **目前 disabled**；曾多輪執行 |
| CI | 必須依最新 PR head / main SHA 重新查；本快照**不宣稱最新 main 或 CP87 的 CI 已綠** |
| WEB／VST 真正發布 | Workflow/preview code 存在；**不宣稱每個新 commit 的 Pages 或 VST artifact 都已實際部署**，須查 run/artifact/url |

本快照應隨大階段更新；不要把本檔當永遠最新。

## 14. 最主要的後續工作（依風險與獨立性排列）

**A. UI/REF Pixel closure（先驗已提交的工作）**

1. 先確認 main 與 CP87 branch 目前差異、open PR、最近 CI、已存在的 render report。若 CP87 已被後續主線覆蓋或等效修復，標明 superseded；否則用單一小 PR 合併，測試最小必要 + Fast。
2. 對 UI_01 已知四卡 holder/Edit/arrow/icon/title/name 逐項比最新 runtime screenshot 和 REF／文檔；關注 1px border-box、9-slice、CSS specificity、hover / selected / disabled、hit target。**已有 CONFIRMED 值不重測、不任意重畫**。
3. UI_01 Scene／Analysis／Meter／底部七區雖已有主要座標與 guard，仍缺若干**真正用 REF 驗證**的 fine baseline、ticks、cap/材質與狀態。先查是否有核准 full REF bitmap；有圖才做可證明的 overlay；缺圖則優先可測的 Web/Native parity/guard。
4. UI_02 同理，特別 Scene/Dial/Motion deck、卡片內部、上方 meter/tool、bottom knob=76、文字 baseline、材質、所有狀態與交互。如果只拿到 atlas，不能假稱完成 fine scan。
5. \`Web/App/geometry_audit.js\` 不只測 appW/appH；應驗證已確定的 card internal boxes、z-order／顯示行為、layout cross-target parity。最新檔已經有 measured boxes，**先讀現況再加**，避免同測重複。
6. Web render compare 要保存單一部件 1:1，並保留最小可重現的 render log、差異矩形、before/after／閾值。不能只跑數學 closure 就宣稱「完全一樣」。

**B. 物件／資產 gap audit**
- 更新 \`REF_COMPONENT_GAP_AUDIT.md\` 為真的缺件清單與狀態，不要直接根據 REF 美術差異亂生 PNG；確認 Common assets 是否可共享於兩 UI、hover/pressed/bypass/disabled 狀態與 actual binding 是否齊。
- 找到缺少獨立 raster material 時，**一張一張**製作、檢查一致性、尺寸與 alpha、落 manifest／Runtime 路徑，Web/Native 只按需綁定。
- 優先處理可量的框線、hitbox、text metrics；只有拿到 full REF／驗證素材後才進超精細材質校準。

**C. SCN 049–074 Scene Hero 美術**
- 另開**單一目的的藝術工作線**；依 26 scene briefs，各自做 clean master／三個尺寸，78 independent PNG，核對檔名/heroId/crop/Style，不混入 UI geometry PR；逐張 checkpoint。沒做完不可假裝 74 scenes 全有 hero。

**D. 功能／音訊主線（非本次 UI 授權範圍）**
- 追查 C++ DSP／Wasm AudioWorklet／Native VST3 automation／真正 LUFS／Golden parity／preset audition 是否有最新實測；只能依 repo 最新程式與 logs 改 status，不能從早期 contract 推論已實裝。
- 真正要動 DSP、Preset 或測試重複規則必須有使用者明確授權；UI 排程不得偷做。

## 15. PR、CI 與部署的驗收範本

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

- Fast 成功 ≠ Release 成功；\`[skip ci]\` ≠ 保證 workflow 沒啟動。
- 若 \`mergeable=false\`，先 compare merge base / 兩邊 changed files，必要時手動合併**唯一重疊文件**，不能直接覆蓋整份新版 LayoutSpec／CSS。曾遇過 main 往前 24 commits／branch 24 commits，實際只重疊 LayoutSpec，安全 merge 後 Fast 綠。
- PR 合併前確認 required checks 於**當下 HEAD** 成功、沒有進行中／失敗／外部阻塞。合併後查 main，確認功能／asset/preview 沒倒退；同一目標不要留下多個無註記 PR。
- Pages 預覽曾設 \`?ui=UI_01\`／\`?ui=UI_02\` direct target、完整 assets copy、cache bust、redirect preserving target、rendered geometry audit。應核對 \`.github/workflows/web-preview-pages.yml\`、\`Web/App/preview/rendered/\`、actual artifact/url，不得因 workflow 文件存在就宣稱已發布。
- 任何新 UI 對應的 Native/Web 一致性改動，檢查 \`Source/UI\` + \`Web/App\`。單純文件不需要偽造二端編譯成果。

## 16. 此次對話「最需要保留」的使用者原意速查

這些意思已展開在各節，下列留作下一位 GPT 的直接約束提醒：

> 「突然對話都沒了，幫我回溯做到哪個步驟」→ **先查 GitHub 最後 checkpoint，不要求重述或重做。**

> 「繼續一步一步做」／「一次做不完就分批多次，不然我這邊一點結果都沒有，一直斷線」→ **分批、短回報、每步 commit。**

> 「排程，一小時一小時一點點慢慢做……有遇到不能過的全部自己解決，改部署該合併也都你自己去操作，做到我說暫停並檢查狀況為止」→ **自主處理＋直到使用者停止的意圖；但實際排程是否啟用要查，不得假報。**

> 「改成每小時做多一點，其他不變，再加一工作：UI01/02 REF 精確掃描所有物件的位置大小座標，背景所有文字旋鈕的位置大小座標，新增 REF 資料夾說明；缺哪些物件／材質、現有資料夾有什麼少什麼全部對照」→ **全面規格與真庫存差異，不只修幾個 CSS。**

> 「所以你還沒做!?」→ **不要只說已設定排程，必須用實際 commits／檔案／測試證明工作。**

> 「現在跑」／「繼續」→ **立刻執行下一個未完成微步，不要重新排一份空計畫。**

> 「把我們討論好要做的所有內容還有工作方式方向與提出的所有內容整理到 GitHub 文字檔，給每一篇 GPT 都知道……從本對話頭開始」→ **本文件與根目錄入口就是這項交付；維持長期可讀、可更新。**

## 17. 查找正式資料與歷史文件索引

**進入專案：**
- `AGENTS.md`：repo 根目錄 AI／GPT 快速入口，會導向本文件與高優先專案規則。
- \`README.md\`：產品與主線架構。
- \`PROJECT_RULES.md\`：CI 三層／safety 觸發次數／VST3-Web 部署規則。
- \`docs/architecture/PROJECT_STRUCTURE.md\`、\`WEB_RUNTIME.md\`：架構詳情。
- \`docs/product/UI_FUNCTION_CONTRACT.md\`、\`UI_COMPONENT_MAP_V1.md\`：功能、參數與 layout parity。
- \`docs/product/UI_ASSET_PLACEMENT_V2.md\`、\`UI_NATIVE_IMPLEMENTATION_HANDOFF.md\`：資產與 Native。
- \`docs/product/UI_01.md\`、\`UI_02.md\`、\`UI_01_LAYOUT_EXACT_V1.md\`、\`UI_02_LAYOUT_EXACT_V1.md\`：兩版布局。
- \`docs/product/reference/UI_01_REF_PIXEL_SPEC.md\`、\`UI_02_REF_PIXEL_SPEC.md\`、\`UI_01_REF_COORDS.json\`、\`UI_02_REF_COORDS.json\`、\`REF_COMPONENT_GAP_AUDIT.md\`：精準座標與缺件主檔。
- \`docs/product/REF_PIXEL_AUDIT_V6.md\`、\`UI_01_PIXEL_AUDIT_V1.md\`：掃描／測量歷史。
- \`docs/product/VISUAL_STYLE_V2.md\`、\`SCENE_HERO_049_074_PRODUCTION_V1.md\`：美術、26 場景。
- \`docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md\`、\`ASSET_MANIFEST_V1.md\`、\`ASSET_DELIVERY_STATUS.md\`：元件與歷史資產狀態。
- \`docs/product/CONVERSATION_REQUIREMENTS_AUDIT_V1.md\`：早期產品設計十項稽核，**當年的 PNG=0 已過時**。
- \`Assets/UI/asset_manifest_v2.csv\`、\`Assets/UI/Runtime/*manifest*\`、\`Assets/UI/scene_hero_049_074_manifest_v1.json\`：manifest。
- \`Web/App/geometry_audit.js\`、\`Web/App/preview/rendered/\`、\`Web/App/ref_geometry_lock_v*.css\`、\`Web/App/app.js\`：rendered／Web 實作。
- \`Source/UI/UI_01/LayoutSpec.h\`、\`Source/UI/UI_02/LayoutSpec.h\`、\`Source/UI/Common/RuntimeSkinSpec.h\`：Native 實作。
- \`.github/workflows/ci.yml\`、\`web-preview-pages.yml\`：CI／預覽工作流程。

## 18. 更新這份主交接文件的規則

1. 任何後續對話若有新**永久**產品規格、使用者核准的 REF／素材、工作禁令、CI 政策改變，應更新本文件相應永久節，並寫獨立 commit／PR；不可只放在聊天而導致下一篇看不到。
2. 任何完成大階段，更新「狀態快照／checkpoint／未完成」小節，填日期、commit、PR、CI／部署證據；舊快照保留關鍵原因，標 SUPERSEDED，避免歷史被改寫。
3. 細密的每一 pixel JSON、圖檔 manifest、Shader/CSS/Knob 等不要全部複製到本文件造成兩個事實來源；**本文件保存完整需求、指引、已核准關鍵常數、目錄索引與恢復程序**，精細數值以原位置 authoritative 檔案維護。
4. 使用者改變優先序時，按新要求調整下一步，保留原來已完成 checkpoint。不因「寫交接」擅自觸發 Deep／Release、製作 78 張圖或改音訊聲音。
5. 文件所有結論必須說明 **CONFIRMED／APPROX／HISTORICAL／PENDING／BLOCKED**。沒有證據的「100%」不准寫成完成。
6. 跨 GPT 接續建議首句：**「先讀根目錄 SOURCERUNE_MASTER_HANDOFF.md 與 PROJECT_RULES.md，再查最新 main、所有 open PR、工作 branch、CI、最後 checkpoint；從未完成的下一小步接著做。」**

---

**此文件完成目的：讓新的 GPT 不必要求使用者把同一套要求再貼一次；依 repo 真實狀態與已核准資料自主、安全、逐步繼續。**
