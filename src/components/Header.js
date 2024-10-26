import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Menu } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';

const Header = ({ toggleMenu }) => {
  const { cart, favorites } = useShopContext();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="sm:hidden text-gray-600 dark:text-gray-400 mr-4">
            <Menu size={24} />
          </button>
          <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">
            ENGLISH | USD
          </span>
        </div>

        <Link to="/" className="text-2xl font-light tracking-wider text-gray-800 dark:text-white">
          TEBONA
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/favorites" className="relative">
            <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
