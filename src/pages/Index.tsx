import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import SEOHead from "@/components/SEOHead";
import AnimatedBackground from "@/components/AnimatedBackground";

// Lazy load below-the-fold components for better performance SEO (Lighthouse score)
const About = React.lazy(() => import("@/components/About"));
const Portfolio = React.lazy(() => import("@/components/Portfolio"));
const Testimonials = React.lazy(() => import("@/components/Testimonials"));
const SEOContent = React.lazy(() => import("@/components/SEOContent"));
const Footer = React.lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main className="relative min-h-screen" role="main" aria-label="Portfolio Content">
      <SEOHead />
      {/* Global animated background - fixed position */}
      <div className="fixed inset-0 -z-50" role="presentation" aria-hidden="true">
        <AnimatedBackground />
      </div>

      {/* Hero section is loaded initially for fast LCP (Largest Contentful Paint) */}
      <Hero />

      {/* Lazy loaded content sections */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading content...</div>}>
        <About />
        <Portfolio />
        <Testimonials />
        <SEOContent />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
