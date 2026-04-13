import { useEffect, useRef, useState } from "react";
import { ExternalLink, Calendar, BookOpen, Award, ArrowUpRight } from "lucide-react";

interface Publication {
  title: string;
  journal: string;
  year: string;
  doi?: string;
  link: string;
  abstract: string;
  tags: string[];
  highlight: string;
  gradient: string;
}

const publications: Publication[] = [
  {
    title:
      "Enhancing Automotive Sales Performance and Customer Satisfaction Using Data Analytics and Machine Learning",
    journal: "Zenodo",
    year: "2025",
    link: "https://zenodo.org/records/19547147",
    abstract:
      "A systematic, data-driven framework for improving sales performance and customer satisfaction in automotive dealerships through exploratory data analysis, income-based customer segmentation, and predictive ML modelling. Random Forest achieved the best predictive accuracy across all baselines.",
    tags: ["Machine Learning", "Random Forest", "Python", "scikit-learn", "EDA"],
    highlight: "Random Forest achieved the best predictive accuracy",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  // ── Add future publications here ──
  // {
  //   title: "Your Next Paper Title",
  //   journal: "Conference / Journal Name",
  //   year: "2026",
  //   link: "https://...",
  //   abstract: "Short abstract...",
  //   tags: ["Tag1", "Tag2"],
  //   highlight: "key phrase to accent",
  //   gradient: "from-violet-500/20 to-purple-500/20",
  // },
];

/* ── Accent the key phrase inside abstract text ── */
const HighlightedAbstract = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
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

/* ── Publication Card ── */
const PublicationCard = ({
  pub,
  index,
  isVisible,
}: {
  pub: Publication;
  index: number;
  isVisible: boolean;
}) => (
  <article
    className={`group relative rounded-2xl border border-border/20 transition-all duration-700 ease-out overflow-hidden hover:-translate-y-2 hover:border-accent/20 flex flex-col ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
    }`}
    style={{
      transitionDelay: `${index * 180}ms`,
      background:
        "linear-gradient(145deg, hsl(0 0% 9% / 0.7) 0%, hsl(0 0% 7% / 0.8) 100%)",
      backdropFilter: "blur(16px)",
      boxShadow:
        "0 4px 20px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.02)",
    }}
  >
    {/* ── Hover glow border ── */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        boxShadow:
          "0 0 40px hsl(185 45% 45% / 0.08), inset 0 0 40px hsl(185 45% 45% / 0.03)",
      }}
      aria-hidden="true"
    />

    {/* ── Gradient orb (on hover) ── */}
    <div
      className={`absolute -bottom-14 -right-14 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br ${pub.gradient}`}
      aria-hidden="true"
    />

    {/* ── Top accent strip ── */}
    <div
      className="h-1 w-full bg-gradient-to-r from-accent/60 via-accent/30 to-transparent"
      aria-hidden="true"
    />

    <div className="relative p-7 md:p-8 flex flex-col flex-1">
      {/* ── Header row ── */}
      <div className="flex items-start justify-between gap-4 mb-5">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
          <BookOpen className="w-5 h-5 text-accent" strokeWidth={1.5} />
        </div>

        {/* External link */}
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-accent/20 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shrink-0 group-hover:scale-105"
          aria-label={`Read paper: ${pub.title}`}
          id={`pub-link-${index}`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* ── Title ── */}
      <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-4 group-hover:text-accent/90 transition-colors duration-300">
        {pub.title}
      </h3>

      {/* ── Meta badges ── */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-accent border border-accent/20"
          style={{
            background:
              "linear-gradient(135deg, hsl(185 45% 45% / 0.08) 0%, hsl(185 45% 45% / 0.02) 100%)",
          }}
        >
          <Award className="w-3.5 h-3.5" aria-hidden="true" />
          {pub.journal}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground border border-border/30 bg-secondary/40">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          {pub.year}
        </span>
      </div>

      {/* ── Abstract ── */}
      <p className="text-foreground/80 leading-relaxed font-light text-[14px] md:text-[15px] mb-6 flex-1">
        "<HighlightedAbstract text={pub.abstract} highlight={pub.highlight} />"
      </p>

      {/* ── Tech tags ── */}
      <div className="flex flex-wrap gap-2 mb-5" role="list" aria-label="Keywords">
        {pub.tags.map((tag) => (
          <span key={tag} className="tech-tag" role="listitem">
            {tag}
          </span>
        ))}
      </div>

      {/* ── Read paper CTA ── */}
      <a
        href={pub.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:translate-x-1 transition-transform duration-300 mt-auto w-fit"
      >
        Read Full Paper
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  </article>
);

/* ── Main Section ── */
const Publications = () => {
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
    <section
      id="publications"
      ref={sectionRef}
      aria-labelledby="publications-heading"
    >
      <div className="section-container">
        {/* ── Section Header ── */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-title">Research & Publications</span>
          <h2 id="publications-heading" className="section-heading">
            Academic
            <br />
            <span className="text-accent">Contributions</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Peer-reviewed work in data science, ML, and applied AI.
          </p>
        </div>

        {/* ── Publication Cards Grid ── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {publications.map((pub, index) => (
            <PublicationCard
              key={pub.title}
              pub={pub}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
