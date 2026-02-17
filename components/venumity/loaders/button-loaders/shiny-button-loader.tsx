"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

export default function ShinyButtonLoader() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  return (
    <main className="flex items-center justify-center m-auto w-full h-full">
      <Button
        onClick={handleClick}
        disabled={loading}
        className="relative items-center justify-center m-auto bg-linear-to-br from-amber-400 via-orange-500 to-red-500 hover:from-amber-500 hover:via-orange-600 hover:to-red-600 dark:from-amber-500 dark:via-orange-600 dark:to-red-600 dark:hover:from-amber-600 dark:hover:via-orange-700 dark:hover:to-red-700 text-white font-medium p-6 h-14 cursor-pointer min-w-50 disabled:opacity-90 hover:shadow-xl shadow-orange-500/30 dark:shadow-orange-600/30 overflow-hidden group transition-all duration-500"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            <Sparkles className="size-5" />
            <span>Shiny Loader</span>
          </>
        )}
      </Button>
    </main>
  );
}
