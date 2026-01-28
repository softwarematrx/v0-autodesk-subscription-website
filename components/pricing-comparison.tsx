'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  duration: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Standard Monthly',
    duration: '1 Month',
    price: 4.99,
    features: [
      'Full access to all features',
      'Instant email delivery',
      'Priority support',
      '24/7 technical assistance',
      'Monthly billing',
      'Cancel anytime'
    ]
  },
  {
    name: 'Pro Annual',
    duration: '12 Months',
    price: 39.99,
    features: [
      'Full access to all features',
      'Instant email delivery',
      'Priority support',
      '24/7 technical assistance',
      'Save significant vs monthly',
      'Official commercial license'
    ],
    popular: true
  },
  {
    name: 'Enterprise 2-Year',
    duration: '24 Months',
    price: 79.99,
    features: [
      'Full access to all features',
      'Instant email delivery',
      'Priority support',
      '24/7 technical assistance',
      'Long-term price lock',
      'Lifetime installation support'
    ]
  },
];

export default function PricingComparison() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include full access to premium features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_TIERS.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${tier.popular ? 'md:scale-105 border-primary' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.duration}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground ml-2">per product/month</span>
                </div>

                <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                  Get Started
                </Button>

                <div className="space-y-3 pt-6 border-t border-border">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
          <p className="text-muted-foreground mb-2">
            Need custom pricing for your team?
          </p>
          <Button variant="ghost">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
}
