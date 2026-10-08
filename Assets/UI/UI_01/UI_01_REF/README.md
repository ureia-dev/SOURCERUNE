# UI_01 正式無說明 REF — 2.5× 現行版本

> 使用者已取消舊 10 倍，**僅 2.5× 為有效掃描倍率**。原圖保留 1508×808，不使用重新生成的 AI 圖替換。

| 項目 | 已核對的來源與狀態 |
|---|---|
| 原圖 | 1508×808 RGBA，SHA-256 `96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916` |
| 2.5× 圖 | 3770×2020 RGBA，Pillow NEAREST，SHA-256 `f67c59046f2c1f90379837f1898a63a98e9abbf3d0e57a82945f4e5b2afb773e` |
| 正式原圖預定路徑 | `Assets/UI/UI_01/UI_01_REF/UI_01_REF_ORIGINAL_1508x808.png`，**PENDING-BINARY-UPLOAD** |
| 2.5× 圖預定路徑 | `Assets/UI/UI_01/UI_01_REF/UI_01_REF_2_5X_PIXEL.png`，**PENDING-BINARY-UPLOAD** |
| 幾何／功能清冊 | `docs/product/reference/UI_01_REF_CLEAN_SCAN_20261008.json` + 同名 MD，142 筆，原圖與 2.5× 位置／尺寸／中心點、功能線索 |
| 重現工具 | `tools/ref_scan/upscale_png_stream.py`（保留舊路徑但已改 Pillow 2.5× nearest） |

用法：`python tools/ref_scan/upscale_png_stream.py UI_01_REF_ORIGINAL_1508x808.png UI_01_REF_2_5X_PIXEL.png`。

### 坐標與驗證護欄

- X、Y、W、H、中心點：**1× × 2.5**；遇小數不要先取整。輸出光柵使用 nearest-neighbor，絕不推論放大圖帶有新細節。
- 舊的 1536×1024 原海報和 1499×807 plugin-local shell 座標不是同一個來源座標系統，未註冊對齊前不直接重映射。
- 這兩張 PNG 在工作容器已實際生成與比對，但**尚未存放 GitHub**，別將本文誤當成圖片成功入庫。
- 曲線、Meter、波形、動態值與互動必須由 Web/Native live code 完成，不能切 REF 圖作實際控制。
