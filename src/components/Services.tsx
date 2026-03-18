import { useEffect, useRef, useState, useCallback } from "react";
import { Code2, Monitor, Server, Cpu, Network, Zap, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = services.length;

  // IntersectionObserver for section visibility (codebase pattern)
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

  const goNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [total, isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [total, isAnimating]);

  // Arrow key navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, goNext, goPrev]);

  // Touch swipe support
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };

    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Mouse wheel / trackpad scroll navigation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      // Debounce to prevent rapid-fire
      if (wheelTimeout) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        e.preventDefault();
        if (delta > 0) goNext();
        else goPrev();

        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 500);
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [goNext, goPrev]);

  /**
   * Compute the position offset of a card relative to the active center.
   * Returns a value in [-2, -1, 0, 1, 2] for the 5 visible slots.
   * Cards further away are hidden.
   */
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    // Wrap around for circular navigation
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  /**
   * Get 3D transform styles based on offset from center.
   * Center (0): full size, no rotation.
   * ±1: slightly back, rotated, scaled down.
   * ±2: further back, more rotated, more scaled & faded.
   */
  const getCardStyle = (offset: number): React.CSSProperties => {
    const absOffset = Math.abs(offset);

    if (absOffset > 2) {
      return {
        opacity: 0,
        transform: `translateX(${offset > 0 ? 100 : -100}%) scale(0.5)`,
        zIndex: 0,
        pointerEvents: "none",
      };
    }

    // Desktop values
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const translateXBase = isMobile ? 70 : 60;
    const rotateY = isMobile ? 35 : 45;
    const scaleStep = isMobile ? 0.15 : 0.12;

    const translateX = offset * translateXBase;
    const translateZ = -absOffset * (isMobile ? 120 : 150);
    const rotate = -offset * rotateY;
    const scale = 1 - absOffset * scaleStep;
    const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.7 : 0.4;

    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotate}deg) scale(${scale})`,
      zIndex: 10 - absOffset * 3,
      opacity,
      pointerEvents: absOffset === 0 ? "auto" : "none",
      filter: absOffset > 0 ? `blur(${absOffset * 1.5}px)` : "none",
    };
  };

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

        {/* 3D Carousel */}
        <div className="relative" role="region" aria-label="Services carousel" aria-roledescription="carousel">
          {/* Perspective wrapper */}
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
              height: typeof window !== "undefined" && window.innerWidth < 768 ? "340px" : "380px",
            }}
          >
            {/* Navigation Arrows — inside carousel, vertically centered */}
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-lg"
              aria-label="Previous service"
              id="services-prev-btn"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-lg"
              aria-label="Next service"
              id="services-next-btn"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Cards */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              {services.map((service, index) => {
                const offset = getOffset(index);
                const cardStyle = getCardStyle(offset);

                return (
                  <article
                    key={service.title}
                    className={`absolute w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] card-glow group flex flex-col justify-center items-center text-center transition-all duration-500 ease-out ${
                      isVisible
                        ? ""
                        : "!opacity-0 !translate-y-12"
                    }`}
                    style={{
                      ...cardStyle,
                      transitionProperty: "transform, opacity, filter",
                      willChange: "transform, opacity",
                    }}
                    aria-label={service.title}
                    aria-hidden={Math.abs(offset) > 0}
                  >
                    <div className="icon-box mb-5 transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden="true">
                      <service.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 px-2">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-4 md:px-6">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Page Dots */}
          <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Service pages">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(i);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-8 h-2 bg-accent"
                    : "w-2 h-2 bg-border hover:bg-muted-foreground"
                }`}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to ${services[i].title}`}
                id={`services-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
