"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Team", icon: Users },
  { label: "Calendar", icon: Calendar },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export default function DropdownMenuComponent() {
  const [selected, setSelected] = useState<string>("Dropdown Menu");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="p-6 border-2 hover:bg-primary hover:border-white hover:text-white hover:shadow-lg shadow-primary/40 gap-3 cursor-pointer transition-all duration-500 w-50"
        >
          <span className="truncate">{selected}</span>
          <ChevronDown className="size-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-50">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className="cursor-pointer"
            onSelect={() => setSelected(item.label)}
          >
            <item.icon className="mr-2 size-4" />
            {item.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
