import { SkeletonAvatar } from "./index";

export default function AvatarSkeletonDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs md:text-sm">Avatar</p>
      <div className="flex items-center gap-3">
        <SkeletonAvatar pulse size="sm" />
        <SkeletonAvatar pulse size="md" />
        <SkeletonAvatar pulse size="lg" />
      </div>
    </div>
  );
}
