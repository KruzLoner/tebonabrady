import React from 'react';
import { Gift } from 'lucide-react';

function GiftIdeas() {
  const giftCategories = [
    { name: 'For Kids', icon: '👶' },
    { name: 'For Adults', icon: '🧑' },
    { name: 'Birthdays', icon: '🎂' },
    { name: 'Holidays', icon: '🎄' },
    { name: 'Just Because', icon: '💝' },
    { name: 'Collectibles', icon: '🏆' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-normal mb-8 text-center text-gray-800 dark:text-white">Gift Ideas</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto font-light">
        Find the perfect handmade toy gift for any occasion. Our unique creations are sure to delight both children and adults alike.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {giftCategories.map((category, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl">
            <div className="text-4xl mb-4">{category.icon}</div>
            <h2 className="text-xl font-normal mb-4 text-gray-800 dark:text-white">{category.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 font-light">
              Explore our selection of handmade toys perfect for {category.name.toLowerCase()}. Each item is crafted with care and attention to detail.
            </p>
            <a href="#" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#333] hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300">
              View Gifts <Gift className="ml-2 h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftIdeas;
