# SOURCERUNE — 最高優先：實證大數據研究與產品決策規範

> **永久有效的產品最高指導原則。** 與 `PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、`AGENTS.md` 共同約束所有後續 GPT、開發者與排程。這不是一次性八小時任務，也不是歷史交接附件。
>
> **最重要的一句話：先大量蒐集真實專業使用者需求 → 跨論壇交叉核對 → 去重與分類 → 統計人氣及優先級 → 用聲學／DSP 工程證據驗算 → 實際驗聽／實測 → 才決定 SOURCERUNE 功能、參數、Preset、技術與排列。**
>
> 使用者明確禁止 GPT 以個人直覺或少量搜尋、廠商行銷文字、虛構數據、重複轉貼的聲量來代替「大數據」，也禁止只湊到 1,000 筆就當已做完研究。

## 1. 產品研究的目的與不變方向

SOURCERUNE 是電影／電視／遊戲／後期聲音設計用的 **source / transmission / condition / barrier / motion-distance / acoustic space / ambience / intelligibility / EQ-tone** 世界化處理器。

研究要回答的不是「有沒有別牌外掛也做這個」，而是：

1. 真正的聲音後期工作者**需要解決什麼情境與麻煩**，例如電話／無線電、PA、TV、Intercom、喇叭播放、不同裝置特性、隔門／隔牆／布料、外面經過的人車、室內外、近遠、向前／經過／離開、ADR 空間一致化等。
2. 哪些需求**不同使用者反覆提到**、哪些人群最常要求、哪些功能雖少見但有極高專業價值、哪些只是單一廠牌宣傳。
3. 實際**被使用／被推薦的參數、數值範圍、起始值、搭配順序與交互作用**是什麼，有沒有完整來源、適用情境、取樣率／延遲／CPU 條件。
4. SOURCERUNE 現有 SOURCE/TRANSMISSION/CONDITION/WALL-COVER/MOTION/SPACE/AMBIENCE/INTELLIGIBILITY/EQ-TONE、Scene presets、WEB/VST3 對應哪些高需求；哪些是真缺、哪些已存在但不好用、哪些重複、哪些設定容易出現不自然或相位問題。
5. 如何用**可信的開源算法、學術／書籍／廠商技術手冊與聲學工程實測**做出真實可信、低 CPU、可自動化、可 recall、VST3／WEB 相同的結果，不只是 UI 看起來像、聽感描述好像很真。

需求熱度 ≠ 物理正確性；一個常被討論的效果不代表其參數就是最佳值。專業工程實測 ≠ 多人需求證據；每條證據必須辨明在證明什麼。

## 2. 核准的大規模研究數量／八小時八階段流程

### 2.1 數量要求

使用者曾明確要求跨 **8 小時**分 8 輪，搜尋與檢視**約 10,000 個候選討論／搜尋命中／相關頁面**，不是叫 GPT 重複「10,000 次工具呼叫」；應盡量形成可查核原始證據清單。**先蒐集完整候選池，再做去重、需求聚類、交叉驗證，最後才挑約 1,000 筆真正具有代表性的有效證據**。

**嚴禁下列不實做法**：抓 1,000 筆就宣稱這是 10,000 筆整理結果；把同文章鏡像／轉貼／同一人多篇留言當不同需求者；把只有標題的搜尋結果當已閱讀討論；自己編 URL、論壇聲量、具體參數、實測值；把別家廣告當使用者好評；把示範案例算作真實用戶獨立推薦；沒有流水帳就聲稱完整 10k/1k。

- 候選池 `candidate_count`、實際已閱讀 `reviewed_count`、獨立來源／使用者 `independent_count`、canonical 去重後 `deduplicated_count`、符合資格的 `retained_count` 需**分別記錄實際數字**。
- 10,000 和 1,000 是規劃的**收集／篩選目標，不是已完成數字**。若受來源可近性／時間／付費牆限制，只報真實達成數與覆蓋率，保留下一階段 backlog，不能補假資料。
- 不可因想達到數字犧牲代表性或獨立性；選取 1,000 筆時，優先保留跨社群真正重複的高需求、反覆抱怨、具體可落地參數／鏈路、專家一致建議，另保留少見但辨識度／專業價值極高案例。

### 2.2 指定八階段（各輪需分開 checkpoint，不從頭重做）

1. **第 1 小時：Gearspace／舊 Gearslutz** — 影視後期、worldizing、音訊 plug-in、實務鏈路、專業混音師與設計師需求。
2. **第 2 小時：KVR Audio + Avid DUC** — 對現存外掛的不足、實際操作、Pro Tools 工作流程、參數與穩定性。
3. **第 3 小時：Reddit r/AudioPost + r/SoundDesign** — 後期工作者常見問題、抱怨、實際案例／建議；注意票數不等於真實獨立品質。
4. **第 4 小時：Creative COW + VI-Control** — 影像後製、對白／聲音設計、跨軟體工作實務。
5. **第 5 小時：Cockos/REAPER + game-audio communities** — DAW、互動遊戲音訊、聲源／發射器／距離運動與即時效能問題。
6. **第 6 小時：書籍、論文、開源 DSP、官方技術 manuals/vendor docs** — 以物理聲學、數位訊號處理與 API/host 行為來交叉核對，可為技術正確性證據；**官方產品行銷不能算使用者人氣證據**。
7. **第 7 小時：跨來源標準化、canonical URL 去重、語義聚類與參數統計** — 合併同一需求 cluster，分離重複轉貼和獨立使用者，整理真實使用場景、參數範圍、連動、需求熱度。
8. **第 8 小時：保留高價值約 1,000 筆、做功能優先級與產品缺口分析** — 按需求排名、常用參數與搭配、已實作情況、低 CPU 可行性、DSP 實作風險、預設場景覆蓋率，形成實際決策與待驗證清單。

若分多次排程工作：每輪保留「本輪來源數、候選數、去重後數、保留數、主要 cluster、來源與 SHA、未完成事項」，下一輪從前一輪查到的最後 checkpoint 接續。**不能每小時重新做全部八輪，也不能只靠腦中記憶累加筆數。**

## 3. 搜尋策略：跨專業社群、語言、真實問題描述

至少覆蓋上述專業社群；重大產品功能決策應盡量有**跨至少五個不同獨立論壇／社群類別**的印證（來源不足時明確說明）；書籍、論文、官方 manual 作技術交叉，但不灌成用戶數。論壇某一天找不到不可以假造結果。

搜尋不只關鍵字／品牌，要包含：
- **情境式描述**：聲音隔門、收音在遠處、喇叭／電視／對講機、電話壓縮、遠方 PA、車內聽車外、背包裡的手機、接近／經過／離開、ADR match、室外減少混響、原始聲與環境比率。
- **明確工作需求與抱怨**：「現有外掛做不到」「工作流程很慢」「不能跟畫面／DAW timeline 同步」「哪個參數比較像」「相位／延遲／音質不自然」「CPU 太大」「pre/post sound mismatch」。
- **參數／搭配**：距離與音量／空氣吸收、direct/early/tail、Doppler、bandwidth、noise/static、codec/dropout、source resonance、cover attenuation、stereo width、intelligibility、motion synchronization、gain staging。
- **多種語言、同義詞、技術用語／俗語、長尾工作流程**。不要只搜品牌名、商業比較表或編纂型 SEO list。

依需求群分記：SOURCE、TRANSMISSION／Bad Signal、CONDITION、WALL/COVER、MOTION/DISTANCE、SPACE/ENVIRONMENT、AMBIENCE、INTELLIGIBILITY、EQ/TONE、FEEDBACK、GENERATORS、Preset/Workflow、DAW VST3/WEB State/Automation/Recall、CPU／Latency。

## 4. 每筆可追蹤的最小研究證據結構

建議 machine-readable JSONL/CSV，加上人能讀的 MD 摘要。每筆至少包含：

- `record_id`、`canonical_url`、`original_url`、`platform/forum`、`source_type`（independent user / expert / technical paper / manual / vendor marketing 等）、`thread_or_page_title`、`author_or_anonymous_key`（只需匿名去重，不蒐集多餘個資）、`published_date`、`accessed_at`。
- `query_terms`、`problem_in_user_words`（簡述而非大量複製原文）、`use_case`、`module`、`need_cluster`、`specific_requested_feature`、`complaint/workaround`。
- `parameter_name`、`suggested_value_or_range`、`unit`、`context`（聲音來源／素材／sample rate／DAW／設備／sample conditions）、`parameter_chain` 或 related effects；只抄實際有來源支持者，未知留空。
- `engagement_signal`（回覆數／票數／長期活躍）、`independent_author_count_estimate`、`cross_forum_support`、`source_reliability`、`exact_or_semantic_duplicate_key`、`retained`、`retention_reason`。
- `evidence_role`（市場需求／工程可行性／音色測量／聽感參考／風險）、`product_decision`、`implementation_status`、`provenance_license`、`verification_status`、`verified_by_commit`。

**不得以論壇貼文取代可追溯的產品資料**。能重現的研究要附資料取得方式／去重邏輯與結果版本，便於新 GPT、不同時段恢復。別假裝未經來源授權的原聲、Impulse Response、量測素材可直接重發佈。

## 5. 去重、跨社群權重與「真正受歡迎」的判斷

依重要性由高到低：

1. **同一問題出現在多個獨立論壇／製作流程**：高可信共同需求。
2. **同一論壇有多個獨立用戶反覆提及**：次高可信，需排除複製帖／同作者重複。
3. **多年持續、討論深入且具體實作案例**：強化長期需求可靠性。
4. **具有實際參數、數值範圍、效果鏈／代替做法、可測條件**：幫助產品落地。
5. **單一但有明確特色／高專業價值的少見需求**：保留特色清單，不因少人提就刪除。
6. 廠商宣傳、付費置入、純品牌崇拜、沒有真工作問題與無意義轉貼：**不能計作獨立市場熱度**。

統計應分離：
- 需求**出現頻次**、獨立發言者數、論壇數與時間跨度；
- 具體數值的**分布**（範圍／中位數／典型情境），不可只抓一個極端值說是「大多數認可最佳參數」；
- 相互矛盾意見與失敗案例、客觀技術限制；
- **共同痛點**與**少見高價值特色**兩個排行榜，不把它們混成單一人氣數。

沒有足夠分母與來源記錄時不得寫「80% 用戶」、「最佳參數」、「證實 1,000 人要求」等量化結論。推薦與排序必須可追溯到 `record_id` 與統計方式。

## 6. 產品優先分配：40%／30%／30%（核心，不是刪除上限）

使用者核准的 SOURCERUNE **核心優先級**：

| 核心軸 | 權重 | 舉例 |
|---|---:|---|
| **SOURCE／EMITTER（發音體與播放裝置）** | **40%** | 電話、Radio/Walkie、PA、TV、喇叭、裝置響應、失真與指向性 |
| **MOTION／DISTANCE（距離與移動）** | **30%** | 人／車／火車 approach, pass-by, leave；Distance、Perspective、Doppler、timeline |
| **SPACE／ENVIRONMENT（場域／障礙）** | **30%** | ADR/office/room/outdoor、場域與初期反射、WALL/COVER 傳輸與遮蔽 |

這是**核心研究與設計投入的優先分配／代表性的核心場景組合**；不是强迫整個 factory 只能有 50 presets，也不是把 CONDITION、TRANSMISSION、AMBIENCE、INTELLIGIBILITY、EQ 等輔助模組刪掉。核心各軸必須與其他模組搭配，模組使用量不按 40/30/30 固定。

**已核准歷史決策**（見 `docs/research/PRESET_PORTFOLIO_REBALANCE_2026-10-05.md`）：
- 曾研究加權成 **50 核心 presets：20 SOURCE / 15 MOTION / 15 SPACE**，另有 **24 reserve**。
- 使用者之後**明確糾正**：不要把用途重疊的 phone/radio/PA/cover 等原有 presets 從可使用 Factory 移除；已將 **24 個 restore 為 active，總數 74**，`reservePresets` 空；`40/30/30` 繼續作為核心優先原則，額外的 24 個屬 `ADDITIONAL_SCENE`，不是刪除。
- 所有 factory 數值是**需要 audition 的建議起點**，不是論壇投票算出的「最精確物理參數」。`SCN_049–074` 的 78 張 Hero artwork 仍依獨立美術合同驗證，不能當已完成。

新需求影響 factory/模組時，先**掃現有功能和 74 個預設**：真缺則新增、重複則合併觀念與提供 variants（必要時可作進階/分類），但不得直接刪掉使用者核准保留的 preset／功能；須追蹤 ID、parameter state、browser/asset 和聲音行為，使用者未授權不可擅自部署改音。

## 7. 開源技術、客觀聲學與參數工程門檻

大數據可決定「哪些問題優先處理」，卻不能單獨決定「DSP 算法物理是否正確」。開源、論文、書籍與官方技術 manual 用於**解出合理算法及 CPU／latency／host 可行性**：

- SOURCE：真實播放裝置頻響、resonance、compression、frequency-dependent nonlinear、device directivity、noise/rattle；不能只用單一 EQ 假裝所有裝置。
- TRANSMISSION／Bad Signal：帶寬損失、noise/static、interference、packet loss/dropout、codec/bitrate artifact、signal compression；按媒介種類分模型而非一種 distortion 打遍全部。
- CONDITION：NEW／USED／OLD／DAMAGED 的不穩定度、rattle、buzz、wow/flutter、imbalance、intermittent contact 等；與真正的無線網路傳輸問題分開。
- WALL/COVER：頻率相依傳輸衰減、材質吸收、panel/cavity resonance、縫隙漏音、短反射；查材料／測試條件與頻帶資料，不要無來源隨便估 -dB。
- DISTANCE/MOTION：distance law、air absorption、width/perspective、Doppler、direct/early/late ratio、time-of-flight、Start/Closest/End、對 host timeline 的同步；近距離、通過瞬間相位／音量不要突然跳。
- SPACE：sparse early reflections、合理室內衰減／低 CPU late FDN、戶外地面／側邊反射、尺寸與混響尾巴；不要硬加大混響以假裝距離感。
- AMBIENCE／INTELLIGIBILITY：確定性 Seed、合成無限 ambience、Duck、語音清晰度與 consonant/presence 控制；保留現場空間真實感與可重現性。
- 其他低階工程規則：沒有音訊執行緒 allocate/locks/I/O，低 CPU，固定可回報 PDC，host automation/state 可靠，VST3+Web WASM/AudioWorklet 相同 DSP/參數語意；各算法候選要寫測試與聆聽證據。

**選算法必須有可重現的比較**：列出可能方案（至少不同設計思路，非僅換品牌名）、其推導／來源、CPU／延遲／記憶體／alias／相位／stereo image／transition artifacts、客觀量測、主觀 blind 或 controlled listening（有做才宣稱）、Native/Web parity 與風險。失敗要寫清；不得「在腦中模擬 100 次」就當真的執行 DSP tests。

開源不等於可直接商業重發佈：保留演算法來源、程式碼 license、資料集權利、IR／音檔／圖像 provenance。缺少授權或可驗證數據，就標示探索性或待確認。

## 8. 研究結果如何進入「做什麼／怎麼做」與版本決策

所有重要新增功能、參數、Preset、預設數值／範圍、DSP 替換提案都應有以下**兩種證據**：

1. **使用者與工作流程證據**：至少說明代表哪幾個 forum/user cases、常見/少見高價值、相對當前功能的真缺口與競品痛點。
2. **工程／聽感證據**：算法原理、音質保真目標、可重現測量，CPU／latency／phase／host/recall 風險，與現有處理順序／其他模組交互；先小型試驗，通過最小必要測試，再按原 CI 規範驗證。

建議決策紀錄最少有：
- `decision_id`、`feature_or_preset_id`、`evidence_record_ids`、`demand_frequency`（有數據才填）、`rarity_value`、`independent_source_count`、`engineering_refs`；
- 現行行為／缺點、候選方案與優缺點、建議數值及**適用條件**、對其他 DSP 模組影響、驗聽/量測結果（未做標 `PENDING`）；
- 優先序 `high-demand / rare-high-value / low-evidence-experimental`、是否保留與 factory／reserve 關係、使用者是否核准、commit/PR、下一步。

**產品已有經核准設計時**：先沿用／確認，不要因搜尋到三篇帖子就任意推翻。研究缺資料時可以產出「候選」／「暫定」規格與測試計畫，但不能對外聲稱是真正由上萬資料算出的最佳參數或擅自改已有 DSP/presets。

## 9. 順序／工作節奏／測試安全隔離

**研究工作 ≠ 授權任意跑 Deep/Release/100 輪壓測**。本文件的八階段蒐集是 evidence collection，而非 CI test rounds；CI 一律依 `PROJECT_RULES.md`：日常 Fast，自行提高 safety/stress/regression 次數或手動 Deep/Release 必須先徵得使用者同意。

研究每輪建立短小 checkpoint（原始來源/去重鍵/統計摘要／決策差分）；失敗按 repo 「同錯最多兩次／infra 外部阻塞」處理。新研究結果應**先寫 docs/research 的資料庫與決策 memo**；若影響批准功能，再由使用者授權的獨立 UI／DSP／Preset 工作線落地，不能把所有問題混同一大型 PR。

排程是否真正啟用要查 automations，不可因本文有「8 小時」或「每小時」就聲稱正在背景跑；要以最後執行記錄／GitHub commit／去重資料數為證。

## 10. 當前研究證據成熟度（歷史事實，不是永久完成宣告）

截至 2026-10-08 編製此標準時：
- `docs/research/EVIDENCE_LEDGER.md` **明確寫明「ledger created; large-scale population still pending」**；沒有可核對的 10,000 筆候選與 1,000 筆有效證據庫。
- `docs/research/PRESET_PORTFOLIO_REBALANCE_2026-10-05.md` 記錄研究加權決策、50 核心+24 恢復為 active 74；**不等於能驗證 10,000/1,000 證據數已達標**。
- 既有 8 小時論壇研究曾有流程／研究結果摘要，但「規劃完成」與「有真正可檢查每一筆連結／分類／數值」完全不同。若未找到資料，不得寫 `DONE`。
- 因此後續 GPT **應視大型可審計資料集建置／驗證仍待完成**；能核查的範圍外只能標示 `PENDING / EVIDENCE-INCOMPLETE`。

## 11. 永久儲存與新 GPT 必讀

- **最高優先簡明禁令**：repo `PROJECT_RULES.md` 的「研究／實證先行」節。
- **完整方法原則**：本文件 `docs/research/RESEARCH_EVIDENCE_STANDARD.md`。
- **永久跨產品方向**：`PROJECT_CONSTITUTION.md`，必須連到本文件並保留 40/30/30、10k/1k、八階段、74 Factory 的決策與「不可假資料」。
- **所有 GPT 入口**：`AGENTS.md`，GitHub Copilot 入口 `.github/copilot-instructions.md`，並在 README 首屏提供。
- **真正研究紀錄與資料**：`docs/research/EVIDENCE_LEDGER.md` 及其後續可機讀 raw/normalized/cluster/decision 檔。每輪 checkpoint 可追溯。
- **目前進度**：`SOURCERUNE_MASTER_HANDOFF.md`，不取代永久規則。

**本規則的目標是：「讓任何新 GPT 能知道，SOURCERUNE 為什麼要有這些功能、參數、場景，且將來任何數據設計都必須經過真正可信的多源大數據與工程驗證，不能再問使用者同樣的原則。」**
