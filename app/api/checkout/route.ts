import { stripe } from '@/lib/stripe';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { items, email } = await request.json();

    const origin = new URL(request.url).origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

    const lineItems = items.map((item: any) => {
      let imageUrl = '';
      if (item.image) {
        try {
          // If item.image is already absolute, use it. Otherwise, join with baseUrl.
          imageUrl = item.image.startsWith('http')
            ? item.image
            : new URL(item.image, baseUrl).toString();
        } catch (e) {
          console.error('Invalid image URL:', item.image);
        }
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || 'AutoCAD Subscription',
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: Math.round((Number(item.price) || 0) * 100),
        },
        quantity: Math.max(1, Number(item.quantity) || 1),
      };
    });

    if (!stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
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
