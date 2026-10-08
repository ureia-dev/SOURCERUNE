#!/usr/bin/env python3
"""Audit all 224 Shared and 448 UI crops: keep existing PNGs untouched."""
import csv,hashlib,json
from collections import Counter
from pathlib import Path
from PIL import Image
GROUPS={"SOURCE":64,"TRANSMISSION":24,"WALL_COVER":32,"SPACE_ENVIRONMENT":56,"SCENE_PRESET_HERO":48}
PILOTS={"TRN_001_Direct_Clean","TRN_002_Narrowband_Clean","TRN_023_Signal_Dropout"}
def inspect(root,rel):
    p=root/"Assets/UI"/rel
    data=p.read_bytes()
    with Image.open(p) as im:
        im.verify()
    with Image.open(p) as im:
        dims=list(im.size);mode=im.mode
    return {"path":"Assets/UI/"+rel,"dimensions":dims,"bytes":len(data),"mode":mode,"sha256":hashlib.sha256(data).hexdigest(),"git_blob":hashlib.sha1(f"blob {len(data)}\0".encode()+data).hexdigest()}
def main():
    import argparse
    p=argparse.ArgumentParser()
    p.add_argument("--repo",type=Path,default=Path("."))
    p.add_argument("--output",type=Path,default=Path("docs/artwork/shared_hires/asset_inventory_v1.json"))
    a=p.parse_args()
    rows=list(csv.DictReader((a.repo/"Assets/UI/asset_manifest_v2.csv").open(encoding="utf-8",newline="")))
    assert len(rows)==224
    seen=set();groups=Counter();items=[]
    for row in rows:
        id=row["id"];g=row["type"]
        assert id not in seen,id
        seen.add(id);groups[g]+=1
        sh=inspect(a.repo,row["master_asset"]);u1=inspect(a.repo,row["ui01_asset"]);u2=inspect(a.repo,row["ui02_asset"])
        w,h=sh["dimensions"];mw=max(1536,w*3)
        items.append({"id":id,"group":g,"label":row["name"],"baseline":{"Shared":sh,"UI_01":u1,"UI_02":u2},
            "target":{"master_3x_minimum":[mw,round(mw*h/w)],"UI_01_2x":[768,288],"UI_02_2x":[1024,512]},
            "method":"SVG_VECTOR_REMAKE_PILOT" if id in PILOTS else "FRESH_HIRES_ART_REQUIRED",
            "stage":"CANDIDATE_NOT_APPROVED" if id in PILOTS else "PENDING_REMAKE",
            "approved":False,"shared_replaced":False,"ui01_replaced":False,"ui02_replaced":False,"web_verified":False,"native_verified":False})
    assert dict(groups)==GROUPS,(dict(groups),GROUPS)
    payload={"schema":"sourcerune.shared-hires.v1","source":"Assets/UI/asset_manifest_v2.csv","count":224,"groups":dict(groups),
        "existing_672_png_preserved":True,"production_approved":0,"pilot_candidates":3,"items":items}
    out=a.repo/a.output
    out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps(payload,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("224 SHARED + 448 UI SOURCE SLOTS VERIFIED")
    print("CATEGORIES",json.dumps(groups,sort_keys=True))
    print("PILOTS 3, APPROVED 0, RUNTIME REPLACED 0")
if __name__=="__main__": main()
