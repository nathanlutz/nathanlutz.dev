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
      intervalRef.current = setInterval(tick, 770);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, tick]);

  return (
    <div className="space-y-2">
      <img
        src={frames[index].src}
        alt={alt}
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800"
      />

      <div className="flex items-center gap-3 px-1">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="shrink-0 text-base leading-none text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors w-5 text-center"
        >
          {playing ? "⏸" : "▶"}
        </button>

        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={frames.length - 1}
            value={index}
            onChange={(e) => {
              setPlaying(false);
              setIndex(Number(e.target.value));
            }}
            className="w-full accent-[#231f20] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-400 select-none">
            <span>{frames[0].year}</span>
            <span className="font-medium text-zinc-600 dark:text-zinc-300">
              {frames[index].year}
            </span>
            <span>{frames[frames.length - 1].year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
