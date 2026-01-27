import Stripe from 'stripe';
import { Pool } from '@neondatabase/serverless';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const { items, email } = await request.json();

    const client = await pool.connect();

    // Fetch product details for line items
    const lineItems = await Promise.all(
      items.map(async (item: any) => {
        const result = await client.query(
          `SELECT p.name, pt.price FROM product_tiers pt
           JOIN products p ON pt.product_id = p.id
           WHERE pt.id = $1`,
          [item.tier_id]
        );
        const tier = result.rows[0];
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tier ? `${tier.name}` : 'Unknown Product',
            },
            unit_amount: Math.round((tier?.price || 0) * 100),
          },
          quantity: item.quantity || 1,
        };
      })
    );

    client.release();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      customer_email: email,
      metadata: {
        orders: JSON.stringify(items),
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
