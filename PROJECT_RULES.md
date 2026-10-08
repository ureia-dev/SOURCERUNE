# SOURCERUNE Project Rules

> 此檔的 Fast/Deep/Release、安全測試觸發與 VST3／WEB 同步為最高優先專案限制；產品方向、完整使用者永久原則與 UI/REF/資產製程另見 **[PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md)**，新 GPT 應從 **[AGENTS.md](AGENTS.md)** 進入。進度交接不是憲章替代品。

## 永久最高執行原則：有指令立即做，排程只在明確要求時使用

1. 使用者說「做／修改／修好／部署／現在跑／繼續／詳細研究」時，**當回合立即執行授權且可做的工作，建立實際 commit、測試、研究記錄或可驗證交付**。不能自行把原本一個指令就可完成的工作拖成「第 1～8 小時」，或只回「已排程」但本輪沒有成果。
2. 若工作規模大，**拆成可中斷且各自驗證的小步驟連續執行**；不是擅自把每個小步分配成一個小時。每個成功小步留 checkpoint，先報結果，再安全地前進；無新資訊要做根因診斷。
3. 只有使用者**明確要求稍後／每小時／每天／持續監控或排程**時才建立或調整對應自動化。排程頻率、執行截止、當輪研究量是**該次工作設定**，不是整個 SOURCERUNE 的永久研究時數、測試次數或產出速度限制。
4. 研究規模（初始約 10,000 候選／1,000 高價值）、推導輪次、排程每小時、Fast/Deep/Release CI 次數是**四種不同量**，不得互相替代、暗中增加或當作已實際完成。無法當回合完成時說明真 blocker／留下可恢復狀態；不能假稱背景工作仍在跑。
5. 使用者明確只問問題、只要檢查或說暫時不要修改時，**尊重只讀範圍**；不因長期專案使命就擅改音效、Preset、CI 或部署。

## 永久最高產品分工：GPT 主責 DSP 工程，使用者只負責試聽驗收

1. **GPT／開發助手主動負責**：研究聲學與開源算法、設計、編寫和修正 C++ DSP、建立可靠的測試訊號、客觀量測與性能／相位／延遲等檢查、雙端 VST3/WEB parity、修復 CI、編譯與提供真正可試聽成品。
2. **使用者主要負責聆聽、主觀評價與核准音質方向**，不是 IR 蒐集員、聲學量測員、DSP 工程師、CI 維護者。不得要求使用者先交付 IR、錄音、特定場地測試資料才開始核心 SOURCERUNE DSP 研發。
3. 核心 SOURCE／COVER／SPACE／AMBIENCE 優先參數化／程序化建模；IR 或合法的實測資料可作研究／校準與明確核准的特殊功能，但**不是使用者必交素材，也不是產品基本運作的唯一前提**。嚴禁假造 IR、權利、客觀量測或「我已經聽過」。
4. 完整責任與驗收契約為 **[docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md](docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md)**。這項長期分工**不**代表 UI-only 任務可任意更改已核准 DSP 音色、Preset、processing order、CI 測試次數；當次授權範圍、使用者聽感審核及安全測試規則仍有效。

## 產品決策最高原則：先用真實大數據，後做 SOURCERUNE（永久有效）

**產品功能選擇、參數範圍／搭配、核心場景／Factory Preset、DSP 算法方向與優先序，絕對不能靠 GPT 猜測、廠商文案或零星論壇貼文決定；要以大量且可追溯的專業後期使用者需求、跨社群共識、開源／學術／工程驗證為基準。** 這是與本檔 CI 安全規則同級的**最高產品研發原則**。完整可操作標準必讀 **[docs/research/RESEARCH_EVIDENCE_STANDARD.md](docs/research/RESEARCH_EVIDENCE_STANDARD.md)**，不得因更換 GPT／分支／交接而忽略。

1. **先搜足、再挑精**：使用者要求長期、跨領域持續研究；原先「八小時」只是歷史執行排程，不是永久研究上限。依八個可並行、持續循環的研究維度蒐集與審閱**初始里程碑約 10,000 個候選論壇／討論／相關頁面**，跨 Gearspace、KVR、Avid DUC、Reddit AudioPost/SoundDesign、Creative COW、VI-Control、REAPER、game-audio 社群；另以論文、書籍、開源 DSP、官方 manuals 做技術核對。候選不是 10,000 次 API 呼叫。
2. **跨來源持續去重、需求聚類，初始里程碑保留約 1,000 筆真正有代表性的證據**：獨立使用者反覆需要、跨論壇重複、具體痛點與最佳參數／搭配、少見高專業價值。不能先湊 1,000 條就說研究完成；鏡像／轉貼／同一人重複／行銷宣傳不算獨立需求。
3. **統計才排序**：比較 forum 數、獨立使用者數、時間跨度、使用情境、參數數值分布、常見連動／效果鏈；分開「多人高頻需求」與「少見但獨特有用」。任何數字、來源、統計、最佳參數都必須提供可核對的 `record_id`、canonical URL 與去重方法；**禁止虛構資料、10k／1k 達成率、論壇人氣、量測結果**。
4. **產品核心優先權永遠遵循 SOURCE/EMITTER 40%、MOTION/DISTANCE 30%、SPACE/ENVIRONMENT 30%**；這是核心方向，不是把其他模組或 Preset 刪除的理由。使用者已要求保留 74 個 Factory Preset（50 核心＋原來的 24 個追加場景）；不得擅自把重複變體移除、刪到 50。
5. **用技術與實測兌現需求**：依可信開源算法、論文、物理聲學、CPU／phase／latency、VST3／WEB parity 與實聽／可重現測量決定實作。論壇提到的「好聲」不等於某個值在所有情境最正確；參數必須有來源、條件和驗證紀錄。
6. **先核現有產品再改**：對每項候選需求找對應模組、參數 ID、Preset／場景，標已有、缺少、重複、缺驗證或高價值特色，再由適當獨立 PR 實作。已核准功能不能隨便刪；沒有新研究資料可先作 `PROVISIONAL` 設計，但不能聲稱「大數據已驗證」或自行改使用者鎖定的 DSP／Preset。
7. **研究與測試分開**：歷史八小時研究排程或持續研究都不等於授權 20／100 輪 Deep/Release 安全測試；所有 CI／safety 次數仍遵守本檔下方三層規則。研究資料庫必須能從 checkpoint 恢復、跨 GPT 接手、不假設排程仍啟用。
8. **研究現況不可假報完成**：截至 2026-10-08，`docs/research/EVIDENCE_LEDGER.md` 仍寫大型證據資料填充待完成；曾進行歷史分時整理與 Factory 權重調整，**不代表有可稽核的 10,000 候選／1,000 有效紀錄**。必須以實際 record 計數、來源與完成階段回報。

此節專管**「該做什麼、為什麼這樣設計」**；以下既有 Fast/Deep/Release 規則專管**「能怎樣執行測試」**。兩者不可互相覆蓋，任何後續交接不得取代這兩項最高原則。

## GitHub CI 三層制與安全測試鎖定（最高優先）

1. 所有 CI 固定分成 **Fast / Deep / Release** 三層；不得自行新增第四層，或把 Deep／Release 偷塞進日常 Fast。
2. **Fast** 是日常唯一自動層：PR 只跑必要的語法、資料完整性、mirror parity 與結構 smoke；每項正常執行一次。
3. **Deep** 只能手動觸發；執行較完整的一致性／整合驗證，但使用各測試或檢查本身的預設次數。
4. **Release** 只能手動觸發；正式 build/package/release-readiness 屬此層。若目前尚無可建置 VST3/WASM target，不得假裝已完成 binary release validation。
5. 所有 safety／stress／regression 的**觸發時機、重複次數、rounds、iterations、matrix expansion、重跑倍數**都是鎖定設定。要改之前必須先詢問使用者並取得明確同意。
6. 未取得使用者同意時，不得因「更安全」把一次檢查改成 ×10／×100／多輪，也不得把手動 Deep／Release 改成自動。
7. GitHub runner／平台故障造成的 rerun，只能重新執行同一份既定檢查，不得藉 rerun 增加驗證倍數。
8. 未來新增 DSP、VST3、WASM、AudioWorklet、Golden/Parity 等測試時，也必須先歸入 Fast／Deep／Release 其中一層；若涉及安全壓測的觸發與次數，先詢問使用者。


## VST3 / WEB 同步部署規則

1. VST3 與 WEB 是同等 mainline targets。凡正式功能、UI、參數/state、DSP、Preset binding 或 processing behavior 的部署變更，必須同步評估並更新 VST3 與 WEB 對應實作，不得只改單一 target 後宣稱完成部署。
2. 純 WEB 預覽基礎設施（例如 GitHub Pages 靜態發布入口）不改變產品 DSP；它只負責展示目前 WEB runtime。
3. 若某項變更在其中一個 target 尚無可實作的底層 target/build，必須明確標示 pending，不得假裝 parity 已完成。
4. UI Preview Deploy 為獨立靜態發布流程，不屬 Fast / Deep / Release 安全測試；它不得自行增加 safety/stress/regression rounds 或 iterations。
