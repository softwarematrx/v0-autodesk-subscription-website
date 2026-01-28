'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Lock } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase italic">Privacy Policy</h1>
                    </div>

                    <div className="space-y-12 text-muted-foreground leading-relaxed font-medium">
                        <p className="text-lg">
                            At AutoCAD Store, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">1. Information Collection</h2>
                            <p>
                                We collect information you provide directly to us when you make a purchase, create an account, or contact our support team. This may include your name, email address, billing address, and payment details.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">2. Use of Information</h2>
                            <p>
                                Your information is used to process transactions, deliver digital products, provide customer support, and send occasional promotional emails (which you can opt-out of at any time).
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">3. Data Security</h2>
                            <p>
                                We implement industry-standard security measures, including SSL encryption, to protect your personal data during transmission and storage. Your payment information is processed through secure gateways and never stored directly on our servers.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">4. Third-Party Sharing</h2>
                            <p>
                                We do not sell, trade, or otherwise transfer your personal information to outside parties, except to trusted third parties who assist us in operating our website and processing payments, as long as those parties agree to keep this information confidential.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">5. Cookies</h2>
                            <p>
                                Our website uses cookies to enhance your browsing experience, remember your cart items, and analyze site traffic. You can choose to disable cookies through your browser settings, though some site features may not function correctly.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
