import { Audio } from "./index";

export default function MinimalAudioDemo() {
  return (
    <Audio
      animation="bars"
      src="/music.mp3"
      variant="minimal"
      title="Ambient Sketch"
    />
  );
}
