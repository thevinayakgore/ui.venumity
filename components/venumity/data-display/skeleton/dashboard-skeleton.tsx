import {
  SkeletonAvatar,
  SkeletonText,
  SkeletonButton,
  SkeletonBadge,
  SkeletonBox,
  SkeletonImage,
} from "./index";

export default function DashboardSkeletonDemo() {
  return (
    <div className="p-5 md:p-10 w-full">
      <div className="space-y-5 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <SkeletonText pulse width="w-64" className="h-8" />
            <SkeletonText pulse width="w-48" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SkeletonButton pulse size="md" />
            <SkeletonButton pulse size="md" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-foreground/10 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <SkeletonText pulse width="w-28" />
                  <SkeletonText pulse width="w-20" className="h-8" />
                </div>

                <SkeletonBox pulse className="size-12 rounded-lg" />
              </div>

              <div className="mt-6 space-y-2">
                <SkeletonText pulse width="w-24" />
                <SkeletonText pulse width="w-16" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart and activity */}
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Chart */}
          <div className="rounded-2xl border border-foreground/10 p-6 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-3">
                <SkeletonText pulse width="w-48" className="h-6" />
                <SkeletonText pulse width="w-32" />
              </div>

              <SkeletonButton pulse size="sm" />
            </div>

            <div className="mt-6">
              <SkeletonImage pulse ratio="video" className="rounded-lg" />
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-2xl border border-foreground/10 p-6">
            <div className="space-y-3">
              <SkeletonText pulse width="w-40" className="h-6" />
              <SkeletonText pulse width="w-28" />
            </div>

            <div className="mt-6 space-y-5">
              {[0, 1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <SkeletonAvatar pulse size="md" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <SkeletonText pulse width="w-3/4" />
                    <SkeletonText pulse width="w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data table */}
        <div className="w-full overflow-hidden rounded-2xl border border-foreground/10">
          {/* Table header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 p-6">
            <div className="space-y-3">
              <SkeletonText pulse width="w-56" className="h-6" />
              <SkeletonText pulse width="w-40" />
            </div>

            <SkeletonButton pulse size="md" />
          </div>

          {/* Table rows */}
          <div className="divide-y divide-foreground/10">
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="grid grid-cols-1 items-center gap-4 px-6 py-4 md:grid-cols-5"
              >
                <div className="flex items-center gap-3">
                  <SkeletonAvatar pulse size="sm" />

                  <div className="space-y-2">
                    <SkeletonText pulse width="w-28" />
                    <SkeletonText pulse width="w-20" />
                  </div>
                </div>

                <SkeletonText pulse width="w-32" />
                <SkeletonBadge pulse width="w-20" />
                <SkeletonText pulse width="w-24" />

                <div className="flex justify-start md:justify-end">
                  <SkeletonButton pulse size="sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Table footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/10 p-6">
            <SkeletonText pulse width="w-36" />

            <div className="flex items-center gap-2">
              <SkeletonButton pulse size="sm" />
              <SkeletonButton pulse size="sm" />
              <SkeletonButton pulse size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
