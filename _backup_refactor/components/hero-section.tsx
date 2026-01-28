'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-background">
      {/* Background radial gradients for depth */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            NEW: AUTOCAD 2026 NOW AVAILABLE
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-balance leading-[1.1]">
            Empower Your Vision with <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Premium Design Tools.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
            Get instant access to industry-leading software. AutoCAD, Revit, Fusion 360, and more starting at just $10/month.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto px-8 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl">
                Explore Products
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-14 text-lg font-bold bg-background/50 backdrop-blur-sm rounded-xl hover:bg-accent/50">
                View All Plans
              </Button>
            </Link>
          </div>

          {/* Integration logos or trust indicators */}
          <div className="mt-20 pt-10 border-t border-border/50">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/70 mb-8">Powering the world's most innovative teams</p>
            <div className="flex justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-2xl font-bold">AutoCAD</div>
              <div className="text-2xl font-bold">Revit</div>
              <div className="text-2xl font-bold">Fusion 360</div>
              <div className="text-2xl font-bold">Maya</div>
              <div className="text-2xl font-bold">Inventor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
