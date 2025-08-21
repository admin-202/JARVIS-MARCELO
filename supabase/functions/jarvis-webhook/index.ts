interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Only accept POST requests for webhook
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse the webhook payload
    const payload: WebhookPayload = await req.json();
    
    console.log("Webhook received:", {
      event: payload.event,
      timestamp: payload.timestamp,
      data: payload.data
    });

    // Process different webhook events
    switch (payload.event) {
      case "voice_interaction_started":
        console.log("Voice interaction started:", payload.data);
        break;
        
      case "voice_interaction_ended":
        console.log("Voice interaction ended:", payload.data);
        break;
        
      case "agent_response":
        console.log("Agent response:", payload.data);
        break;
        
      case "system_status":
        console.log("System status update:", payload.data);
        break;
        
      default:
        console.log("Unknown event type:", payload.event);
    }

    // You can add database operations here if needed
    // Example: Store webhook data in Supabase database
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Webhook processed successfully",
        event: payload.event,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Webhook error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});