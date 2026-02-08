"use client";
import React, { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

export default function FeaturesComparisonSection() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29',
      description: 'For individuals and small teams',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$79',
      description: 'For growing businesses',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      popular: false,
    },
  ];

  const features = [
    {
      category: 'Core Features',
      items: [
        { name: 'Users', basic: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Storage', basic: '10GB', pro: '100GB', enterprise: '1TB+' },
        { name: 'Projects', basic: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
      ],
    },
    {
      category: 'Collaboration',
      items: [
        { name: 'Team Collaboration', basic: true, pro: true, enterprise: true },
        { name: 'Real-time Editing', basic: false, pro: true, enterprise: true },
        { name: 'Version History', basic: '30 days', pro: '1 year', enterprise: 'Unlimited' },
        { name: 'Advanced Permissions', basic: false, pro: true, enterprise: true },
      ],
    },
    {
      category: 'Security & Compliance',
      items: [
        { name: 'Two-Factor Auth', basic: true, pro: true, enterprise: true },
        { name: 'SSO Integration', basic: false, pro: true, enterprise: true },
        { name: 'GDPR Compliance', basic: true, pro: true, enterprise: true },
        { name: 'HIPAA Compliance', basic: false, pro: false, enterprise: true },
        { name: 'Custom Security Policies', basic: false, pro: false, enterprise: true },
      ],
    },
    {
      category: 'Support',
      items: [
        { name: 'Email Support', basic: true, pro: true, enterprise: true },
        { name: 'Chat Support', basic: false, pro: true, enterprise: true },
        { name: 'Phone Support', basic: false, pro: false, enterprise: true },
        { name: 'Dedicated Account Manager', basic: false, pro: false, enterprise: true },
        { name: '24/7 Emergency Support', basic: false, pro: false, enterprise: true },
      ],
    },
    {
      category: 'Advanced Features',
      items: [
        { name: 'API Access', basic: 'Limited', pro: 'Full', enterprise: 'Full' },
        { name: 'Custom Integrations', basic: false, pro: '5', enterprise: 'Unlimited' },
        { name: 'White Labeling', basic: false, pro: false, enterprise: true },
        { name: 'Custom Workflows', basic: false, pro: true, enterprise: true },
        { name: 'Advanced Analytics', basic: false, pro: true, enterprise: true },
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compare Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include core features.
          </p>
        </div>

        {/* Plan Selection */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`cursor-pointer bg-white dark:bg-gray-900 rounded-xl p-6 border-2 transition-all ${
                selectedPlan === plan.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              } ${plan.popular ? 'relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-500 dark:text-gray-400">/month</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>
                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Comparison Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Features
                    </h3>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`text-center p-6 ${selectedPlan === plan.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <div className={`font-bold text-gray-900 dark:text-white ${
                        plan.popular ? 'text-blue-600 dark:text-blue-400' : ''
                      }`}>
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((category, catIndex) => (
                  <React.Fragment key={catIndex}>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={4} className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {category.category}
                        </h4>
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr
                        key={itemIndex}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="p-6">
                          <div className="flex items-center">
                            <span className="text-gray-900 dark:text-white">
                              {item.name}
                            </span>
                            <HelpCircle className="w-4 h-4 text-gray-400 ml-2" />
                          </div>
                        </td>
                        <td className={`p-6 text-center ${selectedPlan === 'basic' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          {item.basic === true ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : item.basic === false ? (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                          ) : (
                            <span className="font-medium text-gray-900 dark:text-white">{item.basic}</span>
                          )}
                        </td>
                        <td className={`p-6 text-center ${selectedPlan === 'pro' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          {item.pro === true ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : item.pro === false ? (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                          ) : (
                            <span className="font-medium text-gray-900 dark:text-white">{item.pro}</span>
                          )}
                        </td>
                        <td className={`p-6 text-center ${selectedPlan === 'enterprise' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          {item.enterprise === true ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : item.enterprise === false ? (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                          ) : (
                            <span className="font-medium text-gray-900 dark:text-white">{item.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All plans include our core features. Upgrade or downgrade at any time.
          </p>
          <button className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}