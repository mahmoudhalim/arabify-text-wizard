
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { processArabicText } from "@/services/llmService";
import TaskRadioGroup from "@/components/TaskRadioGroup";
import ArabicTextInput from "@/components/ArabicTextInput";
import ResultDisplay from "@/components/ResultDisplay";
import { getGeminiResponse } from "../services/gemini";
import { getLlamaResponse } from "../services/llama";
const Index = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState("diacritization");
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const TASK_PROMPTS = {
    diacritization:
      " قم بتشكيل الجملة بناء على القواعد الاعرابية لكن لا تعرب الجملة فقط اكتب الجملة مشكلة. ولا تكتب اي جمله اخرى:\n",
    erab: " اعرب الجملة الاتية بالتفصيل: اكتب الاعراب فقط لا تكتب جمل اخري \n",
    correctness:
      "قم بتصحيح الاخطاء اللغوية بناء على القواعد اللغوية و الاعرابية ولا تشكل الجملة ولا تعرب الجملة ثم اكتب الجملة مصححه والكلمات الخاطئة وتصحيحها",
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTaskChange = (value) => {
    setTask(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال نص للمعالجة",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const prompt = `${TASK_PROMPTS[task]} "${text}"`
      const geminiResult = await getGeminiResponse(prompt)
      // const llamaResult = await getLlamaResponse(prompt);
      // console.log(llamaResult);
      setResult(geminiResult);
      toast({
        title: "تمت معالجة النص بنجاح",
        description: "",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء معالجة النص",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen arabic-pattern-bg flex flex-col">
      <div className="container py-8 flex-grow">
        <div className="flex flex-col space-y-8 max-w-4xl mx-auto h-full">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-arabicBlue arabic-text">
              معالج النصوص العربية
            </h1>
            <p className="text-lg text-muted-foreground">
              أداة لتحليل النصوص العربية باستخدام الذكاء الاصطناعي
            </p>
          </div>

          <div className="bg-card shadow-lg rounded-lg p-6 animate-fade-in flex-grow flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
              <TaskRadioGroup
                value={task}
                onChange={handleTaskChange}
              />
              
              <div className="flex-grow flex flex-col space-y-6">
                <ArabicTextInput
                  value={text}
                  onChange={handleTextChange}
                  isProcessing={isProcessing}
                />
                
                <div className="rtl">
                  <Button
                    type="submit"
                    className="bg-arabicGold hover:bg-arabicGold/80 text-arabicBlue font-bold text-lg py-3 w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "جاري المعالجة..." : "معالجة النص"}
                  </Button>
                </div>
                
                <ResultDisplay
                  result={result}
                  isLoading={isProcessing}
                  task={task}
                />
              </div>
            </form>
          </div>
          
          <footer className="text-center text-sm text-muted-foreground mt-auto">
            <p>© 2025 معالج النصوص العربية - جميع الحقوق محفوظة</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
