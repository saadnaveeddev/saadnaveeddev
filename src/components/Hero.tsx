import { ArrowDown, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Background is now global - overlay for hero text prominence */}

      {/* Enhanced overlay for text prominence */}
      <div className="absolute inset-0 -z-10" role="presentation" aria-hidden="true">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/60" />

        {/* Radial spotlight on center content */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 800px 600px at center, transparent 0%, rgba(10, 10, 10, 0.4) 100%)'
          }}
        />
      </div>

      <div className="section-container text-center">
        <div className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/Person">
          {/* Hero Image - Explicit LCP target */}
          <img
            src="https://www.saadnaveeddev.com/images/saad-naveed.jpg"
            alt="Saad Naveed Full Stack Developer AI Engineer portfolio profile picture"
            title="Saad Naveed - Full Stack Developer & AI Engineer"
            width="120"
            height="120"
            loading="eager"
            fetchPriority="high"
            itemProp="image"
            className="rounded-full w-28 h-28 mx-auto mb-6 border-2 border-accent/20 object-cover shadow-elevated"
          />

          {/* Hidden semantic text for image context */}
          <span className="sr-only">
            Profile photo of Saad Naveed, an expert Full Stack Developer and AI Engineer specializing in high-performance web applications.
          </span>

          {/* Main Heading - Primary H1 with full SEO keyword */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight" itemProp="name">
            Saad Naveed
          </h1>

          {/* Subtitle with role — supports secondary keywords */}
          <p className="mt-4 text-xl md:text-2xl text-accent font-semibold animate-fade-up-delay-1" itemProp="jobTitle">
            Full Stack Developer &amp; MERN Stack Engineer
          </p>

          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-medium animate-fade-up-delay-1" role="doc-subtitle">
            React Developer{" "}
            <span className="text-accent" aria-hidden="true">|</span> Node.js{" "}
            <span className="text-accent" aria-hidden="true">|</span> AI-Powered Web Solutions
          </p>

          {/* Value statement */}
          <p className="mt-8 text-xl md:text-2xl text-foreground/80 font-light leading-relaxed animate-fade-up-delay-2">
            I build scalable, high-performance web applications
            <br className="hidden md:block" />
            that solve real business problems.
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
            <button
              onClick={scrollToWork}
              className="btn-primary group"
              aria-label="Scroll to portfolio section"
              id="hero-view-work-btn"
            >
              View My Work
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
            </button>
            <Link
              to="/contact"
              className="btn-outline group"
              aria-label="Go to contact page"
              id="hero-contact-btn"
            >
              <MessageSquare className="w-4 h-4 text-accent" aria-hidden="true" />
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up-delay-3" role="presentation" aria-hidden="true">
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
