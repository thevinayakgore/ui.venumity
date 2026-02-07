"use client";
import Image from "next/image";
import {
  ArrowUpRight,
  Disc,
  SquareArrowUpRight,
  StepBack,
  StepForward,
} from "lucide-react";
import { brandName } from "@/lib/brand";
import { Camera } from "@/components/utility/camera";
import { GridLineHorizontal, GridLineVertical } from "@/components/utility/grid-lines";

export function BrandSticker({ scale }: { scale?: string }) {
  return (
    <div
      className={`p-1.5 bg-white inset-shadow-sm inset-shadow-black/30 ${scale} rounded-md`}
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={1000}
        height={1000}
        priority
        className="size-8"
      />
    </div>
  );
}

export default function MiniDocs() {
  return (
    <main className="relative flex flex-col items-center justify-center m-auto px-10 border-b border-dashed border-foreground/15 overflow-hidden w-full h-full">
      <h1 className="absolute -top-10 left-1/2 -translate-x-1/2 text-center text-[20rem]  uppercase tracking-wide whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-linear-to-b from-foreground/15 via-foreground/5 leading-none">
        Preview
      </h1>
      <section className="relative flex flex-col items-center justify-center m-auto gap-10 mt-60 w-full h-full">
        <div className="flex items-start justify-start m-auto gap-20 w-full h-160">
          <div className="bg-orange-400 rounded-lg shadow-xl p-3 ml-5 z-60 w-[20%] h-[42%]">
            <div className="flex items-start justify-start m-auto gap-10 p-2 mb-4 bg-white text-black rounded-lg w-full h-1/4">
              Hi
            </div>
            <div className="flex items-start justify-start m-auto gap-10 rounded-lg shadow-lg overflow-hidden w-full h-[45%]">
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <section className="flex flex-col items-center justify-center m-auto z-60 w-[70%] h-full">
            <div className="relative p-4 bg-orange-100 rounded-t-lg w-full h-full">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 scale-40 z-50">
                <Camera />
              </div>
              <div className="relative flex flex-col items-center m-auto p-3 border border-black overflow-hidden w-full h-full">
                <nav className="sticky top-0 flex items-center justify-between z-10 px-3 py-2 bg-white/10 text-white border-2 border-white/40 backdrop-blur-xl rounded w-full">
                  <span className="text-lg leading-none font-light">
                    Next.js Guide
                  </span>
                  <button className="cursor-pointer size-5 hover:text-primary transition-all duration-500">
                    <SquareArrowUpRight className="w-full h-full" />
                  </button>
                </nav>
                <video
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 z-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 text-foreground/80 bg-white/10 backdrop-blur-md border-2 border-white/50 shadow-xl rounded-full w-auto">
                  <button className="cursor-pointer size-8 p-1.5 bg-white/10 backdrop-blur-sm hover:bg-primary text-white/70 hover:text-white border border-white/60 shadow-lg hover:border-primary hover:-rotate-12 hover:scale-110 rounded-full transition-all duration-500">
                    <StepBack className="w-full h-full" />
                  </button>
                  <button className="cursor-pointer size-8 p-1.5 bg-white/10 backdrop-blur-sm hover:bg-primary text-white/70 hover:text-white border border-white/60 shadow-lg hover:border-primary hover:rotate-12 hover:scale-110 rounded-full transition-all duration-500">
                    <StepForward className="w-full h-full" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center m-auto uppercase gap-3 p-6 bg-orange-400 rounded-b-lg w-full">
              <BrandSticker />
              <span className="sarpanch text-lg  font-medium text-white tracking-normal leading-none">
                {brandName}
              </span>
            </div>
            <div className="flex flex-col items-center justify-between m-auto w-30 h-fit">
              <div className="flex items-start justify-center m-auto bg-linear-to-b from-orange-500 via-orange-400 to-orange-400 w-24 h-20" />
              <div className="bg-linear-to-b from-orange-500 to-orange-400 rounded h-4 w-full" />
            </div>
          </section>
        </div>
        <div className="relative flex items-start justify-between m-auto gap-10 w-full h-160">
          <div className="absolute -left-1/4 p-3 bg-orange-400 transform-gpu rounded-3xl shadow-2xl/40 -translate-y-60 translate-x-1/3 rotate-z-40 z-60 w-[30%] h-full" />
          <section className="p-3 bg-orange-400 transform-gpu rounded-3xl -translate-y-1/2 translate-x-1/3 z-70 shadow-2xl/40 w-[30%] h-full">
            <div className="relative flex flex-col items-start justify-between bg-background shadow-lg/5 overflow-auto rounded-xl w-full h-full">
              <div className="absolute top-2 left-1/2 -translate-x-1/2">
                <Camera />
              </div>
              <div className="flex flex-col items-start justify-start gap-5 p-4 pb-16 m-auto overflow-auto w-full h-full max-h-160">
                <h1 className="text-2xl font-medium">Guides</h1>
                <video
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="shadow-lg rounded-md"
                />
                <p className="text-sm leading-relaxed tracking-widest opacity-80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque, facere hic non natus optio.
                </p>
                <p className="text-sm leading-relaxed tracking-widest opacity-80">
                  Lorem ipsum dolor sit amet conseccta, reiciendis minima,
                  excepturi id suscipit, reiciendis minima, excepturi id
                  suscipit.
                </p>
                <div className="flex flex-col items-center justify-center m-auto w-full h-auto">
                  <button className="relative flex items-start justify-between overflow-hidden group py-2 px-5 cursor-pointer inset-shadow-sm inset-shadow-foreground/10 border border-foreground/15 rounded-sm w-auto hover:w-full transition-all duration-700">
                    <span>Read More</span>
                    <ArrowUpRight className="absolute -top-10 -right-10 group-hover:top-2 group-hover:right-3 size-5! transition-all duration-300" />
                  </button>
                  <p className="text-[0.65rem] text-center  font-normal opacity-40 mt-3 w-full">
                    These materials are just for refrences !
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 z-10 flex items-center justify-between m-auto bg-muted-foreground/7 px-10 py-4 text-muted-foreground/60 border-t border-foreground/5 w-full">
                <StepBack className="size-5 cursor-pointer hover:text-foreground transition-all duration-500" />
                <Disc className="size-5 cursor-pointer hover:text-foreground transition-all duration-500" />
                <StepForward className="size-5 cursor-pointer hover:text-foreground transition-all duration-500" />
              </div>
            </div>
          </section>
          <div className="absolute -bottom-[67%] left-5 -z-10 bg-orange-400 rounded-4xl shadow-2xl/30 p-5 mt-16 w-200 h-160" />
          <div className="relative bg-orange-400 rounded-4xl shadow-2xl/30 p-5 mt-16 mr-5 w-[50%] h-180">
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 scale-50">
              <Camera />
            </div>
            <div className="bg-background rounded-2xl overflow-hidden w-full h-full">
              <video
                src="/video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Grid Lines */}
        <div>
          <GridLineHorizontal className="-top-14 -left-40 min-w-420" />
          <GridLineVertical className="-top-30 left-[25%] max-h-125" />
          <GridLineHorizontal className="top-[23%] left-0 max-w-110" />
          <GridLineVertical className="top-[18%] left-20 max-h-220" />
          <GridLineHorizontal className="bottom-[22.5%] left-5 max-w-160" />
          <GridLineVertical className="top-[46%] left-[44%] max-h-120" />
          <GridLineHorizontal className="bottom-[49%] left-[39%] max-w-240" />
        </div>
      </section>
    </main>
  );
}
