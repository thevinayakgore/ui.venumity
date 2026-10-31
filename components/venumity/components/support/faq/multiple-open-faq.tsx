"use client";
import { useState } from "react";
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DATA = [
  {
    id: "1",
    question: "How can I start using your amazing service?",
    answer:
      "Getting started is easy! Simply sign up for an account, complete your profile, and you can begin using our services immediately. No credit card required for the first 14 days.",
  },
  {
    id: "2",
    question: "Which payment methods are supported on your platform?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are securely processed through encrypted channels.",
  },
  {
    id: "3",
    question: "Can I cancel my subscription anytime I want?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you will continue to have access until the end of your billing period.",
  },
  {
    id: "4",
    question: "Do you provide enterprise custom solutions for businesses?",
    answer:
      "Absolutely! We provide custom enterprise solutions with dedicated support, advanced features, and personalized onboarding. Contact our sales team to discuss your specific requirements.",
  },
  {
    id: "5",
    question: "How secure is user DATA on your platform?",
    answer:
      "We take security seriously. Our platform uses bank-level encryption, regular security audits, and complies with industry standards. Your DATA is stored in secure SOC 2 certified DATA centers.",
  },
  {
    id: "6",
    question: "Is a completely free trial currently available now?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all features. No credit card is required to sign up for the trial.",
  },
  {
    id: "7",
    question: "Do you provide customer support for all users?",
    answer:
      "Absolutely! Our dedicated support team is available 24/7 via chat and email to help you resolve any issues.",
  },
  {
    id: "8",
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes, you can change your subscription plan at any time from your account settings. Your billing will be adjusted automatically.",
  },
  {
    id: "9",
    question: "Do you integrate with any popular third-party tools?",
    answer:
      "We integrate with popular platforms like Slack, Google Workspace, and Zapier to streamline your workflow.",
  },
  {
    id: "10",
    question: "What happens after the free trial period ends?",
    answer:
      "When your trial ends, you can choose a subscription plan to continue using the service. Your DATA will remain saved for 30 days.",
  },
];

export default function MultipleOpenFAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
  };

  return (
    <div className="flex flex-col m-auto gap-5 md:gap-10 p-5 md:p-10 max-w-4xl w-full">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-lg text-foreground/50">
          Find quick answers to common questions about our services and
          features.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={handleValueChange}
        className="space-y-4"
      >
        {DATA.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className={`border-2! border-foreground/15 bg-sidebar rounded-sm p-0! group ${
              openItems.includes(faq.id)
                ? "bg-background border-primary/70 shadow-[0_0_20px_3px_rgba(244,63,94,0.25)]"
                : "hover:border-primary/70"
            } rounded-xl`}
          >
            <AccordionTrigger className="py-4! px-5! hover:no-underline group cursor-pointer [&>svg]:hidden!">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg text-left">{faq.question}</span>
                <div className="shrink-0 ml-4">
                  <AnimatePresence>
                    <motion.div
                      key="minus"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Webhook
                        className={`size-6 ${
                          openItems.includes(faq.id)
                            ? "animate-spin"
                            : "group-hover:animate-spin"
                        } text-primary`}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-5! border-t border-dashed border-primary/70">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-sm md:text-base tracking-wide leading-relaxed w-full h-full"
              >
                {faq.answer}
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center justify-center text-center m-auto p-6 bg-linear-to-b from-primary via-primary/30 to-background rounded-2xl overflow-hidden w-full min-h-60"
      >
        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight mb-3">
          Still Have Questions ?
        </h3>
        <p className="mb-4">
          Can&apos;t find the answer you&apos;re looking for ? Please chat{" "}
          <br /> with our friendly team.
        </p>
        <Button className="px-8 py-6 mt-3 hover:px-14 bg-foreground! text-secondary! text-base font-semibold hover:shadow-lg hover:scale-105 rounded-lg transition-all duration-500">
          Let&apos;s Talk
        </Button>
      </motion.div>
    </div>
  );
}
