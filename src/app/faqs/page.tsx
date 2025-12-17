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
    answer: "We accept credit/debit cards, PayPal, and Apple Pay for secure transactions.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5–7 business days. Express shipping options are available at checkout.",
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes! Returns and exchanges are accepted within 30 days of purchase. The item must be in its original condition.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you’ll receive an email with a tracking link to monitor your shipment in real time.",
  },
];

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white relative">
      {/* Unified red radial glow — matches all pages */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.1)_0%,transparent_20%),radial-gradient(circle_at_70%_70%,rgba(239,68,68,0.1)_0%,transparent_20%)]"></div>
      </div>

      {/* Hero Banner */}
      <section className="relative py-30 md:py-40 w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/faqs-banner.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold z-10 tracking-tight">
          FAQs
        </h1>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center mb-16">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 
                          hover:border-red-600/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-8 py-6 text-left font-semibold text-lg text-white 
                            hover:bg-gray-800/60 transition-colors group"
                  aria-expanded={openIndex === index}
                >
                  <span className="group-hover:text-red-500 transition-colors">{faq.question}</span>
                  <div className="text-red-500 transition-transform duration-300">
                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-8 py-6 text-gray-300 bg-gray-800/50 border-t border-gray-800 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqsPage;