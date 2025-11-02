import { useState, useCallback } from "react";
import axios from "axios";
import { type Upload, type PaginationInfo } from "@src/models/index"; // Asumsi tipe ada di models

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function useValidation() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingUploads = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE}/admin/uploads/submitted?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // parsing data
      setUploads(res.data.data || []);
      const meta = res.data.meta;
      if (meta) {
        setPagination({
          totalPages: meta.total_pages || 1,
          totalItems: meta.total || 0,
          currentPage: meta.page || page,
        });
      } else {
        setPagination(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUploadDetail = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/admin/uploads/${id}/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.upload as Upload;
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal memuat detail");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const validateUpload = useCallback(
    async (id: number, isValid: boolean, message: string) => {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/admin/uploads/validate`,
        {
          upload_id: id,
          is_valid: isValid,
          validation_message: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    []
  );

  return {
    uploads,
    pagination,
    loading,
    error,
    fetchPendingUploads,
    fetchUploadDetail,
    validateUpload,
  };
}
