import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, type User } from "@src/hooks/useUser";
import Sidebar from "@src/components/sidebar";
import Swal from "sweetalert2";

// --- Helper Components (No Change) ---
const KebabMenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 5v.01M12 12v.01M12 19v.01"
    />
  </svg>
);

const RoleBadge = ({ role }: { role: string }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  const colors = {
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

const ListUserClient = () => {
  const { getAllUsers, deleteUser, loading, error } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: number, name: string) => {
    setOpenActionMenu(null);
    Swal.fire({
      title: "Anda yakin?",
      html: `User dengan nama <strong>${name}</strong> akan dihapus secara permanen.`,
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
          fetchUsers();
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

  useEffect(() => {
    document.title = "Daftar User - AquaScan Admin";
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Tambah User</span>
          </button>
        </div>

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
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-500">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-500">
                    Tidak ada user ditemukan.
                  </td>
                </tr>
              )}
              {!loading &&
                users.map((u, i) => {
                  // *** LOGIC BARU: Cek posisi baris ***
                  const isLastRow = i >= users.length - 2;

                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">
                        {u.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                        {u.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setOpenActionMenu(
                                openActionMenu === u.id ? null : u.id
                              )
                            }
                            className="p-2 rounded-full hover:bg-slate-200"
                          >
                            <KebabMenuIcon />
                          </button>
                          {openActionMenu === u.id && (
                            // *** STYLE DIUPDATE + LOGIC BUKA KE ATAS ***
                            <div
                              className={`
                              absolute right-0 w-40 rounded-md shadow-xl bg-white border border-slate-200 z-10
                              ${
                                isLastRow
                                  ? "bottom-full mb-2 origin-bottom-right"
                                  : "mt-2 origin-top-right"
                              }
                            `}
                            >
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                              >
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                  role="menuitem"
                                >
                                  Edit
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(u.id, u.full_name || "");
                                  }}
                                  className="block px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                                  role="menuitem"
                                >
                                  Delete
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ListUserClient;
