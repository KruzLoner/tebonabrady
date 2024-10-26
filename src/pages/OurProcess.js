import React, { useState } from 'react';
import { Scissors, PenTool, Palette, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProcessStep = ({ icon, title, description, isExpanded, onToggle }) => (
  <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
    <div className="text-4xl text-indigo-600 dark:text-indigo-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
    <button
      onClick={onToggle}
      className="text-indigo-600 dark:text-indigo-400 flex items-center focus:outline-none transition-colors duration-300 hover:text-indigo-800 dark:hover:text-indigo-200"
    >
      {isExpanded ? 'Read Less' : 'Read More'}
      {isExpanded ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />}
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
      <p className="text-center text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

const OurProcess = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const processSteps = [
    {
      icon: <PenTool />,
      title: "Design",
      description: "Our creative team brainstorms and sketches innovative toy concepts, focusing on educational value, safety, and fun. We use digital tools to refine our designs before moving to prototyping."
    },
    {
      icon: <Scissors />,
      title: "Cut & Sew",
      description: "We source high-quality, eco-friendly fabrics and materials. Our skilled artisans carefully cut patterns and hand-sew each piece, ensuring durability and attention to detail in every stitch."
    },
    {
      icon: <Palette />,
      title: "Paint & Decorate",
      description: "Using non-toxic, child-safe paints and materials, we bring each toy to life with vibrant colors and charming details. This stage is where each toy develops its unique personality."
    },
    {
      icon: <Heart />,
      title: "Quality Check",
      description: "Every toy undergoes rigorous safety testing and quality control. We check for durability, ensure all components are secure, and verify that each toy meets our high standards before packaging."
    }
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12 text-gray-800 dark:text-gray-200">Our Crafting Process</h1>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            At Tebona, we pour our heart and soul into every handmade toy. Our process combines traditional craftsmanship with modern design to create unique, eco-friendly toys that spark joy and imagination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              {...step}
              isExpanded={expandedStep === index}
              onToggle={() => setExpandedStep(expandedStep === index ? null : index)}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Commitment to Quality</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We believe that every child deserves a toy that's not only fun but also safe and built to last. That's why we:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Use only the highest quality, eco-friendly materials</li>
            <li>Employ skilled artisans with years of experience</li>
            <li>Conduct rigorous safety tests on all our products</li>
            <li>Continuously innovate our designs and techniques</li>
          </ul>
        </div>

        <div className="text-center bg-indigo-100 dark:bg-indigo-900 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Ready to Experience the Magic?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover our collection of handcrafted toys and bring a piece of our passion into your home.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
          >
            Shop Our Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
