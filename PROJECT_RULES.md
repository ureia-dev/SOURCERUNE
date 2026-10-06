# SOURCERUNE Project Rules

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
