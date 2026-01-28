import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with payment integration and inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform with predictive insights.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
    tags: ["Next.js", "Python", "TensorFlow", "D3.js"],
  },
  {
    title: "SaaS Management Tool",
    description: "Multi-tenant application for team collaboration and project tracking.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
    tags: ["React", "Express", "PostgreSQL", "Redis"],
  },
  {
    title: "Healthcare Portal",
    description: "Secure patient management system with appointment scheduling.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    title: "Fintech Mobile App",
    description: "Investment tracking and portfolio management application.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop&auto=format",
    tags: ["React Native", "Node.js", "GraphQL"],
  },
  {
    title: "Real Estate Platform",
    description: "Property listing marketplace with virtual tour integration.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="bg-secondary/30">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-title">Selected Work</span>
          <h2 className="section-heading">
            Projects That
            <br />
            <span className="text-accent">Make Impact</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group card-premium p-0 overflow-hidden cursor-pointer transition-all duration-500 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
