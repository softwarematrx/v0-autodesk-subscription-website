'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase italic">Legal Disclaimer</h1>
                    </div>

                    <div className="space-y-12 text-muted-foreground leading-relaxed font-medium">
                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">Independent Reseller</h2>
                            <p>
                                AutoCAD Store is an independent reseller of software products. We are not an official representative, affiliate, or division of Autodesk, Inc. All trademarks, service marks, trade names, product names, and logos appearing on the site are the property of their respective owners.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">Trademark Acknowledgment</h2>
                            <p>
                                AutoCAD®, AutoCAD LT®, Revit®, for example, are registered trademarks of Autodesk, Inc., in the USA and/or other countries. AutoCAD Store acknowledges the ownership of these trademarks and uses them solely for descriptive purposes to identify the products being sold.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">No Endorsement</h2>
                            <p>
                                The use of any trademarked name is not intended to suggest any endorsement, sponsorship, or affiliation with the trademark owner. Our reference to these products in no way implies any association between AutoCAD Store and Autodesk, Inc.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">Product Activation</h2>
                            <p>
                                The software provided must be activated through the official channels as specified in the product delivery email. AutoCAD Store is not responsible for any activation issues arising from unauthorized modifications to the software or misuse of the product keys.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-foreground uppercase tracking-widest border-l-2 border-primary pl-4 italic">Information Disclaimer</h2>
                            <p>
                                The information provided on this website is for general informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the website content.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
