import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "Saad delivered exactly what we needed—a fast, scalable platform that our users love. His attention to detail and technical expertise exceeded our expectations.",
    name: "Michael Chen",
    role: "Startup Founder",
    rating: 5,
  },
  {
    text: "Working with Saad was a game-changer for our business. He transformed our outdated system into a modern, efficient solution that saves us hours every day.",
    name: "Sarah Williams",
    role: "E-Commerce Director",
    rating: 5,
  },
  {
    text: "Exceptional problem-solver with deep full-stack knowledge. Saad took our complex requirements and built a clean, maintainable codebase that just works.",
    name: "David Park",
    role: "Product Manager",
    rating: 5,
  },
  {
    text: "Reliable, communicative, and technically brilliant. Saad's AI integration work helped us automate processes we thought would take months to figure out.",
    name: "Emma Rodriguez",
    role: "Tech Lead",
    rating: 5,
  },
  {
    text: "The best developer I've worked with on Upwork. Professional communication, on-time delivery, and code quality that speaks for itself.",
    name: "James Mitchell",
    role: "Agency Owner",
    rating: 5,
  },
  {
    text: "Saad has a rare combination of technical skill and business understanding. He doesn't just code—he builds solutions that drive real value.",
    name: "Lisa Thompson",
    role: "SaaS Founder",
    rating: 5,
  },
];

const Testimonials = () => {
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
    <section id="testimonials" ref={sectionRef} className="bg-card">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-title">Testimonials</span>
          <h2 className="section-heading">
            What Clients
            <br />
            <span className="text-accent">Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group relative bg-background rounded-xl p-6 border border-border/50 transition-all duration-500 hover:border-accent/30 hover:-translate-y-1 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                boxShadow: 'var(--shadow-card)'
              }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-accent/30 mb-4" strokeWidth={1} />
              
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-accent fill-accent" 
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                "{testimonial.text}"
              </p>

              {/* Client info */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-medium text-sm border border-border/50">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                   style={{ boxShadow: 'var(--glow-accent)' }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
