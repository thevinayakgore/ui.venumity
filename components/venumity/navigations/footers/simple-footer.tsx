"use client";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Components", href: "/components" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Guides", href: "/guides" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Community", href: "/community" },
  ],
  legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "License", href: "/legal/license" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
};

export default function SimpleFooter() {
  return (
    <div className="p-5 md:p-10 w-full">
      <footer className="relative p-5 border-5 border-background text-white ring-8 ring-foreground/10 rounded-[2rem] overflow-hidden w-full h-fit">
        <div className="relative z-20 grid grid-cols-2 md:grid-cols-6 gap-5 md:gap-10 p-5 md:p-10 w-full h-full">
          {/* Brand + Newsletter */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 border-2 border-white rounded-md overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Venumity UI"
                  width={500}
                  height={500}
                  priority
                  unoptimized
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-3xl md:text-4xl font-semibold tracking-tight">
                Venumity
              </span>
            </div>

            <p className="text-sm tracking-wide leading-relaxed max-w-xs">
              Beautifully crafted components and templates for modern SaaS
              products . Built with Next.js, React, and Tailwind CSS.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <p className="text-base md:text-lg opacity-50 font-semibold">
              Product
            </p>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="text-base md:text-lg opacity-50 font-semibold">
              Company
            </p>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <p className="text-base md:text-lg opacity-50 font-semibold">
              Resources
            </p>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Status */}
          <div className="space-y-3">
            <p className="text-base md:text-lg opacity-50 font-semibold">
              Legal
            </p>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-20 mt-5 md:mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs bg-white text-black p-5 shadow-lg/10 rounded-xl overflow-hidden w-full h-fit">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Venumity</span>
            <Separator
              orientation="vertical"
              className="mx-2 h-5 bg-black/30"
            />
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-1">
            Building in public at
            <Link
              href="https://github.com/thevinayakgore/ui.venumity"
              target="_blank"
              className="text-primary"
            >
              @thevinayakgore
            </Link>
          </div>
        </div>

        <Image
          src="/bg2.jpg"
          alt="Gradient Bg"
          width={2000}
          height={2000}
          priority
          unoptimized
          loading="eager"
          className="absolute inset-0 z-0 -rotate-180 object-cover w-full h-full"
        />
      </footer>
    </div>
  );
}
