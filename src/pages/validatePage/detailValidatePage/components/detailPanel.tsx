import React from "react";
import { type Upload } from "@src/models";
import { ActionPanel } from "./actionPanel";

// Komponen kecil buat nampilin data biar konsisten
const DataPoint: React.FC<{
  label: string;
  value: React.ReactNode;
  className?: string;
}> = ({ label, value, className }) => (
  <div className={className}>
    <dt className="font-medium text-slate-500 text-sm">{label}</dt>
    <dd className="text-slate-800">{value}</dd>
  </div>
);

interface DetailPanelProps {
  upload: Upload;
  message: string;
  setMessage: (value: string) => void;
  onValidate: (isValid: boolean) => void;
  loading: boolean;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  upload,
  ...actionPanelProps
}) => (
  <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
    <div>
      <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-slate-700">
        Detail Data
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <DataPoint
          label="No. SBG"
          value={<span className="text-lg font-bold">{upload.nosbg}</span>}
        />
        <DataPoint
          label="Status"
          value={<span className="text-lg capitalize">{upload.status}</span>}
        />
        <DataPoint
          label="Hasil OCR"
          value={
            <span className="text-2xl font-mono bg-slate-100 px-3 py-1 rounded-md inline-block">
              {upload.hasil_ocr}
            </span>
          }
        />
        <DataPoint
          label="Hasil Bacaan Petugas"
          value={
            <span className="text-2xl font-mono text-sky-600 bg-sky-100 px-3 py-1 rounded-md inline-block">
              {upload.hasil_bacaan}
            </span>
          }
        />
        <DataPoint
          label="Waktu Upload"
          value={
            <span className="text-base">
              {new Date(upload.uploaded_at).toLocaleString("id-ID", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </span>
          }
          className="sm:col-span-2"
        />
      </dl>
    </div>
    <ActionPanel {...actionPanelProps} />
  </div>
);
