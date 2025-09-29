// File: src/context/CustomerContext.tsx
import React, { createContext, useContext, useState } from "react";

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

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
