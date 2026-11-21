"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Play,
  Pause,
  Volume1,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  PictureInPicture2,
  Settings,
  Loader2,
  ChevronsLeft,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

export type VideoVariant =
  | "default"
  | "minimal"
  | "compact"
  | "theater"
  | "hero";

export type VideoTone = "neutral" | "brand" | "success" | "warning" | "danger";

/* -------------------------------------------------------------------------- */
/*                              Extended cva                                  */
/* -------------------------------------------------------------------------- */

const rootVariants = cva(
  "relative ring ring-border w-full overflow-hidden bg-black text-white isolate",
  {
    variants: {
      variant: {
        default: "rounded-xl",
        minimal: "rounded-xl",
        compact: "rounded-lg",
        theater: "rounded-lg",
        hero: "rounded-none",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const controlBarVariants = cva(
  "absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 pb-2.5 pt-6",
  {
    variants: {
      variant: {
        default:
          "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
        minimal: "opacity-100",
        compact: "opacity-0 transition-opacity group-hover:opacity-100",
        theater:
          "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
        hero: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const bigPlayVariants = cva(
  cn(
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
    "grid place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm",
    "border border-white/20 transition-colors hover:bg-white/25",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
  ),
  {
    variants: {
      size: {
        sm: "size-12 [&_svg]:size-5",
        default: "size-16 [&_svg]:size-6",
        lg: "size-20 [&_svg]:size-8",
      },
    },
    defaultVariants: { size: "default" },
  },
);

const toneFillClass: Record<VideoTone, string> = {
  neutral: "bg-white",
  brand: "bg-white",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

/* -------------------------------------------------------------------------- */
/*                              Helpers                                       */
/* -------------------------------------------------------------------------- */

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function parseAspectRatio(
  aspectRatio: VideoProps["aspectRatio"],
): string | undefined {
  if (!aspectRatio) return undefined;

  if (aspectRatio === "video") return "16 / 9";
  if (aspectRatio === "square") return "1 / 1";
  if (aspectRatio === "wide") return "21 / 9";
  if (aspectRatio === "vertical") return "9 / 16";

  // Support "16/9", "4/3", "9/16", etc.
  if (aspectRatio.includes("/")) {
    const [w, h] = aspectRatio.split("/").map((v) => parseFloat(v.trim()));
    if (Number.isFinite(w) && Number.isFinite(h) && h !== 0) {
      return `${w} / ${h}`;
    }
  }

  // Support plain numbers like "1.78"
  const num = parseFloat(aspectRatio);
  if (Number.isFinite(num) && num > 0) {
    return String(num);
  }

  return undefined;
}

/* -------------------------------------------------------------------------- */
/*                              Sub-pieces                                    */
/* -------------------------------------------------------------------------- */

function LoadingIndicator() {
  return <Loader2 className="size-9 animate-spin text-white" strokeWidth={2} />;
}

function ProgressBar({
  value,
  buffered,
  tone,
  onSeek,
}: {
  value: number;
  buffered: number;
  tone: VideoTone;
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
        "group/seek relative h-1 w-full cursor-pointer touch-none rounded-full bg-white/25",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
      )}
    >
      <span
        className="absolute inset-y-0 left-0 rounded-full bg-white/40"
        style={{ width: `${bufferedPct}%` }}
      />
      <span
        className={cn(
          "absolute inset-y-0 left-0 rounded-full",
          toneFillClass[tone],
        )}
        style={{ width: `${pct}%` }}
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-opacity",
          drag
            ? "opacity-100"
            : "opacity-0 group-hover/seek:opacity-100 group-focus-visible/seek:opacity-100",
        )}
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Root                                          */
/* -------------------------------------------------------------------------- */

export interface VideoProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onError" | "children">,
    Omit<VariantProps<typeof rootVariants>, "variant"> {
  src: string;
  poster?: string;
  title?: string;
  aspectRatio?: "video" | "square" | "wide" | "vertical" | string;
  variant?: VideoVariant;
  tone?: VideoTone;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  showSettings?: boolean;
  showPip?: boolean;
  children?: React.ReactNode;
}

export const Video = React.forwardRef<HTMLDivElement, VideoProps>(
  (
    {
      src,
      poster,
      title,
      aspectRatio = "video",
      variant = "default",
      tone = "neutral",
      autoPlay = false,
      loop = false,
      muted: mutedProp = false,
      playsInline = true,
      showSettings = true,
      showPip = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    const [playing, setPlaying] = React.useState(false);
    const [current, setCurrent] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [muted, setMuted] = React.useState(mutedProp);
    const [waiting, setWaiting] = React.useState(false);
    const [fullscreen, setFullscreen] = React.useState(false);
    type SettingsView = "main" | "speed" | "quality";

    const [settingsView, setSettingsView] =
      React.useState<SettingsView>("main");

    const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

    const QUALITIES = ["Auto", "1080p", "720p", "480p", "360p"] as const;

    type Quality = (typeof QUALITIES)[number];

    // Inside the Video component, add:
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [playbackRate, setPlaybackRate] = React.useState<number>(1);
    const [quality, setQuality] = React.useState<Quality>("Auto");

    const settingsRef = React.useRef<HTMLDivElement | null>(null);

    /* Close on outside click */
    React.useEffect(() => {
      if (!settingsOpen) return;

      function handleClick(e: MouseEvent) {
        if (
          settingsRef.current &&
          !settingsRef.current.contains(e.target as Node)
        ) {
          setSettingsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [settingsOpen]);

    /* Sync playback rate to the video element */
    React.useEffect(() => {
      const el = videoRef.current;
      if (!el) return;
      el.playbackRate = playbackRate;
    }, [playbackRate]);

    /* wire video events */
    React.useEffect(() => {
      const el = videoRef.current;
      if (!el) return;

      const onTime = () => setCurrent(el.currentTime);
      const onMeta = () => setTotal(el.duration);
      const onProgress = () => {
        try {
          if (el.buffered.length > 0) {
            setBuffered(
              (el.buffered.end(el.buffered.length - 1) / el.duration) * 100,
            );
          }
        } catch {}
      };
      const onPlay = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      const onWaiting = () => setWaiting(true);
      const onPlaying = () => setWaiting(false);
      const onEnded = () => setPlaying(false);

      el.addEventListener("timeupdate", onTime);
      el.addEventListener("loadedmetadata", onMeta);
      el.addEventListener("progress", onProgress);
      el.addEventListener("play", onPlay);
      el.addEventListener("pause", onPause);
      el.addEventListener("waiting", onWaiting);
      el.addEventListener("playing", onPlaying);
      el.addEventListener("ended", onEnded);

      return () => {
        el.removeEventListener("timeupdate", onTime);
        el.removeEventListener("loadedmetadata", onMeta);
        el.removeEventListener("progress", onProgress);
        el.removeEventListener("play", onPlay);
        el.removeEventListener("pause", onPause);
        el.removeEventListener("waiting", onWaiting);
        el.removeEventListener("playing", onPlaying);
        el.removeEventListener("ended", onEnded);
      };
    }, []);

    /* volume / muted sync */
    React.useEffect(() => {
      const el = videoRef.current;
      if (!el) return;
      el.volume = volume;
      el.muted = muted;
    }, [volume, muted]);

    /* fullscreen listener */
    React.useEffect(() => {
      const onFsChange = () =>
        setFullscreen(Boolean(document.fullscreenElement));
      document.addEventListener("fullscreenchange", onFsChange);
      return () => document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    const togglePlay = React.useCallback(() => {
      const el = videoRef.current;
      if (!el) return;
      if (el.paused) el.play().catch(() => {});
      else el.pause();
    }, []);

    const seekPct = (pct: number) => {
      const el = videoRef.current;
      if (!el || !total) return;
      el.currentTime = (pct / 100) * total;
      setCurrent(el.currentTime);
    };

    const skip = (delta: number) => {
      const el = videoRef.current;
      if (!el) return;
      el.currentTime = Math.max(
        0,
        Math.min(total || el.duration, el.currentTime + delta),
      );
    };

    const toggleFullscreen = async () => {
      const el = containerRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        await document.exitFullscreen().catch(() => {});
      } else {
        await el.requestFullscreen().catch(() => {});
      }
    };

    const togglePip = async () => {
      const el = videoRef.current;
      if (!el) return;
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          await el.requestPictureInPicture();
        }
      } catch {}
    };

    const progress = total > 0 ? (current / total) * 100 : 0;

    const resolvedAspectRatio = parseAspectRatio(aspectRatio);

    const showBigPlay = !playing && variant !== "minimal";

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        data-slot="video"
        data-variant={variant}
        data-state={playing ? "playing" : "paused"}
        className={cn("group", rootVariants({ variant }), className)}
        style={{
          aspectRatio: resolvedAspectRatio,
          ...props.style,
        }}
        {...props}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          playsInline={playsInline}
          onClick={togglePlay}
          className="absolute inset-0 size-full object-cover"
          preload="metadata"
        />

        {/* Loading indicator */}
        {waiting && !playing === false ? (
          <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
            <LoadingIndicator />
          </div>
        ) : null}

        {/* Big play button */}
        {showBigPlay ? (
          <button
            type="button"
            aria-label="Play"
            onClick={togglePlay}
            className={cn(bigPlayVariants({ size: "default" }))}
          >
            <Play className="translate-x-px" />
          </button>
        ) : null}

        {/* Control bar */}
        {variant !== "minimal" ? (
          <div className={cn(controlBarVariants({ variant }))}>
            <ProgressBar
              value={progress}
              buffered={buffered}
              tone={tone}
              onSeek={seekPct}
            />

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
                className="grid size-8 place-items-center rounded-md text-white hover:bg-white/15"
              >
                {playing ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4 translate-x-px" />
                )}
              </button>

              <button
                type="button"
                aria-label="Rewind 10 seconds"
                onClick={() => skip(-10)}
                className="grid size-8 place-items-center rounded-md text-white hover:bg-white/15"
              >
                <RotateCcw className="size-3.5" />
              </button>

              <button
                type="button"
                aria-label="Forward 10 seconds"
                onClick={() => skip(10)}
                className="grid size-8 place-items-center rounded-md text-white hover:bg-white/15"
              >
                <RotateCw className="size-3.5" />
              </button>

              <div className="hidden items-center gap-1.5 sm:flex">
                <button
                  type="button"
                  aria-label={muted ? "Unmute" : "Mute"}
                  onClick={() => setMuted((m) => !m)}
                  className="grid size-8 place-items-center rounded-md text-white hover:bg-white/15"
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="size-3.5" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="size-3.5" />
                  ) : (
                    <Volume2 className="size-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  aria-label="Volume"
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setMuted(false);
                  }}
                  className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/25 accent-white"
                />
              </div>

              <span className="ml-1 tabular-nums text-white/90">
                {formatTime(current)} / {formatTime(total)}
              </span>

              <div className="ml-auto flex items-center gap-1">
                {showPip &&
                typeof document !== "undefined" &&
                document.pictureInPictureEnabled ? (
                  <button
                    type="button"
                    aria-label="Picture in picture"
                    onClick={togglePip}
                    className="grid size-8 place-items-center rounded-md text-white hover:bg-white/15"
                  >
                    <PictureInPicture2 className="size-4" />
                  </button>
                ) : null}

                {showSettings ? (
                  <div ref={settingsRef} className="relative">
                    <button
                      type="button"
                      aria-label="Settings"
                      aria-expanded={settingsOpen}
                      onClick={() => {
                        setSettingsOpen((v) => !v);
                        setSettingsView("main");
                      }}
                      className={cn(
                        "grid size-8 place-items-center rounded-md text-white hover:bg-white/15",
                        settingsOpen && "bg-white/15",
                      )}
                    >
                      <Settings className="size-4" />
                    </button>

                    {settingsOpen ? (
                      <div
                        className={cn(
                          "absolute bottom-full right-0 z-30 mb-2 w-44",
                          "rounded-lg border border-white/10 bg-black/90 p-1 shadow-xl backdrop-blur",
                          "text-white",
                        )}
                      >
                        {settingsView === "main" ? (
                          <>
                            {/* Speed */}
                            <button
                              type="button"
                              onClick={() => setSettingsView("speed")}
                              className={cn(
                                "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs",
                                "hover:bg-white/10",
                              )}
                            >
                              <span>Speed</span>
                              <span className="text-white/60">
                                {playbackRate === 1
                                  ? "Normal"
                                  : `${playbackRate}x`}
                              </span>
                            </button>

                            {/* Quality */}
                            <button
                              type="button"
                              onClick={() => setSettingsView("quality")}
                              className={cn(
                                "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs",
                                "hover:bg-white/10",
                              )}
                            >
                              <span>Quality</span>
                              <span className="text-white/60">{quality}</span>
                            </button>
                          </>
                        ) : null}

                        {settingsView === "speed" ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setSettingsView("main")}
                              className={cn(
                                "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs",
                                "hover:bg-white/10",
                              )}
                            >
                              <ChevronsLeft className="size-4.5 leading-none" />
                              <span>Speed</span>
                            </button>

                            <div className="flex flex-col">
                              {PLAYBACK_RATES.map((rate) => (
                                <button
                                  key={rate}
                                  type="button"
                                  onClick={() => {
                                    setPlaybackRate(rate);
                                    setSettingsOpen(false);
                                    setSettingsView("main");
                                  }}
                                  className={cn(
                                    "flex items-center justify-between rounded-md px-2 py-1.5 text-left text-xs",
                                    "hover:bg-white/10",
                                    playbackRate === rate &&
                                      "bg-white/15 font-medium",
                                  )}
                                >
                                  <span>
                                    {rate === 1 ? "Normal" : `${rate}x`}
                                  </span>
                                  {playbackRate === rate ? (
                                    <span className="text-[10px] text-white/70">
                                      ✓
                                    </span>
                                  ) : null}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : null}

                        {settingsView === "quality" ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setSettingsView("main")}
                              className={cn(
                                "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs",
                                "hover:bg-white/10",
                              )}
                            >
                              <ChevronsLeft className="size-4.5 leading-none" />
                              <span>Quality</span>
                            </button>

                            <div className="flex flex-col">
                              {QUALITIES.map((q) => (
                                <button
                                  key={q}
                                  type="button"
                                  onClick={() => {
                                    setQuality(q);
                                    setSettingsOpen(false);
                                    setSettingsView("main");
                                  }}
                                  className={cn(
                                    "flex items-center justify-between rounded-md px-2 py-1.5 text-left text-xs",
                                    "hover:bg-white/10",
                                    quality === q && "bg-white/15 font-medium",
                                  )}
                                >
                                  <span>{q}</span>
                                  {quality === q ? (
                                    <span className="text-[10px] text-white/70">
                                      ✓
                                    </span>
                                  ) : null}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <button
                  type="button"
                  aria-label={
                    fullscreen ? "Exit fullscreen" : "Enter fullscreen"
                  }
                  onClick={toggleFullscreen}
                  className="grid size-8 place-items-center rounded-md text-white hover:bg-white/15"
                >
                  {fullscreen ? (
                    <Minimize className="size-4" />
                  ) : (
                    <Maximize className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* Minimal controls */}
        {variant === "minimal" ? (
          <div className="absolute inset-x-0 bottom-0 z-20 px-3 pb-2.5">
            <ProgressBar
              value={progress}
              buffered={buffered}
              tone={tone}
              onSeek={seekPct}
            />
          </div>
        ) : null}

        {/* Title */}
        {title ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-linear-to-b from-black/70 to-transparent px-3 py-2.5 text-sm font-medium text-white">
            {title}
          </div>
        ) : null}

        {children}
      </div>
    );
  },
);
Video.displayName = "Video";

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  rootVariants as videoRootVariants,
  controlBarVariants as videoControlBarVariants,
  formatTime as formatVideoTime,
};
