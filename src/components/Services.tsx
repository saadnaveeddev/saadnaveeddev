import { useEffect, useRef, useState } from "react";
import { Code2, Palette, Server, Cpu } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description: "Scalable MERN applications with clean APIs & modern UI that grow with your business.",
  },
  {
    icon: Palette,
    title: "Frontend Engineering",
    description: "React / Next.js expertise delivering responsive, fast, conversion-focused interfaces.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description: "Secure, optimized backends with robust databases and seamless integrations.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Features",
    description: "Smart automation and AI-driven dashboards that add intelligence to your products.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="bg-background">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-title">What I Do</span>
          <h2 className="section-heading">
            Building Solutions That
            <br />
            <span className="text-accent">Drive Results</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`card-premium group transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="icon-box mb-5 transition-transform duration-300 group-hover:scale-110">
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
