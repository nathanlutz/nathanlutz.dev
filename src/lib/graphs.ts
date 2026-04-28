export interface GraphMeta {
  slug: string;
  title: string;
  description: string;
  attribution: { text: string; href: string };
  thumbnailSrc: string;
  gifAlt: string;
  framesDir: string;   // public/ URL prefix for frame JPEGs, e.g. "/graphs/frames/wealth_distribution"
  framesManifest: string; // public/ path to manifest JSON
  codeFile: string;
  codeMeta: { language: string; version: string; libraries: string[] };
}

const PSZ_ATTRIBUTION = {
  text: "Piketty, Saez & Zucman (2022)",
  href: "https://gabriel-zucman.eu/usdina/",
} as const;

const PYTHON_GRAPH_CODE_META = {
  language: "Python",
  version: "3.13",
  libraries: ["matplotlib", "numpy", "openpyxl"],
} as const;

function createPszGraph({
  slug,
  title,
  description,
  gifAlt,
  codeFile,
  assetBase,
  thumbnailYear,
}: {
  slug: string;
  title: string;
  description: string;
  gifAlt: string;
  codeFile: string;
  assetBase: string;
  thumbnailYear: number;
}): GraphMeta {
  return {
    slug,
    title,
    description,
    attribution: PSZ_ATTRIBUTION,
    thumbnailSrc: `/graphs/frames/${assetBase}_${thumbnailYear}.jpg`,
    gifAlt,
    framesDir: `/graphs/frames/${assetBase}`,
    framesManifest: `/graphs/frames/${assetBase}_manifest.json`,
    codeFile,
    codeMeta: PYTHON_GRAPH_CODE_META,
  };
}

export const graphs: GraphMeta[] = [
  createPszGraph({
    slug: "us-wealth-distribution",
    title: "US Wealth Distribution (1945–2019)",
    description:
      "Mean net worth per adult by wealth group, animated annually. Adjusted for inflation to 2019 dollars.",
    gifAlt: "Animated chart of mean US net worth by wealth group, 1945–2019",
    codeFile: "wealth_distribution.py",
    assetBase: "wealth_distribution",
    thumbnailYear: 2019,
  }),
  createPszGraph({
    slug: "us-effective-tax-rates-by-percentile",
    title: "US Effective Tax Rates by Percentile Over Time",
    description:
      "Effective tax rates by percentile group, animated annually from 1913 to 2019.",
    gifAlt: "Animated chart of US effective tax rates by percentile group over time",
    codeFile: "effective_tax_rates.py",
    assetBase: "effective_tax_rates",
    thumbnailYear: 2019,
  }),
];

export function getGraphBySlug(slug: string): GraphMeta | undefined {
  return graphs.find((g) => g.slug === slug);
}
