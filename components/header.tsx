'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span className="font-bold text-xl hidden sm:inline">Autodesk Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon">
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/admin" className="hidden md:inline">
              <Button variant="ghost" size="sm">
                Admin
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block px-2 py-2 hover:bg-muted rounded">
              Products
            </Link>
            <Link href="/pricing" className="block px-2 py-2 hover:bg-muted rounded">
              Pricing
            </Link>
            <Link href="/about" className="block px-2 py-2 hover:bg-muted rounded">
              About
            </Link>
            <Link href="/contact" className="block px-2 py-2 hover:bg-muted rounded">
              Contact
            </Link>
            <Link href="/admin" className="block px-2 py-2 hover:bg-muted rounded">
              Admin
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
