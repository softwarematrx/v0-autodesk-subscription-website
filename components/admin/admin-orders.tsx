'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Trash2, Search, Filter, X, Mail, ShieldCheck, ShoppingBag } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-1001',
    customer: 'John Smith',
    email: 'john@example.com',
    product: 'AutoCAD 2024 (Annual)',
    amount: 49.99,
    status: 'completed',
    date: '2026-01-26 14:30'
  },
  {
    id: '2',
    orderNumber: 'ORD-1002',
    customer: 'Sarah Chen',
    email: 'sarah@example.com',
    product: 'AutoCAD 2024 (Monthly)',
    amount: 49.99,
    status: 'completed',
    date: '2024-01-25 16:45'
  },
  {
    id: '3',
    orderNumber: 'ORD-1003',
    customer: 'Michael Johnson',
    email: 'michael@example.com',
    product: 'AutoCAD Plus (Annual)',
    amount: 79.99,
    status: 'pending',
    date: '2024-01-25 09:15'
  },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/sales');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id: string) => {
    if (confirm('Are you sure you want to delete this transaction record?')) {
      try {
        await fetch('/api/admin/sales', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        fetchOrders();
      } catch (e) {
        alert('Failed to delete');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'processing':
      case 'pending':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-2 ml-1">Order management</h2>
          <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">Customer Transactions</h1>
          <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-2 italic opacity-60">Track and manage your customer transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
            <input
              className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/30 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium"
              placeholder="Search reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border text-muted-foreground font-black uppercase tracking-widest text-[9px] italic h-14 px-6 rounded-2xl hover:bg-muted">
              <Filter className="w-4 h-4 mr-2 text-primary/40" />
              Filter
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[9px] italic h-14 px-6 rounded-2xl shadow-xl shadow-primary/20">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic bg-muted/50">
                <th className="px-8 py-5 border-b border-border">Reference ID</th>
                <th className="px-8 py-5 border-b border-border">Customer Entity</th>
                <th className="px-8 py-5 border-b border-border">Designation</th>
                <th className="px-8 py-5 border-b border-border">Timestamp</th>
                <th className="px-8 py-5 border-b border-border">Valuation</th>
                <th className="px-8 py-5 border-b border-border">Status</th>
                <th className="px-8 py-5 border-b border-border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.filter(o =>
                o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.email.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-8 py-6 font-mono text-primary font-black italic">{order.id}</td>
                  <td className="px-8 py-6 text-foreground font-black uppercase text-[11px] italic tracking-tight">{order.email}</td>
                  <td className="px-8 py-6 text-muted-foreground font-medium italic text-xs truncate max-w-[150px]">{order.product}</td>
                  <td className="px-8 py-6 text-muted-foreground font-mono text-[10px] italic">{order.date}</td>
                  <td className="px-8 py-6 text-foreground font-black italic tracking-tighter text-base">${order.amount.toFixed(2)}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border uppercase italic shadow-sm flex items-center gap-2 w-fit ${getStatusColor(order.status)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-current ${order.status === 'processing' || order.status === 'pending' ? 'animate-pulse' : ''}`} />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 rounded-xl hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 rounded-xl hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-xl flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
          <Card className="w-full max-w-xl bg-card border-border shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden rounded-[3rem]">
            <div className="bg-gradient-to-r from-primary to-[#ff8c42] h-2 w-full" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedOrder(null)}
              className="absolute right-6 top-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-2xl w-10 h-10 p-0"
            >
              <X className="w-5 h-5" />
            </Button>

            <CardHeader className="p-10 pb-0">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border tracking-[0.2em] uppercase italic shadow-sm ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
                <span className="text-muted-foreground/40 text-[10px] font-black tracking-widest uppercase italic">{selectedOrder.orderNumber}</span>
              </div>
              <CardTitle className="text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">Order Details</CardTitle>
            </CardHeader>

            <CardContent className="p-10 pt-8 space-y-10">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] italic block mb-2">Customer Identity</label>
                  <p className="text-foreground font-black text-lg uppercase italic tracking-tight">{selectedOrder.email}</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] italic block mb-2">Transaction Timestamp</label>
                  <p className="text-foreground font-black italic opacity-60">{selectedOrder.date}</p>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] italic block mb-2">Communication Channel</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-foreground font-black italic tracking-tight">{selectedOrder.email}</p>
                </div>
              </div>

              <div className="p-8 bg-muted/50 border border-border rounded-3xl shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
                  <ShoppingBag className="w-32 h-32" />
                </div>
                <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] italic block mb-3 relative z-10">Purchase Statement</label>
                <div className="flex items-center justify-between relative z-10">
                  <p className="text-foreground font-black text-lg uppercase italic tracking-tighter">{selectedOrder.product}</p>
                  <p className="text-primary font-black text-3xl tracking-tighter italic leading-none">${selectedOrder.amount.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-[#00b67a]/5 border border-[#00b67a]/10 rounded-3xl p-6 flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#00b67a]/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-7 h-7 text-[#00b67a]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black text-foreground uppercase tracking-widest italic mb-1">Authorization Matrix Success</p>
                  <p className="text-[10px] text-muted-foreground font-medium italic opacity-80 leading-relaxed">License generated and transmitted to client entity infrastructure.</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] italic rounded-2xl shadow-xl shadow-primary/20">Authorize Resend</Button>
                <Button variant="outline" className="flex-1 h-14 border-border text-muted-foreground font-black uppercase tracking-widest text-[10px] italic rounded-2xl hover:bg-muted">Download Audit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
