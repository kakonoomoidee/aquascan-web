"use client";

import { useEffect, useState } from "react";
import Sidebar from "@src/components/sidebar";

interface Upload {
  id: number;
  nosbg: string;
  file_name: string;
  file_path: string;
  hasil_ocr: string;
  hasil_bacaan: string;
  uploaded_at: string;
  status: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ValidateClient = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<{ [key: number]: string }>({});

  // 🔹 Ambil semua upload yang masih submitted
  const fetchPendingUploads = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/uploads/submitted`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal memuat data upload");
      }

      const data = await res.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setUploads(data.data);
      } else {
        setError(data.message || "Gagal mengambil data upload");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan tak terduga");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fungsi untuk validasi (valid / invalid)
  const handleValidate = async (id: number, isValid: boolean) => {
    const msg = message[id] || "";
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/admin/uploads/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          upload_id: id,
          is_valid: isValid,
          validation_message: msg,
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === "success") {
        // Hapus dari tabel jika sudah divalidasi
        setUploads((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(`Gagal validasi: ${data.message}`);
      }
    } catch (err: any) {
      alert("Terjadi kesalahan saat validasi: " + err.message);
    }
  };

  useEffect(() => {
    fetchPendingUploads();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Validasi Upload Pengguna
        </h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : uploads.length === 0 ? (
          <p>Tidak ada upload yang perlu divalidasi 🎉</p>
        ) : (
          <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border-b">No. SBG</th>
                  <th className="p-2 border-b">File</th>
                  <th className="p-2 border-b">Hasil OCR</th>
                  <th className="p-2 border-b">Hasil Bacaan</th>
                  <th className="p-2 border-b">Uploaded At</th>
                  <th className="p-2 border-b">Catatan</th>
                  <th className="p-2 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{u.nosbg}</td>
                    <td className="p-2">
                      <a
                        href={u.file_path}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {u.file_name}
                      </a>
                    </td>
                    <td className="p-2">{u.hasil_ocr || "-"}</td>
                    <td className="p-2">{u.hasil_bacaan || "-"}</td>
                    <td className="p-2">
                      {new Date(u.uploaded_at).toLocaleString("id-ID")}
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        placeholder="Tulis catatan..."
                        className="border p-1 rounded w-full"
                        value={message[u.id] || ""}
                        onChange={(e) =>
                          setMessage((prev) => ({
                            ...prev,
                            [u.id]: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="p-2 text-center space-x-2">
                      <button
                        onClick={() => handleValidate(u.id, true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Valid
                      </button>
                      <button
                        onClick={() => handleValidate(u.id, false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Invalid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateClient;
