import React from 'react';
import { useShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  const { favorites, products } = useShopContext();

  // Ensure favorites and products are arrays before filtering
  const favoriteProducts = Array.isArray(products) && Array.isArray(favorites)
    ? products.filter(product => favorites.includes(product.id))
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-light text-center mb-8">Your Favorites</h1>
      {favoriteProducts.length === 0 ? (
        <p className="text-center text-gray-600">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
