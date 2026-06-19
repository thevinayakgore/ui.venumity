import { cn } from "@/lib/utils";

export function Camera({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center m-auto bg-zinc-800 shadow-lg/30 p-1 rounded-full size-6",
        className,
      )}
    >
      <div className="flex items-center justify-center m-auto bg-zinc-700 p-[0.3rem] rounded-full w-full h-full">
        <div className="bg-black rounded-full w-full h-full" />
      </div>
    </div>
  );
}