import Link from "next/link";
import { Badge } from "./index";
import { Check, Sparkles, AlertTriangle } from "lucide-react";

export default function BadgeDemo() {
  return (
    <div className="flex flex-col gap-5 md:gap-10 w-sm">
      <div className="space-y-4 w-full">
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          asChild
        </h3>
        <div className="flex flex-wrap items-center gap-2 w-full">
          <Badge asChild className="text-white">
            <Link href="/">Clickable</Link>
          </Badge>
          <Badge asChild variant="outline">
            <Link href="/" className="hover:bg-accent">
              Outline link
            </Link>
          </Badge>
        </div>
      </div>

      <div className="space-y-4 w-full">
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Real-world
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-3 w-full">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Production deploy</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
            <Badge tone="success">
              <Check />
              Live
            </Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3 w-full">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Data migration</p>
              <p className="text-xs text-muted-foreground">Running for 12m</p>
            </div>
            <Badge tone="warning">
              <AlertTriangle />
              In progress
            </Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3 w-full">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Auth service</p>
              <p className="text-xs text-muted-foreground">
                Errors in last hour
              </p>
            </div>
            <Badge variant="destructive">Offline</Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3 w-full">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Venumity UI</p>
              <p className="text-xs text-muted-foreground">v1.0.4 released</p>
            </div>
            <Badge tone="brand">
              <Sparkles />
              New
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
