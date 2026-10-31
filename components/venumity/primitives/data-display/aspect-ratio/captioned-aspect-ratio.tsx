import { AspectRatio, AspectRatioImage } from "./index";

export default function CaptionedAspectRatioDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-10">
      <AspectRatio variant="photo" className="border rounded-4xl shadow-2xl/20">
        <AspectRatioImage
          src="https://images.unsplash.com/photo-1759049219585-4feb729fb018"
          alt="Snow-covered mountain peaks beneath a soft evening sky"
        />

        <div className="absolute inset-x-0 bottom-0 z-10 flex h-1/3 w-full flex-col justify-end bg-linear-to-t from-black/85 via-black/35 to-transparent p-5 text-white md:p-8">
          <p className="text-base font-semibold md:text-xl">Above the Clouds</p>
          <p className="text-sm opacity-75 md:text-base">
            Where the mountains meet the sky.
          </p>
        </div>
      </AspectRatio>

      <AspectRatio variant="photo" className="border rounded-4xl shadow-2xl/20">
        <AspectRatioImage
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
          alt="Eiffel Tower overlooking Paris at sunset"
        />

        <div className="absolute inset-x-0 bottom-0 z-10 flex h-1/3 w-full flex-col justify-end bg-linear-to-t from-black/85 via-black/35 to-transparent p-5 text-white md:p-8">
          <p className="text-base font-semibold md:text-xl">Paris in a Frame</p>
          <p className="text-sm opacity-75 md:text-base">
            A timeless view of the Eiffel Tower.
          </p>
        </div>
      </AspectRatio>
    </div>
  );
}
