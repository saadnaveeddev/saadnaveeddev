import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component for managing page metadata dynamically
 * Updates document title and meta tags based on current route/section
 */
export const SEOHead = () => {
    const location = useLocation();

    useEffect(() => {
        // Update meta description based on hash (section)
        const hash = location.hash;
        let description = "Saad Naveed is a full stack developer specializing in MERN stack, React, Node.js, and AI powered web applications for scalable modern businesses.";
        let title = "Saad Naveed | Full Stack Developer (MERN & AI)";

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
                description = "Explore Saad Naveed's portfolio of 50+ completed projects including e-commerce platforms, AI dashboards, SaaS applications, and more.";
                break;
            case '#testimonials':
                title = "Client Testimonials | Saad Naveed Developer";
                description = "Read what clients say about working with Saad Naveed. 5-star rated full stack developer trusted by startups and enterprises worldwide.";
                break;
        }

        document.title = title;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }

        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const baseUrl = 'https://saadnaveed.dev';
            canonical.setAttribute('href', hash ? `${baseUrl}/${hash}` : baseUrl);
        }

        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', description);
        }

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            ogUrl.setAttribute('content', `https://saadnaveed.dev${hash ? '/' + hash : ''}`);
        }

        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', title);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content', description);
        }
    }, [location]);

    return null;
};

export default SEOHead;
