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
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginClient />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <DashboardClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/add"
          element={
            <ProtectedRoute adminOnly>
              <AddUserClient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/list"
          element={
            <ProtectedRoute adminOnly>
              <ListUserClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute adminOnly>
              <CustomerClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute adminOnly>
              <TaskClient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/validation"
          element={
            <ProtectedRoute adminOnly>
              <ValidateClient />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
