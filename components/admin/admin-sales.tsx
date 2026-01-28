'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingBag, TrendingUp, Users, Activity, RotateCw } from 'lucide-react';

interface Order {
    id: string;
    email: string;
    product: string;
    amount: number;
    status: 'completed' | 'processing' | 'failed';
    date: string;
}

export default function AdminSales() {
    const [data, setData] = useState<{ orders: Order[], totalRevenue: number, totalSales: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const res = await fetch('/api/admin/sales');
                const json = await res.json();
                setData(json);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        };
        fetchSales();
    }, []);

    if (loading) return <div className="text-center py-20"><RotateCw className="animate-spin mx-auto w-10 h-10 text-primary" /></div>;
    if (!data) return null;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: `$${data.totalRevenue.toFixed(2)}`, icon: DollarSign, sub: 'Live database sync', accent: 'text-[#00b67a]' },
                    { label: 'Paid Orders', value: data.totalSales, icon: ShoppingBag, sub: 'Completed transactions', accent: 'text-primary' },
                    { label: 'Site Traffic', value: '1.2k', icon: Activity, sub: 'Unique visitors today', accent: 'text-blue-500' },
                    { label: 'Conversion', value: `${((data.totalSales / 1200) * 100).toFixed(1)}%`, icon: Users, sub: 'Visitor/Customer ratio', accent: 'text-orange-500' },
                ].map((stat, i) => (
                    <Card key={i} className="bg-card border-border shadow-sm rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-4 pt-8 px-8">
                            <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">{stat.label}</CardTitle>
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                <stat.icon className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="text-3xl font-black text-foreground tracking-tighter italic leading-none">{stat.value}</div>
                            <p className={`text-[9px] font-black uppercase tracking-[0.2em] mt-3 italic flex items-center gap-2 ${stat.accent} opacity-80`}>
                                <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                {stat.sub}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-card border-border shadow-sm rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-border bg-muted/10">
                    <CardTitle className="text-foreground font-black uppercase italic tracking-tighter text-xl">Live Sales Feed</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic bg-muted/50">
                                    <th className="px-8 py-5 border-b border-border">Reference</th>
                                    <th className="px-8 py-5 border-b border-border">Customer Entity</th>
                                    <th className="px-8 py-5 border-b border-border">Product Designation</th>
                                    <th className="px-8 py-5 border-b border-border">Amount</th>
                                    <th className="px-8 py-5 border-b border-border">Status</th>
                                    <th className="px-8 py-5 border-b border-border text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {data.orders.map((order) => (
                                    <tr key={order.id} className="bg-transparent hover:bg-muted/30 transition-colors group">
                                        <td className="px-8 py-6 font-mono text-primary font-black italic">{order.id}</td>
                                        <td className="px-8 py-6 text-foreground font-black uppercase text-[11px] italic tracking-tight">{order.email}</td>
                                        <td className="px-8 py-6 text-muted-foreground font-medium italic">{order.product}</td>
                                        <td className="px-8 py-6 text-foreground font-black italic tracking-tighter text-base">${order.amount.toFixed(2)}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border italic shadow-sm flex items-center gap-2 w-fit ${order.status === 'completed' ? 'bg-[#00b67a]/10 text-[#00b67a] border-[#00b67a]/20' :
                                                order.status === 'processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full bg-current ${order.status === 'processing' ? 'animate-pulse' : ''}`} />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-muted-foreground font-black uppercase text-[9px] tracking-widest italic text-right opacity-40">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
