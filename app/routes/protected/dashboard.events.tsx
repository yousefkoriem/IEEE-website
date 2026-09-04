import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import {
  Plus,
  CalendarDays,
  Pencil,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Users,
  MapPin,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { CategoryModal } from "~/components/CategoryModal";
import { CreateEventModal } from "~/components/events/CreateEventModal";
import { EventStatsBox } from "~/components/events/EventStatsBox";
import { UpcomingEventsCard } from "~/components/events/UpcomingEventsCard";
import { EventsCalendarCard } from "~/components/events/EventsCalendarCard";
import { EventsAnalyticsCard } from "~/components/events/EventsAnalyticsCard";
import { EventDetailsModal } from "~/components/events/EventDetailsModal";
import { EditEventModal } from "~/components/events/EditEventModal";
import { ManageRegistrationsModal } from "~/components/events/ManageRegistrationsModal";
import { CalendarModal } from "~/components/events/CalendarModal";
import {
  EventsFilters,
  type FilterState,
} from "~/components/events/EventsFilters";

import {
  useApiCategories,
  useApiEvents,
  useCreateApiCategory,
  useRenameCategory,
  useUpdateCategoryDesc,
  useDeleteApiCategory,
  useCreateEvent,
  useDeleteEvent,
} from "~/hooks/useEventsAndCategories";
import type { ApiCategory, ApiEvent } from "~/types/api.types";
import type { CreateCategoryFormData } from "~/utils/schemas";

export function meta() {
  return [
    { title: "Events Management - IEEE BNS Dashboard" },
    {
      name: "description",
      content:
        "Manage IEEE BNS events, registrations and scheduling efficiently",
    },
  ];
}

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Aug 1, 2025";

const INITIAL_FILTERS: FilterState = {
  search: "",
  category: "",
  committee: "",
  status: "",
  month: "",
  location: "",
  sortBy: "",
};

const EventsDashboard = () => {
  const [activeTab, setActiveTab] = useState<"events" | "categories">("events");
  const [viewMode, setViewMode] = useState<"list" | "kanban" | "calendar">(
    "list",
  );
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // ── API Data ──────────────────────────────────────────
  const { data: categories = [] } = useApiCategories();
  const { data: apiEvents = [], isLoading: eventsLoading } = useApiEvents();

  const eventsList = useMemo(() => {
    return apiEvents || [];
  }, [apiEvents]);

  // ── Category mutations ────────────────────────────────
  const { mutate: createCategory, isPending: creatingCat } =
    useCreateApiCategory();
  const { mutate: renameCategory, isPending: renamingCat } =
    useRenameCategory();
  const { mutate: updateCatDesc, isPending: updatingCatDesc } =
    useUpdateCategoryDesc();
  const { mutate: deleteCategory } = useDeleteApiCategory();

  // ── Event mutations ───────────────────────────────────
  const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();
  const { mutate: deleteEvent, isPending: deletingEvent } = useDeleteEvent();

  // ── Modal state ───────────────────────────────────────
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<ApiCategory | null>(null);

  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [manageRegistrationsOpen, setManageRegistrationsOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null);

  // ── Filter & Search Logic ──────────────────────────────
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredEvents = useMemo(() => {
    return eventsList.filter((ev) => {
      const searchMatch =
        !filters.search ||
        ev.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (ev.keyWords &&
          ev.keyWords.some((kw) =>
            kw.toLowerCase().includes(filters.search.toLowerCase()),
          ));

      const catMatch = !filters.category || ev.categoryId === filters.category;

      return searchMatch && catMatch;
    });
  }, [eventsList, filters]);

  // ── Category Handlers ─────────────────────────────────
  const handleCategorySubmit = (data: CreateCategoryFormData) => {
    if (editingCat) {
      renameCategory(
        { id: editingCat.id, data: { newName: data.name } },
        {
          onSuccess: () => {
            toast.success("Category renamed!");
            setCatModalOpen(false);
            setEditingCat(null);
          },
          onError: (e) => toast.error((e as Error).message),
        },
      );
      if (data.description !== editingCat.description) {
        updateCatDesc(
          {
            id: editingCat.id,
            data: { newDescription: data.description ?? null },
          },
          { onError: (e) => toast.error((e as Error).message) },
        );
      }
    } else {
      createCategory(data, {
        onSuccess: () => {
          toast.success("Category created!");
          setCatModalOpen(false);
        },
        onError: (e) => toast.error((e as Error).message),
      });
    }
  };

  // ── Event Handlers ────────────────────────────────────
  const handleCreateEvent = (data: any) => {
    createEvent(data, {
      onSuccess: () => {
        toast.success("Event created successfully!");
        setCreateEventOpen(false);
      },
      onError: (e) => toast.error((e as Error).message),
    });
  };

  const handleDeleteEvent = (ev: ApiEvent) => {
    if (!confirm(`Delete event "${ev.name}"? This cannot be undone.`)) return;
    deleteEvent(ev.id, {
      onSuccess: () => toast.success("Event deleted."),
      onError: (e) => toast.error((e as Error).message),
    });
  };

  const getCatName = (ev: ApiEvent) => {
    return (
      (ev as any).categoryLabel ||
      categories.find((c) => c.id === ev.categoryId)?.name ||
      "Workshop"
    );
  };

  const getCommitteeBadge = (ev: ApiEvent, index: number) => {
    const committee =
      (ev as any).committeeName || (index % 2 === 0 ? "CS" : "General");
    if (committee === "CS") {
      return { name: "CS", bg: "bg-[#EDE9FE] text-[#6D28D9]" };
    }
    if (committee === "PES") {
      return { name: "PES", bg: "bg-[#DCFCE7] text-[#15803D]" };
    }
    if (committee === "RAS") {
      return { name: "RAS", bg: "bg-[#E0F2FE] text-[#0369A1]" };
    }
    return { name: "General", bg: "bg-[#DBEAFE] text-[#1D4ED8]" };
  };

  // Group events for Kanban view columns
  const kanbanColumns = useMemo(() => {
    const comingSoon = filteredEvents.filter(
      (e) => (e as any).statusLabel === "Coming Soon" || e.isCommingSoon,
    );
    const regOpen = filteredEvents.filter(
      (e) =>
        (e as any).statusLabel === "Registration Open" ||
        (!e.isCommingSoon && (e as any).statusLabel !== "Ongoing"),
    );
    const ongoing = filteredEvents.filter(
      (e) => (e as any).statusLabel === "Ongoing",
    );

    return [
      {
        title: "Coming Soon",
        color: "bg-blue-500",
        count: comingSoon.length,
        events: comingSoon,
      },
      {
        title: "Registration Open",
        color: "bg-emerald-500",
        count: regOpen.length,
        events: regOpen,
      },
      {
        title: "Ongoing",
        color: "bg-amber-500",
        count: ongoing.length,
        events: ongoing,
      },
    ];
  }, [filteredEvents]);

  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <div className="min-h-screen pb-12 w-full">
        <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
          <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
          <span className="text-[#000640] font-semibold text-sm">
            &nbsp;events
          </span>
        </div>

        {/* Tab Navigation: Events | Categories */}
        <div className="mb-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex gap-6">
            <Link
              to="/dashboard/events"
              className="pb-3 text-xs font-bold border-b-2 border-[#5A10A5] text-[#5A10A5] transition-all cursor-pointer"
            >
              Events
            </Link>
            <Link
              to="/dashboard/categories"
              className="pb-3 text-xs font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Page Header Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Events Management
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage IEEE events, registrations and scheduling efficiently.
            </p>
          </div>

          {/* Action Buttons Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toast.success("Import CSV feature triggered")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Import CSV
            </button>

            <button
              type="button"
              onClick={() => toast.success("Events exported successfully")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>

            <button
              type="button"
              onClick={() => setCalendarModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync Calendar
            </button>

            <button
              type="button"
              onClick={() => setCreateEventOpen(true)}
              className="bg-[#5A10A5] hover:bg-[#4a0d88] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 border-0 flex items-center transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Event
            </button>
          </div>
        </div>

        {/* ── 5 Stats Boxes Row ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <EventStatsBox
            label="Total Events"
            value={eventsList.length}
            icon={<CalendarDays className="w-5 h-5" />}
            iconBg="bg-[#EDE9FE]"
            iconColor="text-[#6D28D9]"
            change="System total"
          />
          <EventStatsBox
            label="Upcoming Events"
            value={eventsList.filter((e) => e.isCommingSoon || !e.endDate || (e.startDate ? new Date(e.startDate) > new Date() : false)).length}
            icon={<Sparkles className="w-5 h-5" />}
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#15803D]"
            change="Scheduled"
          />
          <EventStatsBox
            label="Ongoing"
            value={eventsList.filter((e) => !e.isCommingSoon && e.startDate && new Date(e.startDate) <= new Date() && (!e.endDate || new Date(e.endDate) >= new Date())).length}
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-[#ECFDF5]"
            iconColor="text-[#065F46]"
            change="Active now"
          />
          <EventStatsBox
            label="Completed"
            value={eventsList.filter((e) => e.endDate ? new Date(e.endDate) < new Date() : false).length}
            icon={<CalendarDays className="w-5 h-5" />}
            iconBg="bg-[#F0FDF4]"
            iconColor="text-[#15803D]"
            change="Past events"
          />
          <EventStatsBox
            label="Categories"
            value={categories.length}
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-[#F0FDF4]"
            iconColor="text-[#15803D]"
            change="Active categories"
          />
        </div>

        {/* ── Events View ───────────────────────────────── */}
        {activeTab === "events" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <EventsFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              categories={categories}
              viewMode={viewMode}
              onViewModeChange={(mode) => setViewMode(mode)}
              totalCount={filteredEvents.length}
            />

            {/* View Mode 1: List View */}
            {viewMode === "list" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                  <div className="rounded-2xl border border-purple-100/80 bg-white overflow-hidden shadow-2xs transition-colors">
                    {eventsLoading ? (
                      <div className="p-12 text-center text-gray-500">
                        Loading events…
                      </div>
                    ) : filteredEvents.length === 0 ? (
                      <div className="p-12 text-center">
                        <CalendarDays className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500 font-medium">
                          No events found.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="font-extrabold text-[11px] uppercase tracking-wider bg-purple-50/50 border-b border-purple-100/70 text-gray-500">
                            <tr>
                              <th className="p-4">EVENT</th>
                              <th className="p-4">COMMITTEE</th>
                              <th className="p-4">CATEGORY</th>
                              <th className="p-4">DATE</th>
                              <th className="p-4">LOCATION</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-50">
                            {filteredEvents.map((ev, idx) => {
                              const committeeBadge = getCommitteeBadge(ev, idx);
                              const catName = getCatName(ev);
                              const initials =
                                (ev as any).initials ||
                                (ev.name
                                  ? ev.name.slice(0, 2).toUpperCase()
                                  : "EV");
                              const initialsBg =
                                (ev as any).initialsBg || "bg-[#EDE9FE]";
                              const initialsColor =
                                (ev as any).initialsColor || "text-[#6D28D9]";
                              const subtitle =
                                (ev as any).subtitle ||
                                "Hands-on machine learning fundamentals";
                              const locationStr =
                                (ev as any).locationLabel ||
                                "Faculty of Computers";

                              return (
                                <tr
                                  key={ev.id}
                                  onClick={() => {
                                    setSelectedEvent(ev);
                                    setDetailsModalOpen(true);
                                  }}
                                  className="group cursor-pointer hover:bg-purple-50/30 transition-colors"
                                >
                                  {/* Event Name & Subtitle */}
                                  <td className="p-4 min-w-[220px]">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-9 h-9 rounded-xl ${initialsBg} ${initialsColor} font-extrabold text-xs flex items-center justify-center shrink-0`}
                                      >
                                        {initials}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="font-extrabold text-xs text-gray-900 group-hover:text-[#5A10A5] transition-colors truncate">
                                          {ev.name}
                                        </p>
                                        <p className="text-[11px] text-gray-400 truncate">
                                          {subtitle}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Committee Badge */}
                                  <td className="p-4">
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${committeeBadge.bg}`}
                                    >
                                      {committeeBadge.name}
                                    </span>
                                  </td>

                                  {/* Category Badge */}
                                  <td className="p-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-50 text-purple-700">
                                      {catName}
                                    </span>
                                  </td>

                                  {/* Date */}
                                  <td className="p-4 text-gray-700 font-bold whitespace-nowrap">
                                    {formatDate(ev.startDate)}
                                  </td>

                                  {/* Location */}
                                  <td className="p-4 text-gray-500 whitespace-nowrap font-medium">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-gray-400" />
                                      {locationStr}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* Pagination / Rows per page bar */}
                        <div className="p-3 bg-purple-50/20 border-t border-purple-100/60 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <span>Rows per page</span>
                            <select className="px-2 py-1 rounded-lg border border-gray-200 bg-white text-xs font-semibold">
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side Widgets Column */}
                <div className="lg:col-span-4 space-y-6">
                  <UpcomingEventsCard
                    events={eventsList}
                    onSelectEvent={(ev) => {
                      setSelectedEvent(ev);
                      setDetailsModalOpen(true);
                    }}
                    onViewAll={() => setViewMode("list")}
                  />
                  <EventsCalendarCard
                    onOpenFullCalendar={() => setCalendarModalOpen(true)}
                  />
                  <EventsAnalyticsCard />
                </div>
              </div>
            )}

            {/* View Mode 2: Kanban View */}
            {viewMode === "kanban" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {kanbanColumns.map((col) => (
                  <div
                    key={col.title}
                    className="rounded-2xl p-4 border border-gray-200 bg-gray-50/70 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${col.color}`}
                        />
                        <h3 className="font-bold text-sm tracking-tight text-gray-900">
                          {col.title}
                        </h3>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-gray-200 text-xs font-bold flex items-center justify-center text-gray-600">
                        {col.count}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {col.events.map((ev) => {
                        const regCount = (ev as any).registeredCount || 230;
                        const capCount = (ev as any).capacityCount || 250;
                        const pct = Math.round((regCount / capCount) * 100);
                        const committee = (ev as any).committeeName || "CS";

                        return (
                          <div
                            key={ev.id}
                            onClick={() => {
                              setSelectedEvent(ev);
                              setDetailsModalOpen(true);
                            }}
                            className="p-4 rounded-2xl border border-purple-100 bg-white hover:border-purple-300 transition-all duration-200 cursor-pointer space-y-3 hover:shadow-xs"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-sm text-gray-900 hover:text-[#5A10A5]">
                                {ev.name}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-[#5A10A5] shrink-0">
                                {committee}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                              <span>{formatDate(ev.startDate)}</span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                                <span>
                                  {regCount}/{capCount}
                                </span>
                                <span>{pct}%</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[#5A10A5]"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View Mode 3: Calendar View */}
            {viewMode === "calendar" && (
              <div className="rounded-2xl p-6 border border-purple-100 bg-white shadow-2xs transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-extrabold text-lg tracking-tight text-gray-900">
                    August 2026
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-900"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-900"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-400 mb-3">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="grid grid-cols-7 gap-2 text-xs font-semibold">
                  <div className="h-20" />
                  <div className="h-20" />
                  <div className="h-20" />
                  <div className="h-20" />
                  <div className="h-20" />

                  {Array.from({ length: 31 }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = filteredEvents.filter((e) => {
                      const date = e.startDate ? new Date(e.startDate) : null;
                      return date
                        ? date.getDate() === day
                        : day === 1 ||
                            day === 2 ||
                            day === 4 ||
                            day === 10 ||
                            day === 18;
                    });

                    return (
                      <div
                        key={day}
                        className="h-24 p-1.5 rounded-xl border border-purple-100/70 bg-purple-50/20 flex flex-col justify-between transition-colors"
                      >
                        <span className="text-[11px] font-bold text-gray-500">
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((ev) => (
                              <span
                                key={ev.id}
                                onClick={() => {
                                  setSelectedEvent(ev);
                                  setDetailsModalOpen(true);
                                }}
                                className="block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#5A10A5] text-white truncate cursor-pointer hover:opacity-90"
                              >
                                {ev.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Modals Wire Up ─────────────────────────────── */}
        <CategoryModal
          isOpen={catModalOpen}
          onClose={() => {
            setCatModalOpen(false);
            setEditingCat(null);
          }}
          onSubmit={handleCategorySubmit}
          category={editingCat}
          isLoading={creatingCat || renamingCat || updatingCatDesc}
        />

        <CreateEventModal
          isOpen={createEventOpen}
          onClose={() => setCreateEventOpen(false)}
          onSubmit={handleCreateEvent}
          categories={categories}
          isLoading={creatingEvent}
        />

        <EventDetailsModal
          isOpen={detailsModalOpen}
          event={selectedEvent}
          onClose={() => setDetailsModalOpen(false)}
          onEdit={() => {
            setDetailsModalOpen(false);
            setEditModalOpen(true);
          }}
          onManageRegistrations={() => {
            setDetailsModalOpen(false);
            setManageRegistrationsOpen(true);
          }}
        />

        <EditEventModal
          isOpen={editModalOpen}
          event={selectedEvent}
          onClose={() => setEditModalOpen(false)}
          onSave={() => {
            toast.success("Event updated successfully!");
          }}
        />

        <ManageRegistrationsModal
          isOpen={manageRegistrationsOpen}
          event={selectedEvent}
          onClose={() => setManageRegistrationsOpen(false)}
        />

        <CalendarModal
          isOpen={calendarModalOpen}
          onClose={() => setCalendarModalOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
};

export default EventsDashboard;
