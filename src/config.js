const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

const config = {
  apiBaseUrl: 'http://localhost:3001/api/',
  stripePublicKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  stripeMode: 'test'
};

export default config;
