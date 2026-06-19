// app/creator/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Mail,
  Sparkles,
  FileText,
  Layers,
  Heart,
  ExternalLink,
  MapPin,
  Code2,
  PencilLine,
  ArrowRight,
} from "lucide-react";
import { username } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Creator – Venumity Ecosystem",
  description:
    "Meet the creator behind Venumity – a library of UI components, resources, and open source tools for modern web development.",
};

const ecosystemItems = [
  {
    icon: Layers,
    title: "UI Components",
    desc: "100+ reusable, copy-paste components crafted with Tailwind CSS and motion-friendly patterns.",
    href: "/components",
    highlight: true,
  },
  {
    icon: FileText,
    title: "Resources",
    desc: "Curated guides, cheat sheets, and practical learning material for modern frontend workflows.",
    href: "/resources",
  },
  {
    icon: Sparkles,
    title: "Open Source",
    desc: "MIT licensed projects built in public for developers who value speed, clarity, and customization.",
    href: "https://github.com/thevinayakgore",
  },
];

const projects = [
  {
    repo: "venumity/ui",
    desc: "The main component library",
    stars: "2.4k",
  },
  {
    repo: "venumity/resources",
    desc: "Curated guides and cheat sheets",
    stars: "1.2k",
  },
  {
    repo: "venumity/blog",
    desc: "Blog platform built with Next.js & Sanity",
    stars: "0.8k",
  },
];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/thevinayakgore",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:vinayak@venumity.com",
  },
  {
    icon: ExternalLink,
    label: "Twitter",
    href: "https://twitter.com/vgwritings",
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    href: "https://linkedin.com/in/vinayakgore",
  },
];

const stats = [
  {
    value: "100+",
    label: "reusable UI blocks",
  },
  {
    value: "MIT",
    label: "licensed open source",
  },
  {
    value: "Docs",
    label: "built for real workflows",
  },
];

export default function CreatorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16 lg:items-start">
            {/* Profile Card */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative mb-8">
                <div className="absolute -inset-1 bg-foreground/5 rounded-[32px]" />
                <div className="relative size-40 overflow-hidden rounded-[32px] border border-foreground/10 bg-foreground/5 shadow-lg md:size-48">
                  <Image
                    src="/vinu.jpg"
                    alt="Vinayak Gore"
                    width={2000}
                    height={2000}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-center lg:text-left">
                <div className="inline-flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/60">
                    <MapPin className="size-3.5" />
                    India
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/60">
                    <Code2 className="size-3.5" />
                    Developer
                  </span>
                </div>
                <div className="inline-flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/60">
                    <PencilLine className="size-3.5" />
                    Writer
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col justify-start">
              <div className="mb-6 inline-block w-fit">
                <div className="text-xs font-semibold uppercase tracking-widest text-foreground/50 border-b border-foreground/10 pb-3">
                  Creator of Venumity
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-3">
                Vinayak Gore
              </h1>

              <p className="text-lg text-foreground/40 mb-8 font-medium">
                @{username}
              </p>

              <p className="text-base md:text-lg leading-relaxed text-foreground/70 mb-8 max-w-2xl">
                I design and build open-source UI systems that developers
                actually want to use. Venumity is a curated ecosystem of
                components, resources, and tools designed for modern frontend
                teams who value quality, clarity, and customization.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/components"
                  className="inline-flex h-12 items-center justify-center px-6 rounded-full bg-foreground text-background font-medium text-sm transition-all duration-200 hover:bg-foreground/85 hover:shadow-lg active:scale-95"
                >
                  Explore Components
                  <ArrowRight className="ml-2 size-4" />
                </Link>

                <Link
                  href="/resources"
                  className="inline-flex h-12 items-center justify-center px-6 rounded-full border-2 border-foreground/15 text-foreground font-medium text-sm transition-all duration-200 hover:bg-foreground/5 hover:border-foreground/25"
                >
                  Browse Resources
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors duration-200"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-foreground/50 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-16 md:py-20 bg-foreground/5 border-y border-foreground/10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">
                About Me
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                Designing systems that scale
              </h2>
              <p className="text-base leading-8 text-foreground/70">
                I focus on creating clean, performant, and accessible interface
                systems. My work prioritizes developer experience—components
                that are intuitive to use, simple to customize, and
                production-ready out of the box.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-2xl border border-foreground/10 bg-background hover:shadow-md transition-all duration-200">
                <p className="text-sm leading-7 text-foreground/70">
                  Every component is crafted with attention to detail—smooth
                  interactions, thoughtful spacing, and designs that feel modern
                  without becoming difficult to understand or modify.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-foreground/10 bg-background hover:shadow-md transition-all duration-200">
                <p className="text-sm leading-7 text-foreground/70">
                  Beyond code, I document patterns, create tutorials, and share
                  learning in public. Venumity exists because useful tools
                  should be accessible, transparent, and genuinely helpful to
                  use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">
              Ecosystem
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              Everything you need to build faster
            </h2>
            <p className="text-base text-foreground/60 max-w-2xl">
              A cohesive toolkit of components, resources, and open-source
              projects designed to work together seamlessly.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
            {ecosystemItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  item.highlight
                    ? "bg-foreground text-background border-foreground shadow-md"
                    : "bg-background border-foreground/10 hover:bg-foreground/5"
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-6 ${
                    item.highlight
                      ? "bg-background/10"
                      : "bg-foreground/5 group-hover:bg-foreground/10"
                  } transition-colors duration-200`}
                >
                  <item.icon
                    className={`size-6 ${
                      item.highlight ? "text-background" : "text-foreground/70"
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    item.highlight ? "text-background" : "text-foreground"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm leading-6 mb-6 ${
                    item.highlight ? "text-background/80" : "text-foreground/65"
                  }`}
                >
                  {item.desc}
                </p>

                <div
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group-hover:gap-3 ${
                    item.highlight
                      ? "text-background/90"
                      : "text-foreground/70 group-hover:text-foreground"
                  }`}
                >
                  Explore
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="px-4 py-16 md:py-20 bg-foreground/5 border-y border-foreground/10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">
                Open Source
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                Built and shared in public
              </h2>
              <p className="text-base leading-8 text-foreground/70 mb-8">
                The Venumity ecosystem evolves through public development and
                real-world experimentation. Every project is MIT-licensed and
                designed for teams who want to own their tools.
              </p>
              <Link
                href="https://github.com/thevinayakgore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center px-5 rounded-full border-2 border-foreground/15 text-foreground font-medium text-sm transition-all duration-200 hover:bg-foreground/5 hover:border-foreground/25"
              >
                View on GitHub
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <a
                  key={project.repo}
                  href={`https://github.com/${project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border border-foreground/10 bg-background hover:bg-foreground/5 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-sm md:text-base group-hover:text-foreground/75 transition-colors">
                      {project.repo}
                    </p>
                    <p className="text-xs md:text-sm text-foreground/50 mt-1">
                      {project.desc}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-xs font-medium text-foreground/60 whitespace-nowrap">
                    <Heart className="size-3.5" />
                    {project.stars}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-foreground p-8 md:p-12 text-background">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-background/50 mb-4">
                  Connect & Follow
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Let&apos;s build together
                </h2>
                <p className="text-base leading-7 text-background/70 max-w-2xl">
                  I share open-source work, frontend ideas, technical writing,
                  and product experiments. Follow along or reach out to
                  collaborate.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto lg:justify-end">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 px-4 rounded-full border border-background/20 bg-background/5 text-background font-medium text-sm transition-all duration-200 hover:bg-background/15 hover:border-background/40 hover:shadow-lg"
                  >
                    <social.icon className="size-4" />
                    <span className="hidden sm:inline">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-16 md:py-20 text-center border-t border-foreground/10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to explore?
          </h2>
          <p className="text-base text-foreground/60 mb-8">
            Start with our component library or dive into the resources
            collection.
          </p>
          <Link
            href="/components"
            className="inline-flex h-12 items-center px-8 rounded-full bg-foreground text-background font-medium text-sm transition-all duration-200 hover:bg-foreground/85 hover:shadow-lg active:scale-95"
          >
            Explore Components
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
