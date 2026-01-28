'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, X, Check, RotateCw, Upload } from 'lucide-react';

interface Tier {
  id: string;
  duration: string;
  price: number;
  originalPrice: number;
  popular?: boolean;
  checkoutUrl?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  originalPrice?: number;
  tiers?: Tier[];
  image: string;
  status: 'active' | 'draft' | 'archived';
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({
      ...product,
      price: product.price ?? product.tiers?.[0]?.price ?? 0,
      originalPrice: product.originalPrice ?? product.tiers?.[0]?.originalPrice ?? 0
    });
  };

  const handleCreate = () => {
    const newProduct: Partial<Product> = {
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      image: '/images/autocad-icon.png',
      status: 'draft'
    };
    setEditingId('new');
    setEditForm(newProduct);
  };

  const handleSave = async () => {
    if (!editingId) return;
    try {
      let payload = editingId === 'new' ? editForm : { ...editForm, id: editingId };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingId(null);
        setEditForm({});
        fetchProducts();
      }
    } catch (e) {
      alert('Failed to save');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditForm({ ...editForm, image: data.url });
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleStatus = async (product: Product) => {
    const nextStatus = product.status === 'active' ? 'draft' : 'active';
    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, status: nextStatus })
      });
      fetchProducts();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchProducts();
    } catch (e) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-20"><RotateCw className="animate-spin mx-auto w-10 h-10 text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-2 ml-1">Inventory Management</h2>
          <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">Product Catalog</h1>
          <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-2 italic opacity-60">Update prices, names, and availability instantly</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={fetchProducts}
            className="h-14 w-14 rounded-2xl border border-border hover:bg-muted transition-all"
            title="Refresh Inventory"
          >
            <RotateCw className={`w-5 h-5 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-3 font-black uppercase tracking-widest text-xs italic px-8 py-7 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {editingId === 'new' && (
          <ProductCard
            product={editForm as Product}
            isEditing={true}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
            onEditChange={(updates) => setEditForm(prev => ({ ...prev, ...updates }))}
            onUpload={handleFileUpload}
            uploading={uploading}
            fileInputRef={fileInputRef}
          />
        )}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={editingId === product.id ? (editForm as Product) : product}
            isEditing={editingId === product.id}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product.id)}
            onToggleStatus={() => handleToggleStatus(product)}
            onEditChange={(updates) => setEditForm(prev => ({ ...prev, ...updates }))}
            onUpload={handleFileUpload}
            uploading={uploading}
            fileInputRef={fileInputRef}
          />
        ))}
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
  onEditChange: (updates: Partial<Product>) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function ProductCard({
  product,
  isEditing,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  onToggleStatus,
  onEditChange,
  onUpload,
  uploading,
  fileInputRef
}: ProductCardProps) {
  return (
    <Card className={`bg-card border-border overflow-hidden transition-all duration-500 rounded-[2rem] shadow-sm hover:shadow-xl ${isEditing ? 'border-primary ring-1 ring-primary/20 bg-muted/30' : ''}`}>
      <div className="flex flex-col md:flex-row items-stretch md:items-center p-8 gap-8">
        {/* Image Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 bg-muted rounded-[1.5rem] border border-border p-5 flex-shrink-0 relative group/img shadow-inner transition-colors group-hover:bg-muted/80">
            <img src={product.image} alt="" className="w-full h-full object-contain" />
            {isEditing && (
              <div
                className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity rounded-[1.5rem] cursor-pointer backdrop-blur-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? <RotateCw className="w-8 h-8 text-primary animate-spin" /> : <Upload className="w-8 h-8 text-primary" />}
              </div>
            )}
          </div>
          {isEditing && (
            <div className="w-full space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onUpload}
              />
              <div>
                <label className="text-[9px] uppercase font-black text-muted-foreground mb-1.5 block italic tracking-widest pl-1">Image Reference</label>
                <input
                  className="bg-background border border-border rounded-xl px-3 py-2 w-full text-[10px] text-foreground font-medium focus:border-primary focus:outline-none transition-all shadow-sm"
                  value={product.image || ''}
                  onChange={e => onEditChange({ image: e.target.value })}
                  placeholder="/images/icon.png"
                />
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-3">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-[9px] uppercase font-black text-muted-foreground mb-1.5 block italic tracking-widest pl-1">Product Designation</label>
                <input
                  className="bg-background border border-border rounded-xl px-4 py-3 w-full text-foreground font-black uppercase italic tracking-tight focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                  value={product.name || ''}
                  onChange={e => onEditChange({ name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[9px] uppercase font-black text-muted-foreground mb-1.5 block italic tracking-widest pl-1">Short Description</label>
                <input
                  className="bg-background border border-border rounded-xl px-4 py-3 w-full text-muted-foreground text-xs font-medium focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                  value={product.description || ''}
                  onChange={e => onEditChange({ description: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter leading-none">{product.name}</h3>
                <button
                  onClick={onToggleStatus}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all italic shadow-sm flex items-center gap-1.5 ${product.status === 'active'
                    ? 'bg-[#00b67a]/10 text-[#00b67a] border border-[#00b67a]/20 hover:bg-[#00b67a]/20'
                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20'
                    }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${product.status === 'active' ? 'bg-[#00b67a]' : 'bg-yellow-500'} animate-pulse`} />
                  {product.status}
                </button>
              </div>
              <p className="text-muted-foreground text-sm font-medium pr-6 line-clamp-2 leading-relaxed italic">{product.description}</p>
            </>
          )}
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col md:flex-col items-stretch md:items-end justify-between md:justify-center gap-6 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8 min-w-[250px]">
          {isEditing ? (
            <div className="space-y-4 w-full">
              <label className="text-[9px] uppercase font-black text-muted-foreground mb-1 block text-right italic tracking-widest pr-1">Price Matrix (By Tier)</label>
              <div className="space-y-3">
                {(product.tiers || [
                  { id: '1-month', duration: '1 Month', price: product.price || 0, originalPrice: product.originalPrice || 0 },
                  { id: '1-year', duration: '1 Year', price: 0, originalPrice: 0 },
                  { id: '2-years', duration: '2 Years', price: 0, originalPrice: 0 }
                ]).map((tier, idx) => (
                  <div key={tier.id} className="bg-muted p-3 rounded-xl border border-border space-y-2">
                    <p className="text-[8px] font-black uppercase italic text-primary">{tier.duration}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-primary font-black italic">$</span>
                        <input
                          type="number"
                          className="bg-background border border-border rounded-lg pl-5 pr-2 py-1 w-full text-primary font-black text-right focus:outline-none transition-all text-[11px] italic"
                          value={tier.price}
                          onChange={e => {
                            const newTiers = [...(product.tiers || [])];
                            newTiers[idx] = { ...tier, price: parseFloat(e.target.value) || 0 };
                            onEditChange({ tiers: newTiers });
                          }}
                        />
                      </div>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-black italic">$</span>
                        <input
                          type="number"
                          className="bg-background border border-border rounded-lg pl-5 pr-2 py-1 w-full text-muted-foreground text-right focus:outline-none transition-all text-[11px] italic font-black"
                          value={tier.originalPrice}
                          onChange={e => {
                            const newTiers = [...(product.tiers || [])];
                            newTiers[idx] = { ...tier, originalPrice: parseFloat(e.target.value) || 0 };
                            onEditChange({ tiers: newTiers });
                          }}
                        />
                      </div>
                    </div>
                    {/* Checkout URL Field */}
                    <div className="pt-1">
                      <input
                        className="bg-background border border-border rounded-lg px-2 py-1 w-full text-[9px] text-muted-foreground focus:outline-none focus:border-primary/50 transition-all font-medium"
                        placeholder="External Checkout URL (Whop/Stripe)"
                        value={tier.checkoutUrl || ''}
                        onChange={e => {
                          const newTiers = [...(product.tiers || [])];
                          newTiers[idx] = { ...tier, checkoutUrl: e.target.value };
                          onEditChange({ tiers: newTiers });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-right">
              {(() => {
                const displayPrice = product.price ?? product.tiers?.[0]?.price ?? 0;
                const displayOriginalPrice = product.originalPrice ?? product.tiers?.[0]?.originalPrice ?? 0;
                return (
                  <>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic mb-1 opacity-50">Unit Price</p>
                    <p className="text-4xl font-black text-primary tracking-tighter italic leading-none">${displayPrice.toFixed(2)}</p>
                    <div className="flex items-center justify-end gap-3 mt-3">
                      <p className="text-xs text-muted-foreground line-through font-black italic opacity-40">${displayOriginalPrice.toFixed(2)}</p>
                      <p className="text-[9px] text-[#00b67a] font-black uppercase tracking-widest bg-[#00b67a]/10 px-2 py-1 rounded-lg border border-[#00b67a]/10 shadow-sm italic">
                        SAVE {displayOriginalPrice > 0 ? Math.round((1 - displayPrice / displayOriginalPrice) * 100) : 0}%
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex md:flex-col gap-3 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
          {isEditing ? (
            <>
              <Button size="sm" className="bg-[#00b67a] hover:bg-[#00b67a]/90 h-14 w-full md:w-14 p-0 text-white shadow-xl shadow-[#00b67a]/20 transition-all hover:scale-110 rounded-2xl" onClick={onSave}>
                <Check className="w-6 h-6" />
              </Button>
              <Button size="sm" variant="ghost" className="h-14 w-full md:w-14 p-0 hover:bg-muted border border-border transition-all rounded-2xl group" onClick={onCancel}>
                <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" className="h-14 w-full md:w-14 p-0 border border-border hover:bg-muted hover:border-primary/50 transition-all rounded-2xl group" onClick={onEdit}>
                <Edit2 className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </Button>
              <Button size="sm" variant="ghost" className="h-14 w-full md:w-14 p-0 border border-border hover:bg-red-500/10 hover:border-red-500/20 transition-all rounded-2xl group" onClick={onDelete}>
                <Trash2 className="w-5 h-5 text-red-500/40 group-hover:text-red-500" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
