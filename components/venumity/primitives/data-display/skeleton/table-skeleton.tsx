import {
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonBadge,
} from "./index";

export default function TableSkeletonDemo() {
  return (
    <div className="border rounded-xl overflow-hidden max-w-2xl w-full">
      {/* Table header */}
      <div className="flex items-center gap-5 border-b border-foreground/10 bg-foreground/3 px-4 py-3">
        <SkeletonText pulse width="w-40" />
        <SkeletonText pulse width="w-32" />
        <SkeletonText pulse width="w-20" />
        <SkeletonText pulse width="w-20" />
        <SkeletonText pulse width="w-25" className="ml-auto" />
      </div>

      {/* Table rows */}
      <div className="divide-y divide-foreground/10">
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="flex items-center gap-5 px-4 py-4">
            {/* User */}
            <div className="flex items-center gap-3 w-40">
              <SkeletonAvatar pulse />
              <div className="space-y-1">
                <SkeletonText pulse width="w-24" className="h-2.5" />
                <SkeletonText pulse width="w-16" className="h-2.5" />
              </div>
            </div>

            {/* Email */}
            <SkeletonText pulse width="w-32" />

            {/* Role */}
            <SkeletonBadge pulse width="w-20" />

            {/* Status */}
            <SkeletonBadge pulse width="w-20" />

            {/* Action */}
            <SkeletonButton pulse size="sm" className="ml-auto" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-foreground/10 p-4">
        <SkeletonText pulse width="w-50" />

        <div className="flex items-center gap-2">
          <SkeletonButton pulse size="sm" />
          <SkeletonButton pulse size="sm" />
        </div>
      </div>
    </div>
  );
}
