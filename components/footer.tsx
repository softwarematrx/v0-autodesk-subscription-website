import Link from 'next/link';
import { Star, ShieldCheck, Mail, Clock, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">A</div>
              <span className="font-black text-xl text-foreground uppercase italic tracking-tighter">AutoCAD<span className="text-primary">Store</span></span>
            </Link>
            <p className="text-muted-foreground text-xs font-medium leading-relaxed uppercase tracking-tight">
              Leading authorized reseller of genuine AutoCAD 2026 licenses. Delivering high-performance design software instantly across the globe.
            </p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center border border-border">
                  <span className="text-[10px] font-black">WIN</span>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest">Windows</span>
              </div>
              <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center border border-border">
                  <span className="text-[10px] font-black">MAC</span>
                </div>
                <span className="text-[7px] font-black uppercase tracking-widest">MacOS</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-muted w-fit px-4 py-2 rounded-xl border border-border">
              <Star className="w-4 h-4 fill-[#00b67a] text-[#00b67a]" />
              <span className="text-[10px] font-black text-foreground uppercase tracking-widest">4.9/5 TrustScore</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-black mb-6 uppercase tracking-widest text-[10px] italic">Products</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">AutoCAD 2026</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">AutoCAD LT 2026</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">AutoCAD Plus 2026</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Toolsets Included</Link></li>
              <li><Link href="/reviews" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-foreground font-black mb-6 uppercase tracking-widest text-[10px] italic">Customer Service</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Message me now</Link></li>
              <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Refund Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-tight transition-colors">Legal Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-black mb-6 uppercase tracking-widest text-[10px] italic">Support Center</h4>
            <div className="space-y-4">
              <Link href="/contact" className="flex items-center gap-3 text-muted-foreground group cursor-pointer hover:text-primary transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-tight">Support Message Portal</span>
              </Link>
              <Link href="/contact" className="flex items-center gap-3 text-muted-foreground group cursor-pointer hover:text-primary transition-colors">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-tight">24/7 Priority Support</span>
              </Link>
              <div className="flex items-center gap-3 text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-tight">Safe & Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-[8px] uppercase tracking-[0.2em] font-medium">
            © 2026 AutoCAD Store. All rights reserved. AutoCAD® is a registered trademark of Autodesk, Inc.
          </p>
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="w-10 h-6 bg-muted rounded border border-border" />
            <div className="w-10 h-6 bg-muted rounded border border-border" />
            <div className="w-10 h-6 bg-muted rounded border border-border" />
          </div>
        </div>
      </div>
    </footer>
  );
}
