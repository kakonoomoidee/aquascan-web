// src/hooks/useUser.ts
import { useState } from "react";

export interface UserPayload {
  full_name: string;
  email: string;
  password?: string;
  role: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const addUser = async (payload: UserPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/regisuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambahkan user");
      return data;
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil user");

      return data.data || [];
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, payload: Partial<UserPayload>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal update user");
      return data;
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal hapus user");
      return data;
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addUser, getAllUsers, updateUser, deleteUser, loading, error };
}
