"use client";

const DATA = [
  {
    id: "1",
    question: "How can I start using your service ?",
    answer:
      "Getting started is easy! Simply sign up for an account, complete your profile, and you can begin using our services immediately. No credit card required for the first 14 days.",
  },
  {
    id: "2",
    question: "Which payment methods are supported on your platform ?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are securely processed through encrypted channels.",
  },
  {
    id: "3",
    question: "Can I cancel my subscription anytime I want ?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you will continue to have access until the end of your billing period.",
  },
  {
    id: "4",
    question: "Do you provide enterprise custom solutions for businesses ?",
    answer:
      "Absolutely! We provide custom enterprise solutions with dedicated support, advanced features, and personalized onboarding. Contact our sales team to discuss your specific requirements.",
  },
  {
    id: "5",
    question: "How secure is DATA on your platform ?",
    answer:
      "We take security seriously. Our platform uses bank-level encryption, regular security audits, and complies with industry standards. Your DATA is stored in secure SOC 2 certified DATA centers.",
  },
  {
    id: "6",
    question: "Is a completely free trial currently available now ?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all features. No credit card is required to sign up for the trial.",
  },
  {
    id: "7",
    question: "Do you provide customer support for all users ?",
    answer:
      "Absolutely! Our dedicated support team is available 24/7 via chat and email to help you resolve any issues.",
  },
  {
    id: "8",
    question: "Can I upgrade or downgrade my plan anytime ?",
    answer:
      "Yes, you can change your subscription plan at any time from your account settings. Your billing will be adjusted automatically.",
  },
  {
    id: "9",
    question: "Do you integrate with any popular third-party tools ?",
    answer:
      "We integrate with popular platforms like Slack, Google Workspace, and Zapier to streamline your workflow.",
  },
  {
    id: "10",
    question: "What happens after the free trial period ends ?",
    answer:
      "When your trial ends, you can choose a subscription plan to continue using the service. Your DATA will remain saved for 30 days.",
  },
];

export default function MasonryGridFAQ() {
  return (
    <div className="flex flex-col m-auto gap-5 md:gap-10 p-5 md:p-10 w-full">
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

      {/* FAQ Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {DATA.map((faq) => (
          <div
            key={faq.id}
            className="flex flex-col bg-background border border-sky-500/40 dark:border-violet-500/50 rounded-2xl overflow-hidden break-inside-avoid"
          >
            <h3 className="py-4 px-5 bg-sky-500/10 dark:bg-violet-500/15 border-b border-dashed border-sky-500/40 dark:border-violet-500/50 text-lg md:text-xl">
              {faq.question}
            </h3>
            <p className="p-5 text-sm md:text-base opacity-60 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
