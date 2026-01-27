'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface ProductTier {
  id: string;
  duration: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  tiers: ProductTier[];
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'autocad',
    name: 'AutoCAD',
    description: 'Professional 2D/3D design and drafting software',
    icon: '📐',
    tiers: [
      { id: 'ac-1m', duration: '1 Month', price: 50 },
      { id: 'ac-3m', duration: '3 Months', price: 140 },
      { id: 'ac-12m', duration: '12 Months', price: 480 },
    ]
  },
  {
    id: 'revit',
    name: 'Revit',
    description: 'Building Information Modeling for architecture',
    icon: '🏗️',
    tiers: [
      { id: 'rv-1m', duration: '1 Month', price: 55 },
      { id: 'rv-3m', duration: '3 Months', price: 155 },
      { id: 'rv-12m', duration: '12 Months', price: 540 },
    ]
  },
  {
    id: 'fusion360',
    name: 'Fusion 360',
    description: 'Cloud-based CAD/CAM for design and manufacturing',
    icon: '⚙️',
    tiers: [
      { id: 'fs-1m', duration: '1 Month', price: 45 },
      { id: 'fs-3m', duration: '3 Months', price: 125 },
      { id: 'fs-12m', duration: '12 Months', price: 420 },
    ]
  },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({});
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setShowForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...editingProduct, ...formData } as Product : p));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        icon: formData.icon || '📦',
        tiers: formData.tiers || []
      };
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    setFormData({});
  };

  const handleUpdateTierPrice = (productId: string, tierId: string, newPrice: number) => {
    setProducts(products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          tiers: p.tiers.map(t => t.id === tierId ? { ...t, price: newPrice } : t)
        };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Products Management</h2>
          <p className="text-muted-foreground">Manage your Autodesk subscription products and pricing</p>
        </div>
        <Button onClick={handleAddProduct} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{product.icon}</span>
                    {product.name}
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-3">Pricing Tiers</h4>
                <div className="space-y-3">
                  {product.tiers.map((tier) => (
                    <div key={tier.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{tier.duration}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">$</span>
                        <input
                          type="number"
                          value={tier.price}
                          onChange={(e) => handleUpdateTierPrice(product.id, tier.id, parseFloat(e.target.value))}
                          className="w-16 px-2 py-1 border border-border rounded text-sm"
                        />
                        <span className="text-sm text-muted-foreground">/month</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-96 overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., AutoCAD"
                  className="w-full px-3 py-2 border border-border rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product description"
                  className="w-full px-3 py-2 border border-border rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Icon</label>
                <input
                  type="text"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 📐"
                  className="w-full px-3 py-2 border border-border rounded-lg mt-1"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSaveProduct}>
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
