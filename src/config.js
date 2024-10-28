const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

const config = {
  apiBaseUrl: isDevelopment
    ? 'http://localhost:3001'
    : 'https://sabaportfolio.com/', // Replace with your actual domain
  stripePublicKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  stripeMode: 'test'
};

export default config;