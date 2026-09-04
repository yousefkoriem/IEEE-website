import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Plus, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { TaskStatsBox } from "~/components/Tasks/TaskStatsBox";
import { TaskFilters, type TaskViewMode, type TaskFilterState } from "~/components/Tasks/TaskFilters";
import { TaskCard, type TaskItem } from "~/components/Tasks/TaskCard";
import { TaskKanbanView } from "~/components/Tasks/TaskKanbanView";
import { TaskCalendarView } from "~/components/Tasks/TaskCalendarView";
import { WorkloadOverview } from "~/components/Tasks/WorkloadOverview";
import { UpcomingDeadlines } from "~/components/Tasks/UpcomingDeadlines";
import { TaskPagination } from "~/components/Tasks/TaskPagination";
import { CreateTaskModal } from "~/components/Tasks/CreateTaskModal";
import { AllDeadlinesModal } from "~/components/Tasks/AllDeadlinesModal";
import { WorkloadReportModal } from "~/components/Tasks/WorkloadReportModal";

export function meta() {
  return [
    { title: "Tasks Management - IEEE BNS Dashboard" },
    { name: "description", content: "Manage committee tasks and monitor project progress efficiently" },
  ];
}

const INITIAL_FILTERS: TaskFilterState = {
  search: "",
  committee: "",
  priority: "",
  status: "",
};

export function TasksManagementView() {
  const [viewMode, setViewMode] = useState<TaskViewMode>("list");
  const [filters, setFilters] = useState<TaskFilterState>(INITIAL_FILTERS);
  const [tasksList, setTasksList] = useState<TaskItem[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deadlinesModalOpen, setDeadlinesModalOpen] = useState(false);
  const [workloadModalOpen, setWorkloadModalOpen] = useState(false);

  // Filter Logic
  const handleFilterChange = (key: keyof TaskFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredTasks = useMemo(() => {
    return tasksList.filter((task) => {
      const searchMatch =
        !filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.committee.toLowerCase().includes(filters.search.toLowerCase());

      const committeeMatch =
        !filters.committee || task.committee === filters.committee;
      const priorityMatch =
        !filters.priority || task.priority === filters.priority;
      const statusMatch = !filters.status || task.status === filters.status;

      return searchMatch && committeeMatch && priorityMatch && statusMatch;
    });
  }, [tasksList, filters]);

  // Status toggle handler
  const handleStatusChange = (task: TaskItem, newStatus: TaskItem["status"]) => {
    setTasksList((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
    toast.success(`Updated "${task.title}" status to ${newStatus}`);
  };

  // Create Task Handler
  const handleCreateTask = (taskData: Partial<TaskItem>) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: taskData.title || "New Task",
      description: taskData.description || "",
      committee: taskData.committee || "Web Team",
      priority: taskData.priority || "Medium",
      status: taskData.status || "To Do",
      deadline: taskData.deadline || "Nov 20, 2023",
      progress: 0,
      assignees: taskData.assignees || [
        {
          name: "Mohammed Sharaf",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        },
      ],
      attachmentsCount: 0,
      commentsCount: 0,
    };
    setTasksList((prev) => [newTask, ...prev]);
    toast.success("New task created successfully!");
  };

  return (
    <div className="min-h-screen pb-12 w-full">
      <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;tasks
        </span>
      </div>

      {/* Page Header Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Tasks Management
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Manage committee tasks and monitor project progress efficiently
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="bg-[#5A10A5] hover:bg-[#4a0d88] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 border-0 flex items-center transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" /> + New Task
          </button>
        </div>
      </div>

      {/* ── 4 Top Stats Boxes Row ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <TaskStatsBox
          label="Total Tasks"
          value={54}
          badgeText="+12 new"
          badgeBg="#EEE3FA"
          badgeColor="#5A10A5"
          icon={<FileText className="w-5 h-5" />}
          iconBg="#EEE3FA"
          iconColor="#5A10A5"
        />
        <TaskStatsBox
          label="In Progress"
          value={21}
          badgeText="+5 this week"
          badgeBg="#FEF3C7"
          badgeColor="#D97706"
          icon={<Clock className="w-5 h-5" />}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />
        <TaskStatsBox
          label="Completed"
          value={28}
          badgeText="+ 8 month"
          badgeBg="#D1FAE5"
          badgeColor="#059669"
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBg="#D1FAE5"
          iconColor="#059669"
        />
        <TaskStatsBox
          label="Overdue"
          value={5}
          badgeText="2 urgent"
          badgeBg="#FEE2E2"
          badgeColor="#DC2626"
          icon={<AlertCircle className="w-5 h-5" />}
          iconBg="#FEE2E2"
          iconColor="#DC2626"
        />
      </div>

      {/* Filters Bar & View Switcher */}
      <div className="mb-6">
        <TaskFilters
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          totalCount={filteredTasks.length}
        />
      </div>

      {/* Main Content Grid: Left Tasks (8 cols), Right Widgets (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks View */}
        <div className="lg:col-span-8 space-y-4">
          {viewMode === "list" && (
            <>
              {filteredTasks.length === 0 ? (
                <div className="p-12 text-center border border-purple-100 rounded-2xl bg-white shadow-2xs">
                  <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No tasks found.</p>
                </div>
              ) : (
                filteredTasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}

              {/* Bottom Pagination Control Bar */}
              <TaskPagination
                currentPage={currentPage}
                totalPages={5}
                rowsPerPage={rowsPerPage}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setRowsPerPage}
              />
            </>
          )}

          {viewMode === "kanban" && (
            <TaskKanbanView
              tasks={filteredTasks}
              onAddTask={() => setCreateModalOpen(true)}
            />
          )}

          {viewMode === "calendar" && (
            <TaskCalendarView tasks={filteredTasks} />
          )}
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Workload Overview */}
          <WorkloadOverview
            onViewReportClick={() => setWorkloadModalOpen(true)}
          />

          {/* Card 2: Upcoming Deadlines */}
          <UpcomingDeadlines
            onViewAllClick={() => setDeadlinesModalOpen(true)}
          />
        </div>
      </div>

      {/* Modals Wire Up */}
      <CreateTaskModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />

      <AllDeadlinesModal
        isOpen={deadlinesModalOpen}
        onClose={() => setDeadlinesModalOpen(false)}
      />

      <WorkloadReportModal
        isOpen={workloadModalOpen}
        onClose={() => setWorkloadModalOpen(false)}
      />
    </div>
  );
}

export default function TasksManagementPage() {
  return (
    <ProtectedRoute allowedRoles={[1, 2, 3]}>
      <TasksManagementView />
    </ProtectedRoute>
  );
}
