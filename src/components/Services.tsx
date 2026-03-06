import { useEffect, useRef, useState } from "react";
import { Code2, Monitor, Server, Cpu, Network, Zap } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full Stack Web Development",
    description: "Scalable MERN applications with clean APIs & modern UI that grow with your business.",
  },
  {
    icon: Monitor,
    title: "React Application Development",
    description: "Building responsive, fast, and interactive user interfaces for modern frontend products.",
  },
  {
    icon: Server,
    title: "Node.js Backend Development",
    description: "Secure, optimized server-side logic and robust databases powering complex web apps.",
  },
  {
    icon: Cpu,
    title: "AI Powered Web Applications",
    description: "Integrating smart automation and machine learning features to add intelligence to products.",
  },
  {
    icon: Network,
    title: "API Development",
    description: "Designing and integrating seamless RESTful and GraphQL APIs for various client needs.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Improving page load times, SEO metrics, and overall application speed and efficiency.",
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
    <section id="services" ref={sectionRef} aria-labelledby="services-heading">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-title">What I Do</span>
          <h2 id="services-heading" className="section-heading">
            Building Solutions That
            <br />
            <span className="text-accent">Drive Results</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`card-glow group transition-all duration-600 ease-out ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="icon-box mb-5 transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden="true">
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
