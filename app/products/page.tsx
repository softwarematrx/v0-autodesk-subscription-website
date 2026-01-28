'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import { Mail, Shield, Clock, RotateCw, CheckCircle2 } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase italic tracking-tighter">
              Autodesk 2026 Catalog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Choose the perfect Autodesk subscription for your professional needs. All products include instant email delivery and premium support.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap mb-12">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-black uppercase tracking-widest">
              <span className="text-xl">💬</span>
              <span>Direct Account Activation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-black uppercase tracking-widest">
              <Shield className="w-5 h-5 text-primary" />
              <span>100% Verified License</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-black uppercase tracking-widest">
              <Clock className="w-5 h-5 text-primary" />
              <span>System-Wide Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <RotateCw className="w-12 h-12 text-primary animate-spin mx-auto" />
              <p className="text-muted-foreground mt-4 font-black uppercase tracking-widest text-xs italic">Synchronizing with Inventory Matrix...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  badge={product.id === 'autocad-2026' ? 'Best Seller' : product.id === 'revit-2026' ? 'Architectural' : product.id === 'civil-3d-2026' ? 'Engineering' : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust info */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card backdrop-blur-md border border-border rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group shadow-2xl shadow-primary/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />

            <h3 className="text-2xl md:text-3xl font-black text-foreground mb-10 text-center uppercase tracking-tighter italic">What You Get After Purchase</h3>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-6">
                {[
                  'Official Subscription Activation',
                  'Direct Link to your Autodesk Account',
                  'Step-by-step onboarding guide'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#00b67a]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#00b67a]" />
                    </div>
                    <span className="text-muted-foreground font-bold uppercase tracking-tight text-xs">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  'All updates for your subscription period',
                  '24/7 dedicated customer support',
                  '30-day money back guarantee'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#00b67a]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#00b67a]" />
                    </div>
                    <span className="text-muted-foreground font-bold uppercase tracking-tight text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
