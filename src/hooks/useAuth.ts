// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { getUserFromToken } from "@src/utils/jwtDecode";
import { type User } from "@src/models/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      // decode JWT dulu
      const payload = getUserFromToken();
      if (!payload) {
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }

      // Set user minimal dari token
      setUser({
        id: payload.user_id,
        role: payload.role,
        isAdmin: payload.role === "admin",
      });

      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.data.id,
            email: data.data.email,
            fullname: data.data.fullname,
            role: data.data.role,
            isAdmin: data.data.role === "admin",
          });
        }
      } catch (err) {
        console.error("Gagal fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    isAdmin: user?.isAdmin,
    loading,
    logout,
    setUser,
  };
};
