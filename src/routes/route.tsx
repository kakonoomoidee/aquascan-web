import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginClient from "@src/pages/loginPage/loginClient";
import DashboardPage from "@src/pages/dashboardPage/dashboardPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginClient />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
