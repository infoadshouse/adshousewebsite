from collections import deque
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "icon-512.png"
PUBLIC = ROOT / "public"
APP = ROOT / "app"
THRESHOLD = 38


def replace_black_background(img: Image.Image, threshold: int = THRESHOLD) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    pix = img.load()
    visited = bytearray(w * h)
    q = deque()

    def idx(x: int, y: int) -> int:
        return y * w + x

    def is_bg(x: int, y: int) -> bool:
        r, g, b, _a = pix[x, y]
        return r <= threshold and g <= threshold and b <= threshold

    for start in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        q.append(start)

    while q:
        x, y = q.popleft()
        i = idx(x, y)
        if visited[i]:
            continue
        visited[i] = 1
        if not is_bg(x, y):
            continue
        pix[x, y] = (255, 255, 255, 255)
        if x + 1 < w:
            q.append((x + 1, y))
        if x > 0:
            q.append((x - 1, y))
        if y + 1 < h:
            q.append((x, y + 1))
        if y > 0:
            q.append((x, y - 1))

    for y in range(h):
        for x in range(w):
            r, g, b, a = pix[x, y]
            if r <= 55 and g <= 55 and b <= 55:
                neighbors = []
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        neighbors.append(pix[nx, ny])
                if any(nr > 200 and ng > 200 and nb > 200 for nr, ng, nb, _ in neighbors):
                    pix[x, y] = (255, 255, 255, 255)

    return img


def flatten_white(img: Image.Image, size: int) -> Image.Image:
    layer = img.resize((size, size), Image.Resampling.LANCZOS).convert("RGBA")
    bg = Image.new("RGB", (size, size), (255, 255, 255))
    bg.paste(layer, mask=layer.split()[3])
    return bg


def save_png(img: Image.Image, path: Path, size: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    flatten_white(img, size).save(path, format="PNG", optimize=True)
    print("wrote", path)


src = replace_black_background(Image.open(SRC))
print("processed corner", src.getpixel((0, 0)))

save_png(src, PUBLIC / "icon-512.png", 512)
save_png(src, PUBLIC / "icon-192.png", 192)
save_png(src, PUBLIC / "apple-icon.png", 180)
save_png(src, PUBLIC / "icon.png", 32)
save_png(src, APP / "icon.png", 512)
save_png(src, APP / "apple-icon.png", 180)

ico_sizes = [(16, 16), (32, 32), (48, 48)]
for dest in (PUBLIC / "favicon.ico", APP / "favicon.ico"):
    flatten_white(src, 48).convert("RGBA").save(dest, format="ICO", sizes=ico_sizes)
    print("wrote", dest, dest.stat().st_size)

print("done")
