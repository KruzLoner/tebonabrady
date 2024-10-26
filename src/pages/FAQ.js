import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FAQ() {
  const faqs = [
    { question: "How long does shipping take?", answer: "Shipping typically takes 3-5 business days for domestic orders and 7-14 days for international orders." },
    { question: "Are your toys safe for children?", answer: "Yes, all our toys are made with child-safe materials and comply with safety standards." },
    { question: "Can I request a custom toy?", answer: "Absolutely! We love creating custom toys. Please visit our Custom Orders page for more information." },
    { question: "What is your return policy?", answer: "We offer a 30-day return policy for unused items in their original packaging." },
    { question: "How do I care for my handmade toy?", answer: "Most of our toys can be gently hand washed. Please refer to the care instructions provided with each toy." },
    { question: "Do you offer gift wrapping?", answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option at checkout." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-normal mb-8 text-center text-gray-800 dark:text-white">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} isOpen={openIndex === index} toggleFAQ={() => toggleFAQ(index)} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ faq, isOpen, toggleFAQ }) {
  const contentRef = useRef(null);

  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggleFAQ}
      >
        <h2 className="text-xl font-normal text-gray-800 dark:text-white">{faq.question}</h2>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      <div
        ref={contentRef}
        className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0' }}
      >
        <p className="text-gray-600 dark:text-gray-300 font-light">{faq.answer}</p>
      </div>
    </div>
  );
}

export default FAQ;
