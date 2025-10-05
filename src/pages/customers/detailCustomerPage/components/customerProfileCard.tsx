import React from "react";
import { Link } from "react-router-dom";
import { type Customer } from "@src/models/index";
import { IconProfile, IconEdit } from "@src/components/icons/index"; // Import icon yg baru dibuat

interface CustomerProfileCardProps {
  customer: Customer;
  encodedNosbg?: string;
}

export const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({
  customer,
  encodedNosbg,
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
    <div className="flex items-center space-x-6">
      <div className="flex-shrink-0 w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center">
        <IconProfile className="w-12 h-12 text-slate-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{customer.nama}</h2>
        <p className="text-slate-500">
          ID: {customer.id} / No. SBG: {customer.nosbg}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <Link
        to={`/clients/${encodedNosbg}/edit`}
        className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition"
      >
        <IconEdit /> Edit
      </Link>
    </div>
  </div>
);
