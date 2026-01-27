'use client';

import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PRODUCTS = [
  {
    id: 'autocad',
    name: 'AutoCAD',
    description: 'Professional 2D/3D design and drafting software',
    icon: '📐',
    price: '$50/month'
  },
  {
    id: 'revit',
    name: 'Revit',
    description: 'Building Information Modeling for architecture',
    icon: '🏗️',
    price: '$55/month'
  },
  {
    id: 'fusion360',
    name: 'Fusion 360',
    description: 'Cloud-based CAD/CAM for design and manufacturing',
    icon: '⚙️',
    price: '$45/month'
  },
  {
    id: 'maya',
    name: 'Maya',
    description: '3D animation, modeling, and rendering',
    icon: '🎨',
    price: '$60/month'
  },
  {
    id: '3dsmax',
    name: '3ds Max',
    description: 'Professional 3D modeling and animation',
    icon: '🎬',
    price: '$60/month'
  },
  {
    id: 'inventor',
    name: 'Inventor',
    description: 'Professional mechanical design software',
    icon: '🔧',
    price: '$55/month'
  },
  {
    id: 'sketchbook',
    name: 'Sketchbook',
    description: 'Digital drawing and painting software',
    icon: '🖌️',
    price: '$10/month'
  },
  {
    id: 'navisworks',
    name: 'Navisworks',
    description: 'Project review and coordination software',
    icon: '🗂️',
    price: '$65/month'
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of Autodesk applications and choose your ideal subscription plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                  <CardHeader>
                    <div className="text-4xl mb-4">{product.icon}</div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg font-bold text-primary">{product.price}</p>
                    <Button className="w-full">View Plans</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
