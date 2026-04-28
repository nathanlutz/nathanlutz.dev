"""
Shared helpers for PSZ-based animated graph generation.
"""

from __future__ import annotations

import json
import os
import urllib.request
import warnings
from typing import Iterable, Sequence

import matplotlib.animation as animation
import numpy as np
import openpyxl
from PIL import Image

warnings.filterwarnings("ignore")

GRAPH_DIR = os.path.dirname(__file__)
PUBLIC_GRAPHS_DIR = os.path.join(GRAPH_DIR, "..", "public", "graphs")
PUBLIC_FRAMES_DIR = os.path.join(PUBLIC_GRAPHS_DIR, "frames")
PSZ_CACHE = os.path.join(GRAPH_DIR, "psz2022.xlsx")
PSZ_URL = "https://gabriel-zucman.eu/files/PSZ2022AppendixTablesII(Distrib).xlsx"


def ensure_psz_workbook() -> str:
    if os.path.exists(PSZ_CACHE):
        return PSZ_CACHE

    print("Downloading PSZ 2022 data...")
    req = urllib.request.Request(PSZ_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as response:
        data = response.read()

    with open(PSZ_CACHE, "wb") as file:
        file.write(data)

    return PSZ_CACHE


def load_psz_workbook() -> openpyxl.Workbook:
    return openpyxl.load_workbook(
        ensure_psz_workbook(),
        read_only=True,
        data_only=True,
    )


def smooth_curve(
    points: Sequence[tuple[float, float]],
    *,
    samples: int = 500,
    include_origin: bool = True,
) -> tuple[np.ndarray, np.ndarray]:
    xs = np.array([point[0] for point in points], dtype=float)
    ys = np.array([point[1] for point in points], dtype=float)

    if include_origin:
        xs = np.insert(xs, 0, 0.0)
        ys = np.insert(ys, 0, 0.0)
        x_start = 0.0
    else:
        x_start = float(xs[0])

    x_smooth = np.linspace(x_start, float(xs[-1]), samples)
    return x_smooth, np.interp(x_smooth, xs, ys)


def smooth_upper_bounds(values: Sequence[float], window: int = 3) -> list[float]:
    smoothed: list[float] = []
    total = len(values)

    for index in range(total):
        start = max(0, index - window)
        end = min(total, index + window + 1)
        smoothed.append(max(values[start:end]))

    return smoothed


def save_animation_and_frames(
    fig,
    ani: animation.FuncAnimation,
    *,
    asset_base: str,
    years: Iterable[int],
    fps: float = 1.3,
    dpi: int = 120,
    jpeg_quality: int = 85,
) -> None:
    os.makedirs(PUBLIC_GRAPHS_DIR, exist_ok=True)
    os.makedirs(PUBLIC_FRAMES_DIR, exist_ok=True)

    gif_path = os.path.join(PUBLIC_GRAPHS_DIR, f"{asset_base}.gif")
    ani.save(gif_path, writer="pillow", fps=fps, dpi=dpi)
    print(f"Saved {gif_path}")

    gif_img = Image.open(gif_path)
    years_list = list(years)

    for frame_index, year in enumerate(years_list):
        try:
            gif_img.seek(frame_index)
            gif_img.convert("RGB").save(
                os.path.join(PUBLIC_FRAMES_DIR, f"{asset_base}_{year}.jpg"),
                "JPEG",
                quality=jpeg_quality,
            )
        except EOFError:
            break

    manifest_path = os.path.join(PUBLIC_FRAMES_DIR, f"{asset_base}_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as file:
        json.dump({"years": years_list}, file)

    print(f"Saved {len(years_list)} frames -> {PUBLIC_FRAMES_DIR}")
    fig.savefig(os.path.join(PUBLIC_GRAPHS_DIR, f"{asset_base}.png"), dpi=dpi)
