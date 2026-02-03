"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react";

// Banner Alert 1
function BannerAlert({
  variant = "info",
}: {
  variant?: "info" | "success" | "warning";
}) {
  const variantConfig = {
    info: {
      gradient: "from-blue-500 to-cyan-500",
      icon: Info,
    },
    success: {
      gradient: "from-green-500 to-emerald-500",
      icon: CheckCircle,
    },
    warning: {
      gradient: "from-amber-500 to-orange-500",
      icon: AlertTriangle,
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={`bg-linear-to-r ${config.gradient} w-full`}>
      <div className="flex items-center justify-between gap-2 p-1 pr-3">
        <div className="flex items-start gap-2 text-white border-r border-white/40 p-3 w-full">
          <Icon className="size-4" />
          <h1 className="text-sm md:text-base font-medium capitalize leading-none">
            {variant} Banner !
          </h1>
        </div>
        <button className="size-6 p-1 text-white hover:bg-white hover:text-black rounded-full cursor-pointer transition-all duration-500">
          <X className="w-full h-full" />
        </button>
      </div>
    </div>
  );
}

export default function bannerAlert1() {
  return (
    <>
      {/* Banner Alert 1 */}
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col m-auto gap-4 p-6 sm:p-10 overflow-auto max-w-4xl w-full"
      >
        {["info", "success", "warning"].map((v, i) => (
          <motion.div
            key={v}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="w-full"
          >
            <BannerAlert variant={v as "info" | "success" | "warning"} />
          </motion.div>
        ))}
      </motion.main>
    </>
  );
}
