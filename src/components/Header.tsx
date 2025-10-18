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
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Logo - Responsive sizing */}
          <div className="flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center">
              <img
                src={jlmcsLogo}
                alt="JLMCS Capital Advisory"
                className="h-6 sm:h-7 lg:h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on tablet and mobile */}
          <nav className="hidden xl:flex items-center flex-1 justify-end">
            <div className="flex items-baseline space-x-1 2xl:space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-2 2xl:px-3 py-2 text-sm 2xl:text-base font-medium transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-amber border-b-2 border-amber"
                      : "text-foreground hover:text-amber"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-2 2xl:ml-4 flex-shrink-0">
              <Button className="btn-amber whitespace-nowrap text-sm 2xl:text-base px-3 2xl:px-4">
                <a
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss Your Deal
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile/Tablet menu button */}
          <div className="xl:hidden flex-shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-amber focus:outline-none focus:ring-2 focus:ring-amber"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{isOpen ? "Close" : "Open"} main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Menu */}
      {isOpen && (
        <div className="xl:hidden border-t">
          <div className="px-3 pt-2 pb-3 space-y-1 sm:px-4 bg-background shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 text-base font-medium transition-colors rounded-md ${
                  isActive(item.href)
                    ? "text-amber bg-muted"
                    : "text-foreground hover:text-amber hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 pt-3 pb-2">
              <Button className="btn-amber w-full text-base py-3">
                <a
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                  onClick={() => setIsOpen(false)}
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