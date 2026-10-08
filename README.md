# SOURCERUNE

**專業聲音後期世界化／發音體／聲學場景處理器**：SOURCE、TRANSMISSION、CONDITION、WALL/COVER、DISTANCE/MOTION、SPACE/ENVIRONMENT、AMBIENCE、INTELLIGIBILITY、EQ/TONE。目標是可信、低 CPU、可自動化的真實聲音；不只電話 EQ 或一般殘響。

- **專案**：`ureia-dev/SOURCERUNE`，單一 **Public** repo。
- **同等產品主線**：Native **VST3** 與 **WEB TEST**，共享 C++ DSP／參數／State；WEB 透過 WASM／AudioWorklet，**UI_01 與 UI_02** 為兩種正式介面。
- **角色**：GPT／開發助手負責實際 DSP 建模、程式、客觀測試與可試聽交付；使用者負責最後聽感審核，**不必交 IR**。

## 新 GPT／Codex 必讀

**從 [AGENTS.md](AGENTS.md) 開始**。該檔會依次指向：

- [PROJECT_RULES.md](PROJECT_RULES.md)：真正跨論壇大數據、Fast/Deep/Release 與 VST3/WEB 同步最高規則。
- [PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md)：永久已核准的方向。
- [最初產品決議與取捨](docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md)：Speakerphone、競品、Source/Cover/Space 自主 DSP、Motion／Ambience、UI／Preset 演進。
- [DSP 主責／免 IR／試聽契約](docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md)。
- [研究證據標準](docs/research/RESEARCH_EVIDENCE_STANDARD.md)：10,000 候選／1,000 留存是研究**初期目標，不是已完成成績**。
- [SOURCERUNE_MASTER_HANDOFF.md](SOURCERUNE_MASTER_HANDOFF.md)：帶日期的最新交接；執行前須重新檢查 GitHub main/PR/CI/部署。

**重要**：永久規則只在其權威檔維護；精確 UI 座標、Preset、圖資與 DSP 行為以對應 MD/JSON/manifest／真實程式為準。歷史交接只作追溯，不可把過時 PNG 數、舊版草圖或未完成測試當現況。
