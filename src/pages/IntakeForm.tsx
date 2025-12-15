import { useEffect } from "react";

const IntakeForm = () => {
  useEffect(() => {
    // Load the form embed script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              JLMCS Funding Intake Form
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete the form below to get pre-qualified for your funding needs.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-soft p-4 sm:p-6">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/oSYoEF3PxzTADQvCoaKd"
              style={{ width: "100%", height: "3573px", border: "none", borderRadius: "3px" }}
              id="inline-oSYoEF3PxzTADQvCoaKd"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="JLMCS Funding Intake Form"
              data-height="3573"
              data-layout-iframe-id="inline-oSYoEF3PxzTADQvCoaKd"
              data-form-id="oSYoEF3PxzTADQvCoaKd"
              title="JLMCS Funding Intake Form"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;
