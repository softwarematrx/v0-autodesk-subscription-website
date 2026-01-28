import Stripe from 'stripe';
import { Pool } from '@neondatabase/serverless';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;

  if (!stripe || !pool) {
    return Response.json({ error: 'System configuration error' }, { status: 500 });
  }

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const client = await pool.connect();

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orders = JSON.parse(session.metadata?.orders || '[]');

      // Update order statuses to completed
      for (const order of orders) {
        await client.query(
          'UPDATE orders SET status = $1, stripe_session_id = $2, updated_at = NOW() WHERE id = $3',
          ['completed', session.id, order.id]
        );
      }
    }

    client.release();
    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
