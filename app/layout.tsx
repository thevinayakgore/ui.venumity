import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { brandName, handle, website } from "@/lib/brand";
import Navbar from "@/components/site/navigations/navbar";
import Footer from "@/components/site/navigations/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: brandName,
  description:
    "Venumity UI is an open-source React and Next.js UI component library with beautiful, production-ready, fully responsive components and templates. Build modern, professional web applications faster with MIT licensed, developer-friendly UI and learning resources.",

  keywords: [
    "Venumity",
    "Venumity UI",
    "open source UI components",
    "React UI components",
    "Next.js UI library",
    "Tailwind CSS components",
    "Framer Motion components",
    "MIT licensed UI library",
    "frontend component library",
    "design system components",
    "responsive UI components",
    "developer friendly UI",
    "modern web app UI",
    "open source design system",
    "React templates",
    "Next.js templates",
    "UI resources for web developers",
    "free React components",
    "copy paste UI components",
    "production ready UI kit",
  ],

  authors: [{ name: brandName }],
  creator: brandName,
  publisher: brandName,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

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
    url: website,
    title: `${brandName} – Open Source React & Next.js UI Component Library`,
    description:
      "Open-source, MIT licensed React and Next.js UI components, templates, and resources. Build modern, responsive, production-ready interfaces faster with Venumity UI.",
    siteName: brandName,
    images: [
      {
        url: "/logo.png",
        width: 1000,
        height: 1000,
        alt: `${brandName} UI – Open Source React Components`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${brandName} – Open Source React UI Components`,
    description:
      "MIT licensed, developer-friendly React and Next.js UI components, templates, and resources to build modern web apps faster.",
    images: ["/logo.png", "/favicon.ico"],
    creator: `@${handle}`,
  },

  alternates: {
    canonical: website,
  },

  other: {
    "application-name": brandName,
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Toaster />
            <Analytics />
            <SpeedInsights />
            <Navbar />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
