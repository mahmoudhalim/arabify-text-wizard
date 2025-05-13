import { GoogleGenAI } from "@google/genai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const gemini = new GoogleGenAI({
  apiKey: API_KEY,
});

const getGeminiResponse = async (query) => {
  const response = await gemini.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${query}`,
  });
  return response.candidates[0].content.parts[0].text;
}

export { getGeminiResponse }
 