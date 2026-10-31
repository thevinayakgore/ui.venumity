import { FileText, Copy, Scissors, ClipboardPaste } from "lucide-react";
import {
  Command,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandInput,
  CommandShortcut,
} from "./index";

export default function DefaultCommandDemo() {
  return (
    <Command className="w-xs">
      <CommandInput placeholder="default variant" />
      <CommandList>
        <CommandGroup heading="Quick actions">
          <CommandItem>
            <FileText /> New file
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Copy /> Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Scissors /> Cut
            <CommandShortcut>⌘X</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <ClipboardPaste /> Paste
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
