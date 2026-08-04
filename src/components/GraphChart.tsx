import {
  formatValue,
  niceTicks,
  type GraphAxes,
  type GraphSeries,
} from "@/lib/graph-types";

interface Props {
  axes: GraphAxes;
  series: GraphSeries;
  points: [number, number][];
  yMax: number;
  year?: number;
  variant?: "full" | "thumb";
  hoveredIndex?: number | null;
  onHover?: (index: number | null) => void;
}

// `bottom` reserves a strip under the axis labels for the player's overlay
// controls, so the two never collide.
const FULL = { w: 800, h: 450, left: 78, right: 26, top: 26, bottom: 112 };
const THUMB = { w: 240, h: 120, left: 8, right: 8, top: 10, bottom: 8 };

/**
 * Stateless SVG line chart. No hooks, so the list page renders it on the
 * server with zero client JS; GraphPlayer supplies hover state on detail pages.
 */
export default function GraphChart({
  axes,
  series,
  points,
  yMax,
  year,
  variant = "full",
  hoveredIndex = null,
  onHover,
}: Props) {
  const isThumb = variant === "thumb";
  const box = isThumb ? THUMB : FULL;

  const plotW = box.w - box.left - box.right;
  const plotH = box.h - box.top - box.bottom;

  const [x0, x1] = axes.x.domain;
  const y0 = axes.y.domain[0];
  const y1 = yMax > y0 ? yMax : axes.y.domain[1];

  const sx = (v: number) => box.left + ((v - x0) / (x1 - x0)) * plotW;
  const sy = (v: number) => box.top + plotH - ((v - y0) / (y1 - y0)) * plotH;

  const linePoints = series.includeOrigin
    ? ([[0, y0], ...points] as [number, number][])
    : points;
  const path = linePoints.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" ");

  const yTicks = isThumb ? [] : niceTicks(y1, 5);
  const hovered = hoveredIndex != null ? points[hoveredIndex] : null;

  return (
    <svg
      viewBox={`0 0 ${box.w} ${box.h}`}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-label={
        year ? `${series.label}, ${year}` : series.label
      }
      onPointerLeave={onHover ? () => onHover(null) : undefined}
    >
      {!isThumb && (
        <>
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={box.left}
                x2={box.left + plotW}
                y1={sy(tick)}
                y2={sy(tick)}
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth={1}
              />
              <text
                x={box.left - 12}
                y={sy(tick)}
                dy="0.32em"
                textAnchor="end"
                fontSize={13}
                className="fill-zinc-400 dark:fill-zinc-500"
              >
                {formatValue(tick, axes.y.format)}
              </text>
            </g>
          ))}

          {axes.x.ticks.map((tick) => (
            <text
              key={tick.value}
              x={sx(tick.value)}
              y={box.top + plotH + 26}
              textAnchor="middle"
              fontSize={13}
              className="fill-zinc-400 dark:fill-zinc-500"
            >
              {tick.label}
            </text>
          ))}

          <text
            x={box.left + plotW / 2}
            y={box.h - 58}
            textAnchor="middle"
            fontSize={13}
            className="fill-zinc-500 dark:fill-zinc-400"
          >
            {axes.x.label}
          </text>
          <text
            transform={`translate(20 ${box.top + plotH / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={13}
            className="fill-zinc-500 dark:fill-zinc-400"
          >
            {axes.y.label}
          </text>

          {year != null && (
            <text
              x={box.left + plotW - 6}
              y={box.top + 44}
              textAnchor="end"
              fontSize={54}
              fontWeight={700}
              className="fill-zinc-900 dark:fill-zinc-100"
              opacity={0.12}
            >
              {year}
            </text>
          )}
        </>
      )}

      <polyline
        points={path}
        fill="none"
        stroke={series.color}
        strokeWidth={isThumb ? 2 : 2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {points.map(([x, y], i) => (
        <circle
          key={x}
          cx={sx(x)}
          cy={sy(y)}
          r={isThumb ? 2.5 : hoveredIndex === i ? 6 : 4}
          fill={series.color}
          className="stroke-white dark:stroke-zinc-950"
          strokeWidth={isThumb ? 1 : 2}
        />
      ))}

      {onHover &&
        points.map(([x, y], i) => (
          <circle
            key={`hit-${x}`}
            cx={sx(x)}
            cy={sy(y)}
            r={22}
            fill="transparent"
            onPointerEnter={() => onHover(i)}
          />
        ))}

      {hovered && !isThumb && (
        <Tooltip
          x={sx(hovered[0])}
          y={sy(hovered[1])}
          label={
            axes.x.ticks.find((t) => t.value === hovered[0])?.label ?? String(hovered[0])
          }
          value={formatValue(hovered[1], axes.y.format)}
          bounds={[box.left, box.left + plotW]}
        />
      )}
    </svg>
  );
}

function Tooltip({
  x,
  y,
  label,
  value,
  bounds,
}: {
  x: number;
  y: number;
  label: string;
  value: string;
  bounds: [number, number];
}) {
  const w = 132;
  const h = 46;
  const cx = Math.min(Math.max(x, bounds[0] + w / 2), bounds[1] - w / 2);
  const top = y - h - 16 < 0 ? y + 16 : y - h - 16;

  return (
    <g pointerEvents="none">
      <rect
        x={cx - w / 2}
        y={top}
        width={w}
        height={h}
        rx={10}
        className="fill-white stroke-zinc-200 dark:fill-zinc-900 dark:stroke-zinc-700"
        strokeWidth={1}
      />
      <text
        x={cx}
        y={top + 18}
        textAnchor="middle"
        fontSize={12}
        className="fill-zinc-500 dark:fill-zinc-400"
      >
        {label}
      </text>
      <text
        x={cx}
        y={top + 36}
        textAnchor="middle"
        fontSize={15}
        fontWeight={600}
        className="fill-zinc-900 dark:fill-zinc-100"
      >
        {value}
      </text>
    </g>
  );
}
