import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to send welcome email");
    const { to, name }: EmailRequest = await req.json();
    
    console.log(`Sending welcome email to ${to} for ${name}`);
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "The Campaign to Abolish Dyslexia <hello@dysdys.com>",
        to: [to],
        subject: "Welcome to The Campaign to Abolish Dyslexia",
        html: `
          <h1>Welcome ${name}!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you on board.</p>
          <p>We'll keep you updated on our progress and let you know when we launch.</p>
          <br/>
          <p>Best regards,</p>
          <p>The Campaign to Abolish Dyslexia Team</p>
        `,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Email sent successfully:', data);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      console.error('Error sending email:', error);
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);