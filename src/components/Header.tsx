import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import jlmcsLogo from "@/assets/jlmcs-logo-optimized.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Real Estate Financing", href: "/real-estate-financing" },
    { name: "Business Working Capital", href: "/business-working-capital" },
    { name: "Resources", href: "/resources/roi-calculator" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faqs" },
    { name: "Refer a Deal", href: "/refer-deal" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={jlmcsLogo}
                alt="JLMCS Capital Advisory"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* FIX: New container for right-side elements to ensure proper alignment */}
          <div className="flex items-center">
            {/* Desktop Navigation & CTA (hidden on mobile) */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-baseline space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.href)
                        ? "text-amber border-b-2 border-amber"
                        : "text-foreground hover:text-amber"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="ml-4">
                <Button className="btn-amber whitespace-nowrap">
                  <a
                    href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discuss Your Deal
                  </a>
                </Button>
              </div>
            </div>

            {/* Mobile menu button (only visible on mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-amber focus:outline-none focus:ring-2 focus:ring-amber"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-colors rounded-md ${
                  isActive(item.href)
                    ? "text-amber bg-muted"
                    : "text-foreground hover:text-amber"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 pt-4 pb-2">
              <Button className="btn-amber w-full">
                <a
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  Discuss Your Deal
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

