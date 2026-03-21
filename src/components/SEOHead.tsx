import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for managing page metadata dynamically
 * Updates document title and meta tags based on current route/section
 */
export const SEOHead = () => {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        let description = "Saad Naveed is a full stack developer specializing in MERN stack, React, Node.js, and AI powered web applications for scalable modern businesses.";
        let title = "Saad Naveed | Full Stack Developer (MERN & AI)";
        const imageUrl = "https://www.saadnaveeddev.com/images/saad-naveed.jpg";
        const url = `https://www.saadnaveeddev.com/`;

        switch (hash) {
            case '#about':
                title = "About Saad Naveed | Full Stack MERN Developer";
                description = "Learn about Saad Naveed, a full stack developer with 5+ years of experience building scalable MERN applications and AI-powered web solutions.";
                break;
            case '#services':
                title = "Services | Saad Naveed Full Stack Developer";
                description = "Saad Naveed offers full stack web development, React application development, Node.js backend, and AI-powered web application services.";
                break;
            case '#portfolio':
                title = "Portfolio | Projects by Saad Naveed";
                description = "Explore Saad Naveed's portfolio of completed projects including e-commerce platforms, AI dashboards, SaaS applications, and more.";
                break;
            case '#testimonials':
                title = "Client Testimonials | Saad Naveed Developer";
                description = "Read what clients say about working with Saad Naveed. 5-star rated full stack developer trusted by startups and enterprises worldwide.";
                break;
        }

        document.title = title;

        // Helper to update or create meta tags robustly
        const setMetaTag = (selector: string, keyAttr: string, keyVal: string, contentVal: string) => {
            let meta = document.querySelector(selector);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(keyAttr, keyVal);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', contentVal);
        };

        setMetaTag('meta[name="description"]', 'name', 'description', description);
        setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
        setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
        setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
        setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
        setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', "Saad Naveed Full Stack Developer AI Engineer");
        setMetaTag('meta[property="og:type"]', 'property', 'og:type', "website");

        setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
        setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
        setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
        setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
        setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', "Saad Naveed Full Stack Developer AI Engineer");

        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);

        // Add JSON-LD Structured Data for Person (critical for Google Images + Knowledge Panel index)
        let script = document.querySelector('script[id="schema-person"]');
        if (!script) {
            script = document.createElement('script');
            script.setAttribute('id', 'schema-person');
            script.setAttribute('type', 'application/ld+json');
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Saad Naveed",
            "url": "https://www.saadnaveeddev.com",
            "image": imageUrl,
            "jobTitle": "Full Stack Developer & AI Engineer",
            "description": description
        });

    }, [location]);

    return null;
};

export default SEOHead;
