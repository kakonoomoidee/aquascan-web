import React, { useState } from "react";
import { type Customer } from "@src/models/customer";
import InfoItem from "@src/components/infoItem";
import { formatCurrency, formatDate } from "@src/utils/index";

interface CustomerTabsProps {
  customer: Customer;
}

const TABS_CONFIG = [
  { id: "pelanggan", label: "Info Pelanggan" },
  { id: "teknis", label: "Info Teknis" },
  { id: "keuangan", label: "Info Keuangan" },
  { id: "pembacaan", label: "Info Pembacaan" },
];

const CustomerTabs: React.FC<CustomerTabsProps> = ({ customer }) => {
  const [activeTab, setActiveTab] = useState("pelanggan");

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-6 px-8" aria-label="Tabs">
          {TABS_CONFIG.map((tab) => (
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
            <InfoItem label="Bulan Rekening" value={customer.bulan_rek} />
          </dl>
        )}
        {activeTab === "pembacaan" && (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <InfoItem label="Petugas Pembaca" value={customer.pembaca} />
            <InfoItem
              label="Tanggal & Waktu Baca"
              value={formatDate(customer.waktu)}
            />
            <InfoItem
              label="Tanggal Proses"
              value={formatDate(customer.waktu_proses)}
            />
            <InfoItem label="Stan Lalu" value={customer.stan_lalu} />
            <InfoItem label="Meter Baca" value={customer.meter_baca} />
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
  );
};

export default CustomerTabs;
