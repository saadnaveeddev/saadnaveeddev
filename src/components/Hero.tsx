import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToWork = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight animate-fade-up">
            Saad Naveed
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-medium animate-fade-up-delay-1">
            Full-Stack Developer{" "}
            <span className="text-accent">|</span> MERN{" "}
            <span className="text-accent">|</span> AI-Powered Web Solutions
          </p>

          {/* Value statement */}
          <p className="mt-8 text-xl md:text-2xl text-foreground/80 font-light leading-relaxed animate-fade-up-delay-2">
            I build scalable, high-performance web applications
            <br className="hidden md:block" />
            that solve real business problems.
          </p>

          {/* CTA */}
          <div className="mt-12 animate-fade-up-delay-3">
            <button
              onClick={scrollToWork}
              className="btn-primary group"
            >
              View My Work
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-up-delay-3">
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
