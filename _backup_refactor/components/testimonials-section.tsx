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
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Design Professionals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="text-2xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
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
