'use client';

import { MessageSquare, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FloatingContact() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isDismissed) setIsVisible(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isDismissed]);

    if (isDismissed) return null;

    return (
        <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90'}`}>
            <div className="relative group">
                {/* Glow effect matching the image's subtle orange/red aura */}
                <div className="absolute -inset-2 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="relative flex items-center bg-black rounded-[1.5rem] p-5 shadow-2xl border border-white/5 min-w-[280px]">
                    <Link href="/contact" className="flex items-center gap-5 flex-1 group/link">
                        {/* Icon Container - Dark Red/Brownish as seen in image */}
                        <div className="w-14 h-14 bg-[#4a1a14] rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover/link:scale-110 duration-300">
                            <MessageSquare className="w-7 h-7 text-[#999999] stroke-[1.5px]" />
                        </div>

                        <div className="flex flex-col">
                            <h4 className="text-white font-black text-lg tracking-tight leading-none mb-2">Need help?</h4>
                            <span className="text-[#c43e2e] text-[11px] font-black uppercase tracking-[0.1em] italic">
                                Message me now
                            </span>
                        </div>
                    </Link>

                    {/* Close button - Top right as seen in image */}
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors p-1"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
