import { Video } from "./index";

const SAMPLE_SRC = "/video.mp4";

export default function VideoDemo() {
  return (
    <div className="space-y-5 p-5 md:p-10 w-full">
      <p className="text-xs md:text-sm capitalize">
        variant = &quot;theater&quot;
      </p>
      <Video src={SAMPLE_SRC} variant="theater" title="Variant : theater" className="rounded-xl" />
    </div>
  );
}
