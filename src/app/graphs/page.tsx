import Link from "next/link";
import { graphs } from "@/lib/graphs";

export default function Graphs() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1>Graphs & Data</h1>
        <p>Graphs and data I find interesting.</p>
      </div>

      <div className="space-y-4">
        {graphs.map((graph) => (
          <Link
            key={graph.slug}
            href={`/graphs/${graph.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_16px_40px_rgba(35,31,32,0.08)] dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700"
          >
            <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <img
                src={graph.thumbnailSrc}
                alt=""
                className="h-full w-full object-cover object-left transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-zinc-900 transition-colors group-hover:text-blue-500 dark:text-zinc-100">
                {graph.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {graph.description}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-zinc-200 px-3 py-2 text-sm text-zinc-400 transition-colors group-hover:border-zinc-300 group-hover:text-zinc-700 dark:border-zinc-800 dark:text-zinc-500 dark:group-hover:border-zinc-700 dark:group-hover:text-zinc-300">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
