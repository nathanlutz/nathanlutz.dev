import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import GraphCard from "@/components/GraphCard";

export default async function Graphs() {
  const code = readFileSync(
    join(process.cwd(), "graphs", "wealth_distribution.py"),
    "utf-8"
  );

  const highlightedCode = await codeToHtml(code, {
    lang: "python",
    theme: "github-light",
  });

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1>Graphs & Data</h1>
        <p>Graphs and data I find interesting.</p>
      </div>

      <GraphCard
        title="US Wealth Distribution (1945–2019)"
        description={
          <>
            Mean net worth per adult by wealth group, animated annually. Data from{" "}
            <a
              href="https://gabriel-zucman.eu/usdina/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Piketty, Saez & Zucman (2022)
            </a>
            , real 2019 dollars.
          </>
        }
        gifSrc="/graphs/wealth_distribution.gif"
        gifAlt="Animated chart of mean US net worth by wealth group, 1945–2019"
        highlightedCode={highlightedCode}
        rawCode={code}
        codeMeta={{
          language: "Python",
          version: "3.12",
          libraries: ["matplotlib", "numpy", "openpyxl"],
        }}
      />
    </div>
  );
}
