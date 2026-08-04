"""
US Effective Tax Rates by Percentile Over Time, 1913-2019
Effective tax rate by percentile group, one series of points per year.

Data: Piketty, Saez & Zucman (2022) - Appendix Tables II (Distributional)
      https://gabriel-zucman.eu/usdina/
Units: Effective tax rate (share of pre-tax income), combined federal/state/local
Output: content/graphs/us-effective-tax-rates-by-percentile.json
"""

from __future__ import annotations

from psz_graph_utils import load_psz_workbook, write_graph_json

wb = load_psz_workbook()
ws = wb["taxrates"]

headers = next(ws.iter_rows(values_only=True))
column_index = {header: index for index, header in enumerate(headers) if header is not None}

# x position, tick label, source column
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

write_graph_json(
    slug="us-effective-tax-rates-by-percentile",
    title="US Effective Tax Rates by Percentile Over Time",
    description=(
        "Effective tax rates by percentile group, animated annually from 1913 to 2019."
    ),
    posted_date="2026-04-27",
    code_file="effective_tax_rates.py",
    axes={
        "x": {
            "label": "Percentile",
            "domain": [0.75, 6.25],
            "ticks": [{"value": x_pos, "label": label} for x_pos, label, _ in GROUPS],
        },
        "y": {
            "label": "Effective tax rate",
            "domain": [0, 0.8],
            "format": {"kind": "percent", "decimals": 0},
        },
    },
    series={
        "label": "Effective tax rate",
        "color": "#2563eb",
    },
    frames=[{"year": year, "points": plot_data[year]} for year in years],
)
