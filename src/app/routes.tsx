// src/app/routes.tsx
import React from "react";
import { useAuthStore } from "../core/auth/useAuthStore";
import { LoginPage } from "../modules/autenticacao/LoginPage";
import { PortalAluno } from "../modules/aluno/PortalAluno";
import { PortalProfessor } from "../modules/professor/PortalProfessor";
import { PortalGestor } from "../modules/gestor/PortalGestor";

export const AppRoutes: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // RBAC de renderização estrita por perfil
  switch (user.role) {
    case "ALUNO":
      return <PortalAluno />;
    case "PROFESSOR":
      return <PortalProfessor />;
    case "GESTOR":
      return <PortalGestor />;
    default:
      return <LoginPage />;
  }
};
