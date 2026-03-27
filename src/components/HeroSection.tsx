import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary))_0%,transparent_45%),radial-gradient(circle_at_80%_70%,hsl(var(--accent))_0%,transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm text-primary-foreground/90 opacity-0 animate-fade-up">
            <Shield className="h-4 w-4" />
            Trusted by 10,000+ Families
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-primary-foreground opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Pure Water,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Pure Life.</span>
          </h1>

          <p className="text-lg text-primary-foreground/70 max-w-lg leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Expert water purifier installation, servicing, and repair. We ensure every drop you drink is safe, clean, and refreshing.
          </p>

          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <Link to="/book">
              <Button variant="hero" size="lg" className="text-base px-8">
                <Zap className="h-5 w-5 mr-2" />
                Book a Service
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="hero-outline" size="lg" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;