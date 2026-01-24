import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Clock } from "lucide-react";
import { FormIframe } from "@/components/FormIframe";

const Contact = () => {

  return (
    <>
      <Helmet>
        <title>Contact Us | JLMCS Funding</title>
        <meta 
          name="description" 
          content="Contact JLMCS Funding to discuss your financing needs. Schedule a call or send us a message for a same-day response." 
        />
        <meta property="og:title" content="Contact Us | JLMCS Funding" />
        <meta property="og:description" content="Contact JLMCS Funding to discuss your financing needs. Schedule a call or send us a message for a same-day response." />
      </Helmet>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Ready to discuss your financing needs? We respond same-day on weekdays.
              </p>
              <Button className="btn-hero">
                <a 
                  href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 text-primary">
                  Send Us a Message
                </h2>
                <Card className="shadow-medium">
                  <CardContent className="p-6">
                    <FormIframe height="800px" />
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="contact">
                <h2 className="text-3xl font-display font-bold mb-6 text-primary">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 text-primary">
                        <Phone className="h-5 w-5" />
                        <span>Schedule a Call</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Book a direct consultation to discuss your specific financing needs.
                      </p>
                      <Button className="btn-amber">
                        <a 
                          href="https://calendly.com/chris-johnson-jlmcsfunding/investor-consulting-call"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book Consultation
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 text-primary">
                        <Mail className="h-5 w-5" />
                        <span>Direct Email</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">
                        For direct inquiries and document submission:
                      </p>
                      <a 
                        href="mailto:chris.johnson@jlmcsfunding.com"
                        className="text-amber hover:text-amber-hover font-medium"
                      >
                        chris.johnson@jlmcsfunding.com
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 text-primary">
                        <Clock className="h-5 w-5" />
                        <span>Response Time</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        We respond same-day on weekdays. For urgent matters, scheduling a call is the fastest option.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Pre-Qualification */}
                <Card className="mt-6 border-amber/20 bg-amber/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-display font-semibold mb-4 text-amber">
                      Quick Pre-Qualification
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Already know your numbers? Get pre-qualified instantly with our online form.
                    </p>
                    <Button className="btn-amber">
                      <a 
                        href="https://form.jotform.com/251521627688060"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Pre-Qualified
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;