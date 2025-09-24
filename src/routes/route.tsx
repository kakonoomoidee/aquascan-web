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
import TaskClient from "@src/pages/taskPage/taskClient";
import ValidateClient from "@src/pages/validatePage/validateClient";
import CustomerClient from "@src/pages/customerPage/customerClient";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Default redirect ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginClient />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardClient />} />

        {/* User */}
        <Route path="/users/add" element={<AddUserClient />} />
        <Route path="/users/list" element={<ListUserClient />} />

        {/* Client */}
        <Route path="/clients" element={<CustomerClient />} />

        {/* Tasks */}
        <Route path="/tasks" element={<TaskClient />} />

        {/* Validation */}
        <Route path="/validation" element={<ValidateClient />} />
      </Routes>
    </Router>
  );
}
