import { Button } from "./index";
import { Check, ArrowRight } from "lucide-react";

export default function CustomIconButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      {/* Icon Styling */}
      <Button
        variant="default"
        iconMotion="right"
        rightIcon={<ArrowRight />}
        rightIconClassName="text-yellow-300"
      >
        Yellow Arrow Icon
      </Button>

      {/* Wrapped / Bubbled Icon */}
      <Button
        className="pl-1.5"
        leftIcon={<Check />}
        leftIconClassName="p-1 bg-white text-primary rounded-sm"
      >
        Bubbled Left Icon
      </Button>
    </div>
  );
}
