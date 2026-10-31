"use client";
import * as React from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "./index";

export default function VideoAspectRatioDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:p-10 w-full">
      {/* Actual video */}
      <AspectRatio variant="video" className="border">
        <video
          className="absolute inset-0 size-full object-cover cursor-pointer"
          src="/video.mp4"
          controls
          preload="metadata"
          playsInline
          aria-label="Featured video"
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={(event) => {
              const video = event.currentTarget
                .previousElementSibling as HTMLVideoElement | null;

              if (!video) return;

              void video.play();
              setIsPlaying(true);
            }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/20"
            aria-label="Play video"
          >
            <span className="flex size-14 items-center justify-center bg-white border-[0.8px] border-black/80 ring-2 ring-white shadow-xl/10 text-black shadow-md rounded-full transition-all duration-500">
              <Play className="size-5 translate-x-px" />
            </span>
          </button>
        )}
      </AspectRatio>

      {/* Video placeholder */}
      <AspectRatio
        variant="video"
        className="bg-foreground/5 backdrop-blur-md border"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-muted-foreground">
          <p className="text-sm font-medium text-foreground">
            Video preview unavailable
          </p>
          <p className="text-xs">Upload a video to preview it here.</p>
          <p className="text-[10px] opacity-70">
            Recommended format: MP4 · 1280 * 720
          </p>
        </div>
      </AspectRatio>
    </div>
  );
}
