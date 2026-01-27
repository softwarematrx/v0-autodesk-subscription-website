'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email || items.length === 0) {
      alert('Please enter your email and add items to cart');
      return;
    }

    setLoading(true);
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

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {items.length === 0 ? (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <p className="text-muted-foreground mb-4">Your cart is empty</p>
                    <Link href="/products">
                      <Button>Continue Shopping</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.tier_id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.product_name}</h3>
                            <p className="text-sm text-muted-foreground">{item.duration} subscription</p>
                            <p className="font-bold text-primary mt-2">${item.price}</p>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 border border-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.tier_id, item.quantity - 1)}
                                className="p-1 hover:bg-muted"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-3 font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.tier_id, item.quantity + 1)}
                                className="p-1 hover:bg-muted"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right min-w-24">
                              <p className="text-sm text-muted-foreground">Subtotal</p>
                              <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeItem(item.tier_id)}
                              className="text-destructive hover:bg-destructive/10 p-2 rounded"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 border border-border rounded-lg"
                    />
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={items.length === 0 || loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => window.location.href = '/products'}
                  >
                    Continue Shopping
                  </Button>

                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm('Clear all items from cart?')) {
                          clearCart();
                        }
                      }}
                    >
                      Clear Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
