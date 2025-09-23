import { useEffect, useState, type JSX } from "react";
import Sidebar from "@src/components/sidebar";
import { useAuth } from "@src/hooks/useAuth";

const IconPhoto = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);
const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const IconTask = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);

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

    const timer = setTimeout(() => {
      setPhotoCount(124);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 3. Handle loading state
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
            {/* 4. Tampilkan nama user di sini */}
            <h1 className="text-3xl font-bold text-slate-800">
              Selamat Datang Kembali, {user?.fullname || "Admin"} !
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

// Reusable StatCard Component (Props type diupdate untuk menerima JSX.Element)
const StatCard = ({
  icon,
  title,
  value,
  color,
}: {
  icon: JSX.Element;
  title: string;
  value: string | number;
  color: string;
}) => {
  const colors: { [key: string]: string } = {
    blue: "bg-sky-100 text-sky-600",
    green: "bg-emerald-100 text-emerald-600",
    yellow: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className={`p-4 rounded-full ${colors[color]}`}>{icon}</div>
      <div>
        <h2 className="text-slate-500 text-lg">{title}</h2>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

// Reusable ActivityItem Component (Props type diupdate)
const ActivityItem = ({
  user,
  action,
  time,
}: {
  user: string;
  action: string;
  time: string;
}) => (
  <div className="flex items-start">
    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 mr-3"></div>
    <div>
      <p className="text-slate-600">
        <span className="font-semibold">{user}</span> {action}
      </p>
      <p className="text-xs text-slate-400">{time}</p>
    </div>
  </div>
);

export default DashboardClient;
