import { Video } from "./index";

const SAMPLE_SRC = "/video.mp4";
const POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba";

export default function VideoDemo() {
  return (
    <div className="space-y-5 p-5 md:p-10 w-full">
      <p className="text-xs md:text-sm capitalize">
        hero - sharp corners, big title
      </p>
      <Video
        variant="hero"
        poster={POSTER}
        src={SAMPLE_SRC}
        aspectRatio="wide"
        title="Product launch keynote — 2025"
      />
    </div>
  );
}
