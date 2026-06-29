import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicAmcLearnMoreDialog from "@/components/PublicAmcLearnMoreDialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, Settings, RefreshCcw, Droplets, HeartPulse, Filter, CheckCircle2, ArrowRight } from "lucide-react";
import { PUBLIC_AMC_PLANS, formatPublicAmcInr } from "@/lib/public-amc-info";

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
      "Full RO care for one fixed price — scheduled visits, breakdown support, and genuine parts included.",
    features: [],
    isAmc: true,
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
    title: "RO Membrane Replacement",
    description:
      "Expert replacement of end-of-life RO membranes with genuine parts. We verify TDS, flow, and system pressure after installation.",
    features: ["Genuine membranes", "TDS verification", "Flow & pressure check", "All major brands"],
  },
];

const ServicesPage = () => {
  const [amcLearnMoreOpen, setAmcLearnMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-10 md:pt-12 pb-16 bg-section-alt">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-section-label mb-3 opacity-0 animate-fade-up">Our Services</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Everything Your Water Purifier{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Needs</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            From installation to repairs and replacements, we provide end-to-end care for every water purifier brand and model.
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

                {service.isAmc ? (
                  <div className="rounded-2xl border border-primary/15 bg-section-alt/60 p-5 sm:p-6 space-y-5 w-full">
                    <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {PUBLIC_AMC_PLANS.map((plan) => (
                        <div
                          key={plan.years}
                          className="rounded-lg bg-background/80 border border-border/80 px-2 py-3 sm:px-3 text-center"
                        >
                          <p className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-tight">
                            {plan.label}
                          </p>
                          <p className="mt-1 text-base sm:text-lg font-bold text-primary leading-none">
                            {formatPublicAmcInr(plan.amountInr)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Routine service every 6 months · No extra breakdown charges
                    </p>

                    <Button
                      type="button"
                      variant="hero"
                      size="lg"
                      className="flex w-full min-h-12 text-base font-semibold"
                      onClick={() => setAmcLearnMoreOpen(true)}
                    >
                      Learn more about AMC
                      <ArrowRight className="h-4 w-4 shrink-0" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground leading-relaxed max-w-xl">{service.description}</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
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

      <PublicAmcLearnMoreDialog open={amcLearnMoreOpen} onOpenChange={setAmcLearnMoreOpen} />

      <Footer />
    </div>
  );
};

export default ServicesPage;
