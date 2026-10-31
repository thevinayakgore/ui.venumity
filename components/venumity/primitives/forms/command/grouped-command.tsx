import { Sun, Moon, Smile, Laptop, Calendar, Calculator } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./index";

export default function GroupedCommandDemo() {
  return (
    <Command animation="scale" className="w-lg">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar /> Calendar
          </CommandItem>
          <CommandItem>
            <Smile /> Search Emoji
          </CommandItem>
          <CommandItem>
            <Calculator /> Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem>
            <Sun /> Light
          </CommandItem>
          <CommandItem>
            <Moon /> Dark
          </CommandItem>
          <CommandItem>
            <Laptop /> System
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
