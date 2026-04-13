import React, { Suspense } from "react";
import ContactNav from "@/components/contact/ContactNav";
import AnimatedBackground from "@/components/AnimatedBackground";

// Lazy load below-the-fold sections
const QuickContactGrid = React.lazy(() => import("@/components/contact/QuickContactGrid"));
const BookingSection = React.lazy(() => import("@/components/contact/BookingSection"));
const Footer = React.lazy(() => import("@/components/Footer"));

const Contact = () => {
  return (
    <>
      {/* SEO Meta */}
      <title>Contact Saad Naveed — Full Stack Developer & AI Engineer | Book a Call</title>
      <meta
        name="description"
        content="Get in touch with Saad Naveed for AI products, SaaS applications, and automation systems. Book a free 15-minute strategy call or send a message."
      />

      <main className="relative min-h-screen" role="main" aria-label="Contact Page">
        {/* Global animated background */}
        <div className="fixed inset-0 -z-50" role="presentation" aria-hidden="true">
          <AnimatedBackground />
        </div>

        {/* Navigation */}
        <ContactNav />

        {/* Lazy loaded sections */}
        <div className="pt-16">
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <QuickContactGrid />
          <BookingSection />
          <Footer />
        </Suspense>
        </div>
      </main>
    </>
  );
};

export default Contact;
