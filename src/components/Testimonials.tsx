import { useEffect, useRef, useState, useCallback } from "react";
import { BadgeCheck, ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  text: string;
  highlight: string;
  name: string;
  role: string;
  result: string;
  resultLabel: string;
  gradient: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    text: "Saad delivered exactly what we needed—a fast, scalable platform that our users love. His attention to detail and technical expertise exceeded our expectations.",
    highlight: "fast, scalable platform",
    name: "Aleksandar Stojanovic",
    role: "Startup Founder",
    result: "3× faster",
    resultLabel: "Platform Launch",
    gradient: "from-teal-500/20 to-cyan-500/20",
    rating: 5,
  },
  {
    text: "Working with Saad was a game-changer for our business. He transformed our outdated system into a modern, efficient solution that saves us hours every day.",
    highlight: "game-changer for our business",
    name: "Sarah Williams",
    role: "E-Commerce Director",
    result: "60% faster",
    resultLabel: "Processing Time",
    gradient: "from-violet-500/20 to-purple-500/20",
    rating: 5,
  },
  {
    text: "Exceptional problem-solver with deep full-stack knowledge. Saad took our complex requirements and built a clean, maintainable codebase that just works.",
    highlight: "clean, maintainable codebase",
    name: "Stephane Happi",
    role: "CEO at Code-Vision",
    result: "40% fewer",
    resultLabel: "Production Bugs",
    gradient: "from-amber-500/20 to-orange-500/20",
    rating: 5,
  },
  {
    text: "Reliable, communicative, and technically brilliant. Saad's AI integration work helped us automate processes we thought would take months to figure out.",
    highlight: "AI integration work",
    name: "Emma Rodriguez",
    role: "Tech Lead",
    result: "80% automated",
    resultLabel: "Manual Processes",
    gradient: "from-rose-500/20 to-pink-500/20",
    rating: 5,
  },
  {
    text: "The best developer I've worked with on Upwork. Professional communication, on-time delivery, and code quality that speaks for itself.",
    highlight: "best developer I've worked with",
    name: "Memoona Jabbar",
    role: "Agency Owner",
    result: "100% on-time",
    resultLabel: "Sprint Delivery",
    gradient: "from-emerald-500/20 to-green-500/20",
    rating: 5,
  },
  {
    text: "Saad has a rare combination of technical skill and business understanding. He doesn't just code—he builds solutions that drive real value.",
    highlight: "drive real value",
    name: "Nick Carter",
    role: "SaaS Founder",
    result: "2× revenue",
    resultLabel: "Growth in 6 Months",
    gradient: "from-blue-500/20 to-indigo-500/20",
    rating: 5,
  },
];

/* Gradient avatar using initials — each client gets a unique color scheme */
const avatarGradients = [
  "from-teal-400 to-cyan-500",
  "from-violet-400 to-purple-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-emerald-400 to-green-500",
  "from-blue-400 to-indigo-500",
];

const GradientAvatar = ({ name, index }: { name: string; index: number }) => {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div
      className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} flex items-center justify-center text-white font-bold text-sm tracking-wide shadow-lg`}
    >
      {initials}
    </div>
  );
};

/* Highlight the key phrase in a testimonial */
const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + highlight.length);
  const after = text.slice(idx + highlight.length);

  return (
    <>
      {before}
      <span className="text-accent font-semibold">{match}</span>
      {after}
    </>
  );
};

/* ─── Testimonial Card (uniform for all) ─── */
const TestimonialCard = ({
  testimonial,
  index,
  isVisible,
  rotation,
}: {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
  rotation: number;
}) => (
  <article
    className={`group relative rounded-2xl p-7 md:p-8 border border-border/20 transition-all duration-700 ease-out overflow-hidden hover:-translate-y-2 hover:border-accent/20 h-full flex flex-col ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    }`}
    style={{
      transitionDelay: `${index * 150}ms`,
      transform: isVisible ? `rotate(${rotation}deg)` : undefined,
      background:
        "linear-gradient(145deg, hsl(0 0% 9% / 0.7) 0%, hsl(0 0% 7% / 0.8) 100%)",
      backdropFilter: "blur(16px)",
      boxShadow:
        "0 4px 20px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.02)",
    }}
  >
    {/* Hover glow */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        boxShadow: "0 0 40px hsl(185 45% 45% / 0.08), inset 0 0 40px hsl(185 45% 45% / 0.03)",
      }}
      aria-hidden="true"
    />

    {/* Gradient orb on hover */}
    <div
      className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 blur-2xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br ${testimonial.gradient}`}
      aria-hidden="true"
    />

    {/* Quote icon */}
    <div className="relative mb-5 flex-1">
      <Quote
        className="absolute -top-1 -left-1 w-8 h-8 text-accent/15"
        strokeWidth={1}
        aria-hidden="true"
      />
      <p className="text-foreground/85 leading-relaxed font-light pl-6 text-[15px] md:text-base">
        "<HighlightedText text={testimonial.text} highlight={testimonial.highlight} />"
      </p>
    </div>

    {/* Result metric */}
    <div
      className="flex items-center gap-2.5 mb-6 px-4 py-2.5 rounded-lg border border-accent/15 w-fit"
      style={{
        background:
          "linear-gradient(135deg, hsl(185 45% 45% / 0.06) 0%, hsl(185 45% 45% / 0.02) 100%)",
      }}
    >
      <ArrowUpRight className="w-4 h-4 text-accent" aria-hidden="true" />
      <span className="text-sm font-bold text-accent">{testimonial.result}</span>
      <span className="text-xs text-muted-foreground">{testimonial.resultLabel}</span>
    </div>

    {/* Client info */}
    <div className="flex items-center gap-3">
      <GradientAvatar name={testimonial.name} index={index} />
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground text-sm">{testimonial.name}</span>
          <BadgeCheck className="w-3.5 h-3.5 text-accent" aria-label="Verified client" />
        </div>
        <span className="text-xs text-muted-foreground">{testimonial.role}</span>
      </div>
    </div>
  </article>
);

/* ─── Main Testimonials Section ─── */
const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -400 : 400;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  // Slight rotations for asymmetric, organic feel
  const rotations = [0.4, -0.3, 0.5, -0.4, 0.3, -0.5];

  return (
    <>
      <section id="testimonials" ref={sectionRef} aria-labelledby="testimonials-heading">
        <div className="section-container">
          {/* Header */}
          <div
            className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-title">Testimonials</span>
            <h2 id="testimonials-heading" className="section-heading">
              Real Results,
              <br />
              <span className="text-accent">Real Clients</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Trusted by founders, CTOs, and teams worldwide.
            </p>
          </div>

          {/* ── Horizontal Scroll Carousel ── */}
          <div className="relative">
            {/* Scroll fade edges */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none transition-opacity duration-300 ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(to right, hsl(0 0% 6%) 0%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none transition-opacity duration-300 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(to left, hsl(0 0% 6%) 0%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory hide-scrollbar"
              role="list"
              aria-label="Client testimonials"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="flex-shrink-0 w-[320px] md:w-[380px] snap-center"
                  role="listitem"
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                    isVisible={isVisible}
                    rotation={rotations[index % rotations.length]}
                  />
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => scrollBy("left")}
                disabled={!canScrollLeft}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? "border-border/50 bg-card text-muted-foreground hover:border-accent/50 hover:text-accent hover:shadow-lg cursor-pointer"
                    : "border-border/20 bg-card/50 text-muted-foreground/30 cursor-not-allowed"
                }`}
                aria-label="Scroll testimonials left"
                id="testimonials-prev-btn"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <button
                onClick={() => scrollBy("right")}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? "border-border/50 bg-card text-muted-foreground hover:border-accent/50 hover:text-accent hover:shadow-lg cursor-pointer"
                    : "border-border/20 bg-card/50 text-muted-foreground/30 cursor-not-allowed"
                }`}
                aria-label="Scroll testimonials right"
                id="testimonials-next-btn"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for Aggregate Rating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Saad Naveed Development Services",
            url: "https://www.saadnaveeddev.com/",
            image: "https://www.saadnaveeddev.com/images/saad-naveed.jpg",
            description: "Freelance Full Stack Developer (MERN & AI)",
            priceRange: "$$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              bestRating: "5",
              ratingCount: testimonials.length,
            },
          }),
        }}
      />
    </>
  );
};

export default Testimonials;
