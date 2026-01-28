'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">About Autodesk Hub</h1>
            <p className="text-lg text-muted-foreground">
              Making professional design software accessible to everyone
            </p>
          </div>

          <div className="space-y-12">
            {/* Mission */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Autodesk Hub, our mission is to democratize access to world-class design and engineering software. We believe that powerful tools should be affordable and accessible to professionals at every level, from startups to enterprises.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We partner directly with Autodesk to bring you the latest versions of industry-leading applications with flexible, transparent pricing that fits your budget.
              </p>
            </section>

            {/* Why Choose Us */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Why Choose Autodesk Hub?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Best Pricing',
                    description: 'We offer competitive rates with flexible monthly, quarterly, and annual plans. No hidden fees, cancel anytime.'
                  },
                  {
                    title: 'Expert Support',
                    description: 'Our dedicated support team is available 24/7 to help you with setup, troubleshooting, and optimization.'
                  },
                  {
                    title: 'Instant Access',
                    description: 'Get immediate access to your subscriptions. Download and activate within minutes of purchase.'
                  },
                  {
                    title: 'Team Management',
                    description: 'Easily manage licenses for your entire team from our intuitive admin dashboard.'
                  },
                  {
                    title: 'Secure & Reliable',
                    description: 'Enterprise-grade security and 99.9% uptime guarantee for uninterrupted access to your tools.'
                  },
                  {
                    title: 'Always Updated',
                    description: 'Automatic updates keep your software current with the latest features and improvements.'
                  },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Stats */}
            <section className="bg-muted/30 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-8 text-center">By The Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { number: '10K+', label: 'Active Users' },
                  { number: '500K+', label: 'Projects Created' },
                  { number: '98%', label: 'Satisfaction Rate' },
                  { number: '24/7', label: 'Support' },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</p>
                    <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We're a diverse team of software engineers, designers, and business professionals passionate about making great tools accessible. With over 150 years of combined experience in software and design, we understand what professionals need.
              </p>
            </section>

            {/* Contact CTA */}
            <section className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 opacity-90">
                Join thousands of professionals already using Autodesk applications through our platform.
              </p>
              <a href="/products" className="inline-block px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition">
                Explore Products
              </a>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
