// src/app/Applayout.tsx
import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../core/auth/useAuthStore";
import { AssistentePedagogicoModal } from "../modules/assistente-pedagogico/AssistentePedagogicoModal";
import { CentralDuvidasDrawer } from "../modules/central-duvidas/CentralDuvidasDrawer";
import { CalendarioModal } from "../modules/calendario/CalendarioModal";

export const AppLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isDuvidasOpen, setIsDuvidasOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getNavItems = () => {
    switch (user?.role) {
      case "aluno":
        return [
          { label: "Meu Painel", path: "/aluno" },
          { label: "Disciplinas", path: "/aluno/disciplinas" },
        ];
      case "professor":
        return [
          { label: "Painel do Docente", path: "/professor" },
          { label: "Frequência", path: "/professor/frequencia" },
        ];
      case "gestor":
        return [
          { label: "Painel Gestor", path: "/gestor" },
          { label: "Relatórios", path: "/gestor/relatorios" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5F7FF]">
      {/* Sidebar - Flat Design 2.0 */}
      <aside className="w-64 bg-white border-r border-[#5170FF]/10 flex flex-col p-5 shadow-flat shrink-0 z-20">
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <img src="/alvora_blue.svg" alt="Alvora" className="h-8 w-auto" />
        </div>

        <nav className="flex-1 space-y-1.5">
          {getNavItems().map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-[#5170FF] text-white shadow-flat-sm"
                    : "text-slate-600 hover:bg-[#5170FF]/8 hover:text-[#5170FF]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Ferramentas do Sistema */}
        <div className="mt-auto space-y-2 pt-4 border-t border-[#5170FF]/10">
          <p className="px-3 text-xs font-semibold text-[#5170FF] uppercase tracking-wider mb-2">
            Ações Rápidas
          </p>
          <button
            onClick={() => setIsAiOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#5170FF]/10 text-[#5170FF] hover:bg-[#5170FF]/15 transition-all"
          >
            <span>Assistente IA</span>
            <span className="text-xs bg-white px-1.5 py-0.5 rounded-md shadow-2xs">
              IA
            </span>
          </button>
          <button
            onClick={() => setIsDuvidasOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#5170FF]/5 text-slate-700 hover:bg-[#5170FF]/10 transition-all"
          >
            <span>Central de Dúvidas</span>
          </button>
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#5170FF]/5 text-slate-700 hover:bg-[#5170FF]/10 transition-all"
          >
            <span>Calendário</span>
          </button>
        </div>

        {/* Perfil e Sair */}
        <div className="pt-4 mt-4 border-t border-[#5170FF]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-[#5170FF]/15 text-[#5170FF] font-bold flex items-center justify-center text-sm shrink-0">
              {user?.nome?.charAt(0) || "U"}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.nome}
              </p>
              <p className="text-[10px] text-[#5170FF] font-medium capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sair"
            className="text-slate-400 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            ➔
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#5170FF]/10 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            {user?.role === "aluno" && "Portal do Estudante"}
            {user?.role === "professor" && "Ambiente do Professor"}
            {user?.role === "gestor" && "Painel de Gestão Educacional"}
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#5170FF]/10 text-[#5170FF]">
              Ano Letivo 2026
            </span>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Modais Globais do Sistema */}
      <AssistentePedagogicoModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />
      <CentralDuvidasDrawer
        isOpen={isDuvidasOpen}
        onClose={() => setIsDuvidasOpen(false)}
      />
      <CalendarioModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />
    </div>
  );
};
