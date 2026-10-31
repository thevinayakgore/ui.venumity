import { AspectRatio, AspectRatioImage } from "./index";

export default function CustomAspectRatioDemo() {
  return (
    <div className="flex items-center gap-5 p-5 md:p-10 w-full">
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">variant=&ldquo;5/3&rdquo;</p>
        <AspectRatio variant="5/3" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9"
            alt="Banner Image"
          />
        </AspectRatio>
      </div>
      <div className="w-full">
        <p className="text-sm md:text-base mb-5">variant=&ldquo;12/11&rdquo;</p>
        <AspectRatio variant="12/11" className="border">
          <AspectRatioImage
            src="https://images.unsplash.com/photo-1497206365907-f5e630693df0"
            alt="Banner Image"
          />
        </AspectRatio>
      </div>
    </div>
  );
}
