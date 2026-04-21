import { cn } from "@/lib/utils";
import { useState } from "react";

type SpotlightProps = {
  className?: string;
};

export const Spotlight = ({ className }: SpotlightProps) => {
  const [sparkles] = useState(() =>
    [...Array(800)].map(() => ({
      cx: Math.random() * 3787,
      cy: Math.random() * 2842,
      duration: 0.6 + Math.random() * 3,
    })),
  );

  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-1 h-[169%] w-[138%] lg:w-[150%]",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="url(#gradient)"
          fillOpacity="0.4"
        />
      </g>
      {/* Sparkle Particles (clipped to ellipse) */}
      <g clipPath="url(#ellipseClip)" className="text-zinc-950 dark:text-white">
        {sparkles.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r="2"
            fill="currentColor"
            opacity="0.4"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${s.duration}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="250"
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff0080">
            <animate
              attributeName="stop-color"
              values="#ff0080;#7928ca;#2afadf;#00f2fe;#4facfe;#43e97b;#f9f586;#f857a6;#ff9966;#ff0080"
              dur="20s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#7928ca">
            <animate
              attributeName="stop-color"
              values="#7928ca;#2afadf;#00f2fe;#4facfe;#43e97b;#f9f586;#f857a6;#ff9966;#ff0080;#7928ca"
              dur="20s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <clipPath id="ellipseClip">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default function GradientSpotlight1() {
  return (
    <div className="relative flex md:items-center md:justify-center overflow-hidden m-auto w-full h-screen">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-size-[100px_100px] select-none",
          "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <div
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-5 bg-linear-to-t from-background via-background/30 to-transparent select-none w-full h-full",
        )}
      />

      <Spotlight className="-top-40 left-0 md:-top-40 md:left-50" />

      <div className="relative z-10 m-auto w-full p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 pb-2 bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          Design that Glows
          <br /> Beyond the Screen.
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-center text-base font-normal text-foreground/70">
          Bring interfaces to life with radiant gradients and ambient motion.
          This spotlight effect creates a sense of depth and focus, helping
          users intuitively connect with what matters most.
        </p>
      </div>
    </div>
  );
}
