export default function SkeletonLoaderProfile() {
  return (
    <main
      className="flex flex-col items-center justify-center m-auto gap-8 p-6 md:p-10 w-full"
    >
      <div className="rounded-4xl border-5 border-foreground/5 overflow-hidden max-w-3xl m-auto w-full">
        {/* Header skeleton */}
        <div className="h-70 bg-foreground/5 border-b animate-pulse" />

        <div className="relative px-8 pb-8">
          {/* Avatar skeleton */}
          <div className="absolute -top-16 left-8">
            <div className="w-32 h-32 bg-foreground/10 rounded-full border-4 animate-pulse" />
          </div>

          <div className="pt-20 space-y-8">
            {/* Profile info skeleton */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-8 bg-foreground/10 rounded w-48 animate-pulse" />
                  <div className="h-4 bg-foreground/10 rounded w-32 animate-pulse" />
                </div>
                <div className="h-10 bg-foreground/10 rounded w-24 animate-pulse" />
              </div>

              <div className="h-4 bg-foreground/10 rounded w-full animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded w-5/6 animate-pulse" />
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-foreground/5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-8 bg-foreground/10 rounded w-16 mx-auto animate-pulse" />
                  <div className="h-4 bg-foreground/10 rounded w-24 mx-auto animate-pulse" />
                </div>
              ))}
            </div>

            {/* Tabs skeleton */}
            <div className="border-b border-foreground/5">
              <div className="flex space-x-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="pb-4">
                    <div className="h-8 bg-foreground/10 rounded w-20 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content grid skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-foreground/10 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
