'use client';

import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ShieldCheck } from 'lucide-react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="relative pt-32 pb-24 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase italic">Refund Policy</h1>
                    </div>

                    <div className="space-y-12 text-muted-foreground leading-relaxed font-medium">
                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">1. Digital Product Nature</h2>
                            <p>
                                At AutoCAD Store, we specialize in digital software licenses. Due to the nature of digital goods, once a product key has been delivered via email or displayed on your screen, it is considered "used" in the eyes of the industry.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">2. Eligibility for Refunds</h2>
                            <p>
                                Refunds may be granted under the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>The product key provided is invalid or already activated (verification required).</li>
                                <li>The product delivered does not match the description of the item purchased.</li>
                                <li>The order has not yet been processed or delivered.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">3. Non-Refundable Situations</h2>
                            <p>
                                We cannot issue refunds if:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You simply changed your mind after the key has been delivered.</li>
                                <li>Your hardware does not meet the minimum system requirements for the software.</li>
                                <li>You purchased the wrong version or product by mistake (after delivery).</li>
                                <li>The software is incompatible with your specific operating system (e.g., trying to run Windows software on Mac).</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">4. Process for Refund Requests</h2>
                            <p>
                                To request a refund, please contact our support team through our <Link href="/contact" className="text-primary font-bold hover:underline italic">Support Message Portal</Link> within 14 days of purchase. Please include your order number and a detailed explanation of the issue, including screenshots if applicable.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">5. Processing Times</h2>
                            <p>
                                Once approved, refunds are processed back to your original payment method. Depending on your financial institution, this may take 5-10 business days to appear on your statement.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
