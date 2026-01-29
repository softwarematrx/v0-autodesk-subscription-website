'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Reviews', href: '/reviews' },
];

const LEGAL_LINKS = [
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const main = data.find((p: any) => p.id === 'autocad-2026');
        if (main) setProduct(main);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProduct();
  }, []);

  const handleQuickBuy = () => {
    if (product) {
      router.push(`/product/${product.id}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-black text-primary-foreground text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform italic">A</div>
            <span className="font-black text-xl text-foreground uppercase italic tracking-tighter">AutoCAD<span className="text-primary">Store</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link.label}
              </Link>
            ))}

            {/* Legal Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                onMouseEnter={() => setShowLegal(true)}
                onClick={() => setShowLegal(!showLegal)}
              >
                Legal <ChevronDown className={`w-4 h-4 transition-transform ${showLegal ? 'rotate-180' : ''}`} />
              </button>

              {showLegal && (
                <div
                  className="absolute top-full right-0 w-48 mt-2 bg-card border border-border rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setShowLegal(false)}
                >
                  {LEGAL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Theme & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] animate-pulse leading-none mb-1">Flash Sale</span>
                <Button
                  onClick={handleQuickBuy}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-6 py-2 rounded-xl h-auto text-xs uppercase tracking-widest italic shadow-lg shadow-primary/20"
                >
                  BUY NOW
                </Button>
              </div>
            </div>

            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border py-6 px-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-bold text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 sm:hidden">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  handleQuickBuy();
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl py-6 uppercase tracking-widest text-sm"
              >
                BUY NOW
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
