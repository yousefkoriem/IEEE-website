import React from "react";
import { useTheme } from "~/hooks/useTheme";

interface CycleOverviewCardProps {
  title: string;
  value: string | number;
  subtext: string;
  numberColor: string;
  onClick?: () => void;
}

export const CycleOverviewCard: React.FC<CycleOverviewCardProps> = ({
  title,
  value,
  subtext,
  numberColor,
  onClick,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 ${
        onClick ? "cursor-pointer hover:border-purple-300 hover:shadow-xs" : ""
      } ${isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"}`}
    >
      <div>
        <span className="text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase block mb-2">
          {title}
        </span>
        <div
          className="text-3xl font-extrabold mb-1"
          style={{ color: numberColor }}
        >
          {value}
        </div>
      </div>
      <div className="text-xs text-[#9CA3AF] mt-2 font-medium">
        {subtext}
      </div>
    </div>
  );
};

export default CycleOverviewCard;
