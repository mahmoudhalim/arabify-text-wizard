import React, { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ArabicTextInput = ({
  value,
  onChange,
  isProcessing,
  maxHeight = 350,
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      const scrollHeight = textareaRef.current.scrollHeight;

      if (scrollHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = "auto"; 
      } else {
        textareaRef.current.style.height = `${scrollHeight}px`;
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [value]);

  return (
    <div className="space-y-2 rtl">
      <Label
        htmlFor="arabic-text"
        className="text-lg font-bold text-arabicBlue"
      >
        أدخل النص العربي:
      </Label>
      <Textarea
        ref={textareaRef}
        id="arabic-text"
        placeholder="اكتب النص العربي هنا..."
        value={value}
        onChange={onChange}
        className="min-h-[7rem] arabic-text text-lg w-full resize-none"
        disabled={isProcessing}
        dir="rtl"
      />
    </div>
  );
};

export default ArabicTextInput;
