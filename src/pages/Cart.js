import React, { useState } from 'react';
import { useShopContext } from '../context/ShopContext';
import { X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import config from '../config';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
  console.error('REACT_APP_STRIPE_PUBLISHABLE_KEY is not set!');
}

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useShopContext();
  const [clientSecret, setClientSecret] = useState('');

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-light mb-8 uppercase text-gray-800 dark:text-gray-200">Shopping Bag</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {clientSecret ? (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-6">
                  <img src={item.imageUrl} alt={item.title} className="w-32 h-32 object-cover" />
                  <div>
                    <h2 className="font-light text-lg uppercase text-gray-800 dark:text-gray-200">{item.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase sm:hidden mt-1">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="font-light hidden sm:block text-gray-800 dark:text-gray-200">${item.price}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200">-</button>
                    <span className="text-gray-800 dark:text-gray-200">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="w-6 h-6 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="lg:w-1/3 bg-gray-100 dark:bg-gray-800 p-6">
          <h2 className="text-xl font-light mb-4 uppercase text-gray-800 dark:text-gray-200">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="font-light uppercase text-gray-800 dark:text-gray-200">{item.title}</span>
                <span className="text-gray-800 dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 dark:border-gray-600 mt-4 pt-4">
            <div className="flex justify-between font-light">
              <span className="text-gray-800 dark:text-gray-200">Subtotal</span>
              <span className="text-gray-800 dark:text-gray-200">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-light mt-2">
              <span className="text-gray-800 dark:text-gray-200">Sales Tax</span>
              <span className="text-gray-800 dark:text-gray-200">Included</span>
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-600 mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-800 dark:text-gray-200">Total</span>
              <span className="text-gray-800 dark:text-gray-200">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          {!clientSecret && (
            <button
              onClick={handleCheckout}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 mt-6 uppercase font-light tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
