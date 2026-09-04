import React from "react";
import { useTheme } from "~/hooks/useTheme";

interface NotificationItem {
  id: string;
  text: string;
  dotColor: string;
}

interface NotificationsCardProps {
  notifications?: NotificationItem[];
}

export const NotificationsCard: React.FC<NotificationsCardProps> = ({
  notifications = [
    { id: "1", text: "5 members still pending evaluation", dotColor: "#EF4444" },
    { id: "2", text: "2 evaluations are overdue", dotColor: "#FFC107" },
    { id: "3", text: "HR Committee: 100% complete", dotColor: "#09800F" },
  ],
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      <h3 className={`font-bold text-sm mb-4 ${isDark ? "text-white" : "text-[#000640]"}`}>
        Notifications
      </h3>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.dotColor }}
            />
            <span className={`text-xs ${isDark ? "text-gray-300" : "text-[#4B5563]"}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsCard;
