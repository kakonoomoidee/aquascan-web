import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Pagination } from "@src/components";
import { useValidation, useUrlState } from "@src/hooks";
import { type Upload } from "@src/models";

// Import semua komponen spesifik
import {
  ValidationPageHeader,
  SkeletonCard,
  ValidationCard,
  EmptyState,
} from "./components/index";

const ListValidatePageClient: React.FC = () => {
  const { uploads, pagination, loading, error, fetchPendingUploads } =
    useValidation();
  const { page, setPage, limit } = useUrlState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Validasi Upload - AquaScan Admin";
    fetchPendingUploads(page, limit);
  }, [page, limit, fetchPendingUploads]);

  const handleCardClick = (uploadId: number) => {
    navigate(`/validation/${uploadId}`, { state: { page, limit } });
  };

  const renderContent = () => {
    if (loading) {
      return [...Array(limit)].map((_, i) => <SkeletonCard key={i} />);
    }
    if (uploads.length > 0) {
      return uploads.map((upload: Upload) => (
        <ValidationCard
          key={upload.id}
          upload={upload}
          onClick={() => handleCardClick(upload.id)}
        />
      ));
    }
    return null;
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <ValidationPageHeader />

        {error && (
          <p className="text-red-500 p-4 bg-red-100 rounded-lg mb-6">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {renderContent()}
        </div>

        {!loading && uploads.length === 0 && !error && <EmptyState />}

        <div className="flex justify-center items-center mt-6">
          {!loading && pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ListValidatePageClient;
