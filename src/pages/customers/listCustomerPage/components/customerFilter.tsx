import React from "react";
import { IconSearch } from "@src/components/icons/index";

interface CustomerFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;
}

export const CustomerFilter: React.FC<CustomerFilterProps> = ({
  searchTerm,
  setSearchTerm,
  limit,
  setLimit,
}) => (
  <div className="mb-4 p-4 bg-white rounded-xl shadow-lg flex justify-between items-center">
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <IconSearch className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
        placeholder="Cari nama atau No. SBG..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="flex gap-2 items-center">
      <label className="text-sm font-medium text-slate-600">Show:</label>
      <select
        className="border border-slate-200 rounded-lg px-2 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-sky-500 outline-none"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  </div>
);
