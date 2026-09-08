"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MoveRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OpenToolsProps {
  componentName: string;
  description: string;
  filePath: string;
  currentCode: string;
}

export const OPEN_TOOLS = [
  { name: "V0", icon: "/assets/open-tools/v0.svg" },
  { name: "Lovable", icon: "/assets/open-tools/lovable.ico" },
  { name: "ChatGPT", icon: "/assets/open-tools/chatgpt.webp" },
  { name: "Claude", icon: "/assets/open-tools/claude.ico" },
  { name: "Perplexity", icon: "/assets/open-tools/perplexity.ico" },
];

export function generateComponentPrompt({
  componentName,
  description,
  filePath,
  code,
}: {
  componentName: string;
  description: string;
  filePath: string;
  code: string;
}) {
  const safeCode = code || "// No component code available yet !";
  return `
You are a senior frontend engineer and UI architect working on a production application.

I am using a React component from the Venumity UI design system in a Next.js project.

Project stack :
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

Component details :
- Name : ${componentName}
- Description : ${description}
- File path : ${filePath}

Component source code :
${safeCode}

Your task :
1. Explain what this component does and where it fits best in real products
2. Review it for production readiness (performance, accessibility, edge cases)
3. Suggest practical improvements to code quality, reusability, and type safety
4. Recommend design‑system friendly props, variants, or configurations
5. Propose UX or motion improvements only if they clearly add value

Constraints :
- Do not change visual design unless it improves UX
- Prefer incremental, realistic improvements
- Focus on production‑level best practices

Return concise, actionable recommendations with code snippets.
`.trim();
}

const buildOpenToolUrl = (name: string, prompt: string) => {
  const map: Record<string, (p: string) => string> = {
    V0: (p) => `https://v0.dev/chat?q=${encodeURIComponent(p)}`,

    Lovable: (p) => `https://lovable.dev/?prompt=${encodeURIComponent(p)}`,

    ChatGPT: (p) => `https://chat.openai.com/?q=${encodeURIComponent(p)}`,

    Claude: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,

    Perplexity: (p) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  };

  return map[name]?.(prompt) ?? "#";
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export function OpenTools({
  componentName,
  description,
  filePath,
  currentCode,
}: OpenToolsProps) {
  const prompt = generateComponentPrompt({
    componentName,
    description,
    filePath,
    code: currentCode,
  });

  return (
    <Dialog>
      <DialogTrigger asChild className="w-auto!">
        <Button
          variant="outline"
          disabled={!currentCode}
          className="relative group px-4! h-9! font-semibold tracking-wide flex items-center gap-2 uppercase shadow-none bg-card! dark:bg-muted! border-foreground/15! text-foreground/70! overflow-hidden"
        >
          <Zap className="size-4 group-hover:animate-[wiggle_0.6s_ease-in-out]" />
          <span>OPEN</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0! gap-0! [&>button]:hidden! overflow-hidden bg-white/20! backdrop-blur-xl rounded-xl! max-w-lg!">
        <DialogHeader className="p-3! pb-0!">
          <DialogTitle className="flex items-center gap-2 text-sm md:text-base font-semibold!">
            <Zap className="size-6" />
            <span>Open This Component In</span>
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={{ x: [0, 15, 0] }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <MoveRight className="size-5" />
            </motion.span>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-3 text-foreground w-full">
            <motion.div
              className="grid grid-cols-3 gap-2 p-4 rounded-lg bg-background overflow-hidden hover:shadow-xl transition-all duration-500"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {OPEN_TOOLS.map(({ name, icon }) => (
                <Link
                  key={name}
                  href={buildOpenToolUrl(name, prompt)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="flex items-center gap-2 p-5! bg-foreground! text-secondary! font-semibold! w-full">
                    <Image
                      src={icon}
                      alt={name}
                      width={500}
                      height={500}
                      priority
                      unoptimized
                      className={`size-6 rounded ${name === "Copilot" && "p-0.5 bg-black"}`}
                    />
                    <span>{name}</span>
                  </Button>
                </Link>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
