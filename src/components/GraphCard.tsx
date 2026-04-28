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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2>{title}</h2>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">{description}</div>
        </div>
        <div className="mt-1 grid shrink-0 grid-cols-2 gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
          {(["chart", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`min-h-10 rounded-[10px] px-3 py-2 text-center meta transition-all duration-200 ${
                tab === t
                  ? "bg-white text-[#231f20] shadow-sm dark:bg-[#231f20] dark:text-white"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
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
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0f111a] shadow-[0_20px_60px_rgba(15,17,26,0.28)]">
          <div className="relative border-b border-white/8 bg-[#181c26] px-4 py-3">
            <div className="pr-12 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-100">
                  {codeMeta.language} {codeMeta.version}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-zinc-500 sm:text-xs">
                {codeMeta.libraries.join(" · ")}
              </div>
            </div>
            <button
              onClick={copy}
              aria-label={copied ? "Copied" : "Copy code"}
              className="absolute right-4 top-3 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {copied ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="10" height="10" rx="2" />
                  <path d="M5 15V7a2 2 0 0 1 2-2h8" />
                </svg>
              )}
            </button>
          </div>
          <div
            className="graph-code max-h-[55vh] overflow-auto text-[13px] sm:max-h-80 sm:text-sm [&_code]:font-mono [&_pre]:m-0 [&_pre]:min-h-full [&_pre]:p-4 sm:[&_pre]:p-5 [&_pre]:leading-6 sm:[&_pre]:leading-7"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      )}
    </div>
  );
}
