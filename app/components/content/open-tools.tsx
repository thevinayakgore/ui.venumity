"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, easeIn } from "motion/react";
import { MoveRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 500,
    x: -500,
    scale: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: easeIn,
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
    <>
      <Dialog>
        <DialogTrigger asChild className="w-auto!">
          <Button
            size="sm"
            variant="outline"
            disabled={!currentCode}
            className="relative group cursor-pointer flex items-center gap-2 uppercase bg-background! text-foreground/60 hover:text-foreground rounded-sm overflow-hidden"
          >
            <span
              aria-hidden
              className="vnm-shimmer-btn group bg-linear-to-l from-transparent via-zinc-300/70 to-transparent absolute left-0 top-0 bottom-0 w-20 pointer-events-none opacity-0! group-hover:opacity-50!"
            />
            <Zap className="size-4 group-hover:animate-[wiggle_0.6s_ease-in-out]" />
            <span>OPEN</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0 gap-0 overflow-hidden text-white bg-white/10! backdrop-blur-xl border-white/20 rounded-xl! max-w-lg!">
          <DialogHeader className="pt-5 pb-3 px-6!">
            <DialogTitle className="flex items-center gap-3 font-normal">
              <Zap className="size-5" />
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
            <div className="p-4 pt-2  font-medium text-foreground w-full">
              <motion.div
                className="grid grid-cols-3 gap-3 p-6 rounded-lg bg-background overflow-hidden hover:shadow-xl transition-all duration-500"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {OPEN_TOOLS.map(({ name, icon }) => (
                  <motion.div
                    key={name}
                    variants={itemVariants}
                    className="hover:scale-110 transition-all duration-500"
                  >
                    <Link
                      href={buildOpenToolUrl(name, prompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-3 p-6! border-foreground/10! hover:border-green-500/70! bg-muted/30 hover:bg-linear-to-tl from-green-500/30 shadow-none hover:shadow-lg shadow-green-500/20 via-background duration-100 rounded-sm cursor-pointer w-full"
                      >
                        <Image
                          src={icon}
                          alt={name}
                          width={500}
                          height={500}
                          priority
                          className={`size-6 rounded ${name === "Copilot" && "p-0.5 bg-black"}`}
                        />
                        <span className="text-sm font-medium">{name}</span>
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
