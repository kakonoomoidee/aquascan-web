import React from "react";
import { type Customer } from "@src/models/index";
import { InfoItem } from "@src/components/index";

interface CustomerLocationMapProps {
  customer: Customer;
}

export const CustomerLocationMap: React.FC<CustomerLocationMapProps> = ({
  customer,
}) => (
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
);
