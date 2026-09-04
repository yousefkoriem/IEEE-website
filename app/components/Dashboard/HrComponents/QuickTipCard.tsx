import React from "react";
import { AlertCircle } from "lucide-react";

interface QuickTipCardProps {
  tip?: string;
}

export const QuickTipCard: React.FC<QuickTipCardProps> = ({
  tip = "Complete pending evaluations before the deadline to ensure complete cycle data.",
}) => {
  return (
    <div
      className="p-5 rounded-2xl text-white shadow-md transition-all duration-200 hover:shadow-lg"
      style={{
        background: "linear-gradient(135deg, #5A10A5 0%, #4460EF 100%)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-white/90 shrink-0" />
        <h3 className="font-bold text-sm text-white">Quick Tip</h3>
      </div>

      <p className="text-xs text-white/90 leading-relaxed font-normal">
        {tip}
      </p>
    </div>
  );
};

export default QuickTipCard;
