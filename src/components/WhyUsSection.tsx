import { CheckCircle2, Clock, Award, PhoneCall } from "lucide-react";

const reasons = [
  {
    icon: CheckCircle2,
    title: "Certified Technicians",
    description: "Factory-trained experts with years of hands-on experience.",
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    description: "Fast response and same-day service across your city.",
  },
  {
    icon: Award,
    title: "Genuine Spare Parts",
    description: "Only authentic, brand-approved parts and filters used.",
  },
  {
    icon: PhoneCall,
    title: "24/7 Support",
    description: "Round-the-clock customer support for any water emergency.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Why ElevenRO</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Your Trusted Partner for{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Clean Water</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
              With over a decade of expertise, ElevenRO delivers unmatched water purifier services with a commitment to quality, speed, and customer satisfaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className="flex gap-4 p-6 rounded-xl bg-section-alt border border-border opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <reason.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
