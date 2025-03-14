import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      { text: "Binary tree visualization", included: true },
      { text: "Up to 50 team members", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
      { text: "Crypto staking (5% APY)", included: false },
      { text: "Advanced team balancing", included: false },
      { text: "Unlimited team members", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Best for growing networks",
    features: [
      { text: "Binary tree visualization", included: true },
      { text: "Up to 500 team members", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority email support", included: true },
      { text: "Crypto staking (10% APY)", included: true },
      { text: "Advanced team balancing", included: true },
      { text: "Unlimited team members", included: false },
      { text: "24/7 phone support", included: false },
    ],
    buttonText: "Start 14-Day Trial",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations",
    features: [
      { text: "Binary tree visualization", included: true },
      { text: "Unlimited team members", included: true },
      { text: "Custom analytics", included: true },
      { text: "24/7 phone support", included: true },
      { text: "Crypto staking (15% APY)", included: true },
      { text: "Advanced team balancing", included: true },
      { text: "White-label solution", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div id="pricing" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your business, with no hidden fees
            or long-term commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl overflow-hidden border ${plan.popular ? "border-indigo-500 shadow-lg ring-2 ring-indigo-500 ring-opacity-50" : "border-gray-200 shadow-sm"}`}
            >
              {plan.popular && (
                <div className="bg-indigo-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <Button
                  asChild
                  variant={plan.buttonVariant as "default" | "outline"}
                  className={`w-full ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700 text-white" : ""}`}
                >
                  <Link to="/dashboard">{plan.buttonText}</Link>
                </Button>
              </div>

              <div className="border-t border-gray-200 p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-500"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-indigo-50 max-w-3xl mx-auto p-6 rounded-lg border border-indigo-100">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">
            Need a custom solution?
          </h3>
          <p className="text-indigo-700 mb-4">
            Contact our sales team for a personalized quote tailored to your
            specific needs.
          </p>
          <Button
            variant="outline"
            className="border-indigo-300 text-indigo-700 hover:bg-indigo-100"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;