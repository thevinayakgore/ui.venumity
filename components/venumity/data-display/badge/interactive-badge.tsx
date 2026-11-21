"use client";
import * as React from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "./index";

export default function InteractiveBadgeDemo() {
  const [tags, setTags] = React.useState(["React", "TypeScript", "Tailwind"]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" className="gap-1.5">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
            className="-mr-1 grid size-3.5 place-items-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground rounded-full"
          >
            <X className="size-2.5" />
          </button>
        </Badge>
      ))}

      <Badge
        variant="outline"
        asChild
        className="cursor-pointer hover:bg-accent"
      >
        <button type="button" onClick={() => setTags((p) => [...p, "New"])}>
          <Plus className="-ml-1" />
          Add tag
        </button>
      </Badge>
    </div>
  );
}
