import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCustomer } from "@src/hooks/index";
import { type Customer } from "@src/models/index";
import { decodeId } from "@src/utils/index";
import { Sidebar } from "@src/components/index";
import {
  DetailSkeleton,
  CustomerTabs,
  DetailPageHeader,
  CustomerProfileCard,
  CustomerLocationMap,
} from "./components/index";

const DetailCustomerClient: React.FC = () => {
  const { encodedNosbg } = useParams<{ encodedNosbg: string }>();
  const { fetchCustomerDetail, loading, error } = useCustomer();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const location = useLocation();

  const nosbg = encodedNosbg ? decodeId(encodedNosbg) : undefined;
  const previousState = location.state || {
    page: 1,
    limit: 10,
    searchTerm: "",
  };

  const fetchDetail = useCallback(async () => {
    if (nosbg) {
      const res = await fetchCustomerDetail(nosbg);
      if (res) setCustomer(res);
      else setCustomer(null); // Clear customer if not found
    }
  }, [nosbg]);

  useEffect(() => {
    document.title = `Detail Pelanggan ${nosbg || ""} - AquaScan Admin`;
    fetchDetail();
  }, [nosbg, fetchDetail]);

  const buildBackPath = () => {
    const params = new URLSearchParams();
    if (previousState.page > 1) params.set("page", String(previousState.page));
    if (previousState.limit !== 10)
      params.set("limit", String(previousState.limit));
    if (previousState.searchTerm)
      params.set("search", previousState.searchTerm);
    const queryString = params.toString();
    return `/clients${queryString ? `?${queryString}` : ""}`;
  };

  const renderContent = () => {
    if (loading) return <DetailSkeleton />;
    if (error)
      return <p className="p-4 bg-red-100 rounded-lg text-red-500">{error}</p>;
    if (!customer) {
      return (
        <p className="text-center text-slate-500 mt-10">
          Data pelanggan tidak ditemukan.
        </p>
      );
    }
    return (
      <>
        <CustomerProfileCard customer={customer} encodedNosbg={encodedNosbg} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CustomerTabs customer={customer} />
          <CustomerLocationMap customer={customer} />
        </div>
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64">
        <DetailPageHeader nosbg={nosbg} backPath={buildBackPath()} />
        {renderContent()}
      </main>
    </div>
  );
};

export default DetailCustomerClient;
