import { AspectRatio, AspectRatioImage, AnimationBar } from "./index";

export default function AnimatedAspectRatioDemo() {
  return (
    <div className="flex items-start justify-center gap-5 p-5 w-full">
      <div className="w-full">
        <p className="text-xs md:text-sm mb-3">Video</p>
        <AspectRatio variant="video" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="image"
          />
          <AnimationBar
            animation="shimmer"
            repeat="infinite"
            className="via-white/20"
          />
        </AspectRatio>
      </div>
      <div className="w-full">
        <p className="text-xs md:text-sm mb-3">Square</p>
        <AspectRatio variant="square" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="image"
          />
          <AnimationBar
            animation="shimmer"
            duration={2}
            repeat="infinite"
            delay={0.5}
            className="via-blue-600/30"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
