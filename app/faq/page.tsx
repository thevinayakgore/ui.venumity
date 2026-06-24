"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, Category, FAQ_DATA } from "@/registry/site/faq";
import Script from "next/script";

function CategoryCard({
  title,
  articles,
  description,
  icon: Icon,
  isOpen,
  onToggle,
}: Category & {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`relative group/cat bg-foreground/10 ${isOpen ? "p-1" : "p-0"} rounded-lg overflow-hidden transition-all duration-700 w-full`}
    >
      <Button
        type="button"
        onClick={onToggle}
        className={cn(
          "relative flex items-start justify-between text-start gap-3 w-full cursor-pointer rounded-lg transition-all duration-700",
          isOpen ? "p-1 pb-2 h-auto" : "p-2 h-auto",
          "bg-transparent! text-foreground!",
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex p-3 shrink-0 items-center justify-center rounded-md bg-white text-black shadow-lg/10">
            <Icon className="size-5" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <p className="truncate text-base">{title}</p>
            <p className="text-xs text-foreground/50">{articles}</p>
          </div>
        </div>

        <div className="absolute top-3 right-8 shrink-0 opacity-20 group-hover/cat:opacity-100 transition-all duration-700">
          <Minus
            className={`absolute inset-0 size-5 ${isOpen && "-rotate-180"} transition-all duration-700`}
          />
          <Minus
            className={`absolute inset-0 size-5 rotate-90 ${isOpen && "rotate-180"} transition-all duration-700`}
          />
        </div>
      </Button>

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
            exit={{
              opacity: 0,
              filter: "blur(15px)",
              height: 0,
            }}
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
              className="text-sm md:text-[0.85rem] tracking-wide! text-foreground/50 font-semibold py-4 px-5 bg-background rounded-md"
            >
              {description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <main id="faq" className="p-5 md:p-10 m-auto max-w-400 w-full">
        <div className="relative z-10 flex flex-col gap-5 md:gap-10 m-auto w-full">
          <section className="relative flex flex-col items-center justify-center m-auto gap-5 md:gap-10 p-5 md:p-10 lg:p-20 xl:p-30 text-white rounded-2xl overflow-hidden w-full">
            <motion.div
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,#f97316,#fb923c,#fdba74,#f59e0b,#facc15,#fde047,#84cc16,#22c55e,#14b8a6,#06b6d4,#3b82f6,#a855f7)] bg-size-[300%_300%]"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />

            <div className="flex flex-col items-center text-center">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="satisfy p-5 text-2xl md:text-4xl lg:text-6xl font-medium text-white text-shadow-lg"
              >
                Frequently Asked Questions
              </motion.h2>

              <p className="mt-5 max-w-3xl text-sm sm:text-base lg:text-lg font-semibold">
                Explore everything about Venumity UI from beautifully crafted
                components and modern layouts to customization, development
                workflow, integrations, and building stunning digital
                experiences faster.
              </p>
            </div>
          </section>

          <section className="flex items-start gap-3 w-full">
            <div className="flex flex-col gap-3 w-1/3">
              {CATEGORIES.map((category, index) => (
                <CategoryCard
                  key={category.title}
                  {...category}
                  isOpen={openCategoryIndex === index}
                  onToggle={() =>
                    setOpenCategoryIndex((prev) =>
                      prev === index ? null : index,
                    )
                  }
                />
              ))}
            </div>

            <section className="flex flex-col gap-3 items-center justify-center w-2/3">
              {FAQ_DATA.map((item, index) => {
                const IconComponent = item.icon;
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`relative group/faq bg-foreground/10 ${isOpen && "p-1"} cursor-pointer rounded-lg overflow-hidden transition-all duration-700 w-full`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`flex items-start justify-between cursor-pointer ${isOpen ? "p-1 pb-2" : "p-2"} transition-all duration-700 w-full`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white text-black shadow-lg/10 p-3 rounded-md shrink-0">
                          <IconComponent className="size-5" />
                        </div>
                        <h3 className="text-base md:text-lg font-medium">
                          {item.question}
                        </h3>
                      </div>

                      <div className="absolute top-4 right-10 shrink-0 opacity-20 group-hover/faq:opacity-100 transition-all duration-700">
                        <ChevronUp
                          className={`absolute inset-0 size-6 ${isOpen ? "rotate-y-180 rotate-x-180" : ""} transition-all duration-700`}
                        />
                      </div>
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
                            className="text-sm md:text-base tracking-wider! text-foreground/50 py-4 px-5 bg-background rounded-md"
                          >
                            {item.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </section>
          </section>
        </div>
      </main>
    </>
  );
}
