"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Script from "next/script";
import { mail } from "@/lib/brand";
import Shimmer from "@/components/utility/shimmer";
import { motion, AnimatePresence } from "motion/react";
import { Minus, ChevronUp, Mail, CheckCheck } from "lucide-react";
import { GRADIENT_ANIMATION } from "@/components/utility/gradient";
import { insetButtonVariants } from "@/components/ui/inset-button";
import { CATEGORIES, Category, FAQ_DATA } from "@/registry/site/faq";

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
      <button
        onClick={onToggle}
        className={`flex items-start justify-between cursor-pointer ${isOpen ? "p-0.5 pb-1.5 sm:pb-2" : "p-1.5"} transition-all duration-700 w-full`}
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className={insetButtonVariants(
              "relative size-11 overflow-hidden",
              "icon",
            )}
          >
            <Icon className="size-4 sm:size-5" />
            <Shimmer className="via-white/40" />
          </div>

          <div className="min-w-0 text-start font-medium">
            <p className="truncate text-sm sm:text-base">{title}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              {articles}
            </p>
          </div>
        </div>

        <div className="absolute top-1.5 sm:top-3 right-6 sm:right-8 shrink-0 opacity-20 group-hover/cat:opacity-100 transition-all duration-700">
          <Minus
            className={`absolute inset-0 size-4 sm:size-5 ${isOpen && "-rotate-180"} transition-all duration-700`}
          />
          <Minus
            className={`absolute inset-0 size-4 sm:size-5 rotate-90 ${isOpen && "rotate-180"} transition-all duration-700`}
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
              className="text-xs sm:text-sm font-medium tracking-wide! text-muted-foreground py-2 sm:py-4 px-3 sm:px-5 bg-background rounded-md"
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
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null,
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(mail);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <section
        id="faq"
        className="px-3 py-5 sm:px-5 md:p-10 lg:py-20 border-b w-full"
      >
        <div className="relative z-10 flex flex-col gap-5 md:gap-10 m-auto max-w-400 w-full">
          <section className="relative flex flex-col items-center justify-center m-auto gap-5 md:gap-10 p-5 md:p-10 lg:p-15 text-white selection:bg-primary! selection:text-white! rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden w-full">
            {/* Background Gradient Animation */}
            <motion.div
              className="absolute inset-0 -z-10 inset-shadow-sm inset-shadow-white/70 rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden w-full h-full"
              {...GRADIENT_ANIMATION}
            />

            <div className="flex flex-col items-center text-center font-medium">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="cinzel p-3 md:p-5 text-3xl md:text-5xl lg:text-6xl text-white font-semibold text-shadow-lg leading-snug max-w-2xl"
              >
                Any Questions ?
              </motion.h2>

              <p className="sm:mb-3 text-sm sm:text-base md:text-lg lg:text-xl text-shadow-lg/10 w-full md:max-w-3xl">
                Explore everything about Venumity UI from beautifully crafted
                components and modern layouts to customization, development
                workflow, integrations, and building stunning digital
                experiences faster.
              </p>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 p-1 pr-4 mt-5 bg-white text-black text-xs md:text-sm font-medium shadow-lg/10 rounded-full"
              >
                <div
                  className={cn(
                    "flex size-7 items-center justify-center text-white rounded-full",
                    isCopied ? "bg-green-500" : "bg-blue-500",
                  )}
                >
                  {isCopied ? (
                    <CheckCheck className="size-4" />
                  ) : (
                    <Mail className="size-4" />
                  )}
                </div>
                <span>{mail}</span>
              </button>
            </div>
          </section>

          <section className="flex flex-col lg:flex-row items-start gap-3 m-auto w-full max-w-5xl">
            <div className="hidden md:flex flex-col gap-3 w-full lg:w-[40%]">
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

            <section className="flex flex-col gap-3 items-center justify-center w-full lg:w-[60%]">
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
                      className={`flex items-start justify-between cursor-pointer ${isOpen ? "p-0.5 pb-1.5 sm:pb-2" : "p-1.5"} transition-all duration-700 w-full`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 pr-6 truncate min-w-0 w-fit">
                        <div
                          className={insetButtonVariants(
                            "relative size-11 overflow-hidden",
                            "icon",
                          )}
                        >
                          <IconComponent className="size-4 sm:size-5" />
                          <Shimmer className="via-white/40" />
                        </div>
                        <h3 className="text-base md:text-lg font-medium truncate min-w-0 w-fit">
                          {item.question}
                        </h3>
                      </div>

                      <div className="absolute top-2 sm:top-4 right-8 sm:right-10 shrink-0 opacity-20 group-hover/faq:opacity-100 transition-all duration-700">
                        <ChevronUp
                          className={`absolute inset-0 size-5 sm:size-6 ${isOpen ? "rotate-y-180 rotate-x-180" : ""} transition-all duration-700`}
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
                            className="text-xs sm:text-sm md:text-base font-medium py-2 sm:py-4 px-3 sm:px-5 bg-background text-muted-foreground rounded-md"
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
      </section>
    </>
  );
}
