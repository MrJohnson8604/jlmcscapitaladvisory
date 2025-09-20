import { Button } from "@/components/ui/button";

const BusinessWorkingCapital = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Business Working Capital
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Available upon request—useful for establishing business credit when appropriate. Share your objective; we'll route you to a suitable program.
            </p>
            <Button className="btn-hero-outline-white">
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
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-primary">
              Request Information
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Business working capital solutions are available on a case-by-case basis. 
              These programs can be valuable for establishing business credit profiles when aligned with your specific objectives.
            </p>
            <p className="text-base text-muted-foreground mb-8">
              To explore available options, please schedule a consultation where we can discuss your business needs 
              and connect you with the most appropriate program for your situation.
            </p>
            <Button className="btn-outline-dark">
              <a 
                href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessWorkingCapital;