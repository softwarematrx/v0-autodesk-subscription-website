'use client';

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudDownload, Lock, Zap, Globe, Users, BarChart3 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: 'Cloud-Based Access',
    description: 'Access your subscriptions from anywhere in the world, 24/7',
    icon: <CloudDownload className="w-6 h-6" />
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with industry standards',
    icon: <Lock className="w-6 h-6" />
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized servers for instant installation and updates',
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: 'Global Support',
    description: 'Multilingual support team available around the clock',
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: 'Team Collaboration',
    description: 'Manage licenses for your entire team from one dashboard',
    icon: <Users className="w-6 h-6" />
  },
  {
    title: 'Usage Analytics',
    description: 'Track usage patterns and optimize your software investments',
    icon: <BarChart3 className="w-6 h-6" />
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide the best experience for managing and using Autodesk subscriptions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
