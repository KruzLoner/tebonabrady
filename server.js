require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getProducts } = require('./functions/get-products');
const path = require('path');

const app = express();

// Configure CORS for both development and production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-vercel-project-url.vercel.app']
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// API routes
app.get('/api/products', getProducts);

app.get('/api/all-products', async (req, res) => {
  try {
    console.log('Fetching all products from Stripe...');
    const allProducts = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100,
    });

    const formattedProducts = allProducts.data.map(product => {
      const price = product.default_price ? (product.default_price.unit_amount / 100).toFixed(2) : 'N/A';
      const originalPrice = product.metadata.original_price ? (parseInt(product.metadata.original_price) / 100).toFixed(2) : null;

      return {
        id: product.id,
        title: product.name,
        price,
        originalPrice,
        imageUrl: product.images[0] || `https://via.placeholder.com/300x400?text=${product.name}`,
        isNew: product.created > Date.now() - 7 * 24 * 60 * 60 * 1000,
        category: product.metadata.category || 'Other',
      };
    });

    res.json({ products: formattedProducts });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart } = req.body;
    const FRONTEND_URL = process.env.NODE_ENV === 'production'
      ? 'https://your-live-domain.com'
      : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(parseFloat(item.price) * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      ui_mode: 'embedded',
      return_url: `${FRONTEND_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
      custom_text: {
        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: 'Failed to create checkout session', details: error.message });
  }
});

// Catch-all route to serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
