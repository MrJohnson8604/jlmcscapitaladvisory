import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-display font-semibold mb-4">
              JLMCS Capital Advisory
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Asset-based real estate financing for Fix & Flip, DSCR, New Construction, and Commercial Bridge loans nationwide.
            </p>
            <p className="text-sm text-primary-foreground/70 font-medium">
              Funding the deal and the build.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/real-estate-financing" className="text-sm text-primary-foreground/80 hover:text-amber transition-colors">
                  Real Estate Financing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-amber transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-sm text-primary-foreground/80 hover:text-amber transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-amber transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase mb-4">
              Get Started
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/80 hover:text-amber transition-colors"
                >
                  Discuss Your Deal
                </a>
              </li>
              <li>
                <a 
                  href="https://form.jotform.com/251521627688060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/80 hover:text-amber transition-colors"
                >
                  Get Pre-Qualified
                </a>
              </li>
              <li>
                <Link to="/refer-deal" className="text-sm text-primary-foreground/80 hover:text-amber transition-colors">
                  Refer a Deal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xs text-primary-foreground/60">
                © 2024 JLMCS Capital Advisory. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-xs text-primary-foreground/60 hover:text-amber transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-primary-foreground/60 hover:text-amber transition-colors">
                Terms
              </Link>
              <Link to="/disclosures" className="text-xs text-primary-foreground/60 hover:text-amber transition-colors">
                Disclosures
              </Link>
            </div>
          </div>
          
          {/* Compliance Disclosure */}
          <div className="mt-6 pt-6 border-t border-primary-foreground/20">
            <p className="text-xs text-primary-foreground/60 leading-relaxed">
              Broker to licensed lenders. Terms subject to lender guidelines and truthful, complete information. 
              Some programs offer no appraisal/no survey or BPO-only; availability varies by lender, property, and state. 
              7-day closings depend on complete docs and clean title. Referral paid only if you are not otherwise compensated 
              and where permitted by law. Not a commitment to lend.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;