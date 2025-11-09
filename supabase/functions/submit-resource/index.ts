import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.27.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ResourcePayload {
  title: string;
  url: string;
  thumbnail_url?: string | null;
  description?: string | null;
  category?: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("submit-resource function invoked", new Date().toISOString());

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }

  try {
    const body = await req.json();
    const data = body as ResourcePayload;

    if (!data || !data.title || !data.url) {
      return new Response(JSON.stringify({ error: "Missing required fields: title and url" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const insertPayload = {
      title: data.title,
      url: data.url,
      thumbnail_url: data.thumbnail_url ?? null,
      description: data.description ?? null,
      category: data.category ?? null,
    };

    const { data: insertRes, error } = await supabaseClient.from("resources").insert([insertPayload]);

    if (error) {
      console.error("Error inserting resource:", error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    return new Response(JSON.stringify({ success: true, record: insertRes }), { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } });
  } catch (err: any) {
    console.error("Unexpected error in submit-resource:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } });
  }
};

serve(handler);
