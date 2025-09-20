import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-real-estate.jpg";
import charlotteBefore from "@/assets/charlotte-before.jpg";
import charlotteAfter from "@/assets/charlotte-after.jpg";
import phoenixRental from "@/assets/phoenix-rental.jpg";
const Index = () => {
  const credibilityItems = ["Former loan officer", "Nationwide lender network", "High close rate on accepted files", "Transparent terms"];
  const services = [{
    title: "Fix & Flip / Bridge",
    description: "Purchase + rehab financing; asset-based approvals; program-dependent no appraisal/no survey or BPO-only options.",
    icon: TrendingUp
  }, {
    title: "DSCR Rentals",
    description: "Cash-flow driven approvals for long-term rental properties; portfolio-friendly programs.",
    icon: Users
  }, {
    title: "New Construction",
    description: "SFR/MF ground-up financing; land acquisition + vertical construction; interest-only during build phase.",
    icon: Shield
  }, {
    title: "Commercial Bridge",
    description: "Transitional asset financing; value-add opportunities; time-sensitive closing capabilities.",
    icon: Clock
  }];
  const whyJLMCS = ["Asset-based programs; no VOE required", "No-appraisal/no-survey or BPO-only options", "Direct lender relationships, fast reads", "Responsive, clear next steps"];
  const processSteps = [{
    step: "01",
    title: "Intake",
    description: "One short form or call"
  }, {
    step: "02",
    title: "Lender Match",
    description: "Only what fits gets submitted"
  }, {
    step: "03",
    title: "Clear to Close",
    description: "Title/doc checklist to finish"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-32 bg-cover bg-center" style={{
      backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.7)), url(${heroImage})`
    }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Funding that matches your timeline.
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Asset-based lenders for Fix & Flip, DSCR, New Construction, and Commercial Bridge—options including no-appraisal/no-survey or BPO-only (lender-ordered).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="btn-hero-white-outline text-lg px-10 py-5">
                <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                  Discuss Your Deal
                </a>
              </Button>
              <Button className="btn-hero-white-outline text-lg px-10 py-5">
                <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
                  Get Pre-Qualified
                </a>
              </Button>
            </div>
            
            {/* Credibility Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              {credibilityItems.map((item, index) => <div key={index} className="bg-black/20 rounded-lg p-4">
                  <span className="text-sm font-medium opacity-90">{item}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-primary">
              Financing Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive asset-based lending programs designed for real estate investors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => <Card key={index} className="shadow-medium hover:shadow-large transition-shadow">
                <CardContent className="p-8 text-center">
                  <service.icon className="h-12 w-12 text-amber mx-auto mb-6" />
                  <h3 className="text-xl font-display font-semibold mb-4 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Why JLMCS */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-center mb-16 text-primary">
              Why JLMCS Capital Advisory
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyJLMCS.map((benefit, index) => <div key={index} className="flex items-center space-x-4">
                  <CheckCircle2 className="h-6 w-6 text-amber flex-shrink-0" />
                  <span className="text-lg font-medium text-foreground">{benefit}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-primary">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Streamlined approach from application to closing.
            </p>
            <p className="text-sm text-muted-foreground">
              7-day closings depend on complete docs and clean title.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => <Card key={index} className="shadow-medium text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-display font-bold text-amber mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4 text-primary">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Case Gallery */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-primary">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from our financing programs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Case 1: Fix & Flip Charlotte */}
            <Card className="shadow-large">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-2xl font-display font-semibold mb-4 text-primary">Fix & Flip — Houston, TX</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 p-6 pt-0">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">BEFORE</p>
                    <img src={charlotteBefore} alt="Charlotte NC Fix & Flip kitchen before renovation" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">AFTER</p>
                    <img src={charlotteAfter} alt="Charlotte NC Fix & Flip kitchen after renovation" className="w-full h-48 object-cover rounded-lg" />
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-muted-foreground">
                    Needed no-appraisal option; lender ordered BPO; closed in ~7 days with clean title.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Case 2: DSCR Phoenix */}
            <Card className="shadow-large">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-2xl font-display font-semibold mb-4 text-primary">
                    DSCR Rental — Phoenix, AZ
                  </h3>
                </div>
                <div className="p-6 pt-0">
                  <img src={phoenixRental} alt="Phoenix AZ DSCR rental renovated exterior after funding" className="w-full h-64 object-cover rounded-lg mb-4" />
                  <p className="text-muted-foreground">
                    Asset-based DSCR approval; transparent terms; lender-guided process.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Start your file today.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get pre-qualified or schedule a consultation to discuss your specific project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero">
              <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                Discuss Your Deal
              </a>
            </Button>
            <Button className="btn-hero-outline">
              <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
                Get Pre-Qualified
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;