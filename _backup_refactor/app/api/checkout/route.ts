import Stripe from 'stripe';
import { Pool } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const { items, email } = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return Response.json({ error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY.' }, { status: 500 });
    }

    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, using mock checkout flow');
      // In a real mock flow, you might return a fake Stripe URL or a success message
      return Response.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id=mock_session`,
        message: 'Mock checkout successful (Database/Stripe not configured)'
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cart`,
      customer_email: email,
      metadata: {
        orders: JSON.stringify(items),
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: 'Checkout failed. Please ensure environment variables are correct.' }, { status: 500 });
  }
}
