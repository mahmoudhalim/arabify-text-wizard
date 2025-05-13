
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ResultDisplay = ({ result, isLoading, task }) => {
  const getTitleByTask = () => {
    switch (task) {
      case "diacritization":
        return "نتيجة التشكيل";
      case "erab":
        return "نتيجة الإعراب";
      case "correctness":
        return "نتيجة التصحيح";
      default:
        return "النتيجة";
    }
  };

  return (
    <div className="space-y-2 rtl">
      <h3 className="text-lg font-bold text-arabicBlue">{getTitleByTask()}</h3>
      <Card className="border-2 border-arabicGold/30">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          ) : result ? (
            <div className="arabic-text text-lg whitespace-pre-wrap">{result}</div>
          ) : (
            <p className="text-muted-foreground text-center arabic-text">
              ستظهر النتيجة هنا بعد المعالجة
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultDisplay;
