import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AppLayout } from "./Applayout";
import { LoginPage } from "../modules/autenticacao/LoginPage";
import { PortalAluno } from "../modules/aluno/PortalAluno";
import { PortalProfessor } from "../modules/professor/PortalProfessor";
import { LancamentoFrequencia } from "../modules/professor/LancamentoFrequencia";
import { PortalGestor } from "../modules/gestor/PortalGestor";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota Pública Primária de Autenticação */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas Protegidas no AppLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          {/* Rotas Aluno */}
          <Route
            path="/aluno"
            element={<Navigate to="/aluno/painel" replace />}
          />
          <Route path="/aluno/painel" element={<PortalAluno />} />
          <Route path="/aluno/frequencia" element={<PortalAluno />} />
          <Route path="/aluno/notas" element={<PortalAluno />} />
          <Route path="/aluno/tarefas" element={<PortalAluno />} />
          <Route path="/aluno/calendario" element={<PortalAluno />} />

          {/* Rotas Professor */}
          <Route
            path="/professor"
            element={<Navigate to="/professor/turmas" replace />}
          />
          <Route path="/professor/turmas" element={<PortalProfessor />} />
          <Route
            path="/professor/frequencia"
            element={<LancamentoFrequencia />}
          />
          <Route path="/professor/notas" element={<PortalProfessor />} />
          <Route path="/professor/auditoria" element={<PortalProfessor />} />
          <Route path="/professor/alertas" element={<PortalProfessor />} />
          <Route path="/professor/calendario" element={<PortalProfessor />} />

          {/* Rotas Gestor */}
          <Route
            path="/gestor"
            element={<Navigate to="/gestor/dashboard" replace />}
          />
          <Route path="/gestor/dashboard" element={<PortalGestor />} />
          <Route path="/gestor/risco" element={<PortalGestor />} />
          <Route path="/gestor/auditoria" element={<PortalGestor />} />
          <Route path="/gestor/relatorios" element={<PortalGestor />} />
          <Route path="/gestor/calendario" element={<PortalGestor />} />
        </Route>
      </Route>

      {/* Redirecionamento Padrão da Raiz */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
