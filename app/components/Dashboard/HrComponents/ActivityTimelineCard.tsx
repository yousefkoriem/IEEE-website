import React from "react";
import { CheckCircle2, PlayCircle, FileEdit, UserCheck, RotateCw } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface TimelineActivity {
  id: string;
  text: string;
  time: string;
  icon: "check" | "play" | "edit" | "user" | "rotate";
  iconColor: string;
  iconBg: string;
}

interface TimelineGroup {
  day: string;
  activities: TimelineActivity[];
}

const mockGroups: TimelineGroup[] = [
  {
    day: "TODAY",
    activities: [
      {
        id: "1",
        text: "Ahmed completed an evaluation for Mona Ali",
        time: "14:32",
        icon: "check",
        iconColor: "#09800F",
        iconBg: "#09800F14",
      },
      {
        id: "2",
        text: "Sara started evaluation for Ziad Emad",
        time: "11:15",
        icon: "play",
        iconColor: "#4460EF",
        iconBg: "#4460EF14",
      },
    ],
  },
  {
    day: "YESTERDAY",
    activities: [
      {
        id: "3",
        text: "Sara updated evaluation feedback for Hana Samir",
        time: "16:44",
        icon: "edit",
        iconColor: "#5A10A5",
        iconBg: "#5A10A514",
      },
      {
        id: "4",
        text: "Nour marked 3 members as in-progress",
        time: "09:20",
        icon: "user",
        iconColor: "#17A2B8",
        iconBg: "#17A2B814",
      },
    ],
  },
  {
    day: "MONDAY",
    activities: [
      {
        id: "5",
        text: "August 2026 Evaluation Cycle created",
        time: "10:00",
        icon: "rotate",
        iconColor: "#0E2C5E",
        iconBg: "#0E2C5E14",
      },
    ],
  },
];

export const ActivityTimelineCard: React.FC = () => {
  const { isDark } = useTheme();

  const renderIcon = (type: TimelineActivity["icon"], color: string) => {
    switch (type) {
      case "check":
        return <CheckCircle2 className="w-4 h-4" style={{ color }} />;
      case "play":
        return <PlayCircle className="w-4 h-4" style={{ color }} />;
      case "edit":
        return <FileEdit className="w-4 h-4" style={{ color }} />;
      case "user":
        return <UserCheck className="w-4 h-4" style={{ color }} />;
      case "rotate":
        return <RotateCw className="w-4 h-4" style={{ color }} />;
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      <h2 className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-[#000640]"}`}>
        Activity Timeline
      </h2>

      <div className="space-y-6">
        {mockGroups.map((group) => (
          <div key={group.day} className="space-y-3">
            <span className="text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase block">
              {group.day}
            </span>

            <div className="space-y-3.5 pl-1">
              {group.activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: act.iconBg }}
                  >
                    {renderIcon(act.icon, act.iconColor)}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? "text-gray-200" : "text-[#000640]"
                      }`}
                    >
                      {act.text}
                    </p>
                    <span className="text-[11px] text-[#9CA3AF] block mt-0.5">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimelineCard;
