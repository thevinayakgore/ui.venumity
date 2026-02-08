"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";

interface SupportInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function BasicSupportCard() {
  const supportInfo: SupportInfo[] = [
    { icon: <Mail className="w-4 h-4" />, label: "Email", value: "support@company.com" },
    { icon: <Phone className="w-4 h-4" />, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: <Clock className="w-4 h-4" />, label: "Hours", value: "Mon-Fri, 9AM-6PM" },
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="w-full max-w-sm bg-card dark:bg-card rounded-2xl border border-border p-6 shadow-lg"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center mb-5"
        >
          <Mail className="w-7 h-7 text-primary-foreground" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xl font-display font-semibold text-foreground mb-2"
        >
          Need Help?
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm mb-6"
        >
          Our support team is here to assist you with any questions or issues.
        </motion.p>

        <div className="space-y-3 mb-6">
          {supportInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary dark:bg-secondary flex items-center justify-center text-primary">
                {info.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{info.label}</p>
                <p className="text-sm font-medium text-foreground">{info.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          Contact Support
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.main>
  );
}
