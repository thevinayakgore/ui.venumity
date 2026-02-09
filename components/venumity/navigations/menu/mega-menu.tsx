"use client";
import { motion } from "framer-motion";
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
  Briefcase,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "design",
    name: "Design",
    icon: Palette,
    columns: 2,
    footer: {
      title: "Design with clarity",
      description: "Craft intuitive and accessible experiences",
      cta: "Explore",
    },
    items: [
      {
        title: "UI Design",
        description: "User interface design tools",
        icon: Layout,
      },
      {
        title: "UX Research",
        description: "User experience research methods",
        icon: Search,
      },
      {
        title: "Prototyping",
        description: "Interactive prototypes creation",
        icon: PenTool,
      },
      {
        title: "Design Systems",
        description: "Scalable UI systems",
        icon: Layers,
      },
      {
        title: "Visual Identity",
        description: "Brand visuals & assets",
        icon: Palette,
      },
      {
        title: "Wireframing",
        description: "Low-fidelity layouts",
        icon: Layout,
      },
      {
        title: "Motion Design",
        description: "UI animations & transitions",
        icon: PenTool,
      },
      {
        title: "Accessibility",
        description: "Inclusive design practices",
        icon: Layers,
      },
    ],
  },
  {
    id: "development",
    name: "Development",
    icon: Cpu,
    columns: 2,
    footer: {
      title: "Build with confidence",
      description: "Ship scalable and performant systems",
      cta: "View Tools",
    },
    items: [
      {
        title: "Frontend",
        description: "Client-side development",
        icon: Code2,
      },
      {
        title: "Backend",
        description: "Server-side development",
        icon: Server,
      },
      {
        title: "DevOps",
        description: "Development operations",
        icon: Cloud,
      },
      {
        title: "APIs",
        description: "REST & GraphQL services",
        icon: Server,
      },
      {
        title: "Testing",
        description: "Unit and integration tests",
        icon: Code2,
      },
      {
        title: "Architecture",
        description: "Scalable system design",
        icon: Cpu,
      },
      {
        title: "Performance",
        description: "Speed & optimization",
        icon: TrendingUp,
      },
      {
        title: "Security",
        description: "Auth & data protection",
        icon: Server,
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    columns: 2,
    footer: {
      title: "Grow your audience",
      description: "Reach, engage, and convert users",
      cta: "Boost Posts",
    },
    items: [
      {
        title: "SEO",
        description: "Search engine optimization",
        icon: Layers,
      },
      {
        title: "Content",
        description: "Content marketing strategies",
        icon: FileText,
      },
      {
        title: "Social Media",
        description: "Social media marketing",
        icon: Share2,
      },
      {
        title: "Email Marketing",
        description: "Campaigns & automation",
        icon: Share2,
      },
      {
        title: "Analytics",
        description: "Traffic & conversion insights",
        icon: TrendingUp,
      },
      {
        title: "Paid Ads",
        description: "Campaign management",
        icon: TrendingUp,
      },
      {
        title: "Brand Strategy",
        description: "Positioning & messaging",
        icon: Palette,
      },
      {
        title: "Community",
        description: "Audience engagement",
        icon: Share2,
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    columns: 1,
    items: [
      { title: "Strategy", description: "Business planning", icon: TrendingUp },
      {
        title: "Operations",
        description: "Process optimization",
        icon: Layers,
      },
      { title: "Finance", description: "Revenue & costs", icon: FileText },
      { title: "Legal", description: "Compliance & policies", icon: FileText },
    ],
  },
];

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.2, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1,
            delay: delay,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function MegaMenu() {
  return (
    <main className="flex items-center justify-center m-auto overflow-hidden w-full h-full">
      <Menubar className="py-6 px-1 bg-foreground/5 backdrop-blur-sm border border-foreground/15 shadow-none hover:shadow-lg/5 transition-all duration-500">
        {categories.map((category) => (
          <MenubarMenu key={category.id}>
            <MenubarTrigger className="gap-2 border border-transparent hover:border-foreground/15 cursor-pointer py-2 px-4 text-sm font-medium text-foreground/60 hover:bg-background hover:text-foreground data-[state=open]:text-foreground data-[state=open]:bg-background data-[state=open]:border-foreground/15">
              <category.icon className="size-4" />
              {category.name}
            </MenubarTrigger>

            <MenubarContent asChild className="min-w-fit! max-w-90!">
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                exit={{ opacity: 0, y: 6, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-2 shadow-lg w-full"
              >
                <motion.div
                  className={`grid p-1 grid-cols-${category.columns ?? 2}`}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {category.items.map((item, index) => (
                    <MenubarItem asChild key={item.title}>
                      <div className="flex items-start px-3 pr-5 py-2 group/item cursor-pointer text-sm text-foreground/50">
                        <item.icon className="size-4 mt-0.5 text-foreground/50 group-hover/item:text-foreground transition-all duration-500" />
                        <span className="font-medium">
                          <AnimatedText
                            key={`${item.title}-${index}`}
                            text={item.title}
                            delay={index * 0.5}
                          />
                        </span>
                      </div>
                    </MenubarItem>
                  ))}
                </motion.div>

                {category.footer && (
                  <>
                    <MenubarSeparator />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          <AnimatedText text={category.footer.title} />
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          <AnimatedText
                            text={category.footer.description}
                            delay={0.05}
                          />
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="p-4 text-xs rounded-sm cursor-pointer"
                        >
                          <AnimatedText
                            text={category.footer.cta}
                            delay={0.08}
                          />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </main>
  );
}
