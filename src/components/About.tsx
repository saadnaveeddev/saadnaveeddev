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
    <section id="about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <article className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <span className="section-title">About Me</span>
            <h2 id="about-heading" className="section-heading">
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
            <div className="mt-10 grid grid-cols-3 gap-6" role="group" aria-label="Professional statistics">
              <div>
                <div className="text-3xl font-bold text-foreground" aria-label="5 plus years of experience">5+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" aria-label="50 plus projects completed">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" aria-label="30 plus happy clients">30+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
              </div>
            </div>
          </article>

          {/* Profile Photo */}
          <div className={`relative transition-all duration-600 ease-out delay-[240ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* Decorative glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-accent/5 blur-2xl scale-110" aria-hidden="true" />
              {/* Accent border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 scale-105" aria-hidden="true" />
              {/* Photo container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border shadow-elevated">
                <img
                  src="/images/saad-naveed.jpg"
                  alt="Saad Naveed — Full-Stack Developer"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
