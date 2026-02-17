"use client";
import { motion } from "framer-motion";
import { Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

export type ConnectionStrength = "excellent" | "good" | "fair" | "poor";

export type ConnectionStatusBadgeProps = {
  strength?: ConnectionStrength;
  className?: string;
  label?: string;
  text?: string;
  color?: string;
  bars?: number;
};

const strengthConfig: Record<
  ConnectionStrength,
  {
    bars: number;
    color: string;
    text: string;
    label: string;
  }
> = {
  excellent: {
    bars: 4,
    color: "bg-green-500",
    text: "Excellent",
    label: "Strong and stable connection",
  },
  good: {
    bars: 3,
    color: "bg-blue-500",
    text: "Good",
    label: "Reliable connection",
  },
  fair: {
    bars: 2,
    color: "bg-yellow-400",
    text: "Fair",
    label: "Connection may be unstable",
  },
  poor: {
    bars: 1,
    color: "bg-red-500",
    text: "Poor",
    label: "Very weak connection",
  },
};

type ConnectionStatusContextValue = {
  strength: ConnectionStrength;
  config: {
    bars: number;
    color: string;
    text: string;
    label: string;
  };
};

const ConnectionStatusContext =
  createContext<ConnectionStatusContextValue | null>(null);

function useConnectionStatus() {
  const ctx = useContext(ConnectionStatusContext);
  if (!ctx) {
    throw new Error(
      "ConnectionStatus components must be used within <ConnectionStatus />",
    );
  }
  return ctx;
}

export function ConnectionStatus({
  strength = "good",
  className,
  label,
  text,
  color,
  bars,
  children,
}: ConnectionStatusBadgeProps & { children?: React.ReactNode }) {
  const baseConfig = strengthConfig[strength];

  // Enforce bars between 1 and 5
  const barsCount =
    bars !== undefined ? Math.min(Math.max(bars, 1), 5) : baseConfig.bars;

  const config = {
    ...baseConfig,
    label: label ?? baseConfig.label,
    text: text ?? baseConfig.text,
    color: color ?? baseConfig.color,
    bars: barsCount,
  };

  return (
    <ConnectionStatusContext.Provider value={{ strength, config }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex flex-col items-center bg-muted/60 backdrop-blur-lg inset-shadow-sm inset-shadow-foreground/10 shadow-xl/5 rounded-lg p-3 border max-w-fit",
                className,
              )}
            >
              {children}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className="text-xs">{config.label}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ConnectionStatusContext.Provider>
  );
}

export function ConnectionStatusHeader() {
  const { config } = useConnectionStatus();

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-2 py-1.5 mb-5 bg-muted/60 backdrop-blur-lg shadow-lg/5 rounded-sm w-full"
    >
      <Wifi className="size-4" />
      <span className="font-medium text-xs md:text-sm leading-none">
        {config.text}
      </span>
    </Badge>
  );
}

export function ConnectionStatusBars() {
  const { config } = useConnectionStatus();

  const totalBars = 5;
  const activeBars = config.bars;

  return (
    <div className="flex items-end justify-center m-auto gap-1.5 w-36">
      {[...Array(totalBars)].map((_, index) => {
        const bar = index + 1;
        const isActive = bar <= activeBars;
        return (
          <motion.div
            key={bar}
            initial={{ height: 0 }}
            animate={{
              height: isActive ? `${bar * 10}px` : "6px",
            }}
            transition={{ duration: 0.5, delay: bar * 0.1 }}
            className={cn(
              "w-1.5 rounded-full",
              isActive ? config.color : "bg-muted-foreground/30",
              activeBars === 1 && bar === 1 && "animate-pulse",
            )}
          />
        );
      })}
    </div>
  );
}

export default function ConnectionStatusBadgeDemo() {
  return (
    <main className="flex items-center mx-auto w-full h-full">
      <section className="flex flex-wrap items-center justify-center gap-3 p-6 md:p-10 max-w-3xl m-auto w-full">
        <ConnectionStatus
          strength="good"
          bars={4}
          text="Custom Bars"
          label="Manually set 5 bars"
          color="bg-purple-500"
        >
          <ConnectionStatusHeader />
          <ConnectionStatusBars />
        </ConnectionStatus>
        <ConnectionStatus
          strength="excellent"
          text="Ultra Fast"
          label="Optimized high-speed connection"
          color="bg-emerald-500"
          className="scale-95"
        >
          <ConnectionStatusHeader />
          <ConnectionStatusBars />
        </ConnectionStatus>
        <ConnectionStatus strength="good">
          <ConnectionStatusHeader />
          <ConnectionStatusBars />
        </ConnectionStatus>
        <ConnectionStatus strength="fair">
          <ConnectionStatusHeader />
          <ConnectionStatusBars />
        </ConnectionStatus>
        <ConnectionStatus strength="poor">
          <ConnectionStatusHeader />
          <ConnectionStatusBars />
        </ConnectionStatus>
      </section>
    </main>
  );
}

export {
  ConnectionStatus as Root,
  ConnectionStatusHeader as Header,
  ConnectionStatusBars as Bars,
};
