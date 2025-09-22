// src/pages/dashboardPage/dashboardClient.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/hooks/useAuth";

const DashboardClient = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [loading, user, isAdmin]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Selamat datang, {user?.fullname}</p>
      <p>{isAdmin ? "Admin access granted" : "No access"}</p>
    </div>
  );
};

export default DashboardClient;
