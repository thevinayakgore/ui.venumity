import { SkeletonButton } from "./index";

export default function ButtonSkeletonDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs md:text-sm">Button</p>
      <div className="flex items-center gap-3">
        <SkeletonButton pulse size="sm" />
        <SkeletonButton pulse size="md" />
        <SkeletonButton pulse size="lg" />
      </div>
    </div>
  );
}
