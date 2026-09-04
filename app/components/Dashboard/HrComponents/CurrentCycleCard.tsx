import React from "react";
import { Maximize2, Eye, X } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface CurrentCycleCardProps {
  title?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  daysLeft?: number;
  evaluatedCount?: number;
  totalMembers?: number;
  onViewCycle?: () => void;
  onCloseCycle?: () => void;
}

export const CurrentCycleCard: React.FC<CurrentCycleCardProps> = ({
  title = "August 2026 Evaluation",
  status = "Open",
  startDate = "Aug 1, 2026",
  endDate = "Aug 31, 2026",
  daysLeft = 26,
  evaluatedCount = 120,
  totalMembers = 165,
  onViewCycle,
  onCloseCycle,
}) => {
  const { isDark } = useTheme();
  const percentage = Math.round((evaluatedCount / totalMembers) * 100);

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase block mb-1">
            Current Evaluation Cycle
          </span>
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#000640]"}`}>
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#BBF7D0] text-[#09800F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#09800F] mr-1.5 inline-block" />
            {status}
          </span>
        </div>
      </div>

      {/* Date metadata row */}
      <div className="grid grid-cols-3 gap-4 py-3 border-y border-gray-100 mb-5 dark:border-[#232D42]">
        <div>
          <span className="text-[11px] text-[#9CA3AF] uppercase block mb-1 font-medium">
            Start Date
          </span>
          <span className={`text-xs font-semibold ${isDark ? "text-gray-200" : "text-[#000640]"}`}>
            {startDate}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-[#9CA3AF] uppercase block mb-1 font-medium">
            End Date
          </span>
          <span className="text-xs font-semibold text-[#EF4444]">
            {endDate}
          </span>
        </div>
        <div>
          <span className="text-[11px] text-[#9CA3AF] uppercase block mb-1 font-medium">
            Days Left
          </span>
          <span className="text-xs font-semibold text-[#FFC107]">
            {daysLeft} Days
          </span>
        </div>
      </div>

      {/* Progress section */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className={`font-semibold ${isDark ? "text-gray-300" : "text-[#000640]"}`}>
            Overall Progress
          </span>
          <span className="font-bold text-[#4460EF]">
            {percentage}% — {evaluatedCount} / {totalMembers} Members Evaluated
          </span>
        </div>

        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden dark:bg-[#1E2738]">
          <div
            className="h-full bg-[#4460EF] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Actions and expand button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onViewCycle}
            className="px-5 py-2.5 rounded-xl bg-[#5A10A5] hover:bg-[#4A0D88] text-white font-medium text-xs flex items-center gap-2 transition-all shadow-xs"
          >
            <Eye className="w-4 h-4" />
            <span>View Cycle</span>
          </button>

          <button
            onClick={onCloseCycle}
            className="px-5 py-2.5 rounded-xl border border-[#EF4444] text-[#EF4444] hover:bg-red-50 dark:hover:bg-red-950/20 font-medium text-xs flex items-center gap-2 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Close Cycle</span>
          </button>
        </div>

        <button
          type="button"
          className="p-2 text-[#9CA3AF] hover:text-[#5A10A5] transition-colors"
          title="Expand"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CurrentCycleCard;
