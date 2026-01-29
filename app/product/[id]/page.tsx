'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Check,
  Shield,
  Zap,
  Mail,
  Clock,
  ChevronRight,
  Star,
  Download,
  ShieldCheck,
  RotateCw,
  MessageSquare,
  BadgeCheck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [otherProducts, setOtherProducts] = useState<any[]>([]);
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const found = data.find((p: any) => p.id === params.id);
        if (found) {
          setProduct(found);
          // Set default tier (popular or first one)
          const defaultTier = found.tiers?.find((t: any) => t.popular) || found.tiers?.[0];
          setSelectedTier(defaultTier);
        }

        // Get other products for the recommendation section
        setOtherProducts(data.filter((p: any) => p.id !== params.id).slice(0, 4));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  const handleBuyNow = async () => {
    if (product && selectedTier) {
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email for activation');
        return;
      }

      // Log order attempt locally for administration
      try {
        await fetch('/api/admin/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
            email: email.toUpperCase(),
            product: `${product.name} (${selectedTier.duration})`,
            amount: selectedTier.price,
            status: 'processing',
            date: new Date().toISOString()
          })
        });
      } catch (e) {
        console.error('Failed to log order:', e);
      }

      if (selectedTier.checkoutUrl) {
        const whopUrl = new URL(selectedTier.checkoutUrl);
        whopUrl.searchParams.append('email', email);
        window.location.href = whopUrl.toString();
      } else {
        // Fallback to internal checkout API for a single item if no Whop link exists
        try {
          const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: [{
                id: `${product.id}-${selectedTier.id}`,
                name: `${product.name} (${selectedTier.duration})`,
                price: selectedTier.price,
                image: product.image,
                quantity: 1
              }],
              email: email
            }),
          });
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
          }
        } catch (e) {
          console.error('Checkout error:', e);
          alert('Failed to start checkout');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <RotateCw className="w-12 h-12 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 font-bold px-8">Return to Store</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10 overflow-x-auto whitespace-nowrap pb-2 font-black uppercase tracking-widest text-[10px]">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-foreground font-black italic">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: Product Visuals */}
            <div className="space-y-8">
              <div className="relative aspect-square bg-white border border-border rounded-[2.5rem] overflow-hidden group shadow-2xl">
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-20 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <div className="bg-[#00b67a] text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
                    <ShieldCheck className="w-4 h-4" /> Official Authorized
                  </div>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic">
                    <Zap className="w-4 h-4" /> Instant Delivery
                  </div>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Mail, text: 'No Keys' },
                  { icon: Download, text: 'Direct Portal' },
                  { icon: Shield, text: '100% Official' },
                  { icon: Clock, text: '24/7 Support' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                    <item.icon className="w-5 h-5 text-primary mb-2" />
                    <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Information & Purchase */}
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-[10px] font-black border-l border-border pl-4 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="text-foreground font-black text-sm italic">2,500+</span> Real Activations
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-4 uppercase italic tracking-tighter leading-[0.9]">
                  {product.name}
                </h1>
                <div className="flex gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-muted border border-border px-3 py-1.5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Windows Compatible</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted border border-border px-3 py-1.5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Mac OS Compatible</span>
                  </div>
                </div>
                <p className="text-2xl text-primary font-black mb-8 italic uppercase tracking-tight">{product.description}</p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-medium">
                  {product.fullDescription || `Experience the full potential of ${product.name} with direct account activation. Our process is 100% official, linking the subscription directly to your Autodesk ID for a seamless experience.`}
                </p>
              </div>

              {/* Price Table */}
              <div className="bg-muted/30 border border-border rounded-[2.5rem] p-8 mb-10 shadow-inner overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BadgeCheck className="w-32 h-32" />
                </div>

                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-6">Select Duration</h3>

                {/* Tier Selection */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {product.tiers?.map((tier: any) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`relative p-4 rounded-2xl border-2 transition-all text-center ${selectedTier?.id === tier.id
                        ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
                        : 'border-border bg-card hover:border-primary/30'
                        }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest italic z-10 whitespace-nowrap">
                          Best Value
                        </span>
                      )}
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{tier.duration}</div>
                      <div className="text-xl font-black text-foreground italic">${tier.price}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-baseline gap-4 mb-3 relative z-10">
                  <span className="text-6xl md:text-7xl font-black text-primary tracking-tighter italic">
                    ${selectedTier?.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-muted-foreground line-through font-black italic">
                    ${selectedTier?.originalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-[#00b67a] font-black uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Direct Account Activation Enabled
                </p>

                {/* Email Field Integration */}
                <div className="mb-6 space-y-3">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic px-1">Activation Email:</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="ENTER YOUR AUTODESK EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/50 border-2 border-border rounded-2xl py-5 pl-14 pr-6 text-sm font-black uppercase tracking-widest focus:border-primary focus:ring-0 transition-all outline-none placeholder:text-muted-foreground/30 italic"
                      required
                    />
                  </div>
                  <p className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-widest px-1 italic">We will link the subscription to this account within 5min.</p>
                </div>

                <Button
                  onClick={handleBuyNow}
                  className="w-full py-12 text-2xl font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl hover:scale-[1.02] active:scale-95 italic bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
                >
                  BUY NOW
                </Button>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-[9px] font-black uppercase tracking-widest">
                    <Check className="w-4 h-4 text-[#00b67a]" />
                    Official Subscription
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-[9px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-[#00b67a]" />
                    Encrypted Payment
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic mb-6 border-b border-border pb-4 font-black">Plan Benefits:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl group hover:border-primary/50 transition-all shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                      <span className="text-foreground text-xs font-black uppercase tracking-tight italic">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Products Strip */}
          <div className="mt-32 pt-20 border-t border-border">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-4 italic">Recommended For You</h2>
                <h3 className="text-4xl md:text-5xl font-black text-foreground uppercase italic tracking-tighter leading-none">Other Professional Tools</h3>
              </div>
              <Link href="/products">
                <Button variant="outline" className="border-2 border-border font-black uppercase tracking-widest px-8 py-6 rounded-xl hover:bg-primary hover:text-white transition-all italic text-xs">
                  View All Products
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group bg-card border border-border rounded-3xl p-6 hover:border-primary/50 transition-all hover:-translate-y-2 shadow-sm"
                >
                  <div className="relative aspect-square bg-muted/30 rounded-2xl overflow-hidden mb-6 p-10">
                    <Image src={p.image} alt={p.name} fill className="object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-foreground uppercase italic tracking-tight group-hover:text-primary transition-colors">{p.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest line-clamp-1">{p.description}</p>
                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-primary font-black italic">From ${p.tiers?.[0]?.price?.toFixed(2) || '4.99'}</span>
                      <span className="text-[9px] bg-primary/10 text-primary px-2 py-1 rounded-md font-black uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">View Detail</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Expert Support Section */}
          <div className="mt-32 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-muted/50 border border-border rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] -rotate-12 translate-x-8 -translate-y-8">
                <MessageSquare className="w-64 h-64" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-6 uppercase italic tracking-tighter text-primary">Need help?</h3>
              <p className="text-muted-foreground mb-10 max-w-xl font-medium text-lg leading-relaxed">
                Our certified Autodesk experts are available 24/7 to help you with installation, account activation, and any technical questions you might have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <Link href="/contact" className="contents">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-10 py-8 rounded-[1.25rem] text-sm uppercase tracking-widest italic shadow-xl gap-3">
                    <MessageSquare className="w-5 h-5" />
                    Message me now
                  </Button>
                </Link>
                <Link href="/contact" className="contents">
                  <Button variant="outline" className="border-border text-foreground font-black px-10 py-8 rounded-[1.25rem] text-sm uppercase tracking-widest italic hover:bg-muted-foreground/5 bg-transparent">Help Center</Button>
                </Link>
              </div>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-lg">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-inner">
                <Shield className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-foreground mb-4 uppercase italic tracking-widest">100% Official</h4>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed uppercase tracking-tight">Direct account activation. No cracks, no keys, just official Autodesk software linked to your ID.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
