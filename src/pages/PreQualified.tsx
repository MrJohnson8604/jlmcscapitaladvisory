import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const PreQualified = () => {
  useEffect(() => {
    // Load the form embed script if it hasn't been loaded yet
    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Get Pre-Qualified | JLMCS Funding</title>
        <meta 
          name="description" 
          content="Get pre-qualified for real estate financing. Fill out our intake form to get matched with the right lender for your deal." 
        />
        <meta property="og:title" content="Get Pre-Qualified | JLMCS Funding" />
        <meta property="og:description" content="Get pre-qualified for real estate financing. Fill out our intake form to get matched with the right lender for your deal." />
      </Helmet>
      
      <div className="w-full bg-slate-50">
        <section className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-display font-bold mb-4 text-primary">
                  Get Pre-Qualified
                </h1>
                <p className="text-lg text-muted-foreground">
                  Fill out our intake form to get matched with the right lender for your deal.
                </p>
              </div>
              <Card className="rounded-xl shadow-soft mb-12">
                <CardContent className="p-8">
                  <div style={{ width: '100%', minHeight: '1600px', height: 'auto' }}>
                    <iframe
                      src="https://api.leadconnectorhq.com/widget/form/ULAT3WIK2EAt13xnmM3Y"
                      style={{ width: '100%', minHeight: '1600px', height: '100%', border: 'none', borderRadius: '3px' }}
                      id="inline-ULAT3WIK2EAt13xnmM3Y"
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="JLMCS Funding Intake Form"
                      data-height="undefined"
                      data-layout-iframe-id="inline-ULAT3WIK2EAt13xnmM3Y"
                      data-form-id="ULAT3WIK2EAt13xnmM3Y"
                      title="JLMCS Funding Intake Form"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Large spacer to push footer down below the form */}
        <div className="h-48 bg-slate-50"></div>
      </div>
    </>
  );
};

export default PreQualified;
