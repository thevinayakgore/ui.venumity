// components/site/sections/primitives.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPrimitiveCards } from "@/lib/library-cards";
import { CategoryCard } from "@/app/components/page.client";

export default function Primitives() {
  const router = useRouter();
  const PRIMITIVE_DATA = getPrimitiveCards();

  const handlePrimitiveClick = (path: string) => {
    router.push(path);
  };

  return (
    <section className="flex flex-col items-center justify-center m-auto px-3 py-5 sm:px-5 md:p-10 lg:py-20 gap-5 md:gap-10 lg:gap-20 border-b w-full">
      <header className="flex flex-col items-center justify-center m-auto gap-1 md:gap-5 w-fit">
        <p className="tracking-tight text-center text-3xl md:text-4xl lg:text-5xl">
          Reusable
        </p>
        <p className="cinzel tracking-wide text-5xl md:text-7xl lg:text-9xl font-semibold text-transparent bg-clip-text bg-linear-to-br from-foreground/5 via-foreground/90 to-foreground/5 pb-2 w-fit">
          Minier
        </p>
        <p className="text-center text-sm md:text-base lg:text-lg text-muted-foreground max-w-3xl">
          Fundamental primitives like buttons, badges, inputs, and more. Copy
          and paste into your project. Explore and Do share your own blocks with
          the community.
        </p>
        <div className="group relative flex items-center justify-center mt-5 md:mt-10">
          <div className="pointer-events-none absolute right-0 top-0 flex min-h-10 items-start justify-center rounded-t-xl bg-foreground text-secondary px-3 py-1 text-[0.8em] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:-translate-y-7 group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:animate-hue group-active:translate-y-0 group-active:scale-50">
            🎲 Reusable
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 flex min-h-10 items-end justify-center rounded-b-xl bg-violet-500 text-white px-3 py-1 text-[0.8em] font-semibold opacity-0 transition-all duration-300 ease-out group-hover:translate-y-7 group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:animate-hue group-active:translate-y-0 group-active:scale-50">
            🎨 Mini Blocks
          </div>

          <Link
            target="_blank"
            href="/primitives"
            aria-label="Venumity UI ClI"
            className="relative flex px-8 py-3.5 items-center justify-center rounded-xl bg-primary border border-foreground/15 shadow-lg/10 group-hover:shadow-none inset-shadow-sm inset-shadow-white/60 transition-all duration-300 ease-[cubic-bezier(0,0,0,2.5)] group-hover:scale-105 group-active:scale-95"
          >
            <span className="inline-block bg-white bg-clip-text text-xl font-semibold text-transparent drop-shadow-[0_1px_0_#ffffff66] transition-all duration-300 ease-[cubic-bezier(0,0,0,2.5)] [-webkit-text-fill-color:transparent] group-hover:scale-105 group-hover:drop-shadow-[0_1px_0_#ffffff66,0_-1px_0_#00000099,0_6px_2px_#0000004d] group-active:scale-100 group-active:drop-shadow-[0_1px_0_#ffffff66,0_-1px_0_#00000099,0_6px_2px_#00000066]">
              Newly Added
            </span>
          </Link>
        </div>
      </header>

      {PRIMITIVE_DATA.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-400 w-full">
          {PRIMITIVE_DATA.slice(0, 12).map((card) => (
            <CategoryCard
              key={card.id}
              card={card}
              onClick={handlePrimitiveClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}
