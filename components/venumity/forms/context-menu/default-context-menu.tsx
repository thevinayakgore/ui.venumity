import { Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "./index";

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="aspect-video flex items-center justify-center border border-dashed text-sm rounded-xl w-lg">
        Right-click here
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Open in new tab</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Download</ContextMenuItem>
        <ContextMenuItem>Copy link</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive>
          <Trash2 className="size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
