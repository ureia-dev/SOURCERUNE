#!/usr/bin/env python3
"""SOURCERUNE integer exact 10x PNG upscale without high memory usage.

RGBA is copied exactly: source pixel (x,y) maps to 10x10 square.
This DOES NOT create image detail or replace direct REF evidence.
"""
import argparse,hashlib,os,struct,zlib
from PIL import Image

def png_chunk(out,tag,body):
    out.write(struct.pack(">I",len(body)))
    out.write(tag);out.write(body)
    out.write(struct.pack(">I",zlib.crc32(tag+body)&0xffffffff))
def magnify(source,output,factor=10):
    if not 1<=factor<=30:raise ValueError("factor must be in 1..30")
    with Image.open(source) as src:
        rgba=src.convert("RGBA")
        w,h=rgba.size
        with open(output,"wb") as out:
            out.write(b"\\x89PNG\\r\\n\\x1a\\n")
            png_chunk(out,b"IHDR",struct.pack(">2I5B",w*factor,h*factor,8,6,0,0,0))
            compressor=zlib.compressobj(level=6)
            buffered=bytearray()
            for y in range(h):
                raw=rgba.crop((0,y,w,y+1)).tobytes()
                line=b"\\x00"+b"".join(raw[i:i+4]*factor for i in range(0,len(raw),4))
                for j in range(factor):
                    buffered.extend(compressor.compress(line))
                    while len(buffered)>1048576:
                        png_chunk(out,b"IDAT",bytes(buffered[:1048576]))
                        del buffered[:1048576]
            buffered.extend(compressor.flush())
            if buffered: png_chunk(out,b"IDAT",bytes(buffered))
            png_chunk(out,b"IEND",b"")
    print("PNG",w,h,"->",w*factor,h*factor,"SHA256",hashlib.sha256(open(output,"rb").read()).hexdigest())
if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("input_png");p.add_argument("output_png");p.add_argument("--factor",type=int,default=10)
    a=p.parse_args()
    magnify(a.input_png,a.output_png,a.factor)
