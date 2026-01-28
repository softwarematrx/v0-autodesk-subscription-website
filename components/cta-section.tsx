'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Star, MessageSquare } from 'lucide-react';

export default function CTASection() {
  const [basePrice, setBasePrice] = useState('49.99');
  const [product, setProduct] = useState<any>(null);
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
    <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-orange-600 text-white relative overflow-hidden">
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

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white uppercase italic tracking-tighter">
          Get AutoCAD 2026 Today
        </h2>
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed font-bold italic uppercase tracking-tight">
          Join thousands of professionals using AutoCAD. Instant email activation,
          full support, and 30-day money back guarantee.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 px-10 py-7 text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-[1.02] group border-none italic"
            onClick={() => {
              if (product) {
                const tier = product.tiers?.find((t: any) => t.popular) || product.tiers?.[0];
                if (tier?.checkoutUrl) {
                  window.location.href = tier.checkoutUrl;
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
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/20 hover:border-white px-10 py-7 text-xl bg-transparent transition-all duration-300" asChild>
            <Link href="/how-it-works">
              Learn More
            </Link>
          </Button>
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
