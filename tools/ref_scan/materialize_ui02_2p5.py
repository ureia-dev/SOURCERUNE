#!/usr/bin/env python3
"""UI_02 2.5x scan: approved GitHub original only, Pillow 12.3.0."""
from pathlib import Path
from PIL import Image,ImageDraw
import math,hashlib
root=Path(__file__).resolve().parents[2]/"Assets/UI/UI_02/UI_02_REF"
src=root/"UI_02_REF.png";dest=root/"UI_02_REF_2_5X_PIXEL.png";overlay=root/"UI_02_REF_SCAN_OVERLAY_1X.png"
source_sha="dc41cbce44527f212e5955994be9312711c36bc2f45a77f7c364aa60743f6aff";output_sha="734f107d1c9a74f7e0caf746419fac3539e6b6c418f0bd8a60efa6da0f45d3e6"
regions=[["TOPBAR",[0,0,1672,78]],["SOURCE",[13,86,334,213]],["TRANSMISSION",[13,308,334,166]],["WALL_COVER",[13,483,334,247]],["CENTER_SCENE",[356,86,972,641]],["SCENE_VISUAL",[356,86,972,358]],["MOTION_DECK",[356,444,972,283]],["SPACE",[1337,86,322,285]],["AMBIENCE",[1337,380,322,350]],["BOTTOM_BAD",[13,751,337,172]],["BOTTOM_CONDITION",[361,751,315,172]],["BOTTOM_INTELL",[687,751,297,172]],["BOTTOM_MIX",[995,751,316,172]],["BOTTOM_EQ_TONE",[1322,751,337,172]]]
colors=["#fa56d8","#58d9ef","#54bdf0","#f9cc6e","#00f1b3","#5fecef","#f4aa59","#76baff","#fa65c8","#f46b71","#edcb62","#66dfe2","#8aabff","#e5a6f5"]
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def run():
    assert src.exists() and digest(src)==source_sha, "original GitHub REF mismatch"
    with Image.open(src) as im:
        assert im.size==(1672,941) and im.mode=="RGB"
        size=tuple(math.floor(v*2.5+0.5) for v in im.size)
        assert size==(4180,2353)
        im.resize(size,Image.Resampling.NEAREST).save(dest,format="PNG")
        drawn=im.copy()
    assert digest(dest)==output_sha,"Image hash differs: check Pillow version and approved source"
    d=ImageDraw.Draw(drawn)
    for (name,(x,y,w,h)),col in zip(regions,colors):
        d.rectangle((x,y,x+w-1,y+h-1),outline=col,width=2)
        if name not in ("SCENE_VISUAL","CENTER_SCENE","MOTION_DECK"):
            d.text((x+5,y+5),name,fill=col)
    drawn.save(overlay,format="PNG")
    with Image.open(src) as im,Image.open(dest) as z:
        for y in (0,1,100,500,1000,1700,2352):
            for x in (0,3,350,1000,2510,4179):
                sx=min(im.width-1,math.floor((x+0.5)*im.width/z.width))
                sy=min(im.height-1,math.floor((y+0.5)*im.height/z.height))
                assert z.getpixel((x,y))==im.getpixel((sx,sy)),(x,y)
    print("SOURCE",digest(src),"ZOOM",digest(dest),"OVERLAY",digest(overlay),"42 pixel comparisons PASS")
if __name__=="__main__":run()
