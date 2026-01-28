'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Star, Shield, Zap, RotateCw, MessageSquare, Mail } from 'lucide-react';

export default function HeroSection() {
  const [product, setProduct] = useState<any>(null);
  const [salePercentage, setSalePercentage] = useState(70);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const [otherProducts, setOtherProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        const main = prodData.find((p: any) => p.id === 'autocad-2026');
        if (main) setProduct(main);

        // Get other products for the bottom strip
        setOtherProducts(prodData.filter((p: any) => p.id !== 'autocad-2026').slice(0, 3));

        const settRes = await fetch('/api/admin/settings');
        const settData = await settRes.json();
        if (settData.saleEnabled) setSalePercentage(settData.salePercentage);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="AutoCAD 2026"
          fill
          className="object-cover object-center opacity-30 dark:opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Instant Activation</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground font-semibold">Official Authorized Reseller</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight text-foreground tracking-tighter uppercase italic">
                AutoCAD 2026<br />
                <span className="gradient-text not-italic">Premium Access</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed font-medium">
                The industry standard for 2D and 3D design. Experience the power of AutoCAD 2026 with
                direct account activation and official support.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Windows & Mac', icon: Zap },
                  { label: 'Instant Connect', icon: RotateCw },
                  { label: '100% Genuine', icon: Shield },
                  { label: 'Official Support', icon: Check }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground text-sm font-bold uppercase tracking-tight">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex flex-col gap-4 w-full sm:w-auto">
                  <div className="relative group min-w-[300px]">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="Enter activation email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/50 border-2 border-border rounded-2xl py-4 pl-14 pr-6 text-sm font-black uppercase tracking-widest focus:border-primary focus:ring-0 transition-all outline-none placeholder:text-muted-foreground/30 italic"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-8 py-8 text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all rounded-2xl italic"
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
                              product: `${product.name} (Quick Buy)`,
                              amount: tier?.price || 39.99,
                              status: 'processing',
                              date: new Date().toLocaleString('fr-FR')
                            })
                          });
                        } catch (e) { }

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
                    BUY NOW - $39.99
                  </Button>
                </div>
                <Link href="/how-it-works" className="contents">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary/20 bg-background/50 backdrop-blur-md text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-8 text-lg font-black uppercase tracking-widest transition-all rounded-2xl italic">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                  <span className="text-foreground font-black ml-2 text-lg italic">4.9/5</span>
                </div>
                <div className="text-muted-foreground text-sm font-bold uppercase tracking-widest border-l border-border pl-6">
                  <span className="text-foreground font-black text-xl">2,500+</span> Satisfied Designers
                </div>
              </div>
            </div>

            {/* Right Content - Product Card */}
            <div className="relative">
              {!product ? (
                <div className="flex items-center justify-center aspect-square bg-card/30 rounded-[2.5rem] border border-border animate-pulse">
                  <RotateCw className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : (
                <div className="relative bg-card/60 backdrop-blur-3xl border border-border rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in duration-500 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground font-black px-6 py-3 rounded-full text-sm shadow-2xl shadow-primary/20 animate-pulse-glow uppercase tracking-widest italic z-20">
                    SAVE {salePercentage}%
                  </div>

                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative w-full aspect-square mb-8 rounded-3xl overflow-hidden bg-white px-8 border border-border group-hover:scale-105 transition-transform duration-700 shadow-inner">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>

                    <h3 className="text-3xl font-black text-foreground mb-2 uppercase italic tracking-tighter hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-muted-foreground mb-6 font-bold uppercase tracking-widest text-xs">{product.description}</p>
                  </Link>

                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="text-6xl font-black text-primary tracking-tighter italic">From ${product.tiers?.[0]?.price.toFixed(2)}</span>
                    <span className="text-2xl text-muted-foreground/50 line-through font-black text-muted-foreground/50">${product.tiers?.[0]?.originalPrice.toFixed(2)}</span>
                  </div>

                  <Link href={`/product/${product.id}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-10 text-xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all rounded-[1.25rem] uppercase tracking-[0.2em] italic">
                      Configure Subscription
                    </Button>
                  </Link>
                </div>
              )}

              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-20">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-black tracking-widest uppercase italic border-l border-white/20 pl-3">Official Certification</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Products Section - Below Hero */}
      <div className="bg-muted/30 border-t border-border py-12 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-sm font-black text-muted-foreground uppercase tracking-[0.3em] mb-1 italic">Other Professional Tools</h4>
              <p className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Starting at only $4.99/mo</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group flex items-center gap-4 bg-card border border-border pl-6 pr-8 py-3 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm"
                >
                  <div className="relative w-12 h-12">
                    <Image src={p.image} alt={p.name} fill className="object-contain group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-foreground uppercase tracking-tight italic leading-tight">{p.name}</div>
                    <div className="text-[9px] font-bold text-primary uppercase tracking-widest">From ${p.tiers?.[0]?.price?.toFixed(2) || '4.99'}</div>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/products" className="shrink-0">
              <Button variant="ghost" className="text-xs font-black uppercase tracking-widest border border-border px-6 rounded-xl hover:bg-primary hover:text-white transition-all italic">
                View Full Catalog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
