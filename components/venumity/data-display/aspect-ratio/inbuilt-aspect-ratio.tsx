import { AspectRatio, AspectRatioImage } from "./index";

export default function InBuiltAspectRatioDemo() {
  return (
    <div className="flex items-start gap-5 p-5 md:p-10 w-full">
      <div className="space-y-5 w-full">
        <p className="text-sm md:text-base">variant=&ldquo;cinema&rdquo;</p>
        <AspectRatio variant="cinema" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1531959870249-9f9b729efcf4"
            alt="Banner Image"
          />
        </AspectRatio>
        <p className="text-sm md:text-base">variant=&ldquo;square&rdquo;</p>
        <AspectRatio variant="square" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1539664030485-a936c7d29c6e"
            alt="Banner Image"
          />
        </AspectRatio>
      </div>
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">variant=&ldquo;portrait&rdquo;</p>
        <AspectRatio variant="portrait" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d"
            alt="Banner Image"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
