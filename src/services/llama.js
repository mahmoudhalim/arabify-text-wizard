import Groq from "groq-sdk";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });


async function getLlamaResponse(prompt) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
    model: "gemma2-9b-it",
    // model: "llama-3.3-70b-versatile",
  });
  return response.choices[0].message.content || "";
}

export { getLlamaResponse };