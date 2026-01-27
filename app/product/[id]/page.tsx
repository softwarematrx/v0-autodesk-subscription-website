'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';
import { Plus, Minus } from 'lucide-react';

// Mock product data - in production this would come from API
const PRODUCTS: Record<string, any> = {
  autocad: {
    id: 'autocad',
    name: 'AutoCAD',
    description: 'Professional 2D/3D design and drafting software',
    fullDescription: 'AutoCAD is a powerful design and drafting software that helps professionals create precise 2D and 3D drawings. Trusted by architects, engineers, and designers worldwide.',
    icon: '📐',
    tiers: [
      { id: 'autocad-monthly', duration: '1 Month', price: 50 },
      { id: 'autocad-quarterly', duration: '3 Months', price: 140 },
      { id: 'autocad-annual', duration: '12 Months', price: 480 },
    ],
    features: [
      'Professional 2D drafting tools',
      'Advanced 3D modeling',
      'Cloud collaboration',
      'Mobile access',
      'Regular updates included',
      'Technical support',
      'Integration with other Autodesk products'
    ]
  },
  revit: {
    id: 'revit',
    name: 'Revit',
    description: 'Building Information Modeling for architecture',
    fullDescription: 'Revit is a comprehensive BIM software for architects and construction professionals.',
    icon: '🏗️',
    tiers: [
      { id: 'revit-monthly', duration: '1 Month', price: 55 },
      { id: 'revit-quarterly', duration: '3 Months', price: 155 },
      { id: 'revit-annual', duration: '12 Months', price: 540 },
    ],
    features: [
      'Complete BIM workflow',
      'Advanced visualization',
      'Collaboration tools',
      'Code compliance checking',
      'Regular updates',
      'Revit Server access'
    ]
  },
  fusion360: {
    id: 'fusion360',
    name: 'Fusion 360',
    description: 'Cloud-based CAD/CAM for design and manufacturing',
    fullDescription: 'Fusion 360 combines CAD, CAM, and simulation in one cloud-based platform.',
    icon: '⚙️',
    tiers: [
      { id: 'fusion-monthly', duration: '1 Month', price: 45 },
      { id: 'fusion-quarterly', duration: '3 Months', price: 125 },
      { id: 'fusion-annual', duration: '12 Months', price: 420 },
    ],
    features: [
      'Cloud-based design',
      'Parametric modeling',
      'CAM capabilities',
      'Simulation tools',
      'Free for personal use',
      'Team collaboration'
    ]
  },
  maya: {
    id: 'maya',
    name: 'Maya',
    description: '3D animation, modeling, and rendering',
    fullDescription: 'Maya is the industry standard for 3D animation and visual effects.',
    icon: '🎨',
    tiers: [
      { id: 'maya-monthly', duration: '1 Month', price: 60 },
      { id: 'maya-quarterly', duration: '3 Months', price: 170 },
      { id: 'maya-annual', duration: '12 Months', price: 600 },
    ],
    features: [
      'Professional animation tools',
      'Advanced modeling',
      'Rendering engines',
      'VFX capabilities',
      'Character rigging',
      'Industry plugins support'
    ]
  },
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS[params.id];
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedTier, setSelectedTier] = useState<string | null>(product?.tiers[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => router.push('/products')}>Back to Products</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tier = product.tiers.find((t: any) => t.id === selectedTier);

  const handleAddToCart = () => {
    if (!selectedTier || !tier) return;
    
    addItem({
      tier_id: selectedTier,
      product_id: product.id,
      product_name: product.name,
      quantity,
      price: tier.price,
      duration: tier.duration,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-8">
            ← Back
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Info */}
            <div>
              <div className="text-6xl mb-4">{product.icon}</div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-8">{product.fullDescription}</p>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing and Cart */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Plan</CardTitle>
                  <CardDescription>Choose the subscription duration that works for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tier Selection */}
                  <div className="space-y-3">
                    {product.tiers.map((t: any) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTier(t.id)}
                        className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                          selectedTier === t.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{t.duration}</p>
                          </div>
                          <p className="text-2xl font-bold text-primary">${t.price}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex items-center gap-3 border border-border rounded-lg w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-muted"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-muted"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="text-3xl font-bold text-primary">
                        ${(tier?.price || 0) * quantity}
                      </span>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className="w-full"
                      size="lg"
                    >
                      {added ? '✓ Added to Cart' : 'Add to Cart'}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push('/cart')}
                  >
                    View Cart
                  </Button>
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
