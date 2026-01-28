'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Autodesk Hub</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop platform for all Autodesk subscriptions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">AutoCAD</Link></li>
              <li><Link href="#" className="hover:text-foreground">Revit</Link></li>
              <li><Link href="#" className="hover:text-foreground">Fusion 360</Link></li>
              <li><Link href="#" className="hover:text-foreground">Maya</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Documentation</Link></li>
              <li><Link href="#" className="hover:text-foreground">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-foreground">Community</Link></li>
              <li><Link href="#" className="hover:text-foreground">Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Autodesk Hub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground">Twitter</Link>
              <Link href="#" className="hover:text-foreground">LinkedIn</Link>
              <Link href="#" className="hover:text-foreground">GitHub</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
