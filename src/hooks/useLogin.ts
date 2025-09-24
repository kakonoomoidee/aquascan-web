// src/hooks/useLogin.ts
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        setError("Response backend bukan JSON valid: " + text);
        return null;
      }

      if (!response.ok) {
        setError(data.message || "Login gagal");
        return null;
      }

      localStorage.setItem("token", data.data.token);
      return data.data.token;
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan jaringan");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
