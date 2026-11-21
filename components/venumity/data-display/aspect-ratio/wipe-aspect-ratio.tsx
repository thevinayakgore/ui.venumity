import { AnimationBar, AspectRatio, AspectRatioImage } from "./index";

export default function WipeAspectRatioDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 md:p-10 w-full">
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">
          animation=&ldquo;wipe-down&rdquo;
        </p>
        <AspectRatio variant="video" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9"
            alt="Banner Image"
          />
          <AnimationBar animation="wipe-down" />
        </AspectRatio>
      </div>
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">
          animation=&ldquo;wipe-up&rdquo;
        </p>
        <AspectRatio variant="video" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Banner Image"
          />
          <AnimationBar animation="wipe-up" duration={5} />
        </AspectRatio>
      </div>
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">
          animation=&ldquo;wipe-left&rdquo;
        </p>
        <AspectRatio variant="video" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0"
            alt="Banner Image"
          />
          <AnimationBar animation="wipe-left" duration={3} />
        </AspectRatio>
      </div>
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">
          animation=&ldquo;wipe-right&rdquo;
        </p>
        <AspectRatio variant="video" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d"
            alt="Banner Image"
          />
          <AnimationBar animation="wipe-right" />
        </AspectRatio>
      </div>
    </div>
  );
}
