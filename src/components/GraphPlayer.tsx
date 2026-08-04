"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GraphChart from "./GraphChart";
import { lerpPoints, type GraphData } from "@/lib/graph-types";

const MS_PER_YEAR = 260;

export default function GraphPlayer({ graph }: { graph: GraphData }) {
  const { frames, axes, series } = graph;
  const lastIndex = Math.max(frames.length - 1, 0);

  // Fractional index, so playback and scrubbing interpolate between years.
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(query.matches);
      if (query.matches) setPlaying(false);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!playing || lastIndex === 0) return;

    let raf = 0;
    let previous = performance.now();

    const step = (now: number) => {
      const delta = now - previous;
      previous = now;
      setPosition((p) => {
        const next = p + delta / MS_PER_YEAR;
        return next >= lastIndex ? 0 : next;
      });
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, lastIndex]);

  const seek = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      setPosition(ratio * lastIndex);
    },
    [lastIndex]
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setPlaying(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    seek(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) seek(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const nudge = (delta: number) => {
    setPlaying(false);
    setPosition((p) => Math.min(Math.max(Math.round(p) + delta, 0), lastIndex));
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowLeft: () => nudge(-1),
      ArrowDown: () => nudge(-1),
      ArrowRight: () => nudge(1),
      ArrowUp: () => nudge(1),
      PageDown: () => nudge(-10),
      PageUp: () => nudge(10),
      Home: () => {
        setPlaying(false);
        setPosition(0);
      },
      End: () => {
        setPlaying(false);
        setPosition(lastIndex);
      },
      " ": () => setPlaying((p) => !p),
    };

    const handler = keys[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  if (frames.length === 0) return null;

  // Clamp before indexing: `position` can outlive a graph swap on the shared
  // /graphs/[slug] route, and a stale value would index past the new frames.
  const clamped = Math.min(Math.max(position, 0), lastIndex);
  const low = Math.floor(clamped);
  const high = Math.min(low + 1, lastIndex);
  const t = reducedMotion ? 0 : clamped - low;

  const points = lerpPoints(frames[low].points, frames[high].points, t);
  const fallbackMax = axes.y.domain[1];
  const lowMax = frames[low].yMax ?? fallbackMax;
  const highMax = frames[high].yMax ?? fallbackMax;
  const yMax = lowMax + (highMax - lowMax) * t;

  const index = Math.round(clamped);
  const percent = lastIndex === 0 ? 0 : (clamped / lastIndex) * 100;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
        <GraphChart
          axes={axes}
          series={series}
          points={points}
          yMax={yMax}
          year={frames[index].year}
          hoveredIndex={hovered}
          onHover={setHovered}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent pt-10 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 dark:from-zinc-950 dark:via-zinc-950/90 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100">
        <div className="flex items-center gap-3 px-4 pb-4 sm:gap-4 sm:px-6 sm:pb-5">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {playing ? (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6.5" y="5" width="4" height="14" rx="1" />
                <rect x="13.5" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 translate-x-[1px]"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5.5v13l10-6.5-10-6.5Z" />
              </svg>
            )}
          </button>

          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label="Year"
            aria-valuemin={0}
            aria-valuemax={lastIndex}
            aria-valuenow={index}
            aria-valuetext={String(frames[index].year)}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="relative flex h-8 flex-1 cursor-pointer touch-none items-center rounded outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div
              className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-zinc-900 shadow-sm ring-2 ring-white dark:bg-zinc-100 dark:ring-zinc-950"
              style={{ left: `${percent}%` }}
            />
          </div>

          <span className="w-[4ch] shrink-0 text-right text-sm font-medium tabular-nums text-zinc-700 dark:text-zinc-200">
            {frames[index].year}
          </span>
        </div>
      </div>
    </div>
  );
}
