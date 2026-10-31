"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume1,
  Volume2,
  VolumeX,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../../actions/button";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                  Types                                      */
/* -------------------------------------------------------------------------- */

export type AudioVariant =
  | "default" // full player with artwork + controls
  | "compact" // inline single-row player
  | "minimal" // play button + progress only
  | "waveform" // waveform with playhead
  | "podcast"; // rich with cover, chapters, description

export type AudioSize = "sm" | "default" | "lg";
export type AudioTone = "neutral" | "brand" | "success" | "warning" | "danger";

/**
 * Motion presets — all structural / single-axis.
 *
 *   none     → no feedback animation
 *   pulse    → playing indicator pulses opacity (state feedback)
 *   bars     → 3-bar EQ oscillates height while playing
 *   ring     → 12-line ring opacity flicker while buffering
 *   scanline → 1px divider sweeps across the header while loading
 */
export type AudioAnimation = "none" | "pulse" | "bars" | "ring" | "scanline";

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                   */
/* -------------------------------------------------------------------------- */

const rootVariants = cva(
  "flex w-full items-center gap-3 rounded-lg border bg-card text-card-foreground w-lg",
  {
    variants: {
      variant: {
        default: "flex-col items-start justify-between p-4 rounded-xl max-w-lg",
        compact: "p-2.5 pr-4 rounded-full",
        minimal: "p-2 pr-4 rounded-full",
        waveform: "flex-col items-stretch p-4",
        podcast: "flex-col items-stretch p-4 rounded-xl",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-[15px]",
      },
      tone: {
        neutral: "border-border",
        brand: "border-foreground/20",
        success: "border-emerald-500/30",
        warning: "border-amber-500/30",
        danger: "border-red-500/30",
      },
    },
    defaultVariants: { variant: "default", size: "default", tone: "neutral" },
  },
);

const playButtonVariants = cva(
  cn(
    "inline-flex shrink-0 items-center justify-center rounded-full",
    "bg-foreground! text-background! border-[0.8px] border-secondary/70 ring-2 ring-foreground inset-shadow-none",
    "transition-colors duration-150 motion-reduce:transition-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      size: {
        sm: "size-8 [&_svg]:size-3.5",
        default: "size-10 [&_svg]:size-4",
        lg: "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: { size: "default" },
  },
);

const toneFillClass: Record<AudioTone, string> = {
  neutral: "bg-foreground",
  brand: "bg-foreground",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

/* -------------------------------------------------------------------------- */
/*                              Helpers                                        */
/* -------------------------------------------------------------------------- */

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Deterministic pseudo-random waveform from the audio duration. */
function generateWaveform(seed: number, bars = 64): number[] {
  const out: number[] = [];
  let s = seed || 1;
  for (let i = 0; i < bars; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    out.push(0.3 + r * 0.7);
  }
  return out;
}

/* -------------------------------------------------------------------------- */
/*                              Styles                                         */
/* -------------------------------------------------------------------------- */

function ensureAudioStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("venumity-audio-styles")) return;

  const style = document.createElement("style");
  style.id = "venumity-audio-styles";
  style.textContent = `
@keyframes vn-audio-pulse {
  0%, 100% { opacity: 0.65; }
  50%      { opacity: 1; }
}
@keyframes vn-audio-bar {
  0%, 100% { transform: scaleY(0.4); }
  50%      { transform: scaleY(1); }
}
@keyframes vn-audio-ring {
  0%   { opacity: 1; }
  100% { opacity: 0.2; }
}
@keyframes vn-audio-scan {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@media (prefers-reduced-motion: no-preference) {
  .vn-audio-pulse { animation: vn-audio-pulse 1.4s ease-in-out infinite; }
  .vn-audio-bar   { animation: vn-audio-bar 0.9s ease-in-out infinite; }
  .vn-audio-ring  { animation: vn-audio-ring 0.84s linear infinite; }
  .vn-audio-scan  { animation: vn-audio-scan 1.2s cubic-bezier(0.32, 0.72, 0, 1) infinite; }
}

@media (prefers-reduced-motion: reduce) {
  .vn-audio-pulse,
  .vn-audio-bar,
  .vn-audio-ring,
  .vn-audio-scan {
    animation: none !important;
  }
}
`;
  document.head.appendChild(style);
}

/* -------------------------------------------------------------------------- */
/*                              Sub-pieces                                     */
/* -------------------------------------------------------------------------- */

function PlayIcon({ playing, size }: { playing: boolean; size: AudioSize }) {
  const cls = size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";
  return playing ? (
    <Pause className={cls} />
  ) : (
    <Play className={cn(cls, "translate-x-px")} />
  );
}

function PlayingIndicator({
  playing,
  animation,
}: {
  playing: boolean;
  animation: AudioAnimation;
}) {
  if (!playing) return null;

  if (animation === "bars") {
    return (
      <span aria-hidden className="inline-flex items-end gap-0.5 h-3">
        <span
          className="vn-audio-bar block w-0.75 origin-bottom rounded-sm bg-current h-full"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="vn-audio-bar block w-0.75 origin-bottom rounded-sm bg-current h-full"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="vn-audio-bar block w-0.75 origin-bottom rounded-sm bg-current h-full"
          style={{ animationDelay: "300ms" }}
        />
      </span>
    );
  }

  if (animation === "ring") {
    return (
      <span
        aria-hidden
        className="relative inline-flex size-3 items-center justify-center"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "vn-audio-ring absolute left-1/2 top-0 -ml-px h-[45%] w-0.5 origin-[50%_111%] rounded-full bg-current",
              [
                "rotate-0",
                "rotate-45",
                "rotate-90",
                "rotate-135deg",
                "rotate-180",
                "rotate-225deg",
                "rotate-270deg",
                "rotate-315deg",
              ][i],
            )}
            style={{ animationDelay: `${i * -70}ms` }}
          />
        ))}
      </span>
    );
  }

  // default / pulse / scanline → 1 pulse dot
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 rounded-full bg-current",
        animation === "pulse" && "vn-audio-pulse",
      )}
    />
  );
}

function ProgressBar({
  value,
  buffered,
  tone,
  onSeek,
}: {
  value: number;
  buffered: number;
  tone: AudioTone;
  onSeek?: (pct: number) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [drag, setDrag] = React.useState(false);

  const pct = Math.max(0, Math.min(100, value));
  const bufferedPct = Math.max(pct, Math.min(100, buffered));

  function apply(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p =
      rect.width === 0
        ? 0
        : Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onSeek?.(p * 100);
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      tabIndex={0}
      data-dragging={drag || undefined}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDrag(true);
        apply(e.clientX);
      }}
      onPointerMove={(e) => drag && apply(e.clientX)}
      onPointerUp={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId))
          e.currentTarget.releasePointerCapture(e.pointerId);
        setDrag(false);
      }}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onSeek?.(Math.min(100, pct + step));
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onSeek?.(Math.max(0, pct - step));
        }
      }}
      className={cn(
        "group relative h-1.5 min-w-20 w-full cursor-pointer touch-none rounded-full bg-foreground/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {/* Buffered */}
      <span
        className="absolute inset-y-0 left-0 rounded-full bg-foreground/20"
        style={{ width: `${bufferedPct}%` }}
      />
      {/* Played */}
      <span
        className={cn(
          "absolute inset-y-0 left-0 rounded-full",
          toneFillClass[tone],
        )}
        style={{ width: `${pct}%` }}
      />
      {/* Thumb */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground shadow-sm transition-opacity",
          drag
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

function VolumeControl({
  value,
  onChange,
  muted,
  onMutedChange,
}: {
  value: number;
  onChange: (v: number) => void;
  muted: boolean;
  onMutedChange: (m: boolean) => void;
}) {
  const Icon = muted || value === 0 ? VolumeX : value < 50 ? Volume1 : Volume2;
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={() => onMutedChange(!muted)}
        className="inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
      >
        <Icon className="size-4" />
      </button>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={muted ? 0 : value}
        aria-label="Volume"
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.25 w-20 cursor-pointer appearance-none bg-foreground/10 accent-foreground rounded-full"
      />
    </div>
  );
}

function Waveform({
  data,
  progress,
  tone,
  onSeek,
}: {
  data: number[];
  progress: number;
  tone: AudioTone;
  onSeek?: (pct: number) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [drag, setDrag] = React.useState(false);

  function apply(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p =
      rect.width === 0
        ? 0
        : Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onSeek?.(p * 100);
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      tabIndex={0}
      data-dragging={drag || undefined}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDrag(true);
        apply(e.clientX);
      }}
      onPointerMove={(e) => drag && apply(e.clientX)}
      onPointerUp={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId))
          e.currentTarget.releasePointerCapture(e.pointerId);
        setDrag(false);
      }}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onSeek?.(Math.min(100, progress + step));
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onSeek?.(Math.max(0, progress - step));
        }
      }}
      className="flex h-12 w-full cursor-pointer touch-none items-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {data.map((v, i) => {
        const played = (i / data.length) * 100 <= progress;
        const height = Math.max(10, Math.round(v * 100));
        return (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-full",
              played ? toneFillClass[tone] : "bg-foreground/25",
            )}
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Root                                           */
/* -------------------------------------------------------------------------- */

export interface AudioProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onError">,
    Omit<VariantProps<typeof rootVariants>, "variant" | "size" | "tone"> {
  src: string;
  title?: string;
  artist?: string;
  artwork?: string;
  duration?: number;
  variant?: AudioVariant;
  size?: AudioSize;
  tone?: AudioTone;
  animation?: AudioAnimation;
  showVolume?: boolean;
  showTime?: boolean;
  showDownload?: boolean;
  onDownload?: () => void;
  onEnded?: () => void;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export const Audio = React.forwardRef<HTMLDivElement, AudioProps>(
  (
    {
      src,
      title,
      artist,
      artwork,
      duration,
      variant = "default",
      size = "default",
      tone = "neutral",
      animation = "bars",
      showVolume = true,
      showTime = true,
      showDownload = false,
      onDownload,
      onEnded,
      autoPlay = false,
      loop = false,
      className,
      ...props
    },
    ref,
  ) => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = React.useState(false);
    const [current, setCurrent] = React.useState(0);
    const [total, setTotal] = React.useState(duration ?? 0);
    const [buffered, setBuffered] = React.useState(0);
    const [volume, setVolume] = React.useState(100);
    const [muted, setMuted] = React.useState(false);

    React.useEffect(() => {
      ensureAudioStyles();
    }, []);

    React.useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      const onTime = () => setCurrent(el.currentTime);
      const onMeta = () =>
        setTotal(Number.isFinite(el.duration) ? el.duration : (duration ?? 0));
      const onProgress = () => {
        try {
          if (el.buffered.length > 0)
            setBuffered(
              (el.buffered.end(el.buffered.length - 1) / (el.duration || 1)) *
                100,
            );
        } catch {}
      };
      const onEnd = () => {
        setPlaying(false);
        onEnded?.();
      };
      el.addEventListener("timeupdate", onTime);
      el.addEventListener("loadedmetadata", onMeta);
      el.addEventListener("progress", onProgress);
      el.addEventListener("ended", onEnd);
      return () => {
        el.removeEventListener("timeupdate", onTime);
        el.removeEventListener("loadedmetadata", onMeta);
        el.removeEventListener("progress", onProgress);
        el.removeEventListener("ended", onEnd);
      };
    }, [duration, onEnded]);

    React.useEffect(() => {
      const el = audioRef.current;
      if (!el) return;
      el.volume = muted ? 0 : volume / 100;
    }, [volume, muted]);

    const togglePlay = React.useCallback(() => {
      const el = audioRef.current;
      if (!el) return;
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        el.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
    }, [playing]);

    const seekPct = (pct: number) => {
      const el = audioRef.current;
      if (!el || !total) return;
      el.currentTime = (pct / 100) * total;
      setCurrent(el.currentTime);
    };

    const skip = (delta: number) => {
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = Math.max(0, Math.min(total, el.currentTime + delta));
    };

    const progress = total > 0 ? (current / total) * 100 : 0;
    const waveform = React.useMemo(
      () => generateWaveform(Math.round((total || 30) * 100), 72),
      [total],
    );

    /* ---------------- minimal ---------------- */
    if (variant === "minimal") {
      return (
        <div
          ref={ref}
          data-slot="audio"
          data-variant="minimal"
          className={cn(rootVariants({ variant, size, tone }), className)}
          {...props}
        >
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            preload="metadata"
          />
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className={cn(playButtonVariants({ size }))}
          >
            <PlayIcon playing={playing} size={size} />
          </button>
          <div className="min-w-0 flex-1">
            <ProgressBar
              value={progress}
              buffered={buffered}
              tone={tone}
              onSeek={seekPct}
            />
          </div>
          {showTime ? (
            <span className="shrink-0 tabular-nums text-muted-foreground text-xs">
              {formatTime(current)} / {formatTime(total)}
            </span>
          ) : null}
        </div>
      );
    }

    /* ---------------- compact ---------------- */
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          data-slot="audio"
          data-variant="compact"
          className={cn(rootVariants({ variant, size, tone }), className)}
          {...props}
        >
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            preload="metadata"
          />
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className={cn(playButtonVariants({ size: "sm" }))}
          >
            <PlayIcon playing={playing} size="sm" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <p className="truncate text-sm font-medium">{title ?? "Audio"}</p>
              {artist ? (
                <p className="truncate text-xs text-muted-foreground">
                  {artist}
                </p>
              ) : null}
            </div>
            <div className="mt-1.5"></div>
            <ProgressBar
              value={progress}
              buffered={buffered}
              tone={tone}
              onSeek={seekPct}
            />
          </div>
          <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
            {formatTime(current)}
          </span>
          <PlayingIndicator playing={playing} animation={animation} />
        </div>
      );
    }

    /* ---------------- waveform ---------------- */
    if (variant === "waveform") {
      return (
        <div
          ref={ref}
          data-slot="audio"
          data-variant="waveform"
          className={cn(rootVariants({ variant, size, tone }), className)}
          {...props}
        >
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            preload="metadata"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className={cn(playButtonVariants({ size }))}
            >
              <PlayIcon playing={playing} size={size} />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{title ?? "Audio"}</p>
              {artist ? (
                <p className="truncate text-xs text-muted-foreground">
                  {artist}
                </p>
              ) : null}
            </div>
            {showTime ? (
              <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
                {formatTime(current)} / {formatTime(total)}
              </span>
            ) : null}
          </div>
          <Waveform
            data={waveform}
            progress={progress}
            tone={tone}
            onSeek={seekPct}
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Rewind 10 seconds"
              onClick={() => skip(-10)}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Forward 10 seconds"
              onClick={() => skip(10)}
              className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <RotateCw className="size-3.5" />
            </button>
            {showVolume ? (
              <div className="ml-auto">
                <VolumeControl
                  value={volume}
                  onChange={setVolume}
                  muted={muted}
                  onMutedChange={setMuted}
                />
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    /* ---------------- podcast / default ---------------- */
    return (
      <div
        ref={ref}
        data-slot="audio"
        data-variant={variant}
        className={cn(rootVariants({ variant, size, tone }), className)}
        {...props}
      >
        <div className="relative flex items-start gap-3 justify-between w-full">
          <audio
            ref={audioRef}
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            preload="metadata"
          />

          {/* Header: artwork + meta + optional header actions */}
          <div className="flex items-start gap-3">
            {artwork ? (
              <Image
                alt="Image"
                src={artwork}
                width={2000}
                height={2000}
                priority
                unoptimized
                className={`${variant === "podcast" ? "size-20 rounded-lg" : "size-16 rounded-md"} shrink-0 object-cover border overflow-hidden`}
              />
            ) : (
              <span
                aria-hidden
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground",
                  "[&_svg]:size-5",
                )}
              >
                <Play />
              </span>
            )}
            <div className="space-y-1">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {title ?? "Audio"}
                </p>
                {artist ? (
                  <p className="truncate text-[0.7rem] text-muted-foreground">
                    {artist}
                  </p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {showDownload ? (
                  <button
                    type="button"
                    aria-label="Download"
                    onClick={onDownload}
                    className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Download className="size-3.5" />
                  </button>
                ) : null}
                <button
                  type="button"
                  aria-label="More options"
                  className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <MoreHorizontal className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Rewind 10 seconds"
                onClick={() => skip(-10)}
                className="size-4 opacity-50 hover:opacity-50 transition-all duration-500"
              >
                <RotateCcw className="w-full h-full" />
              </button>

              <Button
                size="icon"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className={cn(playButtonVariants({ size }))}
              >
                <PlayIcon playing={playing} size={size} />
              </Button>
              <button
                type="button"
                onClick={() => skip(10)}
                aria-label="Forward 10 seconds"
                className="size-4 opacity-50 hover:opacity-50 transition-all duration-500"
              >
                <RotateCw className="w-full h-full" />
              </button>
            </div>
            {showVolume ? (
              <VolumeControl
                value={volume}
                onChange={setVolume}
                muted={muted}
                onMutedChange={setMuted}
              />
            ) : null}
          </div>
        </div>

        {/* Play Bar + Volumn */}
        <div className="flex items-end gap-3 w-full">
          <div className="w-full">
            {showTime ? (
              <div className="mb-1 flex justify-between text-[0.7rem] tabular-nums text-muted-foreground">
                <span>{formatTime(current)}</span>
                <span>{formatTime(total)}</span>
              </div>
            ) : null}
            <ProgressBar
              value={progress}
              buffered={buffered}
              tone={tone}
              onSeek={seekPct}
            />
          </div>

          <PlayingIndicator playing={playing} animation={animation} />
        </div>
      </div>
    );
  },
);
Audio.displayName = "Audio";

/* -------------------------------------------------------------------------- */
/*                                  Exports                                    */
/* -------------------------------------------------------------------------- */

export {
  rootVariants as audioRootVariants,
  playButtonVariants as audioPlayButtonVariants,
  formatTime as formatAudioTime,
};
