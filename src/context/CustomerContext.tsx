// file: src/context/CustomerContext.tsx
import React, { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

type CustomerContextType = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // BACA state dari URL, kalau tidak ada, pakai nilai default
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchTerm = searchParams.get("search") || "";

  // TULIS state ke URL
  const setPage = (newPage: number) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams, { replace: true }); // replace: true biar ga ngerusak history browser
  };

  const setLimit = (newLimit: number) => {
    searchParams.set("limit", String(newLimit));
    searchParams.set("page", "1"); // Selalu reset ke halaman 1 kalo limit berubah
    setSearchParams(searchParams, { replace: true });
  };

  const setSearchTerm = (newSearch: string) => {
    searchParams.set("search", newSearch);
    searchParams.set("page", "1"); // Selalu reset ke halaman 1 kalo ada search baru
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <CustomerContext.Provider
      value={{ page, setPage, limit, setLimit, searchTerm, setSearchTerm }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error("useCustomerContext must be used within CustomerProvider");
  }
  return ctx;
};
