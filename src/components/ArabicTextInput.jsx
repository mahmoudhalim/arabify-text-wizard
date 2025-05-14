
import React, { useRef, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import CameraDialog from "./CameraDialog";

const ArabicTextInput = ({
  value,
  onChange,
  isProcessing,
  maxHeight = 350,
}) => {
  const textareaRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

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

  const handleTextExtracted = (text) => {
    if (text && onChange) {
      // Create a synthetic event object to match the onChange pattern
      const event = {
        target: {
          value: text
        }
      };
      onChange(event);
    }
  };

  return (
    <div className="space-y-2 rtl">
      <div className="flex justify-between items-center">
        <Label
          htmlFor="arabic-text"
          className="text-lg font-bold text-arabicBlue"
        >
          أدخل النص العربي:
        </Label>
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={() => setIsCameraOpen(true)}
          disabled={isProcessing}
          className="flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          <span>التقاط صورة</span>
        </Button>
      </div>
      
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
      
      <CameraDialog 
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onTextExtracted={handleTextExtracted}
      />
    </div>
  );
};

export default ArabicTextInput;
