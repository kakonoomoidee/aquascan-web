import React from "react";
import { SkeletonRow } from "./skeletonRow";
import type { Customer } from "@src/models/customer";

interface CustomerTableProps {
  loading: boolean;
  customers: Customer[];
  limit: number;
  onRowClick: (nosbg: string) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  loading,
  customers,
  limit,
  onRowClick,
}) => (
  <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
            ID
          </th>
          <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
            No SBG
          </th>
          <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
            Nama
          </th>
          <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
            Alamat
          </th>
          <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
            Longitude
          </th>
          <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
            Latitude
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {loading
          ? [...Array(limit)].map((_, i) => <SkeletonRow key={i} />)
          : customers.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-slate-50 cursor-pointer"
                onClick={() => onRowClick(String(c.nosbg))}
              >
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                  {c.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">
                  {c.nosbg}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-800">
                  {c.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600 truncate max-w-xs">
                  {c.alamat}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                  {c.long}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                  {c.lat}
                </td>
              </tr>
            ))}
        {!loading && customers.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center py-10 text-slate-500">
              Data tidak ditemukan.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
