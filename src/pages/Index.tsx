
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
