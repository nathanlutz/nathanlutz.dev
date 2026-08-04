"""
Shared helpers for PSZ-based graph data.

These scripts only crunch numbers. Each one reads the Piketty, Saez & Zucman
workbook and writes a single JSON file into content/graphs/. All drawing
happens on the frontend, so nothing here deals in pixels — just the numbers
plus the handful of axis hints the chart needs to label itself.
"""

from __future__ import annotations

import json
import os
import urllib.request
from typing import Any, Sequence

import openpyxl

GRAPH_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.normpath(os.path.join(GRAPH_DIR, "..", "content", "graphs"))
PSZ_CACHE = os.path.join(GRAPH_DIR, "psz2022.xlsx")
PSZ_URL = "https://gabriel-zucman.eu/files/PSZ2022AppendixTablesII(Distrib).xlsx"

PSZ_ATTRIBUTION = {
    "text": "Piketty, Saez & Zucman (2022)",
    "href": "https://gabriel-zucman.eu/usdina/",
}

DEFAULT_CODE_META = {
    "language": "Python",
    "version": "3.13",
    "libraries": ["openpyxl"],
}


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


def smooth_upper_bounds(values: Sequence[float], window: int = 3) -> list[float]:
    """Rolling max, so a per-frame y-axis grows without jittering."""
    smoothed: list[float] = []
    total = len(values)

    for index in range(total):
        start = max(0, index - window)
        end = min(total, index + window + 1)
        smoothed.append(max(values[start:end]))

    return smoothed


def write_graph_json(
    *,
    slug: str,
    title: str,
    description: str,
    posted_date: str,
    code_file: str,
    axes: dict[str, Any],
    series: dict[str, Any],
    frames: Sequence[dict[str, Any]],
    attribution: dict[str, str] | None = None,
    code_meta: dict[str, Any] | None = None,
    value_places: int = 6,
) -> str:
    """Write one graph's metadata and data to content/graphs/<slug>.json.

    That file is the single source of truth for the graph — the site globs the
    directory, so adding a graph never means editing TypeScript.
    """
    os.makedirs(DATA_DIR, exist_ok=True)

    payload: dict[str, Any] = {
        "slug": slug,
        "title": title,
        "description": description,
        "postedDate": posted_date,
        "attribution": attribution or PSZ_ATTRIBUTION,
        "codeFile": code_file,
        "codeMeta": code_meta or DEFAULT_CODE_META,
        "axes": axes,
        "series": series,
        "frames": [
            {
                "year": int(frame["year"]),
                "points": [[x, round(y, value_places)] for x, y in frame["points"]],
                **(
                    {"yMax": round(frame["yMax"], value_places)}
                    if frame.get("yMax") is not None
                    else {}
                ),
            }
            for frame in frames
        ],
    }

    out_path = os.path.join(DATA_DIR, f"{slug}.json")
    with open(out_path, "w", encoding="utf-8") as file:
        json.dump(payload, file, separators=(",", ":"))

    size_kb = os.path.getsize(out_path) / 1024
    print(f"Wrote {len(payload['frames'])} frames -> {out_path} ({size_kb:.1f} KB)")
    return out_path
