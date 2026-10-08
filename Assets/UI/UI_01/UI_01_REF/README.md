# UI_01 — 唯一核准清潔 REF 來源登錄

## 身分及二進位檔狀態

使用者於 2026-10-08 核准的無說明 UI_01 PNG（本對話直接附件）為**1508×808 RGBA**。此圖不是舊版 **1536×1024 海報 / 1499×807 shell**，也不是 image-gen 重新繪製版。

- 原始 SHA-256：`96045478ce47347ac28cb56830c19d91870188865b8bde5a6e6038f453677916`
- 10x 像素複製 SHA-256：`94044c004f47b01f214cf62cfc3c306fd1afcf7c4c82b5a62e0fb4967bae53a8`；尺寸 15080×8080。
- `UI_01_REF_ORIGINAL_1508x808.png`：**PENDING**，須補進本資料夾並驗 SHA。
- `UI_01_REF_10X_PIXEL.png`：**PENDING**，須補進本資料夾並驗 SHA。
- 工具：`tools/ref_scan/upscale_png_stream.py`；逐掃描列生成，避免 10x 圖造成記憶體耗盡。
- 數據：`docs/product/reference/UI_01_REF_CLEAN_SCAN_20261008.json` + 同名 MD，142 項／原圖與 10x 座標。

**嚴禁宣稱沒有真的上傳的 PNG 已入 GitHub；二進位存檔及核准 hash 都是另一個獨立 gate。**
不能以 10x 放大圖冒充 10x 光學原始資訊；不能從此圖裁靜態 Spectrum/Meter/文字當 runtime。
UI_02 有另外的既存 `Assets/UI/UI_02/UI_02_REF/UI_02_REF.png`，必須等 UI_01 完成後再獨立掃描。
