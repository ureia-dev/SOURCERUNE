# SOURCERUNE — 工作交接與最新核查點

## UI_01／UI_02 REF 正式缺項工作日誌（2026-10-09）

- **最新唯一可勾選工作單**：[`docs/product/reference/UI_REF_GAP_WORKLOG.md`](docs/product/reference/UI_REF_GAP_WORKLOG.md)；逐項保存使用者本輪貼出的 **UI_01 18 項、UI_02 22 項、共同 15 項待辦**，另保留 **10 項有實際證據且範圍有限的已驗基礎**。詳細內容只在該工作單，不複製第二份清單。
- **往後有做完就必須更新同一份日誌**：保留原 ID，把 `[ ]` 改 `[x]`，補上實際 PR／Commit／Fast CI／Web REF 局部疊圖或 Native Host／聲音測試證據；未完成或部分完成維持未勾，留下 `PENDING`／`PARTIAL`／`BLOCKED`／`NEEDS-DECISION` 與 checkpoint。
- 初始缺項順序：**P0** 真 PNG／缺少的主卡操作／UI_02 Shuffle 語意待核；**P1** REF 細部和真 Scene 美術；**P2** 交互及像素疊圖；**P3** 真 DSP／WASM／LUFS／VST3 Host。UI_01 原圖兩張 PNG binary 仍未入庫；UI_02 三張已在 GitHub。Web 幾何 PASS 不能當 REF 外觀或 VST3 真功能完成。


## UI_02 — 核准 2.5 倍 REF 真圖片掃描（2026-10-09）

- GitHub 正式原圖 1672×941 RGB，SHA-256 `dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff`，由 GitHub Actions artifact 實際取回與核驗；2.5× 最近鄰檢視 PNG 4180×2353 SHA-256 `734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6`（本機真實生成，42 個像素點位 PASS）。
- 從未合併 PR #53 沿用 25 大區、8 Topbar 錨點、8 控制直徑、139 個部件與功能清冊、15 組真 RGB 邊界差分，全部原圖座標不變、2.5× 座標浮點換算。新文件 `docs/product/reference/UI_02_REF_2_5X_*_20261009` MD/JSON。
- 目前此工作分支的 2.5× PNG 已經使用一次性 GitHub Action 真正入庫，GitHub 已產生真 PNG binary，Action #1 run `37811957946` 與分支 commit `47a702691503b672655b2f0d527d67473104ce25` 確認 SVG/PNG 路徑（實際為 PNG）、檔案尺寸及來源/產物 SHA-256 完全相符，42/42 像素對照 PASS；臨時 Workflow 會隨產物提交一併移除。
- 10 倍舊 PR #53 不得合併；現行 UI_01 142 筆 2.5 倍規格與原圖完全保留；不改 DSP、Preset、Web/Native 實際 Runtime。


## UI_01 清潔 REF 正式 2.5× 檢視（新決定取代 10×）

- 正式無說明來源 1508×808 RGBA，SHA-256 `96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916`，原圖不改；正式掃描倍率為 **2.5 倍**，3770×2020 PNG，Pillow NEAREST，SHA-256 `f67c59046f2c1f90379837f1898a63a98e9abbf3d0e57a82945f4e5b2afb773e`，本機兩次重現及逐像素比對通過。
- 更新 `docs/product/reference/UI_01_REF_CLEAN_SCAN_20261008.json` 及同名 MD：**142 筆** `bbox_1x`、`bbox_2_5x`、`center_1x`、`center_2_5x`，保留內容、功能候選、Web 元件與精度。
- `Assets/UI/UI_01/UI_01_REF/` 尚只有 README；原圖及 2.5× PNG 檔案**仍待二進位 GitHub 上傳**，不可報完成。原圖目標 `UI_01_REF_ORIGINAL_1508x808.png`，掃描圖目標 `UI_01_REF_2_5X_PIXEL.png`。
- 1499×807 既有 Web/Native shell 與 1508×808 REF 不是同一座標系；疊圖校準/細字與狀態/互動/Native 實測仍 PENDING。此步不改 UI_02、DSP、Preset 或 CI 門檻。


> 本檔**只放最新可核對狀態、待完成清單與下一步**。不是產品憲章／DSP 規格／論壇研究規則；永久原則從 [AGENTS.md](AGENTS.md) 讀取。任何快照只代表當日，**執行時先查 live main/branches/open PR/CI/Pages**，不要沿用這裡的舊 SHA。

## 本次文件整併的 checkpoint（2026-10-08）

- 工作目的：刪掉多份「永久原則」與歷史交接間重複敘述；以 `AGENTS.md` 作短入口，`PROJECT_RULES.md` 管最高研究／CI 原則，`PROJECT_CONSTITUTION.md` 管永久產品方向，`ORIGINAL_PRODUCT_DECISIONS_20261008.md` 管初始決議與取捨，`DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md` 管「GPT 做 DSP／使用者試聽／不必 IR」，`RESEARCH_EVIDENCE_STANDARD.md` 管實證方法。
- **沒有刪失落歷史來源**：`docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md` 是後續 UI/REF 工作的**封存快照**，`docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md` 是決議來源追蹤；不是新 GPT 每輪必重讀的執行指令。
- 原始產品聊天的**可見決議**已寫入 `docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md`；中間部分訊息缺逐字稿，仍為 `PENDING-VERBATIM`，不得聲稱全部逐字 100% 復原。
- 本輪僅改**文件**，不變更 UI bitmap／C++ DSP／WASM／VST3／Factory Preset／CI 門檻或自動化。完成後新的 commit/PR 應以 live GitHub 為準，不在本檔硬寫會立刻失效的最新 HEAD。

## 上次已確認的實際庫存（**快照，非保證現況**）

- Repo：`ureia-dev/SOURCERUNE`，**Public 單一 repo**，Native VST3＋WEB TEST 同等主線；**不回到雙 repo**。
- 2026-10-08 前次主線樹掃描：PNG **793** = Shared **224** + UI_01 **224** + UI_02 **224** + ReferenceSheets **6** + Runtime **113**。舊 V2 **672 張 semantic + 6 張 atlas** 已入 GitHub；`PNG=0`／789／791 是已過時的不同時間點報告。
- 224 種初代 semantic：SOURCE **64**、TRANSMISSION **24**、WALL/COVER **32**、SPACE/ENVIRONMENT **56**、Scene Hero **48**。**後續 Factory 74 Active**（50 核心+24 恢復）；`SCN_049–074` 需 **26×3＝78 張獨立 Hero**，不能因 preset ID 存在就稱 artwork 已交付。
- P0／P1／P2 Runtime chrome 曾完成 **33／52／26** 張，隨後另有元件達 113；精確檔案以 `Assets/UI/Runtime/*manifest*.json`、`docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md` 與 live tree 為準。
- 歷史已完成：V5/V6 等比例 UI geometry、UI_01/02 reference MD/JSON、四卡 520px 關鍵修正、部分 Web/Native layout parity、Web preview workflow、PNG 補齊；**禁止因讀到舊交接就重新造圖或回退版面**。

## 尚未被真實驗收的主要工作

| 方向 | 真正需要的完成證據 | 優先注意 |
|---|---|---|
| UI_01／UI_02 微像素收斂 | 核准 full REF 對照、各元件局部 1:1 overlay、狀態/座標/材質、Web/Native 實際畫面 | 查 `docs/product/reference/`、`REF_COMPONENT_GAP_AUDIT.md` 及最新分支；不要把 CSS 值當真 REF |
| 26 個新增 Scene Hero | `SCN_049–074` 各 Shared/UI01/UI02 **78 獨立 PNG**、manifest、尺寸/完整性/美術驗收 | 不能裁圖集代替獨立製圖 |
| 真正聲音引擎 | C++ DSP 可編譯及可試聽；WebAssembly＋AudioWorklet、Native VST3 host automation／recall／offline bounce、低 CPU/固定 PDC | GPT 主責自主建模，使用者只負責聽感，不必交 IR；未跑就 `PENDING` |
| 音訊驗證與 Preset | 真 LUFS、Golden/Native-Web Parity、phase/latency/CPU、74 Factory 實際聽感與 Scene mapping | UI/data 存在不等於 audio DSP 和 audition 完成 |
| 跨論壇研究資料 | 可追溯的真實 `candidate/reviewed/independent/dedup/retained` 和 URL／參數／搭配統計 | 10k→1k 是研究起始目標，`docs/research/EVIDENCE_LEDGER.md` 仍需實際填充 |

## 下一個 GPT 的續做步驟

1. 先讀 [AGENTS.md](AGENTS.md) 的順序，**重查** `main` HEAD、open PR、分支、CI run/jobs/steps、Pages URL/commit、最後成功 checkpoint。
2. UI 如果涉及早期分支 `ui/ui01-action-pixel-closure-v1`（歷史曾有 CP87），先 **compare 最新 main**，判斷已合併／已被新實作取代／尚有唯一真缺；不得從 CP01 重做。歷史 PR #24 已合併，相關細節見封存全文。
3. 只對**當次使用者指令的目標**動手；研究、DSP、UI pixel、Scene Hero 各自單一工作線，不跨題混做；小步 commit/快速驗證，再由 GPT 自行安全 PR/merge/deploy。
4. Fast 日常且最小必要；Deep/Release／Host Safety 壓測依 `PROJECT_RULES.md` 取得明確授權。相同錯誤兩次停止重跑查根因；外部 runner/空 steps 標 `EXTERNAL-BLOCKED`。
5. 回報 branch、SHA、PR/CI、部署（Web 實際 URL／VST artifact）、本步實作與測試／下一步；**未確認的事不報 PASS**。

## 資料來源與更新規則

- **永久**：`PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、`docs/product/ORIGINAL_PRODUCT_DECISIONS_20261008.md`、各專業規格；`docs/research/RESEARCH_EVIDENCE_STANDARD.md` 專管研究方法。
- **動態**：本檔只記最後 checkpoint、經 live 驗證的資產數/功能測試/PR/阻塞；每完成大步更新，不複製一整段永久規則。
- **歷史／追溯**：`docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md`、`docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md`；過時數值按本輪最新實查修正**動態檔**，不偷偷刪原始歷史證據。
