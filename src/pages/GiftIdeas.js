import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ChevronRight } from 'lucide-react';

const GiftCategory = ({ title, description, image, link }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <Link to={link} className="text-indigo-600 dark:text-indigo-400 flex items-center hover:underline">
        Explore <ChevronRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  </div>
);

const GiftIdeas = () => {
  const [giftCategories, setGiftCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch gift categories
    const fetchGiftCategories = async () => {
      setIsLoading(true);
      // Replace this with an actual API call in a real application
      const mockCategories = [
        {
          title: "For the Little Artist",
          description: "Creative toys to inspire young minds",
          image: "https://example.com/artist-toys.jpg",
          link: "/shop?category=art"
        },
        {
          title: "Educational Wonders",
          description: "Toys that make learning fun and engaging",
          image: "https://example.com/educational-toys.jpg",
          link: "/shop?category=educational"
        },
        {
          title: "Outdoor Adventures",
          description: "Encourage active play and exploration",
          image: "https://example.com/outdoor-toys.jpg",
          link: "/shop?category=outdoor"
        },
        {
          title: "Cuddly Companions",
          description: "Soft and huggable friends for all ages",
          image: "https://example.com/plush-toys.jpg",
          link: "/shop?category=plush"
        }
      ];
      setGiftCategories(mockCategories);
      setIsLoading(false);
    };

    fetchGiftCategories();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-8 text-gray-800 dark:text-gray-200">Find the Perfect Gift</h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            Discover our curated selection of handcrafted toys, perfect for every occasion and age group.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {giftCategories.map((category, index) => (
              <GiftCategory key={index} {...category} />
            ))}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Need Help Choosing?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our gift experts are here to help you find the perfect toy for any child and any occasion.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors duration-300"
          >
            Get Personalized Recommendations
          </Link>
        </div>

        <div className="text-center">
          <Gift className="inline-block w-16 h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">The Joy of Giving</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Every Tebona toy is crafted with love and care, making it a truly special gift that will be cherished for years to come.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-800"
          >
            Explore All Toys
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftIdeas;
