import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, Clock, Shield } from "lucide-react";
import { QuickIntakeForm } from "@/components/QuickIntakeForm";
import sanAntonioFlip from "@/assets/san-antonio-flip-optimized.webp";
import houstonCompleted from "@/assets/houston-completed-optimized.webp";
import houstonFlipInterior from "@/assets/houston-flip-interior-optimized.webp";

const heroVideoUrl = "https://res.cloudinary.com/diq674e5s/video/upload/v1760745832/Real_Estate_Investor_Broker_kouehd.mp4";

const Index = () => {
  const credibilityItems = [
    { title: "Expert", subtitle: "Guidance" },
    { title: "Nationwide", subtitle: "Lender Network" },
    { title: "Fast, Reliable", subtitle: "Closings" },
    { title: "Transparent", subtitle: "Terms" },
  ];

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

  return (
    <div className="min-h-screen">
      <section className="relative h-[80vh] md:h-[70vh] min-h-[550px] flex flex-col items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={heroVideoUrl}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-primary/70 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 text-white">
              Get Your Next Real Estate Deal Funded. Fast!
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Asset-based lenders for Fix & Flip, DSCR, New Construction, and Commercial Bridge—options including no-appraisal/no-survey or BPO-only (lender-ordered).
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                className="bg-amber-500 text-white border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/50 rounded-xl text-lg px-10 py-5"
                asChild
              >
                <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                  Discuss Your Deal
                </a>
              </Button>
              <Button 
                className="bg-amber-500 text-white border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/50 rounded-xl text-lg px-10 py-5"
                asChild
              >
                <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
                  Get Pre-Qualified
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              {credibilityItems.map((item, index) => (
                <div key={index} className="bg-black/20 rounded-lg p-4 flex flex-col justify-center">
                  <span className="text-lg text-white">{item.title}</span>
                  <span className="text-lg text-white">{item.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuickIntakeForm />

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-primary">
              Financing Solutions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
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

      <section className="py-16 sm:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-center mb-12 sm:mb-16 text-primary">
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

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-primary">
              Our Process
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              Streamlined approach from application to closing.
            </p>
            <p className="text-sm text-muted-foreground">
              Close in <strong>7 days or less</strong>, subject to complete documentation and a clear title.
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

      <section className="py-16 sm:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-primary">
              Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Real results from our financing programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-large">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-primary mb-1">
                    Funded
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    San Antonio, TX
                  </p>
                </div>
                <div className="mb-4">
                  <img 
                    src={sanAntonioFlip} 
                    alt="Funded — San Antonio, TX — property exterior" 
                    className="w-full aspect-[3/2] object-cover rounded-2xl shadow-medium"
                  />
                </div>
                <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                  Asset-based approval with no appraisal and no survey required. New investor—funded.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-large">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-primary mb-1">
                    Funded
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    Houston, TX
                  </p>
                </div>
                <div className="mb-4">
                  <img 
                    src={houstonCompleted} 
                    alt="Funded — Houston, TX — exterior" 
                    className="w-full aspect-[3/2] object-cover rounded-2xl shadow-medium"
                  />
                </div>
                <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                  Liquid reserves verified via screenshots; streamlined documentation through funding.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-large">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-xl font-display font-semibold text-primary mb-1">
                    Funded
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    Houston, TX
                  </p>
                </div>
                <div className="mb-4">
                  <img 
                    src={houstonFlipInterior} 
                    alt="Funded — Houston, TX — interior renovation" 
                    className="w-full aspect-[3/2] object-cover rounded-2xl shadow-medium"
                  />
                </div>
                <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                  BPO (lender-ordered) and liquid reserves verified via screenshots; complete docs enabled a fast close.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="home-cta-strip py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
            Start your file today.
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Get pre-qualified or schedule a consultation to discuss your specific project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-amber-500 active:bg-white/16 active:text-amber-500 focus:ring-white/50 rounded-xl font-semibold"
              asChild
            >
              <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                Discuss Your Deal
              </a>
            </Button>
            <Button 
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-amber-500 active:bg-white/16 active:text-amber-500 focus:ring-white/50 rounded-xl font-semibold"
              asChild
            >
              <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
                Get Pre-Qualified
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Index;

