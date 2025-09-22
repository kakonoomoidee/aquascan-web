import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import AppRoutes from "@src/routes/route";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
