'use client';

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  CreditCard
} from 'lucide-react';

export default function AdminStats() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-2 ml-1">Analytical Matrix</h2>
          <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">Real-time Analytics</h1>
          <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-2 italic opacity-60">System-wide performance metrics and geo-distribution log</p>
        </div>
        <div className="bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20 shadow-inner">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] italic flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Live Data Stream Active
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Monthly Revenue', value: '$42,580.00', icon: DollarSign, trend: '+18.5%', positive: true },
          { label: 'Total Orders', value: '842', icon: Activity, trend: '+12.2%', positive: true },
          { label: 'Conversion Rate', value: '4.8%', icon: Users, trend: '-0.5%', positive: false },
          { label: 'Refund Rate', value: '0.42%', icon: CreditCard, trend: 'Healthy', positive: true },
        ].map((stat, i) => (
          <Card key={i} className="bg-card border-border shadow-sm hover:shadow-xl transition-all rounded-[2rem] overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-8 px-8">
              <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">{stat.label}</CardTitle>
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <stat.icon className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-3xl font-black text-foreground tracking-tighter italic">{stat.value}</div>
              <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest mt-3 italic ${stat.positive ? 'text-[#00b67a]' : 'text-red-500'}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{stat.trend} {stat.trend !== 'Healthy' && 'Growth'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Geo Distribution */}
        <Card className="bg-card border-border shadow-sm rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-border bg-muted/10">
            <CardTitle className="text-foreground flex items-center gap-3 font-black uppercase italic tracking-tighter text-xl">
              <Globe className="w-6 h-6 text-primary" />
              Sales by Region
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="space-y-8">
              {[
                { name: 'United States', val: '45%' },
                { name: 'European Union', val: '30%' },
                { name: 'United Kingdom', val: '15%' },
                { name: 'Rest of World', val: '10%' },
              ].map((reg) => (
                <div key={reg.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic">{reg.name}</span>
                    <span className="text-primary font-black italic tracking-tighter">{reg.val}</span>
                  </div>
                  <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" style={{ width: reg.val }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-card border-border shadow-sm rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-border bg-muted/10">
            <CardTitle className="text-foreground flex items-center gap-3 font-black uppercase italic tracking-tighter text-xl">
              <Package className="w-6 h-6 text-primary" />
              Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {[
                { name: 'AUTOCAD 2026', sales: '450', revenue: '$22,495' },
                { name: 'AUTOCAD LT 2026', sales: '280', revenue: '$11,197' },
                { name: 'REVIT 2026', sales: '112', revenue: '$8,958' },
                { name: 'CIVIL 3D 2026', sales: '89', revenue: '$7,999' },
              ].map((prod) => (
                <div key={prod.name} className="flex items-center justify-between p-6 bg-muted/50 rounded-3xl border border-border hover:border-primary/30 transition-all group/item">
                  <div>
                    <p className="font-black text-foreground text-sm uppercase italic tracking-tight">{prod.name}</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1 italic opacity-60">{prod.sales} licenses sold</p>
                  </div>
                  <p className="text-primary font-black italic tracking-tighter text-xl group-hover/item:scale-110 transition-transform">{prod.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
