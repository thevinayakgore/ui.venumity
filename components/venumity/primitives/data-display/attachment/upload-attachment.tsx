"use client";
import { useState } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "../../actions/button";
import { Attachment, type AttachmentStatus } from "./index";

export default function AttachmentDemo() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<AttachmentStatus>("idle");

  const start = () => {
    setStatus("pending");
    setProgress(0);
    const start = Date.now();
    const total = 3000;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setStatus("success");
      }
    };
    setTimeout(() => {
      setStatus("uploading");
      requestAnimationFrame(tick);
    }, 400);
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="space-y-4 max-w-lg">
      <p className="text-xs text-muted-foreground">
        Progress bar wipes via width transition. Filename text shimmers via
        background-position. No transform animations.
      </p>
      <Attachment
        variant="upload"
        fileName="brand-assets.zip"
        fileSize="42 MB"
        status={status}
        progress={progress}
        onRetry={start}
        removable
      />

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={start}
          className="bg-foreground! text-secondary! inset-shadow-none"
        >
          Upload
        </Button>
        <Button
          size="sm"
          onClick={reset}
          variant="secondary"
          leftIcon={<RotateCw />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
