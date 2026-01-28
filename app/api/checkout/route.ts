import Stripe from 'stripe';

export const runtime = 'edge';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

export async function POST(request: Request) {
  try {
    const { items, email } = await request.json();

    const host = request.headers.get('host');
    const protocol = host?.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || 'AutoCAD Subscription',
          images: item.image ? [new URL(item.image, baseUrl).toString()] : [],
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
      return Response.json({
        sessionId: 'mock_session',
        url: `${baseUrl}/success`
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
      customer_email: email,
      metadata: {
        orders: JSON.stringify(items.map((i: any) => ({ id: i.id, q: i.quantity }))),
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return Response.json({ error: error.message || 'Failed' }, { status: 500 });
  }
}
