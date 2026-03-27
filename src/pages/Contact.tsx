import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 88849 44288", href: "tel:+918884944288" },
  { icon: Mail, label: "Email", value: "mail@elevenro.com", href: "mailto:mail@elevenro.com" },
  { icon: MapPin, label: "Address", value: "Bengaluru, Karnataka" },
  { icon: Clock, label: "Working Hours", value: "Mon - Sat, 8:00 AM - 8:00 PM" },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-section-alt">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3 opacity-0 animate-fade-up">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            We'd Love to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hear From You</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Have a question, need a service, or want a free water quality test? Reach out and our team will respond quickly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Contact Information</h2>
                <p className="text-muted-foreground">Reach us through any of these channels.</p>
              </div>

              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-border p-8 sm:p-10 shadow-sm">
                <h2 className="text-2xl font-bold text-card-foreground mb-3">Book a Service</h2>
                <p className="text-muted-foreground mb-8">
                  Use our booking page to submit your request. It is connected to the same backend/database.
                </p>
                <Link to="/book">
                  <Button variant="hero" size="lg" className="w-full text-base">
                    Go to Booking Page
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
