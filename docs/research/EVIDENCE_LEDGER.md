# SOURCERUNE Research Evidence Ledger

> **最高產品研發原則：正式完整研究方法參照 [RESEARCH_EVIDENCE_STANDARD.md](RESEARCH_EVIDENCE_STANDARD.md)、[PROJECT_RULES.md](../../PROJECT_RULES.md) 與 [PROJECT_CONSTITUTION.md](../../PROJECT_CONSTITUTION.md)。此檔是資料帳本入口，不是「已完成萬筆研究」的證明。**

## 研究目標與當前可查核進度

- 指定 **8 小時／8 階段**，跨 Gearspace、KVR、Avid DUC、Reddit AudioPost/SoundDesign、Creative COW、VI-Control、Cockos/REAPER、game-audio 與工程學術來源。
- 蒐集／審閱約 **10,000 筆候選** → 來源／發文者與 canonical URL 去重 → semantic cluster → cross-forum independent confirmation → 保留約 **1,000 筆真正代表需求的證據**。這是目標，不是已完成數據。
- 據需求重複率、實際問題、參數與搭配、稀有高價值特色做排序；排除鏡像／行銷／無關貼文；來源不足必須誠實寫出。
- 本 ledger 的**大規模填充目前仍待完成**。截至 2026-10-08，本倉庫未展示可稽核的完整 10,000 candidates／1,000 deduplicated retained records；不得在任何 GPT、PR、交接或產品介紹中宣稱已完成。
- 已有的研究加權 Preset 決策見 [PRESET_PORTFOLIO_REBALANCE_2026-10-05.md](PRESET_PORTFOLIO_REBALANCE_2026-10-05.md)：SOURCE 40%／MOTION 30%／SPACE 30% 為核心優先；24 個舊 reserve 已依使用者要求恢復，Factory 保留 **74 active**；數值待 audition。

## 每一輪需要提交的成果

1. 原始候選記錄／來源；記錄 `candidate_count`、`reviewed_count`、`independent_count`、`deduplicated_count`、`retained_count`，不以目標數假報完成。
2. 可檢查的 canonical URL／論壇與日期／情境／作者去重鍵／模組與需求 cluster／參數＋單位＋使用條件／跨論壇證據／技術來源與合理性。
3. 對現行模組和 74 Factory 的 coverage：`already-supported`、`partially-supported`、`missing`、`duplicate`、`rare-high-value`、`audition-pending`，保留衝突與不確定。
4. 決策紀錄與下一步：需求熱度和聲學物理要分開驗證；任何缺乏驗聽與 Native/Web DSP parity 的數值維持 `PROVISIONAL`。
5. 每次依 GitHub checkpoint 可恢復、不重做舊研究、不盲目重跑；若目前不在研究授權範圍，僅更新資料與決策 memo，不擅自修改 DSP、Factory 或 CI 倍數。

## 來源種類

專業論壇：Gearspace/Gearslutz、KVR、Avid DUC、Reddit r/AudioPost/r/SoundDesign、Creative COW、VI-Control、Cockos/REAPER 與 game-audio 專業社群。

技術交叉驗證：DSP 開源實作、聲學／訊號處理書籍、論文、官方 technical manuals。**官方 vendor marketing 可以參考功能，但不能灌入獨立使用者需求熱度。**

## 與其他文件關係

- 所有重大產品功能、參數、Preset、聲學算法提議應在此 ledger／其機讀資料有 `record_id` 可追溯。
- 永久規格和禁止事項：`PROJECT_RULES.md` / `PROJECT_CONSTITUTION.md` / `RESEARCH_EVIDENCE_STANDARD.md`。
- 工程安全與實作契約：`docs/architecture/DSP_BEHAVIOR_CONTRACT_V1.md`、`docs/product/UI_FUNCTION_CONTRACT.md`。
- **不要用研究規劃取代真實研究的 provenance**。只有可開啟、可去重、可複查的實際紀錄可記入達成數。
