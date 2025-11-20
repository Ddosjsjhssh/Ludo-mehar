import { GoogleGenAI } from "@google/genai";
import { TableRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTableConfirmation = async (request: TableRequest): Promise<string> => {
  try {
    const activeOptions = Object.entries(request.options)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()) // simple camelCase to text
      .join(', ');

    const prompt = `
      You are a backend system for a Ludo Betting Bot called "Deep Night Ludo Club".
      Generate a formatted, text-based confirmation receipt for a user's table request.
      Style it like a Telegram bot message using emojis.

      Details:
      - Amount: ₹${request.amount}
      - Game Type: ${request.type}
      - Game Plus: ${request.gamePlus || '0'}
      - Options Selected: ${activeOptions || 'None'}

      Keep it brief, exciting, and professional. Include a "Table ID" (random 4 digits).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Table created successfully!";
  } catch (error) {
    console.error("Error generating confirmation:", error);
    return "Table request sent! (Offline Mode)";
  }
};