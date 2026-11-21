import { Audio } from "./index";

export default function WaveformAudioDemo() {
  return (
    <Audio
      animation="bars"
      src="/music.mp3"
      variant="waveform"
      title="Ambient Sketch"
    />
  );
}
