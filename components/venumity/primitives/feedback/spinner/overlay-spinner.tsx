"use client";
import * as React from "react";
import { SpinnerOverlay } from "./index";
import { RefreshCw, CheckCircle2 } from "lucide-react";

export default function OverlaySpinnerDemo() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="aspect-video space-y-3 w-3xl">
      <button
        onClick={() => setLoading((v) => !v)}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium hover:bg-muted"
      >
        <RefreshCw className="size-3.5" />
        {loading ? "Stop" : "Restart"}
      </button>

      {loading ? (
        <SpinnerOverlay label="Fetching dashboard…" className="w-full h-full">
          <div className="space-y-3 p-5">
            <div className="bg-foreground/10 h-10 w-2/3 rounded-lg" />
            <div className="bg-foreground/10 h-20 w-1/2 rounded-lg" />
            <div className="bg-foreground/10 h-40 w-full rounded-lg" />
            <div className="bg-foreground/10 h-15 w-3/4 rounded-lg" />
          </div>
        </SpinnerOverlay>
      ) : (
        <div className="rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span>Content loaded</span>
          </div>
        </div>
      )}
    </div>
  );
}
