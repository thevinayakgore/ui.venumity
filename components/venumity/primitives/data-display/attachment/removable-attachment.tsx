"use client";
import * as React from "react";
import { Trash2 } from "lucide-react";
import { Attachment, type AttachmentStatus } from "./index";

interface AttachmentItem {
  id: number;
  name: string;
  size: string;
  status: AttachmentStatus;
  progress?: number;
}

const FILES_DATA: AttachmentItem[] = [
  { id: 1, name: "contract-signed.pdf", size: "840 KB", status: "success" },
  {
    id: 2,
    name: "cover-letter.docx",
    size: "98 KB",
    status: "uploading",
    progress: 34,
  },
  { id: 3, name: "portfolio.zip", size: "54 MB", status: "pending" },
  { id: 4, name: "headshot.jpg", size: "412 KB", status: "error" },
];

export default function AttachmentDemo() {
  const [items, setItems] = React.useState<AttachmentItem[]>(FILES_DATA);

  const remove = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="flex flex-col gap-4 max-w-md w-full">
      {/* Success */}
      <Attachment
        fileName="contract-signed.pdf"
        fileSize="840 KB"
        status="success"
        variant="removable"
        onRemove={() => remove(1)}
      />

      {/* Uploading */}
      <Attachment
        fileName="cover-letter.docx"
        fileSize="98 KB"
        status="uploading"
        variant="removable"
        progress={34}
        onRemove={() => remove(2)}
      />

      {/* Pending */}
      <Attachment
        fileName="portfolio.zip"
        fileSize="54 MB"
        status="pending"
        variant="removable"
        onRemove={() => remove(3)}
      />

      {/* Error */}
      <Attachment
        fileName="headshot.jpg"
        fileSize="412 KB"
        status="error"
        variant="removable"
        onRemove={() => remove(4)}
        errorMessage="Network error"
        onRetry={() => console.log("retry", 4)}
      />

      {/* Empty state */}
      {items.length === 0 ? (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          <Trash2 className="size-4" />
          All attachments removed
        </div>
      ) : null}
    </div>
  );
}
