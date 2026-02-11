"use client";
import {
  Camera,
  ShieldCheck,
  Headphones,
  GraduationCap,
  Archive,
  Library,
  Palette,
  Megaphone,
  Mic,
  BarChart3,
  Server,
  Scale,
} from "lucide-react";

interface MasonryItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  storage: string;
}

const ITEMS: MasonryItem[] = [
  {
    title: "Product Imagery",
    description:
      "High-resolution product photos optimized for storefronts, catalogs, and marketing campaigns with consistent aspect ratios.",
    icon: <Camera className="size-5" />,
    color: "bg-blue-500",
    storage: "38 items • 3.1 GB",
  },
  {
    title: "Legal Documents",
    description:
      "Contracts, agreements, and compliance files securely organized for quick access during audits or reviews.",
    icon: <ShieldCheck className="size-5" />,
    color: "bg-green-500",
    storage: "212 items • 640 MB",
  },
  {
    title: "Sound Effects",
    description:
      "Short audio clips, UI sounds, and ambient effects used across product interactions and micro-animations.",
    icon: <Headphones className="size-5" />,
    color: "bg-purple-500",
    storage: "124 items • 980 MB",
  },
  {
    title: "Training Videos",
    description:
      "Recorded onboarding sessions, walkthroughs, and internal tutorials used to train teams across departments worldwide.",
    icon: <GraduationCap className="size-5" />,
    color: "bg-orange-500",
    storage: "27 items • 9.6 GB",
  },
  {
    title: "System Archives",
    description:
      "Compressed historical data snapshots stored for long-term reference, rollback, and regulatory requirements.",
    icon: <Archive className="size-5" />,
    color: "bg-rose-500",
    storage: "64 items • 5.2 GB",
  },
  {
    title: "Digital Publications",
    description:
      "E-books, whitepapers, and research publications distributed internally and externally.",
    icon: <Library className="size-5" />,
    color: "bg-teal-500",
    storage: "91 items • 1.1 GB",
  },
  {
    title: "Design Libraries",
    description:
      "Reusable UI components, icon sets, illustrations, and brand assets shared across multiple products and teams.",
    icon: <Palette className="size-5" />,
    color: "bg-indigo-500",
    storage: "176 items • 4.8 GB",
  },
  {
    title: "Campaign Media",
    description:
      "Short-form videos, banners, and creative assets produced for seasonal marketing initiatives.",
    icon: <Megaphone className="size-5" />,
    color: "bg-lime-500",
    storage: "52 items • 2.6 GB",
  },
  {
    title: "Podcast Episodes",
    description:
      "Recorded interviews, discussions, and narrative episodes published across multiple streaming platforms.",
    icon: <Mic className="size-5" />,
    color: "bg-fuchsia-500",
    storage: "46 items • 2.1 GB",
  },
  {
    title: "Operational Reports",
    description:
      "Daily and weekly system reports capturing performance metrics, error logs, and usage statistics in detail.",
    icon: <BarChart3 className="size-5" />,
    color: "bg-amber-500",
    storage: "305 items • 780 MB",
  },
  {
    title: "Infrastructure Backups",
    description:
      "Automated backups synced from production servers to ensure disaster recovery and high availability.",
    icon: <Server className="size-5" />,
    color: "bg-sky-500",
    storage: "41 items • 14.2 GB",
  },
  {
    title: "Compliance Media Vault",
    description:
      "Archived media assets retained to meet long-term legal, contractual, and regulatory compliance requirements across regions.",
    icon: <Scale className="size-5" />,
    color: "bg-cyan-500",
    storage: "118 items • 6.9 GB",
  },
];

export default function StandardMasonryLayout() {

  return (
    <main className="flex flex-col items-center justify-center m-auto w-full">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 p-6 overflow-auto w-full">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className={`bg-card border-2 rounded-2xl p-6 break-inside-avoid hover:shadow-xl/10 transition-all duration-500 w-full`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 ${item.color} text-white rounded-md`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-medium">{item.title}</h3>
            </div>
            <p className="text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
            <div className="mt-4">
              <span className="text-xs opacity-80">{item.storage}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
