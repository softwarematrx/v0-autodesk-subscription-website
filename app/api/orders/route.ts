import { Pool } from '@neondatabase/serverless';

export const runtime = 'edge';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const { email, product_id, tier_id, quantity } = await request.json();

    const client = await pool.connect();

    // Get product and tier info
    const productResult = await client.query(
      'SELECT * FROM products WHERE id = $1',
      [product_id]
    );
    const tierResult = await client.query(
      'SELECT * FROM product_tiers WHERE id = $1',
      [tier_id]
    );

    if (!productResult.rows[0] || !tierResult.rows[0]) {
      client.release();
      return Response.json({ error: 'Product or tier not found' }, { status: 404 });
    }

    const product = productResult.rows[0];
    const tier = tierResult.rows[0];
    const totalPrice = (tier.price * quantity * 100); // Convert to cents for Stripe

    // Create order in database
    const orderResult = await client.query(
      `INSERT INTO orders (email, product_id, tier_id, quantity, total_price, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING *`,
      [email, product_id, tier_id, quantity, tier.price * quantity]
    );

    client.release();

    return Response.json({
      order: orderResult.rows[0],
      stripeAmount: totalPrice,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return Response.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const client = await pool.connect();
    const result = await client.query(
      `SELECT o.*, p.name as product_name, pt.duration, pt.price
       FROM orders o
       JOIN products p ON o.product_id = p.id
       JOIN product_tiers pt ON o.tier_id = pt.id
       WHERE o.email = $1
       ORDER BY o.created_at DESC`,
      [email]
    );
    client.release();
    return Response.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
