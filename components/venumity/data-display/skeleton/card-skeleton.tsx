import { SkeletonText, SkeletonImage, SkeletonButton } from "./index";

export default function CardSkeletonDemo() {
  return (
    <div className="p-2 border rounded-3xl w-sm">
      {/* Image */}
      <SkeletonImage pulse ratio="video" />

      {/* Content */}
      <div className="p-3 w-full">
        <div className="mt-2 space-y-2">
          <SkeletonText pulse />
          <SkeletonText pulse width="w-[92%]" />
          <SkeletonText pulse width="w-2/3" />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-5">
          <SkeletonButton pulse size="sm" />
          <SkeletonButton pulse size="sm" />
        </div>
      </div>
    </div>
  );
}
