// file: src/hooks/useCustomer.ts
import { useState, useCallback } from "react";
import axios from "axios";
import { type Customer } from "@src/models/customer";
import { type PaginationInfo } from "@src/models/pagination";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface UseCustomerResult {
  customers: Customer[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  fetchCustomers: (
    page?: number,
    limit?: number,
    search?: string
  ) => Promise<void>;
  fetchCustomerDetail: (nosbg: string) => Promise<Customer | null>;
}

export function useCustomer(): UseCustomerResult {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(
    async (page = 1, limit = 10, search = "") => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (search) {
          params.append("search", search);
        }

        const res = await axios.get(
          `${API_BASE}/clients?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCustomers(res.data.data.results || []);
        setPagination({
          totalPages: res.data.data.totalPages || 1,
          totalItems: res.data.data.totalItems || 0,
          currentPage: res.data.data.currentPage || page,
        });
      } catch (err: any) {
        setError(err.response?.data?.error || "Gagal fetch data");
        setCustomers([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchCustomerDetail = async (
    nosbg: string
  ): Promise<Customer | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/admin/clients/${nosbg}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.error || "Gagal fetch detail");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    pagination,
    loading,
    error,
    fetchCustomers,
    fetchCustomerDetail,
  };
}
