import React, { useEffect } from "react";
import { useCustomer } from "@src/hooks/useCustomer";
import Sidebar from "@src/components/sidebar";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "@src/context/CustomerContext";
import { ROUTES } from "@src/routes/routes";
import useDebounce from "@src/hooks/useDebounce";
import Pagination from "@src/components/pagination";

// --- Helper Component untuk Skeleton Loading ---
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="h-4 bg-slate-200 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-slate-200 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-slate-200 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-slate-200 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-slate-200 rounded"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-slate-200 rounded"></div>
    </td>
  </tr>
);

// --- Komponen Utama Halaman ---
const CustomerClient: React.FC = () => {
  const { customers, pagination, loading, error, fetchCustomers } =
    useCustomer();
  const navigate = useNavigate();
  const { page, setPage, limit, setLimit, searchTerm, setSearchTerm } =
    useCustomerContext();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    document.title = "Daftar Pelanggan - AquaScan Admin";
    fetchCustomers(page, limit, debouncedSearchTerm);
  }, [page, limit, debouncedSearchTerm, fetchCustomers]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Daftar Pelanggan
            </h1>
            <p className="text-slate-500 mt-1">
              Cari dan kelola data pelanggan.
            </p>
          </div>
        </div>

        <div className="mb-4 p-4 bg-white rounded-xl shadow-lg flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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

        {error && (
          <p className="text-red-500 p-4 bg-red-100 rounded-lg">{error}</p>
        )}

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
                      onClick={() =>
                        navigate(ROUTES.clients.detail(String(c.nosbg)))
                      }
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

        <div className="flex justify-center items-center mt-6">
          {!loading && pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerClient;
