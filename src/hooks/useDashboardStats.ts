import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface OfficerStats {
  admin_total: number;
  officers_active: number;
}

const fetchStat = async <T>(endpoint: string): Promise<T> => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/admin/statistics/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const useSubmittedUploads = () =>
  useQuery({
    queryKey: ["submittedUploads"],
    queryFn: () => fetchStat<{ submitted_uploads: number }>("submittedUploads"),
    select: (data) => data.submitted_uploads ?? 0,
    refetchInterval: 60_000,
  });

export const useValidatedToday = () =>
  useQuery({
    queryKey: ["validatedToday"],
    queryFn: () => fetchStat<{ validated_today: number }>("validatedToday"),
    select: (data) => data.validated_today ?? 0,
    refetchInterval: 30 * 60_000,
  });

export const useActiveOfficers = () =>
  useQuery<OfficerStats, Error>({
    queryKey: ["activeOfficers"],
    queryFn: () => fetchStat<OfficerStats>("activeOfficers"),
    refetchInterval: 2 * 60 * 60_000,
  });

export const useTotalSubmissions = () =>
  useQuery({
    queryKey: ["totalSubmissions"],
    queryFn: () => fetchStat<{ total_submission: number }>("totalSubmissions"),
    select: (data) => data.total_submission ?? 0,
    refetchInterval: 60 * 60_000,
  });
