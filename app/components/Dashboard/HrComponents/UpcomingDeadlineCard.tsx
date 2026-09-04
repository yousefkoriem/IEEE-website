import React from "react";
import { Clock } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface UpcomingDeadlineCardProps {
  daysLeft?: number;
  pendingMembers?: number;
}

export const UpcomingDeadlineCard: React.FC<UpcomingDeadlineCardProps> = ({
  daysLeft = 4,
  pendingMembers = 45,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 ${
        isDark
          ? "bg-[#1C180C] border-[#3D3216]"
          : "bg-[#FFFBEB] border-[#FDE68A] shadow-xs"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-[#D97706]" />
        <span className="text-xs font-semibold text-[#D97706]">
          Upcoming Deadline
        </span>
      </div>

      <h4 className={`font-bold text-sm mb-1 ${isDark ? "text-amber-200" : "text-[#92400E]"}`}>
        Cycle ends in {daysLeft} Days
      </h4>

      <p className="text-xs text-[#B45309]">
        {pendingMembers} members still pending
      </p>
    </div>
  );
};

export default UpcomingDeadlineCard;
