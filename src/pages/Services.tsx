import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, Settings, RefreshCcw, Droplets, HeartPulse, Filter, CheckCircle2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "RO Installation",
    description:
      "Professional installation of all major RO water purifier brands. Our trained technicians handle plumbing, electrical connections, and setup with precision.",
    features: ["All brand support", "Same-day installation", "Free site inspection", "1-year warranty"],
  },
  {
    icon: Settings,
    title: "Annual Maintenance Contract",
    description:
      "Keep your purifier running at peak performance with our comprehensive AMC plans. Includes scheduled visits, filter changes, and priority support.",
    features: ["4 scheduled visits/year", "Free filter replacements", "Priority support", "Discounted repairs"],
  },
  {
    icon: RefreshCcw,
    title: "Filter & Cartridge Replacement",
    description:
      "Genuine OEM filters and cartridges for all brands. We ensure your purifier delivers the purest water with timely replacements.",
    features: ["100% genuine parts", "All brands covered", "Quick turnaround", "Performance tested"],
  },
  {
    icon: HeartPulse,
    title: "Repair & Diagnostics",
    description:
      "Expert diagnosis and repair for leaks, low flow, bad taste, motor issues, and more. We fix it right the first time.",
    features: ["90-day repair warranty", "Transparent pricing", "Genuine spare parts", "Same-day repair"],
  },
  {
    icon: Droplets,
    title: "Water Quality Testing",
    description:
      "Comprehensive TDS, pH, and contamination testing to ensure your water meets WHO safety standards. Free with any service booking.",
    features: ["TDS measurement", "pH level check", "Contamination analysis", "Detailed report"],
  },
  {
    icon: Filter,
    title: "Deep Cleaning & Sanitization",
    description:
      "Thorough cleaning of tanks, membranes, and internal components to remove biofilm, scale, and bacteria buildup.",
    features: ["Tank sanitization", "Membrane flush", "UV chamber cleaning", "Anti-bacterial treatment"],
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-section-alt">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3 opacity-0 animate-fade-up">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Everything Your Water Purifier{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Needs</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            From installation to deep cleaning, we provide end-to-end care for every water purifier brand and model.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 space-y-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`flex flex-col lg:flex-row gap-10 items-start opacity-0 animate-fade-up ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary">
                  <service.icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed max-w-xl">{service.description}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full bg-section-alt rounded-2xl border border-border p-10 flex items-center justify-center min-h-[220px]">
                <service.icon className="h-24 w-24 text-primary/20" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-section-alt">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Book a service today and experience the ElevenRO difference.</p>
          <Link to="/book">
            <Button variant="hero" size="lg" className="text-base px-10">
              Book Service <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
