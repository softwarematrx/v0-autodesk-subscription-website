'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Mail, Zap, Settings, Save, RotateCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            setSettings(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) {
            alert('Error saving settings');
        }
        setSaving(false);
    };

    if (loading) return <div className="text-center py-20"><RotateCw className="animate-spin mx-auto w-10 h-10 text-primary" /></div>;

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-2 ml-1">Infrastructure Control</h2>
                    <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">Global Store Settings</h1>
                    <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-2 italic opacity-60">Manage site-wide promotions, visibility, and security protection</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-xs italic px-10 py-7 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-95 disabled:opacity-50 min-w-[200px]"
                >
                    {saving ? <RotateCw className="w-5 h-5 animate-spin mr-3" /> : saved ? <CheckCircle2 className="w-5 h-5 mr-3" /> : <Save className="w-5 h-5 mr-3" />}
                    {saving ? 'Processing...' : saved ? 'Matrix Synced' : 'Commit Changes'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Promotion Control */}
                <Card className="bg-card border-border overflow-hidden relative rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                    <div className={`absolute top-0 right-0 px-6 py-2 text-[9px] font-black uppercase tracking-widest italic rounded-bl-3xl ${settings.saleEnabled ? 'bg-[#00b67a] text-white shadow-lg' : 'bg-muted text-muted-foreground'}`}>
                        {settings.saleEnabled ? 'Promotion Live' : 'Encryption Mode'}
                    </div>
                    <CardHeader className="p-10 pb-4">
                        <CardTitle className="flex items-center gap-4 text-foreground font-black uppercase italic tracking-tighter text-xl">
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                                <Zap className="w-5 h-5" />
                            </div>
                            Promotion Strategy
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-medium italic pl-14">Control site-wide discounts and presentation layers</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 pt-6 space-y-10">
                        <div className="flex items-center justify-between p-8 bg-muted/30 rounded-3xl border border-border shadow-inner">
                            <div className="space-y-1">
                                <p className="text-foreground font-black uppercase italic tracking-tight text-base">Authorize Global Sale</p>
                                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest italic opacity-60">Enables dynamic valuation badges</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, saleEnabled: !settings.saleEnabled })}
                                className={`w-16 h-8 rounded-full relative transition-all duration-300 shadow-sm ${settings.saleEnabled ? 'bg-primary' : 'bg-muted border border-border'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${settings.saleEnabled ? 'left-9' : 'left-1'}`} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end px-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">Valuation Reduction Vector</label>
                                <span className="text-4xl font-black text-foreground italic tracking-tighter leading-none">{settings.salePercentage}%</span>
                            </div>
                            <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="90"
                                    value={settings.salePercentage}
                                    onChange={(e) => setSettings({ ...settings, salePercentage: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary border border-border shadow-inner"
                                />
                                <div className="flex justify-between mt-4 px-1 text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest italic">
                                    <span>Base</span>
                                    <span>Extreme (90%)</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security & Protection */}
                <Card className="bg-card border-border overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
                    <CardHeader className="p-10 pb-4">
                        <CardTitle className="flex items-center gap-4 text-foreground font-black uppercase italic tracking-tighter text-xl">
                            <div className="w-10 h-10 rounded-xl bg-[#00b67a]/10 flex items-center justify-center text-[#00b67a]">
                                <Shield className="w-5 h-5" />
                            </div>
                            Cyber Resilience
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-medium italic pl-14">Anti-fraud protocols and maintenance states</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 pt-6 space-y-6">
                        <div className="flex items-center justify-between p-8 bg-muted/30 rounded-3xl border border-border shadow-inner">
                            <div className="space-y-1">
                                <p className="text-foreground font-black uppercase italic tracking-tight text-base">Identity Matrix Probe</p>
                                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest italic opacity-60">Force verification for high-risk nodes</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, storeProtection: !settings.storeProtection })}
                                className={`w-16 h-8 rounded-full relative transition-all duration-300 shadow-sm ${settings.storeProtection ? 'bg-[#00b67a]' : 'bg-muted border border-border'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${settings.storeProtection ? 'left-9' : 'left-1'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-8 bg-red-500/5 rounded-3xl border border-red-500/10 shadow-inner group">
                            <div className="space-y-1">
                                <p className="text-foreground font-black uppercase italic tracking-tight text-base group-hover:text-red-500 transition-colors">Emergency Lockdown</p>
                                <p className="text-red-500/50 text-[10px] font-black uppercase tracking-widest italic">Suspends all transactional capabilities</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                                className={`w-16 h-8 rounded-full relative transition-all duration-300 shadow-sm ${settings.maintenanceMode ? 'bg-red-500' : 'bg-muted border border-border'}`}
                            >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${settings.maintenanceMode ? 'left-9' : 'left-1'}`} />
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Email Delivery Settings */}
                <Card className="bg-card border-border md:col-span-2 rounded-[3rem] shadow-sm overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                        <CardTitle className="flex items-center gap-4 text-foreground font-black uppercase italic tracking-tighter text-xl">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            Provisioning Automation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-muted/30 rounded-3xl border border-border flex items-center gap-6 shadow-inner group hover:bg-muted/50 transition-all">
                                <div className="w-16 h-16 bg-[#00b67a]/10 rounded-2xl flex items-center justify-center text-[#00b67a] font-black italic tracking-tighter text-lg shadow-sm">ACTIVE</div>
                                <div>
                                    <p className="text-foreground font-black uppercase italic tracking-tight text-lg">Instant Key Transmission</p>
                                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest italic opacity-60">Synchronous license key delivery post-payment</p>
                                </div>
                            </div>
                            <div className="p-8 bg-muted/30 rounded-3xl border border-border flex items-center gap-6 shadow-inner group hover:bg-muted/50 transition-all">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 font-black italic tracking-tighter text-lg shadow-sm">ACTIVE</div>
                                <div>
                                    <p className="text-foreground font-black uppercase italic tracking-tight text-lg">Audit Invoice Generation</p>
                                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest italic opacity-60">Automated PDF documentation for client entities</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/10 rounded-[2rem] p-8 flex items-start gap-6 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
                    <AlertTriangle className="w-32 h-32" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <AlertTriangle className="w-7 h-7 text-orange-500" />
                </div>
                <div className="relative z-10">
                    <p className="text-foreground font-black uppercase italic tracking-widest text-sm mb-2">Live Storefront Protocol Warning</p>
                    <p className="text-muted-foreground text-xs font-medium italic leading-relaxed max-w-4xl">System directive: Committing these modifications will synchronize with the live production environment immediately. This action will impact checkout integrity and delivery automation globally.</p>
                </div>
            </div>
        </div>
    );
}
