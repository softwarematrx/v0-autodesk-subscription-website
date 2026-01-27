'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { Check } from 'lucide-react';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('session_id');
    setSessionId(id);

    // Clear cart after successful purchase
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="pt-12">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for your purchase. Your subscription has been activated.
              </p>

              <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-semibold">{sessionId || 'Processing...'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-green-600">Completed</p>
                </div>
              </div>

              <div className="space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
                <p className="font-semibold text-blue-900">What's Next?</p>
                <ul className="text-sm text-blue-900 space-y-2">
                  <li>✓ Check your email for subscription details</li>
                  <li>✓ Download your applications from your account</li>
                  <li>✓ Activate your license keys</li>
                  <li>✓ Access our support documentation</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground mt-8">
                Need help? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
