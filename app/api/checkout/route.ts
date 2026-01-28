import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

export async function POST(request: Request) {
  try {
    const { items, email } = await request.json();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || 'AutoCAD Subscription',
          images: item.image ? [new URL(item.image, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').toString()] : [],
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    if (!process.env.STRIPE_SECRET_KEY) {
      return Response.json({
        sessionId: 'mock_session',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success`
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
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
