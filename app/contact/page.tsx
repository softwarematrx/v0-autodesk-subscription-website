'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 uppercase italic tracking-tighter">Contact <span className="text-primary italic">Support</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Have questions about your license or need technical assistance? Our team of experts is dedicated to helping you get the most out of your software.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-card/40 backdrop-blur-md p-8 rounded-[2rem] border border-border space-y-8 shadow-xl">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-black text-xl mb-1 uppercase italic tracking-tight">Support Message Portal</h3>
                    <p className="text-muted-foreground mb-2 text-xs font-bold uppercase tracking-widest leading-none">Primary Communication Channel</p>
                    <p className="text-primary font-black uppercase italic">Secured & Encrypted</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-black text-xl mb-1 uppercase italic tracking-tight">Direct Response</h3>
                    <p className="text-muted-foreground mb-2 text-xs font-bold uppercase tracking-widest leading-none">Mon-Sun, 24/7 Availability</p>
                    <p className="text-primary font-black uppercase italic">Average response: 15min</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-black text-xl mb-1 uppercase italic tracking-tight">Headquarters</h3>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest italic">123 Design Technology Street</p>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest italic">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-transparent p-8 rounded-[2rem] border border-primary/20 shadow-lg">
                <h4 className="text-foreground font-black mb-2 text-lg uppercase italic tracking-tight">Guaranteed Response</h4>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  We pride ourselves on our 24/7 support availability. Expect a detailed response from one of our licensing experts within 2 business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-card/40 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-border relative overflow-hidden shadow-xl">
                {submitted ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-[#00b67a]/10 rounded-full flex items-center justify-center text-[#00b67a] mx-auto mb-6 border border-[#00b67a]/20">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-2 uppercase italic tracking-tight">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground font-medium">We've received your inquiry and will get back to you shortly.</p>
                    <Button
                      variant="ghost"
                      className="mt-8 text-primary hover:text-primary hover:bg-primary/10 font-black uppercase tracking-widest text-xs"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic ml-1">Full Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium placeholder:text-muted-foreground/30"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium placeholder:text-muted-foreground/30"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic ml-1">Subject</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium placeholder:text-muted-foreground/30"
                        placeholder="Licensing Question"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic ml-1">Message</label>
                      <textarea
                        required
                        rows={6}
                        className="w-full bg-muted/50 border border-border rounded-2xl px-5 py-4 text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all font-medium placeholder:text-muted-foreground/30 resize-none"
                        placeholder="How can we help you today?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-16 rounded-2xl gap-3 text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 uppercase italic tracking-widest">
                      <Send className="w-6 h-6" />
                      Send Secure Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
