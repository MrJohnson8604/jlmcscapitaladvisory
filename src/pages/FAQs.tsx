import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQs = () => {
  const faqs = [
    {
      question: "Do you require appraisals or surveys?",
      answer: "Some programs offer no appraisal/no survey; others use BPO (ordered by lender). Availability varies by lender, property, and state."
    },
    {
      question: "Is VOE required?",
      answer: "No. VOE is not required on the programs we present."
    },
    {
      question: "How fast can we close?",
      answer: "As fast as ~7 days when all docs are submitted promptly and title is clean."
    },
    {
      question: "What credit profiles are considered?",
      answer: "Tough-credit scenarios considered; asset-based focus means we look at the deal, not just credit scores."
    },
    {
      question: "Who handles rehab draw planning?",
      answer: "The lender's team guides you through their process and requirements for construction draws."
    },
    {
      question: "Which states do you serve?",
      answer: "Nationwide coverage through our extensive lender network."
    },
    {
      question: "What fees should I expect?",
      answer: "All fees disclosed up front before you sign—complete transparency, no surprises."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Clear answers to common questions about our lending process and programs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-display font-semibold text-primary hover:text-amber">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6 text-primary">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every deal is unique. Let's discuss your specific situation and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-amber">
                <a 
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </Button>
              <Button variant="outline">
                <a 
                  href="mailto:chris.johnson@jlmcsfunding.com"
                  className="text-primary hover:text-amber"
                >
                  Send an Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            Ready to Move Forward?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get your questions answered and start your financing process today.
          </p>
          <Button className="btn-hero">
            <a 
              href="https://form.jotform.com/251521627688060"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Pre-Qualified
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FAQs;