import { cn } from "cn";
import { Badge, BadgePulse } from "./index";

const statuses = [
  { key: "online", color: "bg-green-500", label: "Online" },
  { key: "away", color: "bg-yellow-500", label: "Away" },
  { key: "busy", color: "bg-red-500", label: "Busy" },
  { key: "offline", color: "bg-gray-400", label: "Offline" },
] as const;

export default function PulseStatusBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map(({ key, color, label }) => (
        <Badge
          key={key}
          size="lg"
          variant="soft"
          className="pl-2"
        >
          {key === "offline" ? (
            <span className={cn("size-2.5 rounded-full", color)} />
          ) : (
            <BadgePulse color={color} />
          )}
          <span>{label}</span>
        </Badge>
      ))}
    </div>
  );
}
