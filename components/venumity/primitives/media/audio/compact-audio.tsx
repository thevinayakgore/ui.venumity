import { Audio } from "./index";

const SAMPLE_SRC = "/music.mp3";

const tracks = [
  { title: "Ambient Sketch", artist: "Venumity Studio", duration: 24 },
  { title: "Forest Rain", artist: "Nature Loops", duration: 42 },
  { title: "Lo-fi Study", artist: "Chill Beats", duration: 36 },
  { title: "Ocean Waves", artist: "Nature Loops", duration: 55 },
];

export default function CompactAudioDemo() {
  return (
    <div className="space-y-5 p-5 md:p-10 max-w-xl w-full">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Playlist
      </p>
      <div className="space-y-3 w-full">
        {tracks.map((t, i) => (
          <Audio
            key={i}
            title={t.title}
            animation="bars"
            src={SAMPLE_SRC}
            variant="compact"
            artist={t.artist}
            duration={t.duration}
          />
        ))}
      </div>
    </div>
  );
}