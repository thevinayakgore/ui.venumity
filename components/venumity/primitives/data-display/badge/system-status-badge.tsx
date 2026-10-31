import {
  X,
  Ban,
  Clock,
  Radio,
  Loader,
  Webhook,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "./index";

export default function SystemStatusBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 max-w-xl">
      <Badge size="status" variant="solid" tone="green" className="gap-2">
        <Radio className="rounded-full bg-white p-1 text-green-500" />
        Online
      </Badge>
      <Badge size="status" variant="soft" className="gap-2">
        <Ban className="rounded-full bg-background p-1 text-foreground" />
        Offline
      </Badge>
      <Badge size="status" variant="solid" tone="yellow" className="gap-2">
        <AlertTriangle className="rounded-full bg-white p-1 text-yellow-500" />
        Maintenance
      </Badge>
      <Badge size="status" variant="solid" tone="orange" className="gap-2">
        <Clock className="rounded-full bg-white p-1 text-orange-500" />
        Degraded
      </Badge>
      <Badge size="status" variant="solid" tone="blue" className="gap-2">
        <Loader className="animate-spin rounded-full bg-white p-1 text-blue-500" />
        Loading
      </Badge>
      <Badge size="status" variant="solid" tone="rose" className="gap-2">
        <X className="rounded-full bg-white p-1 text-rose-500" />
        Critical Failure
      </Badge>
      <Badge
        size="status"
        variant="gradient"
        className="from-purple-500 via-pink-500 to-orange-500 inset-shadow-sm inset-shadow-white/50"
      >
        <Webhook className="animate-spin rounded-full bg-white p-1 text-pink-500" />
        Magical
      </Badge>
    </div>
  );
}
