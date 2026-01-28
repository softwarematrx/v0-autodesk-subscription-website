'use client';

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Shield, Zap, Palette, Layers, Settings } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: '2D & 3D Design',
    description: 'Create precise 2D drawings and 3D models with industry-leading tools',
    icon: <Layers className="w-7 h-7" />
  },
  {
    title: 'Smart Automation',
    description: 'Save time with intelligent features that automate repetitive tasks',
    icon: <Settings className="w-7 h-7" />
  },
  {
    title: 'High Performance',
    description: 'Optimized for speed with native 64-bit computing and multi-core processing',
    icon: <Zap className="w-7 h-7" />
  },
  {
    title: 'Industry Toolsets',
    description: 'Specialized tools for architecture, electrical, mechanical, and more',
    icon: <Cpu className="w-7 h-7" />
  },
  {
    title: 'Cloud Collaboration',
    description: 'Share designs and collaborate with team members from anywhere',
    icon: <Palette className="w-7 h-7" />
  },
  {
    title: 'Official Subscription',
    description: '100% authentic Autodesk subscription with full updates and support',
    icon: <Shield className="w-7 h-7" />
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background relative overflow-hidden border-t border-border">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-black text-xs uppercase tracking-widest mb-4 italic">Powerful Features</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 uppercase italic tracking-tighter">
            What&apos;s Included in AutoCAD 2026
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            Get access to the full suite of professional CAD tools used by millions of designers and engineers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="bg-card/40 backdrop-blur-md border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group rounded-[2rem]">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-black text-foreground group-hover:text-primary transition-colors uppercase italic tracking-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-sm font-medium leading-relaxed uppercase tracking-tight">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
