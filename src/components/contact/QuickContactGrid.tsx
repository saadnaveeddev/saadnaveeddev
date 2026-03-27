import { Mail, MessageCircle, Linkedin, Github, Youtube, Instagram, ExternalLink } from "lucide-react";

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  glowColor: string;
}

const contacts: ContactCard[] = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    description: "For project inquiries & collaborations",
    href: "mailto:saad.naveed.dev@gmail.com",
    color: "from-orange-400 to-red-500",
    glowColor: "hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp",
    description: "Quick chat for urgent discussions",
    href: "https://wa.me/923107968753",
    color: "from-green-400 to-emerald-500",
    glowColor: "hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    title: "LinkedIn",
    description: "Professional network & updates",
    href: "https://linkedin.com/in/saadnaveeddev",
    color: "from-blue-400 to-blue-600",
    glowColor: "hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
  },
  {
    icon: <Github className="w-6 h-6" />,
    title: "GitHub",
    description: "Open source & production code",
    href: "https://github.com/saadnaveeddev",
    color: "from-gray-300 to-gray-500",
    glowColor: "hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]",
  },
  {
    icon: <Youtube className="w-6 h-6" />,
    title: "YouTube",
    description: "Tutorials & dev journey content",
    href: "https://youtube.com/@saadnaveeddev",
    color: "from-red-400 to-red-600",
    glowColor: "hover:shadow-[0_0_30px_rgba(248,113,113,0.15)]",
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    title: "Instagram",
    description: "Behind the scenes & lifestyle",
    href: "https://instagram.com/saadnaveeddev",
    color: "from-pink-400 via-purple-400 to-orange-400",
    glowColor: "hover:shadow-[0_0_30px_rgba(232,121,249,0.15)]",
  },
];

const QuickContactGrid = () => {
  return (
    <section className="relative" id="quick-contact">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="section-title">Get in Touch</p>
          <h2 className="section-heading">
            Choose Your <span className="text-gradient bg-gradient-to-r from-accent via-cyan-400 to-teal-300 bg-clip-text text-transparent">Preferred Channel</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Multiple ways to reach me — pick the one that works best for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-2 hover:border-border ${contact.glowColor}`}
              id={`contact-card-${contact.title.toLowerCase()}`}
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent" />

              <div className="relative z-10">
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} p-[1px] mb-4`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center text-foreground group-hover:bg-card/80 transition-colors">
                    {contact.icon}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{contact.title}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{contact.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickContactGrid;
