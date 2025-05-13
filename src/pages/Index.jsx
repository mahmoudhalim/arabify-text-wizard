
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { processArabicText } from "@/services/llmService";
import TaskRadioGroup from "@/components/TaskRadioGroup";
import ArabicTextInput from "@/components/ArabicTextInput";
import ResultDisplay from "@/components/ResultDisplay";

const Index = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState("diacritization");
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

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
      const { result } = await processArabicText(text, task);
      setResult(result);
      toast({
        title: "تمت المعالجة بنجاح",
        description: "تم معالجة النص بنجاح",
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
    <div className="min-h-screen arabic-pattern-bg">
      <div className="container py-8">
        <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-arabicBlue arabic-text">
              معالج النصوص العربية
            </h1>
            <p className="text-lg text-muted-foreground">
              أداة لتحليل النصوص العربية باستخدام الذكاء الاصطناعي
            </p>
          </div>

          <div className="bg-card shadow-lg rounded-lg p-6 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <TaskRadioGroup
                value={task}
                onChange={handleTaskChange}
              />
              
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
            </form>
          </div>
          
          <footer className="text-center text-sm text-muted-foreground">
            <p>© 2025 معالج النصوص العربية - جميع الحقوق محفوظة</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
