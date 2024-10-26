import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Return from './pages/Return';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomOrders from './pages/CustomOrders';
import GiftIdeas from './pages/GiftIdeas';
import OurProcess from './pages/OurProcess';
import FAQ from './pages/FAQ';
import { X } from 'lucide-react';
import './App.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
          <Header toggleMenu={toggleMenu} />
          <main className="flex-grow relative">
            {/* Overlay */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleMenu}
              ></div>
            )}

            {/* Sliding Menu for small screens */}
            <div className={`sm:hidden fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="p-4 flex justify-end">
                <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-400">
                  <X size={24} />
                </button>
              </div>
              <nav className="p-4">
                <Link to="/" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>HOME</Link>
                <Link to="/shop" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>SHOP</Link>
                <span className="block py-3 text-lg font-medium text-gray-400 dark:text-gray-500 line-through border-b border-gray-200 dark:border-gray-700">COLLECTIONS</span>
                <Link to="/gift-ideas" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>GIFT IDEAS</Link>
                <Link to="/custom-orders" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>CUSTOM ORDERS</Link>
                <Link to="/our-process" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>OUR PROCESS</Link>
                <Link to="/about" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>ABOUT</Link>
                <Link to="/faq" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 border-b border-gray-200 dark:border-gray-700" onClick={toggleMenu}>FAQ</Link>
                <Link to="/contact" className="block py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400" onClick={toggleMenu}>CONTACT</Link>
              </nav>
            </div>

            {/* Navigation for screens 525px and wider */}
            <nav className="hidden sm:flex justify-center space-x-8 py-4 border-b border-gray-200 dark:border-gray-700">
              <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">HOME</Link>
              <Link to="/shop" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">SHOP</Link>
              <span className="text-gray-400 dark:text-gray-500 line-through cursor-not-allowed">COLLECTIONS</span>
              <Link to="/gift-ideas" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">GIFT IDEAS</Link>
              <Link to="/custom-orders" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">CUSTOM ORDERS</Link>
              <Link to="/our-process" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">OUR PROCESS</Link>
              <Link to="/about" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">ABOUT</Link>
              <Link to="/faq" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">FAQ</Link>
              <Link to="/contact" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">CONTACT</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/gift-ideas" element={<GiftIdeas />} />
              <Route path="/custom-orders" element={<CustomOrders />} />
              <Route path="/our-process" element={<OurProcess />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/return" element={<Return />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ShopProvider>
  );
};

export default App;
