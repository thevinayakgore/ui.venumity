// registry/templates.ts
import * as LucideIcons from "lucide-react";

export interface TemplateFeature {
  title: string;
  desc: string;
}

export interface TemplateTech {
  icon: string; // public folder path to icon
}

// Type-safe icon lookup
export type LucideIconName = keyof typeof LucideIcons;

// Helper type for component props
export interface IconProps {
  className?: string;
}

export interface TemplateData {
  name: string;
  category: string;
  categoryIcon?: LucideIconName;
  techs: TemplateTech[];
  createdAt: string;
  price: number;
  buyUrl?: string;
  preview: string; // public folder path to preview image
  desc: string;
  isPublished: boolean;
  demoUrl: string;
  videoId?: string;
  videoFile?: string; // public folder path to video
  gallery?: string[]; // array of public folder paths to gallery images
  features?: TemplateFeature[];
}

export const TEMPLATES: TemplateData[] = [
  {
    name: "Famfolio - Developer Portfolio",
    category: "Portfolio",
    categoryIcon: "Briefcase",
    techs: [
      { icon: "/icons/nextjs.png" },
      { icon: "/icons/react.png" },
      { icon: "/icons/javascript.png" },
      { icon: "/icons/typescript.png" },
      { icon: "/icons/tailwindcss.png" },
      { icon: "/icons/motion.png" },
    ],
    createdAt: "2025-08-11T06:31:00.000Z",
    price: 0,
    buyUrl: "https://thevinayakgore.gumroad.com/l/nextjsportfolio",
    preview: "/assets/temp/portfolio/preview.webp",
    desc: "Explore beautifully crafted UI templates. Click a template to view previews, code, and implementation details. Famfolio is a meticulously designed portfolio template for developers, by a developer. It leverages the full power of the modern web stack to ensure your portfolio isn't just a business card, but a testament to your technical skills.",
    isPublished: true,
    demoUrl: "https://famfolio.vercel.app/",
    videoId: "nz_4wrytljc",
    videoFile: "/video.mp4",
    gallery: [
      "/assets/temp/portfolio/01.webp",
      "/assets/temp/portfolio/02.webp",
      "/assets/temp/portfolio/03.webp",
    ],
    features: [
      {
        title: "Smooth Animations",
        desc: "Framer Motion powered animations for seamless transitions",
      },
      {
        title: "Dark/Light Mode",
        desc: "Fully customizable theme with automatic system detection",
      },
      {
        title: "Project Showcase",
        desc: "Beautiful project display with filterable categories",
      },
      {
        title: "Contact Form",
        desc: "Integrated contact form with validation and email sending",
      },
      {
        title: "Responsive Design",
        desc: "Fully responsive across all devices and screen sizes",
      },
    ],
  },
];
