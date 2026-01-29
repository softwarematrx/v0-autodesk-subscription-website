'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Star, MessageSquare, Mail } from 'lucide-react';

export default function CTASection() {
  const [basePrice, setBasePrice] = useState('49.99');
  const [product, setProduct] = useState<any>(null);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const mainProduct = data.find((p: any) => p.id === 'autocad-2026');
        if (mainProduct) {
          setBasePrice(mainProduct.price.toFixed(2));
          setProduct(mainProduct);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPrice();
  }, []);

  return (
    <section className="py-10 md:py-12 bg-gradient-to-br from-primary via-primary/90 to-orange-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-black/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Genuine Subscription</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Instant Activation</span>
          </div>
        </div>

        <h2 className="text-xl md:text-3xl font-black mb-4 text-white uppercase italic tracking-tighter">
          Get AutoCAD 2026 Today
        </h2>
        <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed font-bold italic uppercase tracking-tight">
          Join thousands of professionals using AutoCAD. Instant email activation,
          and official support.
        </p>

        <div className="flex flex-col items-center gap-6 mb-8 max-w-md mx-auto">
          <div className="relative group w-full">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-white transition-colors" />
            <input
              type="email"
              placeholder="ENTER ACTIVATION EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-5 pl-14 pr-6 text-sm font-black uppercase tracking-widest focus:border-white focus:ring-0 transition-all outline-none placeholder:text-white/40 italic text-white"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 px-8 py-3.5 text-xs font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] group border-none italic"
              onClick={async () => {
                if (product) {
                  if (!email || !email.includes('@')) {
                    alert('Please enter a valid email for activation');
                    return;
                  }

                  const tier = product.tiers?.find((t: any) => t.popular) || product.tiers?.[0];

                  // Log attempt
                  try {
                    await fetch('/api/admin/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        id: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
                        email: email.toUpperCase(),
                        product: `${product.name} (CTA Quick Buy)`,
                        amount: tier?.price || 39.99,
                        status: 'processing',
                        date: new Date().toISOString()
                      })
                    });
                  } catch (e) { }

                  // Track Facebook Event
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'InitiateCheckout', {
                      content_name: product.name,
                      content_category: 'Software',
                      value: tier?.price || 39.99,
                      currency: 'USD'
                    });
                  }

                  if (tier?.checkoutUrl) {
                    const whopUrl = new URL(tier.checkoutUrl);
                    whopUrl.searchParams.append('email', email);
                    window.location.href = whopUrl.toString();
                  } else {
                    router.push(`/product/${product.id}`);
                  }
                } else {
                  router.push('/products');
                }
              }}
            >
              BUY NOW - ${basePrice}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/20 hover:border-white px-8 py-3.5 text-xs bg-transparent transition-all duration-300" asChild>
              <Link href="/how-it-works">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-sm font-black uppercase tracking-widest italic opacity-80 flex items-center justify-center gap-6">
          <span>💬 Official Subscription</span>
          <span className="opacity-30">|</span>
          <span>🛡️ 30-day money back guarantee</span>
          <span className="opacity-30">|</span>
          <span>⚡ Instant email activation</span>
        </p>
      </div>
    </section>
  );
}
