import { Clipboard, Copy, PencilLine, Share2, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./index";

export default function GroupedContextMenuDemo() {
  return (
    <ContextMenu>
    <ContextMenuTrigger className="aspect-video flex items-center justify-center border border-dashed text-sm rounded-xl w-lg">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Clipboard</ContextMenuLabel>
          <ContextMenuItem>
            <Copy className="size-4" />
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Trash2 className="size-4" />
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Clipboard className="size-4" />
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuItem>
            <PencilLine className="size-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem>
            <Share2 className="size-4" />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
