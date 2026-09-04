import React from "react";
import { X, Check, XCircle } from "lucide-react";
import type { DashboardMember } from "~/types/dashboard";
import { useApproveMemberMutation, useRejectMemberMutation } from "~/hooks/useApi";

interface PendingApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingMembers: DashboardMember[];
  onSuccess: () => void;
}

export const PendingApprovalModal: React.FC<PendingApprovalModalProps> = ({
  isOpen,
  onClose,
  pendingMembers,
  onSuccess,
}) => {
  const approveMutation = useApproveMemberMutation();
  const rejectMutation = useRejectMemberMutation();

  if (!isOpen) return null;

  const safePendingMembers = Array.isArray(pendingMembers) ? pendingMembers : [];

  const handleApprove = (id: number) => {
    approveMutation.mutate(id);
  };

  const handleReject = (id: number) => {
    rejectMutation.mutate(id);
  };

  const getInitials = (name?: string) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length >= 2 && parts[1]) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#101726] border border-[#E2E8F0] dark:border-[#232D42] rounded-3xl p-6 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold text-[#000640] dark:text-white">
            Pending Approvals ({safePendingMembers.length})
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Cards List */}
        <div className="mt-5 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {safePendingMembers.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400 font-medium">
              No pending approvals at this time.
            </div>
          ) : (
            safePendingMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-gray-900/60 border border-indigo-100 dark:border-gray-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000640] dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {member.committee} • {member.academicYear}
                    </p>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApprove(member.id)}
                    disabled={approveMutation.isPending}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-105"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(member.id)}
                    disabled={rejectMutation.isPending}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-105"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Buttons */}
        <div className="pt-5 mt-5 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onSuccess();
            }}
            className="px-7 py-2.5 bg-[#4B0082] hover:bg-[#3B0066] text-white rounded-2xl text-xs font-bold shadow-md shadow-purple-900/30 transition-all hover:scale-[1.02]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalModal;
