import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-light mb-2">About Us</h3>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mb-4"></div>
            <p className="text-sm font-light">Tebona crafts unique, eco-friendly toys that inspire imagination and bring joy to children worldwide.</p>
          </div>
          <div>
            <h3 className="text-lg font-light mb-2">Quick Links</h3>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mb-4"></div>
            <ul className="space-y-2 font-light">
              <li><Link to="/shop" className="hover:text-gray-800 dark:hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/gift-ideas" className="hover:text-gray-800 dark:hover:text-white transition-colors">Gift Ideas</Link></li>
              <li><Link to="/custom-orders" className="hover:text-gray-800 dark:hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link to="/our-process" className="hover:text-gray-800 dark:hover:text-white transition-colors">Our Process</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-light mb-2">Customer Service</h3>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mb-4"></div>
            <ul className="space-y-2 font-light">
              <li><Link to="/contact" className="hover:text-gray-800 dark:hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gray-800 dark:hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-gray-800 dark:hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-gray-800 dark:hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-light mb-2">Connect With Us</h3>
            <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mb-4"></div>
            <div className="space-y-2 font-light">
              <a href="https://instagram.com/satamashobyteo" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-800 dark:hover:text-white transition-colors">
                <Instagram className="mr-2" />
                <span>@satamashobyteo</span>
              </a>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="mr-2" />
                <span>info@tebona.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm font-light">&copy; {new Date().getFullYear()} Tebona. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
