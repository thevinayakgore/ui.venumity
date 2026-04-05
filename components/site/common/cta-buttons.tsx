import Link from "next/link";
import { Button } from "../../ui/button";
import { Globe, ChevronsRight } from "lucide-react";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 my-3 text-sm font-medium!">
      <Link href="/components" target="_blank">
        <Button
          variant="secondary"
          className="pl-4! pr-5! py-6! group/btn bg-foreground! text-secondary! inset-shadow-sm inset-shadow-secondary/40 text-base font-medium cursor-pointer border-2 border-foreground/20"
        >
          <Globe className="size-5 group-hover/btn:animate-spin transition-all duration-500" />
          Browse Components
        </Button>
      </Link>
      <Link href="/resources" target="_blank">
        <Button
          variant="secondary"
          className="gap-1.5 p-6! group/btn text-foreground inset-shadow-sm inset-shadow-foreground/20 text-base font-medium cursor-pointer border-2"
        >
          Get Resources
          <ChevronsRight className="size-5 group-hover/btn:translate-x-2 transition-all duration-500" />
        </Button>
      </Link>
    </div>
  );
}
