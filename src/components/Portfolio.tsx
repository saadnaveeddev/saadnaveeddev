import { useEffect, useRef, useState } from "react";
import ProjectModal, { Project } from "./ProjectModal";

const projects: Project[] = [
  {
    title: "Hijazi Tailoring",
    description: "Premium tailoring showcase with booking and measurement features.",
    fullDescription: "Hijazi Tailoring is a sleek, modern web presence built to showcase a premium tailoring shop in Al Khobar. The site highlights core services like bespoke suits, alterations, formal wear, and traditional garments. With a clean, responsive design, visitors can explore galleries, view pricing, book fittings, and access measurement guides. The site emphasizes craftsmanship, punctual delivery, and customer-centric service. Built with modern web tech, it serves both as a branding tool and a lead-generation platform.",
    image: "/images/hijazi-main.png",
    gallery: [
      "/images/hijazi-main.png",
      "/images/hijazi-services.png",
      "/images/hijazi-booking.png",
    ],
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://nextjs-tailor-shop.vercel.app/en",
  },
  {
    title: "PowerLand House",
    description: "Industrial power solutions platform with location services and product catalog.",
    fullDescription: "A modern web platform for PowerLand House, an industrial electrical engineering company. The solution established their digital identity, featuring accurate location pinning to solve accessibility issues and a comprehensive service showcase for transformers, generators, and motors. The platform helped drive a 36% increase in client acquisition.",
    image: "/images/powerland-hero.png",
    gallery: [
      "/images/powerland-hero.png",
      "/images/powerland-services.png",
      "/images/powerland-location.png",
    ],
    tags: ["React", "Vite", "Google Maps API", "Tailwind CSS"],
    liveUrl: "https://powerland-house.lovable.app/",
  },
  {
    title: "PDF-Vision",
    description: "Intelligent PDF workspace for editing, signing, and collaboration.",
    fullDescription: "A professional PDF platform redefining document workflows. PDF-Vision helps teams centralize editing, signing, and collaboration on high-stakes documents. Featuring 20+ purpose-built tools including OCR, Redaction, and AI-powered Chat with PDF. Trusted by over 1M+ active users to process millions of documents with enterprise-grade security.",
    image: "/images/pdf-vision-hero.png",
    gallery: [
      "/images/pdf-vision-hero.png",
      "/images/pdf-vision-editor.png",
      "/images/pdf-vision-tools.png",
    ],
    tags: ["Next.js", "React", "TypeScript", "AI Integration"],
    liveUrl: "https://pdf-vision.com/",
  },
  {
    title: "CAELUM WEAR",
    description: "Premium leather biker jacket e-commerce store with custom sizing.",
    fullDescription: "CAELUM WEAR International is a premium e-commerce brand specializing in handcrafted leather biker jackets. The platform showcases a 'Legendary Style' with a focus on master craftsmanship and 100% genuine leather. Features include a comprehensive collection view (Biker, Classic, Winter), a 'Custom Fit' bespoke ordering system, and a seamless shopping experience for global customers.",
    image: "/images/caelum-hero.png",
    gallery: [
      "/images/caelum-hero.png",
      "/images/caelum-collection.png",
      "/images/caelum-custom.png",
    ],
    tags: ["React", "Tailwind CSS", "Framer Motion", "Supabase"],
    liveUrl: "https://caelumwear-international.lovable.app/",
  },
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
    title: "Fintech Web App",
    description: "Investment tracking and portfolio management application.",
    fullDescription: "A sleek web-based investment platform that helps users track their portfolios, analyze market trends, and make informed investment decisions. Features real-time price updates, personalized insights, and secure banking integrations.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["Next.js", "Nest.js", "GraphQL", "Plaid API"],
    liveUrl: "https://app.unitekhub.com/login",
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
    liveUrl: "https://affordablerenders.com/",
  },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [category, setCategory] = useState<'web' | 'ai' | null>(null);

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
      <section id="portfolio" ref={sectionRef} aria-labelledby="portfolio-heading">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-title">Selected Work</span>
            <h2 id="portfolio-heading" className="section-heading">
              Projects That
              <br />
              <span className="text-accent">Make Impact</span>
            </h2>
          </div>

          {!category ? (
            /* Category Selection */
            <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

              {/* Web Development Card */}
              <div
                onClick={() => setCategory('web')}
                className="group card-glow p-8 rounded-2xl cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center gap-6 min-h-[300px] justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground group-hover:text-accent transition-colors"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Web Development</h3>
                  <p className="text-muted-foreground">
                    Modern web applications built with React, Next.js, and cutting-edge technologies.
                  </p>
                </div>
                <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-2">
                  View Projects →
                </span>
              </div>

              {/* AI Card */}
              <div
                onClick={() => setCategory('ai')}
                className="group card-glow p-8 rounded-2xl cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center gap-6 min-h-[300px] justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground group-hover:text-accent transition-colors"
                  >
                    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M5 6.13a9 9 0 0 1 1.74-2.5 9 9 0 0 1 2.5-1.74" />
                    <path d="M16.5 3.37a9 9 0 0 1 2.5 1.74 9 9 0 0 1 1.74 2.5" />
                    <path d="M19 17.87a9 9 0 0 1-1.74 2.5 9 9 0 0 1-2.5 1.74" />
                    <path d="M7.5 20.63a9 9 0 0 1-2.5-1.74 9 9 0 0 1-1.74-2.5" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Artificial Intelligence</h3>
                  <p className="text-muted-foreground">
                    Machine learning models, neural networks, and AI-powered solutions.
                  </p>
                </div>
                <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-2">
                  View Projects →
                </span>
              </div>

            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => setCategory(null)}
                className="group flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:-translate-x-1 transition-transform"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Categories
              </button>

              {category === 'web' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {projects.map((project, index) => (
                    <article
                      key={project.title}
                      onClick={() => setSelectedProject(project)}
                      className="group card-glow p-0 overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:translate-y-[-4px]"
                      aria-label={`${project.title} - Click to view details`}
                    >
                      {/* Project image */}
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.description}`}
                          loading={index < 3 ? "eager" : "lazy"}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-end p-4" aria-hidden="true">
                          <span className="text-foreground text-sm font-medium">View Details →</span>
                        </div>
                      </div>

                      {/* Project info */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 ease-out">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="tech-tag" role="listitem">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="tech-tag" role="listitem">+{project.tags.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}

                  {/* Find More Card */}
                  <a
                    href="https://github.com/saadnaveeddev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card-glow p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 ease-out min-h-[300px] hover:border-accent/50"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-foreground group-hover:text-accent transition-colors"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        View More Projects
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Explore my open source work and contributions on GitHub.
                      </p>
                    </div>
                    <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Visit GitHub →
                    </span>
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 card-glow rounded-2xl">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                      <path d="M5 6.13a9 9 0 0 1 1.74-2.5 9 9 0 0 1 2.5-1.74" />
                      <path d="M16.5 3.37a9 9 0 0 1 2.5 1.74 9 9 0 0 1 1.74 2.5" />
                      <path d="M19 17.87a9 9 0 0 1-1.74 2.5 9 9 0 0 1-2.5 1.74" />
                      <path d="M7.5 20.63a9 9 0 0 1-2.5-1.74 9 9 0 0 1-1.74-2.5" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md">
                    I'm currently working on some exciting AI projects. Check back soon for updates!
                  </p>
                </div>
              )}
            </div>
          )}
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
