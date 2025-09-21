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

    // Send email notification
    const emailHtml = `
      <h2>New Referral Submission</h2>
      
      <h3>Referrer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.yourName}</li>
        <li><strong>Email:</strong> ${formData.yourEmail}</li>
        ${formData.yourPhone ? `<li><strong>Phone:</strong> ${formData.yourPhone}</li>` : ''}
      </ul>

      <h3>Lead Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.leadName}</li>
        <li><strong>Contact:</strong> ${formData.leadContact}</li>
      </ul>

      <h3>Deal Information:</h3>
      <ul>
        ${formData.dealType ? `<li><strong>Deal Type:</strong> ${formData.dealType}</li>` : ''}
        ${formData.propertyState ? `<li><strong>Property State:</strong> ${formData.propertyState}</li>` : ''}
        ${formData.loanAmount ? `<li><strong>Estimated Loan Amount:</strong> $${parseFloat(formData.loanAmount).toLocaleString()}</li>` : ''}
        ${formData.notes ? `<li><strong>Notes:</strong> ${formData.notes}</li>` : ''}
      </ul>

      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

    const { error: emailError } = await resend.emails.send({
      from: "JLMCS Capital Advisory <onboarding@resend.dev>",
      to: [formData.yourEmail], // You can change this to your business email
      subject: "New Referral Submission - JLMCS Capital Advisory",
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