import { readFileSync } from "fs";
import { join } from "path";
import { codeToHtml } from "shiki";
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
    theme: "github-light",
  });

  return (
    <div className="space-y-8">
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
        gifSrc={graph.gifSrc}
        gifAlt={graph.gifAlt}
        highlightedCode={highlightedCode}
        rawCode={code}
        codeMeta={graph.codeMeta}
      />
    </div>
  );
}
