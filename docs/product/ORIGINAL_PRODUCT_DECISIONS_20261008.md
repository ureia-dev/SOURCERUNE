# SOURCERUNE — 最初產品對話：最終決議及取捨對照

> **用途：** 把「先討論產品是什麼、有哪些功能、資料從何而來、誰負責做、如何驗收」保存成新 GPT 可直接實作的永久索引。不是逐字聊天複製，也不是以早期版本覆蓋後續已核准的正式版本。
>
> **來源層級**：2026-10-08 本次可見的原始產品討論（從 Speakerphone 類型構想到最後的 GitHub／研究要求）＋同 repo 後續已核准規格。**目前提供的對話上下文含部分省略的中間內容**，故下表只對可見明確決議標 `ORIGINAL-VISIBLE`；省略部分需以後續可取得原文再逐條核對，絕不宣稱逐字 100% 恢復。
>
> **權威優先序**：使用者最新明確核准 > `PROJECT_RULES.md`（研究與安全）＋`PROJECT_CONSTITUTION.md`（永久） > 各領域最新批准 REF／JSON／工程契約 > 此決議對照（溯源與防漏） > 舊聊天摘要／早期提案。精確數值與即時完成狀態以 live repo、測試、`SOURCERUNE_MASTER_HANDOFF.md` 為準。

## A. 最初討論的完整產品精神（不能精簡到消失）

1. **一顆專業後期／混音用「聲源進入真實聲音場景」處理器**：功能類似 Audio Ease Speakerphone 的常用世界化／發音裝置能力，但產品必須原創、實用、偏室內種類及戶外場景，不能變成只有 telephone EQ 或一般 Reverb。任何 Dialogue、TV、Music、Radio、SFX 都能當輸入，不限 Voice。
2. 聲音路徑是可理解的組合：**INPUT → TRANSMISSION → SOURCE/EMITTER → CONDITION → WALL/COVER → DISTANCE/MOTION → SPACE/ENVIRONMENT → AMBIENCE → INTELLIGIBILITY → EQ/TONE → MIX/OUTPUT**。可見 UI 流程不必與實際 DSP 模組物理計算完全逐格相同，但 Engine/Signal Flow 必須一致、有測試、不可造假。
3. **Speakerphone 的實用核心要保留**：Source/Speaker、Mic/Receiver 的角色、Cover、Room/Outdoor、Telecom、EQ、Compression/Gate、Distortion/Crush、Radio tuning、Dropout、Ambient 等；LFO 不作為主介面負擔。必要時 `ADV` 僅提供 Slow Drift／Flutter／Tremolo／Random／Envelope 等簡化高價值調制，無大型任意接線 modulation matrix。
4. **取其他產品的「被使用者反覆認可的工作流優點」，不複製作品**：McDSP FutzBox 的單顆快速 futz、noise+duck、gate/dropout、low DSP、可縮放 device character；AudioThing Speakers 的 speaker/mic/degradation/noise 組合、易選擇、snapshot／切換方式；Audacity 的 DTMF／Tone／Noise／Chirp 類低成本 generator 思路。所有算法、GUI、preset、IR、Sample、Logo、商標與文件另行設計或取得正當權利。
5. **砍高難度低回報功能，但不刪核心**：複雜模組線、全場景 ray tracing、沉重 IR 切換、過度通用 modulation、過早 Atmos/AI reference matching 等可後移。首要做到工程師幾秒選 Source/Transmission/Cover/Space、Motion 即可得到有說服力的聲音。
6. **專業錄音／電影後期使用者、全球市場**：名稱應好念、好記、有音訊工程師熟悉的詞根並略有奇幻感；搜尋歷經 SceneVox／Diorama／Scenora／Sourcera／Sourcela，最後產品**型號／專案名為 SOURCERUNE**（SOURCE + RUNE）。**品牌／公司名稱尚未決定**；舊候選名稱與商標比對屬命名歷史，不屬 DSP 需求，無須每個 GPT 重新研究。

## B. 「我算模型 → 你聽」是最高層工作分工

**GPT／開發助手主責所有技術工作**：大量實證資料研究、聲學模型推導、選演算法、C++ DSP 實作、量測/相位/失真/CPU/延遲、合法參考素材取得或自造測試音、版本管理、Web/WASM/AudioWorklet、VST3 Host、CI/PR/部署與提供真的可以聽的版本。**使用者只主責最後實際試聽、指出聲音哪裡不對、決定是否核准下一輪音色修正**；通常**不需要交任何 IR、錄音、量測資料、自己寫 DSP 或手動合併 GitHub**。此為「角色責任」，不是聲稱模型已實作或已被真正聽過。詳見 `docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md`。

- **SOURCE** 不只是 HPF/LPF：model response／共振與反共振／driver-box resonance／音量相依 compression、saturation、excursion／指向性、rattle、variation；同設備在不同輸入電平的反應要合理。
- **TRANSMISSION＋Bad Signal** 是不同媒介：landline/GSM/VoIP/AM/FM/dispatch/aviation/drive-thru 等各自不同帶寬、noise/static、packet loss、codec/bitrate、interference、dropout、tuning。不能把同一個 distortion 設為 24 個名字。
- **CONDITION** 區分 NEW/USED/OLD/DAMAGED 與 Rattle、Buzz、Wow/Flutter、Imbalance、Intermittent Contact、device compression；不與壞網路的失真混為一談。
- **WALL/COVER** 必須有頻率相依材質透射、縫隙漏音、panel/cavity resonance、short reflection、absorption/occlusion；不能只在乾聲上加一條固定低通或僅按 IR 淡入。
- **SPACE**：尺寸、材質、modal/early reflection/late diffuse field、按頻帶 RT60、direct/early/late；室內可 sparse image-source/early taps + 低 CPU FDN tail。**Outdoor 是主力，不是加大 hall reverb**：free field、ground bounce、air absorption、建築側面反射、街谷/停車場／田野/森林/峽谷要有不同合理模型。
- **DISTANCE/MOTION**：Approach、Pass By、Leave、Static、Manual／Start-Closest-End／Speed、Doppler、Width、Perspective；同時驅動 level、頻帶空氣損耗、time of flight、direct/reverberant ratio、反射時序、指向與立體定位，避免跳音、phase 不連續與穿越瞬間人工痕跡；**DAW timeline/automation 是核心**，尤其 Pro Tools 類的嚴苛大量 instance、offline bounce、Recall、安全 PDC；後續 AAX 僅未來方向，當前正式 mainline 為 VST3 + WEB。
- **AMBIENCE**：程序化、長時間無接縫、無重複的 Wind／Rain／Traffic／HVAC／Hum／Electrical／Crowd／Public Space 等多事件 generator；`Seed` 決定可重現，`New Seed` 才變更，離線和重開會話應一致，Duck 不掩蓋 Dialogue。**背景交談應可選語言特徵**：Mandarin/English/Japanese 等不可理解的節奏/音節/formant-like crowd texture；可理解的完整語句需另有合法語音合成或授權，**不得假裝程序化 speech-like 噪聲能說真正句子**。
- **INTELLIGIBILITY**：Natural／較清楚／Muffled 等，有感但不強行變亮；保護輔音、動態、自然空間；**EQ/Tone、Feedback、Generators** 保留必要的後期工作流與 `ADV` 操作。
- **IR/Sample 權利**：核心 SOURCE、COVER、SPACE、AMBIENCE **不依賴外部 IR 庫或外部音檔**；AI/演算法自行算模型及背景事件。合法實錄、公開量測、論文可供校準**而非直接散布**；只有專門需要可辨識語言時才評估合法 TTS/錄音。不能誤讀成「所有情形絕對禁止使用 convolution」：程序生成短 kernel 與合法 R&D 參考是可行方案，但 CPU/延遲/授權優先。
- **Oversampling**：使用者明示「基本上不用考慮」，**以 1× native sample rate 為固定預設**；低別名非線性先選 ADAA／band-limited 等。不要無故設計 2×/4×/8× 全域切換或把 Oversampling 當賣點；特殊情況需有可聽證據與核准，不是自由加功能。
- **CPU/Realtime**：多 instance、zero-work bypass、閉 UI 停止昂貴視覺分析、preallocated buffers、no audio-thread allocate/lock/I/O、固定 host-reported latency、平滑參數轉換、seed/transport 可確定重播；任何 CPU 百分比是量測前的目標，不是實測成果。

## C. 真正的大數據最高產品決策原則（不只是搜尋清單）

> 此處是最初使用者再三強調的要求。**重要度與 DSP 主責同級**。詳細稽核欄位與統計方法以 `docs/research/RESEARCH_EVIDENCE_STANDARD.md` 為準。

- **持續八個來源／分析維度的長期研究**，而不是永久限定八小時：KVR、VI-Control、Avid DUC、Gearspace/Gearslutz、Steinberg/Nuendo、Creative COW、Reddit AudioPost/SoundDesign、Cockos/REAPER、game-audio community；書籍、論文、官方技術 manuals、開源 DSP 作技術核對，廠商宣傳不算獨立使用者熱度。重大產品需求儘量跨 **5 個以上獨立論壇／社群**，不足要標示不足。
- 使用者曾指定「8 小時、每小時一輪、10,000 次搜尋」來讓研究**真的深入**：正確操作是廣搜多組英語／其他語言的使用情境、論壇原串、發問與抱怨、工作流與參數，人工／程式去重與聚類；**約 10,000 候選與 1,000 留存為起始規模里程碑，不是要求虛構 10,000 次 API 查詢、更不是已有資料**。真實 candidate/reviewed/independent/deduplicated/retained 各自計數。
- 選出 **1,000 條真的被反覆討論／多人獨立反映／跨論壇共同需求，或雖稀有但很具特色與專業價值的證據**；絕不先湊 1,000 筆把論壇資料當裝飾。每筆附 canonical URL、forum、date、use case、獨立作者去重 key、痛點、推薦 range、組合/信號鏈、上下文、反對證據、產品映射。
- 分開**熱門常見**和**稀有高價值**兩張排名；分析「大家反覆尋找的實際使用情境」「常問的參數範圍、搭配／效果鏈」「經常抱怨的相位、聽感、automation、CPU、延遲」。參數相依／環境／輸入不能忽略；不同論壇討論的「喜歡」不等於聲學量測最正確。以論文／可復現 DSP 算法與使用者聽感接第二道驗證。
- 競品僅作**需求／操作模式的比較**：Speakerphone、FutzBox、AudioThing Speakers、Audacity、相關 worldizing／post／game audio 手法；不能擷取對方 IR、受保護 preset、素材或 UI 當自己產品。
- **SOURCE 40%／MOTION 30%／SPACE 30%** 是日後已核准的核心研究與設計投資重心。不是限制其他模組；並保留後續核准 **Factory 74 active**（50 核心＋24 追加，不能擅自刪成 50）。真實的大數據 evidence ledger 大規模填充仍要依實際記錄核對，不能說已完成。

## D. UI_01、UI_02、場景圖與數據綁定（只有可拆圖，不是截圖）

- **UI_01**：工程師導向、左側正式**四張**可選圖卡 `SOURCE / TRANSMISSION / WALL-COVER / SPACE-ENVIRONMENT`；中央 Scene/Motion＋Analysis（Spectrum/Space Response/Signal Flow）、右 Meter、底部 Fast Modules 與 ADV。**不要用舊五卡概念圖的 CONDITION 卡做正式 pixel 目標**；其 DSP/控制仍放 macro/ADV。
- **UI_02**：大場景視覺主導的獨立版面，Source/Listener、3D/Top、深度與路徑、距離大旋鈕、Speed/Doppler/Width、浮動/側向 Module cards、分析與 Meter；不是 UI_01 換色。幾何和版面以已核准 **`docs/product/reference/UI_01/02...` MD/JSON** 與 live runtime 為準，不能從文字重排。
- 兩版全部功能等價，**相同參數 ID、Scene State、Preset、Seed、DSP 聲音、host automation/recall**；只改外觀布局。所有區塊有完整 control/bypass/選擇器/信號回饋：Source、Transmission、Condition、Cover、Motion、Space、Ambience、Intelligibility、EQ/Tone、Feedback、Generators、Mix、A/B/C/D Snapshot、輸入輸出 Meter、Peak/RMS，LUFS 必須真正算而非假數字、User/Factory presets。
- 四模組各 preset **有不同且合語義的示意圖**；完整 Scene Preset 再有 Hero 圖。早期核准 **SOURCE 64／TRANSMISSION 24／COVER 32／SPACE 56／Scene Hero 48**（224 個 semantic ID），每種有 Shared／UI_01／UI_02 變體。**後續已擴充至 74 Factory**，因此新增 `SCN_049–074` 的 **26 種場景 ×3＝78 張獨立圖**。現在已有的圖像、缺哪些圖片要由 GitHub tree＋manifest 實查；不能繼續說 PNG=0。
- 使用者一再要求 **「不准整張 UI 截圖；要真正可重新排列的細緻元件 PNG」**：frame、9-slice、knob 多 frame、刻度、標籤、icon、各種狀態、scene marker、背景、空間圖、signal path、fader、meter 容器個別可用；文字、數值、EQ／Spectrum／Motion path、Meter fill、Source/Listener 動畫由 live code。Atlas/整張 REF 永遠只供視覺參考，不能直接裁下假稱獨立 runtime 元件。
- **美術**：專業高價位 Audio Plugin 的自然真實、設計師人工勾勒感；不誇張高對比、淺景深、過度 bokeh、teal/orange 濫用、過飽和發光或廉價 AI 味。場景意圖、張力、遠近深度仍須清晰；材質霧面、透視／筆觸統一、有辨識度與易讀性。使用者曾要求每張高維度「至少算 50 輪」：這是**嚴格多輪構圖校正／可見比對的品質要求**，沒有工作紀錄不能聲稱真的完成了 50 輪；更不可用一張低解析圖集取代獨立高品質圖。
- 正式 REF 中各區 x/y/w/h、gap/padding/字體 baseline、Knob face／tick、文字、9-slice 和擬物材質皆須明列；不確定填 `APPROX`，有真正原始 REF 佐證才標 `CONFIRMED`。Web 和 VST3 Native 應同規格量測、局部 overlay。**新版 REF geometry 不得因舊圖文字描述而倒退**。

## E. 開發部署、Preset 與聲音驗證的後續核准決定

1. Repo owner **`ureia-dev`**，唯一**Public** repo `ureia-dev/SOURCERUNE`：使用者已拒絕私有核心＋公開展示的雙 repo 拆法，認為拖慢部署；**不要再推回雙 repo**。GitHub Pages WEB TEST 要正常可打開。公共 repo 代表程式與 WASM 最終可被檢視，安全機密不得提交。
2. 正式並行主線 **Native VST3 + WEB TEST**：共同 C++ DSP、同一 State/Parameter/Scene schema，Web 用 WASM＋AudioWorklet；AAX／Pro Tools 對接是工作流兼容與未來 AAX 考慮，**不是目前必須先做 AAX binary**。
3. 避免只交 UI 示意／純 HTML：**真實音訊、可測試音檔、Seed、Loop、Bypass、A/B、音訊 Meter、48→74 Scene mappings、factory/user preset、主機 automation/recall、offline bounce、Sample-rate 與 Golden/Native-Web parity** 必須逐層可運作；但尚未實作、尚未跑的 gate 必須寫 PENDING。
4. **先選 preset 與模組內容，再生圖**；首批分類由使用者選：Instrument/Amp **保留少量**、SPACE **室內/戶外/交通等不刻意偏一類**、Scene Hero **首批 48**。此首批圖冊數字是歷史圖片規劃，之後 Factory 74 是追加結果，不是覆蓋原本 224 semantic 身分。
5. 歷史早期「48 Factory mapping」只代表該階段已有 schema/映射；後續 **74 Active** 是最新產品規格。不能把 artwork missing、UI control surface exists、DSP behavior built、Preset audibly tuned、user audition approved 混成一種 DONE。
6. **可恢復、可中斷、可驗證**：查 live main/branch/open PR/CI/Pages；一個目標只維持一條正式開發線，獨立微步 commit/checkpoint、失敗最多重試兩次後查根因，runner/infra 故障停重跑標外部阻塞。能安全 PR／merge／deploy 自主完成，不反覆要使用者去按。
7. **Fast 是日常；Deep/Release 及 Host Safety 壓力倍數須用戶當次批准**。請勿把「研究 10,000」或「每張圖 50 輪品質校正」當成 100 次 Release 授權。
8. 使用者曾指定八小時排程以做深論壇研究，**該次是排程命令，不是永久產品截止**。之後另一對話更正八維度應持續循環；所有排程是否真啟動／停止須查自動化狀態，不能只憑聊天摘要宣稱背景正在跑。
9. 中文回覆統一**繁體中文**，不要反覆要求使用者重講已核准的決策；碰到不可代行授權/外部阻塞才問一個關鍵問題。

## F. 把重複歷史變成最新決議（supersession）

| 先前討論 | 之後最後核准／現行處理 | 不可再做 |
|---|---|---|
| 借 Speakerphone 大模組牆、複雜 LFO | 存 Speakerphone **常用核心**，Modulation 僅簡化 ADV | 主畫面複製四條 LFO/接線矩陣 |
| 大量錄製 Sample/IR 為主 | SOURCE/COVER/SPACE/AMBIENCE 由 GPT 自行物理／程序模型做；用戶只聽 | 要求用戶先交 IR／以第三方 IR 直接包產品 |
| 只做固定 IR 的 Distance | 連續計算距離、空氣、高頻／延遲／反射／Doppler | 各距離換一張 IR 並暴力 crossfade |
| Oversampling 2×4× | **1× native，不把 oversampling 當一般功能** | 全局 4×／高 CPU 預設 |
| UI_02 曾被錯當 UI_01 舊稱 | 兩個**各自正式版面**；UI_01 四卡工程版、UI_02 Scene-heavy 版 | 複製同一版假裝兩個 UI |
| 舊數十張設計草圖、UI42/4208 配色探索 | **後續正式批准 REF/JSON/像素規格** | 用草圖覆蓋 approved REF |
| 32/48 Hero 早期計畫 | 48 初期 Hero 已列，再增 26 場景至 74 Factory | 以 48 舊數字刪後續 26 |
| 224 圖像 ID、GitHub PNG=0 的早期報告 | 每次即時掃 repo，完成/缺件分開標示 | 永久沿用舊 PNG=0 說法 |
| 「8 小時搜 10,000」的單次排程 | **持續八維度研究、10k/1k 為初期里程碑**；排程另按實際狀態 | 把整個產品 research 截止於八小時 |
| 先架 Private Core + Public Web | **單一 Public SOURCERUNE repo** | 新建雙 repo 造成同步拖延 |
| 命名候選 SceneVox/Diorama/Sourcera | **SOURCERUNE 為產品型號／工程 repo**，公司品牌仍待定 | 反覆要求重選品牌 |

## G. 新 GPT／工程師的任務速查：現實 gate 必須清楚

| 目的 | 權威文件 | 最低完成證據 |
|---|---|---|
| 為何做哪些模組／參數／Preset | `PROJECT_RULES.md` + `docs/research/RESEARCH_EVIDENCE_STANDARD.md` + `PROJECT_CONSTITUTION.md` | 可追溯 independent records + clustering + engineering reasoning |
| 誰設計 DSP、如何試聽、不交 IR | `docs/architecture/DSP_OWNERSHIP_AND_AUDITION_CONTRACT.md` | 真源碼+可試聽 binary/WEB+測試證據+使用者聽感回饋 |
| DSP 核心路徑／效能 | `docs/architecture/DSP_BEHAVIOR_CONTRACT_V1.md` | compiled/reproducible unit & audio benchmarks、realtime safety |
| UI01/02 完整功能、正式坐標 | `docs/product/UI_FUNCTION_CONTRACT.md` + `docs/product/reference/` | REF confirmed geometry + real Web/Native rendered + controls connected |
| 224/74 圖資／Preset | `Assets/UI/*manifest*` + `Assets/FactoryPresets/scene_presets_v1.json` + `docs/product/SCENE_HERO_049_074_PRODUCTION_V1.md` | 檔案存在、CRC/尺寸/內容 QC、ID mapping，主觀美術驗收與 DSP audition 分開 |
| GitHub 最新進度與可恢復接手 | `SOURCERUNE_MASTER_HANDOFF.md` + live GitHub | SHA、branch、PR、checks、Web Pages、阻塞與下一步 |

### 不宣稱已完成的工作

沒有可審計的 10,000→1,000 獨立證據，不能稱大數據研究已完成；沒有真正可執行 C++／WASM／VST3、Native/Web Golden/Parity、LUFS、運算量測、使用者實際聽感核准，也不能稱 DSP 完成。資產數量以每次掃 Git tree 為準。此檔的作用是**讓未來每篇 GPT 知道工作方向，不是替產品實測寫通過票**。
