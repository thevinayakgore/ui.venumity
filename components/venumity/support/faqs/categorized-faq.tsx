"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CreditCard, Settings, Shield, HelpCircle } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function CategorizedFAQ() {
  const [activeCategory, setActiveCategory] = useState("billing");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories: FAQCategory[] = [
    {
      id: "billing",
      name: "Billing",
      icon: <CreditCard className="w-4 h-4" />,
      items: [
        { question: "How do I update my payment method?", answer: "Navigate to Settings > Billing > Payment Methods. Click 'Add Payment Method' and enter your new card details. You can set any card as your default payment method." },
        { question: "Can I get a refund?", answer: "We offer a 30-day money-back guarantee for annual subscriptions. Monthly subscriptions can be cancelled but are non-refundable for the current billing period." },
        { question: "Do you offer discounts for nonprofits?", answer: "Yes! We offer 50% off for verified nonprofit organizations. Contact our sales team with your 501(c)(3) documentation to apply." },
      ],
    },
    {
      id: "account",
      name: "Account",
      icon: <Settings className="w-4 h-4" />,
      items: [
        { question: "How do I reset my password?", answer: "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox. The link expires after 24 hours." },
        { question: "Can I change my username?", answer: "You can change your display name anytime in Settings > Profile. Your account email, however, requires verification to change." },
        { question: "How do I delete my account?", answer: "Go to Settings > Account > Delete Account. Please note this action is irreversible and all your data will be permanently removed." },
      ],
    },
    {
      id: "security",
      name: "Security",
      icon: <Shield className="w-4 h-4" />,
      items: [
        { question: "How do I enable two-factor authentication?", answer: "Go to Settings > Security > Two-Factor Authentication. You can use an authenticator app or SMS verification. We recommend using an app for better security." },
        { question: "What happens if I lose access to my 2FA?", answer: "Use one of your backup codes to log in, then disable and re-enable 2FA. If you've lost your backup codes, contact support with identity verification." },
        { question: "How is my data protected?", answer: "We use AES-256 encryption for data at rest, TLS 1.3 for data in transit, and regular third-party security audits to ensure your data remains secure." },
      ],
    },
    {
      id: "general",
      name: "General",
      icon: <HelpCircle className="w-4 h-4" />,
      items: [
        { question: "What browsers do you support?", answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated." },
        { question: "Is there a mobile app?", answer: "Yes! Our mobile apps are available for both iOS and Android. Download them from the App Store or Google Play Store." },
        { question: "Do you have an API?", answer: "Yes, we offer a comprehensive REST API with detailed documentation. API access is available on our Pro and Enterprise plans." },
      ],
    },
  ];

  const activeItems = categories.find((c) => c.id === activeCategory)?.items || [];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full h-full"
    >
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setOpenIndex(null);
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary dark:bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card dark:bg-card rounded-2xl border border-border overflow-hidden shadow-lg"
          >
            {activeItems.map((item, index) => (
              <div key={index} className={index !== 0 ? "border-t border-border" : ""}>
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 dark:hover:bg-secondary/20 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-medium text-foreground pr-4">{item.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-secondary dark:bg-secondary flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5">
                        <motion.div
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          className="p-4 bg-secondary/50 dark:bg-secondary/30 rounded-xl"
                        >
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
