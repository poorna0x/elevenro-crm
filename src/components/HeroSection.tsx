import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleBookService = () => {
    navigate("/book");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 md:pt-28 pb-16 md:pb-20 px-2 md:px-12 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-water.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary))_0%,transparent_45%),radial-gradient(circle_at_80%_70%,hsl(var(--accent))_0%,transparent_40%)]" />
      <div className="absolute inset-0 cosmic-grid opacity-[0.22]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none">
        <div className="w-full h-full opacity-[0.12] bg-primary blur-[120px]" />
      </div>

      <div
        className={`relative z-10 max-w-4xl text-center space-y-6 transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/90">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            Trusted by 2,500+ families
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-balance text-primary-foreground">
          Pure Water,
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pure Life.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/75 max-w-2xl mx-auto text-balance">
          Expert water purifier installation, servicing, and repair. We ensure every drop you drink is safe, clean, and refreshing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 items-center">
          <Button
            variant="hero"
            onClick={handleBookService}
            className="text-sm sm:text-base h-12 w-full max-w-[280px] sm:w-auto sm:min-w-[200px] px-6 sm:px-8 min-h-[48px] shadow-lg border-0"
          >
            Book Service Now
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-sm sm:text-base h-12 w-full max-w-[280px] sm:w-auto sm:min-w-[200px] px-6 sm:px-8 min-h-[48px] border-2 border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href="tel:+919880693311">Call: +91-9880693311</a>
          </Button>
        </div>

        <div className="pt-6 text-sm text-primary-foreground/65 space-y-1">
          <div>Same-day service available</div>
          <div>All brands service supported</div>
          <div>Genuine spare parts</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
