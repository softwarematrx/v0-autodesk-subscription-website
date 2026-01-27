'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Professional Design Software.
            <span className="text-primary"> Made Affordable.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Access AutoCAD, Revit, Fusion 360, Maya, and more premium Autodesk applications with flexible monthly or annual subscription plans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Products
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Trusted by design professionals worldwide</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-primary">{1000 + i * 500}+</div>
                  <div className="text-xs text-muted-foreground">
                    {['Active Users', 'Projects', 'Companies', 'Downloads'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
