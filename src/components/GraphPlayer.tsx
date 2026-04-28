"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Frame {
  year: number;
  src: string;
}

export default function GraphPlayer({
  frames,
  alt,
}: {
  frames: Frame[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload all frames so scrubbing is instant
  useEffect(() => {
    frames.forEach((f) => {
      const img = new window.Image();
      img.src = f.src;
    });
  }, [frames]);

  const tick = useCallback(() => {
    setIndex((i) => (i + 1) % frames.length);
  }, [frames.length]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(tick, 250);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, tick]);

  return (
    <div className="space-y-3">
      <img
        src={frames[index].src}
        alt={alt}
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800"
      />

      <div className="rounded-xl border border-zinc-200 bg-white/70 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-950/60">
        <div className="mb-3 flex items-center justify-between text-xs text-zinc-400 select-none">
          <span>{frames[0].year}</span>
          <span className="font-medium text-zinc-700 dark:text-zinc-200">
            {frames[index].year}
          </span>
          <span>{frames[frames.length - 1].year}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-base leading-none text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            {playing ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <rect x="6.5" y="5" width="4" height="14" rx="1" />
                <rect x="13.5" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 translate-x-[1px]"
                fill="currentColor"
              >
                <path d="M8 5.5v13l10-6.5-10-6.5Z" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={frames.length - 1}
              value={index}
              onChange={(e) => {
                setPlaying(false);
                setIndex(Number(e.target.value));
              }}
              className="w-full cursor-pointer accent-[#231f20]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
