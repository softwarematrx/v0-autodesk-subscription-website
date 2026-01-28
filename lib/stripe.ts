import Stripe from 'stripe';

// Super-safe initialization for Cloudflare build phase
const key = process.env.STRIPE_SECRET_KEY;
const isStripeConfigured = typeof key === 'string' && key.length > 10;

// @ts-ignore
export const stripe = isStripeConfigured ? new Stripe(key) : null;

export const getStripeSession = async (sessionId: string) => {
  if (!stripe) throw new Error('Stripe not configured');
  return await stripe.checkout.sessions.retrieve(sessionId);
};

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  if (!stripe) throw new Error('Stripe not configured');
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
  });
};

export const getStripeCustomer = async (customerId: string) => {
  if (!stripe) throw new Error('Stripe not configured');
  return await stripe.customers.retrieve(customerId);
};
