import { useEffect, useRef, useState, useCallback } from "react";
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
    title: "Enhancing Automotive Sales Performance and Customer Satisfaction Using Data Analytics and Machine Learning",
    journal: "Zenodo",
    year: "2025",
    link: "https://zenodo.org/records/19547147",
    abstract: "A systematic, data-driven framework for improving sales performance and customer satisfaction in automotive dealerships through exploratory data analysis, income-based customer segmentation, and predictive ML modelling. Random Forest achieved the best predictive accuracy across all baselines.",
    tags: ["Machine Learning", "Random Forest", "Python", "scikit-learn", "EDA"],
    highlight: "Random Forest achieved the best predictive accuracy",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  // ── Add future publications here ──
];

/* ═══════════════════════════════════════════════════════════════════
   PARTICLE NETWORK BACKGROUND  (canvas-based, section-local)
   ═══════════════════════════════════════════════════════════════════ */

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.min(Math.floor((w * h) / 12000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 195, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 195, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
};

/* ═══════════════════════════════════════════════════════════════════
   FUTURISTIC 3D FLOATING OBJECTS (SVG illustrations)
   ═══════════════════════════════════════════════════════════════════ */

/** Digital Globe / Sphere — Web Development */
const GlobeIllustration = () => (
  <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(185 45% 45%)" stopOpacity="0.15" />
        <stop offset="100%" stopColor="hsl(185 45% 45%)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="globeStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(185 60% 55%)" />
        <stop offset="100%" stopColor="hsl(200 50% 40%)" />
      </linearGradient>
    </defs>
    {/* Outer glow */}
    <circle cx="80" cy="80" r="72" fill="url(#globeGlow)" />
    {/* Main sphere outline */}
    <circle cx="80" cy="80" r="52" stroke="url(#globeStroke)" strokeWidth="1.5" opacity="0.6" />
    {/* Latitude lines */}
    <ellipse cx="80" cy="80" rx="52" ry="18" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.3" />
    <ellipse cx="80" cy="80" rx="52" ry="36" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" />
    {/* Longitude lines */}
    <ellipse cx="80" cy="80" rx="18" ry="52" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.3" />
    <ellipse cx="80" cy="80" rx="36" ry="52" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" />
    {/* Network nodes */}
    {[[55,50],[105,60],[70,105],[95,42],[62,70],[100,90],[80,35],[45,85]].map(([x,y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="hsl(185 55% 55%)" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur={`${2+i*0.4}s`} repeatCount="indefinite" />
        </circle>
        <circle cx={x} cy={y} r="6" stroke="hsl(185 45% 45%)" strokeWidth="0.5" opacity="0.3" fill="none">
          <animate attributeName="r" values="6;9;6" dur={`${2+i*0.4}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2+i*0.4}s`} repeatCount="indefinite" />
        </circle>
      </g>
    ))}
    {/* Connection lines between nodes */}
    <line x1="55" y1="50" x2="95" y2="42" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.25" />
    <line x1="105" y1="60" x2="100" y2="90" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.25" />
    <line x1="62" y1="70" x2="70" y2="105" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.25" />
    <line x1="80" y1="35" x2="105" y2="60" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.2" />
    <line x1="45" y1="85" x2="62" y2="70" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.2" />
    <line x1="55" y1="50" x2="62" y2="70" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.2" />
    {/* Orbiting ring */}
    <ellipse cx="80" cy="80" rx="60" ry="14" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 6" transform="rotate(-20 80 80)">
      <animateTransform attributeName="transform" type="rotate" from="-20 80 80" to="340 80 80" dur="40s" repeatCount="indefinite" />
    </ellipse>
    {/* Orbiting dot */}
    <circle r="2.5" fill="hsl(185 55% 60%)" opacity="0.9">
      <animateMotion dur="8s" repeatCount="indefinite">
        <mpath xlinkHref="#orbitPath" />
      </animateMotion>
    </circle>
    <ellipse id="orbitPath" cx="80" cy="80" rx="58" ry="20" fill="none" transform="rotate(-20 80 80)" />
  </svg>
);

/** Robot Head — Artificial Intelligence */
const RobotHeadIllustration = () => (
  <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id="robotGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="hsl(185 45% 45%)" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(185 45% 45%)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="visorGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(185 60% 50%)" stopOpacity="0.3" />
        <stop offset="50%" stopColor="hsl(185 60% 60%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(185 60% 50%)" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Glow aura */}
    <circle cx="80" cy="70" r="70" fill="url(#robotGlow)" />
    {/* Antenna */}
    <line x1="80" y1="8" x2="80" y2="28" stroke="hsl(185 45% 50%)" strokeWidth="1.5" opacity="0.6" />
    <circle cx="80" cy="6" r="4" fill="hsl(185 55% 55%)" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="80" cy="6" r="7" stroke="hsl(185 45% 45%)" strokeWidth="0.5" opacity="0.3" fill="none">
      <animate attributeName="r" values="7;11;7" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Head frame */}
    <rect x="38" y="28" width="84" height="68" rx="16" stroke="hsl(185 45% 50%)" strokeWidth="1.5" opacity="0.5" fill="hsl(185 45% 45% / 0.03)" />
    {/* Inner head panel */}
    <rect x="46" y="36" width="68" height="52" rx="10" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.2" fill="none" />
    {/* Visor / eye band */}
    <rect x="48" y="48" width="64" height="20" rx="10" fill="url(#visorGrad)" stroke="hsl(185 55% 55%)" strokeWidth="1" opacity="0.7" />
    {/* Left eye */}
    <circle cx="64" cy="58" r="6" fill="hsl(185 60% 55%)" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="64" cy="58" r="3" fill="hsl(185 80% 70%)" />
    {/* Right eye */}
    <circle cx="96" cy="58" r="6" fill="hsl(185 60% 55%)" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" begin="0.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="96" cy="58" r="3" fill="hsl(185 80% 70%)" />
    {/* Scan line across visor */}
    <rect x="50" y="56" width="12" height="1.5" rx="0.75" fill="hsl(185 70% 65%)" opacity="0.5">
      <animate attributeName="x" values="50;100;50" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
    </rect>
    {/* Mouth / speaker */}
    <rect x="62" y="76" width="36" height="8" rx="4" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.3" fill="none" />
    <line x1="70" y1="77" x2="70" y2="83" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" />
    <line x1="76" y1="77" x2="76" y2="83" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" />
    <line x1="82" y1="77" x2="82" y2="83" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" />
    <line x1="88" y1="77" x2="88" y2="83" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" />
    {/* Ear panels */}
    <rect x="26" y="46" width="12" height="24" rx="5" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.3" fill="hsl(185 45% 45% / 0.05)" />
    <rect x="122" y="46" width="12" height="24" rx="5" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.3" fill="hsl(185 45% 45% / 0.05)" />
    {/* Neck connector */}
    <rect x="64" y="96" width="32" height="12" rx="4" stroke="hsl(185 45% 45%)" strokeWidth="1" opacity="0.25" fill="none" />
    {/* Shoulders / body hint */}
    <path d="M50 108 Q50 120 60 124 L100 124 Q110 120 110 108" stroke="hsl(185 45% 45%)" strokeWidth="1.2" opacity="0.2" fill="none" />
    {/* Chest panel glow */}
    <circle cx="80" cy="118" r="4" fill="hsl(185 55% 55%)" opacity="0.4">
      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
    </circle>
    {/* Holographic lines around head */}
    <circle cx="80" cy="62" r="48" stroke="hsl(185 45% 45%)" strokeWidth="0.4" opacity="0.1" strokeDasharray="3 8" fill="none">
      <animateTransform attributeName="transform" type="rotate" from="0 80 62" to="360 80 62" dur="30s" repeatCount="indefinite" />
    </circle>
  </svg>
);

/** Open Book with Digital Pages — Research */
const DigitalBookIllustration = () => (
  <svg viewBox="0 0 160 140" fill="none" className="w-full h-full" aria-hidden="true">
    <defs>
      <radialGradient id="bookGlow" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor="hsl(185 45% 45%)" stopOpacity="0.1" />
        <stop offset="100%" stopColor="hsl(185 45% 45%)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="pageGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(185 50% 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(185 50% 50%)" stopOpacity="0.02" />
      </linearGradient>
    </defs>
    {/* Glow */}
    <ellipse cx="80" cy="75" rx="75" ry="60" fill="url(#bookGlow)" />
    {/* Left page */}
    <path d="M76 18 L76 110 Q55 102 16 108 L16 22 Q55 16 76 18Z" stroke="hsl(185 45% 50%)" strokeWidth="1.5" fill="url(#pageGrad)" opacity="0.6" />
    {/* Right page */}
    <path d="M84 18 L84 110 Q105 102 144 108 L144 22 Q105 16 84 18Z" stroke="hsl(185 45% 50%)" strokeWidth="1.5" fill="url(#pageGrad)" opacity="0.6" />
    {/* Spine highlight */}
    <path d="M76 18 Q80 14 84 18" stroke="hsl(185 55% 55%)" strokeWidth="1.5" opacity="0.5" />
    <path d="M76 110 Q80 114 84 110" stroke="hsl(185 55% 55%)" strokeWidth="1.5" opacity="0.5" />
    <line x1="80" y1="16" x2="80" y2="112" stroke="hsl(185 45% 45%)" strokeWidth="0.6" opacity="0.15" />

    {/* Left page: text lines */}
    <rect x="24" y="30" width="40" height="2.5" rx="1" fill="hsl(185 55% 55%)" opacity="0.5" />
    <rect x="24" y="38" width="34" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.12" />
    <rect x="24" y="44" width="38" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="24" y="50" width="30" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.12" />
    <rect x="24" y="56" width="36" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.09" />

    {/* Left page: data chart */}
    <rect x="24" y="64" width="40" height="26" rx="4" stroke="hsl(185 45% 45%)" strokeWidth="0.8" opacity="0.25" fill="hsl(185 45% 45% / 0.04)" />
    {/* Bar chart inside */}
    <rect x="28" y="78" width="5" height="8" rx="1" fill="hsl(185 55% 55%)" opacity="0.4" />
    <rect x="35" y="74" width="5" height="12" rx="1" fill="hsl(185 55% 55%)" opacity="0.55" />
    <rect x="42" y="70" width="5" height="16" rx="1" fill="hsl(185 55% 55%)" opacity="0.7" />
    <rect x="49" y="72" width="5" height="14" rx="1" fill="hsl(185 55% 55%)" opacity="0.6" />
    <rect x="56" y="68" width="5" height="18" rx="1" fill="hsl(185 55% 55%)" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
    </rect>

    <rect x="24" y="96" width="40" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="24" y="102" width="32" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.08" />

    {/* Right page: code/formula lines */}
    <rect x="92" y="30" width="40" height="2.5" rx="1" fill="hsl(185 55% 55%)" opacity="0.5" />
    <rect x="92" y="38" width="34" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.12" />
    <rect x="92" y="44" width="38" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="92" y="50" width="28" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.12" />
    <rect x="92" y="56" width="36" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.09" />
    <rect x="92" y="62" width="32" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="92" y="68" width="38" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.08" />
    <rect x="92" y="74" width="24" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="92" y="80" width="34" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.08" />
    <rect x="92" y="86" width="40" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="92" y="92" width="28" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.08" />
    <rect x="92" y="98" width="36" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.1" />
    <rect x="92" y="104" width="30" height="2" rx="1" fill="hsl(0 0% 100%)" opacity="0.08" />

    {/* Floating data particles rising from book */}
    {[[40,12],[60,8],[100,10],[120,14],[80,6]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="1.5" fill="hsl(185 55% 55%)" opacity="0.5">
        <animate attributeName="cy" values={`${y};${y-12};${y}`} dur={`${2.5+i*0.5}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.5+i*0.5}s`} repeatCount="indefinite" />
      </circle>
    ))}

    {/* Magnifying glass */}
    <circle cx="130" cy="118" r="12" stroke="hsl(185 55% 55%)" strokeWidth="1.5" fill="hsl(185 45% 45% / 0.06)" opacity="0.6">
      <animate attributeName="r" values="12;13;12" dur="3s" repeatCount="indefinite" />
    </circle>
    <line x1="139" y1="127" x2="150" y2="136" stroke="hsl(185 55% 55%)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════
   RIPPLE EFFECT HOOK
   ═══════════════════════════════════════════════════════════════════ */

const useRipple = () => {
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);

  const trigger = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, key: Date.now() });
    setTimeout(() => setRipple(null), 600);
  }, []);

  return { ripple, trigger };
};

/* ═══════════════════════════════════════════════════════════════════
   PUBLICATION CARD
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
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "0 0 40px hsl(185 45% 45% / 0.08), inset 0 0 40px hsl(185 45% 45% / 0.03)" }} aria-hidden="true" />
    <div className={`absolute -bottom-14 -right-14 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 blur-3xl pointer-events-none transition-opacity duration-500 bg-gradient-to-br ${pub.gradient}`} aria-hidden="true" />
    <div className="h-1 w-full bg-gradient-to-r from-accent/60 via-accent/30 to-transparent" aria-hidden="true" />
    <div className="relative p-7 md:p-8 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="icon-box shrink-0 group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M8 7h6" /><path d="M8 11h8" />
          </svg>
        </div>
        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-accent/20 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shrink-0 group-hover:scale-105" aria-label={`Read paper: ${pub.title}`} id={`pub-link-${index}`}>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-4 group-hover:text-accent/90 transition-colors duration-300">{pub.title}</h3>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-accent border border-accent/20" style={{ background: "linear-gradient(135deg, hsl(185 45% 45% / 0.08) 0%, hsl(185 45% 45% / 0.02) 100%)" }}>
          <Award className="w-3.5 h-3.5" aria-hidden="true" />{pub.journal}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground border border-border/30 bg-secondary/40">
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />{pub.year}
        </span>
      </div>
      <p className="text-foreground/80 leading-relaxed font-light text-[14px] md:text-[15px] mb-6 flex-1">
        "<HighlightedAbstract text={pub.abstract} highlight={pub.highlight} />"
      </p>
      <div className="flex flex-wrap gap-2 mb-5" role="list" aria-label="Keywords">
        {pub.tags.map((tag) => (<span key={tag} className="tech-tag" role="listitem">{tag}</span>))}
      </div>
      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:translate-x-1 transition-transform duration-300 mt-auto w-fit">
        Read Full Paper <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  </article>
);

/* ═══════════════════════════════════════════════════════════════════
   FUTURISTIC CATEGORY TILE
   ═══════════════════════════════════════════════════════════════════ */

interface CategoryTileProps {
  onClick: () => void;
  illustration: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  delay: number;
  isVisible: boolean;
}

const CategoryTile = ({ onClick, illustration, title, description, cta, delay, isVisible }: CategoryTileProps) => {
  const { ripple, trigger } = useRipple();

  return (
    <div
      onClick={(e) => { trigger(e); setTimeout(onClick, 200); }}
      className={`group relative cursor-pointer transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glassmorphism + neumorphism card */}
      <div
        className="relative rounded-3xl p-1 overflow-hidden transition-all duration-500 group-hover:scale-[1.03]"
        style={{
          background: "linear-gradient(135deg, hsl(185 45% 45% / 0.15) 0%, hsl(185 45% 45% / 0.03) 50%, hsl(185 45% 45% / 0.1) 100%)",
        }}
      >
        <div
          className="relative rounded-[22px] p-6 md:p-8 flex flex-col items-center text-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(0 0% 7% / 0.9) 0%, hsl(0 0% 4% / 0.95) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.04), inset 0 -1px 0 hsl(0 0% 0% / 0.2), 0 8px 32px hsl(0 0% 0% / 0.4), 0 2px 8px hsl(0 0% 0% / 0.2)",
          }}
        >
          {/* Ripple effect */}
          {ripple && (
            <span
              key={ripple.key}
              className="absolute rounded-full animate-ping pointer-events-none"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
                width: 40,
                height: 40,
                background: "radial-gradient(circle, hsl(185 45% 45% / 0.3) 0%, transparent 70%)",
              }}
            />
          )}

          {/* Hover glow */}
          <div
            className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ boxShadow: "inset 0 0 60px hsl(185 45% 45% / 0.06), 0 0 60px hsl(185 45% 45% / 0.08)" }}
            aria-hidden="true"
          />

          {/* Bottom gradient orb */}
          <div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-0 group-hover:opacity-20 blur-3xl pointer-events-none transition-all duration-700 bg-gradient-to-t from-cyan-500/40 to-teal-500/20"
            aria-hidden="true"
          />

          {/* Floating 3D illustration */}
          <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6 transition-transform duration-[2000ms] ease-in-out" style={{ animation: "floatObj 5s ease-in-out infinite" }}>
            {illustration}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300 relative z-10">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-[240px] relative z-10">
            {description}
          </p>

          {/* CTA */}
          <span className="relative z-10 inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
            {cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </span>

          {/* Corner accent lines */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent/20 rounded-tl-lg pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent/20 rounded-br-lg pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

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
            /* ─── Futuristic Category Selection ─── */
            <div className="relative">
              {/* Particle network background */}
              <div className="absolute -inset-12 -z-10 rounded-3xl overflow-hidden" aria-hidden="true">
                <ParticleNetwork />
              </div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto py-4">
                <CategoryTile
                  onClick={() => setCategory('web')}
                  illustration={<GlobeIllustration />}
                  title="Web Development"
                  description="Modern web applications built with React, Next.js, and cutting-edge technologies."
                  cta="View Projects"
                  delay={0}
                  isVisible={isVisible}
                />
                <CategoryTile
                  onClick={() => setCategory('ai')}
                  illustration={<RobotHeadIllustration />}
                  title="Artificial Intelligence"
                  description="Machine learning models, neural networks, and AI-powered solutions."
                  cta="View Projects"
                  delay={150}
                  isVisible={isVisible}
                />
                <CategoryTile
                  onClick={() => setCategory('publications')}
                  illustration={<DigitalBookIllustration />}
                  title="Research & Publications"
                  description="Academic papers in data science, ML, and applied AI research."
                  cta="View Papers"
                  delay={300}
                  isVisible={isVisible}
                />
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
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                  {publications.map((pub, index) => (<PublicationCard key={pub.title} pub={pub} index={index} />))}
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
