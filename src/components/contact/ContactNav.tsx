import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const ContactNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-border/30 bg-background/60 backdrop-blur-xl" role="navigation">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Back to Portfolio */}
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          id="contact-nav-back"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <Home className="w-4 h-4 sm:hidden" />
        </Link>

        {/* Brand */}
        <Link to="/" className="text-lg font-bold text-foreground tracking-tight">
          Saad<span className="text-accent">.</span>
        </Link>

        {/* CTA */}
        <a
          href="#booking"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/15 transition-all duration-300"
          id="contact-nav-book"
        >
          <span className="hidden sm:inline">Book a Call</span>
          <span className="sm:hidden">Book</span>
        </a>
      </div>
    </nav>
  );
};

export default ContactNav;
