import React from "react";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface QuickActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: LucideIcon;
  iconColor: string;
  buttonColor: string;
  iconBgColor: string;
  onClick?: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  buttonText,
  icon: Icon,
  iconColor,
  buttonColor,
  iconBgColor,
  onClick,
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 hover:shadow-md ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      <div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform hover:scale-105"
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3
          className={`font-bold text-base mb-1.5 ${
            isDark ? "text-white" : "text-[#000640]"
          }`}
        >
          {title}
        </h3>
        <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className="w-full py-2.5 px-4 rounded-xl text-white font-medium text-xs transition-all duration-200 hover:opacity-90 active:scale-98 shadow-xs"
        style={{ backgroundColor: buttonColor }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default QuickActionCard;
