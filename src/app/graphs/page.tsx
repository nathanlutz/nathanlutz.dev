import Link from "next/link";
import { graphs } from "@/lib/graphs";

export default function Graphs() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1>Graphs & Data</h1>
        <p>Graphs and data I find interesting.</p>
      </div>

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {graphs.map((graph) => (
          <Link
            key={graph.slug}
            href={`/graphs/${graph.slug}`}
            className="flex items-center gap-4 py-4 group"
          >
            <div className="w-14 h-10 shrink-0 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img
                src={graph.thumbnailSrc}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium group-hover:text-blue-500 transition-colors truncate">
                {graph.title}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                {graph.description}
              </p>
            </div>
            <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
