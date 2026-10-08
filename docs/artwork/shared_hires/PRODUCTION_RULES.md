# SOURCERUNE Shared 224 張高清重製 — 正式規範與驗收

2026-10-09 最新核准：Shared 224 張均要保持原圖主體、構圖、色系、光影、文字、名稱與語意，但重做成真正清晰的高解析素材；**不允許單純把原糊 PNG 直接放大 3× 當成完成**。保留編號、Catalog、Preset、ID 與相對路徑，不能擅改已核准外觀。

## 原圖稽核結果

| 類別 | 數量 | 舊 Shared 圖尺寸（px） |
|---|---:|---|
| SOURCE | 64 | 172～173 × 117～118 |
| TRANSMISSION | 24 | 227～228 × 218～219 |
| WALL_COVER | 32 | 169～170 × 211～212 |
| SPACE_ENVIRONMENT | 56 | 169 × 130～131 |
| SCENE_PRESET_HERO | 48 | 226～227 × 115～116 |
| **總數** | **224** | |

上面數據出自真正 GitHub Web Preview #76 部署的圖片原檔；最新 GitHub Action 重新讀取 `Assets/UI/asset_manifest_v2.csv` 及 224 Shared + 448 UI 變體的**全部 672 個真 PNG**，驗證 source bytes、Git blob、SHA-256、檔案尺寸及模式。完整 224 筆資料在 `asset_inventory_v1.json`，是同一批資產未來修改時的原始依據。

**實際使用來源注意：** `Web/App/app.js` 的 `assetUrl()` 讀 `x.ui01`／`x.ui02`；它**沒有直接用 `x.master`／Shared**。所以只是改 Shared，Web 不會自動變清楚。使用者要看到清晰的兩套 UI，正式交付必須是**224 個新版 Shared 母圖＋224 個 UI_01 輸出＋224 個 UI_02 輸出，共 672 張 PNG**。SCN_049～074 另有 78 張新 Hero，原工作日誌 `CROSS-14` 繼續追蹤，不算本次 224。

## 正式解析度（依舊素材種類區分）

- **MASTER：** 以最大現有 UI_02 512px 寬 × 3，目標**至少 1536px 寬**；高依 Shared 真構圖長寬比調整。這是獨立重新繪製／攝影／3D／原生向量母圖，**不是**舊 169px 圖插值後冒充真正細節。母圖可編輯來源必須可復原。
- **UI_01 runtime：** 現有 384×144 的 2×，目標輸出 **768×288 PNG**；**UI_02 runtime：** 現有 512×256 的 2×，目標 **1024×512 PNG**。若真正 UI 顯示尺寸不是此數值，需先重新量 Web 實際尺寸再依 2× 出圖。
- 小圖示／刻度／極細線經單張視覺實測可使用 3× runtime；照片場景不機械式全部 3×；要驗圖片下載、記憶體／GPU、HiDPI 視覺及部署耗時。
- 保留相同檔名/ID/對應選項，不把動態 waveform、EQ、Meter、Motion、畫面數值或整張 Plugin screenshot 烘焙成不可操作的圖片。

## 製作路線與實際狀態

1. **可重繪的示意向量圖：** `tools/assets/shared_hires_vector_pilot.py` 根據真原圖的波形輪廓，重畫 SVG 的網格、字、編號、邊框與訊號線；首批已生成 `TRN_001_Direct_Clean`、`TRN_002_Narrowband_Clean`、`TRN_023_Signal_Dropout` 三張。各有 SVG 來源、約 1536px 寬 3× MASTER PNG、2× 檢視 PNG 及 Before/After。**仍是 ART CANDIDATE，沒有進正式 runtime，也不算核准完成。**
2. **照片／寫實圖：** SOURCE／WALL_COVER／SPACE_ENVIRONMENT／SCENE_PRESET_HERO 及剩餘具物件的 TRANSMISSION，必須真的重新繪製照片/場景及其細節，保留原本設備、角度、背景與氛圍；沒有可編輯高解析源時以高品質獨立生成美術並逐張人工核對；*任何單純銳化/放大舊縮圖皆不是交付品*。
3. **逐張驗收：** 各圖新版與舊圖 1× 對照，確認主體/裁切、配色、亮度、文字無錯且高解析細節真實；再由核准母圖產 UI_01/UI_02 並驗實際 Chrome/HiDPI 1×/2×、Native 若無 Host 則標 PENDING，不偷報；Fast CI 與 Preview 真 log/audit 通過才交付。
4. **替換與回復：** 真候選先放 `docs/artwork/shared_hires/pilots/` 供驗證。**原 672 張正式 PNG 完全不動**；只有候選視覺核准、runtime crop/參數無關驗收與檔案 SHA 完整，才逐批修改原路徑。可用原始 Git blob 回退。

## 唯一工作單與交接

- 全部 224 張的名稱／類別／原始 Shared、UI01、UI02 尺寸／bytes／Git blob／SHA256／預期 Master/UI 輸出／各階段狀態：`docs/artwork/shared_hires/asset_inventory_v1.json`。
- 唯一 UI 工作日誌 `docs/product/reference/UI_REF_GAP_WORKLOG.md` 新增 **ART-SHARED-001**，只有全部 224 母圖與對應 448 runtime 圖實際美術/雙端驗收完成才改 `[ ]→[x]`；部分完成需準確寫 3/224、0/672 等及具體 Git 證據。
- 初次階段：224/224 原始檔稽核 **PASS**；3/224 SVG 重製**候選已產生，未獲藝術核准**；0/224 母圖正式核准；0/672 產品 PNG 已替換。照片式源與 Web/VST3 驗收均**未完成**。
