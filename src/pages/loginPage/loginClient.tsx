import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@src/hooks/useLogin";
import { getUserFromToken } from "@src/utils/jwtDecode";
import Swal from "sweetalert2";
import { LoginVisualPanel, LoginForm } from "./components/index";

const LoginClient = () => {
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - AquaScan Admin";
  }, []);

  const handleLoginSubmit = async (email: string, password: string) => {
    const token = await login(email, password);
    if (!token) return;

    const userPayload = getUserFromToken();
    if (userPayload && userPayload.role !== "admin") {
      Swal.fire({
        title: "Akses Ditolak!",
        text: "Hanya admin yang dapat masuk ke panel ini.",
        icon: "error",
        confirmButtonColor: "#3b82f6",
      });
      localStorage.removeItem("token");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
      <div className="flex w-full max-w-6xl min-h-[700px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        <LoginVisualPanel />
        <LoginForm
          onSubmit={handleLoginSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default LoginClient;
