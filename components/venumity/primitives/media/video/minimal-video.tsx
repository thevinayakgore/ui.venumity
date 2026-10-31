import { Video } from "./index";

const SAMPLE_SRC = "/video.mp4";
const POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop";

export default function VideoDemo() {
  return (
    <div className="space-y-5 max-w-xl">
      <p className="text-xs md:text-sm capitalize">
        minimal — ghost play/pause button + progress only
      </p>
      <Video src={SAMPLE_SRC} poster={POSTER} variant="minimal" />
    </div>
  );
}
