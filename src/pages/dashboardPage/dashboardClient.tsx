import { useEffect, useState } from "react";
import { Sidebar } from "@src/components/index";
import {
  useAuth,
  useSubmittedUploads,
  useValidatedToday,
  useActiveOfficers,
  useTotalSubmissions,
} from "@src/hooks/index";
import {
  IconPhoto,
  IconUsers,
  IconTask,
  IconValidation,
} from "@src/components/icons/index";
import { StatCard, ActivityItem, DashboardSkeleton } from "./components/index";

const DashboardClient = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: submittedCount, isLoading: loadingSubmitted } =
    useSubmittedUploads();
  const { data: validatedToday, isLoading: loadingValidated } =
    useValidatedToday();
  const { data: activeOfficers, isLoading: loadingOfficers } =
    useActiveOfficers();
  const { data: totalSubmissions, isLoading: loadingTotal } =
    useTotalSubmissions();

  const [currentDate, setCurrentDate] = useState<string>("");
  const totalOfficer =
    (activeOfficers?.admin_total ?? 0) + (activeOfficers?.officers_active ?? 0);

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
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      {authLoading ? (
        <DashboardSkeleton />
      ) : (
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Selamat Datang Kembali, {user?.fullname || "Admin"}!
              </h1>
              <p className="text-slate-500 mt-1">{currentDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<IconValidation className="w-7 h-7" />}
              title="Validasi Tertunda"
              value={submittedCount ?? 0}
              color="purple"
              loading={loadingSubmitted}
            />
            <StatCard
              icon={<IconTask className="w-7 h-7" />}
              title="Validasi Selesai (Hari Ini)"
              value={validatedToday ?? 0}
              color="yellow"
              loading={loadingValidated}
            />
            <StatCard
              icon={<IconUsers className="w-7 h-7" />}
              title="Total Petugas"
              value={totalOfficer}
              color="green"
              loading={loadingOfficers}
            />
            <StatCard
              icon={<IconPhoto className="w-7 h-7" />}
              title="Total Foto Tervalidasi"
              value={totalSubmissions ?? 0}
              color="blue"
              loading={loadingTotal}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
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
      )}
    </div>
  );
};

export default DashboardClient;
