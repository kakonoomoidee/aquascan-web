import React from "react";
import { Link } from "react-router-dom";

interface DetailPageHeaderProps {
  nosbg?: string;
  backPath: string;
}

export const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({
  nosbg,
  backPath,
}) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-3xl font-bold text-slate-800">Detail Pelanggan</h1>
      <p className="text-slate-500 mt-1">
        Informasi lengkap untuk No. SBG {nosbg || "..."}
      </p>
    </div>
    <Link
      to={backPath}
      className="px-4 py-2 bg-white border border-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 transition"
    >
      Kembali ke Daftar
    </Link>
  </div>
);
