"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

const budgetOptions = ["< $5,000", "$5,000 - $25,000", "$25,000 - $100,000", "> $100,000"];

export default function MultiStepContact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center m-auto gap-8 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-7xl w-full min-h-screen"
    >
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground dark:text-foreground mb-4">
            Let&apos;s start a project
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                    step >= num
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded transition-colors ${
                      step > num ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="p-8 rounded-3xl bg-card dark:bg-card border border-border"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground dark:text-foreground">Your Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background dark:bg-background border border-border focus:border-primary outline-none text-foreground"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background dark:bg-background border border-border focus:border-primary outline-none text-foreground"
                />
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background dark:bg-background border border-border focus:border-primary outline-none text-foreground"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground dark:text-foreground">Project Budget</h3>
              <div className="grid grid-cols-2 gap-4">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => setFormData({ ...formData, budget })}
                    className={`p-4 rounded-xl border text-center transition-colors ${
                      formData.budget === budget
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground dark:text-foreground">Project Details</h3>
              <textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-background dark:bg-background border border-border focus:border-primary outline-none resize-none text-foreground"
              />
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              className={`px-6 py-3 rounded-xl border border-border text-foreground hover:bg-secondary transition-colors ${
                step === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              onClick={step === 3 ? () => console.log(formData) : handleNext}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
