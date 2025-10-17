import { Link } from "react-router-dom";

// An array to hold all the essential footer links for a clean layout
const footerLinks = [
  { name: "Real Estate Financing", href: "/real-estate-financing" },
  { name: "About", href: "/about" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Disclosures", href: "/disclosures" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* This new, more compact container uses less vertical padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* This flex layout creates the single-bar design.
          - It stacks vertically on mobile (flex-col).
          - It becomes a horizontal row on medium screens and up (md:flex-row).
        */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright notice on the left */}
          <p className="text-xs text-primary-foreground/60 order-2 md:order-1">
            © {new Date().getFullYear()} JLMCS Capital Advisory. All rights reserved.
          </p>
          
          {/* Navigation links on the right.
            - They wrap naturally on smaller screens.
          */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 order-1 md:order-2">
            {footerLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-xs text-primary-foreground/80 hover:text-amber transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* IMPORTANT: The long disclosure paragraph has been removed from here.
          As a best practice, you should create a new page at `/disclosures` 
          and place that text there. This keeps your footer clean and professional.
        */}
      </div>
    </footer>
  );
};

export default Footer;

