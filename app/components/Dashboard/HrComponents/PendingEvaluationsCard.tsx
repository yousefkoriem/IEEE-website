import React, { useState } from "react";
import { Search, Filter, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

interface MemberEvaluation {
  id: string;
  initials: string;
  name: string;
  committee: string;
  position: string;
  status: "Pending" | "In Progress" | "Overdue";
  prevScore: string;
  avatarBg?: string;
}

const mockData: MemberEvaluation[] = [
  {
    id: "1",
    initials: "AH",
    name: "Ahmed Hassan",
    committee: "Web",
    position: "Head",
    status: "Pending",
    prevScore: "91%",
    avatarBg: "#5A10A5",
  },
  {
    id: "2",
    initials: "SM",
    name: "Sara Mohamed",
    committee: "UI/UX",
    position: "Vice Head",
    status: "In Progress",
    prevScore: "87%",
    avatarBg: "#4460EF",
  },
  {
    id: "3",
    initials: "NK",
    name: "Nour Khaled",
    committee: "Power",
    position: "Member",
    status: "Pending",
    prevScore: "76%",
    avatarBg: "#0E2C5E",
  },
  {
    id: "4",
    initials: "YR",
    name: "Youssef Rami",
    committee: "HR",
    position: "Member",
    status: "Overdue",
    prevScore: "82%",
    avatarBg: "#09800F",
  },
  {
    id: "5",
    initials: "LF",
    name: "Layla Fares",
    committee: "Web",
    position: "Member",
    status: "Pending",
    prevScore: "—",
    avatarBg: "#17A2B8",
  },
  {
    id: "6",
    initials: "KA",
    name: "Karim Ayman",
    committee: "UI/UX",
    position: "Member",
    status: "Pending",
    prevScore: "68%",
    avatarBg: "#5A10A5",
  },
  {
    id: "7",
    initials: "RM",
    name: "Rana Mahmoud",
    committee: "Power",
    position: "Head",
    status: "In Progress",
    prevScore: "93%",
    avatarBg: "#4460EF",
  },
  {
    id: "8",
    initials: "OT",
    name: "Omar Tarek",
    committee: "Web",
    position: "Member",
    status: "Overdue",
    prevScore: "55%",
    avatarBg: "#EF4444",
  },
];

export const PendingEvaluationsCard: React.FC = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === mockData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockData.map((m) => m.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.committee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: MemberEvaluation["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] mr-1.5" />
            Pending
          </span>
        );
      case "In Progress":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#17A2B814] text-[#17A2B8] border border-[#17A2B833]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17A2B8] mr-1.5" />
            In Progress
          </span>
        );
      case "Overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mr-1.5" />
            Overdue
          </span>
        );
    }
  };

  const getScoreColor = (score: string) => {
    if (score === "—") return isDark ? "text-gray-400" : "text-gray-400";
    const num = parseInt(score, 10);
    if (num >= 90) return "text-[#09800F]";
    if (num >= 80) return "text-[#4460EF]";
    if (num >= 65) return "text-[#FFC107]";
    return "text-[#EF4444]";
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-200 ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-[#000640]"}`}>
            Pending Evaluations
          </h2>
          <p className="text-xs text-[#9CA3AF]">
            8 members awaiting evaluation
          </p>
        </div>

        <button
          type="button"
          className="p-2 text-[#9CA3AF] hover:text-[#5A10A5] transition-colors"
          title="Expand"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border transition-colors outline-none ${
              isDark
                ? "bg-[#182033] border-[#253047] text-white focus:border-[#5A10A5]"
                : "bg-white border-gray-200 text-[#000640] focus:border-[#5A10A5]"
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className={`px-3 py-2 text-xs rounded-xl border outline-none ${
              isDark
                ? "bg-[#182033] border-[#253047] text-gray-300"
                : "bg-white border-gray-200 text-[#6B7280]"
            }`}
          >
            <option value="">Committee</option>
            <option value="web">Web</option>
            <option value="uiux">UI/UX</option>
            <option value="power">Power</option>
            <option value="hr">HR</option>
          </select>

          <select
            className={`px-3 py-2 text-xs rounded-xl border outline-none ${
              isDark
                ? "bg-[#182033] border-[#253047] text-gray-300"
                : "bg-white border-gray-200 text-[#6B7280]"
            }`}
          >
            <option value="">Position</option>
            <option value="head">Head</option>
            <option value="vice">Vice Head</option>
            <option value="member">Member</option>
          </select>

          <select
            className={`px-3 py-2 text-xs rounded-xl border outline-none ${
              isDark
                ? "bg-[#182033] border-[#253047] text-gray-300"
                : "bg-white border-gray-200 text-[#6B7280]"
            }`}
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            className={`px-3 py-2 text-xs rounded-xl border outline-none ${
              isDark
                ? "bg-[#182033] border-[#253047] text-gray-300"
                : "bg-white border-gray-200 text-[#6B7280]"
            }`}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="score">Score</option>
          </select>

          <button
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-colors ${
              isDark
                ? "border-[#253047] text-gray-300 hover:bg-[#182033]"
                : "border-gray-200 text-[#6B7280] hover:bg-gray-50"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-1 text-xs text-[#9CA3AF] ml-2">
            <span>Rows</span>
            <select
              className={`px-2 py-1 rounded-lg border outline-none text-xs ${
                isDark
                  ? "bg-[#182033] border-[#253047] text-gray-300"
                  : "bg-white border-gray-200 text-[#6B7280]"
              }`}
            >
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>
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
              <th className="py-3 px-3 w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === mockData.length && mockData.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 accent-[#5A10A5] cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">Member</th>
              <th className="py-3 px-3">Committee</th>
              <th className="py-3 px-3">Position</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Prev. Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#232D42]">
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className={`transition-colors text-xs ${
                  isDark ? "hover:bg-[#182033]" : "hover:bg-purple-50/30"
                }`}
              >
                <td className="py-3.5 px-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleSelectRow(row.id)}
                    className="rounded border-gray-300 accent-[#5A10A5] cursor-pointer"
                  />
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                      style={{ backgroundColor: row.avatarBg || "#5A10A5" }}
                    >
                      {row.initials}
                    </div>
                    <span
                      className={`font-bold ${
                        isDark ? "text-white" : "text-[#000640]"
                      }`}
                    >
                      {row.name}
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
                  {row.position}
                </td>
                <td className="py-3.5 px-3">{getStatusBadge(row.status)}</td>
                <td
                  className={`py-3.5 px-3 font-bold ${getScoreColor(
                    row.prevScore
                  )}`}
                >
                  {row.prevScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100 dark:border-[#232D42] text-xs">
        <span className="text-[#9CA3AF]">
          Showing 1–{filteredData.length} of {mockData.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            className={`w-7 h-7 flex items-center justify-center rounded-lg border text-[#9CA3AF] ${
              isDark ? "border-[#253047]" : "border-gray-200"
            }`}
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#4460EF] text-white font-bold">
            1
          </button>

          <button
            className={`w-7 h-7 flex items-center justify-center rounded-lg border text-[#9CA3AF] ${
              isDark ? "border-[#253047]" : "border-gray-200"
            }`}
            disabled
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingEvaluationsCard;
