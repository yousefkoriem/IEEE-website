import React from "react";
import { useTheme } from "~/hooks/useTheme";

interface CommitteeProgressItem {
  name: string;
  percentage: number;
  color: string;
}

interface CommitteeProgressCardProps {
  committees?: CommitteeProgressItem[];
}

export const CommitteeProgressCard: React.FC<CommitteeProgressCardProps> = ({
  committees = [
    { name: "HR Committee", percentage: 100, color: "#09800F" },
    { name: "Web Committee", percentage: 82, color: "#4460EF" },
    { name: "UI/UX Committee", percentage: 74, color: "#5A10A5" },
    { name: "Power Committee", percentage: 58, color: "#FFC107" },
  ],
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      <h3 className={`font-bold text-base mb-6 ${isDark ? "text-white" : "text-[#000640]"}`}>
        Committee Progress
      </h3>

      <div className="space-y-6">
        {committees.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className={`font-bold ${isDark ? "text-gray-200" : "text-[#000640]"}`}>
                {item.name}
              </span>
              <span className="font-extrabold" style={{ color: item.color }}>
                {item.percentage}%
              </span>
            </div>

            <div className="w-full h-2 bg-gray-100 dark:bg-[#1E2738] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteeProgressCard;
