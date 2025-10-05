import { useEffect, useState } from "react";
import Sidebar from "@src/components/sidebar";
import { useAuth } from "@src/hooks/useAuth";
import { StatCard, ActivityItem } from "./components/index";
import { IconPhoto, IconUsers, IconTask } from "@src/components/icons/index";

const DashboardClient = () => {
  const { user, loading } = useAuth();
  const [photoCount, setPhotoCount] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    document.title = "Dashboard - AquaScan Admin";

    setCurrentDate(
      new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    // Fake data loading
    const timer = setTimeout(() => setPhotoCount(124), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="text-slate-500">Loading data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Selamat Datang Kembali, {user?.fullname || "Admin"}!
            </h1>
            <p className="text-slate-500 mt-1">{currentDate}</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={<IconPhoto />}
            title="Total Foto"
            value={photoCount}
            color="blue"
          />
          <StatCard
            icon={<IconUsers />}
            title="Manajemen User"
            value="32"
            color="green"
          />
          <StatCard
            icon={<IconTask />}
            title="Tugas Aktif"
            value="7"
            color="yellow"
          />
        </div>

        {/* Additional Widgets */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Aktivitas Terbaru
            </h2>
            <div className="space-y-4">
              <ActivityItem
                user="Andi"
                action="mengunggah 5 foto baru."
                time="5 menit lalu"
              />
              <ActivityItem
                user="Budi"
                action="menyelesaikan tugas validasi."
                time="1 jam lalu"
              />
              <ActivityItem
                user="Citra"
                action="login ke sistem."
                time="3 jam lalu"
              />
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Statistik Mingguan
            </h2>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-400">Placeholder untuk Chart</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;
