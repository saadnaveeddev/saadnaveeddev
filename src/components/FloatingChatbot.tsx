import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, ArrowRight } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

// Knowledge base about Saad Naveed
const knowledgeBase: Record<string, string> = {
  // Services
  services:
    "I offer **Full Stack Development** (React, Next.js, Node.js, MERN), **AI/ML Solutions** (AI agents, chatbots, NLP, computer vision), **SaaS Product Development**, and **Automation Systems** (workflow automation, API integrations, data pipelines).",
  "what do you do":
    "Saad is a Full Stack Developer & AI Engineer who builds production-ready AI products, SaaS applications, and automation systems. He specializes in React, Node.js, Python, and AI/ML technologies.",
  skills:
    "Core skills include: **React, Next.js, Node.js, TypeScript, Python**, AI/ML frameworks, MongoDB, PostgreSQL, Firebase, Docker, AWS, and CI/CD pipelines.",

  // Pricing
  pricing:
    "Pricing depends on project scope. Small projects start around **$1,000**, SaaS products range **$5,000–$25,000+**. Book a free 15-minute call to get a clear quote — no strings attached.",
  cost: "Project costs vary with complexity. A landing page or MVP: **$1K–$3K**. Full SaaS app: **$5K–$15K**. AI-powered systems: **$5K–$25K+**. Let's discuss your project for an accurate estimate.",
  budget:
    "I work with budgets of all sizes. The best way to get an accurate quote is to book a call and discuss your specific requirements.",

  // Timeline
  timeline:
    "Timelines vary: **Landing pages / MVPs**: 1–2 weeks. **Full SaaS apps**: 4–8 weeks. **AI systems**: 3–6 weeks. I always provide a clear timeline upfront after our initial discussion.",
  "how long":
    "Project duration depends on complexity. Most projects are delivered within 2–8 weeks. Book a call and I'll give you a precise timeline based on your requirements.",

  // Contact
  contact:
    "You can reach Saad through:\n• **Email**: saadnaveed.dev@gmail.com\n• **LinkedIn**: linkedin.com/in/saadnaveeddev\n• **WhatsApp**: Quick chat available\n• **Calendly**: Book a free 15-min call\n\nOr visit the [Contact page](/contact).",
  email: "You can email Saad at **saadnaveed.dev@gmail.com** for project inquiries and collaborations.",
  hire: "Saad is open to freelance & contract work. The best way to start is to **book a 15-minute call** on the Contact page to discuss your project requirements.",

  // Tech stack
  "tech stack":
    "Primary stack: **React, Next.js, Node.js, TypeScript, Python**. Databases: PostgreSQL, MongoDB, Firebase. Cloud: AWS, Vercel. DevOps: Docker, CI/CD. AI/ML: TensorFlow, PyTorch, OpenAI APIs, LangChain.",
  react: "Yes! React (with TypeScript) is one of Saad's core technologies. He builds production apps with React, Next.js, and the entire MERN stack.",
  python:
    "Python is used extensively for AI/ML projects — building AI agents, NLP systems, data pipelines, and automation scripts.",

  // Experience
  experience:
    "Saad has worked with **international clients**, built **15+ AI systems**, delivered **20+ SaaS products**, and maintains a **95% client satisfaction rate**. He focuses on production-quality code and real business impact.",
  portfolio:
    "Check out the portfolio section on the homepage to see real projects including AI products, SaaS applications, and full-stack web apps.",

  // Availability
  available:
    "Saad is currently **open to freelance & contract work**. Book a free strategy call to discuss your project!",
  freelance:
    "Yes, Saad is available for freelance work! He works with clients worldwide across different time zones. Book a call to get started.",

  // Default / General
  hello: "Hey there! 👋 I'm Saad's AI assistant. I can answer questions about his services, skills, pricing, availability, and more. What would you like to know?",
  hi: "Hey there! 👋 I'm Saad's AI assistant. I can answer questions about his services, skills, pricing, availability, and more. What would you like to know?",
};

const quickQuestions = [
  "What services do you offer?",
  "What's the pricing?",
  "How can I contact you?",
  "Are you available for hire?",
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase().trim();

  // Direct keyword matches
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lower.includes(key)) return value;
  }

  // Fuzzy topic matching
  if (lower.match(/price|cost|charge|rate|fee|budget|afford|expensive|cheap/))
    return knowledgeBase.pricing;
  if (lower.match(/time|long|duration|deadline|deliver|fast|quick|speed/))
    return knowledgeBase.timeline;
  if (lower.match(/service|offer|work|build|develop|create|make/))
    return knowledgeBase.services;
  if (lower.match(/skill|tech|stack|tool|language|framework/))
    return knowledgeBase.skills;
  if (lower.match(/contact|reach|email|call|book|meet|schedule|connect|touch/))
    return knowledgeBase.contact;
  if (lower.match(/hire|freelance|available|contract|remote|open/))
    return knowledgeBase.available;
  if (lower.match(/experience|project|portfolio|client|work/))
    return knowledgeBase.experience;
  if (lower.match(/react|node|next|javascript|typescript|mern/))
    return knowledgeBase.react;
  if (lower.match(/python|ai|ml|machine|learning|agent|chatbot|nlp/))
    return knowledgeBase.python;
  if (lower.match(/hello|hi|hey|sup|yo|greet/))
    return knowledgeBase.hello;

  return "I'm not sure about that, but Saad would love to help! You can **book a free 15-minute call** on the [Contact page](/contact) or email him at **saadnaveed.dev@gmail.com** to discuss further.";
}

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hey! 👋 I'm Saad's AI assistant. Ask me anything about his services, pricing, skills, or availability!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-like rendering for bold and links
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\n)/g);
    return parts.map((part, i) => {
      if (part === "\n") return <br key={i} />;
      const boldMatch = part.match(/^\*\*(.+)\*\*$/);
      if (boldMatch) return <strong key={i} className="font-semibold text-foreground">{boldMatch[1]}</strong>;
      const linkMatch = part.match(/^\[(.+)\]\((.+)\)$/);
      if (linkMatch)
        return (
          <a key={i} href={linkMatch[2]} className="text-accent hover:underline font-medium">
            {linkMatch[1]}
          </a>
        );
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] animate-scale-in">
          <div className="rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-elevated overflow-hidden flex flex-col" style={{ maxHeight: "min(520px, 70vh)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-gradient-to-r from-accent/5 to-cyan-500/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Saad's AI Assistant</p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online now
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar" style={{ minHeight: "200px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-black rounded-br-md"
                        : "bg-secondary/60 text-foreground/90 rounded-bl-md border border-border/30"
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary/60 border border-border/30 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-border/40 bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-all"
                  >
                    {q}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/30">
              <div className="flex items-center gap-2 bg-secondary/40 rounded-xl border border-border/30 px-3 py-1 focus-within:border-accent/30 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 py-2 outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-accent hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open AI assistant"
        id="floating-chatbot-btn"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-accent/25 animate-ping" style={{ animationDuration: "2.5s" }} />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent via-cyan-500 to-teal-400 flex items-center justify-center shadow-[0_4px_24px_rgba(45,212,191,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_32px_rgba(45,212,191,0.45)]">
          <Sparkles className="w-6 h-6 text-black" />
        </div>

        {/* Label tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg bg-card border border-border/50 text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none shadow-elevated">
          Ask me anything
          <div className="absolute top-full right-5 w-2 h-2 bg-card border-r border-b border-border/50 transform rotate-45 -translate-y-1" />
        </div>
      </button>
    </>
  );
};

export default FloatingChatbot;
