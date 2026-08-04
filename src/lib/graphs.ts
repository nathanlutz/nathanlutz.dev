import { existsSync, readdirSync, readFileSync } from "fs";
import { join } from "path";
import type { GraphData } from "./graph-types";

export type * from "./graph-types";

const DATA_DIR = join(process.cwd(), "content", "graphs");

/**
 * Every graph is one JSON file written by the matching script in graphs/.
 * Adding a graph means adding a script and running it — no edits here.
 */
export function getAllGraphs(): GraphData[] {
  if (!existsSync(DATA_DIR)) return [];

  return readdirSync(DATA_DIR)
    .filter((file) => file.endsWith(".json"))
    .map(
      (file) => JSON.parse(readFileSync(join(DATA_DIR, file), "utf-8")) as GraphData
    )
    .sort(
      (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    );
}

export function getGraphBySlug(slug: string): GraphData | undefined {
  const path = join(DATA_DIR, `${slug}.json`);
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, "utf-8")) as GraphData;
}
