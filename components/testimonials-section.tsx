'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Lead Designer',
    company: 'TechVision Studios',
    image: '👩‍💼',
    content: 'The flexibility of month-to-month subscriptions and easy license management saved us thousands annually.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Project Manager',
    company: 'BuildRight Construction',
    image: '👨‍💼',
    content: 'Incredible support team. They helped us set up team licenses in minutes instead of days.',
    rating: 5
  },
  {
    name: 'Elena Rodriguez',
    role: 'CTO',
    company: 'Innovation Labs',
    image: '👩‍💻',
    content: 'The admin dashboard gives us complete visibility into our software usage and spending.',
    rating: 5
  },
  {
    name: 'David Park',
    role: 'Founder',
    company: '3D Creative Agency',
    image: '👨‍🎨',
    content: 'Finally, a platform that understands the needs of design professionals. Highly recommended!',
    rating: 5
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-background relative border-t border-border overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-black text-xs uppercase tracking-widest mb-4 italic">Customer Stories</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 uppercase italic tracking-tighter">Loved by Design Professionals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            See what our customers have to say about their experience with AutoCAD Store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="bg-card/40 backdrop-blur-md border border-border rounded-[2rem] hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00b67a] text-[#00b67a]" />
                  ))}
                </div>

                <p className="mb-8 text-foreground text-lg font-medium leading-relaxed italic">&quot;{testimonial.content}&quot;</p>

                <div className="flex items-center gap-4 pt-6 border-t border-border">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shadow-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-black text-foreground uppercase italic tracking-tight">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                      {testimonial.role} — <span className="text-primary">{testimonial.company}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
