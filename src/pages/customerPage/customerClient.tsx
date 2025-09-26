import React, { useEffect, useState, useMemo } from "react";
import { useCustomer } from "@src/hooks/useCostomer";
import Sidebar from "@src/components/sidebar";

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

// --- Hook simple untuk Debounce ---
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// --- Hook untuk Pagination ---
const DOTS = "...";
const usePagination = ({
  totalPages,
  siblingCount = 1,
  currentPage,
}: {
  totalPages: number;
  siblingCount?: number;
  currentPage: number;
}) => {
  const paginationRange = useMemo(() => {
    // ... (logic usePagination tidak berubah)
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalPages, siblingCount, currentPage]);
  return paginationRange;
};

// --- Komponen Pagination ---
const Pagination = ({
  onPageChange,
  totalPages,
  currentPage,
}: {
  onPageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
}) => {
  const paginationRange = usePagination({ currentPage, totalPages });
  if (currentPage === 0 || paginationRange.length < 2) return null;
  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav aria-label="Page navigation">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className="px-3 py-2 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-100 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS)
            return (
              <li
                key={index}
                className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300"
              >
                ...
              </li>
            );
          return (
            <li key={index}>
              <button
                onClick={() => onPageChange(pageNumber as number)}
                className={`px-3 py-2 leading-tight border ${
                  currentPage === pageNumber
                    ? "bg-sky-100 text-sky-600 border-sky-300"
                    : "text-slate-500 bg-white border-slate-300 hover:bg-slate-100"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={onNext}
            disabled={currentPage === lastPage}
            className="px-3 py-2 leading-tight text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-100 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

// --- Komponen Utama Halaman ---
const CustomerClient: React.FC = () => {
  const { customers, pagination, loading, error, fetchCustomers } =
    useCustomer();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    document.title = "Daftar Pelanggan - AquaScan Admin";
    fetchCustomers(page, limit, debouncedSearchTerm);
  }, [page, limit, debouncedSearchTerm, fetchCustomers]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, limit]);

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
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
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
                    <tr key={c.id} className="hover:bg-slate-50">
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
