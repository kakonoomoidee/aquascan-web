import React from "react";

interface RoleBadgeProps {
  role: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const baseClasses =
    "px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize";
  const colors: { [key: string]: string } = {
    admin: "bg-emerald-100 text-emerald-800",
    staf: "bg-sky-100 text-sky-800",
  };
  const roleKey = role.toLowerCase() as keyof typeof colors;

  return (
    <span
      className={`${baseClasses} ${
        colors[roleKey] || "bg-gray-100 text-gray-800"
      }`}
    >
      {role}
    </span>
  );
};
