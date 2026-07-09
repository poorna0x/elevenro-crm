import { Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-primary-foreground/20 bg-foreground py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary-foreground" aria-hidden />
          <span className="font-bold text-primary-foreground">
            Eleven<span className="text-sky-300">RO</span>
          </span>
        </div>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-primary-foreground"
          aria-label="Footer"
        >
          <Link to="/privacy-policy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="underline-offset-4 hover:underline">
            Terms of Service
          </Link>
          <Link to="/refund-policy" className="underline-offset-4 hover:underline">
            Refund Policy
          </Link>
          <Link to="/cookie-policy" className="underline-offset-4 hover:underline">
            Cookie Policy
          </Link>
          <Link to="/warranty" className="underline-offset-4 hover:underline">
            Check Warranty Status
          </Link>
        </nav>
        <p className="text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} ElevenRO. All rights reserved.
        </p>
        <div className="sr-only">
          <p>
            Sister RO service brand — north &amp; central Bengaluru:{' '}
            <a href="https://hydrogenro.com" rel="noopener noreferrer">
              Hydrogen RO
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
