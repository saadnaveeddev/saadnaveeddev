import { useEffect, useRef, useState } from "react";
import ProjectModal, { Project } from "./ProjectModal";

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with payment integration and inventory management.",
    fullDescription: "A comprehensive e-commerce solution built for a growing retail brand. Features include real-time inventory tracking, Stripe payment integration, order management dashboard, and a mobile-responsive storefront. The platform handles thousands of daily transactions with 99.9% uptime.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    liveUrl: "https://example.com",
  },
  {
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform with predictive insights.",
    fullDescription: "An intelligent analytics platform that transforms raw data into actionable insights. Powered by machine learning models for predictive analysis, real-time data streaming, and interactive D3.js visualizations. Helps businesses make data-driven decisions faster.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["Next.js", "Python", "TensorFlow", "D3.js", "PostgreSQL"],
    liveUrl: "https://example.com",
  },
  {
    title: "SaaS Management Tool",
    description: "Multi-tenant application for team collaboration and project tracking.",
    fullDescription: "A powerful project management SaaS built for modern teams. Features include real-time collaboration, Kanban boards, time tracking, team permissions, and integrations with popular tools like Slack and GitHub. Scales from small teams to enterprise organizations.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["React", "Express", "PostgreSQL", "Redis", "WebSocket"],
    liveUrl: "https://example.com",
  },
  {
    title: "Healthcare Portal",
    description: "Secure patient management system with appointment scheduling.",
    fullDescription: "A HIPAA-compliant healthcare management system designed for clinics and private practices. Includes patient records management, appointment scheduling with SMS reminders, telemedicine integration, and secure messaging between patients and providers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["React", "Node.js", "MongoDB", "AWS", "Twilio"],
  },
  {
    title: "Fintech Mobile App",
    description: "Investment tracking and portfolio management application.",
    fullDescription: "A sleek mobile-first investment platform that helps users track their portfolios, analyze market trends, and make informed investment decisions. Features real-time price updates, personalized insights, and secure banking integrations.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["React Native", "Node.js", "GraphQL", "Plaid API"],
    liveUrl: "https://example.com",
  },
  {
    title: "Real Estate Platform",
    description: "Property listing marketplace with virtual tour integration.",
    fullDescription: "A modern real estate marketplace connecting buyers, sellers, and agents. Features include advanced property search with map integration, 3D virtual tours, mortgage calculators, and an agent dashboard for managing listings and leads.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["Next.js", "Prisma", "PostgreSQL", "Mapbox", "Three.js"],
    liveUrl: "https://example.com",
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <>
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
                onClick={() => setSelectedProject(project)}
                className={`group card-glow p-0 overflow-hidden cursor-pointer transition-all duration-500 ${
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-foreground text-sm font-medium">View Project →</span>
                  </div>
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
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="tech-tag">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal 
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Portfolio;
