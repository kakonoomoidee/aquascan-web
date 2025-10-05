import { useEffect, useState, useCallback } from "react";
import { useUser } from "@src/hooks/index";
import { type User } from "@src/models/index";
import { Sidebar } from "@src/components/index";
import Swal from "sweetalert2";

import { UserListPageHeader, UserTable } from "./components/index";

const ListUserClient = () => {
  const { getAllUsers, deleteUser, loading } = useUser();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }, [getAllUsers]);

  useEffect(() => {
    document.title = "Daftar User - AquaScan Admin";
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = (id: number, name: string) => {
    Swal.fire({
      title: "Anda yakin?",
      html: `User <strong>${name}</strong> akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          Swal.fire("Dihapus!", "User berhasil dihapus.", "success");
          fetchUsers(); // Re-fetch users after deletion
        } catch (err) {
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus user.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <UserListPageHeader />
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
                  #
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
                  Nama
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-semibold uppercase text-slate-500">
                  Role
                </th>
                <th className="px-6 py-3 text-center font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <UserTable
                users={users}
                loading={loading}
                onDelete={handleDeleteUser}
              />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ListUserClient;
