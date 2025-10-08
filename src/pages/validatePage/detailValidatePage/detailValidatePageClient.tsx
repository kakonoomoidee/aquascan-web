import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Sidebar } from "@src/components/index";
import { useValidation } from "@src/hooks/index";
import { type Upload } from "@src/models/index";
import { DetailSkeleton, PhotoPanel, DetailPanel } from "./components/index";
import Swal from "sweetalert2";

const ValidationDetailClient: React.FC = () => {
  const { uploadId } = useParams<{ uploadId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchUploadDetail, validateUpload, loading, error } = useValidation();
  const [upload, setUpload] = useState<Upload | null>(null);
  const [message, setMessage] = useState("");

  const previousState = location.state || { page: 1, limit: 10 };

  useEffect(() => {
    document.title = `Validasi #${uploadId} - AquaScan Admin`;
    if (uploadId) {
      fetchUploadDetail(uploadId).then((data) => setUpload(data));
    }
  }, [uploadId, fetchUploadDetail]);

  const backPath = (() => {
    const params = new URLSearchParams();
    if (previousState.page > 1) params.set("page", String(previousState.page));
    if (previousState.limit !== 10)
      params.set("limit", String(previousState.limit));
    return `/validation?${params.toString()}`;
  })();

  const handleValidate = (isValid: boolean) => {
    if (!upload) return;
    if (!isValid && !message.trim()) {
      Swal.fire(
        "Catatan Kosong",
        "Harap isi catatan kenapa upload ini ditolak.",
        "error"
      );
      return;
    }

    Swal.fire({
      title: `Yakin ${isValid ? "Validasi" : "Tolak"} data ini?`,
      text: "Aksi ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isValid ? "#22c55e" : "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: `Ya, ${isValid ? "Validasi" : "Tolak"}!`,
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await validateUpload(upload.id, isValid, message);
          await Swal.fire("Berhasil!", "Data telah divalidasi.", "success");
          navigate(backPath);
        } catch (err) {
          Swal.fire("Gagal!", "Terjadi kesalahan saat validasi.", "error");
        }
      }
    });
  };

  const renderContent = () => {
    if (loading) return <DetailSkeleton />;
    if (error)
      return <p className="p-4 bg-red-100 rounded-lg text-red-500">{error}</p>;
    if (!upload)
      return (
        <p className="text-center text-slate-500 mt-10">
          Data tidak ditemukan.
        </p>
      );

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PhotoPanel
          imageUrl={upload.file_path}
          altText={`Foto meteran untuk ${upload.nosbg}`}
        />
        <DetailPanel
          upload={upload}
          message={message}
          setMessage={setMessage}
          onValidate={handleValidate}
          loading={loading}
        />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Detail Validasi #{uploadId}
          </h1>
          <Link
            to={backPath}
            className="px-4 py-2 bg-white border border-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 transition"
          >
            Kembali ke Daftar
          </Link>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default ValidationDetailClient;
