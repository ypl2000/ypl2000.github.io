import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the client.
// Note: In a real production app, ensure the API key is not exposed to the client if possible, 
// or use a proxy. For this demo, we rely on process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing high traffic or a connection issue. Please try again later.";
  }
};
