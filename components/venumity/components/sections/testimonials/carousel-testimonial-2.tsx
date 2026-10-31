"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  logo: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Aarav Sharma",
    role: "Founder",
    company: "Amazon",
    avatar: "https://i.pravatar.cc/100?img=12",
    logo: "https://www.google.com/s2/favicons?sz=64&domain=amazon.com",
    quote:
      "This component library made our UI development much faster. Everything feels consistent, modern, and easy to customize.",
  },
  {
    name: "Emily Chen",
    role: "Product Designer",
    company: "Apple",
    avatar: "https://i.pravatar.cc/100?img=5",
    logo: "https://www.google.com/s2/favicons?sz=64&domain=apple.com",
    quote:
      "We were able to prototype an entire product interface in just a few hours. The design system is clean and very flexible.",
  },
  {
    name: "Lucas Martinez",
    role: "Frontend Engineer",
    company: "Facebook",
    avatar: "https://i.pravatar.cc/100?img=32",
    logo: "https://www.google.com/s2/favicons?sz=64&domain=facebook.com",
    quote:
      "Integration with our Next.js project was seamless. The components look polished and save a lot of engineering time.",
  },
  {
    name: "Sara Ali",
    role: "Design Engineer",
    company: "Microsoft",
    avatar: "https://i.pravatar.cc/100?img=25",
    logo: "https://www.google.com/s2/favicons?sz=64&domain=microsoft.com",
    quote:
      "A great balance between usability and customization. Our team loves how smooth and responsive the components feel.",
  },
  {
    name: "Noah Williams",
    role: "Tech Lead",
    company: "Netflix",
    avatar: "https://i.pravatar.cc/100?img=15",
    logo: "https://www.google.com/s2/favicons?sz=64&domain=netflix.com",
    quote:
      "This UI toolkit helped us standardize our frontend quickly. The quality and attention to detail really stand out.",
  },
];

function MarqueeRow({
  items,
  direction = "left",
  duration = 40, // higher = slower
  className,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}) {
  // Direction factor for animation
  const fromX = direction === "left" ? "0%" : "-50%";
  const toX = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className={cn(
        "relative p-4 flex overflow-hidden mask-[linear-gradient(to_right,transparent,black,black,transparent)]",
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="flex shrink-0 gap-4"
        initial={{ x: fromX }}
        animate={{ x: toX }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration, // controls speed
        }}
      >
        {/* Duplicate list: [A B C A B C] so when it loops it never cuts in the middle */}
        {[...items, ...items].map((item, idx) => (
          <Card
            key={item.name + idx}
            className="py-0! min-w-65 max-w-xs sm:min-w-75 sm:max-w-sm rounded-xl border bg-card hover:shadow-lg/10 transition-all duration-500"
          >
            <div className="flex h-full flex-col gap-3 px-4 py-4 sm:px-5 sm:py-5 text-left">
              <Image
                src={item.logo}
                alt={item.company}
                width={500}
                height={500}
                className="size-8 object-cover"
              />

              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                “{item.quote}”
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="size-10 rounded-full object-cover border"
                />
                <div className="text-sm sm:text-base leading-tight">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}

export default function CarouselTestimonial2() {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8 mx-auto w-full">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Infinite stream of happy{" "}
            <span className="bg-linear-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
              customers
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Real teams using your components in production, scrolling by with
            subtle motion so the section feels alive without stealing focus.
          </p>
        </header>

        <div className="flex flex-col">
          <MarqueeRow
            items={testimonials}
            direction="left"
            duration={50} // very slow
          />
          <MarqueeRow items={testimonials} direction="right" duration={55} />
        </div>
      </div>
    </section>
  );
}
