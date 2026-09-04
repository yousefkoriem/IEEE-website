import React, { useState } from "react";
import { X, Search, Eye, Edit2 } from "lucide-react";
import type { DashboardMember } from "~/types/dashboard";

interface MembersTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: DashboardMember[];
  onEditMember: (member: DashboardMember) => void;
  onViewMember: (member: DashboardMember) => void;
}

export const MembersTableModal: React.FC<MembersTableModalProps> = ({
  isOpen,
  onClose,
  members,
  onEditMember,
  onViewMember,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const safeMembers = Array.isArray(members) ? members : [];
  const filteredMembers = safeMembers.filter(
    (m) =>
      (m?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m?.committee || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m?.role || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: DashboardMember["status"]) => {
    switch (status) {
      case "Approved":
        return (
          <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-full">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getAvatarBg = (id?: number) => {
    const colors = [
      "bg-blue-600",
      "bg-indigo-600",
      "bg-purple-600",
      "bg-emerald-600",
      "bg-amber-600",
      "bg-rose-600",
    ];
    return colors[Math.abs(id || 0) % colors.length];
  };

  const getInitials = (name?: string) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length >= 2 && parts[1]) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-4xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">All Members</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="mt-4 mb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search member by name, committee or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#4F46E5] outline-none"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="mt-3 overflow-y-auto flex-1 border border-gray-100 dark:border-gray-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Committee</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${getAvatarBg(
                          member.id
                        )} text-white font-bold flex items-center justify-center text-xs shrink-0`}
                      >
                        {getInitials(member.name)}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {member.name || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-600 dark:text-gray-300">
                    {member.committee || "-"}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#000640] dark:text-indigo-300">
                    {member.role || "-"}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-500">
                    {member.joinedDate || "-"}
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(member.status)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewMember(member)}
                        className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-[#4F46E5] rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditMember(member)}
                        className="p-1.5 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-purple-600 rounded-lg transition-colors"
                        title="Edit Member"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersTableModal;
