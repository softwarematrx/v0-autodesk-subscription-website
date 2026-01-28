import Stripe from 'stripe';
import { query } from '@/lib/db';

export const runtime = 'edge';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;

  if (!stripe) {
    return Response.json({ error: 'Stripe configuration error' }, { status: 500 });
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
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orders = JSON.parse(session.metadata?.orders || '[]');

      // Update order statuses to completed
      for (const order of orders) {
        await query(
          'UPDATE orders SET status = ?, stripe_session_id = ? WHERE id = ?',
          ['completed', session.id, order.id]
        );
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
