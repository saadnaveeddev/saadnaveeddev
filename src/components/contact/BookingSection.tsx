import { Calendar, Clock, ArrowRight, Video } from "lucide-react";

const BookingSection = () => {
  return (
    <section className="relative" id="booking">
      {/* Divider */}
      <div className="divider-subtle" />

      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
          </div>

          <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium w-fit mb-6">
              <Video className="w-3.5 h-3.5" />
              Free Strategy Call
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Skip the Chat.{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                Book a Call.
              </span>
            </h2>

            <p className="mt-5 md:mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Get a clear execution plan in just <span className="text-foreground font-semibold">30 minutes</span>. We'll discuss your project requirements, tech stack, timeline, and budget — no strings attached.
            </p>

            {/* What you get */}
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              {[
                { icon: <Clock className="w-4 h-4" />, text: "30-minute consultation" },
                { icon: <Calendar className="w-4 h-4" />, text: "Flexible scheduling" },
                { icon: <ArrowRight className="w-4 h-4" />, text: "Clear next steps" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm md:text-base text-foreground/80 font-medium">
                  <span className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                    {item.icon}
                  </span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://calendly.com/saadnaveeddev"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-base md:text-lg bg-gradient-to-r from-accent via-cyan-500 to-teal-400 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] w-fit"
              id="booking-calendly-btn"
            >
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              Schedule a Call Now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
