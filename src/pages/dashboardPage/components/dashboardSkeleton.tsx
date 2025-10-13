import React from "react";

const SkeletonStatCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4">
    <div className="p-3 rounded-full bg-slate-200">
      <div className="w-7 h-7"></div>
    </div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-8 bg-slate-200 rounded w-1/2"></div>
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <main className="flex-1 p-8 animate-pulse">
    {/* Skeleton for Header */}
    <div className="mb-8">
      <div className="h-8 bg-slate-200 rounded w-1/2 mb-3"></div>
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
    </div>

    {/* Skeleton for Stat Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SkeletonStatCard />
      <SkeletonStatCard />
      <SkeletonStatCard />
      <SkeletonStatCard />
    </div>

    {/* Skeleton for Widgets */}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
        </div>
      </div>
      <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-slate-50 rounded-lg"></div>
      </div>
    </div>
  </main>
);
