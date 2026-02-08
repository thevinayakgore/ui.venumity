"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Shield, Lock, Zap, CheckCircle } from "lucide-react";

export default function PaymentOptions5_2() {
  const [selectedCard, setSelectedCard] = useState<string>("visa");

  const cards = [
    {
      id: "visa",
      type: "Visa",
      number: "**** 4832",
      expires: "08/25",
      primary: true,
    },
    {
      id: "mastercard",
      type: "Mastercard",
      number: "**** 6541",
      expires: "12/24",
      primary: false,
    },
    {
      id: "amex",
      type: "American Express",
      number: "**** 9021",
      expires: "05/26",
      primary: false,
    },
  ];

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      security: "256-bit SSL secured",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Shield,
      security: "Buyer protection included",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Lock,
      security: "Direct and secure",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Zap,
      security: "Decentralized payment",
    },
  ];

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Payment Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your preferred payment method
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Secure Payment</span>
            </div>
          </div>

          {/* Saved Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Saved Payment Methods
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedCard(card.id)}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    selectedCard === card.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {card.type}
                    </div>
                    {selectedCard === card.id && (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    )}
                  </div>

                  <div className="text-gray-900 dark:text-white font-medium mb-1">
                    {card.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Expires {card.expires}
                  </div>

                  {card.primary && (
                    <div className="mt-3 inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                      Primary
                    </div>
                  )}
                </motion.button>
              ))}

              {/* Add New Card */}
              <button className="p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 transition flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Add New Card
                </span>
              </button>
            </div>
          </div>

          {/* Payment Methods Grid */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Other Payment Methods
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <method.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {method.name}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {method.security}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security Assurance */}
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <div className="font-medium text-green-700 dark:text-green-400">
                  Your payment is protected
                </div>
                <div className="text-sm text-green-600/70 dark:text-green-400/70">
                  All transactions are encrypted and secured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
