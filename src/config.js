const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

const config = {
  apiBaseUrl: isDevelopment
    ? 'http://localhost:3001'
    : 'https://tebonabrady.vercel.app', // Just use the main Vercel domain without any hash
  stripePublicKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  stripeMode: 'test'
};

export default config;
