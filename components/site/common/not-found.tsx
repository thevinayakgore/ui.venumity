import { Plus, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center m-auto p-5 md:p-10 w-full h-screen">
      <section className="p-3 bg-foreground/5 backdrop-blur-sm border rounded-4xl m-auto w-full">
        <div className="relative group flex items-center justify-center m-auto bg-background border rounded-2xl min-h-100 w-full h-full">
          <div className="flex flex-col items-center text-center gap-5 w-full h-full">
            <ShieldAlert className="size-25 stroke-1 text-primary leading-none" />
            <h1 className="text-4xl font-bold">Preparing soon !</h1>
            <p className="text-foreground/50 m-auto max-w-sm">
              This page is not available yet, till then explore other content
              and resources.
            </p>
          </div>

          <div>
            <Plus className="absolute top-3 left-3 size-6 opacity-40 group-hover:opacity-100 group-hover:scale-130 group-hover:text-primary group-hover:animate-spin transition-all duration-500" />
            <Plus className="absolute top-3 right-3 size-6 opacity-40 group-hover:opacity-100 group-hover:scale-130 group-hover:text-primary group-hover:animate-spin transition-all duration-500" />
            <Plus className="absolute bottom-3 left-3 size-6 opacity-40 group-hover:opacity-100 group-hover:scale-130 group-hover:text-primary group-hover:animate-spin transition-all duration-500" />
            <Plus className="absolute bottom-3 right-3 size-6 opacity-40 group-hover:opacity-100 group-hover:scale-130 group-hover:text-primary group-hover:animate-spin transition-all duration-500" />
          </div>
        </div>
      </section>
    </main>
  );
}
