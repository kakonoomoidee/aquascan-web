// File: src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import AppRoutes from "@src/routes/AppRoutes";
import { CustomerProvider } from "@src/context/CustomerContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomerProvider>
      <AppRoutes />
    </CustomerProvider>
  </StrictMode>
);
