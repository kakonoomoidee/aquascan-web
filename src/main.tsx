// File: src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import AppRoutes from "@src/routes/AppRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
