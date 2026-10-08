# SOURCERUNE — 討論決議追溯、遺漏修補與防止錯排程稽核

> **這是「對話要求 → 現有證據 → 永久文件」的追溯清單，不是再宣稱讀到全部失落的逐字稿。**
>
> 本次稽核日期：2026-10-08。主線基準：GitHub `main` at `d614c7a2476b238b1af509627205d7f08de1d7ac`（開始前）；後續 SHA 依 live GitHub。資料覆蓋：本次可見的使用者對話、歷史封存 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md`、目前 repo 下列正式契約、可查到的部分先前談話摘要。**不可取得的更早逐字消息標為 `UNVERIFIED-PREVIOUS-CHAT`，不捏造完整度。**

## 0A. 使用者已找回真正的最初產品設計對話（原始來源校正）

**2026-10-08 使用者明確更正：最初討論 SOURCERUNE 的產品方向、DSP 責任、研究方法與各項細節的對話，是：**

- **原始對話 URL：** https://chatgpt.com/c/6abfd770-e594-83e8-adc4-992fa6ed47b3
- **原始對話識別碼：** `6abfd770-e594-83e8-adc4-992fa6ed47b3`
- **來源身分：** `USER-IDENTIFIED-ORIGINAL-CONVERSATION`（使用者明確指定的正本）
- **全文讀取狀態：** `CONTENT-NOT-ACCESSIBLE-YET`。該 `/c/` 網址為登入使用者的私人聊天入口；本次工具無法取得該對話完整逐字稿，歷史個人對話檢索也沒有返回對應的完整內容。
- **逐字完整核對狀態：** `PENDING-VERBATIM`／`SOURCE-COVERAGE-PARTIAL`。**不得標示 100% 已核對，也不得把這份對話當成真的已完整閱讀。**
- **取得全文後的強制工作：** 從第 1 則到最後 1 則，逐條標 `SOURCE MESSAGE → INITIAL REQUIREMENT → LATER MODIFICATION → FINAL APPROVED DECISION → PERMANENT/ONE-OFF/SCHEDULE → AUTHORITATIVE DOC PATH → VERIFIED CHECKPOINT`；修補遺漏與矛盾，保留先前已完成 checkpoint，逐段審核，不以另一份摘要替代原文。

**重要來源更正：** 先前本次交接工作誤把後續「UI_01／UI_02 REF 精掃、每小時進度」的聊天當成「最初全部產品討論」。這些聊天及 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md` **仍屬有效的後續要求／歷史整理**，但**不是最初產品對話的全文替代品**。舊摘要保留，並在來源層級上低於上述使用者指定的正本。

**行動界線：** 本次只校正「原始對話是誰、是否真的已讀」。在未取得完整訊息之前不能憑空追加或宣稱復原原始產品核准值；已由使用者再次明確確認的 DSP 主責、免提供 IR、試聽驗收與立即執行等要求仍維持有效。

## 0. 上次整理錯在哪

1. **以摘要轉抄摘要**：歷史 `SOURCERUNE_MASTER_HANDOFF.md` 已遺漏 DSP 角色分工；新的永久憲章仍從它抽取，導致原本討論過的實作責任再次消失。
2. **把一次排程當永久產品規格**：曾把八個研究來源錯定成第 1～8 小時的工作時段，令研究規則綁定執行時間；前一輪已修為八個持續研究維度，但還須統一「一個指令可當下完成就應現在完成」的操作規範。
3. **混淆三個概念**：真實後期 IR 可供研究 ≠ 使用者必須提供 IR ≠ 正式 DSP 一定是 IR 卷積；技術契約其實偏向程序化、參數化模型。
4. **沒有來源到文件的對照矩陣**：只列「寫了多少字、是否有關鍵字」無法證明使用者每個決策已覆蓋。往後每個決策要註明來源、持續／單次性、權威檔、狀態與可驗證的剩餘缺口。
5. **混淆「已記錄／已設計／已實作／已編譯／已客觀驗證／已試聽」**：每階段必須分開證明。文件存在不代表產品完成。

## 1. 要求狀態定義

- `EXPLICIT`：在本次對話可見使用者原話或當次明確更正。
- `REPO-CONFIRMED`：GitHub 正式文件／manifest 已記錄，須再與 live 程式和現況核對。
- `RECOVERED-SUMMARY`：從可取得的更早交談摘要回復決策，無完整逐字稿；不能當全文核對證明。
- `HISTORICAL-ONE-OFF`：某次排程／研究次數／暫定圖像，**不是永久執行上限或所有任務的必走時程**。
- `CONFLICT-RESOLVED`：新明確使用者決議覆蓋舊草圖／助理假設；要標明優先順序。
- `PENDING-VERBATIM`：只找到摘要而未找到原話／核准範圍；**保留而不自稱 100%**。

## 2. 用戶決議逐項對照

| ID | 決議／原意 | 來源與可信度 | 永久規格／動態檔 | 防止誤解／狀態 |
|---|---|---|---|---|
| GOV-01 | GPT 在單一 repo 做專案，集中 VST3、WEB、DSP、UI、Preset、CI | `REPO-CONFIRMED`：`docs/architecture/SINGLE_REPO_PUBLIC_POLICY.md`、`PROJECT_STRUCTURE.md`；較早討論亦有拒絕雙 repo 的摘要 | `PROJECT_CONSTITUTION.md`／`AGENTS.md` | 不新建另一套公開/私有 repo 分工 |
| GOV-02 | VST3 與 WEB 同為正式目標，底層 C++ 同一 DSP/state；UI01/UI02 都是正式版 | `REPO-CONFIRMED`：`PROJECT_STRUCTURE.md`、`PROJECT_RULES.md`、`UI_FUNCTION_CONTRACT.md` | architecture + constitution | 兩端 parity，不能只改 Web 就報 VST 完成 |
| GOV-03 | 對話會斷線：每步有 commit、HEAD、PR/CI、部署、下一步，恢復不從頭重做 | `EXPLICIT`：本次與 GitHub 專案長期規則；`AGENTS.md` | `PROJECT_RULES.md` + `AGENTS.md` | 每小步 checkpoint、同錯最多 2 次 |
| GOV-04 | 已授權安全自主 PR、merge、Web/VST3 部署，不要讓使用者手動按 GitHub | `EXPLICIT`：歷史封存 §2.2／本次對話 | `AGENTS.md` + constitution | 有權限／基礎設施限制要明確說；不可假部署 |
| GOV-05 | 日常 Fast；Deep/Release 與安全壓力倍數不能擅改 | `EXPLICIT`／`REPO-CONFIRMED`：`PROJECT_RULES.md` | `PROJECT_RULES.md` | 不把「要做很多輪研究」當成 CI stress 授權 |
| GOV-06 | 指令當次就能處理的內容，**當下執行並完成／checkpoint**；只有使用者明確說「排程」才另建定時工作 | `EXPLICIT`：本次使用者反映、先前「現在跑／繼續」原話 | **本次補入** `PROJECT_RULES.md`、`AGENTS.md` | 過去錯把一次可完成的研究／改檔任務拆成八小時 |
| GOV-07 | 排程可用每小時進度，須由使用者指令啟用；執行時一輪多個緊密小步，不得黑箱 | `EXPLICIT`：本次對話排程變更 | constitution + handoff／automation 狀態 | 執行頻率不等於工作內容永久限速 |
| GOV-08 | 採繁體中文，使用者希望直接成果而非反覆問同一授權 | `EXPLICIT`：可見對話／AGENTS | `AGENTS.md` | 檔案與測試要有實際證據 |
| OWN-01 | **GPT 主責 DSP 研究、算法設計、程式實作、測試、修正、最佳化**；不是交工程給使用者 | `EXPLICIT`：當次使用者「你做 DSP」／「我只負責聽」 | **本次補入** `docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md` | 長期分工，非每個 UI 任務均可擅改 DSP |
| OWN-02 | **使用者主責最後試聽、評價、核准聲音方向**；不需要做工程測試 | `EXPLICIT`：當次使用者 | DSP ownership contract | GPT 不得虛稱能做人類真實聽感驗收 |
| OWN-03 | **不需要使用者提供 IR、錄音、量測素材**才能研究實作 DSP | `EXPLICIT`：當次使用者；`DSP_BEHAVIOR_CONTRACT_V1.md` 偏生成建模 | DSP ownership contract | 可參考合法測試/校準資料，不要求使用者下載/取得 |
| DSP-01 | SOURCE/TRANSMISSION/CONDITION/COVER/MOTION/SPACE/AMBIENCE/INTELLIGIBILITY/EQ 全模組真實算法 | `REPO-CONFIRMED`：`DSP_BEHAVIOR_CONTRACT_V1.md`、`UI_FUNCTION_CONTRACT.md` | DSP behavior + ownership contract | 功能 contract ≠ C++ 現已可執行 |
| DSP-02 | IR 不是主線硬需求；優先生成／建模 Source、Cover、Space、Ambience | `REPO-CONFIRMED`：`DSP_BEHAVIOR_CONTRACT_V1.md`、`STRUCTURE_REVIEW_100.md` | DSP behavior + ownership contract | 早期草圖「大量真實後期 IR」屬歷史概念；`CONFLICT-RESOLVED` |
| DSP-03 | 超低 CPU、native-rate baseline、near-zero bypass、固定 PDC、音訊執行緒不 allocate/lock/I/O | `REPO-CONFIRMED`：`DSP_BEHAVIOR_CONTRACT_V1.md` | architecture/DSP contract | 測試結果另需 run/bench evidence |
| DSP-04 | 距離不是只降音量；要平衡 Level、DRR、HF air loss、perspective、Width、Motion、Doppler | `REPO-CONFIRMED`：`DSP_BEHAVIOR_CONTRACT_V1.md`；較早研究摘要 | DSP behavior + research standard | algorithm 配方需實際音訊驗證 |
| DSP-05 | 隔牆/材質不是只 low-pass；要頻率相依透射、漏音、板共振等 | `REPO-CONFIRMED`：DSP behavior / research | DSP behavior | 不亂填「最佳 dB」 |
| DSP-06 | 品質追求逼真，客觀 benchmark + 人耳試聽循環；沒有做就標 PENDING | `REPO-CONFIRMED` + `EXPLICIT` 使用者主觀驗收 | DSP ownership + research standard | 不能說「精算 N 次」等同真實跑測試 |
| RES-01 | 跨論壇、跨語言、開源與科學證據做長期「大數據」產品決策 | `EXPLICIT`：使用者本次更正／`RESEARCH_EVIDENCE_STANDARD.md` | `PROJECT_RULES.md` + `docs/research/` | 不以 1–2 篇帖或品牌廣告當共識 |
| RES-02 | 約 10k 候選 → 去重聚類 → 約 1k 高價值；真數量不足不得假稱已做 | `EXPLICIT` + `REPO-CONFIRMED`：研究文件 | research standard / evidence ledger | 是初期里程碑，不是完成上限 |
| RES-03 | 8 個持續研究面向**不是永久 8 小時時段**；某次分八小時只是臨時排程 | `EXPLICIT`：本次使用者更正；`RESEARCH_EVIDENCE_STANDARD.md` | research standard + PROJECT_RULES | `CONFLICT-RESOLVED`：刪除永久「第N小時」規則 |
| RES-04 | SOURCE 40%／MOTION 30%／SPACE 30% 是產品優先重心，不是刪 Preset 限額 | `REPO-CONFIRMED`：Preset rebalance memo／研究標準 | constitution + research | 不把 74 縮成 50 |
| RES-05 | Factory 74 active（原來 24 reserve 恢復），實際數值仍待 audition | `REPO-CONFIRMED`：`docs/research/PRESET_PORTFOLIO_REBALANCE_2026-10-05.md` | preset memo | 任何內容／音色修改需對應授權 |
| RES-06 | 各個來源的討論推薦值要考慮模組交互、CPU、phase/alias、VST3/WEB parity | `REPO-CONFIRMED`：研究標準／DSP contract | research standard | 參數不是無條件全素材共用 |
| UI-01 | UI_01 是正式四卡 reference，不是舊五卡 CONDITION 參考 | `REPO-CONFIRMED`：UI01 REF PIXEL SPEC／歷史 handoff | REF MD/JSON | 不拿舊草圖量正式布局 |
| UI-02 | UI_02 是 Scene-heavy 獨立視覺版；Web/VST3 都要同步 | `REPO-CONFIRMED`：UI02 layout／contract | UI02 REF MD/JSON | 不把 UI_01 機械縮排 |
| UI-03 | 兩張 UI 原圖所有物件／背景／文字／Knob／大小座標／材質需精掃，列真缺口 | `EXPLICIT`：本次對話，原始完整 handoff | REF MD/JSON + gap audit | 必須有 approved full REF 才能標精確 CONFIRMED |
| UI-04 | 獨立 PNG／9-slice／可即時控制的文字、旋鈕指針、Waveform、meter；不可拿整張 REF 當 runtime | `EXPLICIT`：本次對話／AGENTS／REF 文件 | UI contracts | 圖檔存在 ≠ 互動已實裝 |
| UI-05 | Plugin 可等比例縮放約 75%～125%／Fit Window，保持精確鎖定的原生布局 | `RECOVERED-SUMMARY` + `REPO-CONFIRMED`：Web scale/native LayoutSpec 相關成果 | UI layout／runtime；**本次納入永久入口** | 詳細縮放範圍需與實際 runtime 最新值核對 |
| UI-06 | 專業模擬類比旋鈕優先穩定 Blender 可參數化建模／render，不是反覆亂生一張 AI 圖 | `RECOVERED-SUMMARY`：較早 UI 討論（未持有逐字稿） | **本次納入 decisions audit / permanent principle** | Blender 可重製工法，禁止未授權重設核准材質 |
| VIS-01 | 世界化場景需真實、專業、電影後期感，不要廉價／過度 AI 假機械風 | `REPO-CONFIRMED`：`VISUAL_STYLE_V2.md`；較早使用者審美回饋摘要 | style spec | 每個 Scene 與 UI asset 需核對風格 |
| ART-01 | Scene 049～074 是 26 個新 hero × 3 個尺寸，合計 78 張獨立 artwork | `REPO-CONFIRMED`：`SCENE_HERO_049_074_PRODUCTION_V1.md` | art production spec | 不能把 atlas 切塊冒充完工 |
| AUD-01 | 聲學音質與預設值需真正 audition；使用者試聽審核，不是工程報 PASS 就算主觀完成 | `EXPLICIT` + `REPO-CONFIRMED`：Preset memo / ownership contract | DSP ownership | 技術 gate 與主觀 gate 分開 |
| OPS-01 | 預覽需要實際可看／可聽的 Web URL；部署要連同 VST3 同步評估 | `REPO-CONFIRMED` + `EXPLICIT`：原始 handoff、PROJECT_RULES | Web Preview／Native build | 不以 HTML source 或只畫一張 preview 冒充完成 |
| OPS-02 | 開發目標清楚就盡量自主完成，不要一直回問，僅真實權限／不可逆／付費阻塞才詢問 | `RECOVERED-SUMMARY`、本次可見自主部署要求 | AGENTS + PROJECT_RULES | 不超過工具／權限；不能在 background 假做 |
| OPS-03 | 若不能在同一回合完成，才分批；不因有排程就把單次可完工作延後 | `EXPLICIT`：本次更正 | **本次補入** PROJECT_RULES/AGENTS | **立即工作優先於無謂排程** |

## 3. 必須保存的「立即執行／排程」區別

| 使用者指令型態 | 正確解讀 | 不得做 |
|---|---|---|
| 「做、現在做、繼續、部屬、修好、把文件寫進 GitHub」 | 當回合可安全完成的內容**立即做**，進行一次或數個可驗證小步，commit／驗證；必要時逐小批輸出 | 自行拆成第 1～8 小時等，卻當下不做 |
| 「研究一下、詳細精算、去比對論壇、評估參數」 | 當回合先做授權範圍內實際研究／查核與可驗證分析，交付具體結果、真來源／測試紀錄 | 以「排程明天做」代替現在可完成工作，或聲稱腦內運算等於測試 |
| 「排程每小時／每天、直到我說暫停」 | **才建立或更新真正 automation**，保持每個 run 可恢復／可驗證；每輪工作量依使用者最新指令 | 混成永久產品研究上限、擅自新增 Deep/Release 或承諾沒有真正建立的自動化 |
| 「先問一下、只是確認、不要動」 | **只回答／查核**，不改 repo 或排程（除非明確再要求更動） | 擅自改 DSP／CI／Preset 或建立任務 |
| 遇到外部阻塞 | 誠實標 `EXTERNAL-BLOCKED`，保存當前 checkpoint，分析真正根因 | 任意更改音效程式碼來掩蓋 GitHub runner 問題 |

### 數量與時間的四種不同含義，必須分開寫

- `research_target`：候選數、有效來源數（如初始 10,000→1,000），**不是資料已完成數字**。
- `reasoning/requested_analysis`：使用者要求的多輪估算、對比、修正；可分次提供可追溯分析，**不等於已真實執行數千次程序／壓測**。
- `automation_cadence`：每小時／每天／八小時限時／持續 until pause，**只對當時已授權、實際建立的排程有效**。
- `ci_execution_limits`：Fast／Deep／Release/Host Safety 的工作流與次數，以 `PROJECT_RULES.md` 最高優先鎖定；不能被 research/analysis counts 悄悄覆蓋。

## 4. 曾遺漏、但其他 repo 檔已有的技術決議索引

研究主線：`docs/research/RESEARCH_EVIDENCE_STANDARD.md`；DSP 設計：`docs/architecture/DSP_BEHAVIOR_CONTRACT_V1.md`；100 結構檢查：`docs/architecture/STRUCTURE_REVIEW_100.md`；單 repo：`docs/architecture/SINGLE_REPO_PUBLIC_POLICY.md`、`PROJECT_STRUCTURE.md`；Preset 74：`docs/research/PRESET_PORTFOLIO_REBALANCE_2026-10-05.md`；UI 參數／功能：`docs/product/UI_FUNCTION_CONTRACT.md`；UI REF：`docs/product/reference/`；所有素材風格：`docs/product/VISUAL_STYLE_V2.md`；Scene art：`docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md`；DSP／聆聽分工：`docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md`。

## 5. 尚不能聲稱 100% 核對的來源缺口

- 無法從 GitHub 文件取回**過去所有聊天室每一則的逐字原文**。封存的約 28K handoff 本來就是摘要，不能當完整逐字稿。部分更早決策只能以 GitHub 正式文件／先前摘要做交叉驗證，故標 `RECOVERED-SUMMARY`。
- `UI-05` 的 75～125% 為較早討論中已記錄的方向，必須以最新 UI runtime 的實際支援程度標註 build status；`UI-06` 的 Blender 為更早核准方向，需再次核對 asset/recipe 檔才算已全面實作。
- 原始概念「大量真實後期 IR」與正式 DSP behavior「prefer generated/modelled」的來源已明確區分；可做的功能仍須根據真正 DSP build 見證，而不是文件衝突就主觀裁決。
- 研究 ledger 大規模資料尚未完成；不能把曾經搜尋／設想 10k 當成有 10k 條保存證據。
- 音色／Preset 真正的試聽是否完成必須有使用者的實際驗收紀錄；不能從工程 PASS 或 asset PNG 數量推算。
- 日後每發現新談話要點，補一條新的 `decision_id`，記錄**來源可追溯性、永久 vs 一次性、之前文件的錯誤點、修正的 commit、剩餘待證事項**。不要再用「搜尋關鍵字全部 PASS」替代逐條確認。

## 6. 下一次更改永久規範時的防漏稽核

1. 讀本 decision matrix、原始 historical handoff 及有關專案正式契約；能取得更早使用者原話就重新比對。
2. 把每一項新用戶要求歸類：`PERMANENT`、`TASK-ONCE`、`SCHEDULE-ONLY`、`EXPERIMENTAL`、`SUPERSEDED`。
3. `PERMANENT` 必須寫入 `PROJECT_RULES.md`／`PROJECT_CONSTITUTION.md` 和 domain authoritative contract；`TASK-ONCE` 應立即實作或明確阻塞；`SCHEDULE-ONLY` 僅寫 actual automation／checkpoint；`EXPERIMENTAL` 不得假裝已核准。
4. 更新 `AGENTS.md`，讓後續 GPT 開始時先讀**永久規範 + 這份 audit matrix**，避免再從不完整 handoff 反覆摘要。
5. 實際 CI、PR／merge、build、測試、音質 audition 各分開驗收；當次只做文件修復不可宣稱 DSP 完工。
6. 若**當次全部歷史逐字稿無法取得**，明確標示 `SOURCE-COVERAGE-PARTIAL`，禁止再聲稱「全篇 100% 完整」。

**本次真正要修的，不是增加文件字數，而是讓每個討論結論有身份、權威位置、是否永久的分類與可查核的現實狀態。**
