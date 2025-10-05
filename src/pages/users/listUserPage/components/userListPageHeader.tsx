import React from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@src/components/icons/index";

export const UserListPageHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Daftar User</h1>
        <p className="text-slate-500 mt-1">
          Manajemen semua user yang terdaftar di sistem.
        </p>
      </div>
      <button
        onClick={() => navigate("/users/add")}
        className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2"
      >
        <IconPlus />
        <span>Tambah User</span>
      </button>
    </div>
  );
};
