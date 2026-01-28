'use client';

import { Mail, Shield, Download, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
    {
        title: 'Provide Your Email',
        description: 'Enter the email address you use for your Autodesk account during checkout.',
        icon: <Mail className="w-6 h-6" />
    },
    {
        title: 'Secure Checkout',
        description: 'Complete your purchase quickly and safely via our encrypted payment system.',
        icon: <Shield className="w-6 h-6" />
    },
    {
        title: 'Account Activation',
        description: 'Within 1 hour, your subscription is activated directly on your Autodesk account email.',
        icon: <CheckCircle className="w-6 h-6" />
    },
    {
        title: 'Download & Design',
        description: 'Log in to Autodesk.com, download your software, and start creating immediately.',
        icon: <Download className="w-6 h-6" />
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-24 bg-background relative border-t border-border" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 uppercase italic tracking-tighter">Direct Account Activation</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Forget complicated license keys. We link your subscription directly to your Autodesk ID for a
                        seamless, official experience within minutes.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((step, index) => (
                        <div key={index} className="relative group">
                            {index < STEPS.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full border-t-2 border-dashed border-primary/20 z-0 h-10 -translate-x-8" />
                            )}

                            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-3xl p-8 relative z-10 hover:border-primary/50 transition-all duration-300 h-full shadow-lg">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                                    <span className="text-primary/50 text-sm font-black italic">0{index + 1}</span>
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed font-medium">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
