'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { Trash2, Plus, Minus, ShoppingBag, Shield, Mail, CheckCircle, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!email) {
      alert('Please enter your email to proceed. This is where your activation details will be sent.');
      return;
    }

    setLoading(true);

    // 1. Log the attempt to the admin dashboard
    try {
      await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          status: items[0]?.checkoutUrl ? 'processing' : 'processing'
        }),
      });
    } catch (e) {
      console.error('Failed to log order attempt:', e);
    }

    // 2. Redirect to Whop or internal Stripe
    const externalUrl = items[0]?.checkoutUrl;
    if (externalUrl) {
      // Append email as query param if Whop supports it (optional)
      const whopUrl = new URL(externalUrl);
      whopUrl.searchParams.append('email', email);
      window.location.href = whopUrl.toString();
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-12 uppercase italic tracking-tighter leading-none">Complete Your <span className="text-primary italic">Purchase</span></h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              {items.length === 0 ? (
                <Card className="bg-card border-border shadow-2xl rounded-[2.5rem] overflow-hidden">
                  <CardContent className="pt-24 pb-20 text-center">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-4 uppercase italic tracking-tighter">Your cart is empty</h2>
                    <p className="text-muted-foreground mb-10 font-medium text-lg max-w-sm mx-auto">Add some AutoCAD products to get started on your next design.</p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-[0.2em] px-12 py-8 rounded-[1.25rem] text-sm italic shadow-xl shadow-primary/20" asChild>
                      <Link href="/products">
                        Browse Products
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <Card key={item.id} className="bg-card border-border hover:border-primary/30 transition-all rounded-[2rem] shadow-sm hover:shadow-xl overflow-hidden group">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                          {/* Product Image */}
                          <div className="w-32 h-32 relative rounded-2xl overflow-hidden bg-muted flex-shrink-0 border border-border group-hover:bg-primary/5 transition-colors">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-black text-2xl text-foreground uppercase italic tracking-tight mb-2 leading-none">{item.name}</h3>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4">
                              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-muted px-3 py-1.5 rounded-full italic border border-border">1-Year Subscription</span>
                              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest bg-muted px-3 py-1.5 rounded-full italic border border-border">Windows & Mac</span>
                            </div>
                            <p className="font-black text-primary text-2xl italic tracking-tight">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="flex flex-col items-center sm:items-end gap-6 w-full sm:w-auto">
                            <div className="flex items-center gap-6">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-1 border border-border rounded-2xl bg-muted/30 p-1.5 shadow-inner">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-xl transition-all text-muted-foreground hover:text-foreground shadow-sm active:scale-90"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-black text-foreground text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-10 h-10 flex items-center justify-center hover:bg-background rounded-xl transition-all text-muted-foreground hover:text-foreground shadow-sm active:scale-90"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-12 h-12 flex items-center justify-center text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group-hover:text-red-500/60"
                              >
                                <Trash2 className="w-6 h-6" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-center sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em] mb-1 italic">Line Total</p>
                              <p className="text-2xl font-black text-foreground tracking-tighter italic leading-none">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Summary */}
            <div className="lg:col-span-4">
              <Card className="sticky top-28 bg-card border-border shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="border-b border-border bg-muted/10">
                  <CardTitle className="text-foreground uppercase tracking-[0.3em] text-[10px] font-black italic">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-8 space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-black uppercase tracking-widest italic text-[9px]">Subtotal</span>
                      <span className="text-foreground font-black italic text-lg tracking-tight">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-black uppercase tracking-widest italic text-[9px]">Delivery</span>
                      <span className="text-[#00b67a] font-black uppercase text-[10px] tracking-widest bg-[#00b67a]/10 px-3 py-1.5 rounded-full italic border border-[#00b67a]/20 flex items-center gap-2">
                        <span className="text-xs">💬</span>
                        Direct Activation
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-8">
                    <div className="flex justify-between items-center mb-10">
                      <span className="font-black text-foreground uppercase tracking-[0.2em] text-[10px] italic">Grand Total</span>
                      <span className="text-4xl font-black text-primary tracking-tighter italic leading-none">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl p-3 animate-pulse">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest italic">Price Lock Guaranteed: $39.99</span>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-5 top-5 w-5 h-5 text-muted-foreground/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-14 pr-6 py-5 bg-muted/30 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/30 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2 italic">
                    <p className="text-[9px] text-muted-foreground font-black px-1 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-[#00b67a]" />
                      Validated secured delivery channel
                    </p>
                    <p className="text-[9px] text-muted-foreground font-black px-1 uppercase tracking-wider flex items-center gap-2 opacity-60">
                      <Shield className="w-3 h-3 text-blue-500" />
                      Transactions secured by Stripe®
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={handleCheckout}
                      disabled={items.length === 0 || loading || !email}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-10 text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-2xl italic"
                      size="lg"
                    >
                      {loading ? 'Processing...' : 'Complete Purchase'}
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted font-black text-[10px] tracking-[0.3em] h-14 rounded-2xl uppercase italic"
                      asChild
                    >
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </div>

                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full text-red-500/20 hover:text-red-500 hover:bg-red-500/5 uppercase font-black text-[9px] tracking-[0.3em] h-8 rounded-xl italic transition-all"
                      onClick={() => {
                        if (confirm('Clear all items from cart?')) {
                          clearCart();
                        }
                      }}
                    >
                      Empty Cart
                    </Button>
                  )}

                  {/* Trust badges */}
                  <div className="pt-8 border-t border-border space-y-5">
                    {[
                      { Icon: () => <span className="text-sm">💬</span>, text: 'Direct Account Activation' },
                      { Icon: () => <Shield className="w-4 h-4 text-primary" />, text: 'Secure SSL Payments' },
                      { Icon: () => <CheckCircle className="w-4 h-4 text-primary" />, text: '30-Day Money Back' }
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center gap-4 text-muted-foreground text-[10px] font-black uppercase tracking-widest italic group">
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                          <badge.Icon />
                        </div>
                        <span>{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Center */}
              <div className="mt-8 p-8 bg-muted/20 border border-border rounded-[2.5rem] space-y-6">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-4">Official Purchase Protocol</h4>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-foreground uppercase italic tracking-widest mb-1">Guaranteed Activation</h5>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight leading-relaxed">Our systems are synchronized with Autodesk global servers for immediate subscription verification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#00b67a]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[#00b67a]/20">
                    <CheckCircle className="w-6 h-6 text-[#00b67a]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-foreground uppercase italic tracking-widest mb-1">Authenticated Delivery</h5>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight leading-relaxed">Official installation binaries and account linking portal accessed via your verified email entity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
