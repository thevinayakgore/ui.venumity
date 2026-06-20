// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { website } from "@/lib/brand";
import Footer from "@/components/site/navigations/footer";
import MainLayout from "./mainlayout";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/components/site/navigations/search";
import { COMPONENTS } from "@/registry/components";
import { toKebabCase } from "@/utils/slug-kebab";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = website || "https://ui.venumity.com";
  const categories = COMPONENTS.map((cat) => cat.name).join(", ");
  const subcategoryNames = COMPONENTS.flatMap((cat) =>
    cat.subcategories.map((sub) => sub.name),
  );
  const componentItems = COMPONENTS.flatMap((cat) =>
    cat.subcategories.flatMap((sub) => sub.items.map((item) => item.itemName)),
  );

  const description = `Venumity UI: free, open-source React & Next.js components. ${COMPONENTS.length} categories, ${subcategoryNames.length} subcategories, ${componentItems.length} components. Includes ${categories}. Built with Tailwind CSS, shadcn/ui, and Framer Motion. Copy-paste ready, MIT licensed.`;

  // Generate thumbnail URLs for the first 10 component items as OG images
  const ogImages = componentItems.slice(0, 20).map((itemName) => {
    const slug = toKebabCase(itemName); // ← proper kebab-case
    return {
      url: `${baseUrl}/thumbnails/${slug}.png`,
      width: 1200,
      height: 630,
      alt: `${itemName} component preview`,
    };
  });

  return {
    metadataBase: new URL(baseUrl),
    title: "Venumity UI",
    description,
    keywords: [
      "Venumity UI",
      "open source UI",
      "React components",
      "Next.js components",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "MIT license",
      "copy paste components",
      ...categories.split(", "),
      ...subcategoryNames,
      ...componentItems.slice(0, 20),
    ],
    authors: [{ name: "Venumity" }],
    creator: "Venumity",
    publisher: "Venumity",
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      url: baseUrl,
      title: "Venumity UI – Beautiful React Next.js Components",
      description,
      siteName: "Venumity UI",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: "Venumity UI – Free Open Source React Components",
      description,
      images: ogImages.map((img) => img.url),
      creator: "@thevinayakgore",
    },
    alternates: { canonical: baseUrl },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
      other: {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      },
    },
    other: {
      "application-name": "Venumity UI",
      "apple-mobile-web-app-capable": "yes",
      "mobile-web-app-capable": "yes",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn("font-sans", manrope.variable)}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-medium antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SearchProvider>
              <MainLayout>
                <Toaster />
                <Analytics />
                <SpeedInsights />
                {children}
                <Footer />
              </MainLayout>
            </SearchProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
