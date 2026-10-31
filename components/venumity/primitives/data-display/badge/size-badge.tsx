import { Bell, Zap } from "lucide-react";
import { Badge } from "./index";

export default function SizeBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm" className="text-white">Small</Badge>
      <Badge size="default" className="text-white">Default</Badge>
      <Badge size="lg" className="text-white">Large</Badge>
      <Badge size="icon" aria-label="Bell" className="text-white">
        <Bell />
      </Badge>
      <Badge size="icon-sm" aria-label="Zap" className="text-white">
        <Zap />
      </Badge>
    </div>
  );
}
