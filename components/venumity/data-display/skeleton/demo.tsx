import {
  SkeletonAvatar,
  SkeletonText,
  SkeletonButton,
  SkeletonBadge,
  SkeletonBox,
  SkeletonImage,
  SkeletonInput,
} from "./index";

export default function SkeletonDemo() {
  return (
    <div className="p-5 md:p-10 w-full">
      <div className="flex border rounded-2xl overflow-hidden w-full">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-foreground/10 p-6 md:flex">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <SkeletonBox pulse className="size-9 rounded-lg" />
            <SkeletonText pulse width="w-28" className="h-5" />
          </div>

          {/* Search */}
          <SkeletonInput pulse />

          {/* Navigation */}
          <nav className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <SkeletonBox pulse className="size-8 rounded-lg" />
                <SkeletonText pulse width="w-24" />
              </div>
            ))}
          </nav>

          {/* Upgrade card */}
          <div className="mt-auto space-y-4 rounded-xl border border-foreground/10 p-4">
            <SkeletonText pulse width="w-24" className="h-5" />
            <SkeletonText pulse />
            <SkeletonText pulse width="w-2/3" />
            <SkeletonButton pulse size="sm" />
          </div>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 p-6">
            <div className="space-y-3">
              <SkeletonText pulse width="w-56" className="h-7" />
              <SkeletonText pulse width="w-40" />
            </div>

            <div className="flex items-center gap-3">
              <SkeletonButton pulse size="sm" />
              <SkeletonAvatar pulse size="md" />
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 space-y-8 p-6">
            {/* Special case: highlighted announcement card */}
            <div className="relative overflow-hidden rounded-xl border border-foreground/10 p-6">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="min-w-0 flex-1 space-y-4">
                  <SkeletonBadge pulse width="w-24" />

                  <div className="space-y-3">
                    <SkeletonText pulse width="w-2/3" className="h-7" />
                    <SkeletonText pulse width="w-full" />
                    <SkeletonText pulse width="w-4/5" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <SkeletonButton pulse size="md" />
                    <SkeletonButton pulse size="sm" />
                  </div>
                </div>

                {/* Overlapping media */}
                <div className="relative hidden w-56 shrink-0 sm:block">
                  <SkeletonImage pulse ratio="square" className="rounded-xl" />

                  <div className="absolute top-3 right-3">
                    <SkeletonAvatar
                      pulse
                      className="border-3 border-background"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-xl border border-foreground/10"
                >
                  <SkeletonImage pulse ratio="video" className="rounded-none" />

                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3">
                      <SkeletonAvatar pulse size="sm" />

                      <div className="min-w-0 flex-1 space-y-2">
                        <SkeletonText pulse width="w-1/2" />
                        <SkeletonText pulse width="w-1/3" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <SkeletonText pulse />
                      <SkeletonText pulse width="w-[92%]" />
                      <SkeletonText pulse width="w-2/3" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <SkeletonBadge pulse width="w-20" />
                      <SkeletonButton pulse size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* List */}
            <div className="w-full overflow-hidden rounded-xl border border-foreground/10">
              <div className="border-b border-foreground/10 p-5">
                <SkeletonText pulse width="w-40" className="h-6" />
              </div>

              <div className="divide-y divide-foreground/10">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-5">
                    <SkeletonAvatar pulse size="md" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <SkeletonText pulse width="w-1/3" />
                      <SkeletonText pulse width="w-1/2" />
                    </div>

                    <SkeletonBadge pulse width="w-20" />
                    <SkeletonButton pulse size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
