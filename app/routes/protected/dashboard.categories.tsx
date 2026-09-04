import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import {
  Plus,
  Folder,
  CheckCircle2,
  EyeOff,
  CalendarDays,
  Download,
  Upload,
} from "lucide-react";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { CategoryStatsBox } from "~/components/categories/CategoryStatsBox";
import { CategoryCard, type CategoryItem } from "~/components/categories/CategoryCard";
import { MostUsedCategories } from "~/components/categories/MostUsedCategories";
import { NewestCategory } from "~/components/categories/NewestCategory";
import { CategoriesAnalytics } from "~/components/categories/CategoriesAnalytics";
import { CategoryRecentActivity } from "~/components/categories/CategoryRecentActivity";
import { CategoryUsage } from "~/components/categories/CategoryUsage";
import { CategoryFilters, type CategoryFilterState } from "~/components/categories/CategoryFilters";
import { AddCategoryModal } from "~/components/categories/AddCategoryModal";
import { CategoryDetailsModal } from "~/components/categories/CategoryDetailsModal";
import { DuplicateCategoryModal } from "~/components/categories/DuplicateCategoryModal";
import { ArchiveCategoryModal } from "~/components/categories/ArchiveCategoryModal";
import { DeleteCategoryModal } from "~/components/categories/DeleteCategoryModal";

import {
  useApiCategories,
  useCreateApiCategory,
  useRenameCategory,
  useUpdateCategoryDesc,
  useDeleteApiCategory,
} from "~/hooks/useEventsAndCategories";

export function meta() {
  return [
    { title: "Event Categories - IEEE BNS Dashboard" },
    { name: "description", content: "Manage all IEEE BNS event categories" },
  ];
}

const INITIAL_FILTERS: CategoryFilterState = {
  search: "",
  status: "",
  sortBy: "",
};

export function CategoryManagementView() {
  const [filters, setFilters] = useState<CategoryFilterState>(INITIAL_FILTERS);

  // ── API Data ──────────────────────────────────────────
  const { data: apiCategories = [], isLoading: catLoading } = useApiCategories();
  const { mutate: createCategory, isPending: creatingCat } = useCreateApiCategory();
  const { mutate: deleteCategory } = useDeleteApiCategory();

  const categoriesList: CategoryItem[] = useMemo(() => {
    if (apiCategories && Array.isArray(apiCategories) && apiCategories.length > 0) {
      return apiCategories.map((cat: any) => ({
        id: String(cat.id),
        name: cat.name,
        description: cat.description || "IEEE Event Category",
        status: "Active",
        totalEvents: 0,
        upcomingEvents: 0,
        createdDate: "Active",
        lastUpdated: "Recently",
        color: "#5A10A5",
        bgColor: "#EEE3FA",
      }));
    }
    return [];
  }, [apiCategories]);

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  // Filter & Search Logic
  const handleFilterChange = (key: keyof CategoryFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const filteredCategories = useMemo(() => {
    return categoriesList.filter((cat) => {
      const searchMatch =
        !filters.search ||
        cat.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(filters.search.toLowerCase()));

      const statusMatch = !filters.status || cat.status === filters.status;

      return searchMatch && statusMatch;
    });
  }, [categoriesList, filters]);

  // Handlers for category actions
  const handleCreateOrUpdateCategory = (data: any) => {
    createCategory(
      { name: data.name, description: data.description },
      {
        onSuccess: () => {
          toast.success("Category saved successfully!");
          setAddModalOpen(false);
          setEditingCategory(null);
        },
        onError: (err) => toast.error((err as Error).message),
      }
    );
  };

  const handleDuplicateCategory = (cat: CategoryItem) => {
    createCategory(
      { name: `${cat.name} (Copy)`, description: cat.description },
      {
        onSuccess: () => {
          toast.success(`Duplicated category "${cat.name}"`);
          setDuplicateModalOpen(false);
        },
        onError: (err) => toast.error((err as Error).message),
      }
    );
  };

  const handleArchiveCategory = (cat: CategoryItem) => {
    toast.success(`Archived category "${cat.name}"`);
    setArchiveModalOpen(false);
  };

  const handleDeleteCategory = (cat: CategoryItem) => {
    deleteCategory(cat.id, {
      onSuccess: () => {
        toast.success(`Deleted category "${cat.name}"`);
        setDeleteModalOpen(false);
      },
      onError: (err: Error) => toast.error(err.message),
    });
  };

  const activeCount = categoriesList.filter((c) => c.status === "Active").length;
  const hiddenCount = categoriesList.filter((c) => c.status === "Hidden").length;
  const totalEventsAssigned = categoriesList.reduce((acc, c) => acc + c.totalEvents, 0);

  return (
    <div className="min-h-screen pb-12 w-full">
      <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;categories
        </span>
      </div>

      {/* Sub-tabs header: Events | Categories */}
      <div className="mb-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex gap-6">
          <Link
            to="/dashboard/events"
            className="pb-3 text-xs font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
          >
            Events
          </Link>
          <Link
            to="/dashboard/categories"
            className="pb-3 text-xs font-bold border-b-2 border-[#5A10A5] text-[#5A10A5] transition-all cursor-pointer"
          >
            Categories
          </Link>
        </div>
      </div>

      {/* Page Header Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Event Categories
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Manage all IEEE event categories.
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => toast.success("Exported categories successfully")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>

          <button
            type="button"
            onClick={() => toast.success("Import categories triggered")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-purple-100/80 text-gray-700 bg-white hover:bg-purple-50 transition-all shadow-2xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" /> Import
          </button>

          <button
            type="button"
            onClick={() => {
              setEditingCategory(null);
              setAddModalOpen(true);
            }}
            className="bg-[#5A10A5] hover:bg-[#4a0d88] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-purple-500/20 border-0 flex items-center transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" /> + Add Category
          </button>
        </div>
      </div>

      {/* ── 4 Stats Boxes Row ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CategoryStatsBox
          label="Total Categories"
          value={categoriesList.length}
          subtext="+0 this month"
          icon={<Folder className="w-5 h-5" />}
          iconBg="#EEE3FA"
          iconColor="#5A10A5"
          numberColor="#5A10A5"
        />
        <CategoryStatsBox
          label="Active Categories"
          value={activeCount}
          subtext={`${Math.round((activeCount / (categoriesList.length || 1)) * 100)}% of total`}
          icon={<CheckCircle2 className="w-5 h-5" />}
          iconBg="#D1FAE5"
          iconColor="#059669"
          numberColor="#059669"
        />
        <CategoryStatsBox
          label="Hidden Categories"
          value={hiddenCount}
          subtext="Not shown publicly"
          icon={<EyeOff className="w-5 h-5" />}
          iconBg="#F3F4F6"
          iconColor="#6B7280"
          numberColor="#6B7280"
        />
        <CategoryStatsBox
          label="Events Assigned"
          value={totalEventsAssigned || 48}
          subtext="Across all categories"
          icon={<CalendarDays className="w-5 h-5" />}
          iconBg="#E8ECFD"
          iconColor="#4460EF"
          numberColor="#4460EF"
        />
      </div>

      {/* Filters Bar */}
      <div className="mb-6">
        <CategoryFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          totalCount={filteredCategories.length}
        />
      </div>

      {/* Main Section: Categories Grid (Left) + Widgets (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Categories Grid */}
        <div className="lg:col-span-8">
          {filteredCategories.length === 0 ? (
            <div className="p-12 text-center border border-purple-100 rounded-2xl bg-white shadow-2xs">
              <Folder className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No categories found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCategories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  onView={(c) => {
                    setSelectedCategory(c);
                    setDetailsModalOpen(true);
                  }}
                  onEdit={(c) => {
                    setEditingCategory(c);
                    setAddModalOpen(true);
                  }}
                  onDuplicate={(c) => {
                    setSelectedCategory(c);
                    setDuplicateModalOpen(true);
                  }}
                  onArchive={(c) => {
                    setSelectedCategory(c);
                    setArchiveModalOpen(true);
                  }}
                  onDelete={(c) => {
                    setSelectedCategory(c);
                    setDeleteModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <MostUsedCategories />
          <NewestCategory />
          <CategoriesAnalytics />
          {/* <CategoryRecentActivity /> */}
        </div>
      </div>

      {/* Final Card: Category Usage (Bottom full-width) */}
      {/* <CategoryUsage /> */}

      {/* Modals Wire Up */}
      <AddCategoryModal
        isOpen={addModalOpen}
        category={editingCategory as any}
        onClose={() => {
          setAddModalOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleCreateOrUpdateCategory}
        isLoading={creatingCat}
      />

      <CategoryDetailsModal
        isOpen={detailsModalOpen}
        category={selectedCategory}
        onClose={() => setDetailsModalOpen(false)}
        onEdit={(c) => {
          setDetailsModalOpen(false);
          setEditingCategory(c);
          setAddModalOpen(true);
        }}
      />

      <DuplicateCategoryModal
        isOpen={duplicateModalOpen}
        category={selectedCategory}
        onClose={() => setDuplicateModalOpen(false)}
        onConfirm={handleDuplicateCategory}
      />

      <ArchiveCategoryModal
        isOpen={archiveModalOpen}
        category={selectedCategory}
        onClose={() => setArchiveModalOpen(false)}
        onConfirm={handleArchiveCategory}
      />

      <DeleteCategoryModal
        isOpen={deleteModalOpen}
        category={selectedCategory}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
      />
    </div>
  );
}

export default function CategoryManagementPage() {
  return (
    <ProtectedRoute allowedRoles={[1, 2]}>
      <CategoryManagementView />
    </ProtectedRoute>
  );
}
