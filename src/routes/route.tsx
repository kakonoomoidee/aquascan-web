//src/routes/route.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginClient from "@src/pages/loginPage/loginClient";
import DashboardClient from "@src/pages/dashboardPage/dashboardClient";
import AddUserClient from "@src/pages/users/addUser/addUserClient";
import ListUserClient from "@src/pages/users/listUser/listUserClient";

// Dummy pages untuk nanti diisi
const TasksPage = () => <h1>Manajemen Tugas</h1>;
const ValidationPage = () => <h1>Validasi Input</h1>;

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Default redirect ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginClient />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardClient />} />

        {/* Add User */}
        <Route path="/users/add" element={<AddUserClient />} />
        <Route path="/users/list" element={<ListUserClient />} />

        {/* Tasks */}
        <Route path="/tasks" element={<TasksPage />} />

        {/* Validation */}
        <Route path="/validation" element={<ValidationPage />} />
      </Routes>
    </Router>
  );
}
