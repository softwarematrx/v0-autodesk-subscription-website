'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShieldCheck, Mail, Zap, Users, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-primary font-black text-xs uppercase tracking-[0.2em] italic">Industry Leading Reseller</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase italic tracking-tighter text-foreground leading-none">
              Empowering <span className="text-primary">Professionals</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              At AutoCAD Store, we bridge the gap between world-class engineering tools and the professionals who need them most.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">Our Mission</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed font-medium text-lg">
                <p>
                  We believe that powerful design tools should be affordable and accessible to professionals at every level, from individual freelancers to large-scale engineering firms.
                </p>
                <p>
                  Our platform is designed to provide seamless, premium access to genuine Autodesk subscriptions with zero complexity and maximum value. By specializing in direct account activation, we ensure you spend less time on licensing and more time creating.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button className="font-black uppercase tracking-widest italic rounded-xl px-10 py-6">Explore Catalog</Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Star, label: 'Highest Rated', value: '4.9/5' },
                { icon: Users, label: 'Active Users', value: '2.5k+' },
                { icon: ShieldCheck, label: 'Verified Keys', value: '100%' },
                { icon: Zap, label: 'Delivery', value: '< 2min' }
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border p-8 rounded-[2rem] shadow-xl shadow-black/5 hover:border-primary/50 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-primary mb-4" />
                  <div className="text-3xl font-black text-foreground mb-1 italic tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <section className="mb-32">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-12 text-center">The AutoCAD Store Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Official Activation',
                  description: 'No complicated cracks or patches. Every subscription is linked directly to your official Autodesk ID for a completely official experience.'
                },
                {
                  title: 'Engineering Support',
                  description: 'Our technical team consists of certified experts available 24/7 via our Message Portal to assist with installation and troubleshooting.'
                },
                {
                  title: 'Dynamic Pricing',
                  description: 'We leverage economy-of-scale to bring you the best possible rates for AutoCAD, Revit, and Civil 3D subscriptions.'
                }
              ].map((item, i) => (
                <div key={i} className="bg-muted/30 p-10 rounded-[2.5rem] border border-border hover:bg-muted/50 transition-all group">
                  <h3 className="font-black uppercase italic tracking-tight text-xl mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic tracking-tighter relative z-10">Ready to Get Started?</h2>
            <p className="mb-10 opacity-90 max-w-2xl mx-auto font-medium text-lg relative z-10 italic">
              Join thousands of professionals already using Autodesk applications through our premium subscription platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/products">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-black uppercase tracking-widest italic rounded-xl px-10 py-7 text-lg">
                  Buy Now - $39.99
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest italic rounded-xl px-10 py-7 text-lg bg-transparent">
                  Message me now
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
