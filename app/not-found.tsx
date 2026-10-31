import Link from "next/link";
import Shimmer from "@/components/utility/shimmer";
import { insetButtonVariants } from "@/components/ui/inset-button";
import { Home, Layers, ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center m-auto p-5 md:p-10 overflow-hidden w-full h-full">
      <h1 className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/3 z-0 font-mono text-9xl scale-800 font-extrabold tracking-tighter leading-none text-primary">
        404
      </h1>
      <div className="aspect-video absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-center p-5 md:p-10 lg:p-15 bg-background/70 backdrop-blur-md inset-shadow-sm inset-shadow-primary/30 shadow-xl/10 rounded-4xl md:rounded-[2.5rem] overflow-hidden w-auto">
        <p className="text-5xl font-bold mb-5">Page Not Found</p>
        <p className="text-sm md:text-base opacity-70 font-medium max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 my-5 w-full">
          <Link
            href="/"
            className={insetButtonVariants(
              "relative group text-sm md:text-base shadow-lg/10 hover:shadow-lg/20 duration-500 rounded-lg overflow-hidden h-12",
              "lg",
            )}
          >
            <ArrowLeft className="size-4 md:size-5 group-hover:-translate-x-2 transition-all duration-500" />
            Go Back Home
            <Home className="size-4 md:size-5" />
            <Shimmer className="via-white/60 w-25" />
          </Link>
          <Link
            href="/components"
            className="inline-flex items-center gap-2.5 px-4 md:px-5 py-3 group text-sm md:text-base font-medium bg-blue-600 text-white inset-shadow-sm inset-shadow-white/60 shadow-lg/10 hover:shadow-lg/20 transition-all duration-500 rounded-lg"
          >
            <Layers className="size-4 md:size-5" />
            Components
            <ArrowRight className="size-4 md:size-5 group-hover:translate-x-2 transition-all duration-500" />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 bg-linear-to-t from-background via-background/60 to-transparent w-full h-full" />
    </div>
  );
}
