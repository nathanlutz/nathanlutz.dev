/**
 * Shape of the JSON emitted by the scripts in graphs/.
 * Kept free of Node built-ins so client components can import it.
 */

export type GraphValueFormat =
  | { kind: "percent"; decimals?: number }
  | { kind: "currency"; divisor?: number; suffix?: string; decimals?: number }
  | { kind: "number"; decimals?: number };

export interface GraphAxisTick {
  value: number;
  label: string;
}

export interface GraphAxes {
  x: { label: string; domain: [number, number]; ticks: GraphAxisTick[] };
  y: { label: string; domain: [number, number]; format: GraphValueFormat };
}

export interface GraphSeries {
  label: string;
  color: string;
  /** Draw the line from (0, 0) into the first point rather than starting at it. */
  includeOrigin?: boolean;
}

/** A single year: one [x, y] pair per group, plus an optional y-axis ceiling. */
export interface GraphFrame {
  year: number;
  points: [number, number][];
  yMax?: number;
}

export interface GraphData {
  slug: string;
  title: string;
  description: string;
  postedDate: string;
  attribution: { text: string; href: string };
  codeFile: string;
  codeMeta: { language: string; version: string; libraries: string[] };
  axes: GraphAxes;
  series: GraphSeries;
  frames: GraphFrame[];
}

export function formatValue(value: number, format: GraphValueFormat): string {
  switch (format.kind) {
    case "percent":
      return `${(value * 100).toFixed(format.decimals ?? 0)}%`;
    case "currency": {
      const scaled = value / (format.divisor ?? 1);
      return `$${scaled.toFixed(format.decimals ?? 0)}${format.suffix ?? ""}`;
    }
    default:
      return value.toFixed(format.decimals ?? 0);
  }
}

/** Round tick steps to 1/2/5 × 10ⁿ so labels stay readable at any scale. */
export function niceTicks(max: number, count = 5): number[] {
  if (!(max > 0) || !Number.isFinite(max)) return [0];

  const rawStep = max / count;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalized = rawStep / magnitude;
  const step =
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) * magnitude;

  const ticks: number[] = [];
  for (let i = 0; i * step <= max + step * 1e-9; i++) ticks.push(i * step);
  return ticks;
}

/** Blend two frames so playback and scrubbing move continuously, not in steps. */
export function lerpPoints(
  from: [number, number][],
  to: [number, number][],
  t: number
): [number, number][] {
  if (t <= 0 || from.length !== to.length) return from;
  if (t >= 1) return to;
  return from.map(([x, y], i) => [x, y + (to[i][1] - y) * t] as [number, number]);
}
