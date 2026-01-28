'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'autocad',
    name: 'AutoCAD 2026',
    description: 'Professional 2D/3D design and drafting software',
    icon: '📐'
  },
  {
    id: 'revit',
    name: 'Revit 2026',
    description: 'Building Information Modeling for architecture',
    icon: '🏗️'
  },
  {
    id: 'fusion360',
    name: 'Fusion 360 2026',
    description: 'Cloud-based CAD/CAM for design and manufacturing',
    icon: '⚙️'
  },
  {
    id: 'maya',
    name: 'Maya 2026',
    description: '3D animation, modeling, and rendering',
    icon: '🎨'
  },
  {
    id: '3dsmax',
    name: '3ds Max 2026',
    description: 'Professional 3D modeling and animation',
    icon: '🎬'
  },
  {
    id: 'inventor',
    name: 'Inventor 2026',
    description: 'Professional mechanical design software',
    icon: '🔧'
  },
];

export default function ProductGrid() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Autodesk Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of industry-leading design and engineering applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                <CardHeader>
                  <div className="text-4xl mb-4">{product.icon}</div>
                  <CardTitle>{product.name}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[7px] font-black bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase border border-border">Windows</span>
                    <span className="text-[7px] font-black bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase border border-border">Mac OS</span>
                  </div>
                  <CardDescription className="mt-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Plans</Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
