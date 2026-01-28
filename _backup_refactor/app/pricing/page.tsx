'use client';

import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import PricingComparison from '@/components/pricing-comparison';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Flexible subscription plans that fit your needs. Pay per product with no hidden fees.
          </p>
        </div>

        <PricingComparison />

        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes, you can cancel your subscription at any time. No long-term contracts or hidden fees.'
                },
                {
                  q: 'Do you offer discounts for annual plans?',
                  a: 'Yes! Our annual plans save you up to 20% compared to monthly billing.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards and digital payment methods through Stripe.'
                },
                {
                  q: 'Can I upgrade or downgrade my plan?',
                  a: 'Yes, you can change your subscription plan at any time. Changes take effect immediately.'
                },
                {
                  q: 'Is there a free trial available?',
                  a: 'We offer a 7-day free trial for new customers to test our platform risk-free.'
                },
                {
                  q: 'Do you offer team discounts?',
                  a: 'Yes, contact our sales team for custom pricing for teams of 5+ users.'
                },
              ].map((item, i) => (
                <div key={i} className="bg-background rounded-lg p-6 border border-border">
                  <h3 className="font-semibold mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
