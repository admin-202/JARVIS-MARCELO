import { useState, useCallback } from 'react';

interface WebhookData {
  event: string;
  data: any;
  timestamp: string;
}

interface WebhookResponse {
  success: boolean;
  message: string;
  event?: string;
  timestamp?: string;
}

export const useWebhook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<WebhookResponse | null>(null);

  const sendWebhook = useCallback(async (webhookData: WebhookData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual Supabase project URL
      const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/jarvis-webhook`;
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: WebhookResponse = await response.json();
      setLastResponse(result);
      
      console.log('Webhook sent successfully:', result);
      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Webhook error:', errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper function to send specific event types
  const sendVoiceInteractionStart = useCallback((data: any) => {
    return sendWebhook({
      event: 'voice_interaction_started',
      data,
      timestamp: new Date().toISOString(),
    });
  }, [sendWebhook]);

  const sendVoiceInteractionEnd = useCallback((data: any) => {
    return sendWebhook({
      event: 'voice_interaction_ended',
      data,
      timestamp: new Date().toISOString(),
    });
  }, [sendWebhook]);

  const sendAgentResponse = useCallback((data: any) => {
    return sendWebhook({
      event: 'agent_response',
      data,
      timestamp: new Date().toISOString(),
    });
  }, [sendWebhook]);

  const sendSystemStatus = useCallback((data: any) => {
    return sendWebhook({
      event: 'system_status',
      data,
      timestamp: new Date().toISOString(),
    });
  }, [sendWebhook]);

  return {
    sendWebhook,
    sendVoiceInteractionStart,
    sendVoiceInteractionEnd,
    sendAgentResponse,
    sendSystemStatus,
    isLoading,
    error,
    lastResponse,
  };
};