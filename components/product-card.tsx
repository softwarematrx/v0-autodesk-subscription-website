'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Star, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price?: number;
    originalPrice?: number;
    image: string;
    features: string[];
    badge?: string;
    popular?: boolean;
    tiers?: any[];
}

export default function ProductCard({
    id,
    name,
    description,
    price,
    originalPrice,
    image,
    features,
    badge,
    popular,
    tiers
}: ProductCardProps) {
    const router = useRouter();
    const [added, setAdded] = useState(false);

    // If tiers are provided, use the first or popular one as the default for the card
    const defaultTier = tiers?.find(t => t.popular) || tiers?.[0];
    const displayPrice = defaultTier ? defaultTier.price : (price || 0);
    const displayOriginalPrice = defaultTier ? defaultTier.originalPrice : originalPrice;

    const handleBuyNow = () => {
        router.push(`/product/${id}`);
    };

    return (
        <div className={`relative flex flex-col h-full bg-card/40 backdrop-blur-xl border rounded-[1.25rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 group ${popular ? 'border-primary/50 shadow-xl shadow-primary/10' : 'border-border hover:border-primary/30'
            }`}>
            {/* Badge */}
            {badge && (
                <div className="absolute top-6 left-6 z-10 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-lg italic">
                    {badge}
                </div>
            )}

            {/* Product Image */}
            <Link href={`/product/${id}`} className="relative aspect-square p-10 bg-muted/30 overflow-hidden block">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-background/80 backdrop-blur-md rounded-2xl border border-border opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] flex items-center gap-2 whitespace-nowrap italic">
                        <Shield className="w-4 h-4 text-primary" /> Authorized Genuine
                    </span>
                </div>
            </Link>

            <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="mb-6 flex justify-between items-start">
                    <Link href={`/product/${id}`} className="hover:opacity-80 transition-opacity">
                        <h3 className="text-base md:text-lg font-black text-foreground mb-1 uppercase italic tracking-tighter leading-none">{name}</h3>
                        <div className="flex gap-2 mb-3">
                            <span className="text-[8px] font-black bg-muted px-2 py-0.5 rounded text-muted-foreground uppercase tracking-widest border border-border">Windows</span>
                            <span className="text-[8px] font-black bg-muted px-2 py-0.5 rounded text-muted-foreground uppercase tracking-widest border border-border">Mac OS</span>
                        </div>
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest leading-none">{description}</p>
                    </Link>
                    <div className="flex flex-col items-end">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            ))}
                        </div>
                        <span className="text-[9px] text-muted-foreground font-black mt-2 tracking-[0.2em] uppercase italic opacity-50">Verified Seller</span>
                    </div>
                </div>

                {/* Pricing */}
                <div className="flex flex-col mb-8">
                    {tiers && <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic mb-1">Starting from</span>}
                    <div className="flex items-baseline gap-3">
                        <span className="text-xl md:text-2xl font-black text-primary italic tracking-tighter leading-none">${displayPrice.toFixed(2)}</span>
                        {displayOriginalPrice && (
                            <span className="text-xs md:text-sm text-muted-foreground line-through font-black italic tracking-tighter leading-none opacity-50">${displayOriginalPrice.toFixed(2)}</span>
                        )}
                    </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-10 flex-1">
                    {features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center gap-4 text-muted-foreground text-[10px] font-black uppercase tracking-widest italic group/item">
                            <div className="w-6 h-6 rounded-lg bg-[#00b67a]/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover/item:bg-[#00b67a]/20">
                                <Check className="w-3.5 h-3.5 text-[#00b67a]" />
                            </div>
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-4 pt-8 border-t border-border">
                    <Button
                        onClick={handleBuyNow}
                        className="w-full py-3.5 text-sm font-black transition-all duration-500 uppercase tracking-[0.2em] italic rounded-xl shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
                    >
                        BUY NOW
                    </Button>
                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground border border-border hover:bg-muted h-14 uppercase tracking-[0.3em] text-[10px] font-black italic rounded-2xl transition-all" asChild>
                        <Link href={`/product/${id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
