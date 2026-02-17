"use client";
import Image from "next/image";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearningAccordionItem {
  id: string;
  title: string;
  content: string;
  bg: string;
  border: string;
  level: string;
}

const items: LearningAccordionItem[] = [
  {
    id: "item1",
    title: "Getting started",
    content: "Learn the basics and set up your development environment.",
    bg: "bg-blue-500",
    border: "border-blue-500/50",
    level: "Beginner",
  },
  {
    id: "item2",
    title: "Components",
    content: "Understand how to create, reuse, and compose React components.",
    bg: "bg-emerald-500",
    border: "border-emerald-500/50",
    level: "Beginner",
  },
  {
    id: "item3",
    title: "State & props",
    content:
      "Master component state and props to drive truly dynamic interfaces.",
    bg: "bg-purple-500",
    border: "border-purple-500/50",
    level: "Intermediate",
  },
  {
    id: "item4",
    title: "Hooks",
    content: "Use React Hooks to manage state, side effects, and context.",
    bg: "bg-amber-500",
    border: "border-amber-500/50",
    level: "Intermediate",
  },
  {
    id: "item5",
    title: "Advanced topics",
    content:
      "Explore patterns, performance, and architecture for production apps.",
    bg: "bg-rose-500",
    border: "border-rose-500/50",
    level: "Advanced",
  },
];

export default function ReactLearningAccordion() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["item1"]));

  const toggleItem = (id: string) => {
    const next = new Set(openItems);

    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    setOpenItems(next);
  };

  return (
    <main className="flex w-full max-w-3xl m-auto flex-col gap-4 p-6 md:p-10">
      <header className="space-y-2">
        <h2 className="text-xl md:text-3xl font-semibold tracking-tight">
          React learning path
        </h2>
        <p className="text-sm text-muted-foreground">
          Work through each module at your own pace. Open multiple sections to
          keep quick reference notes side-by-side.
        </p>
      </header>

      <div className="space-y-3 mt-4">
        {items.map((item, index) => {
          const isOpen = openItems.has(item.id);

          return (
            <div
              key={item.id}
              className={`group overflow-hidden rounded-lg border shadow-xs transition-all duration-300 hover:shadow-md ${item.border} ${item.bg}/10`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-start justify-between cursor-pointer p-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`relative size-12 p-3 bg-background border ${item.border} overflow-hidden rounded-md`}
                  >
                    <Image
                      src="/icons/react.png"
                      alt={item.title}
                      width={1000}
                      height={1000}
                      priority
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">
                      {index + 1}. {item.title}
                    </span>
                    <span className="text-xs text-foreground/80">
                      {isOpen
                        ? "Collapse to keep the list compact"
                        : "Click to see what you’ll cover in this module"}
                    </span>
                  </div>
                </div>
                <span className="opacity-50">
                  {isOpen ? (
                    <Minus className="size-4" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div
                  className={`border-t ${item.border} px-4 pb-4 pt-3 text-sm`}
                >
                  <p className="text-sm md:text-base">{item.content}</p>

                  <div className="mt-3 grid grid-cols-1 gap-3 text-xs text-muted-foreground md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <ul className="space-y-1">
                      <li>• Recommended pace: 20–40 minutes.</li>
                      <li>• Add notes as you go to track what clicked.</li>
                      <li>• Revisit this section when you feel stuck later.</li>
                    </ul>
                    <div className="space-y-2 rounded-lg bg-background/80 p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]">
                      <p className="text-[11px] font-medium text-foreground">
                        Quick actions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          className="h-7 px-3 text-[11px] font-medium"
                        >
                          Go to module
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-3 text-[11px]"
                        >
                          Add to today’s plan
                        </Button>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Tip: Mark this as done in your tracker when you can
                        explain the topic without notes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
