import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGraphBySlug } from "@/lib/graphs";
import GraphCard from "@/components/GraphCard";

export default async function GraphDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const graph = getGraphBySlug(slug);

  if (!graph) {
    notFound();
  }

  const code = readFileSync(
    join(process.cwd(), "graphs", graph.codeFile),
    "utf-8"
  );

  const highlightedCode = await codeToHtml(code, {
    lang: "python",
    theme: "dark-plus",
  });

  const manifest: { years: number[] } = JSON.parse(
    readFileSync(
      join(process.cwd(), "public", graph.framesManifest.replace(/^\//, "")),
      "utf-8"
    )
  );

  const frames = manifest.years.map((year) => ({
    year,
    src: `${graph.framesDir}_${year}.jpg`,
  }));

  return (
    <div className="relative pt-1">
      <Link
        href="/graphs"
        className="absolute -top-3 left-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 sm:-top-5 md:-top-7"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.5 3.5 6 8l4.5 4.5" />
          <path d="M6.5 8h6" />
        </svg>
        Back
      </Link>
      <GraphCard
        title={graph.title}
        description={
          <>
            {graph.description} Data from{" "}
            <a
              href={graph.attribution.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {graph.attribution.text}
            </a>
            .
          </>
        }
        frames={frames}
        gifAlt={graph.gifAlt}
        highlightedCode={highlightedCode}
        rawCode={code}
        codeMeta={graph.codeMeta}
      />
    </div>
  );
}
