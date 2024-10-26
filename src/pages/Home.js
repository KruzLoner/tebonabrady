import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [springCollection, setSpringCollection] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching spring collection products...');
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch spring collection');
        }
        const data = await response.json();
        console.log('Received data:', data);
        setSpringCollection(data.products);
      } catch (error) {
        console.error('Error fetching spring collection products:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
        <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-800 dark:text-gray-200 space-y-6 max-w-3xl px-4">
            <h2 className="text-lg md:text-xl uppercase tracking-wider">HANDCRAFTED WITH LOVE</h2>
            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-wide">CUSTOM MADE - HAND SEWN TOYS</h1>
            <p className="text-sm md:text-base font-light max-w-xl mx-auto">Unique, eco-friendly toys that spark imagination and bring joy to children around the world</p>
            <Link
              to="/shop"
              className="inline-block bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              EXPLORE COLLECTION
            </Link>
            <div className="flex justify-center space-x-4 mt-8">
              <span className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 rounded-full text-xs uppercase tracking-wider">100% Handmade</span>
              <span className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 rounded-full text-xs uppercase tracking-wider">Eco-Friendly</span>
              <span className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 rounded-full text-xs uppercase tracking-wider">Safe for Kids</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-24 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900"></div>

      {/* Collection Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="container mx-auto">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">SPECIAL OFFERS</div>
          <h2 className="text-3xl text-center text-gray-800 dark:text-gray-200 mb-12 font-light">Featured Products</h2>

          {/* Product Cards */}
          <div className="flex justify-center">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : springCollection.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl">
                {springCollection.map((product) => (
                  <div key={product.id} className="flex justify-center">
                    <ProductCard
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      imageUrl={product.imageUrl}
                      isNew={product.isNew}
                      category={product.category}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No products available in the Spring 2025 Collection.</p>
            )}
          </div>

          {/* View All button */}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-block bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-8 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-700 dark:hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
