'use client';

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const STATS: Stat[] = [
  {
    label: 'Total Revenue',
    value: '$24,580.50',
    change: '+12.5% from last month',
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    label: 'Total Orders',
    value: '1,284',
    change: '+8.2% from last month',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    label: 'Active Customers',
    value: '856',
    change: '+5.1% from last month',
    icon: <Users className="w-5 h-5" />
  },
  {
    label: 'Products Sold',
    value: '2,456',
    change: '+15.3% from last month',
    icon: <Package className="w-5 h-5" />
  },
];

export default function AdminStats() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Overview</h2>
        <p className="text-muted-foreground">Track your platform performance and sales metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <div className="text-primary">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Order #{1000 + i}</p>
                  <p className="text-sm text-muted-foreground">AutoCAD - 3 Month Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(140 + i * 50).toFixed(2)}</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
