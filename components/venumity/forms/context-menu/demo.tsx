"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "./index";

export default function NestedContextMenuDemo() {
  const [profile, setProfile] = useState("personal");
  const [showToolbar, setShowToolbar] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="aspect-video flex items-center justify-center border border-dashed text-sm rounded-xl w-lg">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As…
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut…</ContextMenuItem>
            <ContextMenuItem>Name Window…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks
          <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showToolbar}
          onCheckedChange={setShowToolbar}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>

        <ContextMenuSeparator />

        <ContextMenuRadioGroup
          value={profile}
          onValueChange={(v) => setProfile(v as string)}
        >
          <ContextMenuLabel>Profiles</ContextMenuLabel>
          <ContextMenuRadioItem value="personal">Personal</ContextMenuRadioItem>
          <ContextMenuRadioItem value="work">Work</ContextMenuRadioItem>
        </ContextMenuRadioGroup>

        <ContextMenuSeparator />

        <ContextMenuItem destructive>
          <Trash2 className="size-4" />
          Delete
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
