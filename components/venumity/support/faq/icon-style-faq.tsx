"use client";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Gauge,
  Globe,
  Rocket,
  PenTool,
  Package,
  LayoutTemplate,
  MonitorSmartphone,
  MessageCircleMore,
} from "lucide-react";

const DATA = [
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

export default function IconStyleFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-5 md:gap-10 p-3 sm:p-5 md:p-10 m-auto max-w-4xl w-full">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-lg text-foreground/50">
          Find quick answers to common questions about our services and
          features.
        </p>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center w-full">
        {DATA.map((item, index) => {
          const IconComponent = item.icon;
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`relative group/faq bg-foreground/10 ${isOpen && "p-1"} cursor-pointer rounded-lg overflow-hidden transition-all duration-700 w-full`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`relative group flex items-start justify-between cursor-pointer ${isOpen ? "p-0.5 sm:p-1 pb-1.5 sm:pb-2" : "p-1.5 sm:p-2"} transition-all duration-700 w-full`}
              >
                <div className="flex items-center gap-2 sm:gap-3 pr-6 truncate min-w-0 w-fit">
                  <div className="bg-white text-black shadow-lg/10 p-2 sm:p-3 rounded-sm sm:rounded-md shrink-0">
                    <IconComponent className="size-4 sm:size-5" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium truncate min-w-0 w-fit">
                    {item.question}
                  </h3>
                </div>

                <ChevronUp
                  className={`absolute top-2 sm:top-4 right-2 sm:right-4 size-5 sm:size-6 text-foreground ${isOpen ? "rotate-y-180 rotate-x-180 opacity-100" : "opacity-30 group-hover:opacity-100"} transition-all duration-700`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      filter: "blur(15px)",
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      height: "auto",
                    }}
                    exit={{ opacity: 0, filter: "blur(15px)", height: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2,
                      }}
                      className="text-xs sm:text-sm md:text-base tracking-wider! text-foreground/60 py-2 sm:py-4 px-3 sm:px-5 bg-background rounded-md"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
