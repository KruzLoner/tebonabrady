import React, { useCallback } from 'react';
import { Heart, ShoppingBag, Plus } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  imageUrl,
  isNew,
  category,
}) => {
  console.log(`ProductCard for ${title}:`, { price, originalPrice });

  const { addToCart, toggleFavorite, isFavorite } = useShopContext();
  const navigate = useNavigate();
  const productId = id || title;

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(productId);
  }, [toggleFavorite, productId]);

  const handleAddToCart = useCallback(() => {
    addToCart({ id: productId, title, price, imageUrl });
  }, [addToCart, productId, title, price, imageUrl]);

  const handleBuyNow = useCallback(async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: [{ id: productId, title, price, imageUrl, quantity: 1 }] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { clientSecret } = await response.json();
      navigate('/checkout', { state: { clientSecret } });
    } catch (error) {
      console.error('Error during buy now:', error);
    }
  }, [productId, title, price, imageUrl, navigate]);

  const productIsFavorite = isFavorite(productId);

  return (
    <div className="group relative w-full max-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-w-3 aspect-h-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-white text-gray-900 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 rounded-full shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-white px-3 py-1 text-xs font-light tracking-wider shadow-sm rounded-full">
              NEW
            </span>
          )}
          <span className="bg-white px-3 py-1 text-xs tracking-wider shadow-sm rounded-full">
            {category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${productIsFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-sm tracking-wide mb-1 truncate text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-light text-gray-900 dark:text-white">${price}</span>
            {originalPrice && (
              <span className="text-xs font-light text-gray-500 line-through">${originalPrice}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-1 text-xs rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
