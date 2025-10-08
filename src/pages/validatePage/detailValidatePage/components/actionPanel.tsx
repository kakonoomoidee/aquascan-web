import React from "react";
import { IconCheck, IconX } from "@src/components/icons/index";

interface ActionPanelProps {
  message: string;
  setMessage: (value: string) => void;
  onValidate: (isValid: boolean) => void;
  loading: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  message,
  setMessage,
  onValidate,
  loading,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-2 text-slate-700">Aksi Validasi</h2>
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Tulis catatan (opsional, wajib diisi jika ditolak)..."
      className="w-full p-3 border border-slate-300 rounded-md mb-4 focus:ring-2 focus:ring-sky-500 outline-none transition resize-none" // <-- KELAS `resize-none` BUAT KUNCI UKURAN
      rows={3}
    />
    <div className="flex space-x-4">
      <button
        onClick={() => onValidate(true)}
        disabled={loading}
        className="flex-1 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <IconCheck />
        <span>Valid</span>
      </button>
      <button
        onClick={() => onValidate(false)}
        disabled={loading}
        className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <IconX />
        <span>Invalid</span>
      </button>
    </div>
  </div>
);
