import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Award, Droplets, ArrowRight } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Families Served" },
  { value: "15+", label: "Cities Covered" },
  { value: "50+", label: "Expert Technicians" },
  { value: "98%", label: "Customer Satisfaction" },
];

const values = [
  {
    icon: Droplets,
    title: "Purity First",
    description: "Every service we deliver is guided by a single goal - ensuring the purest water reaches your glass.",
  },
  {
    icon: Users,
    title: "Customer Obsessed",
    description: "We listen, we care, and we go the extra mile. Your satisfaction drives everything we do.",
  },
  {
    icon: Target,
    title: "Precision Service",
    description: "Our technicians are factory-trained and equipped with the latest tools for flawless execution.",
  },
  {
    icon: Award,
    title: "Trust & Transparency",
    description: "No hidden charges, genuine parts, and honest diagnostics - always.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-section-alt">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3 opacity-0 animate-fade-up">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            On a Mission to Deliver{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Pure Water</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            ElevenRO was founded with a simple belief - every family deserves access to clean, safe drinking water without the hassle.
          </p>
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Started in 2015, ElevenRO began as a small team of passionate water purifier technicians who saw a gap in the market - reliable, transparent, and affordable water purifier servicing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've grown into one of the most trusted water purifier service brands, serving over 10,000 families across 15+ cities. Our team of 50+ certified technicians delivers excellence with every visit.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We partner with all major brands including Kent, Aquaguard, Pureit, LivPure, and more - using only genuine spare parts and filters to ensure your purifier performs at its best.
              </p>
            </div>
            <div className="bg-section-alt rounded-2xl border border-border p-16 flex items-center justify-center">
              <Droplets className="h-32 w-32 text-primary/15" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-section-alt">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <p className="mt-4 text-muted-foreground">The principles that guide everything we do.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-card rounded-xl border border-border p-7 text-center opacity-0 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Join the ElevenRO Family</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Experience the difference that trusted, professional water purifier service makes.</p>
          <Link to="/book">
            <Button variant="hero" size="lg" className="text-base px-10">
              Book a Service <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
