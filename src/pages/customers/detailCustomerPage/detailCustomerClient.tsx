// file: src/pages/customers/detailCustomerPage/detailCustomerClient.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomer } from "@src/hooks/useCustomer";
import { type Customer } from "@src/models/customer";
import Sidebar from "@src/components/sidebar";
import { decodeId } from "@src/utils/idObfuscator";
import { EditIcon } from "@src/components/icons";

// --- Skeleton Component ---
const DetailSkeleton = () => (
  <div className="animate-pulse">
    {" "}
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6">
      {" "}
      <div className="w-24 h-24 bg-slate-200 rounded-full"></div>{" "}
      <div className="flex-1 space-y-4">
        {" "}
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>{" "}
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>{" "}
      </div>{" "}
    </div>{" "}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {" "}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 space-y-4">
        {" "}
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>{" "}
        <div className="h-4 bg-slate-200 rounded w-full"></div>{" "}
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>{" "}
        <div className="h-4 bg-slate-200 rounded w-full"></div>{" "}
      </div>{" "}
      <div className="lg:col-span-1 bg-slate-200 rounded-xl shadow-lg h-64"></div>{" "}
    </div>{" "}
  </div>
);

// --- Main Component ---
const DetailCustomerClient: React.FC = () => {
  const { encodedNosbg } = useParams<{ encodedNosbg: string }>();
  const nosbg = encodedNosbg ? decodeId(encodedNosbg) : undefined;
  const { fetchCustomerDetail, loading, error } = useCustomer();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState("pelanggan");

  useEffect(() => {
    document.title = `Detail Pelanggan ${nosbg} - AquaScan Admin`;
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
    <div className="border-b border-slate-200 py-3">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-base text-slate-800 break-words">
        {value || "-"}
      </dd>
    </div>
  );

  const formatCurrency = (value?: number) => {
    if (value === null || value === undefined) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const tabs = [
    { id: "pelanggan", label: "Info Pelanggan" },
    { id: "teknis", label: "Info Teknis" },
    { id: "keuangan", label: "Info Keuangan" },
    { id: "pembacaan", label: "Info Pembacaan" },
  ];

  console.log("Customer Data:", customer);

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
                  to={`/clients/${customer.nosbg}/edit`}
                  className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition"
                >
                  <EditIcon /> Edit
                </Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
                <div className="border-b border-slate-200">
                  <nav className="-mb-px flex space-x-6 px-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-sky-500 text-sky-600"
                            : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-8">
                  {activeTab === "pelanggan" && (
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                      <InfoItem label="Alamat" value={customer.alamat} />
                      <InfoItem
                        label="Rayon"
                        value={`${customer.rayon} - ${customer.rayonket}`}
                      />
                      <InfoItem label="Kelompok" value={customer.kel} />
                    </dl>
                  )}
                  {activeTab === "teknis" && (
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                      <InfoItem
                        label="Golongan"
                        value={`${customer.gol} / ${customer.gol1}`}
                      />
                      <InfoItem label="ID Tarif" value={customer.idtarip} />
                      <InfoItem label="No. Meter" value={customer.nometer} />
                      <InfoItem
                        label="Ukuran Meter"
                        value={`${customer.uk_meter} / ${customer.uk_meter1}`}
                      />
                    </dl>
                  )}
                  {activeTab === "keuangan" && (
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                      <InfoItem
                        label="Jumlah Tagihan"
                        value={formatCurrency(customer.jumlahrp)}
                      />
                      <InfoItem
                        label="Retribusi"
                        value={formatCurrency(customer.retribusi)}
                      />
                      <InfoItem
                        label="Dana Meter"
                        value={formatCurrency(customer.danamtr)}
                      />
                      <InfoItem
                        label="Biaya Administrasi"
                        value={formatCurrency(customer.biayaadm)}
                      />
                      <InfoItem
                        label="Meterai"
                        value={formatCurrency(customer.meterai)}
                      />
                      <InfoItem
                        label="Bulan Rekening"
                        value={customer.bulan_rek}
                      />
                    </dl>
                  )}
                  {activeTab === "pembacaan" && (
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                      <InfoItem
                        label="Petugas Pembaca"
                        value={customer.pembaca}
                      />
                      <InfoItem
                        label="Tanggal & Waktu Baca"
                        value={formatDate(customer.waktu)}
                      />
                      <InfoItem
                        label="Tanggal Proses"
                        value={formatDate(customer.waktu_proses)}
                      />
                      <InfoItem label="Stan Lalu" value={customer.stan_lalu} />
                      <InfoItem
                        label="Meter Baca"
                        value={customer.meter_baca}
                      />
                      <InfoItem label="Pemakaian (m³)" value={customer.pakai} />
                      <InfoItem
                        label="Rata-rata 3 Bulan (m³)"
                        value={customer.rata2_3bln}
                      />
                      <InfoItem label="Rata-rata" value={customer.rata2} />
                      <InfoItem label="Tafsir" value={customer.tafsir} />
                      <InfoItem label="Keterangan" value={customer.ket} />
                      <InfoItem
                        label="Tanggal Download"
                        value={formatDate(customer.tgl_download)}
                      />
                    </dl>
                  )}
                </div>
              </div>

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
