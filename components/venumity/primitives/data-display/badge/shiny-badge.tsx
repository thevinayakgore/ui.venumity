import { Badge } from "./index";

export default function ShinyBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="shiny" tone="success" size="sm">
        Live
      </Badge>
      <Badge variant="shiny" tone="info">
        Premium
      </Badge>
      <Badge variant="shiny" tone="danger" size="lg" className="pb-0.5">
        Destructive
      </Badge>
    </div>
  );
}
