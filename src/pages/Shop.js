import React, { useState, useEffect } from 'react';
import { useShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart, toggleFavorite, isFavorite } = useShopContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        console.log('Fetching all products...');
        const response = await fetch('http://localhost:3001/api/all-products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Fetched products:', data.products);
        setAllProducts(data.products);
      } catch (error) {
        console.error('Error fetching all products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  console.log('Rendering Shop component with products:', allProducts);

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-8 text-gray-800 dark:text-gray-200">All Products</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-200"></div>
        </div>
      ) : allProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {allProducts.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard
                {...product}
                addToCart={() => addToCart(product)}
                toggleFavorite={() => toggleFavorite(product.id)}
                isFavorite={isFavorite(product.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">No products found.</p>
      )}
    </div>
  );
};

export default Shop;
