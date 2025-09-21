import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReferralData {
  yourName: string;
  yourEmail: string;
  yourPhone?: string;
  leadName: string;
  leadContact: string;
  dealType?: string;
  propertyState?: string;
  loanAmount?: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("submit-referral function called");

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
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Initialize Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }
    const resend = new Resend(resendApiKey);

    // Parse request data
    const formData: ReferralData = await req.json();
    console.log("Received referral data:", formData);

    // Insert referral into database
    const { data: referral, error: dbError } = await supabase
      .from("referrals")
      .insert({
        your_name: formData.yourName,
        your_email: formData.yourEmail,
        your_phone: formData.yourPhone || null,
        lead_name: formData.leadName,
        lead_contact: formData.leadContact,
        deal_type: formData.dealType || null,
        property_state: formData.propertyState || null,
        loan_amount: formData.loanAmount ? parseFloat(formData.loanAmount) : null,
        notes: formData.notes || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    console.log("Referral saved to database:", referral.id);

    // Send email notification to business owner
    const formatDealType = (dealType: string) => {
      const types: { [key: string]: string } = {
        'fix_flip': 'Fix & Flip',
        'dscr_rental': 'DSCR Rental',
        'new_construction': 'New Construction',
        'commercial_bridge': 'Commercial Bridge'
      };
      return types[dealType] || dealType;
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          🎯 New Referral Submission
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">👤 Lead Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${formData.leadName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Contact:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${formData.leadContact}" style="color: #f59e0b; text-decoration: none;">
                  ${formData.leadContact}
                </a>
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">💼 Deal Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${formData.dealType ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Deal Type:</td>
              <td style="padding: 8px 0;">${formatDealType(formData.dealType)}</td>
            </tr>` : ''}
            ${formData.propertyState ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">State:</td>
              <td style="padding: 8px 0;">${formData.propertyState}</td>
            </tr>` : ''}
            ${formData.loanAmount ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Loan Amount:</td>
              <td style="padding: 8px 0; color: #059669; font-weight: bold;">
                $${parseFloat(formData.loanAmount).toLocaleString()}
              </td>
            </tr>` : ''}
          </table>
          ${formData.notes ? `
          <div style="margin-top: 15px;">
            <strong>Additional Notes:</strong>
            <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px; border-left: 4px solid #f59e0b;">
              ${formData.notes}
            </div>
          </div>` : ''}
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">🤝 Referred By</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${formData.yourName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${formData.yourEmail}" style="color: #f59e0b; text-decoration: none;">
                  ${formData.yourEmail}
                </a>
              </td>
            </tr>
            ${formData.yourPhone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">
                <a href="tel:${formData.yourPhone}" style="color: #f59e0b; text-decoration: none;">
                  ${formData.yourPhone}
                </a>
              </td>
            </tr>` : ''}
          </table>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${formData.leadContact}" 
             style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            📧 Contact Lead Now
          </a>
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
      from: "JLMCS Referral System <onboarding@resend.dev>",
      to: ["chris.johnson@jlmcsfunding.com"],
      subject: `🎯 New Referral: ${formData.leadName} - ${formData.dealType ? formatDealType(formData.dealType) : 'Deal'} ${formData.loanAmount ? `($${parseFloat(formData.loanAmount).toLocaleString()})` : ''}`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      // Don't throw here - referral was saved successfully
      console.log("Referral saved but email failed to send");
    } else {
      console.log("Email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Referral submitted successfully",
        referralId: referral.id 
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
    console.error("Error in submit-referral function:", error);
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