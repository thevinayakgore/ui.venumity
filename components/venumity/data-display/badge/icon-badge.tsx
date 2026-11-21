import { Check, Sparkles, AlertTriangle, Info } from "lucide-react";

import { Badge } from "./index";

export default function IconBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="text-white">
        <Check className="stroke-3" />
        Done
      </Badge>
      <Badge tone="success">
        <Check className="stroke-3" />
        Passed
      </Badge>
      <Badge tone="warning">
        <AlertTriangle className="stroke-3" />
        Pending
      </Badge>
      <Badge variant="outline" tone="info">
        <Info className="stroke-2" />
        Info
      </Badge>
      <Badge tone="brand">
        <Sparkles />
        New
      </Badge>
    </div>
  );
}
