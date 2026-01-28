'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Download, Shield, ArrowRight, Share2, RotateCw } from 'lucide-react';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderNumber] = useState(`AS-${Math.floor(Math.random() * 90000) + 10000}`);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Success Icon */}
          <div className="relative mb-12">
            <div className="absolute inset-x-0 top-0 h-32 bg-primary/10 blur-[100px] rounded-full mx-auto w-32" />
            <div className="relative w-24 h-24 bg-[#00b67a] rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#00b67a]/30 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase italic tracking-tighter text-foreground leading-none">
            Purchase <span className="text-primary italic">Successful!</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
            Thank you for your order. Your AutoCAD subscription is being activated directly on your account. You will receive an official confirmation message shortly.
          </p>

          <div className="bg-card border border-border rounded-[3rem] p-8 md:p-12 mb-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
              <CheckCircle className="w-64 h-64" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 text-left h-full relative z-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic mb-3">Order Number</h3>
                  <p className="text-3xl font-black text-foreground font-mono tracking-tighter italic">{orderNumber}</p>
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic mb-3">Delivery Method</h3>
                  <p className="text-lg font-black text-primary italic uppercase tracking-tight">Direct Account Activation</p>
                </div>
                <div className="pt-8 border-t border-border space-y-5">
                  <div className="flex items-center gap-4 text-muted-foreground font-black uppercase tracking-widest text-[10px] italic">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">💬</span>
                    </div>
                    <span>Subscription confirmation message</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground font-black uppercase tracking-widest text-[10px] italic">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                    <span>Follow instructions in PDF guide</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-[2rem] p-8 border border-border flex flex-col justify-center items-center text-center shadow-inner">
                <Shield className="w-16 h-16 text-[#00b67a] mb-6" />
                <h4 className="text-xl font-black text-foreground mb-4 uppercase italic tracking-tighter">Genuine License</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                  Your purchase is protected. All our licenses are authentic and come with full Autodesk updates and 24/7 technical support.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'AutoCAD Store',
                        text: 'Just got my AutoCAD subscription! Check out these deals.',
                        url: window.location.origin,
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(window.location.origin);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="flex items-center gap-3 text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-[0.2em] transition-all italic h-auto p-0 hover:bg-transparent"
                >
                  <Share2 className="w-4 h-4" /> Share Experience
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-12 py-10 text-lg uppercase tracking-[0.2em] italic shadow-2xl shadow-primary/20 rounded-2xl transition-all hover:scale-[1.02]" asChild>
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground font-black px-12 py-10 text-lg hover:bg-muted uppercase tracking-[0.2em] italic rounded-2xl transition-all h-auto bg-transparent" asChild>
              <Link href="/">
                Back to Home <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/20 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-foreground mb-4 italic uppercase tracking-tighter leading-none">Need immediate assistance?</h3>
              <p className="text-muted-foreground font-medium max-w-lg text-lg leading-relaxed">Our licensing experts are standing by. If you haven't received your key within 5 minutes, please reach out directly.</p>
            </div>
            <Button size="lg" className="bg-foreground text-background hover:scale-105 transition-all font-black px-12 h-20 uppercase tracking-[0.2em] text-sm italic rounded-[1.5rem] shadow-2xl w-full md:w-auto shrink-0 relative z-10" asChild>
              <Link href="/contact">
                MESSAGE ME NOW
              </Link>
            </Button>
          </div>

          <p className="mt-16 text-xs text-muted-foreground font-black uppercase tracking-[0.4em] italic flex items-center justify-center gap-3">
            Official Support <span className="w-4 h-[1px] bg-border" /> <span className="text-primary font-black uppercase">Message Center Active</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RotateCw className="w-12 h-12 text-primary animate-spin" />
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
