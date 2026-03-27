import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">Get Pure Water Today</h2>
          <p className="text-primary-foreground/60 leading-relaxed">Book a service or request a free water quality check. Our team is ready to help.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {[
            { icon: Phone, label: "Call Us", value: "+91 88849 44288" },
            { icon: Mail, label: "Email", value: "mail@elevenro.com" },
            { icon: MapPin, label: "Location", value: "Bengaluru" },
          ].map((item) => (
            <div key={item.label} className="text-center p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <item.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <p className="text-sm text-primary-foreground/50 mb-1">{item.label}</p>
              <p className="font-semibold text-primary-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/book">
            <Button variant="hero" size="lg" className="text-base px-10">
              Schedule a Visit
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
