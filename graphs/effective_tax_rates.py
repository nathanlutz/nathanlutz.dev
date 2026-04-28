"""
US Effective Tax Rates by Percentile Over Time, 1913-2019
Effective tax rate by percentile group, animated by year.

Data: Piketty, Saez & Zucman (2022) - Appendix Tables II (Distributional)
      https://gabriel-zucman.eu/usdina/
Units: Effective tax rate
Output: public/graphs/effective_tax_rates.gif
"""

from __future__ import annotations

import matplotlib.animation as animation
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

from psz_graph_utils import (
    load_psz_workbook,
    save_animation_and_frames,
    smooth_curve,
)

wb = load_psz_workbook()
ws = wb["taxrates"]

headers = next(ws.iter_rows(values_only=True))
column_index = {header: index for index, header in enumerate(headers) if header is not None}

GROUPS = [
    (1, "90", "taxtop10"),
    (2, "95", "taxtop5"),
    (3, "99", "taxtop1"),
    (4, "99.5", "taxtop0p5"),
    (5, "99.9", "taxtop0p1"),
    (6, "99.99", "taxtop0p01"),
]

plot_data: dict[int, list[tuple[int, float]]] = {}
for row in ws.iter_rows(min_row=2, values_only=True):
    year = row[column_index["year"]]
    if not isinstance(year, (int, float)):
        continue

    points = []
    for x_pos, _, column_name in GROUPS:
        value = row[column_index[column_name]]
        if value is not None:
            points.append((x_pos, float(value)))

    if points:
        plot_data[int(year)] = points

years = [year for year in sorted(plot_data) if 1913 <= year <= 2019]

fig, ax = plt.subplots(figsize=(13, 7))
plt.subplots_adjust(left=0.1, right=0.97, top=0.88, bottom=0.18)

line, = ax.plot([], [], color="#2563eb", linewidth=2.5, zorder=3)
dots, = ax.plot([], [], "o", color="#2563eb", markersize=5, zorder=4)
yr_label = ax.text(
    0.97,
    0.95,
    "",
    transform=ax.transAxes,
    fontsize=40,
    fontweight="bold",
    ha="right",
    va="top",
    color="#231f20",
    alpha=0.2,
)

ax.set_xlim(0.75, 6.25)
ax.set_ylim(0, 0.8)
ax.yaxis.set_major_formatter(FuncFormatter(lambda value, _: f"{value * 100:.0f}%"))
ax.set_xticks([group[0] for group in GROUPS])
ax.set_xticklabels([group[1] for group in GROUPS], fontsize=9)
ax.set_xlabel("Percentile", fontsize=11)
ax.set_ylabel("Effective tax rate", fontsize=11)
ax.set_title(
    "Effective Tax Rate by Percentile, USA 1913-2019\n"
    "Source: Piketty, Saez & Zucman (2022) - combined federal, state, and local taxes",
    fontsize=12,
)
ax.grid(True, alpha=0.3)


def update(frame_index: int):
    points = plot_data[years[frame_index]]
    smooth_xs, smooth_ys = smooth_curve(points, include_origin=False)
    line.set_data(smooth_xs, smooth_ys)
    dots.set_data([point[0] for point in points], [point[1] for point in points])
    yr_label.set_text(str(years[frame_index]))
    return line, dots, yr_label


ani = animation.FuncAnimation(
    fig,
    update,
    frames=len(years),
    interval=700,
    blit=False,
    repeat=True,
    repeat_delay=1500,
)

save_animation_and_frames(
    fig,
    ani,
    asset_base="effective_tax_rates",
    years=years,
    fps=1.3,
    dpi=120,
)
