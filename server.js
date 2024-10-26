require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getProducts } = require('./functions/get-products');
const path = require('path');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.get('/api/products', getProducts);

// Add this new route
app.get('/api/all-products', async (req, res) => {
  try {
    console.log('Fetching all products from Stripe...');
    const allProducts = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100, // Adjust this if you have more than 100 products
    });

    console.log(`Fetched ${allProducts.data.length} products from Stripe`);

    const formattedProducts = allProducts.data.map(product => {
      const price = product.default_price ? (product.default_price.unit_amount / 100).toFixed(2) : 'N/A';
      const originalPrice = product.metadata.original_price ? (parseInt(product.metadata.original_price) / 100).toFixed(2) : null;

      return {
        id: product.id,
        title: product.name,
        price,
        originalPrice,
        imageUrl: product.images[0] || `https://via.placeholder.com/300x400?text=${product.name}`,
        isNew: product.created > Date.now() - 7 * 24 * 60 * 60 * 1000, // New if created in the last week
        category: product.metadata.category || 'Other',
      };
    });

    console.log(`Sending ${formattedProducts.length} formatted products to client`);
    res.json({ products: formattedProducts });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set!');
  process.exit(1);
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart } = req.body;
    console.log('Received cart:', cart);

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

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
