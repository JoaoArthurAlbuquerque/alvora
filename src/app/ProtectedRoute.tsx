import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../core/auth/useAuthStore";

export const ProtectedRoute: React.FC = () => {
  const autenticado = useAuthStore((state) => state.autenticado);

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
