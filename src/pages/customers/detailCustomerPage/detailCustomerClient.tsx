import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomer } from "@src/hooks/useCustomer";
import { type Customer } from "@src/models/customer";
import Sidebar from "@src/components/sidebar";
import { decodeId } from "@src/utils/idObfuscator";
import { IconEdit } from "@src/components/icons";
import DetailSkeleton from "./components/detailSkeleton";
import CustomerTabs from "./components/customerTabs";
import InfoItem from "@src/components/infoItem";

const DetailCustomerClient: React.FC = () => {
  const { encodedNosbg } = useParams<{ encodedNosbg: string }>();
  const nosbg = encodedNosbg ? decodeId(encodedNosbg) : undefined;
  const { fetchCustomerDetail, loading, error } = useCustomer();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    document.title = `Detail Pelanggan ${nosbg} - AquaScan Admin`;
    if (nosbg) {
      fetchCustomerDetail(nosbg).then((res) => {
        if (res) setCustomer(res);
      });
    }
  }, [nosbg]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Detail Pelanggan
            </h1>
            <p className="text-slate-500 mt-1">
              Informasi lengkap untuk No. SBG {nosbg}
            </p>
          </div>
          <Link
            to="/clients"
            className="px-4 py-2 bg-white border border-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 transition"
          >
            Kembali ke Daftar
          </Link>
        </div>

        {loading && <DetailSkeleton />}
        {error && (
          <p className="p-4 bg-red-100 rounded-lg text-red-500">{error}</p>
        )}
        {!loading && !customer && !error && (
          <p className="text-center text-slate-500 mt-10">
            Data pelanggan tidak ditemukan.
          </p>
        )}

        {!loading && customer && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {customer.nama}
                  </h2>
                  <p className="text-slate-500">
                    ID: {customer.id} / No. SBG: {customer.nosbg}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  to={`/clients/${encodedNosbg}/edit`}
                  className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition"
                >
                  <IconEdit /> Edit
                </Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <CustomerTabs customer={customer} />
              <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Lokasi Pelanggan
                </h3>
                <div className="w-full h-64 bg-slate-200 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${customer.lat},${customer.long}&hl=id&z=15&output=embed`}
                  ></iframe>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <InfoItem label="Latitude" value={customer.lat} />
                  <InfoItem label="Longitude" value={customer.long} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DetailCustomerClient;
