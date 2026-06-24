// registry/site/faq.ts
import {
  BookOpen,
  FileText,
  Gauge,
  Globe,
  Layers,
  LayoutTemplate,
  MessageCircleMore,
  MonitorSmartphone,
  Package,
  PenTool,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

export type Category = {
  title: string;
  articles: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const CATEGORIES: Category[] = [
  {
    title: "UI Components",
    articles: "50+ Components",
    description:
      "Browse production-ready UI components, landing page sections, navigation systems, hero layouts, testimonials, pricing blocks, footers, and reusable interface patterns.",
    icon: Layers,
  },
  {
    title: "Animations & Interactive UI",
    articles: "Motion Blocks",
    description:
      "Explore Framer Motion powered components, micro-interactions, hover effects, animated sections, transitions, and engaging user experiences.",
    icon: Sparkles,
  },
  {
    title: "TypeScript & Modern Stack",
    articles: "Next.js Ready",
    description:
      "Built for Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Vite with type-safe implementations and scalable architecture patterns.",
    icon: FileText,
  },
  {
    title: "AI-Friendly Development",
    articles: "AI Optimized",
    description:
      "Use components seamlessly with ChatGPT, Claude, Gemini, V0, Lovable, GitHub Copilot, Replit, Windsurf, and other modern AI-assisted workflows.",
    icon: Zap,
  },
  {
    title: "Resources & Learning",
    articles: "Guides & Docs",
    description:
      "Access implementation guides, development resources, design inspiration, workflow improvements, and practical references for building modern interfaces.",
    icon: BookOpen,
  },
];

export const FAQ_DATA = [
  {
    icon: Globe,
    question: "What is Venumity UI?",
    answer:
      "Venumity UI is a modern component library featuring beautifully crafted UI components, sections, blocks, templates, and layouts designed for Next.js, React, Tailwind CSS, and modern web applications.",
  },
  {
    icon: Zap,
    question: "What can I find on Venumity UI?",
    answer:
      "You can discover reusable UI components, landing page sections, animations, navigation systems, hero sections, testimonials, pricing blocks, footers, interactive elements, and other production-ready interface components.",
  },
  {
    icon: LayoutTemplate,
    question: "Are all components open source?",
    answer:
      "Yes. Venumity UI focuses on free and open-source components that you can inspect, customize, learn from, and use in your own projects.",
  },
  {
    icon: Package,
    question: "Are the components reusable and customizable?",
    answer:
      "Absolutely. Every component is built to be reusable, responsive, customizable, and easy to integrate into Next.js, React, and Tailwind CSS projects.",
  },
  {
    icon: Rocket,
    question: "Who is Venumity UI built for?",
    answer:
      "Venumity UI is designed for developers, designers, freelancers, startups, agencies, and creators who want to build beautiful interfaces faster.",
  },
  {
    icon: MonitorSmartphone,
    question: "Are the components responsive?",
    answer:
      "Yes. Components and templates are designed with responsive layouts and adaptive design principles to work seamlessly across mobile, tablet, and desktop devices.",
  },
  {
    icon: PenTool,
    question: "Can I use Venumity UI for commercial projects?",
    answer:
      "Yes. The open-source components can be used in personal, freelance, startup, agency, and commercial projects according to the applicable license.",
  },
  {
    icon: Gauge,
    question: "Does Venumity UI focus on performance?",
    answer:
      "Performance is a key priority. Components are built with clean structures, optimized patterns, accessibility considerations, and scalable implementation practices.",
  },
  {
    icon: MessageCircleMore,
    question: "How often is Venumity UI updated?",
    answer:
      "New open-source components, sections, animations, improvements, and developer resources are added regularly to keep the library modern and useful.",
  },
];
