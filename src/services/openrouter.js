import OpenAI from "openai";
const OPEN_ROUTER_API_KEY = import.meta.env.VITE_OPEN_ROUTER_API_KEY
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPEN_ROUTER_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-zero:free",
    messages: [
      {
        role: "user",
        content: "hi",
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();
