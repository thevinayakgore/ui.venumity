export default function InlineLoaderPulse() {
  return (
    <main className="flex items-center justify-center gap-2 m-auto w-full h-full">
      <span className="relative size-2.5">
        <span className="absolute inset-0 bg-primary rounded-full animate-ping w-full h-full" />
        <span className="absolute inset-0 z-10 bg-primary/60 scale-120 rounded-full animate-pulse w-full h-full" />
        <span className="absolute inset-0 z-20 bg-primary scale-60 rounded-full w-full h-full" />
      </span>
      <span className="text-sm">Loading...</span>
    </main>
  );
}
