"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiHigh, WifiLow } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ConnectionStatusBadge() {
  return (
    <div className="flex flex-wrap items-center justify-center m-auto gap-3 p-5 md:p-10 w-full h-full">
      {/* Ultra Fast — emerald, 5 bars, scaled */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center bg-foreground/5 backdrop-blur-lg border-foreground/10 inset-shadow-sm inset-shadow-foreground/15 shadow-xl/5 rounded-xl p-3 border max-w-fit">
            <Badge className="flex items-center gap-2 px-4 py-4.5 mb-5 [&>svg]:size-4! bg-background! text-foreground border-foreground/15 rounded-md w-full">
              <Wifi />
              <span className="font-semibold text-xs md:text-sm leading-none">
                Ultra Fast
              </span>
            </Badge>
            <div className="flex items-end justify-center m-auto gap-1.5 pb-2 min-w-40 min-h-15">
              {[1, 2, 3, 4, 5].map((bar) => {
                const isActive = bar <= 5;
                return (
                  <motion.div
                    key={bar}
                    initial={{ height: 0 }}
                    animate={{
                      height: isActive ? `${bar * 10}px` : "5px",
                    }}
                    transition={{ duration: 0.5, delay: bar * 0.1 }}
                    className={`w-2.5 rounded-full ${
                      isActive ? "bg-green-500" : "bg-muted-foreground/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs">Optimized high-speed connection</span>
        </TooltipContent>
      </Tooltip>

      {/* Good — blue, 3 bars */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center bg-foreground/5 backdrop-blur-lg border-foreground/10 inset-shadow-sm inset-shadow-foreground/15 shadow-xl/5 rounded-xl p-3 border max-w-fit">
            <Badge className="flex items-center gap-2 px-4 py-4.5 mb-5 [&>svg]:size-4! bg-background! text-foreground border-foreground/15 rounded-md w-full">
              <Wifi />
              <span className="font-semibold text-xs md:text-sm leading-none">
                Good
              </span>
            </Badge>
            <div className="flex items-end justify-center m-auto gap-1.5 pb-2 min-w-40 min-h-15">
              {[1, 2, 3, 4, 5].map((bar) => {
                const isActive = bar <= 4;
                return (
                  <motion.div
                    key={bar}
                    initial={{ height: 0 }}
                    animate={{
                      height: isActive ? `${bar * 10}px` : "5px",
                    }}
                    transition={{ duration: 0.5, delay: bar * 0.1 }}
                    className={`w-2.5 rounded-full ${
                      isActive ? "bg-blue-600" : "bg-muted-foreground/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs">Reliable connection</span>
        </TooltipContent>
      </Tooltip>

      {/* Fair — yellow, 3 bars */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center bg-foreground/5 backdrop-blur-lg border-foreground/10 inset-shadow-sm inset-shadow-foreground/15 shadow-xl/5 rounded-xl p-3 border max-w-fit">
            <Badge className="flex items-center gap-2 px-4 py-4.5 mb-5 [&>svg]:size-4! bg-background! text-foreground border-foreground/15 rounded-md w-full">
              <WifiHigh />
              <span className="font-semibold text-xs md:text-sm leading-none">
                Fair
              </span>
            </Badge>
            <div className="flex items-end justify-center m-auto gap-1.5 pb-2 min-w-40 min-h-15">
              {[1, 2, 3, 4, 5].map((bar) => {
                const isActive = bar <= 3;
                return (
                  <motion.div
                    key={bar}
                    initial={{ height: 0 }}
                    animate={{
                      height: isActive ? `${bar * 10}px` : "5px",
                    }}
                    transition={{ duration: 0.5, delay: bar * 0.1 }}
                    className={`w-2.5 rounded-full ${
                      isActive ? "bg-yellow-500" : "bg-muted-foreground/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs">Connection may be unstable</span>
        </TooltipContent>
      </Tooltip>

      {/* Poor — red, 2 bar with pulse */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center bg-foreground/5 backdrop-blur-lg border-foreground/10 inset-shadow-sm inset-shadow-foreground/15 shadow-xl/5 rounded-xl p-3 border max-w-fit">
            <Badge className="flex items-center gap-2 px-4 py-4.5 mb-5 [&>svg]:size-4! bg-background! text-foreground border-foreground/15 rounded-md w-full">
              <WifiLow />
              <span className="font-semibold text-xs md:text-sm leading-none">
                Poor
              </span>
            </Badge>
            <div className="flex items-end justify-center m-auto gap-1.5 pb-2 min-w-40 min-h-15">
              {[1, 2, 3, 4, 5].map((bar) => {
                const isActive = bar <= 2;
                return (
                  <motion.div
                    key={bar}
                    initial={{ height: 0 }}
                    animate={{
                      height: isActive ? `${bar * 10}px` : "5px",
                    }}
                    transition={{ duration: 0.5, delay: bar * 0.1 }}
                    className={`w-2.5 rounded-full ${
                      isActive ? "bg-red-500" : "bg-muted-foreground/30"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-xs">Very weak connection</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
