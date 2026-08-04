# nathanlutz.dev

Personal site — Next.js 16 (App Router), Tailwind v4, MDX for research notes.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Graphs & Data

Each graph is a Python script that crunches numbers and writes **one JSON file**.
The site globs `content/graphs/*.json`, so adding a graph never means editing
TypeScript — the JSON is the single source of truth for both the data and the
metadata (title, description, axes, colors, attribution).

The charts are rendered as SVG on the frontend, which is why the repo stores
~10 KB of numbers per graph instead of a few hundred rasterized frames.

### Regenerating the data

```bash
pip install -r graphs/requirements.txt
python graphs/effective_tax_rates.py
python graphs/wealth_distribution.py
```

The source workbook (`graphs/psz2022.xlsx`, ~40 MB) is gitignored and downloaded
automatically on first run from [gabriel-zucman.eu](https://gabriel-zucman.eu/usdina/).

### Adding a graph

1. Copy an existing script in `graphs/` as a starting point.
2. Pull your numbers into `frames` — one entry per step of the animation,
   each with a `year` and a list of `[x, y]` points.
3. Call `write_graph_json(...)` with the slug, copy, axes, and series color.
   Pass a per-frame `yMax` if the y-axis should grow over time.
4. Run the script. The new graph appears at `/graphs/<slug>` automatically.

Nothing else needs touching — no route, no component, no config.

### Layout

| Path | What it holds |
|---|---|
| `graphs/*.py` | Data extraction; also rendered in the "Source" tab |
| `content/graphs/*.json` | Generated data + metadata (committed) |
| `src/lib/graphs.ts` | Globs and parses the JSON (server-only) |
| `src/lib/graph-types.ts` | Shared types, value formatting, tick math |
| `src/components/GraphChart.tsx` | Stateless SVG chart |
| `src/components/GraphPlayer.tsx` | Playback, scrubbing, hover |

## Research notes

MDX files in `content/research/`, gated behind a feature flag:

```bash
NEXT_PUBLIC_FEATURE_RESEARCH_NOTES=true npm run dev
```
