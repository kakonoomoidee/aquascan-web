// File: src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import AppRoutes from "@src/routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppRoutes />
    </QueryClientProvider>
  </StrictMode>
);
