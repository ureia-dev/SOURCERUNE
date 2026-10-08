# SOURCERUNE MASTER HANDOFF — 工作進度與歷史 checkpoint

> **本檔只記錄交接進度、實際盤點結果、歷史 checkpoint、未完成事項。不是永久製作原則的來源。**
>
> **新的 GPT / Codex / Copilot 永遠要先讀 [AGENTS.md](AGENTS.md) → [PROJECT_CONSTITUTION.md](PROJECT_CONSTITUTION.md)（永久全部方向和製作原則） → [PROJECT_RULES.md](PROJECT_RULES.md)（最高優先 CI/同步規則），之後才讀這份當前進度。**
>
> 本檔目前是 **2026-10-08 已核對快照**，不是自動刷新。執行前必須查最新 GitHub `main`、工作 branch、open PR、CI／run/jobs/steps、部署與最後成功 checkpoint；不可按照下面歷史 SHA 當然地繼續。
>
> **歷史原稿完整永久封存：** [docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md](docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md)。使用者任何永久新原則都應更新 `PROJECT_CONSTITUTION.md` 而非只寫在某篇交接。

## 2026-10-08 永久研究時數限制更正

使用者指出：先前文件把某次「八小時、每小時一類論壇」的工作排程誤升為永久產品原則。已更正為：**SOURCERUNE 的實證研究必須貫穿整個產品生命週期，八個來源／分析維度可以並行與持續循環，沒有八小時截止**。10,000 候選、1,000 留存是歷史初期規模里程碑，不是停止條件；完成與否仍需核對真實資料庫。此為**文件原則更正**，未宣稱任何新論壇資料已蒐集或 DSP 已修改。

權威永久來源：`PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、`docs/research/RESEARCH_EVIDENCE_STANDARD.md`、`AGENTS.md`。歷史排程應留在歷史記錄，不能再當作後續研究的時間限制。

## 2026-10-08 漏項修正：DSP 主責、免使用者 IR 與立即執行

原先的「100% 完整」文件是從不完整的歷史 handoff 摘要衍生，沒有逐條比對所有可見對話／技術契約。這次發現並修正：
- **最高長期分工**：GPT 承擔聲學 DSP 研究、設計、實作、測試、修正，交付可試聽版本；使用者只負責主觀試聽、反饋、核准，**不需要提供 IR、錄音或自己負責工程測試**。
- **不預設 IR 依賴**：程序化／參數化建模優先；合法 IR 可當技術校準參考，但不要求使用者蒐集／授權特殊 IR。
- **一個指令可現在做就現在做**：從錯誤的「第 1～8 小時」固定分工移出，歷史八小時任務是當時的執行安排，不是永久研發進度或即時工作拖延依據。
- **來源覆蓋狀態是部分而非 100%**：詳見 `docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md` 的決議矩陣與 `PENDING-VERBATIM`，避免後續只抄錯誤摘要又稱已全部核對。

權威長期規範見 `PROJECT_RULES.md`、`PROJECT_CONSTITUTION.md`、`docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md`。本次**只修文件，不修改 DSP、Preset、UI 或啟用任何排程**。2026-10-08 查得 SOURCERUNE 的「每小時持續收斂」及「8 小時論壇研究」排程均為 disabled；不因修改文件而擅自啟用。

## 2026-10-08 原始產品對話來源校正（尚待讀取全文）

使用者找到真正的最初 SOURCERUNE 產品方向與全套討論對話：**https://chatgpt.com/c/6abfd770-e594-83e8-adc4-992fa6ed47b3**。先前標為「完整對話交接」的 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md` **不是這篇原始對話的逐字原文**，而是後續 UI/REF/開發流程聊天的整理，不能當作最初產品決議百分百已核對。

本次已將該 URL 與來源層級／待驗證狀態寫入 `docs/history/SOURCERUNE_DECISION_TRACEABILITY_AUDIT_20261008.md` §0A；`/c/` 私人聊天無法透過當前工具完整讀取，狀態是 `USER-IDENTIFIED-ORIGINAL-CONVERSATION / CONTENT-NOT-ACCESSIBLE-YET / PENDING-VERBATIM`。**不能說 100%**。取得使用者提供的可存取分享頁面或原始對話匯出文字後，才開始從首句到末句做全文逐段比對，依 checkpoints 實際修補永久原則。

## 如何延續工作

1. 先完整讀 `PROJECT_CONSTITUTION.md` 和 `PROJECT_RULES.md`；確認使用者當次要求，切勿重新詢問已核准事項。
2. 查 GitHub 最新 main／branch／PR／CI／preview。辨識有無其他 GPT 推進或已合併的同目標工作，禁止重做／開多條線。
3. 找出最後一個有 commit、最小測試證據的 checkpoint，從下一個未完成小步做起；每個可驗證小步都留下 commit，適合時自己 PR／merge／部署。
4. CI 先最小必要驗證，再 Fast；Deep／Release 的觸發／次數鎖定。同錯直接重試最多兩次，外部 runner 失敗停止盲目重試。
5. 每輪回報最新 SHA、PR、CI、部署、已完成、阻塞／根因、下一步。對話可能斷線，不能長時間黑箱或失敗後從頭重做。

## 最近一次已確認的外部狀態

本交接整理前的快照：`main c3e82b68c4d593fa26667c264fea0d54fb973b7b` 是文檔交接 PR #29 合併結果。此後應依 GitHub 實際最新狀態刷新。原始 UI/REF 主線另有 Checkpoint 87 分支，不可推測已合併。本次新增的長期憲章文件整理是**獨立 docs 任務**，不代表 UI 功能已完成。

## 資產庫已完成內容、實際目錄、避免重做

2026-10-08 實際 GitHub `main` recursive tree 掃描結果（**1032 tree entries；Asset PNG 合計 791**）：

| 資產路徑 | PNG 現存數量 | 說明 |
|---|---:|---|
| `Assets/UI/Shared/` | **224** | approved semantic master |
| `Assets/UI/UI_01/` | **224** | UI_01 semantic crop |
| `Assets/UI/UI_02/` | **224** | UI_02 semantic crop |
| `Assets/UI/ReferenceSheets/` | **6** | 來源／傳輸／牆／空間／48 scene／style atlas |
| `Assets/UI/Runtime/` | **113** | 可拆 runtime chrome，P0/P1/P2 加後續 icon |
| **總計** | **791** | 已進 main 的 PNG；不是 0、不是 761，也不是 789 |

Semantic 224 的五個類型：**SOURCE 64、TRANSMISSION 24、WALL/COVER 32、SPACE/ENVIRONMENT 56、SCENE PRESET HERO 48**；每類 Shared/UI01/UI02 三份，合計 672，再加六張 atlas ＝**678/678 舊 V2 完整**。

曾缺 **28 張**：UI01 transmission TRN005–024 共20、Shared SPACE SPC053–056 共4、UI01 SPACE SPC053–056 共4。已逐步補齊，**舊 V2 現在缺 0**。最後四張 Shared master 確實取自原始 `SOURCERUNE_UI_ASSETS_V2.zip`，是原圖 binary，不是截圖製造。此任務**已完成，禁止重做**。

P0/P1/P2 可沿用：
- P0 33 張：shell BG/frame、panel/card frame、topbar、button/dropdown/segmented/icon/slider 狀態、S/M/L knob bases、meter frame、graph grid、source/listener markers、9-slice。
- P1 52 張：dividers、UI01 strips、品牌／caret／checkbox／bypass、meter segment、EQ node、Scene grid／motion point/car glyph、左右箭頭、module icons／tool icons。
- P2 26 張：Signal Flow caps、UI01 distance callout/waveform strip、Undo/Redo、Copy/Paste、Fullscreen、Asset Browser、Advanced Drawer、control caps。
- 後續兩張 shuffle states 等加至 Runtime **113**。以 `Assets/UI/Runtime/*manifest*.json`、`docs/product/RUNTIME_COMPONENT_INVENTORY_V1.md`、`Web/App/runtime_skin_*.css` 與實際 tree 為準。
- `Assets/UI/asset_manifest_v2.csv` 與 `Assets/UI/scene_hero_049_074_manifest_v1.json` 是精準路徑／ID 對照；圖片 presence 不改 DSP 行為。缺圖 fallback 應可辨且中性。

**歷史文件警告**：`docs/product/CONVERSATION_REQUIREMENTS_AUDIT_V1.md` 曾因製作日期早而寫「repo PNG=0」，`ASSET_DELIVERY_STATUS.md` 的部分 Runtime 數可能寫 111／總 789；那是舊快照，不能凌駕**2026-10-08 重新掃 main 的 791／Runtime 113**。此交接文件特別列出避免下一位 GPT 又聲稱圖片不存在。

---

## 已做過哪些實際工作／重要 checkpoint 時間線

此段為**可追溯歷史**；不是要求新 GPT 重新做。

1. UI 與 runtime 早期：語意圖庫 224 種／三套、manifest、UI_01/UI_02 文件、P0(33)/P1(52)/P2(26) 元件、9-slice、Live Web UI、Native LayoutSpec、V3／V4／V5 幾何、Web Preview workflow 逐步落地。
2. 2026-10-06 中午斷線前：由 GitHub commit 回溯得知 V5 canonical geometry、responsive 改 scale-only、UI01／UI02 Native geometry、補 UI_01 Transmission/Space、Web Preview direct targets、完整 Assets 發佈與 cache bust、9-slice、VST shared runtime skin。中午曾以 `6376019d` 作為當時最後 checkpoint；**後來已被許多 main commits 超越**。
3. 補檔：缺圖 28→4→0，`Assets/UI` 實際 672 semantic + 6 sheets 全齊；曾更新資產文件 `161cf681`。
4. 2026-10-06 夜間：開 `ui/ui01-pixel-audit-v1`，Checkpoint 01 外框／三欄 1499、Checkpoint 02 高 807／底部閉合、Checkpoint 03 SOURCE card；後續 04–06 掃 TRANSMISSION／WALL／SPACE。
5. 2026-10-07 清晨：在 `docs/product/reference/` 建立 UI01/02 REF MD／machine-readable JSON／gap audit；Checkpoint 07 Meter、08 Scene live layer、09 Knob、10 live vs asset、11/12 JSON、13–16 521vs520 衝突追查、19/20 Native-Web parity。
6. 2026-10-07 晚間：Checkpoint 21 真正 520px exclusive-edge 修正（`6052ec1f`）、後來 CSS typo 修復，Checkpoint 23/24 semantic artwork inventory、REF fine 盤點。
7. 當次互動再續：因 main 前進而 #24 暫時無法 merge，檢查發現重疊主要在 `Source/UI/UI_01/LayoutSpec.h`，合併最新 main 保留雙方變動（`67531553`）、Fast CI 成功；修 `geometry_audit.js` 仍檢查舊 521px（`5f9f3254`）；Checkpoint 26 四卡內部 icon/text/image/Edit/arrow REF rectangles（`2d4347c1`）；Checkpoint 27 holder/Edit/arrow CSS（`ac4b1d75`）。此時 #24 OPEN 為**歷史狀態**。
8. 後續排程與其他 UI PR 做了更細的 icon/typography/Scene/Spectrum/Meter/Macro/UI02 座標與 guard。已追到 checkpoint 65：正式全頁 REF bitmap 未在 repo、細字／tick 暫時不能全數 confirmed；隨後又做 asset/binding/parity/geometry 自動 audit。
9. 2026-10-08 核對 main：**PR #24 已 merged**，merge commit `9054c051b56d44057d6ae90ff768ae6fbc3f4aee`；後續 main 已有 CP 76～86（包含資產 parity、catalog/preset 失配 guard、UI01/02 confirmed rectangle 測試、9-slice panel border-box 修正、render audit measured boxes）。
10. 2026-10-08 當時另有 branch `ui/ui01-action-pixel-closure-v1`，HEAD `bd22b2491314eb21b8683d8e06991c17bfc77896`（CP 87 修 Edit/arrow 1px raster offsets），**沒有 open PR**。此工作分支不能因沒有 PR 就刪除或假定已 merge，應先 compare。
11. 2026-10-08 main 快照：`ceff103d22ccc0cd553c16c467fb9705d8728e94`；commit message `chore: update UI render audit [skip ci]`。**下一位執行前再查 HEAD**。

---

## 2026-10-08 完整交接製作時的狀態快照

| 項目 | 本次實際看到 |
|---|---|
| GitHub | `ureia-dev/SOURCERUNE` |
| `main` | `ceff103d22ccc0cd553c16c467fb9705d8728e94` |
| 最新 main 既有進度 | UI render audit + CP 86 |
| open PRs | **0** |
| PR #24 | **closed / merged**；merge SHA `9054c051...` |
| 未合併 UI01 分支 | `ui/ui01-action-pixel-closure-v1` at `bd22b249...`，CP 87 |
| 舊歷史 branch | `ui/ref-convergence-v6-ui02`、`ui/runtime-p1-components`、`ui/runtime-p2-v1` 等；應先查是否合併／superseded，不是新的開發起點 |
| semantic | **672/672** |
| ReferenceSheets | **6/6** |
| Runtime PNG | **113** |
| `Assets/UI` PNG | **791** |
| SCN 049–074 PNG | **未見已提交的 SCN_049，整套 78 張不得視為完成** |
| 每小時 UI 自動化 | **目前 disabled**；曾多輪執行 |
| CI | 必須依最新 PR head / main SHA 重新查；本快照**不宣稱最新 main 或 CP87 的 CI 已綠** |
| WEB／VST 真正發布 | Workflow/preview code 存在；**不宣稱每個新 commit 的 Pages 或 VST artifact 都已實際部署**，須查 run/artifact/url |

本快照應隨大階段更新；不要把本檔當永遠最新。

---

## 最主要的後續工作（依風險與獨立性排列）

**A. UI/REF Pixel closure（先驗已提交的工作）**

1. 先確認 main 與 CP87 branch 目前差異、open PR、最近 CI、已存在的 render report。若 CP87 已被後續主線覆蓋或等效修復，標明 superseded；否則用單一小 PR 合併，測試最小必要 + Fast。
2. 對 UI_01 已知四卡 holder/Edit/arrow/icon/title/name 逐項比最新 runtime screenshot 和 REF／文檔；關注 1px border-box、9-slice、CSS specificity、hover / selected / disabled、hit target。**已有 CONFIRMED 值不重測、不任意重畫**。
3. UI_01 Scene／Analysis／Meter／底部七區雖已有主要座標與 guard，仍缺若干**真正用 REF 驗證**的 fine baseline、ticks、cap/材質與狀態。先查是否有核准 full REF bitmap；有圖才做可證明的 overlay；缺圖則優先可測的 Web/Native parity/guard。
4. UI_02 同理，特別 Scene/Dial/Motion deck、卡片內部、上方 meter/tool、bottom knob=76、文字 baseline、材質、所有狀態與交互。如果只拿到 atlas，不能假稱完成 fine scan。
5. `Web/App/geometry_audit.js` 不只測 appW/appH；應驗證已確定的 card internal boxes、z-order／顯示行為、layout cross-target parity。最新檔已經有 measured boxes，**先讀現況再加**，避免同測重複。
6. Web render compare 要保存單一部件 1:1，並保留最小可重現的 render log、差異矩形、before/after／閾值。不能只跑數學 closure 就宣稱「完全一樣」。

**B. 物件／資產 gap audit**
- 更新 `REF_COMPONENT_GAP_AUDIT.md` 為真的缺件清單與狀態，不要直接根據 REF 美術差異亂生 PNG；確認 Common assets 是否可共享於兩 UI、hover/pressed/bypass/disabled 狀態與 actual binding 是否齊。
- 找到缺少獨立 raster material 時，**一張一張**製作、檢查一致性、尺寸與 alpha、落 manifest／Runtime 路徑，Web/Native 只按需綁定。
- 優先處理可量的框線、hitbox、text metrics；只有拿到 full REF／驗證素材後才進超精細材質校準。

**C. SCN 049–074 Scene Hero 美術**
- 另開**單一目的的藝術工作線**；依 26 scene briefs，各自做 clean master／三個尺寸，78 independent PNG，核對檔名/heroId/crop/Style，不混入 UI geometry PR；逐張 checkpoint。沒做完不可假裝 74 scenes 全有 hero。

**D. 功能／音訊主線（非本次 UI 授權範圍）**
- 追查 C++ DSP／Wasm AudioWorklet／Native VST3 automation／真正 LUFS／Golden parity／preset audition 是否有最新實測；只能依 repo 最新程式與 logs 改 status，不能從早期 contract 推論已實裝。
- 真正要動 DSP、Preset 或測試重複規則必須有使用者明確授權；UI 排程不得偷做。

---

## 這份交接的更新規則

- 每個主要 UI/REF/元件/部署 checkpoint 後，更新**最新已核對狀態**，含時間、branch、SHA、PR、CI、預覽／部署證據；把舊 snapshot 標 HISTORICAL。
- 不能在這裡獨自新增永久的產品原則。新核准要求先更新 `PROJECT_CONSTITUTION.md`，細座標／缺件同步寫在 `docs/product/reference/`，此檔只摘要所完成的狀態。
- 如果對話中斷，下一個 GPT 不必看過任何前一篇聊天：先讀根目錄 `AGENTS.md` + `PROJECT_CONSTITUTION.md`，再看本檔，重新掃 GitHub，從最後可驗證 checkpoint 接續。
- 完整 2026-10-08 版本原稿可隨時在 `docs/history/SOURCERUNE_FULL_CONVERSATION_HANDOFF_20261008.md` 查到，沒有因這次重整而遺失。
