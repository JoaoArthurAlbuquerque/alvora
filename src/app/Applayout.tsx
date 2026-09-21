import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/auth/useAuthStore";
import { UserRole } from "../types";
import {
  GraduationCap,
  BookOpen,
  Calendar,
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
  CheckSquare,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { CentralDuvidasDrawer } from "../modules/central-duvidas/CentralDuvidasDrawer";
import { CalendarioModal } from "../modules/calendario/CalendarioModal";

export const AppLayout: React.FC = () => {
  const {
    currentUser,
    activeRole,
    switchRoleDev,
    toggleRAGDrawer,
    toggleCalendarModal,
    logout,
  } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRoleDev(newRole);
    const defaultPaths: Record<UserRole, string> = {
      ALUNO: "/aluno/painel",
      PROFESSOR: "/professor/turmas",
      GESTOR: "/gestor/dashboard",
    };
    navigate(defaultPaths[newRole]);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navConfig = {
    ALUNO: [
      { label: "Meu Painel", icon: BarChart3, path: "/aluno/painel" },
      {
        label: "Minha Frequência",
        icon: ShieldCheck,
        path: "/aluno/frequencia",
      },
      { label: "Minhas Notas", icon: BookOpen, path: "/aluno/notas" },
      { label: "Prazos & Tarefas", icon: Calendar, path: "/aluno/tarefas" },
      {
        label: "Calendário Acadêmico",
        icon: Calendar,
        path: "/aluno/calendario",
      },
    ],
    PROFESSOR: [
      { label: "Visão das Turmas", icon: Users, path: "/professor/turmas" },
      {
        label: "Lançamento de Frequência",
        icon: CheckSquare,
        path: "/professor/frequencia",
      },
      {
        label: "Lançamento de Notas",
        icon: FileSpreadsheet,
        path: "/professor/notas",
      },
      {
        label: "Auditoria de Frequência",
        icon: ShieldCheck,
        path: "/professor/auditoria",
      },
      {
        label: "Alertas de Evasão",
        icon: AlertTriangle,
        path: "/professor/alertas",
      },
      {
        label: "Calendário Acadêmico",
        icon: Calendar,
        path: "/professor/calendario",
      },
    ],
    GESTOR: [
      {
        label: "Dashboard Executivo",
        icon: BarChart3,
        path: "/gestor/dashboard",
      },
      { label: "Ranking de Risco", icon: AlertTriangle, path: "/gestor/risco" },
      {
        label: "Auditoria Geral",
        icon: ShieldCheck,
        path: "/gestor/auditoria",
      },
      {
        label: "Relatórios Institucionais",
        icon: FileText,
        path: "/gestor/relatorios",
      },
      {
        label: "Calendário Acadêmico",
        icon: Calendar,
        path: "/gestor/calendario",
      },
    ],
  };

  const currentNav = navConfig[activeRole];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Header Superior Corporativo */}
      <header className="h-16 bg-[#1E3A8A] text-white flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 border-b border-blue-900/50 shadow-xs">
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
            <div className="bg-white text-[#1E3A8A] px-2 py-1 rounded-md font-black tracking-wider text-base">
              SiDi
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">
                Alvora AVA
              </span>
              <span className="text-[10px] text-blue-200 block">
                {currentUser?.polo || "Gestão Escolar"}
              </span>
            </div>
          </div>
        </div>

        {/* Lado Direito: Seletor Dev de Perfil & Ações */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-blue-950/60 px-3 py-1 rounded-md border border-blue-700/50 text-xs">
            <span className="text-blue-300 font-medium">Perfil Dev:</span>
            <select
              value={activeRole}
              onChange={(e) => handleRoleSwitch(e.target.value as UserRole)}
              className="bg-blue-900 text-white font-semibold rounded px-2 py-1 border border-blue-600 text-xs focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label="Selecionar Perfil Dev para Teste"
            >
              <option value="ALUNO">Aluno</option>
              <option value="PROFESSOR">Professor</option>
              <option value="GESTOR">Gestor</option>
            </select>
          </div>

          <button
            onClick={() => toggleRAGDrawer(true)}
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs px-3 py-2 rounded-md font-semibold transition-colors min-h-[44px] cursor-pointer"
            aria-label="Abrir Tira-Dúvidas IA"
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
              {currentUser?.name
                ? currentUser.name.slice(0, 2).toUpperCase()
                : "US"}
            </div>
            <div className="hidden xl:block text-left">
              <span className="text-xs font-semibold block text-white">
                {currentUser?.name}
              </span>
              <span className="text-[10px] text-blue-200 block capitalize">
                {activeRole.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Lateral */}
        <aside
          className={`fixed lg:sticky top-16 z-20 w-64 bg-white border-r border-[#E2E8F0] h-[calc(100vh-4rem)] flex flex-col transition-transform duration-200 ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1">
              Papel Ativo no Sistema
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 font-bold text-xs">
              <GraduationCap className="w-4 h-4" />
              <span>{activeRole}</span>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {currentNav.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600"
                        : "text-slate-700 hover:bg-slate-100 hover:text-blue-900"
                    }`
                  }
                >
                  <IconComponent className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Wifi className="w-3.5 h-3.5 text-teal-600" />
              <span>
                Status: <strong className="text-teal-700">Online</strong>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-red-700 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Sessão</span>
            </button>
          </div>
        </aside>

        {/* Área Principal de Sub-rotas via Outlet */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <CentralDuvidasDrawer />
      <CalendarioModal />
    </div>
  );
};
