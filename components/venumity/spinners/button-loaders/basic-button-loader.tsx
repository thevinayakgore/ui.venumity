"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function BasicButtonLoader() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className="relative p-6 cursor-pointer min-w-50 disabled:opacity-80"
    >
      {loading ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          Loading...
        </>
      ) : (
        "Load More"
      )}
    </Button>
  );
}
