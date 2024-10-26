const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getProducts(req, res) {
  console.log('Function `get-products` invoked');

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    console.log('Attempting to fetch all products from Stripe...');
    const allProducts = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100, // Adjust this if you have more than 100 products
    });

    console.log(`Fetched ${allProducts.data.length} total products from Stripe`);

    allProducts.data.forEach(product => {
      console.log(`Product ${product.name} metadata:`, product.metadata);
      console.log(`spring_collection value:`, product.metadata.spring_collection);
    });

    const springProducts = allProducts.data.filter(product =>
      product.metadata && product.metadata.spring_collection === 'true'
    );

    console.log(`Filtered ${springProducts.length} spring collection products`);
    console.log('Raw spring collection products:', JSON.stringify(springProducts, null, 2));

    const formattedProducts = springProducts.map(product => {
      const price = product.default_price ? (product.default_price.unit_amount / 100).toFixed(2) : 'N/A';

      return {
        id: product.id,
        title: product.name,
        price,
        imageUrl: product.images[0] || `https://via.placeholder.com/300x400?text=${product.name}`,
        isNew: product.created > Date.now() - 7 * 24 * 60 * 60 * 1000, // New if created in the last week
        category: product.metadata.category || 'Uncategorized',
      };
    });

    console.log('Formatted spring collection products:', JSON.stringify(formattedProducts, null, 2));

    return res.status(200).json({ products: formattedProducts });
  } catch (error) {
    console.error('Error in get-products function:', error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}

module.exports = { getProducts };
