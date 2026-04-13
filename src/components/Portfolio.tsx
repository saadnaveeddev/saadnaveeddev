import { useEffect, useRef, useState } from "react";
import { ExternalLink, Calendar, Award, ArrowUpRight } from "lucide-react";
import ProjectModal, { Project } from "./ProjectModal";

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */

const webProjects: Project[] = [
  {
    title: "Hijazi Tailoring",
    description: "Premium tailoring showcase with booking and measurement features.",
    fullDescription: "Hijazi Tailoring is a sleek, modern web presence built to showcase a premium tailoring shop in Al Khobar. The site highlights core services like bespoke suits, alterations, formal wear, and traditional garments. With a clean, responsive design, visitors can explore galleries, view pricing, book fittings, and access measurement guides. The site emphasizes craftsmanship, punctual delivery, and customer-centric service. Built with modern web tech, it serves both as a branding tool and a lead-generation platform.",
    image: "/images/hijazi-main.png",
    gallery: ["/images/hijazi-main.png", "/images/hijazi-services.png", "/images/hijazi-booking.png"],
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://nextjs-tailor-shop.vercel.app/en",
  },
  {
    title: "PowerLand House",
    description: "Industrial power solutions platform with location services and product catalog.",
    fullDescription: "A modern web platform for PowerLand House, an industrial electrical engineering company. The solution established their digital identity, featuring accurate location pinning to solve accessibility issues and a comprehensive service showcase for transformers, generators, and motors. The platform helped drive a 36% increase in client acquisition.",
    image: "/images/powerland-hero.png",
    gallery: ["/images/powerland-hero.png", "/images/powerland-services.png", "/images/powerland-location.png"],
    tags: ["React", "Vite", "Google Maps API", "Tailwind CSS"],
    liveUrl: "https://powerland-house.lovable.app/",
  },
  {
    title: "PDF-Vision",
    description: "Intelligent PDF workspace for editing, signing, and collaboration.",
    fullDescription: "A professional PDF platform redefining document workflows. PDF-Vision helps teams centralize editing, signing, and collaboration on high-stakes documents. Featuring 20+ purpose-built tools including OCR, Redaction, and AI-powered Chat with PDF. Trusted by over 1M+ active users to process millions of documents with enterprise-grade security.",
    image: "/images/pdf-vision-hero.png",
    gallery: ["/images/pdf-vision-hero.png", "/images/pdf-vision-editor.png", "/images/pdf-vision-tools.png"],
    tags: ["Next.js", "React", "TypeScript", "AI Integration"],
    liveUrl: "https://pdf-vision.com/",
  },
  {
    title: "CAELUM WEAR",
    description: "Premium leather biker jacket e-commerce store with custom sizing.",
    fullDescription: "CAELUM WEAR International is a premium e-commerce brand specializing in handcrafted leather biker jackets. The platform showcases a 'Legendary Style' with a focus on master craftsmanship and 100% genuine leather. Features include a comprehensive collection view (Biker, Classic, Winter), a 'Custom Fit' bespoke ordering system, and a seamless shopping experience for global customers.",
    image: "/images/caelum-hero.png",
    gallery: ["/images/caelum-hero.png", "/images/caelum-collection.png", "/images/caelum-custom.png"],
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
    tags: ["Next.js", "Python", "TensorFlow", "D3.js", "Flask"],
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

const aiProjects: Project[] = [
  {
    title: "ScamShield AI",
    description: "Dual deep-learning platform for AI voice detection and scam text classification.",
    fullDescription: "Built a dual deep-learning platform combining a CNN (MFCC-based) for AI-generated voice detection and a fine-tuned BERT model for scam text classification, achieving 88% voice test accuracy and 99.90% text validation accuracy. Integrated Google STT and Whisper into a unified Streamlit app enabling end-to-end voice-to-verdict scam analysis. The local BERT inference runs 4.5–6× faster than the Gemini API with full offline, privacy-preserving operation.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["Python", "BERT", "CNN", "Streamlit", "PyTorch"],
  },
  {
    title: "AI Voice Cloner",
    description: "Requires only a 10-second audio sample to generate a perfect voice clone.",
    fullDescription: "A sophisticated AI voice cloning application leveraging the VoxCPM model. Requires only a 10-second audio sample of the target voice to create a seamless and perfect clone. Features a custom-designed, premium dark-themed Streamlit interface with glassmorphism effects and fluid animations. Engineered for cross-platform compatibility with robust PyTorch integration and offline inference for maximum speed and data privacy.",
    image: "/images/voice-cloner-thumb.png",
    gallery: [
      "/images/voice-cloner-thumb.png",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=800&fit=crop&auto=format",
    ],
    tags: ["Python", "PyTorch", "Streamlit", "VoxCPM"],
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
    tags: ["Next.js", "Python", "TensorFlow", "D3.js", "Flask"],
  },
];

/* ── Publications data ── */
interface Publication {
  title: string;
  journal: string;
  year: string;
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

/* ═══════════════════════════════════════════════════════════════════
   THEMED SVG ILLUSTRATIONS
   ═══════════════════════════════════════════════════════════════════ */

/** Browser window shape — Web Development */
const WebBrowserIllustration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 100" fill="none" className={className} aria-hidden="true">
    {/* Browser window frame */}
    <rect x="10" y="8" width="100" height="80" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Title bar */}
    <line x1="10" y1="24" x2="110" y2="24" stroke="currentColor" strokeWidth="1.5" />
    {/* Traffic light dots */}
    <circle cx="22" cy="16" r="3" fill="hsl(185 45% 45%)" opacity="0.8" />
    <circle cx="32" cy="16" r="3" fill="currentColor" opacity="0.3" />
    <circle cx="42" cy="16" r="3" fill="currentColor" opacity="0.3" />
    {/* URL bar */}
    <rect x="50" y="12" width="54" height="8" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
    {/* Code lines */}
    <rect x="20" y="32" width="30" height="3" rx="1.5" fill="hsl(185 45% 45%)" opacity="0.6" />
    <rect x="20" y="40" width="50" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
    <rect x="20" y="48" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
    <rect x="20" y="56" width="55" height="3" rx="1.5" fill="hsl(185 45% 45%)" opacity="0.35" />
    <rect x="20" y="64" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
    {/* Sidebar panel */}
    <rect x="78" y="32" width="24" height="38" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" />
    <rect x="82" y="36" width="16" height="2" rx="1" fill="hsl(185 45% 45%)" opacity="0.4" />
    <rect x="82" y="42" width="12" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="82" y="48" width="14" height="2" rx="1" fill="currentColor" opacity="0.15" />
    {/* Cursor blinking line */}
    <line x1="54" y1="39" x2="54" y2="45" stroke="hsl(185 45% 45%)" strokeWidth="1.5" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.2s" repeatCount="indefinite" />
    </line>
  </svg>
);

/** Robot / AI head shape — Artificial Intelligence */
const RobotIllustration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 110" fill="none" className={className} aria-hidden="true">
    {/* Antenna */}
    <line x1="60" y1="2" x2="60" y2="18" stroke="currentColor" strokeWidth="2" />
    <circle cx="60" cy="2" r="4" fill="hsl(185 45% 45%)" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Head */}
    <rect x="28" y="18" width="64" height="52" rx="12" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Eyes */}
    <rect x="40" y="34" width="14" height="14" rx="4" stroke="hsl(185 45% 45%)" strokeWidth="2" fill="hsl(185 45% 45% / 0.15)" />
    <rect x="66" y="34" width="14" height="14" rx="4" stroke="hsl(185 45% 45%)" strokeWidth="2" fill="hsl(185 45% 45% / 0.15)" />
    {/* Eye pupils / scan line */}
    <rect x="44" y="39" width="6" height="4" rx="1" fill="hsl(185 45% 45%)" opacity="0.9">
      <animate attributeName="x" values="44;46;44" dur="3s" repeatCount="indefinite" />
    </rect>
    <rect x="70" y="39" width="6" height="4" rx="1" fill="hsl(185 45% 45%)" opacity="0.9">
      <animate attributeName="x" values="70;72;70" dur="3s" repeatCount="indefinite" />
    </rect>
    {/* Mouth / speaker grille */}
    <rect x="44" y="56" width="32" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none" />
    <line x1="50" y1="57" x2="50" y2="61" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="56" y1="57" x2="56" y2="61" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="62" y1="57" x2="62" y2="61" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="68" y1="57" x2="68" y2="61" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Ears */}
    <rect x="18" y="32" width="10" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none" />
    <rect x="92" y="32" width="10" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none" />
    {/* Neck */}
    <rect x="50" y="70" width="20" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="none" />
    {/* Body hint */}
    <rect x="34" y="78" width="52" height="24" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Chest light */}
    <circle cx="60" cy="90" r="5" fill="hsl(185 45% 45%)" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="60" cy="90" r="2.5" fill="hsl(185 45% 45%)" opacity="0.7" />
    {/* Circuit patterns on body */}
    <line x1="42" y1="86" x2="52" y2="86" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.25" />
    <line x1="68" y1="86" x2="78" y2="86" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.25" />
    <line x1="42" y1="95" x2="52" y2="95" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.25" />
    <line x1="68" y1="95" x2="78" y2="95" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.25" />
  </svg>
);

/** Research paper / open book shape — Publications */
const ResearchPaperIllustration = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 110" fill="none" className={className} aria-hidden="true">
    {/* Left page */}
    <path d="M58 12 L58 95 Q40 88 14 92 L14 14 Q40 10 58 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Right page */}
    <path d="M62 12 L62 95 Q80 88 106 92 L106 14 Q80 10 62 12Z" stroke="currentColor" strokeWidth="2" fill="none" />
    {/* Spine */}
    <path d="M58 12 Q60 10 62 12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M58 95 Q60 97 62 95" stroke="currentColor" strokeWidth="1.5" />
    {/* Left page text lines */}
    <rect x="22" y="24" width="28" height="2.5" rx="1" fill="hsl(185 45% 45%)" opacity="0.5" />
    <rect x="22" y="32" width="24" height="2" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="22" y="38" width="28" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="22" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="22" y="50" width="26" height="2" rx="1" fill="currentColor" opacity="0.15" />
    {/* Left page chart/figure */}
    <rect x="22" y="58" width="28" height="18" rx="3" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.3" fill="hsl(185 45% 45% / 0.05)" />
    <polyline points="25,72 30,66 35,68 40,62 45,65 48,60" stroke="hsl(185 45% 45%)" strokeWidth="1.5" opacity="0.6" fill="none" />
    <rect x="22" y="80" width="28" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="22" y="85" width="22" height="2" rx="1" fill="currentColor" opacity="0.12" />
    {/* Right page text lines */}
    <rect x="70" y="24" width="28" height="2.5" rx="1" fill="hsl(185 45% 45%)" opacity="0.5" />
    <rect x="70" y="32" width="24" height="2" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="70" y="38" width="28" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="70" y="44" width="20" height="2" rx="1" fill="currentColor" opacity="0.2" />
    <rect x="70" y="50" width="26" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="70" y="56" width="22" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="70" y="62" width="28" height="2" rx="1" fill="currentColor" opacity="0.12" />
    <rect x="70" y="68" width="18" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="70" y="74" width="24" height="2" rx="1" fill="currentColor" opacity="0.12" />
    <rect x="70" y="80" width="28" height="2" rx="1" fill="currentColor" opacity="0.15" />
    <rect x="70" y="86" width="20" height="2" rx="1" fill="currentColor" opacity="0.12" />
    {/* Magnifying glass overlay */}
    <circle cx="88" cy="96" r="10" stroke="hsl(185 45% 45%)" strokeWidth="2" fill="hsl(185 45% 45% / 0.08)">
      <animate attributeName="r" values="10;11;10" dur="3s" repeatCount="indefinite" />
    </circle>
    <line x1="95" y1="103" x2="104" y2="110" stroke="hsl(185 45% 45%)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   PUBLICATION CARD  (rendered inside Portfolio when category=publications)
   ═══════════════════════════════════════════════════════════════════ */

const HighlightedAbstract = ({ text, highlight }: { text: string; highlight: string }) => {
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-accent font-semibold">{text.slice(idx, idx + highlight.length)}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
};

const PublicationCard = ({ pub, index }: { pub: Publication; index: number }) => (
  <article
    className="group relative rounded-2xl border border-border/20 transition-all duration-700 ease-out overflow-hidden hover:-translate-y-2 hover:border-accent/20 flex flex-col"
    style={{
      background: "linear-gradient(145deg, hsl(0 0% 9% / 0.7) 0%, hsl(0 0% 7% / 0.8) 100%)",
      backdropFilter: "blur(16px)",
      boxShadow: "0 4px 20px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.02)",
    }}
  >
    {/* Hover glow */}
    <div
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ boxShadow: "0 0 40px hsl(185 45% 45% / 0.08), inset 0 0 40px hsl(185 45% 45% / 0.03)" }}
      aria-hidden="true"
    />
    {/* Gradient orb */}
    <div
      className={`absolute -bottom-14 -right-14 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br ${pub.gradient}`}
      aria-hidden="true"
    />
    {/* Accent strip */}
    <div className="h-1 w-full bg-gradient-to-r from-accent/60 via-accent/30 to-transparent" aria-hidden="true" />

    <div className="relative p-7 md:p-8 flex flex-col flex-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="icon-box shrink-0 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M8 7h6" />
            <path d="M8 11h8" />
          </svg>
        </div>
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

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-4 group-hover:text-accent/90 transition-colors duration-300">
        {pub.title}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-accent border border-accent/20"
          style={{ background: "linear-gradient(135deg, hsl(185 45% 45% / 0.08) 0%, hsl(185 45% 45% / 0.02) 100%)" }}
        >
          <Award className="w-3.5 h-3.5" aria-hidden="true" />
          {pub.journal}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground border border-border/30 bg-secondary/40">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          {pub.year}
        </span>
      </div>

      {/* Abstract */}
      <p className="text-foreground/80 leading-relaxed font-light text-[14px] md:text-[15px] mb-6 flex-1">
        "<HighlightedAbstract text={pub.abstract} highlight={pub.highlight} />"
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5" role="list" aria-label="Keywords">
        {pub.tags.map((tag) => (
          <span key={tag} className="tech-tag" role="listitem">{tag}</span>
        ))}
      </div>

      {/* CTA */}
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

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [category, setCategory] = useState<'web' | 'ai' | 'publications' | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const GithubCard = () => (
    <a href="https://github.com/saadnaveeddev" target="_blank" rel="noopener noreferrer" className="group card-glow p-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 ease-out min-h-[300px] hover:border-accent/50">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-foreground group-hover:text-accent transition-colors">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">View More Projects</h3>
        <p className="text-muted-foreground text-sm">Explore my open source work and contributions on GitHub.</p>
      </div>
      <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Visit GitHub →</span>
    </a>
  );

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <article onClick={() => setSelectedProject(project)} className="group card-glow p-0 overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:translate-y-[-4px]" aria-label={`${project.title} - Click to view details`}>
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={project.image.startsWith('http') ? project.image : `https://www.saadnaveeddev.com${project.image}`} alt={`Saad Naveed Full Stack Developer AI Engineer project: ${project.title}`} title={`Saad Naveed Portfolio Project - ${project.title}`} loading={index < 3 ? "eager" : "lazy"} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-end p-4" aria-hidden="true">
          <span className="text-foreground text-sm font-medium">View Details →</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 ease-out">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {project.tags.slice(0, 3).map((tag) => (<span key={tag} className="tech-tag" role="listitem">{tag}</span>))}
          {project.tags.length > 3 && (<span className="tech-tag" role="listitem">+{project.tags.length - 3}</span>)}
        </div>
      </div>
    </article>
  );

  return (
    <>
      <section id="portfolio" ref={sectionRef} aria-labelledby="portfolio-heading">
        <div className="section-container">
          <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="section-title">Selected Work</span>
            <h2 id="portfolio-heading" className="section-heading">
              Work That
              <br />
              <span className="text-accent">Makes Impact</span>
            </h2>
          </div>

          {!category ? (
            /* ─── Category Selection — 3 themed tiles ─── */
            <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

              {/* ── Web Development — Browser shape ── */}
              <div
                onClick={() => setCategory('web')}
                className="group card-glow p-8 rounded-2xl cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center gap-5 min-h-[320px] justify-center relative overflow-hidden"
              >
                {/* Gradient orb on hover */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-25 blur-2xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-cyan-500/30 to-teal-500/30" aria-hidden="true" />
                <div className="w-28 h-24 text-foreground group-hover:text-accent transition-all duration-500 group-hover:scale-110 relative">
                  <WebBrowserIllustration className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Web Development</h3>
                  <p className="text-muted-foreground text-sm">
                    Modern web applications built with React, Next.js, and cutting-edge technologies.
                  </p>
                </div>
                <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-auto">
                  View Projects →
                </span>
              </div>

              {/* ── AI — Robot shape ── */}
              <div
                onClick={() => setCategory('ai')}
                className="group card-glow p-8 rounded-2xl cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center gap-5 min-h-[320px] justify-center relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-25 blur-2xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-violet-500/30 to-purple-500/30" aria-hidden="true" />
                <div className="w-24 h-24 text-foreground group-hover:text-accent transition-all duration-500 group-hover:scale-110 relative">
                  <RobotIllustration className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Artificial Intelligence</h3>
                  <p className="text-muted-foreground text-sm">
                    Machine learning models, neural networks, and AI-powered solutions.
                  </p>
                </div>
                <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-auto">
                  View Projects →
                </span>
              </div>

              {/* ── Publications — Paper / book shape ── */}
              <div
                onClick={() => setCategory('publications')}
                className="group card-glow p-8 rounded-2xl cursor-pointer hover:border-accent/50 transition-all duration-300 flex flex-col items-center text-center gap-5 min-h-[320px] justify-center relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-25 blur-2xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-amber-500/30 to-orange-500/30" aria-hidden="true" />
                <div className="w-24 h-24 text-foreground group-hover:text-accent transition-all duration-500 group-hover:scale-110 relative">
                  <ResearchPaperIllustration className="w-full h-full" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Research & Publications</h3>
                  <p className="text-muted-foreground text-sm">
                    Academic papers in data science, ML, and applied AI research.
                  </p>
                </div>
                <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-2 mt-auto">
                  View Papers →
                </span>
              </div>

            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button onClick={() => setCategory(null)} className="group flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                  <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                </svg>
                Back to Categories
              </button>

              {category === 'web' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {webProjects.map((project, index) => (<ProjectCard key={project.title} project={project} index={index} />))}
                  <GithubCard />
                </div>
              ) : category === 'ai' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {aiProjects.map((project, index) => (<ProjectCard key={project.title} project={project} index={index} />))}
                  <GithubCard />
                </div>
              ) : (
                /* ── Publications sub-view ── */
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                  {publications.map((pub, index) => (
                    <PublicationCard key={pub.title} pub={pub} index={index} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ProjectModal project={selectedProject} isOpen={selectedProject !== null} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default Portfolio;
