import os
import sys
import struct
import numpy as np
from PIL import Image

def main():
    print("Loading packages...")
    import torch
    from transformers import pipeline

    # Select device: MPS for macOS GPU acceleration, otherwise CPU
    if torch.backends.mps.is_available():
        device = "mps"
        print("Using Apple Silicon GPU acceleration (MPS)")
    else:
        device = "cpu"
        print("Using CPU")

    color_path = "public/portraits/point-cloud-source.jpeg"
    output_path = "public/portraits/pointcloud.bin"

    if not os.path.exists(color_path):
        print(f"Error: Original portrait image not found at {color_path}")
        sys.exit(1)

    print("Loading image...")
    color_img = Image.open(color_path)
    w, h = color_img.size
    print(f"Original size: {w}x{h}")

    # Set sample width for high-density details (e.g. 440x586 points ~ 258k points)
    sample_width = 440
    sample_height = int((h / w) * sample_width)
    print(f"Resizing to sample size: {sample_width}x{sample_height} (~{sample_width * sample_height} points)")
    
    color_img_resized = color_img.resize((sample_width, sample_height), Image.Resampling.LANCZOS)
    color_arr = np.array(color_img_resized)

    print("Loading Depth Anything V2 LARGE model from HuggingFace...")
    depth_estimator = pipeline(
        "depth-estimation", 
        model="depth-anything/Depth-Anything-V2-Large-hf", 
        device=device
    )

    print("Estimating depth map...")
    depth_result = depth_estimator(color_img_resized)
    depth_img = depth_result["depth"]
    depth_arr = np.array(depth_img).astype(np.float32)

    # 1. Depth Edge/Gradient Filtering to remove "curtain shadow" connecting lines
    print("Calculating depth gradients...")
    grad_x = np.zeros_like(depth_arr)
    grad_y = np.zeros_like(depth_arr)
    
    # Simple central difference
    grad_x[:, 1:-1] = (depth_arr[:, 2:] - depth_arr[:, :-2]) / 2.0
    grad_y[1:-1, :] = (depth_arr[2:, :] - depth_arr[:-2, :]) / 2.0
    grad = np.sqrt(grad_x**2 + grad_y**2)

    # 2. Find centroid of the person (foreground points with depth > 215 out of 255)
    print("Calculating centroid of the person...")
    person_x = []
    person_y = []
    person_z = []

    z_multiplier = 24.0
    alpha = 0.12

    for y in range(sample_height):
        for x in range(sample_width):
            depth_val = depth_arr[y, x] / 255.0
            if depth_arr[y, x] > 215.0:
                cx_val = (x - sample_width / 2.0) * 0.23
                cy_val = (sample_height / 2.0 - y) * 0.23
                cz_val = -z_multiplier * ((1.0 - depth_val) / (depth_val + alpha))
                person_x.append(cx_val)
                person_y.append(cy_val)
                person_z.append(cz_val)

    # Compute centroids for centering rotation on the person
    cx = np.mean(person_x) if person_x else 0.0
    cy = np.mean(person_y) if person_y else 0.0
    cz = np.mean(person_z) if person_z else 0.0
    print(f"Centroid found: X={cx:.2f}, Y={cy:.2f}, Z={cz:.2f}")

    print("Generating point cloud with edge filtering...")
    positions = []
    colors = []

    # Filter out edge pixels (curtains) where gradient is very high
    edge_threshold = 16.0

    for y in range(sample_height):
        for x in range(sample_width):
            # Skip points on depth edges to prevent silhouette shadow curtains
            if grad[y, x] > edge_threshold:
                continue

            r, g, b = color_arr[y, x][:3]
            depth_val = depth_arr[y, x] / 255.0

            centered_x = (x - sample_width / 2.0) * 0.23
            centered_y = (sample_height / 2.0 - y) * 0.23
            z = -z_multiplier * ((1.0 - depth_val) / (depth_val + alpha))

            # Subtract centroids so the person is at (0, 0, 0), but keep Y centered around the middle of the image (slightly offset for chest/head)
            x_proj = centered_x - cx
            y_proj = centered_y - 8.0
            z_proj = z - cz

            positions.append((x_proj, y_proj, z_proj))
            colors.append((r, g, b))

    print(f"Saving point cloud with {len(positions)} points to {output_path}...")
    with open(output_path, "wb") as f:
        # Write number of points (uint32)
        f.write(struct.pack("<I", len(positions)))
        # Write position (x, y, z as float32) and color (r, g, b as uint8)
        for pos, col in zip(positions, colors):
            f.write(struct.pack("<fffBBB", pos[0], pos[1], pos[2], col[0], col[1], col[2]))

    print("Finished generating pointcloud.bin successfully!")

if __name__ == "__main__":
    main()
