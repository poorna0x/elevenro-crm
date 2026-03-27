
import { Droplets } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground border-t border-primary-foreground/10 py-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          <span className="font-bold text-primary-foreground">
            Eleven<span className="text-primary">RO</span>
          </span>
        </div>
        <p className="text-sm text-primary-foreground/40">&copy; {new Date().getFullYear()} ElevenRO. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
