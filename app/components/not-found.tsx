import { Plus, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mt-14 mb-10 pb-10 border-b w-full">
      <section className="p-3 bg-white/5 backdrop-blur-sm border rounded-lg w-full">
        <div className="relative group flex items-center justify-center m-auto bg-background border rounded-md min-h-100 w-full h-full">
          <div className="flex flex-col items-center text-center gap-5 w-full h-full">
            <ShieldAlert className="size-24 text-primary/70 leading-none" />
            <h1 className="text-4xl font-bold">Preparing soon !</h1>
            <p className="text-muted-foreground m-auto max-w-md">
              This page is not available yet, till then explore
              other content and resources.
            </p>
          </div>

          <div>
            <Plus className="absolute top-3 left-3 size-6 text-muted-foreground/40 group-hover:text-primary/80 group-hover:animate-spin transition-all duration-500" />
            <Plus className="absolute top-3 right-3 size-6 text-muted-foreground/40 group-hover:text-primary/80 group-hover:animate-spin transition-all duration-500" />
            <Plus className="absolute bottom-3 left-3 size-6 text-muted-foreground/40 group-hover:text-primary/80 group-hover:animate-spin transition-all duration-500" />
            <Plus className="absolute bottom-3 right-3 size-6 text-muted-foreground/40 group-hover:text-primary/80 group-hover:animate-spin transition-all duration-500" />
          </div>
        </div>
      </section>
    </main>
  );
}
