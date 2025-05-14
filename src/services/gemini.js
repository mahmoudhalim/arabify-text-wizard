
import { GoogleGenAI } from "@google/genai";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "demo-key";

const gemini = new GoogleGenAI({
  apiKey: API_KEY,
});

const getGeminiResponse = async (query) => {
  try {
    // Check if we have a valid API key
    if (!API_KEY || API_KEY === "demo-key") {
      console.log("No API key provided, returning demo response");
      return generateDemoResponse(query);
    }
    
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${query}`,
    });
    
    return response.candidates[0].content.parts[0].text || "";
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    return generateDemoResponse(query);
  }
}

// Function to generate demo responses for preview mode
const generateDemoResponse = (query) => {
  if (query.includes("تشكيل")) {
    return "هَذَا نَصٌّ عَرَبِيٌّ مُشَكَّلٌ لِلْعَرْضِ التَّجْرِيبِيِّ";
  } else if (query.includes("اعرب")) {
    return "إعراب الجملة:\n\nهَذَا: مبتدأ مرفوع وعلامة رفعه الضمة الظاهرة على آخره.\nنَصٌّ: خبر مرفوع وعلامة رفعه الضمة الظاهرة على آخره.";
  } else if (query.includes("تصحيح")) {
    return "الجملة المصححة: هذا نص عربي صحيح\n\nالأخطاء المصححة:\n- كلمة 'النص' تم تغييرها إلى 'نص'";
  }
  return "نموذج عرض تجريبي - يرجى إضافة مفتاح API للاستخدام الكامل";
};

export { getGeminiResponse }
