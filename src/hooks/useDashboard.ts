import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Fungsi untuk fetch data count
const fetchValidationCount = async (): Promise<number> => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_BASE}/admin/uploads/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data.count || 0;
  } catch (error) {
    console.error("Gagal fetch validation count:", error);
    throw new Error("Gagal mengambil jumlah validasi");
  }
};

// Hook custom yang akan kita pakai di komponen
export const useValidationCount = () => {
  return useQuery<number, Error>({
    queryKey: ["validationCount"],
    queryFn: fetchValidationCount,
    refetchInterval: 60000,
  });
};
