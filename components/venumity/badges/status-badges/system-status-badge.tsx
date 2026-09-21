import { Badge } from "@/components/ui/badge";
import {
  X,
  Ban,
  Gift,
  Radio,
  Clock,
  Loader,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function SystemStatusBadge() {
  return (
    <div className="flex items-center w-full h-full">
      <div className="flex flex-wrap items-center justify-center m-auto gap-3 p-5 md:p-10 max-w-3xl w-full h-fit">
        {/* Online */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! text-sm font-semibold pl-1 pr-3 py-4 bg-green-500! text-white border-0! rounded-full shadow-lg/5 transition-all duration-500">
          <Radio className="p-1 bg-white text-green-500 rounded-full" />
          <span>Online</span>
        </Badge>

        {/* Offline */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! text-sm font-semibold pl-1 pr-3 py-4 bg-foreground/15! text-foreground border-0! rounded-full shadow-lg/5 transition-all duration-500">
          <Ban className="p-1 bg-background text-foreground rounded-full" />
          <span>Offline</span>
        </Badge>

        {/* Maintenance */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! text-sm font-semibold pl-1 pr-3 py-4 bg-yellow-500! text-white border-0! rounded-full shadow-lg/5 transition-all duration-500">
          <AlertTriangle className="p-1 bg-white rounded-full text-yellow-500" />
          <span>Maintenance</span>
        </Badge>

        {/* Degraded */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! text-sm font-semibold pl-1 pr-3 py-4 bg-orange-500! text-white border-0! rounded-full shadow-lg/5 transition-all duration-500">
          <Clock className="p-1 bg-white rounded-full text-orange-500" />
          <span>Degraded</span>
        </Badge>

        {/* Loading */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! text-sm font-semibold pl-1 pr-3 py-4 bg-blue-500! text-white border-0! rounded-full shadow-lg/5 transition-all duration-500">
          <Loader className="p-1 bg-white rounded-full text-blue-500 animate-spin" />
          <span>Loading</span>
        </Badge>

        {/* Critical */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! text-sm font-semibold pl-1 pr-3 py-4 bg-rose-500! text-white border-0! rounded-full shadow-lg/5 transition-all duration-500">
          <X className="p-1 bg-white rounded-full text-rose-500" />
          <span>Critical Failure</span>
        </Badge>

        {/* Success */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-4.5! text-sm font-semibold pl-1.5 pr-3 py-3.5 bg-indigo-500! text-white border-background ring-2 ring-indigo-500 rounded-full shadow-lg/5 transition-all duration-500">
          <CheckCircle />
          <span>All Good</span>
        </Badge>

        {/* Unknown */}
        <Badge className="flex items-center justify-center gap-2 [&>svg]:size-6! border-0! text-sm font-semibold text-white pl-1 pr-3 py-4 bg-linear-to-tl from-pink-500 to-fuchsia-300 ring-4 ring-sky-400 rounded-full shadow-lg/5 transition-all duration-500">
          <Gift className="p-1 bg-white rounded-full text-pink-500" />
          <span>Mystery</span>
        </Badge>
      </div>
    </div>
  );
}
