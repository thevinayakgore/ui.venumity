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

export const OPEN_TOOL_LINKS = [
  {
    name: "V0",
    icon: "https://v0.app/assets/icon.svg",
    buildUrl: (prompt: string) =>
      `https://v0.app/chat?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Lovable",
    icon: "https://lovable.dev/favicon.ico",
    buildUrl: (prompt: string) =>
      `https://lovable.dev/chat?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "ChatGPT",
    icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png",
    buildUrl: (prompt: string) =>
      `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Claude",
    icon: "https://claude.ai/favicon.ico",
    buildUrl: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Gemini",
    icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg",
    buildUrl: (prompt: string) =>
      `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Perplexity",
    icon: "https://www.perplexity.ai/favicon.ico",
    buildUrl: (prompt: string) =>
      `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Copilot",
    icon: "https://github.com/favicons/favicon-copilot-dark.png",
    buildUrl: () => "https://github.com/copilot",
  },
  {
    name: "Windsurf",
    icon: "https://windsurf.ai/favicon.ico",
    buildUrl: (prompt: string) =>
      `https://windsurf.ai/?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "Replit",
    icon: "https://replit.com/public/icons/favicon-prompt-192.png",
    buildUrl: (prompt: string) =>
      `https://replit.com/search?q=${encodeURIComponent(prompt)}`,
  },
];

export function generateComponentPrompt({
  componentName,
  description,
  dependencies = [],
  filePath,
}: {
  componentName: string;
  description: string;
  dependencies?: string[];
  filePath: string;
}) {
  return `
You are given a task to integrate a React component into your codebase.

Please verify your project has :
- Next.js App Router
- TypeScript
- Tailwind CSS

Component details :
- Name : ${componentName}
- Description : ${description}
- File location : ${filePath}

Dependencies:
${dependencies.map((d) => `- ${d}`).join("\n")}

Instructions :
1. Verify project setup
2. Create missing files if required
3. Paste the component code
4. Explain integration steps briefly

Return only actionable steps and code.
`.trim();
}

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

        <DialogContent className="p-0 gap-0 overflow-hidden text-white bg-white/10! backdrop-blur-xl border-white/20 rounded-md! max-w-xl!">
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
                className="grid grid-cols-3 gap-5 p-6 rounded-md bg-background overflow-hidden hover:shadow-xl transition-all duration-500"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {OPEN_TOOL_LINKS.map(({ name, icon, buildUrl }) => (
                  <motion.div
                    key={name}
                    variants={itemVariants}
                    className="hover:scale-110 transition-all duration-500"
                  >
                    <Link
                      href={buildUrl(prompt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-3 p-6! border-foreground/10! hover:border-green-500/70! bg-muted/30 hover:bg-linear-to-tl from-green-500/30 hover:shadow-lg shadow-green-500/20 via-background duration-100 rounded cursor-pointer w-full"
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
