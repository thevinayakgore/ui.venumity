import { Video } from "./index";

const SAMPLE_SRC = "/video.mp4";

export default function DefaultVideoDemo() {
  return (
    <div className="space-y-5 p-5 md:p-10 w-full">
      <p className="text-xs md:text-sm capitalize">
        variant = &quot;default&quot;
      </p>
      <Video src={SAMPLE_SRC} title="Variant : default" />
    </div>
  );
}
