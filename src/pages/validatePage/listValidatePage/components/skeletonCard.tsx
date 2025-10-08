import React from "react";

export const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 flex space-x-4 animate-pulse">
    <div className="w-32 h-24 bg-slate-200 rounded-md"></div>
    <div className="flex-1 space-y-3 py-1">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
    </div>
  </div>
);
