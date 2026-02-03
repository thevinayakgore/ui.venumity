import Hero from "@/components/sections/hero";
import CTA from "@/components/sections/home-cta";
import FAQ from "./faq/page";

const page = () => {
  return (
    <>
      <main className="flex flex-col gap-32 pb-32 max-w-360 m-auto 2xl:border-x-2 border-dashed border-foreground/10 overflow-hidden! transform-gpu w-full">
        <Hero />
        <FAQ />
        <CTA />
      </main>
    </>
  );
};

export default page;
