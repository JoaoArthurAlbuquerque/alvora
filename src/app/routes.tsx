import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AppLayout } from "./Applayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "../modules/autenticacao/LoginPage";
import { PortalAluno } from "../modules/aluno/PortalAluno";
import { PortalProfessor } from "../modules/professor/PortalProfessor";
import { PortalGestor } from "../modules/gestor/PortalGestor";
import { LancamentoFrequencia } from "../modules/professor/LancamentoFrequencia";
import { useAuthStore } from "../core/auth/useAuthStore";

const IndexRoute: React.FC = () => {
  const usuario = useAuthStore((state) => state.usuario);

  if (!usuario) return <Navigate to="/login" replace />;

  if (usuario.papel === "aluno") return <PortalAluno />;
  if (usuario.papel === "professor") return <PortalProfessor />;
  if (usuario.papel === "gestor") return <PortalGestor />;

  return <PortalAluno />;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <IndexRoute /> },
          { path: "aluno", element: <PortalAluno /> },
          { path: "professor", element: <PortalProfessor /> },
          { path: "gestor", element: <PortalGestor /> },
          { path: "frequencia", element: <LancamentoFrequencia /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// Componente AppRoutes exportado como export nomeado e default
export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
