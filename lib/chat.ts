import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function chat(topic:string) {
    const prompt = `Generate 10 multiple-choice questions on ${topic}. The response should be a JSON array. Each object in the array should follow this format:{
  "question": "Your question?",
  "options": {
    "a": "Option A",
    "b": "Option B",
    "c": "Option C",
    "d": "Option D"
  },
  "correct": "a"  // The key of the correct option
}`
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
}
