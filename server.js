require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
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

app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100,
    });

    const specialOfferProducts = allProducts.data.filter(product =>
      product.metadata && product.metadata.special_offer === 'yes'
    );

    console.log('Special offer products:', specialOfferProducts.map(p => ({
      id: p.id,
      name: p.name,
      metadata: p.metadata
    })));

    const formattedProducts = specialOfferProducts.map(product => {
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
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
