"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Globe, Headphones } from "lucide-react";

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href: string;
  color: string;
}

export default function CardGridContactInfo() {
  const contactCards: ContactCard[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "Send Email",
      href: "mailto:support@company.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      href: "tel:+15551234567",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with us in real-time",
      action: "Start Chat",
      href: "#",
      color: "from-violet-500 to-violet-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come to our office location",
      action: "Get Directions",
      href: "#",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Social Media",
      description: "Follow us for updates",
      action: "Connect",
      href: "#",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Help Center",
      description: "Browse our knowledge base",
      action: "Learn More",
      href: "#",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
      >
        {contactCards.map((card, index) => (
          <motion.a
            key={index}
            href={card.href}
            variants={cardVariants}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-card dark:bg-card rounded-xl border border-border p-6 shadow-md overflow-hidden"
          >
            <motion.div
              className={`absolute inset-0 bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}
            />
            
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${card.color} text-white mb-4 shadow-lg`}>
              {card.icon}
            </div>
            
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">
              {card.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4">
              {card.description}
            </p>
            
            <motion.span
              className={`inline-flex items-center text-sm font-medium bg-linear-to-r ${card.color} bg-clip-text text-transparent`}
              whileHover={{ x: 4 }}
            >
              {card.action}
              <motion.span
                className="ml-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </motion.main>
  );
}
