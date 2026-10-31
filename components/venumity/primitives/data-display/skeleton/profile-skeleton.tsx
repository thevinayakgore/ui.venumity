import {
  SkeletonAvatar,
  SkeletonText,
  SkeletonButton,
  SkeletonBadge,
  SkeletonImage,
} from "./index";

export default function ProfileSkeletonDemo() {
  return (
    <div className="border rounded-4xl overflow-hidden w-md">
      {/* Cover */}
      <SkeletonImage pulse ratio="video" className="rounded-none h-45" />

      <div className="relative px-6 pb-8">
        {/* Avatar */}
        <div className="absolute -top-14 left-6">
          <SkeletonAvatar
            pulse
            className="size-15 md:size-30 border-4 border-background"
          />
        </div>

        <div className="space-y-8 pt-20">
          {/* Name and actions */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <SkeletonText pulse width="w-48" />
              <SkeletonText pulse width="w-32" />
            </div>

            <SkeletonButton pulse size="sm" />
          </div>

          {/* Bio */}
          <div className="space-y-2.5">
            <SkeletonText pulse />
            <SkeletonText pulse width="w-5/6" />
            <SkeletonText pulse width="w-2/3" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <SkeletonBadge pulse width="w-20" />
            <SkeletonBadge pulse width="w-24" />
            <SkeletonBadge pulse width="w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
