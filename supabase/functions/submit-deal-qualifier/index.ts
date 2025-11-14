// Supabase Edge Function: submit-deal-qualifier
// Run: supabase functions deploy submit-deal-qualifier

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

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

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const AIRTABLE_BASE_ID = Deno.env.get("AIRTABLE_BASE_ID");
const AIRTABLE_TABLE_NAME = Deno.env.get("AIRTABLE_TABLE_NAME");

function corsHeaders(extra: Record<string, string> = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization,Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Content-Type": "application/json",
    ...extra,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders(),
    });
  }

  try {
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
      return new Response(JSON.stringify({ error: "Airtable env not set" }), {
        status: 500,
        headers: corsHeaders(),
      });
    }

    const body: DealQualifierData = await req.json();
    // Basic validation
    if (!body.email && !body.phone) {
      return new Response(JSON.stringify({ error: "Missing contact info" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const timestamp = body.timestamp || new Date().toISOString();
    const fields = {
      Name: body.name || "",
      Email: body.email || "",
      Phone: body.phone || "",
      Experience: body.experience || "",
      "Deal Type": body.dealType || "",
      "Liquid Reserves": body.liquidReserves || "",
      "Credit Band": body.creditBand || "",
      "Close Timeline": body.closeTimeline || "",
      "Lead Status": body.leadStatus || "",
      "Disqualification Reason": body.disqReason || "",
      "Source Page": body.pageURL || "",
      "Interest Type": body.interestType || "",
      "Submitted At": timestamp,
    };

    // Airtable API endpoint
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME,
    )}`;

    const airtableRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }] }),
    });

    const text = await airtableRes.text();
    if (!airtableRes.ok) {
      console.error("Airtable error:", airtableRes.status, text);
      return new Response(JSON.stringify({
        error: "Airtable insert failed",
        status: airtableRes.status,
        body: text,
      }), {
        status: 502,
        headers: corsHeaders(),
      });
    }

    const json = JSON.parse(text);
    return new Response(JSON.stringify({ success: true, airtable: json }), {
      headers: corsHeaders(),
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
});
