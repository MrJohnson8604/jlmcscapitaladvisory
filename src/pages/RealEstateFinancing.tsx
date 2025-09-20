import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const RealEstateFinancing = () => {
  const services = [
    {
      title: "Fix & Flip / Bridge",
      description: "Purchase + rehab financing; asset-based approvals; some programs offer no appraisal/no survey or BPO-only (ordered by lender).",
    },
    {
      title: "DSCR Rentals", 
      description: "Cash-flow driven approvals for long-term rental properties; portfolio-friendly programs.",
    },
    {
      title: "New Construction",
      description: "SFR/MF ground-up financing; land acquisition + vertical construction; interest-only during build phase.",
    },
    {
      title: "Commercial Bridge",
      description: "Transitional asset financing; value-add opportunities; time-sensitive closing capabilities.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Real Estate Financing Solutions
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Asset-based options for acquisitions, rehabs, rentals, ground-up, and transitional assets—built around speed and clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                <a 
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss Your Deal
                </a>
              </Button>
              <Button className="btn-hero-outline">
                <a 
                  href="https://form.jotform.com/251521627688060"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Pre-Qualified
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="shadow-medium">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display font-semibold mb-4 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-primary">
              Program Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                {[
                  "Asset-based programs available",
                  "No VOE required on presented programs",
                  "No-appraisal/no-survey options available",
                  "BPO-only programs (lender-ordered)"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-amber flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                {[
                  "Nationwide lender network",
                  "Fast approval processes", 
                  "Clear documentation requirements",
                  "Responsive communication throughout"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-amber flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-amber/20 bg-amber/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold mb-2 text-amber">
                  Rehab Draw Planning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Draw planning is facilitated directly by the lender's team to align with their specific process and requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-cta dark py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            Ready to Move Forward?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your specific project requirements and financing options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero-white-outline">
              <a 
                href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss Your Deal
              </a>
            </Button>
            <Button className="btn-hero-white-outline">
              <a 
                href="https://form.jotform.com/251521627688060"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Pre-Qualified
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RealEstateFinancing;