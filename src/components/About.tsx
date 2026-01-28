import { useEffect, useRef, useState } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-title">About Me</span>
            <h2 className="section-heading">
              Crafting Digital
              <br />
              <span className="text-accent">Experiences</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a full-stack developer specializing in modern web applications using the MERN stack. 
                I focus on clean architecture, performance, and scalable solutions that help products grow.
              </p>
              <p>
                I enjoy turning complex ideas into simple, reliable digital experiences. Every line of code 
                I write is purposeful—built to last and easy to maintain.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">30+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Abstract illustration */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Abstract shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 rotate-12 animate-float" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-tr from-primary/10 to-primary/5 -rotate-6" style={{ animationDelay: '2s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-xl border-2 border-accent/30 rotate-45" />
              </div>
              {/* Code icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-card shadow-elevated flex items-center justify-center">
                  <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
