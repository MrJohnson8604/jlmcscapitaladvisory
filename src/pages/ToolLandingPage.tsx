import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ToolLandingPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false); // State for the checkbox
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !role) {
      setError("Please fill out all required fields.");
      return;
    }
    // In a real app, you'd send this data to your marketing/CRM system
    console.log({ firstName, email, role, marketingConsent });

    // Unlock the tool for the user
    localStorage.setItem("hasCalculatorAccess", "true");

    // Redirect the user to the calculator page
    navigate("/tools/roi-calculator");
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Value Proposition */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Analyze Real Estate Deals in Seconds
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our free ROI & Term Sheet Calculator is a professional-grade tool designed for investors and wholesalers to find the true profit in any fix-and-flip deal.
          </p>
          <ul className="mt-8 space-y-4 text-muted-foreground">
            <li className="flex items-center gap-3">
              <CheckIcon /> Instantly find your Cash-to-Close and ROI.
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon /> Compare different hold scenarios (6, 9, 12 months).
            </li>
            <li className="flex items-center gap-3">
              <CheckIcon /> Understand complex terms like "Dutch Interest" and "Cost of Capital."
            </li>
          </ul>
        </div>

        {/* Right Side: Lead Capture Form */}
        <div className="bg-background p-8 rounded-lg border shadow-sm">
          <h2 className="text-2xl font-semibold text-center text-foreground">Get Free Access Now</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="role">I am a...</Label>
              <Select onValueChange={setRole} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your primary role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investor">Real Estate Investor</SelectItem>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                  <SelectItem value="agent">Real Estate Agent</SelectItem>
                  <SelectItem value="broker">Mortgage Broker</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* NEW: Explicit marketing opt-in checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="marketing" onCheckedChange={(checked) => setMarketingConsent(checked as boolean)} />
              <Label htmlFor="marketing" className="text-sm font-normal text-muted-foreground">
                Yes, send me occasional emails with real estate tips and new tools.
              </Label>
            </div>

            {error && <p className="text-sm text-red-600 pt-2">{error}</p>}
            
            <Button type="submit" className="w-full btn-amber">
              Access the Calculator
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Simple check icon component
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ToolLandingPage;

