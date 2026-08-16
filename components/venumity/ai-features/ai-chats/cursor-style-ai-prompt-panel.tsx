"use client";
import { useState } from "react";
import {
  Bot,
  Clock3,
  MessageSquare,
  Mic,
  PanelRight,
  Play,
  Plus,
  Workflow,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const menuItems = [
  { id: "agent", label: "Agent", icon: Bot },
  { id: "plan", label: "Plan", icon: Workflow },
  { id: "debug", label: "Debug", icon: Wrench },
  { id: "multitask", label: "Multitask", icon: Clock3 },
  { id: "ask", label: "Ask", icon: MessageSquare },
];

export default function CursorStyleAIPromptPanel() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("agent");

  return (
    <section className="grid grid-cols-10 w-full h-full">
      <main className="col-span-7 p-3 w-full">
        <div className="bg-foreground/5 border rounded-xl w-full h-full" />
      </main>
      <aside className="col-span-3 flex flex-col bg-card border-l w-full h-full">
        <div className="flex items-center justify-between gap-4 border-b py-1.5 px-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-4" />
            <span className="text-sm truncate min-w-0 w-full font-semibold">
              New Chat
            </span>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="size-8! text-foreground/40 hover:text-foreground rounded-sm"
            >
              <Play className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8! text-foreground/40 hover:text-foreground rounded-sm"
            >
              <Plus className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8! text-foreground/40 hover:text-foreground rounded-sm"
            >
              <Clock3 className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8! text-foreground/40 hover:text-foreground rounded-sm"
            >
              <PanelRight className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="p-3">
          <div className="relative border-2 border-foreground/15 w-full rounded-2xl overflow-hidden">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Plan, Build, / for skills, @ for context"
              className="p-3! resize-none border-0! bg-foreground/10! text-sm! font-semibold placeholder:text-foreground/40! focus-visible:ring-0 focus-visible:ring-offset-0 overflow-auto w-full min-h-50 h-full"
            />

            <div className="absolute bottom-0 left-0 flex items-center justify-between p-2.5 w-full">
              <div className="flex items-center gap-3">
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger className="h-7.5 w-fit gap-1 rounded-full border-0 bg-foreground/10 px-2.5 text-xs font-bold text-foreground/50 shadow-none outline-none ring-0 hover:bg-foreground/12 focus:ring-0 focus:ring-offset-0">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    sideOffset={6}
                    align="start"
                    className="z-10050 min-w-40 border-white/10 bg-neutral-900/90 p-1 text-foreground backdrop-blur-md"
                  >
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <SelectItem
                          key={item.id}
                          value={item.id}
                          className="cursor-pointer rounded-md px-2 py-1.5 pr-8 text-foreground/60 outline-none focus:bg-background/30 focus:text-foreground data-[state=checked]:text-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="size-3.5" />
                            <span className="text-xs font-semibold">
                              {item.label}
                            </span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                <span className="text-sm text-foreground/50 font-semibold">
                  Composer 2.5 Fast
                </span>
              </div>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Voice input"
                className="size-8! bg-transparent! hover:bg-foreground! text-foreground/40! hover:text-secondary! transition-all duration-300 rounded-full"
              >
                <Mic className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
