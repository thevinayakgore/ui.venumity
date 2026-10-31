import { Video } from "./index";

const SAMPLE_SRC = "/video.mp4";
const POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop";

const ratios = [
  { label: "video (16:9)", value: "video" },
  { label: "wide (21:9)", value: "wide" },
  { label: "square (1:1)", value: "square" },
  { label: "vertical (9:16)", value: "vertical" },
] as const;

export default function VideoDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 m:p-10 w-full">
      {ratios.map((r) => (
        <div key={r.value} className="space-y-5">
          <p className="text-xs md:text-sm capitalize">
            aspectRatio = {r.label}
          </p>
          <Video
            poster={POSTER}
            src={SAMPLE_SRC}
            variant="compact"
            aspectRatio={r.value}
          />
        </div>
      ))}
    </div>
  );
}
