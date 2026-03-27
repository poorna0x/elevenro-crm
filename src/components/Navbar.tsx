import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplets } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Droplets className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Eleven<span className="text-primary">RO</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/book">
            <Button variant="hero" size="sm">
              Book Service
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block text-sm font-medium transition-colors ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/book" onClick={() => setIsOpen(false)}>
            <Button variant="hero" size="sm" className="w-full">
              Book Service
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
