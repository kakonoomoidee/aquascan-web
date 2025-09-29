// File: src/pages/customers/detailCustomerPage/detailCustomerClient.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomer, type Customer } from "@src/hooks/useCustomer";
import Sidebar from "@src/components/sidebar";

// --- Skeleton Component ---
const DetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6">
      <div className="w-24 h-24 bg-slate-200 rounded-full"></div>
      <div className="flex-1 space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
      </div>
    </div>
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
      </div>
      <div className="lg:col-span-1 bg-slate-200 rounded-xl shadow-lg h-64"></div>
    </div>
  </div>
);

const DetailCustomerClient: React.FC = () => {
  const { nosbg } = useParams<{ nosbg: string }>();
  const { fetchCustomerDetail, loading, error } = useCustomer();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    document.title = "Detail Pelanggan - AquaScan Admin";

    if (nosbg) {
      fetchCustomerDetail(nosbg).then((res) => {
        if (res) setCustomer(res);
      });
    }
  }, [nosbg]);

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) => (
    <div>
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-base text-slate-800">{value || "-"}</dd>
    </div>
  );

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
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6">
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

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Kolom Kiri: Info Detail */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b pb-4">
                  Informasi Rinci
                </h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InfoItem label="Alamat Lengkap" value={customer.alamat} />
                  <InfoItem label="ID Tarif" value={customer.idtarip} />
                  <InfoItem label="Bulan Rekening" value={customer.bulan_rek} />
                  <InfoItem
                    label="Tanggal Baca Meter"
                    value={customer.tgl_baca}
                  />
                  <InfoItem
                    label="Dibuat Pada"
                    value={
                      customer.created_at
                        ? new Date(customer.created_at).toLocaleDateString(
                            "id-ID",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "-"
                    }
                  />
                  <InfoItem
                    label="Diperbarui Pada"
                    value={
                      customer.updated_at
                        ? new Date(customer.updated_at).toLocaleDateString(
                            "id-ID",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "-"
                    }
                  />
                </dl>
              </div>

              {/* Kolom Kanan: Peta */}
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
