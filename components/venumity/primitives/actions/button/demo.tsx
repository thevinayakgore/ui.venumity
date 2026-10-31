import Link from "next/link";
import { Button } from "./index";
import { Loader2, Settings, ArrowRight } from "lucide-react";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      {/* Default */}
      <Button>Default</Button>

      {/* Destructive */}
      <Button variant="destructive">Destructive</Button>

      {/* Shimmer Effect (neon green) */}
      <Button
        shimmer
        variant="outline"
        className="bg-black! text-white!"
        shimmerColor="color-mix(in oklab, var(--color-blue-600) 70%, transparent)"
      >
        Blue Shimmer
      </Button>

      {/* Loading State */}
      <Button disabled leftIcon={<Loader2 className="animate-spin" />}>
        Disabled
      </Button>

      {/* Bounce Effect (amount=1) */}
      <Button variant="ghost" animation="bounce" bounceAmount={0.7}>
        Bounce
      </Button>

      {/* Scale Effect (amount=1) */}
      <Button variant="outline" animation="scale" scale={1.05} scaleTap={0.95}>
        Scale
      </Button>

      {/* As Link (asChild) */}
      <Button
        asChild
        className="bg-blue-600! text-white! hover:shadow-lg shadow-blue-600/40 transition-all duration-500"
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.venumity.com"
        >
          Aschild Link <ArrowRight />
        </Link>
      </Button>

      {/* Icon Motion (winggle) */}
      <Button variant="outline" leftIcon={<Settings />} iconMotion="wiggle">
        Wiggle
      </Button>

      {/* Ripple Effect (custom color) */}
      <Button
        rippleLayers={2}
        animation="ripple"
        rippleDuration={1.5}
        rippleColor="var(--secondary)"
        className="bg-foreground! text-secondary!"
      >
        Ripple Effect
      </Button>
    </div>
  );
}
