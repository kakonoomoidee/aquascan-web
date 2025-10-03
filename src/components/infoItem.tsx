import React from "react";

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="border-b border-slate-200 py-3">
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className="mt-1 text-base text-slate-800 break-words">
      {value || "-"}
    </dd>
  </div>
);

export default InfoItem;
