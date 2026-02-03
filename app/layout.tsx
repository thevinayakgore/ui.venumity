import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { brandName, handle, website } from "@/lib/brand";
import Navbar from "@/components/navigations/navbar";
import Footer from "@/components/navigations/footer";

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
    "A growing collection of clean, reusable UI components built for modern web applications. Explore components, previews, templates, and resources to build better interfaces.",

  keywords: [
    "UI components",
    "React UI",
    "component library",
    "design system",
    "frontend UI",
    "web components",
    "Next.js UI",
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
    url: website || "http://localhost:3000",
    title: `${brandName} – UI Components for Modern Web Apps`,
    description:
      "Explore reusable UI components, previews, templates, and resources to build clean and consistent web interfaces.",
    siteName: brandName,
    images: [
      {
        url: "/logo.png",
        width: 1000,
        height: 1000,
        alt: `${brandName} UI`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${brandName} – UI Components`,
    description:
      "Reusable UI components and previews for modern frontend development.",
    images: ["/logo.png"],
    creator: `@${handle}`,
  },

  alternates: {
    canonical: website || "http://localhost:3000",
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
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
