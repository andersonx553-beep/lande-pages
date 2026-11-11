#!/usr/bin/env python3
"""Enxuga as fontes do site (precisa de: pip install fonttools brotli).

Uso: python3 scripts/subset-fonts.py

Lê os originais em src/fonts-originais/ e grava em dist/assets/fonts/:
- só os caracteres do português, números e pontuação usada no site;
- Hanken Grotesk limitada aos pesos 400–600 (os únicos usados);
- Newsreader mantém o eixo de tamanho óptico (opsz), que dá o desenho do título.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "src" / "fonts-originais", ROOT / "dist" / "assets" / "fonts"
TEXT = ("".join(chr(c) for c in range(0x20, 0x7F))
        + "ÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜàáâãäçèéêëìíîïñòóôõöùúûüºª°§·×÷"
        + " –—‘’‚“”„•…′″‹›€™"
        + "←↑→↓↗−")

def run(name, wght=None):
    font = TTFont(SRC / f"{name}.woff2")
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(text=TEXT)
    sub.subset(font)
    if wght:
        font = instancer.instantiateVariableFont(font, {"wght": wght})
    out = OUT / f"{name}.woff2"
    font.flavor = "woff2"
    font.save(out)
    print(f"  {name}: {(SRC / f'{name}.woff2').stat().st_size // 1024}KB -> {out.stat().st_size // 1024}KB")

run("newsreader-latin-400-normal")
run("newsreader-latin-400-italic")
run("hanken-grotesk-latin-variable", wght=(400, 600))
