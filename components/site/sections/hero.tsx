"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { WORDS, TEXT } from "@/registry/site/hero";
import {
  CategoryCard,
  getCategoryCards,
  type CategoryCard as CategoryCardType,
} from "@/app/components/page";
import { WordAnimate } from "@/components/ui/word-animate";
import { InfiniteMovingText } from "@/components/ui/infinite-moving-text";
import { Camera } from "@/components/utility/camera";
import { HeroMovingCards } from "@/components/ui/hero-moving-cards";
import { BorderBeam } from "@/components/ui/border-beam";

const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <motion.span
    key={text}
    className={className}
    initial="hidden"
    animate="show"
    exit="exit"
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.1 } },
      exit: {
        transition: { staggerChildren: 0.1, staggerDirection: -1 },
      },
    }}
  >
    {text.split("").map((char, i) => (
      <motion.span
        key={char + i}
        className="inline-block"
        variants={{
          hidden: {
            opacity: 0,
            filter: "blur(10px)",
            y: 30,
            rotate: 45,
            scale: 0,
          },
          show: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              delay: i * 0.1,
              type: "spring",
              damping: 10,
              stiffness: 150,
            },
          },
          exit: {
            opacity: 0,
            filter: "blur(10px)",
            y: -30,
            rotate: 45,
            scale: 0,
          },
        }}
      >
        {char}
      </motion.span>
    ))}
  </motion.span>
);

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [activeComponentIndex, setActiveComponentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [latestSubcategories, setLatestSubcategories] = useState<
    CategoryCardType[]
  >([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getLatestSubcategories = () => {
      const allCards = getCategoryCards();
      const latest = allCards.slice(0, 10);
      setLatestSubcategories(latest);
    };

    getLatestSubcategories();
  }, []);

  useEffect(() => {
    if (isHovered || latestSubcategories.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setActiveComponentIndex((prev) =>
        prev === latestSubcategories.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, latestSubcategories.length]);

  const currentSubcategory = latestSubcategories[activeComponentIndex];

  return (
    <main className="flex items-start justify-between pt-15 mt-3 pr-10 border-b border-foreground/10 overflow-hidden w-full max-h-190">
      <section className="flex flex-col items-start w-[70%]">
        <div className="flex flex-col items-start justify-start px-10 font-extrabold! w-full">
          <AnimatedText
            text={WORDS[currentWordIndex].prefix}
            className="dancing text-[17rem] leading-none"
          />

          <span className="orbitron uppercase mt-3 mb-7 text-[9rem] leading-40 opacity-30 text-transparent bg-clip-text bg-linear-to-b from-foreground via-foreground/40">
            Websites
          </span>

          <span className="kumarOne mt-2 relative text-9xl uppercase tracking-wide leading-none max-h-48!">
            <WordAnimate duration={7000} onWordChange={setCurrentWordIndex} />
          </span>
        </div>
        <InfiniteMovingText
          items={Array.from({ length: 3 }).flatMap(() => TEXT)}
          direction="left"
          speed="slow"
          className="bg-foreground/3 backdrop-blur-sm w-full h-15!"
        />
      </section>

      <section className="relative flex flex-col items-center z-50 mt-12 p-3 bg-zinc-800 rounded-[2.5rem] shadow-2xl w-[30%] h-180">
        <div className="flex flex-col items-center bg-background rounded-4xl overflow-hidden w-full h-full">
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50">
            <Camera />
          </div>
          <div className="w-full h-[45%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full flex flex-col items-center justify-center relative overflow-hidden"
            >
              <HeroMovingCards />
            </motion.div>
          </div>
          <div className="relative -mt-14 bg-zinc-500/15 rounded-t-4xl backdrop-blur-sm z-50! overflow-hidden w-full h-[55%]">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-foreground/20 rounded-full w-20 h-1.5 z-50" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 -z-10 flex flex-wrap items-center justify-center m-auto leading-none text-center  font-extrabold opacity-10 orbitron uppercase">
              <span className="text-7xl leading-none">Latest</span>
              <span className="text-4xl scale-115 -mt-1 mb-1">Components</span>
              <span className="text-4xl scale-135">of library</span>
            </div>
            <div className="aspect-video absolute -bottom-6 left-0 p-4 w-full">
              <motion.div
                key={activeComponentIndex}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{ y: latestSubcategories.length > 0 ? -50 : 0 }}
                exit={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="overflow-hidden rounded-xl w-full"
              >
                {currentSubcategory && (
                  <CategoryCard
                    card={currentSubcategory}
                    onClick={() => {
                      window.open(
                        `/components${currentSubcategory.path}`,
                        "_self",
                      );
                    }}
                  />
                )}
                <BorderBeam
                  size={100}
                  duration={3}
                  className="p-2 from-primary via-primary to-transparent"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute -left-1 top-40 bg-zinc-800 rounded-l-full h-17 w-1" />
        <div className="absolute -left-1 top-60 bg-zinc-800 rounded-l-full h-17 w-1" />
        <div className="absolute -right-1 top-45 bg-zinc-800 rounded-r-full h-17 w-1" />
      </section>
    </main>
  );
}
