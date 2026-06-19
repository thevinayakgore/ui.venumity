"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Link from "next/link";

const videos = [
  {
    id: "5eYQwEv5fpk",
    title:
      "🔥 Build this Footer for Next.js project using Tailwind CSS ⚡️ | #webdesign #coding #footer",
    description:
      "Let’s build a stunning, ready-to-use Footer for your React / Next.js 16 projects with clean, responsive, and developer-friendly code !",
    channel: "The Vinayak Gore",
    channelAvatar: "/vinu.jpg",
    date: "2025-01-15",
  },
  {
    id: "nz_4wrytljc",
    title:
      "🔥 Developer Portfolio - Ready to use for your Project ! | Next.Js 15 | #readytouse #ui #gumroad",
    description:
      "Modern Developer Portfolio - Next.Js Template | Framer Motion | Dark mode | Typescript. Grab it now on my Gumroad !",
    channel: "The Vinayak Gore",
    channelAvatar: "/vinu.jpg",
    date: "2025-02-01",
  },
  {
    id: "Irbh9fLByIE",
    title: "3D Card Effects",
    description:
      "Parallax and 3D tilt cards using CSS transforms and Framer Motion.",
    channel: "The Vinayak Gore",
    channelAvatar: "/vinu.jpg",
    date: "2025-02-20",
  },
  {
    id: "QfsW8EHxX-Q",
    title: "Magnetic Menu",
    description:
      "Interactive navbar with magnetic hover effect and smooth transitions.",
    channel: "The Vinayak Gore",
    channelAvatar: "/vinu.jpg",
    date: "2025-03-05",
  },
];

const MOTION_HIDDEN = { opacity: 0, y: 50 } as const;
const MOTION_VISIBLE = { opacity: 1, y: 0 } as const;
const HEADER_TRANSITION = { duration: 0.5, delay: 0 } as const;
const INVIEW_OPTS = { once: true, amount: 0.2 } as const;
const EMBLA_OPTIONS = {
  loop: true,
  align: "center",
  skipSnaps: false,
} as const;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

// ─── Video card (unchanged) ───────────────────────────────────────────────────
const VideoCard = memo(function VideoCard({
  video,
  active,
}: {
  video: (typeof videos)[0];
  active: boolean;
}) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0&controls=1&showinfo=0&color=white`;

  return (
    <div
      className={cn(
        "h-full transform-gpu transition-all duration-1000 ease-out",
        active ? "scale-110 opacity-100" : "scale-90 opacity-50",
      )}
    >
      <div className="group border-border from-secondary/20 to-card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-video w-full">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 rounded-2xl h-full w-full"
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center pt-5 md:pt-10">
          <h3 className="text-foreground line-clamp-1 text-2xl mb-2 font-semibold">
            {video.title}
          </h3>
          <p className="text-foreground/40 line-clamp-3 text-lg leading-relaxed">
            {video.description}
          </p>
          <Link
            href="https://youtube.com/@thevinayakgore?si=tPxmkjdEqZx37xtP"
            target="_blank"
            className="mt-auto flex items-center text-start gap-3 p-5 md:pt-10"
          >
            <Image
              src="/vinu.jpg"
              alt="The Vinayak Gore"
              width={500}
              height={500}
              draggable={false}
              unoptimized
              className="size-13 border-2 border-white shadow-lg shadow-zinc-300/50 rounded-full object-cover select-none"
            />
            <div className="flex min-w-0 flex-col font-semibold">
              <span className="text-foreground truncate text-base font-semibold tracking-wide">
                The Vinayak Gore
              </span>
              <span className="text-foreground/40 text-sm tracking-wide">
                {formatDate(video.date)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

// ─── Dot button (same) ────────────────────────────────────────────────────────
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
        "h-3 rounded-full transition-all duration-300 ease-out",
        selected
          ? "bg-foreground shadow-lg shadow-foreground/30 w-25"
          : "bg-foreground/20 w-8",
      )}
    />
  );
});

// ─── Header ───────────────────────────────────────────────────────────────────
const YouTubeHeader = memo(function YouTubeHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, INVIEW_OPTS);

  return (
    <motion.div
      ref={ref}
      initial={MOTION_HIDDEN}
      animate={isInView ? MOTION_VISIBLE : MOTION_HIDDEN}
      transition={HEADER_TRANSITION}
    >
      <h2
        className={cn(
          "text-transparent bg-clip-text bg-linear-to-tl from-transparent via-foreground to-transparent font-semibold text-center text-4xl md:text-6xl",
        )}
      >
        <span className="tracking-tighter">Components in</span>{" "}
        <span className="dancing text-7xl md:text-9xl text-foreground opacity-15">
          Action
        </span>
      </h2>
      <p className="text-center text-base md:text-lg text-foreground/40">
        Enjoy watching of how beautiful interfaces are built, animated, and
        refined from the start to finish.
      </p>
    </motion.div>
  );
});

// ─── Carousel with fixed dot count ───────────────────────────────────────────
const VideoCarousel = memo(function VideoCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = videos.length;

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

  const resetAutoplay = useCallback(() => autoplay.current.reset(), []);

  const handleDotClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      resetAutoplay();
    },
    [emblaApi, resetAutoplay],
  );

  return (
    <div className="mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 md:gap-10 touch-pan-y p-5 md:p-10 lg:p-15">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="min-w-0 shrink-0 grow-0 basis-[88%] sm:basis-[52%] lg:basis-[65%]"
            >
              <VideoCard video={video} active={index === selectedIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls – now using totalSlides to generate dots */}
      <div className="flex items-center justify-center m-auto gap-3">
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
      className="relative py-5 md:py-10 lg:pt-15 max-w-400 m-auto w-full"
    >
      <YouTubeHeader />
      <VideoCarousel />
    </section>
  );
}

export default memo(YouTubeCarousel);
