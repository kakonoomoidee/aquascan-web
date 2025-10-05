import React, { type JSX } from "react";

interface StatCardProps {
  icon: JSX.Element;
  title: string;
  value: string | number;
  color: "blue" | "green" | "yellow" | string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  color,
}) => {
  const colors: { [key: string]: string } = {
    blue: "bg-sky-100 text-sky-600",
    green: "bg-emerald-100 text-emerald-600",
    yellow: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className={`p-4 rounded-full ${colors[color]}`}>{icon}</div>
      <div>
        <h2 className="text-slate-500 text-lg">{title}</h2>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};
