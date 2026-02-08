"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

export default function BasicContactInfo() {
  const contactItems: ContactItem[] = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "support@company.com",
      href: "mailto:support@company.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "123 Business Ave, NY 10001",
      href: "#",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Hours",
      value: "Mon-Fri: 9AM - 6PM",
      href: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-card dark:bg-card rounded-lg border border-border p-6 shadow-md"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-display font-semibold text-foreground mb-6"
        >
          Contact Us
        </motion.h2>
        
        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-3 rounded-md hover:bg-secondary dark:hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-foreground font-medium truncate">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.main>
  );
}
