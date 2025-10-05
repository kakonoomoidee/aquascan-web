import React, { useEffect } from "react";
import { Sidebar } from "@src/components/index";
import { useNavigate } from "react-router-dom";
import { useCustomerContext } from "@src/context/CustomerContext";
import { ROUTES } from "@src/routes/routes";
import { useDebounce, useCustomer } from "@src/hooks/index";
import { Pagination } from "@src/components/index";
import {
  CustomerPageHeader,
  CustomerFilter,
  CustomerTable,
} from "./components/index";

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

  const handleRowClick = (nosbg: string) => {
    navigate(ROUTES.clients.detail(nosbg), {
      state: {
        page,
        limit,
        searchTerm,
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64">
        <CustomerPageHeader />

        <CustomerFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          limit={limit}
          setLimit={setLimit}
        />

        {error && (
          <p className="text-red-500 p-4 bg-red-100 rounded-lg mb-4">{error}</p>
        )}

        <CustomerTable
          loading={loading}
          customers={customers}
          limit={limit}
          onRowClick={handleRowClick}
        />

        <div className="flex justify-center items-center mt-6">
          {!loading && pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CustomerClient;
