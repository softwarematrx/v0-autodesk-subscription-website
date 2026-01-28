import { query } from '@/lib/db';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { email, product_id, tier_id, quantity } = await request.json();

    const result = await query('SELECT * FROM products WHERE id = ?', [product_id]);
    const product = result.rows[0];

    if (!product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    const tiers = typeof product.tiers === 'string' ? JSON.parse(product.tiers) : (product.tiers || []);
    const tier = tiers.find((t: any) => t.id === tier_id);

    if (!tier) {
      return Response.json({ error: 'Tier not found' }, { status: 404 });
    }

    const totalPrice = (tier.price * quantity * 100);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    await query(
      `INSERT INTO orders (id, email, product, amount, status, date)
       VALUES (?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP)`,
      [orderId, email, `${product.name} (${tier.duration})`, tier.price * quantity]
    );

    return Response.json({
      orderId: orderId,
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

    const result = await query(
      `SELECT * FROM orders WHERE email = ? ORDER BY date DESC`,
      [email]
    );

    return Response.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
