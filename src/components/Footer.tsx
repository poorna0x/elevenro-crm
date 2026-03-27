
import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground border-t border-primary-foreground/10 py-10">
      <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <span className="font-bold text-primary-foreground">
            Eleven<span className="text-primary">RO</span>
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-primary-foreground/70">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/refund-policy" className="hover:text-primary transition-colors">
            Refund Policy
          </Link>
          <Link to="/cookie-policy" className="hover:text-primary transition-colors">
            Cookie Policy
          </Link>
        </div>
        <p className="text-sm text-primary-foreground/40">&copy; {new Date().getFullYear()} ElevenRO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
