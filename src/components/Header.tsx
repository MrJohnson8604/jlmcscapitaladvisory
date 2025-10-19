import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import jlmcsLogo from "@/assets/jlmcs-logo-optimized.webp";

/**
 * Header (sticky)
 * - Safe-area padding for iOS notch devices
 * - Slightly shorter on mobile (h-14) while keeping desktop height (md:h-16)
 * - No visual regressions for desktop/tablet
 */
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

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-soft pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* NOTE: h-14 on mobile, md:h-16 on larger screens to reduce top spacing on phones */}
        <div className="flex items-center justify-between h-14 md:h-16 gap-2 sm:gap-4">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" aria-label="JLMCS Home">
              <img
                src={jlmcsLogo}
                alt="JLMCS"
                className="h-6 sm:h-7 lg:h-8 w-auto"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Desktop navigation (shown from xl and up) */}
          <nav className="hidden xl:flex items-center flex-1 justify-end">
            <div className="flex items-baseline space-x-1 2xl:space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-2 2xl:px-3 py-2 text-sm 2xl:text-base font-medium transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-amber border-b-2 border-amber"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <Button asChild className="ml-2 2xl:ml-3">
                {/* Update this URL if you use a different CTA route */}
                <a href="/contact" className="whitespace-nowrap">
                  Discuss Your Deal
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile menu toggle */}
          <div className="xl:hidden flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setIsOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="xl:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-2 py-2 rounded-md text-sm font-medium ${
                    isActive(item.href)
                      ? "text-amber bg-amber-50"
                      : "text-foreground/90 hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full">
                <a href="/contact" className="block" onClick={() => setIsOpen(false)}>
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
