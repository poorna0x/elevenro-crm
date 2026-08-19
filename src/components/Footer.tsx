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
          className="grid w-full max-w-md grid-cols-2 gap-x-5 gap-y-3 justify-items-center text-center text-sm text-primary-foreground sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2"
          aria-label="Footer"
        >
          <Link to="/commercial-ro-service" className="underline-offset-4 hover:underline">
            Commercial RO 25–1000 LPH
          </Link>
          <Link to="/water-softener-installation" className="underline-offset-4 hover:underline">
            Water softener installation
          </Link>
          <Link to="/privacy-policy" className="underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/privacy-request" className="underline-offset-4 hover:underline">
            Privacy Request
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
          <Link to="/disclaimer" className="underline-offset-4 hover:underline">
            Disclaimer
          </Link>
          <Link to="/warranty" className="underline-offset-4 hover:underline sm:col-auto col-span-2">
            Check Warranty Status
          </Link>
        </nav>
        <p className="text-sm text-primary-foreground/80">
          &copy; {new Date().getFullYear()} ElevenRO. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
