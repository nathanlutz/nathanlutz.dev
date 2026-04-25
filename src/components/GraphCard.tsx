"use client";

import { useState } from "react";
import GraphPlayer from "./GraphPlayer";

interface Frame {
  year: number;
  src: string;
}

interface Props {
  title: string;
  description: React.ReactNode;
  frames: Frame[];
  gifAlt: string;
  highlightedCode: string;
  rawCode: string;
  codeMeta: { language: string; version: string; libraries: string[] };
}

export default function GraphCard({
  title,
  description,
  frames,
  gifAlt,
  highlightedCode,
  rawCode,
  codeMeta,
}: Props) {
  const [tab, setTab] = useState<"chart" | "code">("chart");
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2>{title}</h2>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{description}</div>
        </div>
        <div className="flex gap-[6px] shrink-0 mt-1">
          {(["chart", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 pt-2 pb-3 rounded-lg meta text-center transition-all duration-200 ${
                tab === t
                  ? "bg-[#231f20] text-white [text-shadow:_0_0_0.5px_currentColor]"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {t === "chart" ? "Chart" : "Source"}
            </button>
          ))}
        </div>
      </div>

      {tab === "chart" ? (
        <GraphPlayer frames={frames} alt={gifAlt} />
      ) : (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {codeMeta.language} {codeMeta.version}
              </span>
              <span>·</span>
              <span>{codeMeta.libraries.join(" · ")}</span>
            </div>
            <button
              onClick={copy}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div
            className="overflow-auto max-h-80 text-sm [&>pre]:p-4 [&>pre]:m-0 [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      )}
    </div>
  );
}
