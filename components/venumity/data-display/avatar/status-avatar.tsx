import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarStatus,
} from "./index";

const STATUSES: AvatarStatus[] = ["online", "away", "busy", "offline"];

export default function StatusAvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {STATUSES.map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Avatar status={s} className="border rounded-full">
            <AvatarImage src="https://i.pravatar.cc/150?img=44" alt="User" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <span className="text-[0.7rem] tracking-wider text-muted-foreground capitalize">
            {s}
          </span>
        </div>
      ))}
      <div className="flex flex-col items-center gap-2">
        <Avatar tooltip="Away for a while" className="border rounded-full">
          <AvatarImage src="https://i.pravatar.cc/150?img=15" alt="User" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <span className="text-[0.7rem] tracking-wider text-muted-foreground">
          No Status
        </span>
      </div>
    </div>
  );
}
