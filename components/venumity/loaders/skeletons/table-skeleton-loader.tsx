export default function SkeletonLoaderTable() {
  const columns = 5;
  const rows = 8;

  return (
    <main className="p-6 md:p-10 w-full">
      <section className="flex flex-col items-center justify-center m-auto border rounded-2xl w-full">
        {/* Table header skeleton */}
        <div className="p-6 border-b border-foreground/5 w-full">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 bg-foreground/10 rounded w-48 animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded w-32 animate-pulse" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-foreground/10 rounded w-24 animate-pulse" />
              <div className="h-10 bg-foreground/10 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Table skeleton */}
        <div className="overflow-x-auto w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b border-foreground/5">
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <th key={colIndex} className="p-4 text-left">
                    <div className="h-5 bg-foreground/10 rounded w-3/4 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-foreground/5">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className="p-4">
                      <div className="h-4 bg-foreground/10 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table footer skeleton */}
        <div className="p-6 border-t border-foreground/5 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-8 bg-foreground/10 rounded w-20 animate-pulse" />
              <div className="h-4 bg-foreground/10 rounded w-32 animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-foreground/10 rounded w-10 animate-pulse" />
              <div className="h-10 bg-foreground/10 rounded w-10 animate-pulse" />
              <div className="h-10 bg-foreground/10 rounded w-20 animate-pulse" />
              <div className="h-10 bg-foreground/10 rounded w-10 animate-pulse" />
              <div className="h-10 bg-foreground/10 rounded w-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
