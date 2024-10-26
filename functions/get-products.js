const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getProducts(req, res) {
  console.log('Function `get-products` invoked');
  console.log('Query parameters:', req.query);

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const limit = parseInt(req.query.limit) || 100; // Default to 100 if no limit is provided

  try {
    console.log(`Attempting to fetch ${limit} products from Stripe...`);
    const allProducts = await stripe.products.list({
      expand: ['data.default_price'],
      limit: limit,
    });

    console.log(`Fetched ${allProducts.data.length} total products from Stripe`);
    console.log('All products metadata:', allProducts.data.map(p => ({ id: p.id, metadata: p.metadata })));

    console.log('All products:', allProducts.data.map(p => ({
      id: p.id,
      name: p.name,
      metadata: p.metadata
    })));

    const specialOfferProducts = allProducts.data.filter(product =>
      product.metadata && product.metadata.special_offer === 'yes'
    );

    console.log('Filtered special offer products:', specialOfferProducts.map(p => ({
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
        isNew: product.created > Date.now() - 7 * 24 * 60 * 60 * 1000, // New if created in the last week
        category: product.metadata.category || 'Other',
      };
    });

    console.log('Formatted special offer products:', JSON.stringify(formattedProducts, null, 2));

    return res.status(200).json({ products: formattedProducts });
  } catch (error) {
    console.error('Error in get-products function:', error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}

module.exports = { getProducts };
