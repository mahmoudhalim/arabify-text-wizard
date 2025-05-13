
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
    <div className="space-y-4 rtl">
      <h3 className="text-lg font-bold text-arabicBlue">اختر المهمة:</h3>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
                "flex flex-col items-center justify-between rounded-lg border-2 border-muted p-4 hover:bg-accent/10 hover:text-accent-foreground",
                "peer-data-[state=checked]:border-arabicGold peer-data-[state=checked]:bg-accent/20",
                "cursor-pointer transition-all"
              )}
            >
              <div className="mb-2 text-xl font-bold">{task.name}</div>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TaskRadioGroup;
