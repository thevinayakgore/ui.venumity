import {
  Sun,
  Moon,
  User,
  Smile,
  Laptop,
  Calendar,
  Settings,
  Calculator,
  CreditCard,
} from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./index";

export default function CommandDemo() {
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
        <CommandGroup heading="Settings">
          <CommandItem>
            <User /> Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard /> Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings /> Settings
            <CommandShortcut>⌘S</CommandShortcut>
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
