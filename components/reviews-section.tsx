'use client';

import { Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const REVIEWS = [
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
];

export default function ReviewsSection() {
    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Trustpilot-style header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 italic tracking-tighter flex items-center gap-4 py-2 uppercase">
                            <Star className="w-10 h-10 fill-[#00b67a] text-[#00b67a]" />
                            Trustpilot
                        </h2>
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                            <span className="text-foreground font-black text-xl italic uppercase">Excellent</span>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-6 h-6 bg-[#00b67a] flex items-center justify-center rounded-sm shadow-sm">
                                        <Star className="w-4 h-4 fill-white text-white" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Based on <span className="text-foreground font-black">2,547 reviews</span></p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="px-6 py-4 bg-muted border border-border rounded-2xl flex items-center gap-3 shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-[#00b67a]" />
                            <span className="text-foreground font-black uppercase tracking-tight text-xs">Verified Merchant</span>
                        </div>
                        <div className="px-6 py-4 bg-muted border border-border rounded-2xl flex items-center gap-3 shadow-sm">
                            <CheckCircle2 className="w-5 h-5 text-[#00b67a]" />
                            <span className="text-foreground font-black uppercase tracking-tight text-xs">Authorized Reseller</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, index) => (
                        <div key={index} className="bg-card border border-border rounded-[2rem] p-8 hover:border-primary/50 transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-primary/5">
                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <div key={i} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-sm">
                                        <Star className="w-3 h-3 fill-white text-white" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-foreground font-medium italic mb-8 leading-relaxed text-lg">&ldquo;{review.content}&rdquo;</p>
                            <div className="flex items-center gap-4 pt-6 border-t border-border">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl shadow-sm uppercase italic">
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

                <div className="mt-16 text-center">
                    <Link href="/reviews">
                        <button className="text-[#00b67a] font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform italic border-b-2 border-transparent hover:border-[#00b67a] pb-1">Read more verified reviews on Trustpilot →</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
