import { SkeletonText } from "./index";

export default function TextSkeletonDemo() {
  return (
    <div className="space-y-5">
      {/* Text */}
      <div className="space-y-3">
        <p className="text-xs md:text-sm">Text</p>
        <SkeletonText pulse tone="contrast" width="w-50" />
      </div>

      {/* Paragraph */}
      <div className="space-y-3 w-fit">
        <p className="text-xs md:text-sm">Paragraph</p>
        <div className="space-y-2">
          <SkeletonText pulse width="w-70" className="h-3" />
          <SkeletonText pulse width="w-55" className="h-3" />
          <SkeletonText pulse width="w-50" className="h-3" />
          <SkeletonText pulse width="w-50" className="h-3" />
          <SkeletonText pulse width="w-40" className="h-3" />
        </div>
      </div>
    </div>
  );
}
  