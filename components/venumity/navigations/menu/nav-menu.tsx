"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Palette,
  Layout,
  Cpu,
  PenTool,
  Search,
  Layers,
  Code2,
  Server,
  Cloud,
  TrendingUp,
  FileText,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "design",
    name: "Design",
    icon: Palette,
    featured: {
      card: {
        href: "/author/blogpost",
        image: "/vinu.jpg",
        title: "Vinayak Gore",
        subtitle: "Author of Venumity",
      },
      links: [
        {
          href: "/developers/learnings",
          title: "Learnings",
          description:
            "Learn about Venzdev, its philosophy, and how it helps you build modern web apps efficiently.",
        },
        {
          href: "/developers/challenges",
          title: "Challenges",
          description:
            "Step-by-step guide to installing Venzdev and setting up your development environment.",
        },
        {
          href: "/developers/compete",
          title: "Compete",
          description:
            "Explore the typography system, including headings, paragraphs, and list styles for consistent UI.",
        },
      ],
    },
    items: [
      {
        title: "UI Design",
        description: "User interface design tools",
        icon: Layout,
        href: "/design/ui",
      },
      {
        title: "UX Research",
        description: "User experience research methods",
        icon: Search,
        href: "/design/ux-research",
      },
      {
        title: "Prototyping",
        description: "Interactive prototypes creation",
        icon: PenTool,
        href: "/design/prototyping",
      },
    ],
  },
  {
    id: "development",
    name: "Development",
    icon: Cpu,
    items: [
      {
        title: "Frontend",
        description:
          "Build interactive user interfaces using modern frameworks and components.",
        icon: Code2,
        href: "/development/frontend",
      },
      {
        title: "Backend",
        description:
          "Create reliable server-side systems, APIs, and databases.",
        icon: Server,
        href: "/development/backend",
      },
      {
        title: "DevOps",
        description: "Automate deployments and manage infrastructure reliably.",
        icon: Cloud,
        href: "/development/devops",
      },
      {
        title: "Architecture",
        description:
          "Plan scalable system architectures, choose the right patterns, and design maintainable foundations for long‑term growth.",
        icon: Cpu,
        href: "/development/architecture",
      },
      {
        title: "Testing",
        description:
          "Write unit, integration, and end‑to‑end tests to ensure reliability, prevent regressions, and improve code quality.",
        icon: Code2,
        href: "/development/testing",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    items: [
      {
        title: "SEO",
        description: "Improve search visibility and organic traffic.",
        icon: Layers,
        href: "/marketing/seo",
      },
      {
        title: "Content",
        description: "Create engaging content for users and products.",
        icon: FileText,
        href: "/marketing/content",
      },
      {
        title: "Social Media",
        description: "Grow and engage audiences on social platforms.",
        icon: Share2,
        href: "/marketing/social",
      },
      {
        title: "Email Marketing",
        description:
          "Design personalized email campaigns, automate workflows, and nurture leads through targeted messaging.",
        icon: Share2,
        href: "/marketing/email",
      },
      {
        title: "Analytics",
        description:
          "Track performance metrics, understand user behavior, and make data‑driven marketing decisions.",
        icon: TrendingUp,
        href: "/marketing/analytics",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function NavMenu() {
  return (
    <main className="relative flex items-start justify-center m-auto overflow-auto p-6 md:p-10 w-full min-h-screen h-full">
      <nav className="absolute top-10 left-1/2 -translate-x-1/2">
        <NavigationMenu>
          <NavigationMenuList
            className="p-1.5 bg-foreground/5 backdrop-blur-sm rounded-md border border-foreground/15
            shadow-none hover:shadow-lg/5 transition-all duration-500"
          >
            {categories.map((category) => (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuTrigger className="group gap-2 bg-transparent border border-transparent cursor-pointer h-10 px-5 text-sm font-medium text-foreground/60 hover:bg-background hover:text-foreground hover:border-foreground/15 data-[state=open]:text-foreground data-[state=open]:bg-background! data-[state=open]:border-foreground/15 [&_svg]:size-4! rounded-sm transition-all duration-500">
                  <category.icon className="size-4" />
                  {category.name}
                </NavigationMenuTrigger>

                <NavigationMenuContent asChild className="group-data-[viewport=false]/navigation-menu:border-none! transform-gpu bg-foreground/5 dark:bg-transparent! backdrop-blur-sm rounded-lg overflow-hidden min-w-125">
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 300,
                      y: 300,
                      filter: "blur(10px)",
                    }}
                    animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="min-w-115 w-full"
                  >
                    <div className="flex gap-2 w-full">
                      {category.featured?.card && (
                        <NavigationMenuLink asChild>
                          <Link
                            href={category.featured.card.href}
                            className="relative flex flex-col justify-end bg-background rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-500 w-full"
                          >
                            <Image
                              src={category.featured.card.image}
                              alt={category.featured.card.title}
                              width={1000}
                              height={1000}
                              priority
                              className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 " />
                            <div className="relative z-10 p-2">
                              <span className="text-base font-semibold text-white block">
                                {category.featured.card.title}
                              </span>
                              <span className="text-xs text-white/80 block">
                                {category.featured.card.subtitle}
                              </span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      )}

                      {category.featured?.card && (
                        <div className="flex flex-col gap-2 w-full h-full">
                          {category.items.map((item) => (
                            <NavigationMenuLink
                              asChild
                              key={item.title}
                              className="w-full"
                            >
                              <Link
                                href={item.href}
                                className="group flex flex-col items-start gap-3 px-3 pr-5 py-2 cursor-pointer text-sm text-foreground/50 transition-all duration-500 bg-background border border-foreground/15 hover:text-foreground w-full"
                              >
                                <div className="flex items-center gap-2">
                                  <item.icon className="size-4 text-foreground/50 group-hover:text-foreground transition-all duration-500" />
                                  <h4 className="font-medium leading-none">
                                    {item.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      )}
                    </div>

                    {!category.featured?.card && (
                      <motion.div
                        className="columns-1 sm:columns-2 gap-2 space-y-2 w-full h-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {category.items.map((item) => (
                          <NavigationMenuLink asChild key={item.title}>
                            <Link
                              href={item.href}
                              className="group flex flex-col items-start gap-3 px-3 pr-5 py-2 cursor-pointer text-sm text-foreground/50 transition-all duration-500 bg-background border border-foreground/15 hover:text-foreground w-full h-fit"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon className="size-4 text-foreground/50 group-hover:text-foreground transition-all duration-500" />
                                <h4 className="font-medium leading-none">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="mt-3 py-2 px-3 bg-background border border-foreground/15 rounded-sm flex items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium">Need help choosing ?</h4>
                        <p className="text-sm text-muted-foreground">
                          Our experts can guide you
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-4 cursor-pointer text-xs rounded-sm"
                      >
                        Contact Sales
                      </Button>
                    </motion.div>
                  </motion.div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </main>
  );
}
