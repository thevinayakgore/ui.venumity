import {
  Download,
  ExternalLink,
  Eye,
  FileImage,
  FileText,
  FolderInput,
  FolderOutput,
  Link,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./index";

export default function NestedContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-lg items-center justify-center rounded-xl border border-dashed text-sm">
        Right-click here
      </ContextMenuTrigger>

      <ContextMenuContent>
        {/* Open / preview */}
        <ContextMenuItem>
          <Eye className="size-4" />
          Preview
        </ContextMenuItem>

        <ContextMenuItem>
          <ExternalLink className="size-4" />
          Open in new tab
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* Copy */}
        <ContextMenuItem>
          <Link className="size-4" />
          Copy link
        </ContextMenuItem>

        <ContextMenuItem>
          <Pencil className="size-4" />
          Rename
        </ContextMenuItem>

        {/* Export */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Download className="size-4" />
            Export as
          </ContextMenuSubTrigger>

          <ContextMenuSubContent>
            <ContextMenuItem>
              <FileImage className="size-4" />
              PNG
            </ContextMenuItem>
            <ContextMenuItem>
              <FileImage className="size-4" />
              SVG
            </ContextMenuItem>
            <ContextMenuItem>
              <FileText className="size-4" />
              PDF
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Move to */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderInput className="size-4" />
            Move to
          </ContextMenuSubTrigger>

          <ContextMenuSubContent>
            <ContextMenuItem>Design</ContextMenuItem>
            <ContextMenuItem>Marketing</ContextMenuItem>

            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <FolderOutput className="size-4" />
                Archive
              </ContextMenuSubTrigger>

              <ContextMenuSubContent>
                <ContextMenuItem>2025</ContextMenuItem>
                <ContextMenuItem>2026</ContextMenuItem>
                <ContextMenuItem>Old projects</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuSubContent>
        </ContextMenuSub>

        {/* Share */}
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 className="size-4" />
            Share
          </ContextMenuSubTrigger>

          <ContextMenuSubContent>
            <ContextMenuItem>Copy link</ContextMenuItem>
            <ContextMenuItem>Send by email</ContextMenuItem>
            <ContextMenuItem>Share to Slack</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        {/* Destructive */}
        <ContextMenuItem destructive>
          <Trash2 className="size-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
