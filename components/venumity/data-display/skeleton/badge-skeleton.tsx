import { SkeletonBadge } from "./index";

export default function BadgeSkeletonDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs md:text-sm">Badge</p>
      <div className="flex items-center gap-3">
        <SkeletonBadge pulse />
        <SkeletonBadge pulse />
        <SkeletonBadge pulse />
      </div>
    </div>
  );
}
