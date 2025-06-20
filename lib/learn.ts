import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function learn(topic: string) {
  const prompt = `Generate a detailed information on ${topic}. The response should too verbose give every information on topic in detail. 
}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}
