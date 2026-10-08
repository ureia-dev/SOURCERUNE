#!/usr/bin/env python3
"""Materialize UI_02 REF from the exact GitHub PNG, not a generated mockup.

Original PNG and existing UI02_REF_COORDS.json are read directly from checkout.
All pre-existing coordinates remain SPEC-DERIVED; color edge locations are
PIXEL-OBSERVED, not automatic full-element bbox confirmations.
"""
from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib,subprocess,sys,datetime

root=Path(__file__).resolve().parents[2]
src=root/"Assets/UI/UI_02/UI_02_REF/UI_02_REF.png"
out=root/"Assets/UI/UI_02/UI_02_REF/UI_02_REF_10X_PIXEL.png"
coords=root/"docs/product/reference/UI_02_REF_COORDS.json"
jpath=root/"docs/product/reference/UI_02_REF_10X_SCAN_20261008.json"
mdpath=root/"docs/product/reference/UI_02_REF_10X_SCAN_20261008.md"
overlay=root/"Assets/UI/UI_02/UI_02_REF/UI_02_REF_SCAN_OVERLAY_1X.png"

def hashfile(p):
    h=hashlib.sha256()
    with p.open("rb") as f:
        for b in iter(lambda:f.read(1<<20),b""):h.update(b)
    return h.hexdigest()

with Image.open(src) as im:
    width,height=im.size
    if (width,height)!=(1672,941):
        raise SystemExit(f"REF size mismatch: got {width}x{height}; expected 1672x941. Never auto-resize originals.")
    source_mode=im.mode
    # Read only source-size memory, never allocate 10x decoded frame.
    pixels=im.convert("RGB")
    hsv=pixels.convert("HSV")
    evidence=[]
    for color,lo,hi in [
        ("cyan_blue",(103,100,90),(141,255,255)),
        ("amber_yellow",(22,85,80),(57,255,255)),
        ("magenta_purple",(175,85,75),(214,255,255))
    ]:
        peak_rows=[]
        for y in range(height):
            row=hsv.crop((0,y,width,y+1)).getdata()
            ct=sum(1 for h,s,v in row if lo[0]<=h<=hi[0] and lo[1]<=s<=hi[1] and lo[2]<=v<=hi[2])
            if ct>max(150,width//10):
                peak_rows.append({"y":y,"matching_pixels":ct})
        evidence.append({"color":color,"HSV_0_255_min":lo,"HSV_0_255_max":hi,
                         "strongest_horizontal_rows":sorted(peak_rows,key=lambda v:-v["matching_pixels"])[:40],
                         "rule":"Color thresholds are signal candidates, not object boundaries."})
    thumb=pixels.copy()

cfg=json.loads(coords.read_text(encoding="utf-8"))
major=cfg["major_geometry"]
items=[]
def add(id,rect,kind,classification,visible=None,action=None):
    x,y,w,h=[rect[k] for k in ("x","y","w","h")]
    if not (0<=x<width and 0<=y<height and w>0 and h>0 and x+w<=width and y+h<=height):
        raise ValueError((id,x,y,w,h))
    item={"id":id,"kind":kind,"reference":"docs/product/reference/UI_02_REF_COORDS.json",
          "bbox_1x":{"x":x,"y":y,"w":w,"h":h},
          "bbox_10x":{"x":x*10,"y":y*10,"w":w*10,"h":h*10},
          "precision":classification}
    if visible:item["content_or_label_from_contract_not_ocr"]=visible
    if action:item["expected_action_not_verified"]=action
    items.append(item)
for key in ("shell","topbar","workspace","center_scene","scene_visual","motion_deck","bottom_strip","top_meter"):
    add(key.upper(),major[key],"major",major[key].get("status","SPEC-DERIVED"))
for key,box in major["columns"].items():
    add("COLUMN_"+key.upper(),box,"column","SPEC-DERIVED "+box["status"])
for key,box in major["cards"].items():
    add("CARD_"+key,box,"semantic_card","SPEC-DERIVED "+box["status"],key,"Select model, library and Advanced")
for i,box in enumerate(major["rows"]):
    add("WORKSPACE_ROW_"+str(i+1),{"x":13,"y":box["y"],"w":1646,"h":box["h"]},"row","SPEC-DERIVED "+box["status"])
for box in major["bottom_panels"]:
    add("BOTTOM_"+box["id"],box,"bottom_panel","SPEC-DERIVED "+box["status"],box["id"],"Open live controls")
# UI_02 named controls tracked separately, including partial topbar x anchors.
actions=[
 ("PREV","Previous preset","Previous scene preset"),("NEXT","Next preset","Next scene preset"),
 ("PRESET","Preset selection","Choose scene preset"),("SHUFFLE","Crossed-arrows icon","MISSING: independent action semantics"),
 ("AB","A/B snapshots","Recall/store A/B"),("FOLDER","Preset visuals folder","Open preset visuals"),
 ("METER_REGION","IN/OUT compact meter","Live meters"),("GEAR_CENTER","Settings","Open tools")
]
anchors=[]
for key,visible,action in actions:
    config=next((v for v in cfg["topbar"] if v["id"]==key.lower()),None)
    if config:
        anchors.append({"id":"TOPBAR_"+key,"x_reference_1x":config,
                        "x_reference_10x":{k:([n*10 for n in v] if isinstance(v,list) else v*10 if isinstance(v,int) else v) for k,v in config.items()},
                        "precision":"APPROX-x-only","visible_or_intended_control":visible,
                        "expected_action_not_verified":action})
# Runtime-informed sizes are not exact REF pixel positions.
controls=[
("DISTANCE_DIAL","distance metre dial",300,"MOTION / distance"),
("SPEED_KNOB","Speed",54,"MOTION / speed"),
("DOPPLER_KNOB","Doppler",54,"MOTION / doppler"),
("WIDTH_KNOB","Width",54,"MOTION / width"),
("BAD_SIGNAL_KNOB","Bad Signal",76,"TRANSMISSION / amount"),
("CONDITION_KNOB","Condition",76,"CONDITION / amount"),
("INTELLIGIBILITY_KNOB","Intelligibility",76,"INTELLIGIBILITY / amount"),
("MIX_KNOB","Mix",76,"MIX / amount")
]
sizes=[{"id":a,"visible_or_intended_control":b,"diameter_1x":c,"diameter_10x":c*10,"semantic_route":d,
        "precision":"CONFIRMED-runtime-diameter / REF-position-PENDING"} for a,b,c,d in controls]
# Overlay is drawn on ORIGINAL raster exactly, no AI mutation of content.
drawing=ImageDraw.Draw(thumb)
palette={"topbar":"#ff49e9","workspace":"#00bbcc","scene_visual":"#22d8d8",
         "motion_deck":"#ffb64b","center_scene":"#0bdac4","bottom_strip":"#ff9933"}
for obj in items:
    if obj["kind"] not in ("major","semantic_card","bottom_panel"):continue
    b=obj["bbox_1x"]
    color=palette.get(obj["id"].lower(),"#e4c66b" if obj["kind"]=="bottom_panel" else "#58b7ed")
    drawing.rectangle([b["x"],b["y"],b["x"]+b["w"]-1,b["y"]+b["h"]-1],outline=color,width=2)
    if b["w"]>150 and b["h"]>100:
        drawing.text((b["x"]+5,b["y"]+5),obj["id"],fill=color)
thumb.save(overlay)

subprocess.run([sys.executable,str(root/"tools/ref_scan/upscale_png_stream.py"),str(src),str(out),"--factor","10"],check=True)
with out.open("rb") as f:
    header=f.read(24)
assert header[:8]==bytes.fromhex("89504e470d0a1a0a"), "not a PNG file"
import struct
assert struct.unpack(">II",header[16:24])==(width*10,height*10),"10x output geometry mismatch"
scan={
"schema":"sourcerune.ref.scan.v1","ui":"UI_02",
"source":{"repo_path":str(src.relative_to(root)),"source_sha256":hashfile(src),"width":width,"height":height,"mode":source_mode,"is_approved_repo_source":True},
"zoom":{"repo_path":str(out.relative_to(root)),"sha256":hashfile(out),"width":width*10,"height":height*10,
        "method":"exact nearest-neighbor source pixel replication, no detail synthesis"},
"inventory":{"rect_count":len(items),"topbar_partial_anchor_count":len(anchors),"control_size_count":len(sizes),
             "pixel_color_groups":len(evidence)},
"coordinate_evidence":"Rectangles are preexisting approved UI_02 structure/spec contracts. Pixel source was read and color projections measured; fine boxes are NOT upgraded to confirmed.",
"objects":items,"topbar_anchors":anchors,"control_diameters":sizes,"color_pixel_evidence":evidence,
"functions":{"Global":["Preset previous/next","Preset load/save","A/B","Folder","Settings","Shuffle: intent PENDING"],
"Cards":["SOURCE","TRANSMISSION","WALL/COVER","SPACE/ENVIRONMENT"],
"Scene":["Scene overview","Source/Listener live markers","Distance 300px dial","Speed 54px","Doppler 54px","Width 54px","Motion path","Time sync"],
"Meter":["IN/OUT compact 440×62","live fill","Peak/RMS/LUFS source pending"],
"RightRail":["Ambience selector/level/duck"],
"Bottom":["Bad Signal 337px","Condition 315px","Intelligibility 297px","Mix 316px","EQ/Tone 337px"]},
"pending":["exact typographic baselines and font identity","pixel-perfect imagery/material overlay","UI_02 shuffle binding semantics","Web/VST Native actual interactive and DSP parity","control hitboxes/status by host","no static meter/scene/baked waveform runtime"]
}
jpath.write_text(json.dumps(scan,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
rows=["| ID | 1x x,y,w,h | 10x x,y,w,h | Precision |","|---|---|---|---|"]
for o in items:
    rows.append("| `"+o["id"]+"` | "+",".join(str(v) for v in o["bbox_1x"].values())+" | "+",".join(str(v) for v in o["bbox_10x"].values())+" | "+o["precision"]+" |")
notes=[
"# UI_02 — 正式 GitHub PNG 10× 像素 REF 掃描",
"",
"- **來源為 GitHub 原始 PNG**：`"+str(src.relative_to(root))+"`，尺寸 "+str(width)+"×"+str(height)+"，SHA256 `"+scan["source"]["source_sha256"]+"`。",
"- 逐像素 10× 放大：`"+str(out.relative_to(root))+"`，尺寸 "+str(width*10)+"×"+str(height*10)+"，SHA256 `"+scan["zoom"]["sha256"]+"`。",
"- **不可混同 UI_01** 的直接 1508×808 附件與歷史 1499×807；UI_02 以此 Repo 1672×941 圖獨立為原點。",
"- 已掃描原 PNG 顏色分布/橫列候選；下方矩形從既有核准座標規格帶入，定位值標 `SPEC-DERIVED`，**不是**每個字體/邊框都已做 OCR/精掃。",
"- 10×只是原像素正確擴張，不是由 AI 補畫。Scene、Meter、曲線、數值應使用 live code。",
"",
"## 區塊／座標",
"",
*rows,
"",
"## 功能、狀態、待驗收",
"",
"- TOPBAR：Prev、Next、Preset、Shuffle（圖有、行為/綁定未定）、A/B、Folder、Gear；x-only anchor 另在 JSON 中標 APPROX。",
"- 左四卡：SOURCE、TRANSMISSION、WALL/COVER，右欄 SPACE/ENVIRONMENT 與 AMBIENCE；四張主要語意圖與工具不等於單一烘焙大圖。",
"- 中央：Scene、Motion deck、Distance 300px、Speed/Doppler/Width 各54px；實際節點與路徑必須 live。",
"- 顶部小 Meter：440×62，150×15 slots，狀態需 runtime 判斷。",
"- 底部：Bad Signal、Condition、Intelligibility、Mix、EQ/Tone 共五區，旋鈕 76px；不得把 UI_01 的七區帶進 UI_02。",
"- hover/drag/wheel/keyboard、文字 baseline、精準 REF 合色、VST3 Host、真音訊演算法與 LUFS 尚無本輪證據，不報 PASS。",
"",
"## 局部像素與圖片證據",
"",
"- 已存 `UI_02_REF_SCAN_OVERLAY_1X.png`（直接原像素加上坐標框），`UI_02_REF_10X_PIXEL.png` 為像素原樣擴大。",
"- JSON 記錄 HSV 色彩分布與候選亮色橫列，只是候選，不自動升級所有 bbox 為 CONFIRMED。",
"",
"## 流程",
"",
"- 原始圖 SHA 與輸出 SHA 來自 GitHub runner 真檔案；只跑一次資料生成，不增加 Fast/Deep/Release 或 Host Safety 測試。",
"- 參數、Preset、DSP 與 UI runtime 沒修改。UI_01 與 UI_02 REF 各自獨立掃描。",
""]
mdpath.write_text("\n".join(notes),encoding="utf-8")
print("REF_GENERATION_PASS",width,height,width*10,height*10,"rects",len(items),
      "png_sha",hashfile(src),"zoom_sha",hashfile(out),flush=True)
