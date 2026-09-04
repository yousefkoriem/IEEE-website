import React, { useState } from "react";
import { Search, Maximize2 } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface EvaluationItem {
  id: string;
  initials: string;
  member: string;
  committee: string;
  evaluator: string;
  score: string;
  date: string;
  avatarBg?: string;
}

const mockRecent: EvaluationItem[] = [
  {
    id: "1",
    initials: "MA",
    member: "Mona Ali",
    committee: "UI/UX",
    evaluator: "Ahmed H.",
    score: "92%",
    date: "Aug 4, 2026",
    avatarBg: "#5A10A5",
  },
  {
    id: "2",
    initials: "ZE",
    member: "Ziad Emad",
    committee: "Web",
    evaluator: "Sara M.",
    score: "85%",
    date: "Aug 3, 2026",
    avatarBg: "#17A2B8",
  },
  {
    id: "3",
    initials: "HS",
    member: "Hana Samir",
    committee: "Power",
    evaluator: "Nour A.",
    score: "78%",
    date: "Aug 3, 2026",
    avatarBg: "#09800F",
  },
  {
    id: "4",
    initials: "TW",
    member: "Tarek Wael",
    committee: "HR",
    evaluator: "Youssef R.",
    score: "95%",
    date: "Aug 2, 2026",
    avatarBg: "#4460EF",
  },
  {
    id: "5",
    initials: "DF",
    member: "Dina Farouk",
    committee: "Web",
    evaluator: "Ahmed H.",
    score: "71%",
    date: "Aug 2, 2026",
    avatarBg: "#0E2C5E",
  },
];

export const RecentEvaluationsCard: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockRecent.filter(
    (item) =>
      item.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.committee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evaluator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: string) => {
    const num = parseInt(score, 10);
    if (num >= 90) return "text-[#09800F]";
    if (num >= 80) return "text-[#4460EF]";
    if (num >= 70) return "text-[#4460EF]";
    return "text-[#FFC107]";
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-[#000640]"}`}>
            Recent Evaluations
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            Last 30 completed evaluations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-8 pr-3 py-1.5 text-xs rounded-xl border outline-none ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-white focus:border-[#5A10A5]"
                  : "bg-white border-gray-200 text-[#000640] focus:border-[#5A10A5]"
              }`}
            />
          </div>

          <button
            type="button"
            className="p-1.5 text-[#9CA3AF] hover:text-[#5A10A5] transition-colors"
            title="Expand"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] font-semibold tracking-wider text-[#6B7280] uppercase ${
                isDark ? "border-[#232D42]" : "border-gray-100"
              }`}
            >
              <th className="py-3 px-3">Member</th>
              <th className="py-3 px-3">Committee</th>
              <th className="py-3 px-3">Evaluator</th>
              <th className="py-3 px-3">Score</th>
              <th className="py-3 px-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#232D42]">
            {filtered.map((row) => (
              <tr
                key={row.id}
                className={`transition-colors text-xs ${
                  isDark ? "hover:bg-[#182033]" : "hover:bg-purple-50/30"
                }`}
              >
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0"
                      style={{ backgroundColor: row.avatarBg || "#5A10A5" }}
                    >
                      {row.initials}
                    </div>
                    <span
                      className={`font-bold ${
                        isDark ? "text-white" : "text-[#000640]"
                      }`}
                    >
                      {row.member}
                    </span>
                  </div>
                </td>
                <td
                  className={`py-3.5 px-3 font-medium ${
                    isDark ? "text-gray-300" : "text-[#6B7280]"
                  }`}
                >
                  {row.committee}
                </td>
                <td
                  className={`py-3.5 px-3 font-medium ${
                    isDark ? "text-gray-300" : "text-[#6B7280]"
                  }`}
                >
                  {row.evaluator}
                </td>
                <td
                  className={`py-3.5 px-3 font-extrabold ${getScoreColor(
                    row.score
                  )}`}
                >
                  {row.score}
                </td>
                <td className="py-3.5 px-3 text-[#9CA3AF]">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEvaluationsCard;
