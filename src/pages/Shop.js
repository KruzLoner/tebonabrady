import React, { useState, useEffect } from 'react';
import { useShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import config from '../config';

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart, toggleFavorite, isFavorite } = useShopContext();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        console.log('Fetching all products...');
        const response = await fetch(`${config.apiBaseUrl}all-products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data.products);
        // Log a few products to check their structure
        console.log('Sample products:', data.products.slice(0, 3));
        setAllProducts(data.products);
        setFilteredProducts(data.products);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching all products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter(product =>
      selectedCategory === 'All' || product.category === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, allProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  console.log('Rendering Shop component with filtered products:', filteredProducts);

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-8 text-gray-800 dark:text-gray-200">All Products</h1>

      <div className="flex flex-col md:flex-row">
        {/* Category filter on the left */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:pr-8">
          <h2 className="text-xl font-light mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">Categories</h2>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left p-2 rounded transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products grid on the right */}
        <div className="w-full md:w-3/4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-200"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    imageUrl={product.imageUrl}
                    isNew={product.isNew}
                    category={product.category}
                    addToCart={() => addToCart(product)}
                    toggleFavorite={() => toggleFavorite(product.id)}
                    isFavorite={isFavorite(product.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 text-lg">No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
