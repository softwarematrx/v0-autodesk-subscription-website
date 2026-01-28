'use client';

import React from "react"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/lib/admin-context';
import { ShieldCheck, Lock, User } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdmin();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);
    if (success) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg relative z-10">
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center font-black text-primary-foreground text-2xl shadow-2xl shadow-primary/20 transition-transform group-hover:scale-110 italic">A</div>
            <span className="font-black text-3xl text-foreground uppercase italic tracking-tighter leading-none">AutoCAD<span className="text-primary italic">Store</span></span>
          </Link>
        </div>

        <Card className="bg-card/80 backdrop-blur-2xl border-border shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="text-center pt-10 pb-4">
            <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-inner">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-4xl font-black text-foreground uppercase italic tracking-tighter">Admin <span className="text-primary">Portal</span></CardTitle>
            <CardDescription className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px] italic mt-2">Secure access restricted to authorized personnel</CardDescription>
          </CardHeader>
          <CardContent className="p-8 md:p-12 pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest italic rounded-2xl animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic ml-1">Username</label>
                <div className="relative">
                  <User className="absolute left-5 top-5 w-5 h-5 text-muted-foreground/30" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium"
                    placeholder="admin"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic ml-1">Secure Key</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-5 w-5 h-5 text-muted-foreground/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="bg-muted border border-border rounded-2xl p-4 shadow-inner">
                <p className="text-[9px] text-muted-foreground text-center font-black uppercase tracking-widest italic">
                  Default Access Key: <span className="text-foreground font-black">admin123</span>
                </p>
              </div>

              <Button type="submit" className="w-full py-10 text-xl font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 rounded-2xl uppercase tracking-[0.2em] italic" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Authenticating
                  </div>
                ) : 'Authorize Entry'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center mt-12 text-muted-foreground text-[10px] font-black uppercase tracking-[0.3em] italic leading-relaxed">
          &copy; 2026 AutoCAD Store Systems.
          <br />
          All activities are logged and monitored.
        </p>
      </div>
    </div>
  );
}
