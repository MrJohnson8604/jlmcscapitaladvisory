import { useEffect } from "react";

interface FormIframeProps {
  className?: string;
  height?: string;
}

export const FormIframe = ({ className = "", height = "800px" }: FormIframeProps) => {
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
    <div className={className} style={{ width: '100%', height: height }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/ULAT3WIK2EAt13xnmM3Y"
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
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
  );
};
