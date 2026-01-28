'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase italic">Terms of Service</h1>
                    </div>

                    <div className="space-y-12 text-muted-foreground leading-relaxed font-medium">
                        <p className="text-lg">
                            Welcome to AutoCAD Store. By accessing our website and purchasing our digital products, you agree to comply with and be bound by the following terms and conditions.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">1. Acceptance of Terms</h2>
                            <p>
                                By using this site, you signify your acceptance of these terms. If you do not agree to these terms, please do not use our site. We reserve the right to update these terms at any time without prior notice.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">2. Product Licensing</h2>
                            <p>
                                AutoCAD Store is an independent reseller. All software licenses sold are genuine and subject to the End User License Agreement (EULA) provided by the software manufacturer (Autodesk). You are responsible for complying with the manufacturer's terms of use.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">3. Accuracy of Information</h2>
                            <p>
                                While we strive for accuracy, we do not warrant that product descriptions or other content on this site are 100% accurate, complete, or error-free. Prices and availability are subject to change without notice.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">4. Limitation of Liability</h2>
                            <p>
                                AutoCAD Store shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if AutoCAD Store has been advised of the possibility of such damages.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">5. Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law principles.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
