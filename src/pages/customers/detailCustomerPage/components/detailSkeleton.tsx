import React from "react";

const DetailSkeleton: React.FC = () => (
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
      </div>
      <div className="lg:col-span-1 bg-slate-200 rounded-xl shadow-lg h-64"></div>
    </div>
  </div>
);

export default DetailSkeleton;
