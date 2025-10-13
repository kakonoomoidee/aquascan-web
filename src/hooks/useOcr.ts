import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- API Functions ---
const searchCustomer = async (nosbg: string) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/officer/clients/${nosbg}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

const processOcr = async (payload: { nosbg: string; photo: File }) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nosbg", payload.nosbg);
  formData.append("file", payload.photo);

  const res = await axios.post(`${API_BASE}/officer/ocr`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

const submitReading = async (payload: {
  upload_id: number;
  hasil_bacaan: string;
}) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API_BASE}/officer/submit`, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("payload: ", payload);
  return res.data;
};

// --- Custom Hook ---
export const useOcr = () => {
  const searchCustomerMutation = useMutation({ mutationFn: searchCustomer });
  const processOcrMutation = useMutation({ mutationFn: processOcr });
  const submitReadingMutation = useMutation({ mutationFn: submitReading });

  return {
    searchCustomer: searchCustomerMutation.mutateAsync,
    isSearching: searchCustomerMutation.isPending,
    searchError: searchCustomerMutation.error,

    processOcr: processOcrMutation.mutateAsync,
    isProcessingOcr: processOcrMutation.isPending,
    ocrError: processOcrMutation.error,

    submitReading: submitReadingMutation.mutateAsync,
    isSubmitting: submitReadingMutation.isPending,
    submitError: submitReadingMutation.error,
  };
};
