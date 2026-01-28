import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <main className="relative min-h-screen">
      {/* Global animated background - fixed position */}
      <div className="fixed inset-0 -z-50">
        <AnimatedBackground />
      </div>

      {/* Content sections */}
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
