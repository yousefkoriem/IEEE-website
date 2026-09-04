import React from "react";
import { Target, Play } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface TodaysGoalCardProps {
  completed?: number;
  total?: number;
  onAction?: () => void;
}

export const TodaysGoalCard: React.FC<TodaysGoalCardProps> = ({
  completed = 18,
  total = 25,
  onAction,
}) => {
  const { isDark } = useTheme();
  const percentage = Math.round((completed / total) * 100);

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#5A10A514] flex items-center justify-center text-[#5A10A5] shrink-0">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-[#000640]"}`}>
            Today's Goal
          </h3>
          <p className="text-xs text-[#9CA3AF]">
            Evaluate {total} Members
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-xs">
          <span className={`font-medium ${isDark ? "text-gray-300" : "text-[#000640]"}`}>
            {completed} of {total} completed
          </span>
          <span className="font-bold text-[#4460EF]">{percentage}%</span>
        </div>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4460EF] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={onAction}
        className="w-full py-2 px-3 rounded-xl border border-[#4460EF] text-[#4460EF] hover:bg-[#4460EF14] font-medium text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>Evaluate Next Member</span>
      </button>
    </div>
  );
};

export default TodaysGoalCard;
