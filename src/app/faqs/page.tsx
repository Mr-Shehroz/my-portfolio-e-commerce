"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and Apple Pay for secure transactions."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping options are available at checkout."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes! Returns and exchanges are accepted within 30 days of purchase. The item must be in its original condition."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide. Shipping costs and delivery times vary depending on the destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with a tracking link to monitor your shipment."
  },
];

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Banner */}
      <section className="relative h-64 w-full bg-[url('/faqs-banner.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="text-5xl font-bold text-white z-10">FAQs</h1>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 xl:px-10 max-w-360 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-300 bg-gray-800 transition-all">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FaqsPage;
