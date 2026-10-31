import { Badge } from "./index";
import { Star } from "lucide-react";

export default function ShapeBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge shape="pill" className="text-whi">
        Pill
      </Badge>
      <Badge shape="square" className="text-whi">
        Square
      </Badge>
      <Badge shape="circle" size="icon" aria-label="Star" className="text-whi">
        <Star />
      </Badge>
      <Badge
        shape="dot"
        tone="success"
        aria-label="Online"
        className="text-whi"
      />
      <Badge
        shape="dot"
        tone="warning"
        aria-label="Away"
        className="text-whi"
      />
      {/* <Badge shape="dot" tone="destructive" aria-label="Offline" className="text-whi" /> */}
    </div>
  );
}
