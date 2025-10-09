import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "blue" | "green" | "yellow" | "purple";
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  color,
  loading,
}) => {
  const colors: { [key: string]: string } = {
    blue: "bg-sky-100 text-sky-600",
    green: "bg-emerald-100 text-emerald-600",
    yellow: "bg-amber-100 text-amber-600",
    purple: "bg-violet-100 text-violet-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4">
      {" "}
      <div className={`p-3 rounded-full ${colors[color]}`}> {icon}</div>
      <div className="flex-1">
        <h2 className="text-slate-500 text-base">{title}</h2>{" "}
        {loading ? (
          <div className="mt-1 h-8 w-1/2 bg-slate-200 rounded-md animate-pulse"></div>
        ) : (
          <p className="text-4xl font-bold text-slate-800">{value}</p>
        )}
      </div>
    </div>
  );
};
