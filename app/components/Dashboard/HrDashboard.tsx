import React from "react";
import { RotateCw, Play, FileEdit, BarChart3, Users, CheckCircle2 } from "lucide-react";
import { useTheme } from "~/hooks/useTheme";

// Import components from HrComponents folder
import QuickActionCard from "./HrComponents/QuickActionCard";
import CycleOverviewCard from "./HrComponents/CycleOverviewCard";
import TodaysGoalCard from "./HrComponents/TodaysGoalCard";
import UpcomingDeadlineCard from "./HrComponents/UpcomingDeadlineCard";
import NotificationsCard from "./HrComponents/NotificationsCard";
import QuickTipCard from "./HrComponents/QuickTipCard";
import CurrentCycleCard from "./HrComponents/CurrentCycleCard";
import PendingEvaluationsCard from "./HrComponents/PendingEvaluationsCard";
import CommitteeProgressCard from "./HrComponents/CommitteeProgressCard";
import RecentEvaluationsCard from "./HrComponents/RecentEvaluationsCard";
import ActivityTimelineCard from "./HrComponents/ActivityTimelineCard";

export const HrDashboard: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6 pb-12">
      {/* Header Breadcrumb Div */}
      <div className={`hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ${
        isDark ? "bg-[#101726] border-[#232D42] text-[#A78BFA]" : ""
      }`}>
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;Dashboard
        </span>
      </div>

      {/* Top Banner Header */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all ${
        isDark ? "bg-[#101726] border-[#232D42]" : "bg-white border-gray-100 shadow-xs"
      }`}>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#000640]"}`}>
            HR Performance Dashboard
          </h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Manage member evaluations and monitor committee performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className={`px-4 py-2.5 rounded-xl border font-medium text-xs flex items-center gap-2 transition-colors ${
            isDark
              ? "border-[#253047] text-gray-300 hover:bg-[#182033]"
              : "border-gray-200 text-[#000640] hover:bg-gray-50"
          }`}>
            <RotateCw className="w-3.5 h-3.5" />
            <span>Create Evaluation Cycle</span>
          </button>

          <button className={`px-4 py-2.5 rounded-xl border font-medium text-xs flex items-center gap-2 transition-colors ${
            isDark
              ? "border-[#253047] text-gray-300 hover:bg-[#182033]"
              : "border-gray-200 text-[#000640] hover:bg-gray-50"
          }`}>
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start New Evaluation</span>
          </button>

          <button className="px-4 py-2.5 rounded-xl bg-[#5A10A5] hover:bg-[#4A0D88] text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-xs">
            <FileEdit className="w-3.5 h-3.5" />
            <span>Continue Evaluation</span>
          </button>
        </div>
      </div>

      {/* Top Grid: Quick Actions & Cycle Overview (Left) vs Right Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (3 Spans) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Actions Group */}
          <div>
            <h2 className="text-xs font-bold tracking-wider text-[#9CA3AF] uppercase mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <QuickActionCard
                title="Continue Evaluation"
                description="Resume unfinished evaluations where you left off."
                buttonText="Continue"
                icon={FileEdit}
                iconColor="#5A10A5"
                buttonColor="#5A10A5"
                iconBgColor="#5A10A514"
              />
              <QuickActionCard
                title="Start Evaluation"
                description="Begin evaluating members for this cycle."
                buttonText="Start"
                icon={Play}
                iconColor="#4460EF"
                buttonColor="#4460EF"
                iconBgColor="#4460EF14"
              />
              <QuickActionCard
                title="Create Evaluation Cycle"
                description="Open a new monthly evaluation cycle."
                buttonText="Create Cycle"
                icon={RotateCw}
                iconColor="#0E2C5E"
                buttonColor="#0E2C5E"
                iconBgColor="#0E2C5E14"
              />
              <QuickActionCard
                title="Reports & Analytics"
                description="Open performance reports and analytics."
                buttonText="View Reports"
                icon={BarChart3}
                iconColor="#17A2B8"
                buttonColor="#17A2B8"
                iconBgColor="#17A2B814"
              />
            </div>
          </div>

          {/* Cycle Overview Group */}
          <div>
            <h2 className="text-xs font-bold tracking-wider text-[#9CA3AF] uppercase mb-3">
              Cycle Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <CycleOverviewCard
                title="Total Members"
                value="165"
                subtext="Active in cycle"
                numberColor="#000640"
              />
              <CycleOverviewCard
                title="Evaluated"
                value="120"
                subtext="Click to filter"
                numberColor="#09800F"
              />
              <CycleOverviewCard
                title="Pending"
                value="45"
                subtext="Click to filter"
                numberColor="#FFC107"
              />
              <CycleOverviewCard
                title="Average Score"
                value="87%"
                subtext="This cycle"
                numberColor="#4460EF"
              />
            </div>
          </div>
        </div>

        {/* Right Column (1 Span) */}
        <div className="space-y-4">
          <TodaysGoalCard completed={18} total={25} />
          <UpcomingDeadlineCard daysLeft={4} pendingMembers={45} />
          <NotificationsCard />
          <QuickTipCard tip="Complete pending evaluations before the deadline to ensure complete cycle data." />
        </div>
      </div>

      {/* Current Evaluation Cycle Card */}
      <div>
        <CurrentCycleCard
          title="August 2026 Evaluation"
          status="Open"
          startDate="Aug 1, 2026"
          endDate="Aug 31, 2026"
          daysLeft={16}
          evaluatedCount={120}
          totalMembers={165}
        />
      </div>

      {/* Pending Evaluations Table Card */}
      <div>
        <PendingEvaluationsCard />
      </div>

      {/* Committee Progress & Recent Evaluations (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CommitteeProgressCard />
        </div>
        <div className="lg:col-span-2">
          <RecentEvaluationsCard />
        </div>
      </div>

      {/* Activity Timeline Card */}
      <div>
        <ActivityTimelineCard />
      </div>
    </div>
  );
};

export default HrDashboard;
