import { Video } from "./index";

const SAMPLE_SRC = "/video.mp4";

export default function VideoDemo() {
  return (
    <div className="flex items-center gap-5 p-5 md:p-10 max-w-5xl w-full">
      {["Introduction", "Getting started"].map((t, i) => (
        <Video
          key={i}
          title={t}
          src={SAMPLE_SRC}
          variant="compact"
          className="rounded-2xl"
        />
      ))}
    </div>
  );
}
