"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ButtonLoaderOutline() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className="relative items-center justify-center m-auto p-6 cursor-pointer border-3 min-w-50 group overflow-hidden transition-all duration-500"
    >
      {loading && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 rounded-full bg-green-500"
        />
      )}

      {loading ? (
        <span className="flex items-center gap-2 italic">
          <Loader2 className="size-5 animate-spin" />
          fetching...
        </span>
      ) : (
        "Fetch Data"
      )}
    </Button>
  );
}
