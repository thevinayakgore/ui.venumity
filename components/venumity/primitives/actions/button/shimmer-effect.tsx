import { Button } from "./index";

export default function ShimmerEffectButtonDemo() {
  return (
    <div className="flex flex-col gap-5 md:gap-10 p-5 md:p-10 max-w-2xl">
      {/* Shimmer Colors */}
      <div className="space-y-5">
        <h4 className="text-sm font-medium pb-5 border-b">Shimmer Colors</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            shimmer
            variant="destructive"
            shimmerColor="rgba(255,255,255,0.8)"
          >
            Bright White
          </Button>
          <Button
            shimmer
            variant="outline"
            shimmerColor="color-mix(in oklab, var(--foreground) 10%, transparent)"
          >
            Dark Outline
          </Button>
          <Button
            shimmer
            shimmerColor="rgba(0, 255, 0, 0.4)"
            className="bg-foreground! text-secondary!"
          >
            Neon Green
          </Button>
          <Button
            shimmer
            variant="secondary"
            shimmerColor="rgba(255, 215, 0, 0.6)"
          >
            Gold Sweep
          </Button>
          <Button
            shimmer
            className="bg-blue-600 text-white hover:bg-blue-700"
            shimmerColor="rgba(0, 255, 255, 0.5)"
          >
            Cyan Sweep
          </Button>
        </div>
      </div>

      {/* Shimmer Duration */}
      <div className="space-y-5">
        <h4 className="text-sm font-medium pb-5 border-b">Shimmer Duration</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button shimmer shimmerDuration="0.8s">
            Very Fast (0.8s)
          </Button>
          <Button shimmer shimmerDuration="1.5s">
            Fast (1.5s)
          </Button>
          <Button shimmer shimmerDuration="2.5s">
            Default (2.5s)
          </Button>
          <Button shimmer shimmerDuration="4s">
            Slow (4s)
          </Button>
          <Button shimmer shimmerDuration="6s">
            Very Slow (6s)
          </Button>
        </div>
      </div>

      {/* Shimmer Delay */}
      <div className="space-y-5">
        <h4 className="text-sm font-medium pb-5 border-b">Shimmer Delay</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button shimmer shimmerDelay="0s">
            No Delay (0s)
          </Button>
          <Button shimmer shimmerDelay="0.5s">
            Short Delay (0.5s)
          </Button>
          <Button shimmer shimmerDelay="1s" variant="secondary">
            1s Delay
          </Button>
          <Button shimmer shimmerDelay="2s" variant="outline">
            2s Delay
          </Button>
        </div>
      </div>

      {/* Combination */}
      <div className="space-y-5">
        <h4 className="text-sm font-medium pb-5 border-b">Combination</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            shimmer
            shimmerDelay="1s"
            variant="secondary"
            shimmerDuration="4s"
            shimmerColor="color-mix(in oklab, var(--foreground) 10%, transparent)"
          >
            1s Delay, 4s Duration
          </Button>
          <Button
            shimmer
            shimmerDelay="0.5s"
            shimmerDuration="1s"
            variant="destructive"
            shimmerColor="rgba(255,255,255,0.9)"
          >
            Fast Bright Delayed
          </Button>
        </div>
      </div>
    </div>
  );
}
