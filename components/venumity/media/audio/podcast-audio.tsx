import { Audio } from "./index";

export default function PodcastAudioDemo() {
  return (
    <div className="space-y-3 max-w-xl w-full">
      <Audio
        showTime
        showVolume
        showDownload
        src="/music.mp3"
        animation="bars"
        variant="podcast"
        className="w-full"
        artist="The Venumity Podcast · 48 min"
        title="Episode 12 — Motion in modern UI"
        onDownload={() => console.log("download")}
        artwork="https://images.unsplash.com/photo-1703747172318-6a9c0a44df66"
      />

      <div className="p-4 border border-border rounded-xl">
        <p className="text-sm">
          We cover structural motion, why presets like scale and blur should
          stay out of most interactions, and how to build a library where every
          animation is intentional.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <li>00:00 — Intro</li>
          <li>04:12 — The case against scale</li>
          <li>12:40 — Structural reveals</li>
          <li>28:15 — Reduced motion</li>
          <li>42:00 — Outro</li>
        </ul>
      </div>
    </div>
  );
}
