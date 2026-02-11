// app/components/progress-loaders.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Cpu, Zap, Sparkles, Check } from "lucide-react";

// ============ LOADER 1: AI NEURAL PROGRESS ============
function AINeuralProgressLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "complete">("loading");
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (status === "complete") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setStatus("complete");
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-background border-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Cpu className="size-6 text-primary animate-pulse" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Neural Processing</h3>
            <p className="text-sm text-muted-foreground">
              {status === "complete"
                ? "Analysis complete!"
                : `Analyzing neural patterns${dots}`}
            </p>
          </div>
        </div>
        {status === "complete" ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
            <Check className="size-5 text-green-500" />
          </div>
        ) : (
          <span className="text-2xl font-bold text-primary">{progress}%</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Progress value={progress} className="h-3" />
          <motion.div
            className="absolute top-0 h-3 w-3 rounded-full bg-primary"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.1 }}
            style={{ transform: "translateX(-50%)" }}
          />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Initializing</span>
          <span>Processing</span>
          <span>Optimizing</span>
          <span>Complete</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="h-1 rounded-full bg-primary/20 overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{
                width:
                  progress > i * 25
                    ? `${Math.min(100, (progress - i * 25) * 4)}%`
                    : "0%",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============ LOADER 2: PULSE DOTS PROGRESS ============
function PulseDotsProgressLoader() {
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      label: "Fetching data",
      icon: <Loader2 className="size-4 animate-spin" />,
    },
    { label: "Processing", icon: <Zap className="size-4" /> },
    { label: "Analyzing", icon: <Sparkles className="size-4" /> },
    { label: "Finalizing", icon: <Check className="size-4" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="space-y-8 p-6 bg-background rounded-xl border-4">
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Check className="size-6 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="size-6 text-green-500" />
            </motion.div>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {isComplete ? "Processing Complete !" : steps[activeStep].label}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isComplete
              ? "Your task has been successfully completed"
              : `Step ${activeStep + 1} of ${steps.length}`}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <motion.div
                className={`flex size-10 items-center justify-center rounded-full 
                  ${
                    index === activeStep && !isComplete
                      ? "bg-primary text-white"
                      : index < activeStep || isComplete
                        ? "bg-green-500/20 text-green-500"
                        : "bg-muted text-muted-foreground"
                  }`}
                animate={
                  index === activeStep && !isComplete
                    ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 1, repeat: Infinity },
                      }
                    : {}
                }
              >
                {index < activeStep ||
                (isComplete && index === steps.length - 1) ? (
                  <Check className="size-5" />
                ) : (
                  step.icon
                )}
              </motion.div>

              <span
                className={`text-xs font-medium
                ${
                  index === activeStep || index < activeStep
                    ? "text-green-500"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
          <motion.div
            className="absolute top-1/2 left-0 h-0.5 bg-linear-to-l from-blue-500 to-sky-300 -translate-y-1/2"
            initial={{ width: "0%" }}
            animate={{
              width: isComplete
                ? "100%"
                : `${(activeStep / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />

          <div className="flex justify-between relative">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className="size-2 rounded-full bg-background! border-2 border-green-500"
                animate={{
                  borderColor: index <= activeStep ? "#22c55e" : "#e2e8f0",
                  scale: index === activeStep ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: index === activeStep ? Infinity : 0,
                }}
                style={{
                  borderColor: index <= activeStep ? "#22c55e" : "#e2e8f0",
                  backgroundColor:
                    index <= activeStep ? "#22c55e20" : "transparent",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {!isComplete && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="size-1.5 rounded-full bg-primary"
                animate={{ y: [0, -3, 0] }}
                transition={{ delay: i * 0.2, duration: 0.8, repeat: Infinity }}
              />
            ))}
          </div>
          <span>AI is working on your request...</span>
        </div>
      )}
    </div>
  );
}

// ============ DEMO PAGE ============
export default function Demo() {
  const [resetKey, setResetKey] = useState(0);
  const [activeLoader, setActiveLoader] = useState<"neural" | "pulse">(
    "neural",
  );

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col items-center justify-center m-auto overflow-auto max-w-3xl w-full min-h-screen h-full">
      <Card className="border-6 border-primary/50 shadow-xl shadow-primary/30 rounded-3xl w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl bg-linear-to-tl from-primary to-yellow-400 bg-clip-text text-transparent w-fit">
                AI Progress
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Two different animated progress loaders for AI operations
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeLoader === "neural" ? "default" : "outline"}
                onClick={() => setActiveLoader("neural")}
                className="gap-2 cursor-pointer"
              >
                <Cpu className="size-4" />
                Neural
              </Button>
              <Button
                variant={activeLoader === "pulse" ? "default" : "outline"}
                onClick={() => setActiveLoader("pulse")}
                className="gap-2 cursor-pointer"
              >
                <Zap className="size-4" />
                Pulse
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleReset}
                className="gap-2 cursor-pointer"
              >
                <Loader2 className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeLoader}-${resetKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeLoader === "neural" ? (
                <AINeuralProgressLoader key={resetKey} />
              ) : (
                <PulseDotsProgressLoader key={resetKey} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-muted/50">
              <CardContent>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Cpu className="size-4" />
                  AI Neural Progress
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Smooth incremental progress bar</li>
                  <li>• Animated neural nodes</li>
                  <li>• Real-time percentage display</li>
                  <li>• Completion checkmark animation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Zap className="size-4" />
                  Pulse Dots Progress
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Step-by-step process tracking</li>
                  <li>• Animated pulse indicators</li>
                  <li>• Visual progress connection line</li>
                  <li>• Bouncing loading dots</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
