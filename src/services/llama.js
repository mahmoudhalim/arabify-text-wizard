
import Groq from "groq-sdk";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "demo-key";
const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });


async function getLlamaResponse(prompt) {
  try {
    // Check if we have a valid API key
    if (!GROQ_API_KEY || GROQ_API_KEY === "demo-key") {
      console.log("No GROQ API key provided, returning demo response");
      return generateDemoResponse(prompt);
    }
    
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
  } catch (error) {
    console.error("Error getting Llama response:", error);
    return generateDemoResponse(prompt);
  }
}

// Function to generate demo responses for preview mode
const generateDemoResponse = (query) => {
  if (query.includes("تشكيل")) {
    return "هَذَا نَصٌّ عَرَبِيٌّ مُشَكَّلٌ لِلْعَرْضِ التَّجْرِيبِيِّ (مِنْ لَامَا)";
  } else if (query.includes("اعرب")) {
    return "إعراب الجملة (من لاما):\n\nهَذَا: مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.\nنَصٌّ: خبر مرفوع وعلامة رفعه الضمة الظاهرة على آخره.";
  } else if (query.includes("تصحيح")) {
    return "الجملة المصححة (من لاما): هذا نص عربي صحيح\n\nالأخطاء المصححة:\n- كلمة 'النص' تم تغييرها إلى 'نص'";
  }
  return "نموذج عرض تجريبي من لاما - يرجى إضافة مفتاح API للاستخدام الكامل";
};

export { getLlamaResponse };
