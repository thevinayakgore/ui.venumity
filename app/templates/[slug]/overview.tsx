// templates/[slug]/Overview.tsx
"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Fullscreen, CheckCircle } from "lucide-react";
import { TemplateData, TemplateFeature } from "@/registry/site/templates";
import { useState, useMemo } from "react";
import Image from "next/image";
import { formatDate } from "@/utils/format-date";

const PREVIEW_TAB = "preview";
const TUTORIAL_TAB = "tutorial";

export default function Overview({ template }: { template: TemplateData }) {
  const [activeTab, setActiveTab] = useState(PREVIEW_TAB);

  const tabs = useMemo(
    () => (template.videoFile ? [PREVIEW_TAB, TUTORIAL_TAB] : [PREVIEW_TAB]),
    [template.videoFile],
  );

  const isFree = template.price === 0;

  const activeTabClass = isFree ? "text-green-500" : "text-primary";
  const inactiveTabClass = isFree
    ? "text-foreground/70 hover:text-green-500"
    : "text-foreground/70 hover:text-primary";

  const mediaContent = useMemo(() => {
    if (activeTab === PREVIEW_TAB && template.videoFile) {
      return (
        <video
          muted
          loop
          autoPlay
          playsInline
          className="object-cover border rounded-md w-full h-full"
          poster={template.preview || "/card.png"}
          src={template.videoFile}
        />
      );
    }

    if (activeTab === TUTORIAL_TAB && template.videoId) {
      return (
        <iframe
          className="object-cover border rounded-md w-full h-full"
          src={`https://www.youtube.com/embed/${template.videoId}`}
          title={template.name}
          allowFullScreen
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center border rounded-md bg-muted">
        <Image
          src={template.preview || "/card.png"}
          alt={template.name}
          width={5000}
          height={5000}
          priority
          className="w-full h-full object-cover"
        />
      </div>
    );
  }, [activeTab, template]);

  return (
    <>
      <main className="w-full">
        {/* Header */}
        <section className="space-y-4 border-b border-foreground/15 pb-5 mb-5">
          <div className="flex items-start justify-between w-full">
            <h1 className="text-4xl truncate w-full">{template.name}</h1>
            <span className="text-xs text-end opacity-50 w-full">
              {formatDate(template.createdAt)}
            </span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground">
            {template.desc}
          </p>

          {/* Tech Stacks Used */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-3">
            {template.techs.map((tech, index) => (
              <div
                key={index}
                className="size-8 p-0.5 bg-muted/50 border rounded-[3px] overflow-hidden"
              >
                <Image
                  src={tech.icon}
                  alt={tech.icon.replace(/\.png$/i, "")}
                  width={200}
                  height={200}
                  className="object-contain rounded-[2px] w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-between w-full">
            <div className="flex items-center gap-3 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 font-semibold uppercase cursor-pointer transition-all duration-500 ${
                    activeTab === tab ? activeTabClass : inactiveTabClass
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
              <motion.span
                layout
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: 0.15,
                }}
                className={`absolute -bottom-5 -z-10 transform-gpu w-29 h-10 mb-5 border ${template.price === 0 ? "bg-green-500/10 border-green-500/50" : "bg-primary/10 border-primary/50"} leading-none rounded-sm`}
                style={{
                  left: activeTab === PREVIEW_TAB ? 0 : 129,
                }}
              />
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className={`absolute -bottom-6 w-29 h-1.5 rounded-full ${template.price === 0 ? "bg-green-500" : "bg-primary"}`}
                style={{
                  left:
                    activeTab === PREVIEW_TAB
                      ? 0
                      : template.videoFile
                        ? 129
                        : 0,
                }}
              />
            </div>
            <div className="inline-flex items-center justify-end gap-3 font-semibold whitespace-nowrap w-auto">
              {template.demoUrl && (
                <Link href={template.demoUrl} target="_blank">
                  <Button
                    variant="secondary"
                    size="lg"
                    className={`gap-2 cursor-pointer border bg-foreground/5 rounded group hover:shadow-lg ${template.price === 0 ? "hover:shadow-green-500/20" : "hover:shadow-primary/20"} transition-all duration-500`}
                  >
                    <Fullscreen className="size-4 group-hover:animate-[wiggle_0.6s_ease-in-out]" />
                    Live Demo
                  </Button>
                </Link>
              )}
              <Link
                href={template.buyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className={`relative cursor-pointer  group flex items-center gap-1 text-sm uppercase font-semibold hover:shadow-lg ${template.price === 0 ? "hover:bg-green-500 shadow-green-500/30" : "hover:bg-primary shadow-primary/30"} bg-foreground text-secondary rounded hover:text-white overflow-hidden transition-all duration-500`}
                >
                  <span className="vnm-shimmer-btn bg-linear-to-l from-transparent via-white/70! to-transparent absolute left-0 top-0 bottom-0 w-32 pointer-events-none opacity-0! group-hover:opacity-50!" />
                  <span className="text-lg leading-none">
                    ${template.price}
                  </span>{" "}
                  <span>Buy Now</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Video + Features */}
        <section className="grid grid-cols-3 items-stretch gap-3 px-3 bg-muted/50 border rounded-lg w-full h-full">
          {/* Left: Video Preview & YT Tutorial */}
          <div className="col-span-2 aspect-video w-full max-h-120 py-3 h-full">
            {mediaContent}
          </div>

          {/* Right: Features */}
          {template.features && (
            <div className="col-span-1 flex flex-col pt-3 max-h-120 h-full">
              {/* Fixed height container for scrolling features */}
              <div className="flex flex-col h-full overflow-hidden">
                <h2 className="shrink-0 p-3 text-2xl bg-background/60 backdrop-blur-sm border rounded-sm">
                  Features
                </h2>

                {/* Scrollable features list */}
                <div className="flex-1 overflow-auto py-3 h-full">
                  <ul className="space-y-3">
                    {template.features.map(
                      (f: TemplateFeature, index: number) => (
                        <li
                          key={index}
                          className="p-4 bg-background border rounded-sm flex flex-col gap-1 hover:shadow-lg hover:border-green-500/40 transition-all duration-500"
                        >
                          <div className="flex gap-2 items-center">
                            <CheckCircle className="text-green-500 size-4" />
                            <h3 className="font-medium">{f.title}</h3>
                          </div>

                          <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            {f.desc}
                          </p>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
