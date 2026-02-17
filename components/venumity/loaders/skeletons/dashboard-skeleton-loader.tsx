export default function SkeletonLoaderDashboard() {
  return (
    <main className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 w-full">
          {/* Header skeleton */}
          <div className="flex justify-between items-center w-full">
            <div className="space-y-2">
              <div className="h-8 bg-foreground/10 rounded w-64 animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded w-48 animate-pulse" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-foreground/10 rounded w-32 animate-pulse" />
              <div className="h-10 bg-foreground/10 rounded w-40 animate-pulse" />
            </div>
          </div>

          {/* Stats grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="border rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="h-6 bg-foreground/10 rounded w-32 animate-pulse" />
                    <div className="h-10 bg-foreground/10 rounded w-24 animate-pulse" />
                  </div>
                  <div className="w-12 h-12 bg-foreground/10 rounded-lg animate-pulse" />
                </div>
                <div className="pt-6">
                  <div className="h-2 bg-foreground/10 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Charts and tables skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Chart skeleton */}
            <div className="lg:col-span-2 border rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-6 bg-foreground/10 rounded w-48 animate-pulse" />
                    <div className="h-4 bg-foreground/10 rounded w-32 animate-pulse" />
                  </div>
                  <div className="h-8 bg-foreground/10 rounded w-24 animate-pulse" />
                </div>
                <div className="h-64 bg-foreground/10 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Recent activity skeleton */}
            <div className="border rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-6 bg-foreground/10 rounded w-40 animate-pulse" />
                  <div className="h-4 bg-foreground/10 rounded w-32 animate-pulse" />
                </div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-foreground/10 rounded-full animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-foreground/10 rounded animate-pulse" />
                        <div className="h-3 bg-foreground/10 rounded w-1/2 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Data table skeleton */}
          <div className="border rounded-xl p-6 shadow-lg w-full">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-6 bg-foreground/10 rounded w-56 animate-pulse" />
                  <div className="h-4 bg-foreground/10 rounded w-40 animate-pulse" />
                </div>
                <div className="h-10 bg-foreground/10 rounded w-36 animate-pulse" />
              </div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-foreground/10 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
    </main>
  );
}
