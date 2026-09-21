import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BasicBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-5 md:p-10 max-w-3xl m-auto w-full h-full">
      {/* Online */}
      <Badge className="gap-1.5 pl-1 pr-2 py-2.5 text-xs bg-green-500/20 backdrop-blur-sm border-green-500/30 text-foreground shadow-md/10 transition-all duration-500">
        <span className="size-2.5 rounded-full bg-green-500" />
        <span>Online</span>
      </Badge>

      {/* Busy */}
      <Badge className="gap-1.5 pl-1 pr-2 py-2.5 text-xs bg-red-500/20 backdrop-blur-sm border-red-500/30 text-foreground shadow-md/10 transition-all duration-500">
        <span className="size-2.5 rounded-full bg-red-500" />
        <span>Busy</span>
      </Badge>

      {/* Idle (outline) */}
      <Badge className="gap-1.5 pl-1 pr-2 py-2.5 text-xs bg-blue-500/20 backdrop-blur-sm border-blue-500/40 text-foreground shadow-md/10 transition-all duration-500">
        <span className="size-2.5 rounded-full bg-blue-500" />
        <span>Idle</span>
      </Badge>

      {/* Beta (outline) */}
      <Badge className="px-2 py-2.5 text-xs bg-foreground/15 backdrop-blur-sm border-foreground/20 text-foreground shadow-md/10 transition-all duration-500">
        Beta
      </Badge>

      {/* Verified (icon + outline) */}
      <Badge className="gap-1.5 pl-1 pr-2 py-2.5 text-xs bg-foreground/15 backdrop-blur-sm border-foreground/20 text-foreground shadow-md/10 transition-all duration-500">
        <CheckCircle className="size-2.5" />
        <span>Verified</span>
      </Badge>

      {/* Offer (gradient) */}
      <Badge className="gap-1.5 px-2.5 py-3 text-sm hover:shadow-lg transition-all duration-500 bg-linear-to-tl from-blue-500 to-sky-400 border-0! text-white shadow-lg/10">
        <span className="text-xs">50%</span>
        <span>Offer</span>
      </Badge>

      {/* Count (5) */}
      <Badge className="min-w-5 h-5 px-1 justify-center text-xs text-white bg-blue-500">
        5
      </Badge>
    </div>
  );
}
