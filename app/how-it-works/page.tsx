'use client';

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Mail, Download, CheckCircle2, ShieldCheck, Zap, Laptop, ArrowRight, MessageSquare } from 'lucide-react';

const steps = [
    {
        icon: ShoppingCart,
        title: "Select Your Software",
        description: "Browse our catalog of genuine Autodesk 2026 products and choose the one that fits your needs.",
        color: "bg-primary/10 text-primary"
    },
    {
        icon: Zap,
        title: "Secure Fast Checkout",
        description: "Complete your purchase via our encrypted checkout system. We accept all major credit cards and PayPal.",
        color: "bg-orange-500/10 text-orange-500"
    },
    {
        icon: Mail,
        title: "Instant Activation Email",
        description: "Within minutes of your purchase, you'll receive an activation email to link the subscription to your Autodesk account.",
        color: "bg-green-500/10 text-green-500"
    },
    {
        icon: Download,
        title: "Log In & Design",
        description: "Simply log in to Autodesk.com with your email. Your subscription will be ready to download and use instantly.",
        color: "bg-blue-500/10 text-blue-500"
    }
];

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="mb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase italic tracking-tighter">
                            Simple. Fast. <span className="text-primary">Reliable.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                            We've streamlined the process of getting professional Autodesk software so you can focus on what matters: your designs.
                        </p>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="mb-32 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((step, index) => (
                                <div key={index} className="relative group">
                                    {/* Connector Line */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-border -translate-x-8 z-0" />
                                    )}

                                    <div className="bg-card border border-border rounded-[2rem] p-8 relative z-10 h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                                        <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            <step.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-black text-foreground mb-4 uppercase italic tracking-tight">{index + 1}. {step.title}</h3>
                                        <p className="text-muted-foreground font-medium leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Detailed Breakdown */}
                <section className="bg-muted/30 py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8 uppercase italic tracking-tighter leading-tight">
                                    What you receive <br /> <span className="text-primary italic">In your inbox</span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Official Subscription",
                                            desc: "A unique, authorized subscription linked directly to your Autodesk account.",
                                            icon: ShieldCheck
                                        },
                                        {
                                            title: "Official Download Link",
                                            desc: "Direct link to Autodesk's official servers to ensure a safe download.",
                                            icon: Laptop
                                        },
                                        {
                                            title: "Setup Guide",
                                            desc: "Detailed instructions for activation, troubleshooting, and support.",
                                            icon: CheckCircle2
                                        }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-6 bg-card border border-border rounded-2xl">
                                            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                                                <item.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-foreground uppercase italic tracking-tight mb-1">{item.title}</h4>
                                                <p className="text-muted-foreground text-sm font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="bg-primary rounded-[3rem] p-12 text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-6">Need help?</h3>
                                        <p className="text-lg font-medium opacity-90 mb-8 leading-relaxed">
                                            Our technical support team is available 24/7 to help you with the installation and activation of your software. Whether it's a technical glitch or a simple question, we're here for you.
                                        </p>
                                        <Link href="/contact">
                                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest px-8 rounded-xl gap-3">
                                                <MessageSquare className="w-5 h-5" />
                                                Message me now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 uppercase italic tracking-tighter">
                            Ready to start designing?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/products">
                                <Button size="lg" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
                                    View Catalog
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 py-8 text-lg font-black uppercase tracking-widest rounded-2xl border-2 border-primary/20">
                                    Ask a Question
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
}
