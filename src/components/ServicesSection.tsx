import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Wrench,
  Settings,
  RefreshCcw,
  Droplets,
  HeartPulse,
  Filter,
  CheckCircle,
  Shield,
  AlertCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ServiceDetails = {
  includes: string[];
  benefits: string[];
  terms?: string[];
};

type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  pricing?: string;
  details: ServiceDetails;
};

const services: ServiceItem[] = [
  {
    icon: Wrench,
    title: "Installation",
    description:
      "Professional RO purifier installation with precision plumbing and setup.",
    features: [
      "New RO installation",
      "Re-installation & relocation",
      "Plumbing & electrical setup",
      "Same-day slots available",
    ],
    pricing: "Installation: ₹499 | Service: ₹399",
    details: {
      includes: [
        "Complete RO system installation & setup",
        "RO re-installation & relocation",
        "Water quality testing & calibration",
        "Pipe connections & electrical setup",
        "UV lamp installation where applicable",
        "User training on basic operation",
        "Performance check after install",
        "Free maintenance for 3 months",
      ],
      benefits: [
        "Certified installation technicians",
        "Same-day installation available",
        "Genuine spare parts & warranty support",
        "All major brands supported",
        "Professional installation guarantee",
      ],
      terms: [
        "Installation (₹499) does not include extra plumbing materials, additional RO parts, or full assembly kits unless quoted.",
        "Service charge (₹399) is the visit/service fee only; filters and parts are charged separately.",
      ],
    },
  },
  {
    icon: Settings,
    title: "Annual Maintenance",
    description:
      "Comprehensive yearly servicing to keep your purifier performing at its best.",
    features: [
      "Scheduled inspections",
      "Performance optimization",
      "Priority support",
      "Annual contract options",
    ],
    pricing: "From ₹399 per visit · AMC packages on quote",
    details: {
      includes: [
        "Quarterly or bi-annual inspection & tune-up",
        "System performance optimization",
        "Water quality testing & analysis",
        "Filter life monitoring & reminders",
        "Priority booking & emergency support",
        "Annual contract: year-round maintenance & support",
        "Leak checks, pump & flow verification",
        "Electrical safety & connection checks",
      ],
      benefits: [
        "Prevents costly breakdowns",
        "Consistent water quality year-round",
        "Cost-effective vs one-off repairs",
        "Extended peace of mind",
        "Flexible package options",
      ],
      terms: [
        "Visit fee (from ₹399) covers labour and basic checks; filters, membranes, and parts are extra.",
        "AMC pricing varies by brand, model, and visit frequency—final quote after inspection.",
      ],
    },
  },
  {
    icon: RefreshCcw,
    title: "Filter Replacement",
    description:
      "Genuine filter replacements for all major water purifier brands.",
    features: [
      "Pre-filters & sediment",
      "Carbon pre/post filters",
      "UV lamp replacement",
      "Leak check after install",
    ],
    pricing: "Starting from ₹1,799",
    details: {
      includes: [
        "Pre-filter (PP / sediment) replacement",
        "Carbon filter (pre & post) replacement",
        "UV lamp replacement & check",
        "Mineral / alkaline cartridges (as applicable)",
        "Water flow testing after replacement",
        "Connection & leak check after replacement",
        "Filter life reminders",
      ],
      benefits: [
        "Better taste and odor removal",
        "Improved purification performance",
        "Genuine or OEM-grade parts",
        "Professional installation",
      ],
      terms: [
        "Price starting from ₹1,799 does not include RO membrane unless specified in your quote.",
      ],
    },
  },
  {
    icon: HeartPulse,
    title: "Repair & Diagnostics",
    description:
      "Quick diagnosis and expert repair for any water purifier issue.",
    features: [
      "Leakage & low flow",
      "Pump & motor issues",
      "Electrical faults",
      "Same-day response",
    ],
    pricing: "Service visit: ₹399",
    details: {
      includes: [
        "On-site diagnosis & troubleshooting",
        "Leakage repair & pipe fixing",
        "Pump & motor repair/replacement",
        "Low pressure / low flow fixes",
        "Electrical & display issues",
        "Spare parts on approval",
        "Post-repair performance test",
      ],
      benefits: [
        "Transparent diagnosis before work",
        "Genuine spare parts when replaced",
        "Technicians trained across brands",
        "Emergency support available",
      ],
      terms: [
        "Service charge (₹399) is the visit/diagnosis fee; replaced parts are billed separately.",
      ],
    },
  },
  {
    icon: Droplets,
    title: "Water Quality Testing",
    description:
      "Free TDS and quality testing to ensure your water meets safety standards.",
    features: [
      "TDS measurement",
      "Basic quality assessment",
      "Recommendations",
      "Free with booked service",
    ],
    pricing: "Free with any booked service",
    details: {
      includes: [
        "TDS (Total Dissolved Solids) reading",
        "Basic drinking-water suitability check",
        "Simple explanation of results",
        "Recommendations for RO settings or service",
      ],
      benefits: [
        "Know if your purifier is performing",
        "Data-driven filter decisions",
        "No charge when you book a service",
      ],
      terms: [
        "Complimentary testing applies when a service visit is booked and completed; standalone lab reports may be quoted separately.",
      ],
    },
  },
  {
    icon: Filter,
    title: "RO Membrane Replacement",
    description:
      "Genuine RO membrane replacement for all major brands—restores TDS performance and flow when the membrane reaches end of life.",
    features: [
      "Genuine brand-wise membranes",
      "TDS & flow verification",
      "Pressure & waste-ratio check",
      "Professional installation",
    ],
    pricing: "On quote · varies by brand & capacity",
    details: {
      includes: [
        "Assessment of membrane age and performance (TDS / flow)",
        "Removal of the existing membrane and professional install of the new unit",
        "Pressure, flow, and waste-to-pure ratio verification after replacement",
        "System run-in check and handover",
      ],
      benefits: [
        "Restores purification performance when the membrane is spent",
        "Transparent quote before work begins",
        "Genuine membranes sourced for major RO brands",
      ],
      terms: [
        "Membrane price depends on brand, capacity (GPD), and availability—final amount on quote after inspection.",
        "Service visit charges may apply in addition to the membrane and labour as per your booking.",
      ],
    },
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleBookService = () => {
    navigate("/book");
  };

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
          {services.map((service) => (
            <Card
              key={service.title}
              className="cosmic-card group hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 border-border"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-1">{service.title}</h3>
                {service.pricing && (
                  <p className="text-primary font-bold text-base mb-3">{service.pricing}</p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-auto">
                      Learn More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto w-[calc(100%-2rem)] sm:w-full rounded-xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl text-left">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <service.icon className="h-5 w-5" />
                        </span>
                        {service.title}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 pt-2">
                      <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>

                      {service.pricing && (
                        <div className="rounded-lg bg-primary/10 p-4 text-center">
                          <p className="text-primary font-bold text-lg">{service.pricing}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                          What&apos;s included
                        </h4>
                        <ul className="space-y-2">
                          {service.details.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary shrink-0" />
                          Benefits
                        </h4>
                        <ul className="space-y-2">
                          {service.details.benefits.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {service.details.terms && service.details.terms.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
                            Terms &amp; conditions
                          </h4>
                          <ul className="space-y-2">
                            {service.details.terms.map((term) => (
                              <li key={term} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                                <span>{term}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="rounded-lg bg-primary/5 p-6 text-center space-y-4">
                        <h4 className="text-lg font-semibold text-foreground">Ready to book this service?</h4>
                        <p className="text-sm text-muted-foreground">Get a quote and schedule your visit today.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            onClick={handleBookService}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Book now
                          </Button>
                          <Button asChild variant="outline" className="gap-2">
                            <a href="tel:+919880693311">
                              <Phone className="h-4 w-4" />
                              Call: +91-9880693311
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
