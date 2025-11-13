// supabase/functions/submit-deal-qualifier/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// This interface matches the data from deal-qualifier.js
interface DealQualifierData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  dealType: string;
  liquidReserves: string;
  creditBand: string;
  closeTimeline: string;
  leadStatus: string;
  disqReason?: string;
  pageURL: string;
  interestType?: string;
  timestamp?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization,Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const data: DealQualifierData = await req.json();

    const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
    const AIRTABLE_BASE_ID = Deno.env.get("AIRTABLE_BASE_ID");
    const AIRTABLE_TABLE_NAME = Deno.env.get("AIRTABLE_TABLE_NAME");

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      throw new Error("Airtable environment variables are not set.");
    }

    const airtableUrl = `https://api.airtable.com/v0/${encodeURIComponent(
      AIRTABLE_BASE_ID,
    )}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

    const airtableData = {
      records: [
        {
          fields: {
            Name: data.name,
            Email: data.email,
            Phone: data.phone,
            Experience: data.experience,
            "Deal Type": data.dealType,
            "Liquid Reserves": data.liquidReserves,
            "Credit Band": data.creditBand,
            "Close Timeline": data.closeTimeline,
            "Lead Status": data.leadStatus,
            "Disqualification Reason": data.disqReason || "",
            "Source Page": data.pageURL,
            "Interest Type": data.interestType || "",
            "Submitted At": new Date().toISOString(),
          },
        },
      ],
    };

    const airtableResponse = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtableData),
    });

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text();
      throw new Error(`Airtable API Error: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error caught in function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 500,
    });
  }
});
