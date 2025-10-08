import React from "react";

export const DetailSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
      <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
      <div className="w-full h-[50vh] bg-slate-200 rounded-md"></div>
    </div>
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
      <div className="space-y-4">
        <div className="h-5 bg-slate-200 rounded w-1/4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
      </div>
      <div className="h-20 bg-slate-200 rounded-md mt-6"></div>
      <div className="flex space-x-4">
        <div className="flex-1 h-12 bg-slate-200 rounded-lg"></div>
        <div className="flex-1 h-12 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);
