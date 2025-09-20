import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const differentiators = [
    "Asset-based focus",
    "No VOE required",
    "No-appraisal/no-survey or BPO-only options",
    "Nationwide lender network",
    "Responsive communication"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About JLMCS Capital Advisory
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Funding the deal and the build.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 text-primary">
                  Our Origin
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Built by a former loan officer who understands lender expectations, required documentation, 
                  and how to package a file that clears underwriting. We submit only what we know fits a lender's criteria.
                </p>
                <p className="text-base text-muted-foreground">
                  This inside knowledge of the lending process allows us to streamline approvals and set realistic 
                  expectations from day one—no surprises, just clear paths to closing.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-8">
                <h3 className="text-xl font-display font-semibold mb-4 text-primary">
                  Our Promise
                </h3>
                <p className="text-muted-foreground text-lg font-medium">
                  Exceptional service and transparent terms—no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-12 text-primary">
              What Sets Us Apart
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <Card key={index} className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-amber flex-shrink-0" />
                      <span className="font-medium text-foreground">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Approach */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-6 text-primary">
                Our Approach
              </h2>
              <p className="text-lg text-muted-foreground">
                Direct, pragmatic, action-oriented—no fluff, just results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-medium">
                <CardContent className="p-8 text-center">
                  <div className="text-2xl font-display font-bold text-amber mb-4">01</div>
                  <h3 className="text-xl font-display font-semibold mb-4 text-primary">
                    Clear Communication
                  </h3>
                  <p className="text-muted-foreground">
                    Plain-English explanations of terms, process, and next steps—no industry jargon.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardContent className="p-8 text-center">
                  <div className="text-2xl font-display font-bold text-amber mb-4">02</div>
                  <h3 className="text-xl font-display font-semibold mb-4 text-primary">
                    Strategic Matching
                  </h3>
                  <p className="text-muted-foreground">
                    We only submit files to lenders where they fit—maximizing approval chances.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardContent className="p-8 text-center">
                  <div className="text-2xl font-display font-bold text-amber mb-4">03</div>
                  <h3 className="text-xl font-display font-semibold mb-4 text-primary">
                    Responsive Service
                  </h3>
                  <p className="text-muted-foreground">
                    Same-day responses on weekdays and clear timelines throughout the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-cta dark py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference of working with a former loan officer who knows what it takes to close.
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

export default About;