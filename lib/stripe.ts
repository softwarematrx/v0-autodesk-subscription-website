import Stripe from 'stripe';

// @ts-ignore - version mismatch in peer deps sometimes
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export const getStripeSession = async (sessionId: string) => {
  if (!stripe) throw new Error('Stripe is not initialized');
  return await stripe.checkout.sessions.retrieve(sessionId);
};

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  if (!stripe) throw new Error('Stripe is not initialized');
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
  });
};

export const getStripeCustomer = async (customerId: string) => {
  if (!stripe) throw new Error('Stripe is not initialized');
  return await stripe.customers.retrieve(customerId);
};
