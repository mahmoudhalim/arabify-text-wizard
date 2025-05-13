
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ArabicTextInput = ({ value, onChange, isProcessing }) => {
  return (
    <div className="space-y-2 rtl">
      <Label htmlFor="arabic-text" className="text-lg font-bold text-arabicBlue">
        أدخل النص العربي:
      </Label>
      <Textarea
        id="arabic-text"
        placeholder="اكتب النص العربي هنا..."
        value={value}
        onChange={onChange}
        className="min-h-32 arabic-text text-lg"
        disabled={isProcessing}
        dir="rtl"
      />
    </div>
  );
};

export default ArabicTextInput;
