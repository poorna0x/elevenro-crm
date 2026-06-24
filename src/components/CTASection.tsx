import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";

const contactItems = [
  { icon: Phone, label: "Call Us", value: "+91 98806 93311", href: "tel:+919880693311" },
  { icon: Mail, label: "Email", value: "mail@elevenro.com", href: "mailto:mail@elevenro.com" },
  { icon: MapPin, label: "Location", value: "Bengaluru" },
] as const;

const CTASection = () => {
  return (
    <section id="contact" className="py-24 bg-foreground relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">Get Pure Water Today</h2>
          <p className="leading-relaxed text-primary-foreground">
            Book a service or request a free water quality check. Our team is ready to help.
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {contactItems.map((item) => {
            const content = (
              <>
                <item.icon className="mx-auto mb-3 h-6 w-6 text-primary-foreground" aria-hidden />
                <p className="mb-1 text-sm text-primary-foreground">{item.label}</p>
                <p className="font-semibold text-primary-foreground">{item.value}</p>
              </>
            );

            const cardClass =
              "block rounded-xl border border-primary-foreground/25 bg-[hsl(206,55%,15%)] p-6 text-center shadow-sm";

            return "href" in item && item.href ? (
              <a key={item.label} href={item.href} className={`${cardClass} transition-colors hover:bg-[hsl(206,55%,18%)]`}>
                {content}
              </a>
            ) : (
              <div key={item.label} className={cardClass}>
                {content}
              </div>
            );
          })}
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
