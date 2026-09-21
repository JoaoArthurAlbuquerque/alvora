// src/app/Applayout.tsx
import React, { useState } from "react";
import { useAuthStore } from "../core/auth/useAuthStore";
import { UserRole } from "../types";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  HelpCircle,
  Users,
  FileSpreadsheet,
  ShieldCheck,
  BarChart3,
  LogOut,
  Bell,
  Menu,
  X,
  Sparkles,
  Wifi,
} from "lucide-react";
import { CentralDuvidasDrawer } from "../modules/central-duvidas/CentralDuvidasDrawer";
import { CalendarioModal } from "../modules/calendario/CalendarioModal";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const {
    currentUser,
    activeRole,
    setRole,
    toggleRAGDrawer,
    toggleCalendarModal,
    logout,
  } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = {
    ALUNO: [
      { label: "Meu Painel", icon: BarChart3, path: "#/app/aluno" },
      { label: "Minha Frequência", icon: ShieldCheck, path: "#/app/aluno" },
      { label: "Minhas Notas", icon: BookOpen, path: "#/app/aluno" },
      { label: "Prazos & Tarefas", icon: Calendar, path: "#/app/aluno" },
    ],
    PROFESSOR: [
      { label: "Visão das Turmas", icon: Users, path: "#/app/professor" },
      {
        label: "Lançamento de Notas",
        icon: FileSpreadsheet,
        path: "#/app/professor",
      },
      {
        label: "Auditoria de Frequência",
        icon: ShieldCheck,
        path: "#/app/professor",
      },
      { label: "Alertas de Evasão", icon: BarChart3, path: "#/app/professor" },
    ],
    GESTOR: [
      { label: "Dashboard Executivo", icon: BarChart3, path: "#/app/gestor" },
      { label: "Ranking de Risco", icon: Users, path: "#/app/gestor" },
      { label: "Auditoria Geral", icon: ShieldCheck, path: "#/app/gestor" },
      { label: "Relatórios", icon: FileSpreadsheet, path: "#/app/gestor" },
    ],
  };

  const activeNav = navigationItems[activeRole];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header Superior Corporativo */}
      <header className="h-16 bg-[#1E3A8A] text-white flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 border-b border-blue-900/50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-blue-100 hover:text-white rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Abrir Menu Lateral"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#1E3A8A] p-1.5 rounded-md font-black tracking-wider text-base">
              SiDi
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">
                Alvora AVA
              </span>
              <span className="text-[10px] text-blue-200 block">
                {currentUser.polo}
              </span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Seletor Dev de Perfil (RBAC) & Ações */}
        <div className="flex items-center gap-3">
          {/* Seletor RBAC Dev */}
          <div className="hidden sm:flex items-center gap-1.5 bg-blue-950/60 px-3 py-1 rounded-md border border-blue-700/50 text-xs">
            <span className="text-blue-300 font-medium">Perfil Dev:</span>
            <select
              value={activeRole}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="bg-blue-900 text-white font-semibold rounded px-2 py-1 border border-blue-600 text-xs focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label="Selecionar Perfil de Acesso para Teste"
            >
              <option value="ALUNO">Aluno</option>
              <option value="PROFESSOR">Professor</option>
              <option value="GESTOR">Gestor</option>
            </select>
          </div>

          <button
            onClick={() => toggleRAGDrawer(true)}
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs px-3 py-2 rounded-md font-semibold transition-colors min-h-[44px] cursor-pointer"
            aria-label="Abrir Assistente Pedagógico RAG"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">Tira-Dúvidas IA</span>
          </button>

          <button
            className="p-2 text-blue-200 hover:text-white rounded-md relative min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-blue-800">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-semibold block text-white">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-blue-200 block capitalize">
                {activeRole.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Lateral Adaptativa */}
        <aside
          className={`fixed lg:sticky top-16 z-20 w-64 bg-white border-r border-[#E2E8F0] h-[calc(100vh-4rem)] flex flex-col transition-transform duration-200 ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Bloco 1: Perfil Ativo */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
              Papel Ativo no Sistema
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
              <span>{activeRole}</span>
            </div>
          </div>

          {/* Bloco 2: Itens de Navegação */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {activeNav.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={idx}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-900 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 min-h-[44px]"
                >
                  <IconComponent className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="pt-4 border-t border-slate-200 my-2">
              <button
                onClick={() => {
                  toggleCalendarModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-900 transition-colors cursor-pointer min-h-[44px]"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Calendário Acadêmico</span>
              </button>
            </div>
          </nav>

          {/* Bloco 3: Rodapé da Sidebar */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Wifi className="w-3.5 h-3.5 text-teal-600" />
              <span>
                Status: <strong className="text-teal-700">Online</strong>
              </span>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Sessão</span>
            </button>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Drawers e Modais Globais */}
      <CentralDuvidasDrawer />
      <CalendarioModal />
    </div>
  );
};
