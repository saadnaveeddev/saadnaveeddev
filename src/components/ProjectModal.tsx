import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export interface Project {
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  liveUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen || !project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-card border border-border rounded-2xl overflow-hidden animate-scale-in"
           style={{ boxShadow: 'var(--shadow-elevated)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Image Gallery */}
          <div className="relative aspect-video bg-background">
            <img
              src={project.gallery[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {project.gallery.length > 1 && (
              <>
                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors border border-border"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-background flex items-center justify-center transition-colors border border-border"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex 
                          ? 'bg-accent' 
                          : 'bg-foreground/30 hover:bg-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-accent mb-3">About This Project</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-accent mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Link */}
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex"
              >
                View Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
