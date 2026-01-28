'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/lib/admin-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Package,
  ShoppingCart,
  LogOut,
  Settings,
  ClipboardList,
  RotateCw
} from 'lucide-react';
import AdminSales from '@/components/admin/admin-sales';
import AdminProducts from '@/components/admin/admin-products';
import AdminStats from '@/components/admin/admin-stats';
import AdminSettings from '@/components/admin/admin-settings';
import AdminOrders from '@/components/admin/admin-orders';
import AdminMessages from '@/components/admin/admin-messages';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('sales');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:block z-50 shadow-xl overflow-hidden">
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center font-black text-primary italic shadow-inner">A</div>
            <span className="font-black text-xl uppercase italic tracking-tighter text-foreground leading-none">Admin<span className="text-primary italic">Panel</span></span>
          </div>

          <nav className="space-y-3 flex-1">
            {[
              { id: 'sales', label: 'Sales Feed', icon: ShoppingCart },
              { id: 'orders', label: 'Orders', icon: ClipboardList },
              { id: 'products', label: 'Inventory', icon: Package },
              { id: 'messages', label: 'Messages', icon: (props: any) => <span {...props}>💬</span> },
              { id: 'overview', label: 'Live Stats', icon: BarChart3 },
              { id: 'settings', label: 'Store Control', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px] italic ${activeTab === item.id
                  ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/30 ring-1 ring-primary/50'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary-foreground' : 'text-primary/50'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-border mt-auto">
            <Button
              variant="ghost"
              onClick={() => {
                logout();
                router.push('/admin/login');
              }}
              className="w-full justify-start gap-4 text-red-500/60 hover:bg-red-500/10 hover:text-red-500 px-5 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] italic transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 p-6 md:p-12">
        {/* Mobile Header */}
        <header className="lg:hidden flex justify-between items-center mb-10 bg-card p-6 rounded-[2rem] border border-border shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-black text-primary italic">A</div>
            <span className="font-black uppercase italic tracking-tighter text-foreground">Admin Panel</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl border border-border" onClick={() => setActiveTab('settings')}>
              <Settings className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500 rounded-xl border border-red-500/10 bg-red-500/5" onClick={logout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Panel Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-end gap-6">
            <div className="flex items-center gap-3 bg-muted/50 p-2 py-3 rounded-2xl border border-border">
              <div className="w-2 h-2 rounded-full bg-[#00b67a] animate-pulse ml-3" />
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-3 italic">Autonomous Systems Active</span>
            </div>
          </div>

          <div className="space-y-12">
            {activeTab === 'sales' && <AdminSales />}
            {activeTab === 'orders' && <AdminOrders />}
            {activeTab === 'products' && <AdminProducts />}
            {activeTab === 'messages' && <AdminMessages />}
            {activeTab === 'overview' && <AdminStats />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}
