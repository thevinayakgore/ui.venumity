import Link from "next/link";
import { Button } from "../../ui/button";
import { ArrowRight, SquareArrowOutUpRight } from "lucide-react";

const CTA_CONFIG = [
  {
    href: "/components",
    label: "Browse Components",
    icon: SquareArrowOutUpRight,
    buttonClass:
      "inset-shadow-sm hover:inset-shadow-white/50 hover:shadow-lg shadow-primary/30 bg-foreground text-secondary hover:bg-primary hover:text-white",
    iconClass: "size-4!",
  },
  {
    href: "/resources",
    label: "Resources",
    icon: ArrowRight,
    buttonClass:
      "group/btn text-foreground hover:text-white hover:bg-green-500 hover:shadow-lg shadow-green-500/30 hover:shadow-green-500/30!",
    iconClass:
      "size-4! group-hover/btn:translate-x-2.5 transition-all duration-500",
  },
];

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm font-medium!">
      {CTA_CONFIG.map(({ href, label, icon: Icon, buttonClass, iconClass }) => (
        <Link key={href} href={href}>
          <Button
            variant="secondary"
            className={`p-6! cursor-pointer border border-foreground/20 hover:border-white rounded-sm hover:scale-105 transition-all duration-500 ${buttonClass}`}
          >
            {label}
            <Icon className={iconClass} />
          </Button>
        </Link>
      ))}
    </div>
  );
}
