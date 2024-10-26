import React from 'react';

function CustomOrders() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-normal mb-8 text-center text-gray-800 dark:text-white">Custom Orders</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 font-light">
        Want a unique, personalized toy? We'd love to bring your ideas to life!
      </p>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-normal mb-6 text-gray-800 dark:text-white">How it works:</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300 font-light">
          <li>Describe your ideal toy</li>
          <li>We'll provide a quote and timeline</li>
          <li>Approve the design</li>
          <li>We create your custom toy</li>
          <li>Receive your one-of-a-kind creation!</li>
        </ol>
      </div>
    </div>
  );
}

export default CustomOrders;
