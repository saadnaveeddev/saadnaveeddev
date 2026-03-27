import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="section-container py-12">
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/contact"
            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            id="footer-contact-link"
          >
            Get in Touch →
          </Link>
          <p className="text-muted-foreground">
            &copy; {currentYear} <span itemProp="name">Saad Naveed</span> — Built with passion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
