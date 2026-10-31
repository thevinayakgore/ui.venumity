import { Heart } from "lucide-react";
import { Button } from "./index";

export default function SizesButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Heart />
      </Button>
    </div>
  );
}
