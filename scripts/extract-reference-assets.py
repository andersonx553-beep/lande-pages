#!/usr/bin/env python3
"""Extrai e otimiza as imagens do HTML de referência (viver-bem.html).

Uso: python3 scripts/extract-reference-assets.py <viver-bem.html>

Gera em src/assets/:
  hero/varanda-{768,1280,1738}.webp   foto da hero em 3 larguras
  sequence/poltrona-creme-01..06.webp quadros da montagem (provisórios)
  pieces/{creme,trama-verde,balanco-terracota}.webp  peça pronta (último quadro)
  materials/{trama,toque,materia}.webp recortes para os cards de material
  brand/logo-{240,480,960}.webp        logo com fundo transparente, margens aparadas
"""
import base64, io, json, re, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "assets"

def save(img, path, width=None, q=82):
    path.parent.mkdir(parents=True, exist_ok=True)
    if width and img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(path, "webp", quality=q, method=6)
    print(f"  {path.relative_to(ROOT)}  {img.size}  {path.stat().st_size // 1024}KB")

def frames(sheet):
    """Folha 3x2 -> 6 quadros na ordem de leitura."""
    w, h = sheet.width // 3, sheet.height // 2
    return [sheet.crop((c * w, r * h, (c + 1) * w, (r + 1) * h)) for r in range(2) for c in range(3)]

def main(src):
    html = Path(src).read_text(encoding="utf-8")
    assets = json.loads(re.search(r'id="asset-data">(.*?)</script>', html, re.S).group(1))
    img = {k: Image.open(io.BytesIO(base64.b64decode(v))).convert("RGB") for k, v in assets.items()}
    logo = Image.open(io.BytesIO(base64.b64decode(
        re.search(r'<img src="data:image/png;base64,([^"]+)"', html).group(1)))).convert("RGBA")

    print("hero")
    for w in (768, 1280, 1738):
        save(img["hero"], OUT / "hero" / f"varanda-{w}.webp", w, q=84)

    print("sequência (provisória)")
    for i, f in enumerate(frames(img["white"]), 1):
        save(f, OUT / "sequence" / f"poltrona-creme-{i:02d}.webp", q=84)

    print("peças prontas")
    for key, name in (("white", "creme"), ("weave", "trama-verde"), ("terra", "balanco-terracota")):
        save(frames(img[key])[5], OUT / "pieces" / f"{name}.webp", q=84)

    print("materiais")
    weave6, terra6 = frames(img["weave"])[5], frames(img["terra"])[5]
    save(weave6.crop((60, 40, 460, 300)), OUT / "materials" / "trama.webp", q=84)
    save(terra6.crop((90, 120, 470, 380)), OUT / "materials" / "toque.webp", q=84)
    hero = img["hero"]
    save(hero.crop((840, 470, 1260, 750)), OUT / "materials" / "materia.webp", q=84)

    print("logo")
    logo = logo.crop(logo.getchannel("A").getbbox())
    for w in (240, 480, 960):
        save(logo, OUT / "brand" / f"logo-{w}.webp", w, q=90)

if __name__ == "__main__":
    main(sys.argv[1])
