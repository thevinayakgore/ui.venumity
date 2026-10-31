"use client";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { VIDEOS } from "@/registry/site/videos";
import useEmblaCarousel from "embla-carousel-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

const EMBLA_OPTIONS = {
  loop: true,
  align: "center",
  skipSnaps: false,
} as const;

// ─── Video card ───────────────────────────────────────────────────
const VideoCard = memo(function VideoCard({
  video,
  active,
}: {
  video: (typeof VIDEOS)[0];
  active: boolean;
}) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0&controls=1&showinfo=0&color=white`;

  return (
    <div
      className={cn(
        "h-full transform-gpu transition-all duration-1000 ease-out",
        active ? "scale-100 sm:scale-110 opacity-100" : "scale-90 opacity-50",
      )}
    >
      <div className="group border-border from-secondary/20 to-card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-video p-0.5 md:p-1.5 bg-linear-to-tl from-rose-500 via-transparent to-rose-500 rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden w-full h-full">
          <iframe
            src={embedUrl}
            allowFullScreen
            title={video.title}
            className="rounded-2xl md:rounded-3xl overflow-hidden w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center pt-3 sm:pt-5 md:pt-10 m-auto max-w-lg">
          <h3 className="line-clamp-1 text-base md:text-xl font-medium">
            {video.title}
          </h3>
          <p className="line-clamp-2 text-xs md:text-sm text-muted-foreground">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
});

// ─── Dot button ────────────────────────────────────────────────────────
const DotButton = memo(function DotButton({
  index,
  selected,
  onSelect,
}: {
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`Go to video ${index + 1}`}
      className={cn(
        "h-3 sm:h-5 rounded-full transition-all duration-300 ease-out",
        selected
          ? "bg-rose-500 border-rose-300 shadow-lg shadow-rose-500/30 w-10 sm:w-20 md:w-30"
          : "bg-foreground/15 w-5 sm:w-10",
      )}
    />
  );
});

// ─── Carousel with fixed dot count ───────────────────────────────────────────
const VideoCarousel = memo(function VideoCarousel() {
  const autoplayRef = useRef<ReturnType<typeof Autoplay> | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = VIDEOS.length;

  useEffect(() => {
    if (!autoplayRef.current) {
      autoplayRef.current = Autoplay({
        delay: 6000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      });
    }
  }, [emblaApi]);

  // Update selected index on scroll
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const resetAutoplay = useCallback(() => {
    autoplayRef.current?.reset();
  }, []);

  const handleDotClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      resetAutoplay();
    },
    [emblaApi, resetAutoplay],
  );

  return (
    <div className="mt-8 sm:mt-10 md:mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 sm:gap-5 md:gap-10 touch-pan-y p-3 sm:p-5 md:p-10 lg:p-15">
          {VIDEOS.map((item, index) => (
            <div
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-[88%] sm:basis-[52%] lg:basis-[65%]"
            >
              <VideoCard video={item} active={index === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls – now using totalSlides to generate dots */}
      <div className="flex items-center justify-center m-auto gap-2 sm:gap-3 mt-3">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <DotButton
            key={idx}
            index={idx}
            selected={idx === selectedIndex}
            onSelect={handleDotClick}
          />
        ))}
      </div>
    </div>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
function YouTubeCarousel() {
  return (
    <section
      id="youtube-carousel"
      className="relative py-5 md:py-10 lg:py-20 max-w-400 m-auto w-full"
    >
      <header className="flex flex-col items-center justify-center m-auto gap-1 md:gap-5 w-fit">
        <p className="tracking-tight text-center text-3xl md:text-4xl lg:text-5xl">
          Blocks in
        </p>
        <p className="cinzel tracking-wide text-5xl md:text-7xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-linear-to-br from-foreground/5 via-foreground/90 to-foreground/5 pb-2 w-fit">
          Action
        </p>
        <p className="text-center text-sm md:text-base lg:text-lg text-muted-foreground px-2 sm:px-0 m-auto max-w-3xl">
          Discover how premium interfaces are beautifully designed, animated and
          refined step by step from the first sketch to the final pixel. And do
          subscribe to the YouTube channel.
        </p>
        <div className="group relative flex items-center justify-center mt-5 md:mt-10">
          {/* Top drawer */}
          <div className="pointer-events-none absolute left-0 top-0 flex min-h-10 items-start justify-center rounded-t-xl bg-indigo-500 text-white px-3 py-1 text-[0.8em] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-7 group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:animate-hue group-active:translate-y-0 group-active:scale-50">
            ⚡️ Building...
          </div>

          {/* Bottom drawer */}
          <div className="pointer-events-none absolute bottom-0 right-0 flex min-h-10 items-end justify-center rounded-b-xl bg-yellow-500 text-white px-3 py-1 text-[0.8em] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:translate-y-7 group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:animate-hue group-active:translate-y-0 group-active:scale-50">
            ☘️ Deploying...
          </div>

          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe to thevinayakgore on YouTube"
            href="https://www.youtube.com/@thevinayakgore?sub_confirmation=1"
            className="relative px-8 py-3.5 rounded-xl bg-rose-500 text-white border border-foreground/15 shadow-lg/20 group-hover:shadow-none inset-shadow-sm inset-shadow-rose-300 transition-all duration-300 ease-[cubic-bezier(0,0,0,2.5)] group-hover:scale-105 group-active:scale-95"
          >
            <span className="inline-block bg-white bg-clip-text text-xl font-medium text-transparent drop-shadow-[0_1px_0_#ffffff66] transition-all duration-300 ease-[cubic-bezier(0,0,0,2.5)] [-webkit-text-fill-color:transparent] group-hover:scale-105 group-hover:drop-shadow-[0_1px_0_#ffffff66,0_-1px_0_#00000099,0_6px_2px_#0000004d] group-active:scale-100 group-active:drop-shadow-[0_1px_0_#ffffff66,0_-1px_0_#00000099,0_6px_2px_#00000066]">
              Subscribe Now
            </span>
          </a>
        </div>
      </header>
      <VideoCarousel />
    </section>
  );
}

export default memo(YouTubeCarousel);
