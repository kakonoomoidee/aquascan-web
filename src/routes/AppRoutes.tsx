// src/routes/AppRoutes.tsx
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
import CustomerClient from "@src/pages/customers/listCustomerPage/customerClient";
import DetailCustomerClient from "@src/pages/customers/detailCustomerPage/detailCustomerClient";
import ProtectedRoute from "./ProtectedRoute";
import { CustomerProvider } from "@src/context/CustomerContext";
import { ROUTES } from "./routes";

export default function AppRoutes() {
  return (
    <Router>
      <CustomerProvider>
        <Routes>
          // Redirect root to login
          <Route
            path={ROUTES.root}
            element={<Navigate to={ROUTES.login} replace />}
          />
          <Route path={ROUTES.login} element={<LoginClient />} />
          // dashboard route protected for admin only
          <Route
            path={ROUTES.dashboard}
            element={
              <ProtectedRoute adminOnly>
                <DashboardClient />
              </ProtectedRoute>
            }
          />
          // User management routes protected for admin only
          <Route
            path={ROUTES.users.add}
            element={
              <ProtectedRoute adminOnly>
                <AddUserClient />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.users.list}
            element={
              <ProtectedRoute adminOnly>
                <ListUserClient />
              </ProtectedRoute>
            }
          />
          // Customer management routes protected for admin only
          <Route
            path={ROUTES.clients.list}
            element={
              <ProtectedRoute adminOnly>
                <CustomerClient />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.clients.detailPath}
            element={
              <ProtectedRoute adminOnly>
                <DetailCustomerClient />
              </ProtectedRoute>
            }
          />
          // user task and validation routes protected for admin only
          <Route
            path={ROUTES.tasks}
            element={
              <ProtectedRoute adminOnly>
                <TaskClient />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.validation}
            element={
              <ProtectedRoute adminOnly>
                <ValidateClient />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CustomerProvider>
    </Router>
  );
}
