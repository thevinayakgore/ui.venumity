"use client";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

// Collapsible Sidebar Layout
function CollapsibleSidebar({
  state = "expanded",
}: {
  state?: "expanded" | "collapsed" | "floating";
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card rounded-lg border p-8 flex gap-6 w-full"
    >
      <motion.div
        animate={{
          width: state === "expanded" ? 96 : state === "collapsed" ? 32 : 64,
        }}
        className={`size-60 bg-muted rounded-lg flex items-center justify-center`}
      >
        <Menu className="size-5 text-white" />
      </motion.div>
      <div className="flex-1 space-y-6">
        <div className="h-14 bg-muted rounded-sm"></div>
        <div className="flex items-center gap-6 w-full">
          <div className="h-14 bg-muted rounded-sm w-1/2"></div>
          <div className="h-14 bg-muted rounded-sm w-1/2"></div>
        </div>
        <div className="h-14 bg-muted rounded-sm w-3/4"></div>
      </div>
    </motion.div>
  );
}

export default function SidebarLayout1() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center m-auto gap-10 p-6 sm:p-10 md:py-14 max-w-7xl w-full h-full"
      >
        <CollapsibleSidebar state="expanded" />
        <CollapsibleSidebar state="collapsed" />
        <CollapsibleSidebar state="floating" />
      </motion.main>
    </>
  );
}
