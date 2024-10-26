import React from 'react';
import { Lightbulb, Palette, Scissors, Hammer, CheckCircle, Gift } from 'lucide-react';

function OurProcess() {
  const steps = [
    { name: 'Ideation', icon: Lightbulb, description: 'We start with a spark of imagination, sketching out ideas for new toy designs.' },
    { name: 'Design', icon: Palette, description: 'Our designs are refined and detailed, ensuring each toy is both beautiful and functional.' },
    { name: 'Material Selection', icon: Scissors, description: 'We carefully choose high-quality, safe materials for each toy.' },
    { name: 'Crafting', icon: Hammer, description: 'Each toy is lovingly handcrafted by our skilled artisans.' },
    { name: 'Quality Check', icon: CheckCircle, description: 'We thoroughly inspect each toy to ensure it meets our high standards.' },
    { name: 'Finishing Touches', icon: Gift, description: 'Final details are added to make each toy special and unique.' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-normal mb-8 text-center text-gray-800 dark:text-white">Our Process</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto font-light">
        Discover how we bring our handmade toys to life, from initial concept to the finished product.
      </p>
      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start mb-12">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <step.icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-normal mb-2 text-gray-800 dark:text-white">{index + 1}. {step.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 font-light">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurProcess;
