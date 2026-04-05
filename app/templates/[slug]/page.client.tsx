// templates/[slug]/page.client.tsx
"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CTASection from "@/components/site/sections/cta-section";
import Overview from "./overview";
import { TemplateData } from "@/registry/site/templates";
import Image from "next/image";

interface PageClientProps {
  template: TemplateData;
}

export default function PageClient({ template }: PageClientProps) {
  return (
    <main className="flex flex-col items-center justify-between m-auto max-w-360 px-5 md:px-10 py-15 md:py-20 2xl:border-x-2 border-dashed border-foreground/10 overflow-x-hidden w-full">
      <section className="flex items-center justify-between m-auto text-sm py-4 mb-5 border-b border-foreground/15 w-full">
        <Link
          href="/templates"
          className="flex items-center gap-2 group tracking-wider text-muted-foreground/80 hover:text-foreground transition-all duration-500"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-2 transition-all duration-500" />
          Back to Templates
        </Link>
        <div className="flex items-center justify-end uppercase gap-3">
          <div className="relative size-2">
            <span
              className={`absolute inset-0 ${template.price === 0 ? "bg-green-500" : "bg-primary"} scale-120 rounded-full animate-ping`}
            />
            <span
              className={`absolute inset-0 ${template.price === 0 ? "bg-green-500" : "bg-primary"} rounded-full`}
            />
          </div>
          <span>{template?.category}</span>
        </div>
      </section>

      {/* Overview Section */}
      <Overview template={template} />

      {/* Gallery */}
      {template.gallery && template.gallery.length > 0 && (
        <section className="grid grid-cols-2 gap-2 lg:gap-8 my-10 lg:mt-20 lg:mb-40">
          {template.gallery.map((imageUrl: string, idx: number) => (
            <div
              key={idx}
              className="aspect-video overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-500"
            >
              <Image
                src={imageUrl}
                alt={`${template.name} Preview ${idx + 1}`}
                width={5000}
                height={5000}
                priority
                quality={80}
                className="object-cover object-center w-full max-h-100 h-full"
              />
            </div>
          ))}
        </section>
      )}

      {/* CTA */}
      <CTASection />
    </main>
  );
}
