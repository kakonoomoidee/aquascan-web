import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@src/components/sidebar";
import { useUser } from "@src/hooks/useUser";
import Swal from "sweetalert2";
import { type UserPayload } from "@src/models";
import { AddUserPageHeader, AddUserForm } from "./components/index";

const AddUserClient = () => {
  const { addUser, loading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Tambah User - AquaScan Admin";
  }, []);

  const handleAddUser = async (payload: UserPayload) => {
    try {
      await addUser(payload);
      Swal.fire({
        title: "Berhasil!",
        text: "User baru berhasil ditambahkan.",
        icon: "success",
        confirmButtonColor: "#0ea5e9",
      }).then(() => {
        navigate("/users/list");
      });
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        title: "Gagal Menambahkan User",
        text: error || "Terjadi kesalahan pada server. Silakan coba lagi.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <AddUserPageHeader />
        <AddUserForm loading={loading} onSubmit={handleAddUser} />
      </main>
    </div>
  );
};

export default AddUserClient;
