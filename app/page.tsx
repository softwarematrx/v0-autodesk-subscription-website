'use client';

import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroSection from '@/components/hero-section';
import HowItWorksSection from '@/components/how-it-works-section';
import ReviewsSection from '@/components/reviews-section';
import FeaturesSection from '@/components/features-section';
import CTASection from '@/components/cta-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
