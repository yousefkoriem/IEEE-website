import React, { useState } from "react";
import {
  Users,
  AlertTriangle,
  Video,
  Layers,
  FileText,
  Calendar as CalendarIcon,
  TrendingUp,
  Clock,
  ArrowRight,
  UserCheck,
  Sparkles,
  UserPlus,
  Plus,
  CalendarCheck,
} from "lucide-react";

import {
  useDashboardStats,
  useRecentActivities,
  useMembers,
  useAllMeetings,
  useCommittees,
  useAllArticles,
  useAllEvents,
} from "~/hooks/useApi";
import { extractArrayData } from "~/lib/api";
import { useAuth } from "~/hooks/useAuth";
import type { DashboardMember, SuccessModalProps } from "~/types/dashboard";

// Modals
import UsersModal from "./Modals/UsersModal";
import MeetingModal from "./Modals/MeetingModal";
import ArticleModal from "./Modals/ArticleModal";
import EventModal from "./Modals/EventModal";
import MembersTableModal from "./Modals/MembersTableModal";
import EditMemberModal from "./Modals/EditMemberModal";
import MemberProfileModal from "./Modals/MemberProfileModal";
import PendingApprovalModal from "./Modals/PendingApprovalModal";
import CalendarModal from "./Modals/CalendarModal";
import MeetingDetailsModal from "./Modals/MeetingDetailsModal";
import SuccessModal from "./Modals/SuccessModal";
import DashboardStatsBox from "./DashboardStatsBox";
import DashboardAlertCard from "./DashboardAlertCard";
import MeetingCard from "./MeetingCard";
import RecentActivityCard from "./RecentActivityCard";
import CalendarCard from "./CalendarCard";

export const HighBoardDashboard: React.FC = () => {
  // Auth & User
  const { user } = useAuth();
  const userName = user?.fName || user?.firstName || "Member";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Queries
  const { data: stats } = useDashboardStats();
  const { data: activities } = useRecentActivities();
  const { data: rawMembersList = [] } = useMembers();
  const { data: rawMeetingsList = [] } = useAllMeetings();
  const { data: rawCommitteesList = [] } = useCommittees();
  const { data: rawArticlesList = [] } = useAllArticles();
  const { data: rawEventsList = [] } = useAllEvents();

  const membersList = extractArrayData<DashboardMember>(rawMembersList);
  const meetingsList = extractArrayData<any>(rawMeetingsList);
  const committeesList = extractArrayData<any>(rawCommitteesList);
  const articlesList = extractArrayData<any>(rawArticlesList);
  const eventsList = extractArrayData<any>(rawEventsList);

  const latestMeeting =
    meetingsList && meetingsList.length > 0 ? meetingsList[0] : null;
  const meetingCommitteeName = (() => {
    if (!latestMeeting) return "UI/UX Committee";
    const found = committeesList.find(
      (c) => c.id === latestMeeting.committeeId,
    );
    return found?.name || "IEEE Committee";
  })();

  // Modal States
  const [isUsersModalOpen, setUsersModalOpen] = useState(false);
  const [isMeetingModalOpen, setMeetingModalOpen] = useState(false);
  const [isArticleModalOpen, setArticleModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [isMembersTableOpen, setMembersTableOpen] = useState(false);
  const [isApprovalModalOpen, setApprovalModalOpen] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isMeetingDetailsOpen, setMeetingDetailsOpen] = useState(false);

  // Secondary Modals
  const [selectedMember, setSelectedMember] = useState<DashboardMember | null>(
    null,
  );
  const [isEditMemberOpen, setEditMemberOpen] = useState(false);
  const [isMemberProfileOpen, setMemberProfileOpen] = useState(false);

  // Success Modal State
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    buttonText: string;
    onButtonClick: () => void;
  }>({
    isOpen: false,
    title: "",
    buttonText: "Done",
    onButtonClick: () => { },
  });

  const triggerSuccess = (
    title: string,
    buttonText: string,
    action = () => { },
  ) => {
    setSuccessModal({
      isOpen: true,
      title,
      buttonText,
      onButtonClick: action,
    });
  };

  const pendingMembers = membersList
    ? membersList.filter((m: any) => !m.isActive || m.status === "Pending")
    : [];

  const statsCards = [
    {
      title: "Total Members",
      number: membersList.length || stats?.totalMembers || 0,
      subText: "Registered members",
      icon: <Users className="w-4 h-4" color="#000640" />,
      iconBackground: "bg-[#EEF1FF]",
      iconColor: "text-indigo-600",
      chartColor: "#4460EF",
      chartData: [4, 6, 5, 7, 8, membersList.length || 6],
      onClick: () => setMembersTableOpen(true),
    },
    {
      title: "Pending Approvals",
      number: pendingMembers.length,
      subText: pendingMembers.length > 0 ? "Requires action" : "All clear",
      icon: <AlertTriangle className="w-4 h-4" color="#FFC107" />,
      iconBackground: "bg-[#FFF8E1]",
      iconColor: "text-amber-500",
      chartColor: "#FFC107",
      chartData: [3, 5, 4, 6, 7, pendingMembers.length],
      onClick: () => setApprovalModalOpen(true),
    },
    {
      title: "Upcoming Meetings",
      number: meetingsList.length || stats?.upcomingMeetings || 0,
      subText: "Scheduled",
      icon: <Video className="w-4 h-4" color="#000640" />,
      iconBackground: "bg-[#F3E8FF]",
      iconColor: "text-[#000640]",
      chartColor: "#5A10A5",
      chartData: [2, 4, 3, 5, 4, meetingsList.length || 3],
      onClick: () => setMeetingDetailsOpen(true),
    },
    {
      title: "Active Committees",
      number: committeesList.length || 0,
      subText: "Active in branch",
      icon: <Layers className="w-4 h-4" color="#000640" />,
      iconBackground: "bg-[#E0F7FA]",
      iconColor: "text-[#000640]",
      chartColor: "#17A2B8",
      chartData: [3, 5, 4, 6, 5, committeesList.length || 15],
    },
    {
      title: "Published Articles",
      number: articlesList.length || 0,
      subText: "Published in branch",
      icon: <FileText className="w-4 h-4" color="#105E13" />,
      iconBackground: "bg-[#E8F5E9]",
      iconColor: "text-[#105E13]",
      chartColor: "#09800F",
      chartData: [2, 4, 3, 6, 5, articlesList.length || 42],
    },
    {
      title: "Upcoming Events",
      number: eventsList.length || stats?.upcomingEvents || 0,
      subText: "Events in system",
      icon: <CalendarIcon className="w-4 h-4" color="#440C7C" />,
      iconBackground: "bg-[#EFE7F6]",
      iconColor: "text-purple-700",
      chartColor: "#1F063A",
      chartData: [1, 3, 2, 4, 3, eventsList.length || 8],
      onClick: () => setCalendarOpen(true),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 my-4 sm:my-8">
      <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-6">
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;Dashboard
        </span>
      </div>
      {/* 1. Header Greeting & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-[#000640] tracking-tight flex items-center gap-2">
            {getGreeting()}, {userName}{" "}
            <span className="animate-bounce inline-block">👋</span>
          </h1>
          <p className="text-xs sm:text-sm font-normal text-[#3348B3] dark:text-gray-400 mt-1">
            Here's what's happening today in your IEEE Student Branch.
          </p>
        </div>

        {/* Action Buttons: 2x2 Grid on Mobile, Flex on Desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 my-2 sm:my-5">
          <button
            onClick={() => setUsersModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-[#5A10A5] hover:bg-[#581C87] text-white rounded-full text-xs font-bold shadow-[0px_2px_8px_0px_#5A10A540] transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add User
          </button>
          <button
            onClick={() => setMeetingModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-[#4460EF] hover:bg-[#2563EB] text-white rounded-full text-xs font-bold shadow-[0px_2px_8px_0px_#4460EF40] transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Create Meeting
          </button>
          <button
            onClick={() => setArticleModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-[#0E2C5E] hover:bg-[#1E293B] text-white rounded-full text-xs font-bold shadow-[0px_2px_8px_0px_#0E2C5E40] transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Create Article
          </button>
          <button
            onClick={() => setEventModalOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-[#1F063A] hover:bg-[#210B37] text-white rounded-full text-xs font-bold shadow-[0px_2px_8px_0px_#E91E8C40] transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Create Event
          </button>
        </div>
      </div>

      {/* 2. Top Stats Grid (2 per row on Mobile, 6 on Desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3.5">
        {statsCards.map((card) => (
          <DashboardStatsBox key={card.title} {...card} />
        ))}
      </div>

      {/* 3. Info Alerts Row (Dynamic Cards connected to API) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <DashboardAlertCard
          icon={<AlertTriangle className="w-4 h-4" color="#FFC107" />}
          text={`${membersList.filter((m: any) => !m.isActive).length} members are waiting for approval.`}
          cardBackground="bg-[#FFF9E6]"
          iconBackground="bg-[#FFC10720]"
          iconColor="text-[#FFC107]"
          textColor="text-[#000640]"
          borderClassName="border border-[#FFC10722]"
          className="cursor-pointer hover:shadow-xs"
          onClick={() => setApprovalModalOpen(true)}
        />

        <DashboardAlertCard
          icon={<CalendarCheck className="w-4 h-4" color="#4460EF" />}
          text={
            latestMeeting
              ? `Next meeting: ${latestMeeting.title}`
              : "No upcoming meetings scheduled."
          }
          cardBackground="bg-[#EEF1FF]"
          iconBackground="bg-[#4460EF20]"
          iconColor="text-[#4460EF]"
          textColor="text-[#000640]"
          borderClassName="border border-[#4460EF22]"
          className="cursor-pointer hover:shadow-xs"
          onClick={() => setMeetingDetailsOpen(true)}
        />

        <DashboardAlertCard
          icon={<CalendarIcon className="w-4 h-4" color="#440C7C" />}
          text={`${meetingsList.length} meetings scheduled in system.`}
          cardBackground="bg-[#440C7C]"
          iconBackground="bg-[#EFE7F6]"
          iconColor="text-[#440C7C]"
          textColor="text-[#E6E6EC]"
          borderClassName="border border-[#EFE7F6"
          className="cursor-pointer hover:bg-[#260C40]"
          onClick={() => setCalendarOpen(true)}
        />
      </div>

      {/* 4. Main Bottom 3-Column Layout (Meeting Card, Recent Activity, Calendar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MeetingCard
          bannerTitle={meetingCommitteeName}
          title={latestMeeting?.title || "Weekly UI/UX Meeting"}
          committee={meetingCommitteeName}
          date={
            latestMeeting?.createdAt
              ? new Date(latestMeeting.createdAt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "Thursday, July 20, 2026"
          }
          time={latestMeeting?.recap || "6:00 PM — 7:30 PM"}
          location={
            latestMeeting?.description || "Room 304, Engineering Building"
          }
          attendanceCount={
            latestMeeting?.users?.filter((u: any) => u.attended)?.length ?? 32
          }
          totalCount={latestMeeting?.users?.length || 36}
          avatars={["MA", "KN", "LI", "NH", "OY"]}
          onViewDetails={() => setMeetingDetailsOpen(true)}
        />

        {/* <RecentActivityCard
          onViewAll={() => setApprovalModalOpen(true)}
          activities={[
            {
              id: 1,
              icon: <UserCheck className="w-4 h-4" color="#4460EF"/>,
              iconBackground: "bg-[#EEF1FF]",
              iconColor: "text-[#4460EF]",
              title: "Ahmed approved Sara's membership request",
              time: "2 min ago",
            },
            {
              id: 2,
              icon: <CalendarIcon className="w-4 h-4" color="#5A10A5"/>,
              iconBackground: "bg-[#EFE7F6]",
              iconColor: "text-[#5A10A5]",
              title: "Weekly UI/UX Meeting was created",
              time: "1 hr ago",
            },
            {
              id: 3,
              icon: <FileText className="w-4 h-4" color="#09800F"/>,
              iconBackground: "bg-[#EEFBEF]",
              iconColor: "text-[#09800F]",
              title: "Article \"IEEE Impact 2025\" published",
              time: "3 hr ago",
            },
            {
              id: 4,
              icon: <Users className="w-4 h-4" color="#17A2B8"/>,
              iconBackground: "bg-[#E0F7FA]",
              iconColor: "text-[#17A2B8]",
              title: "New member Nour Hassan joined the branch",
              time: "5 hr ago",
            },
            {
              id: 5,
              icon: <Sparkles className="w-4 h-4" color="#440C7C"/>,
              iconBackground: "bg-[#EFE7F6]",
              iconColor: "text-[#440C7C]",
              title: "Technical Workshop event created",
              time: "Yesterday",
            },
          ]}
        /> */}

        <CalendarCard
          monthLabel="July 2026"
          eventCount={5}
          events={[
            { title: "UI/UX Meeting", date: "Jul 20", dotColor: "bg-blue-500" },
            {
              title: "Tech Workshop",
              date: "Jul 22",
              dotColor: "bg-purple-500",
            },
            {
              title: "Branch Assembly",
              date: "Jul 27",
              dotColor: "bg-[#311150]",
            },
          ]}
          onClick={() => setCalendarOpen(true)}
        />
      </div>

      {/* 5. Render All Modals */}
      <UsersModal
        isOpen={isUsersModalOpen}
        onClose={() => setUsersModalOpen(false)}
        onSuccess={() => triggerSuccess("Member Added", "Add New User")}
      />

      <MeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setMeetingModalOpen(false)}
        onSuccess={() =>
          triggerSuccess(
            "You Have Successfully Added a New Meeting",
            "Add New Meeting",
          )
        }
      />

      <ArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => setArticleModalOpen(false)}
        onSuccess={() =>
          triggerSuccess(
            "You Have Successfully Published a New Article",
            "Add New Article",
          )
        }
      />

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSuccess={() =>
          triggerSuccess(
            "You Have Successfully Created a New Event",
            "Add New Event",
          )
        }
      />

      <MembersTableModal
        isOpen={isMembersTableOpen}
        onClose={() => setMembersTableOpen(false)}
        members={membersList}
        onEditMember={(member) => {
          setSelectedMember(member);
          setEditMemberOpen(true);
        }}
        onViewMember={(member) => {
          setSelectedMember(member);
          setMemberProfileOpen(true);
        }}
      />

      <EditMemberModal
        isOpen={isEditMemberOpen}
        onClose={() => setEditMemberOpen(false)}
        member={selectedMember}
        onSuccess={() =>
          triggerSuccess("You Have Successfully Saved the Changes", "Done")
        }
      />

      <MemberProfileModal
        isOpen={isMemberProfileOpen}
        onClose={() => setMemberProfileOpen(false)}
        member={selectedMember}
      />

      <PendingApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        pendingMembers={pendingMembers}
        onSuccess={() =>
          triggerSuccess("You Have Successfully Saved the Changes", "Done")
        }
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      <MeetingDetailsModal
        isOpen={isMeetingDetailsOpen}
        onClose={() => setMeetingDetailsOpen(false)}
      />

      {/* Unified Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal.title}
        buttonText={successModal.buttonText}
        onButtonClick={successModal.onButtonClick}
      />
    </div>
  );
};

export default HighBoardDashboard;
