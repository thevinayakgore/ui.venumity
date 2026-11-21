import { Badge } from "./index";

export default function VariantBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="text-white">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="gradient">Gradient</Badge>
      <Badge variant="ring" tone="brand">
        Ring
      </Badge>
      <Badge variant="solid" tone="blue">
        Solid
      </Badge>
      <Badge variant="link">Link</Badge>
    </div>
  );
}
