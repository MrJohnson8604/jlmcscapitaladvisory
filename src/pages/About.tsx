import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap, Search } from "lucide-react";

const founderImageUrl = "https://res.cloudinary.com/diq674e5s/image/upload/v1758350123/20230914_205411558_iOS_sjy1rw.jpg";

const About = () => {
  const differentiators = [
    {
      icon: Target,
      title: "Asset-Based Focus",
      description: "I specialize in the story of the asset, not just personal credit, allowing for more flexible and creative funding solutions.",
    },
    {
      icon: Users,
      title: "Nationwide Lender Network",
      description: "Gain access to a curated network of trusted private and institutional lenders, ensuring the right fit for your specific deal.",
    },
    {
      icon: Zap,
      title: "Speed and Responsiveness",
      description: "I provide same-day scenario reads whenever possible, because I know that speed is critical in a competitive market.",
    },
    {
      icon: Search,
      title: "Underwriting Insight",
      description: "With a background as a loan officer, I know how to package your deal to meet underwriter expectations, increasing your probability of closing.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="py-20 md:py-28 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary">
            The Expertise Behind Your Next Funded Deal.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            I bridge the gap between ambitious real estate investors and the right capital, turning complex financing into confident decisions.
          </p>
        </div>
      </section>

      {/* 2. Founder / Mission Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-display font-bold text-primary">My Mission</h2>
              <p className="mt-4 text-lg text-foreground/80">
                After years in both retail and private lending, I saw too many quality deals fail not because of a lack of capital, but because investors couldn't connect with the right lender for their specific strategy.
              </p>
              <p className="mt-3 text-lg text-foreground/80">
                I built JLMCS to solve that. My focus is matching your deal to the lender whose programs fit your goals—not forcing your deal to fit a lender's narrow box. My mission is to make investor financing transparent, fast, and strategy-first.
              </p>
            </div>
            {/* START: MODIFIED IMAGE SECTION */}
            <div className="order-1 md:order-2 flex justify-center items-center">
              <figure className="w-full max-w-xs sm:max-w-sm">
                <img
                  src={founderImageUrl}
                  alt="Christopher Johnson, Founder of JLMCS Capital Advisory"
                  className="rounded-lg shadow-xl aspect-square object-cover w-full object-top"
                />
                <figcaption className="mt-4 text-center font-display font-bold text-primary tracking-wide">
                  Principal Owner - Chris Johnson
                </figcaption>
              </figure>
            </div>
            {/* END: MODIFIED IMAGE SECTION */}
          </div>
        </div>
      </section>

      {/* 3. "Why Choose Us" Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-primary">A Brokerage Built for Investors</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical advantages you’ll experience from working directly with an expert.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item) => (
              <Card key={item.title} className="shadow-soft h-full border-0 bg-transparent text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <item.icon className="h-10 w-10 text-amber" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Ready To See If Your Deal Fits?
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Send the basics. I’ll come back with a plan — a real path, not a pitch.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="btn-hero-outline-white">
              <a
                href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book A Call
              </a>
            </Button>
            <Button asChild className="btn-hero-outline-white">
              <a
                href="https://form.jotform.com/251521627688060"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quick Intake Form
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;