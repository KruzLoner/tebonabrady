import React from 'react';
import { ArrowRight } from 'lucide-react';

function Collections() {
  const collections = [
    { name: 'Animal Kingdom', image: 'https://source.unsplash.com/random/800x600?toys+animals' },
    { name: 'Fantasy World', image: 'https://source.unsplash.com/random/800x600?toys+fantasy' },
    { name: 'Seasonal Specials', image: 'https://source.unsplash.com/random/800x600?toys+seasonal' },
    { name: 'Movie Characters', image: 'https://source.unsplash.com/random/800x600?toys+movie' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-normal mb-8 text-center text-gray-800 dark:text-white">Our Collections</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto font-light">
        Explore our curated collections of handmade toys, each with its own unique theme and charm. Discover the perfect toy to spark imagination and bring joy.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={collection.image} alt={collection.name} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-2xl font-normal text-white mb-2">{collection.name}</h2>
              <a href="#" className="inline-flex items-center text-white hover:underline font-light">
                Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
