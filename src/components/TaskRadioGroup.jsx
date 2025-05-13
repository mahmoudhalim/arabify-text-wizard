
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const TaskRadioGroup = ({ value, onChange }) => {
  const tasks = [
    { id: "diacritization", name: "التشكيل", description: "إضافة علامات التشكيل للنص" },
    { id: "erab", name: "الإعراب", description: "تحليل إعراب الكلمات والجمل" },
    { id: "correctness", name: "التصحيح", description: "التحقق من صحة النص نحويًا" },
  ];

  return (
    <div className="space-y-3 rtl">
      <h3 className="text-lg font-medium text-arabicBlue">اختر المهمة:</h3>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-row justify-center gap-4"
      >
        {tasks.map((task) => (
          <div key={task.id} className="relative">
            <RadioGroupItem
              value={task.id}
              id={task.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={task.id}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border-2 border-muted p-3 hover:bg-accent/10 hover:text-accent-foreground",
                "peer-data-[state=checked]:border-arabicGold peer-data-[state=checked]:bg-arabicGold/10 peer-data-[state=checked]:text-arabicGold",
                "cursor-pointer transition-all text-center"
              )}
            >
              <div className="font-bold">{task.name}</div>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">{task.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TaskRadioGroup;
