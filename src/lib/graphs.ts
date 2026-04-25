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

export const graphs: GraphMeta[] = [
  {
    slug: "us-wealth-distribution",
    title: "US Wealth Distribution (1945–2019)",
    description:
      "Mean net worth per adult by wealth group, animated annually. Adjusted for inflation to 2019 dollars.",
    attribution: {
      text: "Piketty, Saez & Zucman (2022)",
      href: "https://gabriel-zucman.eu/usdina/",
    },
    thumbnailSrc: "/graphs/wealth_distribution_thumb.png",
    gifAlt: "Animated chart of mean US net worth by wealth group, 1945–2019",
    framesDir: "/graphs/frames/wealth_distribution",
    framesManifest: "/graphs/frames/wealth_distribution_manifest.json",
    codeFile: "wealth_distribution.py",
    codeMeta: {
      language: "Python",
      version: "3.12",
      libraries: ["matplotlib", "numpy", "openpyxl"],
    },
  },
];

export function getGraphBySlug(slug: string): GraphMeta | undefined {
  return graphs.find((g) => g.slug === slug);
}
