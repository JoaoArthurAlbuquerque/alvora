import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../core/auth/useAuthStore";
import { UserRole } from "../types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { isAuthenticated, currentUser } = useAuthStore();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const defaultRedirects: Record<UserRole, string> = {
      ALUNO: "/aluno/painel",
      PROFESSOR: "/professor/turmas",
      GESTOR: "/gestor/dashboard",
    };
    return <Navigate to={defaultRedirects[currentUser.role]} replace />;
  }

  return <Outlet />;
};
