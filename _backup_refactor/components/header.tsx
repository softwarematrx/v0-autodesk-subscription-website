'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="font-bold text-xl hidden sm:inline tracking-tight">Autodesk <span className="text-primary">Hub</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/admin" className="hidden md:inline">
              <Button variant="outline" size="sm" className="font-semibold">
                Admin
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top duration-300">
            <Link href="/products" className="block px-4 py-2 text-base font-medium hover:bg-muted rounded-md transition-colors" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link href="/pricing" className="block px-4 py-2 text-base font-medium hover:bg-muted rounded-md transition-colors" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>
            <Link href="/about" className="block px-4 py-2 text-base font-medium hover:bg-muted rounded-md transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-base font-medium hover:bg-muted rounded-md transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/admin" className="block px-4 py-2 text-base font-medium hover:bg-muted rounded-md transition-colors" onClick={() => setIsOpen(false)}>
              Admin Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
