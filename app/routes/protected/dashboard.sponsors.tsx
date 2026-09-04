import { useState } from "react";
import toast from "react-hot-toast";
import { ProtectedRoute } from "~/components/ProtectedRoute";
import { Button } from "~/components/ui/Button";
import { Plus } from "lucide-react";
import { 
  useAllSponsors, 
  useCreateSponsor, 
  useUpdateSponsor, 
  useDeleteSponsor 
} from "~/hooks/useApi";
import type { ISponsorCard } from "~/types";
import SponsorCard from "~/components/Sponsors/SponsorCard";
import { SponsorFormModal } from "~/components/Sponsors/SponsorFormModal";

const SponsorsManagement = () => {
  const { data: sponsors, isLoading, isError, error } = useAllSponsors();
  const { mutateAsync: createSponsor } = useCreateSponsor();
  const { mutateAsync: updateSponsor } = useUpdateSponsor();
  const { mutateAsync: deleteSponsor } = useDeleteSponsor();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<ISponsorCard | null>(null);

  const handleOpenAddModal = () => {
    setSelectedSponsor(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (sponsor: ISponsorCard) => {
    setSelectedSponsor(sponsor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this sponsor?")) {
      try {
        await deleteSponsor(id);
        toast.success("Sponsor deleted successfully");
      } catch (err: any) {
        toast.error(err.message || "Failed to delete sponsor");
      }
    }
  };

  const handleModalSubmit = async (formData: FormData) => {
    try {
      if (selectedSponsor) {
        await updateSponsor({ id: selectedSponsor.id, data: formData });
        toast.success("Sponsor updated successfully");
      } else {
        await createSponsor(formData);
        toast.success("Sponsor created successfully");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save sponsor");
    }
  };

  return (
    <ProtectedRoute allowedRoles={[1]}>
      <div className="space-y-6 rounded-2xl">
        <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
          <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
          <span className="text-[#000640] font-semibold text-sm">
            &nbsp;sponsors
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Sponsors Management
          </h1>
          <Button onClick={handleOpenAddModal} variant="primary" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Sponsor
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow min-h-[50vh]">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Sponsors & Partners
            </h2>
          </div>
          <div className="p-6">
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
                <p className="text-gray-500 mt-4">Loading sponsors...</p>
              </div>
            )}
            
            {isError && (
              <div className="text-center py-12 text-red-600">
                {(error as Error)?.message || "Failed to load sponsors"}
              </div>
            )}

            {!isLoading && !isError && sponsors && sponsors.length > 0 && (
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {sponsors.map((sponsor: ISponsorCard) => (
                  <SponsorCard
                    key={sponsor.id}
                    id={sponsor.id}
                    description={sponsor.description}
                    img={sponsor.img}
                    title={sponsor.title || sponsor.name || ""}
                    onEdit={() => handleOpenEditModal(sponsor)}
                    onDelete={() => handleDelete(sponsor.id)}
                  />
                ))}
              </div>
            )}

            {!isLoading && !isError && (!sponsors || sponsors.length === 0) && (
              <div className="text-center py-12 text-gray-500">
                No sponsors found. Click "Add Sponsor" to create one.
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SponsorFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sponsor={selectedSponsor}
          onSubmit={handleModalSubmit}
        />
      )}
    </ProtectedRoute>
  );
};

export default SponsorsManagement;
