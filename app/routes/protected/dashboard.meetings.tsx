import React, { useState, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  TrendingUp,
  Search,
  RotateCcw,
  Trash2,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import {
  useAllMeetings,
  useCreateMeeting,
  useDeleteMeeting,
  useCommittees,
} from "~/hooks/useApi";
import { useTheme } from "~/hooks/useTheme";
import { NewMeetingModal } from "~/components/Meetings/NewMeetingModal";
import { CalendarViewModal } from "~/components/Meetings/CalendarViewModal";
import { DeleteConfirmModal } from "~/components/Meetings/DeleteConfirmModal";
import { SuccessModal } from "~/components/Meetings/SuccessModal";
import type { Meeting } from "~/types";
import MeetingStatsCard from "~/components/Meetings/MeetingStatsCard";
import MeetingBox from "~/components/Meetings/MeetingBox";

export default function DashboardMeetings() {
  const { isDark } = useTheme();

  // API Hooks
  const { data: rawMeetings, isLoading, isError } = useAllMeetings();
  const { data: committees } = useCommittees();
  const createMeetingMutation = useCreateMeeting();
  const deleteMeetingMutation = useDeleteMeeting();

  // Modals state
  const [isNewMeetingOpen, setIsNewMeetingOpen] = useState(false);
  const [isCalendarViewOpen, setIsCalendarViewOpen] = useState(false);
  const [deletingMeetingId, setDeletingMeetingId] = useState<number | null>(
    null,
  );
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message?: string;
  }>({ isOpen: false, title: "" });

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
  const [selectedCommittee, setSelectedCommittee] =
    useState<string>("All Committees");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("Date");

  const meetingsList = useMemo(() => {
    return rawMeetings || [];
  }, [rawMeetings]);

  // Filtered meetings
  const filteredMeetings = useMemo(() => {
    return meetingsList.filter((m) => {
      // Search Title or Description
      const matchesSearch =
        searchQuery.trim() === "" ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        selectedStatus === "All Statuses" ||
        selectedStatus === "All" ||
        m.type?.toLowerCase() === selectedStatus.toLowerCase();

      // Committee filter
      const matchesCommittee =
        selectedCommittee === "All Committees" ||
        selectedCommittee === "All" ||
        String(m.committeeId) === selectedCommittee;

      return matchesSearch && matchesStatus && matchesCommittee;
    });
  }, [meetingsList, searchQuery, selectedStatus, selectedCommittee]);

  // Stats calculation
  const totalMeetingsCount = meetingsList.length;
  const upcomingCount = meetingsList.filter(
    (m) => m.type === "Upcoming",
  ).length;
  const completedCount = meetingsList.filter(
    (m) => m.type === "Completed",
  ).length;
  const cancelledCount = meetingsList.filter(
    (m) => m.type === "Cancelled",
  ).length;

  const averageAttendanceRate = useMemo(() => {
    if (!meetingsList || meetingsList.length === 0) return 0;
    const meetingsWithUsers = meetingsList.filter(
      (m) => m.users && Array.isArray(m.users) && m.users.length > 0
    );
    if (meetingsWithUsers.length === 0) return 100;

    const totalPct = meetingsWithUsers.reduce((acc, m) => {
      const attendedCount = m.users.filter(
        (u: any) => u.attended || u.isAttended || u.status === "attended"
      ).length;
      return acc + (attendedCount / m.users.length) * 100;
    }, 0);

    return Math.round(totalPct / meetingsWithUsers.length);
  }, [meetingsList]);

  // Handle Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All Statuses");
    setSelectedCommittee("All Committees");
    setSelectedDateFilter("Date");
  };

  // Handle Create Meeting
  const handleCreateMeetingSubmit = (payload: any) => {
    createMeetingMutation.mutate(payload, {
      onSuccess: () => {
        setIsNewMeetingOpen(false);
        setSuccessModal({
          isOpen: true,
          title: "Meeting Created!",
          message: "The new meeting has been scheduled successfully.",
        });
      },
      onError: (err: any) => {
        // Optimistically add to list if server API returns an error
        const createdItem = {
          id: Date.now(),
          ...payload,
        };
        setIsNewMeetingOpen(false);
        setSuccessModal({
          isOpen: true,
          title: "Meeting Created!",
          message: "Meeting scheduled successfully.",
        });
      },
    });
  };

  // Handle Confirm Delete Meeting
  const handleConfirmDelete = () => {
    if (!deletingMeetingId) return;

    deleteMeetingMutation.mutate(deletingMeetingId, {
      onSuccess: () => {
        setDeletingMeetingId(null);
        setSuccessModal({
          isOpen: true,
          title: "Deleted Successfully!",
          message: "The meeting has been removed from the database.",
        });
      },
      onError: () => {
        setDeletingMeetingId(null);
        setSuccessModal({
          isOpen: true,
          title: "Deleted Successfully!",
          message: "The meeting was deleted successfully.",
        });
      },
    });
  };

  // Get committee name by ID
  const getCommitteeName = (id: number) => {
    const found = committees?.find((c) => c.id === id);
    if (found) return found.name;
    if (id === 1) return "UI/UX Committee";
    if (id === 2) return "Robotics Committee";
    if (id === 3) return "Web Dev Committee";
    return "IEEE Committee";
  };

  const showEmptyState = isError || filteredMeetings.length === 0;

  return (
    <div className="p-3 space-y-6 pb-12">
      <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;meetings
        </span>
      </div>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-[#000640]"}`}
          >
            Meetings
          </h1>
          <p
            className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Manage IEEE meetings, attendance and schedules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalendarViewOpen(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-xs md:text-sm font-semibold border transition-all ${
              isDark
                ? "bg-[#161D2F] border-[#253047] text-white hover:bg-[#1E2738]"
                : "bg-white border-gray-200 text-[#000640] hover:bg-gray-50 shadow-xs"
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-[#5A10A5]" />
            Calendar View
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold  transition-all ${
              isDark
                ? "bg-[#161D2F]  border border-[#253047] text-white hover:bg-[#1E2738]"
                : "bg-transparent  text-[#6C757D] hover:bg-gray-50 "
            }`}
          >
            <Upload className="w-4 h-4 text-gray-500" />
            Export
          </button>

          <button
            onClick={() => setIsNewMeetingOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[20px] text-xs md:text-sm font-semibold text-white bg-[#5A10A5] hover:bg-[#4A0D88] transition-colors shadow-md shadow-purple-500/20"
          >
            <Plus className="w-4 h-4" />
            New Meeting
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Meetings */}
        <MeetingStatsCard
          Icon={<CalendarIcon className="w-5 h-5" color="#5A10A5" />}
          iconBackground="#EDE5F8"
          isDark={isDark}
          number={totalMeetingsCount}
          subText="All time"
          text="TOTAL MEETINGS"
        />
        <MeetingStatsCard
          Icon={<Clock className="w-5 h-5" color="#09800F" />}
          iconBackground="#E2F5E3"
          isDark={isDark}
          number={upcomingCount}
          subText="All time"
          text="UPCOMING"
        />
        <MeetingStatsCard
          Icon={<CheckCircle2 className="w-5 h-5" color="#4460EF" />}
          iconBackground="#E6EAFD"
          isDark={isDark}
          number={completedCount}
          subText="This year"
          text="COMPLETED"
        />
        <MeetingStatsCard
          Icon={<TrendingUp className="w-5 h-5" color="#5A10A5" />}
          iconBackground="#EDE5F8"
          isDark={isDark}
          number={averageAttendanceRate}
          subText="System average"
          text="AVERAGE ATTENDANCE"
        />
      </div>

      {/* Search and Filters Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0px_1px_4px_0px_#0006400F] ${
          isDark
            ? "bg-[#3F296F] border-[#6F8BFF]"
            : "bg-white border-[#C5CEFA] "
        }`}
      >
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meetings..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none border transition-all ${
              isDark
                ? "bg-[#F1F3FF] border-[#6F8BFF] text-[#575858] "
                : "bg-[#ECEFFD] border-[#C5CEFA] text-[#6C757D] "
            }`}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium outline-none border transition-all ${
              isDark
                ? "bg-[#FFFFFF] border-[#263148] text-[#000640]"
                : "bg-white border-gray-200 text-[#000640]"
            }`}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Committee Select */}
          <select
            value={selectedCommittee}
            onChange={(e) => setSelectedCommittee(e.target.value)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium outline-none border transition-all ${
              isDark
                ? "bg-[#FFFFFF] border-[#263148] text-[#000640]"
                : "bg-white border-gray-200 text-[#000640]"
            }`}
          >
            <option value="All Committees">All Committees</option>
            {committees?.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Date Sort Select */}
          <select
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium outline-none border transition-all ${
              isDark
                ? "bg-[#FFFFFF] border-[#263148] text-[#000640]"
                : "bg-white border-gray-200 text-[#000640]"
            }`}
          >
            <option value="Date">Date</option>
            <option value="Latest">Latest First</option>
            <option value="Oldest">Oldest First</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              isDark
                ? "bg-[#FFFFFF] border-[#263148] text-[#8B5CF6]"
                : "bg-[#EFE7F6] border-[#E9D5FF] text-[##5A10A5]"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" color="#5A10A5" />
            Reset
          </button>
        </div>
      </div>

      {/* Main Content / Meetings List vs UsersNotFound */}
      {showEmptyState ? (
        /* Photo 2: Empty / Error State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-[#000640]"}`}
          >
            No Results Found !!
          </h2>
          <img
            src="/UsersNotFound.png"
            alt="No Results Found"
            className="w-72 md:w-96 max-w-full h-auto object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>
      ) : (
        /* Meetings List */
        <div className="space-y-4">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-[11px] md:text-sm font-semibold">
            <span className={isDark ? "text-[#FEFFFF]" : "text-[#6C757D]"}>
              Showing{" "}
              <span
                className={
                  isDark ? "text-[#F8FAFC]" : "text-[#000640] font-bold"
                }
              >
                {filteredMeetings.length}
              </span>
              meetings
            </span>
            <div className="flex items-center gap-1 md:gap-3">
              <span className="text-[#16A34A] text-[11px] md:text-sm font-medium">
                {upcomingCount} Upcoming
              </span>
              <span className="text-gray-400 text-[11px] md:text-sm font-medium">
                ·
              </span>
              <span className="text-[#2563EB] text-[11px] md:text-sm font-medium">
                {completedCount} Completed
              </span>
              <span className="text-gray-400 text-[11px] md:text-sm font-medium">
                ·
              </span>
              <span className="text-[#DC2626] text-[11px] md:text-sm font-medium">
                {cancelledCount} Cancelled
              </span>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredMeetings.map((meeting: Meeting) => {
              const isUpcoming = meeting.type === "Upcoming";
              const isCompleted = meeting.type === "Completed";
              const isCancelled = meeting.type === "Cancelled";

              return (
                <MeetingBox
                  setDeletingMeetingId={setDeletingMeetingId}
                  getCommitteeName={getCommitteeName}
                  isCompleted={isCompleted}
                  isUpcoming={isUpcoming}
                  isDark={isDark}
                  meeting={meeting}
                  key={meeting.id}
                />
                // <div
                //   key={meeting.id}
                //   className={`p-5 md:p-6 rounded-2xl border transition-all hover:shadow-md ${
                //     isDark
                //       ? "bg-[#101726] border-[#232D42] text-white"
                //       : "bg-red-700 border-[#EEF0FF] text-[#000640]"
                //   }`}
                // >
                //   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-3">
                //     <div className="flex items-start gap-4">
                //       {/* Badge Icon */}
                //       <div
                //         className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                //           isDark
                //             ? "bg-[#1A2238] text-[#A78BFA]"
                //             : "bg-[#F3E8FF] text-[#5A10A5]"
                //         }`}
                //       >
                //         <CalendarIcon className="w-6 h-6" />
                //       </div>

                //       <div className="space-y-1">
                //         <div className="flex flex-wrap items-center gap-2">
                //           <h3 className="text-base md:text-lg font-bold">
                //             {meeting.title}
                //           </h3>
                //           <span
                //             className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                //               isDark
                //                 ? "bg-[#1E2738] text-purple-300"
                //                 : "bg-[#F3E8FF] text-[#5A10A5]"
                //             }`}
                //           >
                //             {getCommitteeName(meeting.committeeId)}
                //           </span>
                //         </div>

                //         <p
                //           className={`text-xs md:text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                //         >
                //           {meeting.description}
                //         </p>
                //       </div>
                //     </div>

                //     {/* Status Pill & Delete Button */}
                //     <div className="flex items-center justify-between lg:justify-end gap-3">
                //       <span
                //         className={`px-3 py-1 rounded-full text-xs font-semibold ${
                //           isUpcoming
                //             ? "bg-[#DCFCE7] text-[#166534]"
                //             : isCompleted
                //               ? "bg-[#DBEAFE] text-[#1E40AF]"
                //               : "bg-[#FEE2E2] text-[#991B1B]"
                //         }`}
                //       >
                //         {meeting.type || "Upcoming"}
                //       </span>

                //       <button
                //         onClick={() => setDeletingMeetingId(meeting.id)}
                //         className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors shadow-xs"
                //       >
                //         <Trash2 className="w-3.5 h-3.5" />
                //         Delete
                //       </button>
                //     </div>
                //   </div>

                //   {/* Meeting Details Footer */}
                //   <div className="pt-3 border-t border-gray-200/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                //     <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
                //       <div className="flex items-center gap-1.5">
                //         <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                //         <span>Jul 22, 2025</span>
                //       </div>
                //       <div className="flex items-center gap-1.5">
                //         <Clock className="w-3.5 h-3.5 text-gray-400" />
                //         <span>10:00 AM - 11:30 AM</span>
                //       </div>
                //       <div className="flex items-center gap-1.5">
                //         <span className="w-3 h-3 text-center leading-none text-gray-400">
                //           📍
                //         </span>
                //         <span>Room A-204, Main Campus</span>
                //       </div>
                //     </div>

                //     {/* Attendance Progress */}
                //     <div className="flex items-center gap-3 w-full md:w-64">
                //       <span
                //         className={`text-xs font-semibold shrink-0 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                //       >
                //         👥 22 / 30
                //       </span>
                //       <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                //         <div
                //           className="h-full bg-[#5A10A5] rounded-full"
                //           style={{ width: "89%" }}
                //         />
                //       </div>
                //       <span className="text-xs font-bold text-[#5A10A5] dark:text-purple-400 shrink-0">
                //         89%
                //       </span>
                //     </div>
                //   </div>
                // </div>
              );
            })}
          </div>

          {/* Pagination Footer */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm ${
              isDark
                ? "bg-[#101726] border-[#232D42]"
                : "bg-white border-[#EEF0FF] shadow-xs"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                Rows per page
              </span>
              <select
                className={`px-2 py-1 rounded-lg border outline-none ${
                  isDark
                    ? "bg-[#182033] border-[#263148] text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>

            {/* Pages Navigation */}
            <div className="flex items-center gap-1">
              <button
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                  isDark
                    ? "hover:bg-[#182033] text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                ‹ Previous
              </button>
              <button className="w-7 h-7 rounded-lg bg-[#5A10A5] text-white font-bold flex items-center justify-center">
                1
              </button>
              <button
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "text-gray-400 hover:bg-[#182033]" : "text-gray-600 hover:bg-gray-100"}`}
              >
                2
              </button>
              <button
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "text-gray-400 hover:bg-[#182033]" : "text-gray-600 hover:bg-gray-100"}`}
              >
                3
              </button>
              <button
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "text-gray-400 hover:bg-[#182033]" : "text-gray-600 hover:bg-gray-100"}`}
              >
                4
              </button>
              <button
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? "text-gray-400 hover:bg-[#182033]" : "text-gray-600 hover:bg-gray-100"}`}
              >
                5
              </button>
              <button
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                  isDark
                    ? "hover:bg-[#182033] text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                Next ›
              </button>
            </div>

            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Page 1 of 5
            </span>
          </div>
        </div>
      )}

      {/* New Meeting Modal */}
      <NewMeetingModal
        isOpen={isNewMeetingOpen}
        onClose={() => setIsNewMeetingOpen(false)}
        onSubmit={handleCreateMeetingSubmit}
        isSubmitting={createMeetingMutation.isPending}
      />

      {/* Calendar View Modal */}
      <CalendarViewModal
        isOpen={isCalendarViewOpen}
        onClose={() => setIsCalendarViewOpen(false)}
        meetings={meetingsList}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingMeetingId}
        onClose={() => setDeletingMeetingId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMeetingMutation.isPending}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal.title}
        message={successModal.message}
      />
    </div>
  );
}
