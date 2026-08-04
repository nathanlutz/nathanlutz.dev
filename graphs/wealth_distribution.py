"""
US Wealth Distribution, 1945-2019
Mean net worth per adult by wealth group, one series of points per year.

Data: Piketty, Saez & Zucman (2022) - Appendix Tables II (Distributional)
      https://gabriel-zucman.eu/usdina/
Units: Real 2019 USD, equal-split adults 20+
Output: content/graphs/us-wealth-distribution.json
"""

from __future__ import annotations

from psz_graph_utils import load_psz_workbook, smooth_upper_bounds, write_graph_json

wb = load_psz_workbook()

# avghweal sheet — col 1: mean wealth of all adults (avghweal0indiv)
avg_by_year = {
    int(row[0]): float(row[1])
    for row in wb["avghweal"].iter_rows(values_only=True)
    if isinstance(row[0], (int, float)) and row[1] is not None
}

# TE1 sheet — wealth shares by group, rows 9+ are data
# Col indices: [1] Bot90  [4] Top10  [6] Top1  [8] Top0.1  [9] Top0.01
te1_by_year = {}
for row in list(wb["TE1"].iter_rows(values_only=True))[9:]:
    yr = row[0]
    if not isinstance(yr, (int, float)) or row[1] is None:
        continue
    te1_by_year[int(yr)] = {
        "bot90":  row[1],
        "top10":  row[4],
        "top1":   row[6],
        "top01":  row[8],
        "top001": row[9],
    }

# ---------------------------------------------------------------------------
# Wealth groups
# Formula: mean_group = avg_all_adults × share_group / fraction_of_population
# ---------------------------------------------------------------------------

GROUPS = [
    # x_pos  tick label    share_fn                          pop_fraction
    (1, "90th",      lambda s: s["bot90"],                   0.9000),
    (2, "99th",      lambda s: s["top10"] - s["top1"],       0.0900),
    (3, "99.9th",    lambda s: s["top1"] - s["top01"],       0.0090),
    (4, "99.99th",   lambda s: s["top01"],                   0.0010),
    (5, "99.999th",  lambda s: s["top001"],                  0.0001),
]


def compute_year(year):
    avg0 = avg_by_year.get(year)
    shares = te1_by_year.get(year)
    if avg0 is None or shares is None:
        return None
    pts = []
    for x_pos, _, share_fn, frac in GROUPS:
        share = share_fn(shares)
        if share is not None and share > 0:
            pts.append((x_pos, avg0 * share / frac))
    return pts or None


plot_data = {yr: pts for yr in range(1945, 2020) if (pts := compute_year(yr))}
years = sorted(plot_data)

# The y-axis grows over time; a rolling max keeps it from jittering frame to frame.
raw_ymaxes = [max(y for _, y in plot_data[yr]) * 1.08 for yr in years]
ylims = smooth_upper_bounds(raw_ymaxes)

write_graph_json(
    slug="us-wealth-distribution",
    title="US Wealth Distribution (1945–2019)",
    description=(
        "Mean net worth per adult by wealth group, animated annually. "
        "Adjusted for inflation to 2019 dollars."
    ),
    posted_date="2026-04-24",
    code_file="wealth_distribution.py",
    axes={
        "x": {
            "label": "Percentile (mean wealth of each group)",
            "domain": [0.5, 5.5],
            "ticks": [{"value": x_pos, "label": label} for x_pos, label, _, _ in GROUPS],
        },
        "y": {
            "label": "Mean net worth per adult (2019 USD)",
            "domain": [0, ylims[0]],
            "format": {"kind": "currency", "divisor": 1_000_000, "suffix": "M", "decimals": 1},
        },
    },
    series={
        "label": "Mean net worth per adult",
        "color": "#e63946",
        "includeOrigin": True,
    },
    frames=[
        {"year": year, "points": plot_data[year], "yMax": ylim}
        for year, ylim in zip(years, ylims)
    ],
    value_places=2,
)
