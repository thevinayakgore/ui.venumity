import { Avatar, AvatarFallback, type AvatarTone } from "./index";

const TONES: AvatarTone[] = [
  "blue",
  "emerald",
  "amber",
  "rose",
  "violet",
  "red",
  "sky",
  "neutral",
];

export default function ToneAvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {TONES.map((t) => (
        <div key={t} className="flex flex-col items-center gap-2">
          <Avatar size="lg">
            <AvatarFallback tone={t}>Alex Doe</AvatarFallback>
          </Avatar>
          <span className="text-[0.7rem] tracking-wider text-muted-foreground capitalize">
            {t}
          </span>
        </div>
      ))}
    </div>
  );
}
