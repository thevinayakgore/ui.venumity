import { Button } from "./index";

export default function VariantsButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 max-w-xl">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
