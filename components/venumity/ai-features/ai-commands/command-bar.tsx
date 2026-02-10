"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Command, Search, Sparkles, Clock, Zap, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  command: string;
  icon: React.ReactNode;
  category: "analysis" | "generate" | "transform" | "utility";
}

export default function AICommandBars() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCommand, setSelectedCommand] = useState<CommandItem | null>(
    null,
  );
  const [recentCommands, setRecentCommands] = useState<CommandItem[]>([]);

  const commands: CommandItem[] = [
    {
      id: "1",
      title: "Summarize Content",
      description: "Generate a concise summary of selected text",
      command: "/summarize",
      icon: <Sparkles className="h-4 w-4" />,
      category: "analysis",
    },
    {
      id: "2",
      title: "Generate Code",
      description: "Create code based on your description",
      command: "/generate-code",
      icon: <Command className="h-4 w-4" />,
      category: "generate",
    },
    {
      id: "3",
      title: "Translate Text",
      description: "Translate between 50+ languages",
      command: "/translate",
      icon: <Zap className="h-4 w-4" />,
      category: "transform",
    },
    {
      id: "4",
      title: "Explain Concept",
      description: "Get a detailed explanation of any topic",
      command: "/explain",
      icon: <Brain className="h-4 w-4" />,
      category: "analysis",
    },
    {
      id: "5",
      title: "Create Document",
      description: "Generate documents from templates",
      command: "/create-doc",
      icon: <Sparkles className="h-4 w-4" />,
      category: "generate",
    },
    {
      id: "6",
      title: "Analyze Data",
      description: "Perform data analysis and visualization",
      command: "/analyze-data",
      icon: <Brain className="h-4 w-4" />,
      category: "analysis",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase()) ||
      cmd.command.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCommandSelect = (command: CommandItem) => {
    setSelectedCommand(command);
    setRecentCommands((prev) => [command, ...prev.slice(0, 4)]);
    setIsOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative min-w-xl"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Type / for commands, or ask AI anything..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim()) setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            className="pl-10 pr-4 py-6 text-lg border-2 border-primary/20 focus:border-primary"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full z-50"
            >
              <Card className="border-2 border-primary/20 shadow-xl">
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">AI Commands</h4>
                      <Badge variant="outline" className="bg-primary/10">
                        {filteredCommands.length} commands
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {filteredCommands.slice(0, 6).map((command) => (
                        <motion.div
                          key={command.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleCommandSelect(command)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            {command.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {command.title}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {command.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {command.description}
                            </p>
                          </div>
                          <kbd className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {command.command}
                          </kbd>
                        </motion.div>
                      ))}
                    </div>

                    {recentCommands.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Clock className="h-3 w-3" /> Recent Commands
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {recentCommands.map((cmd) => (
                            <Badge
                              key={cmd.id}
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary/20"
                              onClick={() => handleCommandSelect(cmd)}
                            >
                              {cmd.command}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedCommand && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-2 border-primary/20">
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {selectedCommand.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">
                        {selectedCommand.title}
                      </h3>
                      <Badge>{selectedCommand.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">
                      {selectedCommand.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Button size="sm">Execute Command</Button>
                      <Button size="sm" variant="outline">
                        Edit Parameters
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
