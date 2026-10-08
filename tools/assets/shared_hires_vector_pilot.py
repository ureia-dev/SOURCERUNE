#!/usr/bin/env python3
"""Re-authored SVG master candidates, not photograph enlargement or runtime assets."""
import argparse,json,math
from pathlib import Path
from xml.sax.saxutils import escape
import cairosvg,numpy as np
from PIL import Image,ImageDraw
PILOTS=[("TRN_001_Direct_Clean.png","01","DIRECT CLEAN"),
        ("TRN_002_Narrowband_Clean.png","02","NARROWBAND CLEAN"),
        ("TRN_023_Signal_Dropout.png","23","SIGNAL DROPOUT")]
def redraw(image,n,label):
    a=np.asarray(image.convert("RGB"),dtype=np.float32);h,w=a.shape[:2]
    rr,gg,bb=a[:,:,0],a[:,:,1],a[:,:,2]
    white=n=="23"
    mask=(((rr+gg+bb)/3>85)&(bb>100)) if white else ((gg>rr*1.6)&(bb>rr*1.4+20)&(gg>80)&(bb>95))
    mask[:105 if white else 78,:]=False
    mask[177:,:]=False
    yp=np.where(mask)[0];cy=int(np.median(yp)) if len(yp) else 126
    marks=[]
    for x in range(4,w-4):
        pts=np.where(mask[:,x])[0]
        if len(pts)>1:
            lo=max(81,round(float(np.percentile(pts,4))));hi=min(176,round(float(np.percentile(pts,96))))
            marks.append(f'<path d="M{x} {lo} V{hi}"/>')
    wave="\n".join(marks)
    gx="".join(f'<path d="M{x} 56 V{h-19}" stroke="#164054" stroke-width=".24" opacity=".42"/>' for x in range(3,w-3,6))
    gy="".join(f'<path d="M3 {y} H{w-3}" stroke="#164054" stroke-width=".24" opacity=".42"/>' for y in range(56,h-16,6))
    ticks="".join(f'<path d="M{x} {h-19} v{1 if x%10 else 2}" stroke="#247195" stroke-width=".35"/>' for x in range(7,w-6,3))
    color="#d0ecf9" if white else "#62ccf6"
    font_size="10.25" if len(label)>17 else "11.2"
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<defs><linearGradient id="bg" x2="0" y2="1"><stop stop-color="#061a24"/><stop offset="1" stop-color="#020e14"/></linearGradient><clipPath id="crop"><rect x="3" y="54" width="{w-6}" height="{h-70}"/></clipPath></defs>
<rect width="{w}" height="{h}" rx="4" fill="url(#bg)"/>
<rect x=".65" y=".65" width="{w-1.3}" height="{h-1.3}" rx="4" fill="none" stroke="#1685a8" stroke-width=".95"/>
<rect x="2" y="2" width="{w-4}" height="{h-4}" rx="3" fill="none" stroke="#11384c" stroke-width=".5"/>
<rect x="3" y="3" width="{w-6}" height="49" fill="#061c27"/>
<path d="M2 53 H{w-2}" stroke="#267a9d" stroke-width=".6"/>
<rect x="4" y="4" width="41" height="40.5" rx="2" fill="#082a3b" stroke="#18536c" stroke-width=".45"/>
<text x="12" y="31" font-family="DejaVu Sans" font-size="18" fill="#79e0ff">{n}</text>
<text x="62" y="31.5" font-family="DejaVu Sans" font-size="{font_size}" fill="#f1f7fb">{escape(label)}</text>
<g clip-path="url(#crop)">{gx}{gy}</g>
<g clip-path="url(#crop)"><g stroke="#196d9f" stroke-width="2.8" opacity=".25">{wave}</g><g stroke="{color}" stroke-width=".67" opacity=".94">{wave}</g></g>
<path d="M3 {cy+.4} H{w-3}" stroke="#6de0ff" stroke-width=".48" opacity=".85"/>
<rect x="4" y="{h-19}" width="{w-8}" height="4" fill="#03151f" stroke="#185069" stroke-width=".25"/>{ticks}
</svg>'''
def main():
    p=argparse.ArgumentParser()
    p.add_argument("--repo",type=Path,default=Path("."))
    p.add_argument("--output",type=Path,default=Path("docs/artwork/shared_hires/pilots"))
    a=p.parse_args();dest=a.repo/a.output;dest.mkdir(parents=True,exist_ok=True)
    report=[]
    for name,n,label in PILOTS:
        src=a.repo/"Assets/UI/Shared/TRANSMISSION"/name
        with Image.open(src) as im:
            old=im.convert("RGB")
        assert 225<=old.width<=230 and 216<=old.height<=220
        svg=redraw(old,n,label);id=name.removesuffix(".png")
        (dest/(id+"_MASTER.svg")).write_text(svg,encoding="utf-8")
        target=(1536,math.floor(old.height*1536/old.width+.5))
        master=dest/(id+"_MASTER_3X.png")
        cairosvg.svg2png(bytestring=svg.encode(),write_to=str(master),output_width=target[0],output_height=target[1])
        with Image.open(master) as im:
            review=im.convert("RGB").resize((old.width*2,old.height*2),Image.Resampling.LANCZOS)
        review.save(dest/(id+"_REVIEW_2X.png"),optimize=True)
        comparison=Image.new("RGB",(old.width*4,old.height*2+32),"#06131b")
        comparison.paste(old.resize(review.size,Image.Resampling.NEAREST),(0,0))
        comparison.paste(review,(old.width*2,0))
        ImageDraw.Draw(comparison).text((4,old.height*2+5),"ORIGINAL 2x NEAREST | VECTOR REDRAW 2x",fill="#d5eefa")
        comparison.save(dest/(id+"_BEFORE_AFTER.png"),optimize=True)
        report.append({"id":id,"master":str(master),"master_dimensions":list(target),"method":"SVG vector re-authoring of label/grid/frame + traced original signal geometry","status":"UNAPPROVED CANDIDATE","runtime_replaced":False})
    (dest/"pilot_report.json").write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
    print("SVG MASTER 3X PILOTS",len(report),json.dumps([x["master_dimensions"] for x in report]))
if __name__=="__main__":main()
