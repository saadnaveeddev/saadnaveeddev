import { useEffect, useRef, useState } from "react";

/**
 * SEOContent — Keyword-rich content block for Google ranking.
 * Renders full readable text for crawlers and users alike.
 * Target keyword: "Saad Naveed" appearing 4–6 times naturally.
 */
const SEOContent = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="seo-content"
            ref={sectionRef}
            aria-label="About Saad Naveed – Full Stack Developer"
            className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="section-container">
                <div className="max-w-4xl mx-auto prose-like">

                    {/* ── H2: About ── */}
                    <div className="mb-12">
                        <h2 id="seo-about-heading" className="section-heading mb-6">
                            About <span className="text-accent">Saad Naveed</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            <strong className="text-foreground">Saad Naveed</strong> is a full stack developer with over five years
                            of hands-on experience building modern web applications. He specializes in the MERN stack —
                            MongoDB, Express.js, React, and Node.js — and delivers scalable solutions that help businesses
                            grow. Additionally, Saad brings deep expertise in TypeScript, Next.js, and AI-powered tooling,
                            making him a versatile developer for modern product teams.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            Every project Saad takes on is built with clean architecture, performance-first thinking, and
                            maintainable code. He believes that good software should be fast, reliable, and easy to extend.
                            Therefore, each solution is crafted to last — not just to ship.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Whether working with early-stage startups or established businesses, Saad Naveed focuses on
                            understanding the real problem before writing a single line of code. This approach results in
                            products that users love and teams can maintain confidently.
                        </p>
                    </div>

                    {/* ── H2: Services ── */}
                    <div className="mb-12">
                        <h2 id="seo-services-heading" className="section-heading mb-6">
                            Development <span className="text-accent">Services</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            Saad Naveed offers a focused set of services designed to deliver high-quality digital products.
                            For example, from interactive React frontends to robust Node.js APIs, every service is tailored
                            to your business goals.
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground text-base" role="list">
                            {[
                                { label: "Full Stack Web Development", id: "seo-service-fullstack" },
                                { label: "React Application Development", id: "seo-service-react" },
                                { label: "Node.js Backend Development", id: "seo-service-nodejs" },
                                { label: "AI-Powered Web Applications", id: "seo-service-ai" },
                                { label: "REST & GraphQL API Development", id: "seo-service-api" },
                                { label: "Performance Optimization", id: "seo-service-perf" },
                            ].map((service) => (
                                <li
                                    key={service.id}
                                    id={service.id}
                                    className="flex items-center gap-2 bg-secondary/30 rounded-lg px-4 py-3 border border-border/40"
                                >
                                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                                    {service.label}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <button
                                onClick={() => scrollTo("services")}
                                className="btn-secondary text-sm"
                                id="seo-explore-services-btn"
                                aria-label="Explore my development services"
                            >
                                Explore My Development Services →
                            </button>
                        </div>
                    </div>

                    {/* ── H2: Technologies (Web) ── */}
                    <div className="mb-8">
                        <h2 id="seo-tech-web-heading" className="text-2xl font-bold text-foreground mb-4">
                            Web <span className="text-accent">Technologies</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            Saad Naveed utilizes modern, scalable technologies to build robust web applications. From responsive frontends to complex backend architectures, these are the core tools used for web development:
                        </p>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="Web Technologies Saad Naveed uses">
                            {[
                                "React", "Next.js", "Node.js", "Express.js",
                                "MongoDB", "PostgreSQL", "JavaScript", "TypeScript",
                                "Tailwind CSS", "RESTful APIs", "GraphQL",
                                "Docker", "AWS", "Vercel", "Supabase"
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    role="listitem"
                                    className="tech-tag bg-secondary/50 text-foreground border border-border/50 text-sm px-3 py-1.5 rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── H2: Technologies (AI/ML) ── */}
                    <div className="mb-12">
                        <h2 id="seo-tech-ai-heading" className="text-2xl font-bold text-foreground mb-4">
                            AI &amp; <span className="text-accent">Machine Learning</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            Integrating artificial intelligence is essential for modern products. Saad Naveed incorporates smart features, data-driven decisions, and predictive models using the following AI/ML technologies:
                        </p>
                        <div className="flex flex-wrap gap-2" role="list" aria-label="AI and ML Technologies Saad Naveed uses">
                            {[
                                "Python", "TensorFlow", "PyTorch", "OpenAI API",
                                "LangChain", "Hugging Face", "Pandas", "Scikit-Learn",
                                "Computer Vision", "NLP", "LLM Integration", "Data Analytics"
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    role="listitem"
                                    className="tech-tag bg-secondary/50 text-foreground border border-border/50 text-sm px-3 py-1.5 rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── H2: Projects ── */}
                    <div className="mb-12">
                        <h2 id="seo-projects-heading" className="section-heading mb-6">
                            Featured <span className="text-accent">Projects</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            Saad Naveed has built high-performance modern applications across multiple industries —
                            from e-commerce and healthcare to SaaS platforms and AI-driven dashboards. Each project
                            is designed with scalability in mind. However, technical quality is never sacrificed for speed.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Notable work includes intelligent PDF collaboration platforms, premium e-commerce storefronts,
                            real estate marketplaces with virtual tours, and data analytics dashboards powered by machine
                            learning models. Because every business has unique needs, each solution is built from the ground up.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => scrollTo("portfolio")}
                                className="btn-secondary text-sm"
                                id="seo-view-projects-btn"
                                aria-label="View my projects"
                            >
                                View My Projects →
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SEOContent;
