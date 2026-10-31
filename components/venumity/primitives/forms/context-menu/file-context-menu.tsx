import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "./index";

export default function FileContextMenuDemo() {
  return (
    <div className="divide-y divide-border border rounded-xl overflow-hidden w-lg">
      {/* Design file */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex cursor-context-menu items-center justify-between px-4 py-3.5 text-sm hover:bg-muted/40">
            <span className="font-medium">design-spec.fig</span>
            <span className="text-xs text-muted-foreground">8.4 MB</span>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem>Open in Figma</ContextMenuItem>
          <ContextMenuItem>Open preview</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Duplicate</ContextMenuItem>
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Archive */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex cursor-context-menu items-center justify-between px-4 py-3.5 text-sm hover:bg-muted/40">
            <span className="font-medium">brand-assets.zip</span>
            <span className="text-xs text-muted-foreground">42 MB</span>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem>Extract here</ContextMenuItem>
          <ContextMenuItem>Extract to folder</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Download</ContextMenuItem>
          <ContextMenuItem>Copy link</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Presentation */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex cursor-context-menu items-center justify-between px-4 py-3.5 text-sm hover:bg-muted/40">
            <span className="font-medium">presentation.pptx</span>
            <span className="text-xs text-muted-foreground">6.8 MB</span>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem>Open in PowerPoint</ContextMenuItem>
          <ContextMenuItem>Open in Google Slides</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Make a copy</ContextMenuItem>
          <ContextMenuItem>Download as PDF</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
