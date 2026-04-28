import Link from "next/link";
import { graphs } from "@/lib/graphs";

function formatShortPostedDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }).format(new Date(`${date}T00:00:00`));
}

export default function Graphs() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2 sm:space-y-3">
        <h1>Graphs & Data</h1>
        <p>Graphs and data I find interesting.</p>
      </div>

      <div className="space-y-3 sm:space-y-0 sm:overflow-hidden sm:rounded-[1.5rem] sm:border sm:border-zinc-200 sm:dark:border-zinc-800">
        {graphs.map((graph) => (
          <Link
            key={graph.slug}
            href={`/graphs/${graph.slug}`}
            className="group block overflow-hidden rounded-[1.35rem] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 sm:grid sm:gap-4 sm:rounded-none sm:border-0 sm:border-b sm:border-zinc-200 sm:bg-white sm:px-4 sm:py-4 sm:last:border-b-0 sm:hover:bg-zinc-50 sm:dark:border-zinc-800 sm:dark:bg-zinc-950 sm:dark:hover:bg-zinc-900/60 sm:[grid-template-columns:3.5rem_6rem_1fr_auto] sm:items-center"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 sm:contents">
              <span className="meta px-4 text-zinc-400 sm:px-0">
                {formatShortPostedDate(graph.postedDate)}
              </span>
              <div className="px-4 text-right sm:hidden">
                <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-400">
                  {graph.graphType}
                </p>
              </div>
            </div>
            <img
              src={graph.thumbnailSrc}
              alt=""
              className="h-28 w-full object-cover object-left sm:h-14 sm:rounded-xl sm:border sm:border-zinc-200 sm:dark:border-zinc-800"
            />
            <div className="space-y-2 px-4 py-4 sm:min-w-0 sm:space-y-0 sm:px-0 sm:py-0">
              <div className="sm:flex sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
                <p className="font-medium text-zinc-950 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-300">
                  {graph.title}
                </p>
                <span className="hidden text-xs uppercase tracking-[0.1em] text-zinc-400 sm:inline">
                  Python
                </span>
              </div>
              <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:mt-1">
                {graph.description}
              </p>
            </div>
            <div className="meta hidden text-zinc-400 sm:block sm:text-right">{graph.graphType}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
