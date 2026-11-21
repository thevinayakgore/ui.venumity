"use client";
import * as React from "react";
import { Spinner } from "./index";
import { CloudUpload, CheckCircle2 } from "lucide-react";

export default function SpinnerDemo() {
  const [state, setState] = React.useState<"idle" | "uploading" | "done">(
    "idle",
  );

  const start = () => {
    setState("uploading");
    setTimeout(() => setState("done"), 2200);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        onClick={start}
        disabled={state === "uploading"}
        className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {state === "uploading" ? (
          <Spinner size="sm" tone="success" />
        ) : state === "done" ? (
          <CheckCircle2 className="size-4.5" />
        ) : (
          <CloudUpload className="size-4.5" />
        )}
        {state === "uploading"
          ? "Uploading"
          : state === "done"
            ? "Uploaded"
            : "Upload file"}
      </button>
      <p className="text-xs text-muted-foreground">
        Click this button to see spinner
      </p>
    </div>
  );
}
