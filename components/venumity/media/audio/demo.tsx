import { Audio } from "./index";

export default function AudioDemo() {
  return (
    <Audio
      showTime
      showVolume
      showDownload
      animation="bars"
      src="/music.mp3"
      title="Ambient Sketch"
      artist="Venumity Studio"
      artwork="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop"
    />
  );
}

