'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Star, CheckCircle2, ShieldCheck, Award, ThumbsUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CTASection from '@/components/cta-section';

const ALL_REVIEWS = [
    {
        name: 'Robert Miller',
        role: 'Principal Architect',
        content: 'The AutoCAD 2026 subscription activation was seamless. I received the email with the activation link in less than 2 minutes. High performance and zero issues so far.',
        rating: 5,
        date: 'Jan 22, 2026'
    },
    {
        name: 'Sarah Jenkins',
        role: 'Structural Engineer',
        content: 'Best price for genuine AutoCAD I have found. The activation guide was very helpful, and support answered my technical questions instantly.',
        rating: 5,
        date: 'Jan 15, 2026'
    },
    {
        name: 'James Wilson',
        role: 'CAD Manager',
        content: 'Was skeptical at first about the activation speed, but it really is instant. Our team is now fully upgraded with official subscriptions. Exceptional service and value.',
        rating: 5,
        date: 'Jan 10, 2026'
    },
    {
        name: 'Michael Chen',
        role: 'Mechanical Designer',
        content: 'Transitioning to the 2026 version was smooth. The subscription was active on my Autodesk ID within the hour as promised. Highly recommend this store.',
        rating: 5,
        date: 'Jan 05, 2026'
    },
    {
        name: 'Elena Rodriguez',
        role: 'Interior Designer',
        content: 'I needed AutoCAD for a project urgently. The support team helped me through the activation process late at night. Amazing customer service!',
        rating: 5,
        date: 'Dec 28, 2025'
    },
    {
        name: 'David Thompson',
        role: 'Civil Engineer',
        content: 'Reliable service and genuine software. I\'ve purchased several subscriptions for my firm here and it\'s always a consistent, professional experience.',
        rating: 5,
        date: 'Dec 15, 2025'
    }
];

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-24">
                {/* Hero section for reviews */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-[#00b67a]/10 border border-[#00b67a]/20 rounded-full px-6 py-2 mb-8">
                            <Star className="w-4 h-4 fill-[#00b67a] text-[#00b67a]" />
                            <span className="text-[#00b67a] font-black text-xs uppercase tracking-[0.2em] italic">Excellent 4.9/5 on Trustpilot</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-8 uppercase italic tracking-tighter">
                            Customer <span className="text-primary italic">Success</span> Stories
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                            Join over 2,500+ professionals who have empowered their workflow with official Autodesk subscriptions from our store.
                        </p>
                    </div>
                </div>

                {/* Stats board */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card border border-border rounded-[3rem] p-12 shadow-xl shadow-black/5">
                        <div className="text-center">
                            <div className="text-4xl font-black text-foreground mb-2 italic">2,500+</div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Verified Reviews</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-primary mb-2 italic">99%</div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-foreground mb-2 italic">2min</div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Average Delivery</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-primary mb-2 italic">24/7</div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Expert Support</div>
                        </div>
                    </div>
                </div>

                {/* Review grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ALL_REVIEWS.map((review, index) => (
                            <div key={index} className="bg-card border border-border rounded-[2.5rem] p-10 hover:border-primary/50 transition-all duration-500 group shadow-lg hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
                                <div className="flex gap-1 mb-8">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <div key={i} className="w-6 h-6 bg-[#00b67a] flex items-center justify-center rounded-sm">
                                            <Star className="w-3.5 h-3.5 fill-white text-white" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-foreground font-medium italic mb-10 leading-relaxed text-xl flex-1">&ldquo;{review.content}&rdquo;</p>
                                <div className="flex items-center gap-5 pt-8 border-t border-border">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl shadow-sm uppercase italic shrink-0">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-foreground font-black uppercase italic tracking-tight">{review.name}</h4>
                                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest leading-none mt-1">{review.role} • <span className="text-primary">{review.date}</span></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-foreground">Why Professionals Trust Us</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto shadow-inner">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black uppercase italic italic tracking-tight">Verified Software</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed uppercase text-xs tracking-widest">Every subscription is officially registered on your Autodesk account for zero-risk performance.</p>
                        </div>
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto shadow-inner">
                                <Award className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black uppercase italic italic tracking-tight">Authorized Store</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed uppercase text-xs tracking-widest">We are a recognized reseller committed to providing authentic Autodesk solutions directly to users.</p>
                        </div>
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto shadow-inner">
                                <ThumbsUp className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black uppercase italic italic tracking-tight">Expert Backed</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed uppercase text-xs tracking-widest">Our support doesn't end at checkout. Our engineers are available 24/7 for any technical needs.</p>
                        </div>
                    </div>
                </div>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
