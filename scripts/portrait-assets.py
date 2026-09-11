"""Regenerate the hero portrait assets from one photo with Depth Anything 3.

    uv venv --python 3.12 .venv-da3 && source .venv-da3/bin/activate
    uv pip install torch torchvision "numpy<2" pillow matplotlib
    git clone --depth 1 https://github.com/ByteDance-Seed/Depth-Anything-3 /tmp/da3
    uv pip install -e /tmp/da3 --no-deps && uv pip install einops huggingface_hub \
        safetensors omegaconf opencv-python e3nn trimesh imageio plyfile pillow_heif
    python scripts/portrait-assets.py photo.png --crop-top 180

Writes:
  src/assets/portraits/point-cloud-source.jpeg   the 3:4 crop, "original" mode
  src/assets/portraits/depth-anything-3-image.webp Spectral heatmap, "depth" mode
  public/portraits/pointcloud.bin                 "3d" mode, read by hero-product-map.tsx:
      uint32 count, then per point float32 x, y, z and uint8 r, g, b (little endian)

Point cloud layout: one point per pixel of a 440px-wide grid at 0.23 units
per pixel, centred on the image so the framing matches the photo's
object-cover crop; z runs from +2 (nearest) to about -123 (farthest). Colours
get a gamma lift and saturation boost so a night photo still reads as dots on
the dark panel (the original beach photo needed neither).
"""
import argparse, os, struct
os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")   # torch + opencv both ship libomp on macOS
os.environ.setdefault("PYTORCH_ENABLE_MPS_FALLBACK", "1")
import numpy as np, torch
from PIL import Image
from matplotlib import colormaps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser()
ap.add_argument("photo")
ap.add_argument("--crop-top", type=int, default=0, help="y offset of the 3:4 crop window")
ap.add_argument("--model", default="depth-anything/DA3NESTED-GIANT-LARGE-1.1")
ap.add_argument("--gamma", type=float, default=0.55)
ap.add_argument("--saturation", type=float, default=1.35)
args = ap.parse_args()

src = Image.open(args.photo).convert("RGB")
W = src.width
H = round(W * 4 / 3)
img = src.crop((0, args.crop_top, W, args.crop_top + H))

from depth_anything_3.api import DepthAnything3  # noqa: E402
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
model = DepthAnything3.from_pretrained(args.model).to(device=device).eval()
with torch.no_grad():
    pred = model.inference([img], process_res=1008, process_res_method="upper_bound_resize")
depth = np.asarray(pred.depth[0], dtype=np.float32)
lo, hi = np.percentile(depth, [1, 99])
dn_full = np.clip((depth - lo) / max(hi - lo, 1e-6), 0, 1)  # 0 = nearest, 1 = farthest

def resize_f(a, size):
    return np.asarray(Image.fromarray(a).resize(size, Image.BILINEAR), dtype=np.float32)

img.save(f"{ROOT}/src/assets/portraits/point-cloud-source.jpeg", quality=92, optimize=True, progressive=True)

heat = colormaps["Spectral_r"](1 - resize_f(dn_full, (378, 504)))[..., :3]
Image.fromarray((heat * 255).astype(np.uint8)).save(
    f"{ROOT}/src/assets/portraits/depth-anything-3-image.webp", quality=88, method=6
)

gw = 440
gh = round(gw * H / W)
STEP, ZRANGE = 0.23, 125.0
colors = np.asarray(img.resize((gw, gh), Image.LANCZOS), dtype=np.float32) / 255
dn = resize_f(dn_full, (gw, gh))
lifted = np.clip(colors ** args.gamma, 0, 1)
mean = lifted.mean(-1, keepdims=True)
lifted = np.clip(mean + (lifted - mean) * args.saturation, 0, 1)
rows, cols = np.mgrid[0:gh, 0:gw]
x = (cols - gw / 2) * STEP
y = -(rows - gh / 2) * STEP
z = -dn * ZRANGE + 2.0
pts = np.stack([x, y, z], -1).reshape(-1, 3).astype("<f4")
rec = np.zeros(len(pts), dtype=[("p", "<f4", 3), ("c", "u1", 3)])
rec["p"] = pts
rec["c"] = (lifted.reshape(-1, 3) * 255).astype(np.uint8)
with open(f"{ROOT}/public/portraits/pointcloud.bin", "wb") as f:
    f.write(struct.pack("<I", len(pts)) + rec.tobytes())
print(f"{len(pts)} points, depth {depth.min():.2f}-{depth.max():.2f} m, model {args.model}")
