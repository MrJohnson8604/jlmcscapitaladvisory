import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuickIntakeData {
  fullName: string;
  bestContact: string;
  propertyState: string;
  dealType: string;
  estimatedLoanAmount: string;
  timelineToClose: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("submit-quick-intake function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    // Initialize Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }
    const resend = new Resend(resendApiKey);

    // Parse request data
    const formData: QuickIntakeData = await req.json();
    console.log("Received quick intake data:", formData);

    // Detect contact type
    const detectContactType = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? 'Email' : 'Phone';
    };

    // Format deal type for display
    const formatDealType = (dealType: string) => {
      const types: { [key: string]: string } = {
        'Fix & Flip': '🏠 Fix & Flip',
        'DSCR Rental': '🏢 DSCR Rental',
        'New Construction': '🏗️ New Construction',
        'Commercial Bridge': '🏦 Commercial Bridge',
        'Other': '📋 Other'
      };
      return types[dealType] || `📋 ${dealType}`;
    };

    // Format timeline for display
    const formatTimeline = (timeline: string) => {
      const timelines: { [key: string]: string } = {
        'ASAP': '⚡ ASAP',
        '7–14 days': '📅 7-14 days',
        '15–30 days': '📅 15-30 days',
        '30+ days': '📅 30+ days'
      };
      return timelines[timeline] || `📅 ${timeline}`;
    };

    // Send email notification to business owner
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          ⚡ New Quick Deal Intake
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">👤 Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0; font-size: 16px; font-weight: bold;">${formData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Contact:</td>
              <td style="padding: 8px 0;">
                ${detectContactType(formData.bestContact) === 'Email' 
                  ? `<a href="mailto:${formData.bestContact}" style="color: #f59e0b; text-decoration: none; font-weight: bold;">${formData.bestContact}</a>`
                  : `<a href="tel:${formData.bestContact}" style="color: #f59e0b; text-decoration: none; font-weight: bold;">${formData.bestContact}</a>`
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Contact Type:</td>
              <td style="padding: 8px 0;">${detectContactType(formData.bestContact)}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">💼 Deal Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Deal Type:</td>
              <td style="padding: 8px 0; font-size: 16px;">${formatDealType(formData.dealType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Property State:</td>
              <td style="padding: 8px 0; font-size: 16px;">📍 ${formData.propertyState}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Loan Amount:</td>
              <td style="padding: 8px 0; color: #059669; font-weight: bold; font-size: 18px;">
                💰 $${formData.estimatedLoanAmount}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Timeline:</td>
              <td style="padding: 8px 0; font-size: 16px; color: #dc2626; font-weight: bold;">
                ${formatTimeline(formData.timelineToClose)}
              </td>
            </tr>
          </table>
        </div>

        ${(formData.utmSource || formData.utmMedium || formData.utmCampaign) ? `
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">📊 Marketing Data</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${formData.utmSource ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 120px;">Source:</td>
              <td style="padding: 4px 0;">${formData.utmSource}</td>
            </tr>` : ''}
            ${formData.utmMedium ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Medium:</td>
              <td style="padding: 4px 0;">${formData.utmMedium}</td>
            </tr>` : ''}
            ${formData.utmCampaign ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Campaign:</td>
              <td style="padding: 4px 0;">${formData.utmCampaign}</td>
            </tr>` : ''}
            ${formData.utmTerm ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Term:</td>
              <td style="padding: 4px 0;">${formData.utmTerm}</td>
            </tr>` : ''}
            ${formData.utmContent ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Content:</td>
              <td style="padding: 4px 0;">${formData.utmContent}</td>
            </tr>` : ''}
          </table>
        </div>` : ''}

        <div style="text-align: center; margin: 30px 0;">
          ${detectContactType(formData.bestContact) === 'Email' 
            ? `<a href="mailto:${formData.bestContact}" 
                 style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">
                📧 Email ${formData.fullName}
              </a>`
            : `<a href="tel:${formData.bestContact}" 
                 style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">
                📞 Call ${formData.fullName}
              </a>`
          }
        </div>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          Submitted on ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit',
            timeZoneName: 'short'
          })}
        </p>
      </div>
    `;

    const { error: emailError } = await resend.emails.send({
      from: "JLMCS Quick Intake <onboarding@resend.dev>",
      to: ["chris.johnson@jlmcsfunding.com"],
      subject: `⚡ Quick Intake: ${formData.fullName} - ${formData.dealType} ($${formData.estimatedLoanAmount}) - ${formData.timelineToClose}`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      throw new Error(`Email error: ${emailError.message}`);
    } else {
      console.log("Email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Quick intake submitted successfully" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in submit-quick-intake function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);