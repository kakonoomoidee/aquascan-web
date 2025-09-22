// src/pages/dashboardPage/dashboardPage.tsx
import DashboardClient from "@src/pages/dashboardPage/dashboardClient";

export const dashboardPageMetadata = {
  title: "Dashboard - AquaScan Admin",
  description: "Halaman utama dashboard untuk admin AquaScan",
  route: "/dashboard",
};

const DashboardPage = () => <DashboardClient />;

export default DashboardPage;