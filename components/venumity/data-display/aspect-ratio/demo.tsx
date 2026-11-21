import { AspectRatio, AspectRatioImage } from "./index";

const VARIANTS = ["video", "portrait", "square", "cinema", "photo"] as const;

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1635716983858-c061845471b6",
];

export default function AspectRatioDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full">
      {VARIANTS.map((v, i) => {
        const src = SAMPLE_IMAGES[i % SAMPLE_IMAGES.length];
        return (
          <div key={v}>
            <p className="text-xs md:text-sm mb-3">{v}</p>
            <AspectRatio variant={v} className="border">
              <AspectRatioImage src={src} alt="image" />
            </AspectRatio>
          </div>
        );
      })}
    </div>
  );
}
