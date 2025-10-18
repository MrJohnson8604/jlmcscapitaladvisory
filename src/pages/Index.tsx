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

        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center py-8 sm:py-12">
          <div className="w-full max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 text-white leading-tight px-2">
              Get Your Next Real Estate Deal Funded. Fast!
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
              Asset-based lenders for Fix & Flip, DSCR, New Construction, and Commercial Bridge—options including no-appraisal/no-survey or BPO-only (lender-ordered).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2">
              <Button 
                className="bg-amber-500 text-white border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/50 rounded-xl text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto"
                asChild
              >
                <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                  Discuss Your Deal
                </a>
              </Button>
              <Button 
                className="bg-amber-500 text-white border-2 border-amber-500 hover:bg-white hover:text-amber-500 active:bg-white active:text-amber-500 focus:ring-amber-500/50 rounded-xl text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 w-full sm:w-auto"
                asChild
              >
                <a href="https://form.jotform.com/251521627688060" target="_blank" rel="noopener noreferrer">
                  Get Pre-Qualified
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center px-2">
              {credibilityItems.map((item, index) => (
                <div key={index} className="bg-black/20 rounded-lg p-3 sm:p-4 flex flex-col justify-center min-h-[4rem]">
                  <span className="text-sm sm:text-base lg:text-lg text-white font-medium">{item.title}</span>
                  <span className="text-sm sm:text-base lg:text-lg text-white font-medium">{item.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuickIntakeForm />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 text-primary px-2">
              Financing Solutions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive asset-based lending programs designed for real estate investors.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => <Card key={index} className="shadow-medium hover:shadow-large transition-shadow">
                <CardContent className="p-6 sm:p-8 text-center">
                  <service.icon className="h-10 w-10 sm:h-12 sm:w-12 text-amber mx-auto mb-4 sm:mb-6" />
                  <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 sm:mb-4 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-center mb-10 sm:mb-12 lg:mb-16 text-primary px-2">
              Why JLMCS Capital Advisory
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {whyJLMCS.map((benefit, index) => <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-amber flex-shrink-0 mt-0.5" />
                  <span className="text-base sm:text-lg font-medium text-foreground leading-relaxed">{benefit}</span>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 text-primary px-2">
              Our Process
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-3 sm:mb-4 px-4">
              Streamlined approach from application to closing.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Close in <strong>7 days or less</strong>, subject to complete documentation and a clear title.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step, index) => <Card key={index} className="shadow-medium text-center">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-amber mb-4 sm:mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 text-primary px-2">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
              Real results from our financing programs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="shadow-large">
              <CardContent className="p-5 sm:p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary mb-1">
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
              <CardContent className="p-5 sm:p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary mb-1">
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
              <CardContent className="p-5 sm:p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-primary mb-1">
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

      <section className="home-cta-strip py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 px-2">
            Start your file today.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Get pre-qualified or schedule a consultation to discuss your specific project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button 
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-amber-500 active:bg-white/16 active:text-amber-500 focus:ring-white/50 rounded-xl font-semibold text-base px-6 py-4 w-full sm:w-auto"
              asChild
            >
              <a href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call" target="_blank" rel="noopener noreferrer">
                Discuss Your Deal
              </a>
            </Button>
            <Button 
              className="border-2 border-white text-white bg-transparent hover:bg-white/10 hover:text-amber-500 active:bg-white/16 active:text-amber-500 focus:ring-white/50 rounded-xl font-semibold text-base px-6 py-4 w-full sm:w-auto"
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