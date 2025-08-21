import React, { useState } from 'react';
import { Send, Activity, Mic, MicOff, MessageSquare } from 'lucide-react';
import { useWebhook } from '../hooks/useWebhook';

const WebhookTester: React.FC = () => {
  const [testData, setTestData] = useState('{"message": "Test webhook data"}');
  const [selectedEvent, setSelectedEvent] = useState('voice_interaction_started');
  
  const {
    sendWebhook,
    sendVoiceInteractionStart,
    sendVoiceInteractionEnd,
    sendAgentResponse,
    sendSystemStatus,
    isLoading,
    error,
    lastResponse
  } = useWebhook();

  const handleSendWebhook = async () => {
    try {
      const data = JSON.parse(testData);
      
      switch (selectedEvent) {
        case 'voice_interaction_started':
          await sendVoiceInteractionStart(data);
          break;
        case 'voice_interaction_ended':
          await sendVoiceInteractionEnd(data);
          break;
        case 'agent_response':
          await sendAgentResponse(data);
          break;
        case 'system_status':
          await sendSystemStatus(data);
          break;
        default:
          await sendWebhook({
            event: selectedEvent,
            data,
            timestamp: new Date().toISOString()
          });
      }
    } catch (err) {
      console.error('Failed to parse JSON or send webhook:', err);
    }
  };

  const eventOptions = [
    { value: 'voice_interaction_started', label: 'Voice Started', icon: <Mic className="w-4 h-4" /> },
    { value: 'voice_interaction_ended', label: 'Voice Ended', icon: <MicOff className="w-4 h-4" /> },
    { value: 'agent_response', label: 'Agent Response', icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'system_status', label: 'System Status', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-lime-500/20 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Send className="w-5 h-5 text-lime-400" />
        <h3 className="text-lime-300 font-orbitron font-semibold text-sm">Webhook Tester</h3>
      </div>
      
      <div className="space-y-4">
        {/* Event Type Selector */}
        <div>
          <label className="block text-gray-300 text-xs mb-2">Event Type</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-slate-800/50 border border-lime-500/20 rounded px-3 py-2 text-gray-300 text-sm focus:border-lime-400/40 focus:outline-none"
          >
            {eventOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Test Data Input */}
        <div>
          <label className="block text-gray-300 text-xs mb-2">Test Data (JSON)</label>
          <textarea
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            className="w-full bg-slate-800/50 border border-lime-500/20 rounded px-3 py-2 text-gray-300 text-sm focus:border-lime-400/40 focus:outline-none font-mono"
            rows={3}
            placeholder='{"message": "Test data"}'
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendWebhook}
          disabled={isLoading}
          className="w-full bg-lime-500/20 hover:bg-lime-500/30 border border-lime-500/40 text-lime-300 px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{isLoading ? 'Enviando...' : 'Enviar Webhook'}</span>
        </button>

        {/* Status Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded p-3">
            <p className="text-red-300 text-xs">Erro: {error}</p>
          </div>
        )}

        {lastResponse && (
          <div className="bg-lime-500/20 border border-lime-500/40 rounded p-3">
            <p className="text-lime-300 text-xs font-semibold mb-1">Última Resposta:</p>
            <pre className="text-gray-300 text-xs overflow-x-auto">
              {JSON.stringify(lastResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookTester;