import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the crypto staking feature work?",
    answer:
      "Our crypto staking feature allows you to stake your commission earnings in our secure pool. You'll earn competitive APY rates (5-15% depending on your plan) paid out weekly. You can withdraw your staked funds at any time with no penalties.",
  },
  {
    question: "Is there a limit to how many team members I can have?",
    answer:
      "The Free plan supports up to 50 team members, the Pro plan supports up to 500 team members, and the Enterprise plan offers unlimited team members. If you're approaching your limit, you can easily upgrade your plan at any time.",
  },
  {
    question: "Can I try ReferralTree before committing to a paid plan?",
    answer:
      "Absolutely! You can start with our Free plan which includes all the essential features you need to get started. We also offer a 14-day free trial of our Pro plan with no credit card required.",
  },
  {
    question: "How secure is my data on ReferralTree?",
    answer:
      "We take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits to ensure your data remains protected. Our crypto staking feature uses multi-signature wallets and cold storage for maximum security.",
  },
  {
    question: "Can I integrate ReferralTree with my existing MLM business?",
    answer:
      "Yes! ReferralTree is designed to work with any binary MLM compensation plan. We offer API access on our Pro and Enterprise plans for custom integrations with your existing systems. Our team can also assist with data migration from your current platform.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free plans include email support with a 48-hour response time. Pro plans include priority email support with a 24-hour response time. Enterprise plans include 24/7 phone support and a dedicated account manager to help you get the most out of ReferralTree.",
  },
];

const FAQ = () => {
  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We've got answers. If you can't find what you're
            looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;