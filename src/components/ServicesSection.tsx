import { Wrench, Settings, RefreshCcw, Droplets, HeartPulse, Filter } from "lucide-react";

const services = [
    {
      icon: Wrench,
      title: "Installation",
      description: "Professional RO purifier installation with precision plumbing and setup.",
    },
    {
      icon: Settings,
      title: "Annual Maintenance",
      description: "Comprehensive yearly servicing to keep your purifier performing at its best.",
    },
    {
      icon: RefreshCcw,
      title: "Filter Replacement",
      description: "Genuine filter replacements for all major water purifier brands.",
    },
    {
      icon: HeartPulse,
      title: "Repair & Diagnostics",
      description: "Quick diagnosis and expert repair for any water purifier issue.",
    },
    {
      icon: Droplets,
      title: "Water Quality Testing",
      description: "Free TDS and quality testing to ensure your water meets safety standards.",
    },
    {
      icon: Filter,
      title: "Membrane Cleaning",
      description: "Deep RO membrane cleaning and replacement for optimal flow and purity.",
    },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Complete Water Purifier Care</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            From installation to maintenance, we cover every aspect of water purifier service to give you pure, safe water every day.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl border border-border p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;