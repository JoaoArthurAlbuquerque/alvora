import React, { useState } from "react";
import { useAuthStore } from "../core/auth/useAuthStore";
import { CentralDuvidasDrawer } from "../modules/central-duvidas/CentralDuvidasDrawer";
import {
  AlunoMenuOption,
  GestorMenuOption,
  ProfessorMenuOption,
  UserRole,
} from "../types";
import { LogOut, Sun, Bell, ChevronRight, User } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
  onSelectMenu?: (option: any) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  activeMenu = "mural",
  onSelectMenu,
}) => {
  const { user, logout, switchRoleForDemo } = useAuthStore();
  const [currentMenu, setCurrentMenu] = useState<string>(activeMenu);

  if (!user) return <>{children}</>;

  const handleMenuClick = (opt: string) => {
    setCurrentMenu(opt);
    if (onSelectMenu) onSelectMenu(opt);
  };

  // Itens de navegação por perfil
  const menuItensGestor: { id: GestorMenuOption; label: string }[] = [
    { id: "mural", label: "Mural Inicial / Dashboard" },
    { id: "academica", label: "Gestão Acadêmica & Curricular" },
    { id: "horarios", label: "Gestão de Horários & Alocação" },
    { id: "analytics", label: "Relatórios & Analytics" },
    { id: "aprovacoes", label: "Central de Aprovações" },
    { id: "secretaria", label: "Secretaria Geral" },
    { id: "documentos", label: "Arquivos Institucionais" },
  ];

  const menuItensProfessor: { id: ProfessorMenuOption; label: string }[] = [
    { id: "mural", label: "Mural Inicial" },
    { id: "diario", label: "Diário de Classe / Turmas" },
    { id: "horarios", label: "Quadro de Horários" },
    { id: "planos", label: "Planos de Aula / Conteúdo" },
    { id: "central", label: "Central do Professor" },
    { id: "secretaria", label: "Secretaria Docente" },
    { id: "documentos", label: "Arquivos & Documentos" },
  ];

  const menuItensAluno: { id: AlunoMenuOption; label: string }[] = [
    { id: "mural", label: "Mural Inicial" },
    { id: "grade", label: "Grade Curricular" },
    { id: "horarios", label: "Quadro de Horários" },
    { id: "central", label: "Central do Aluno" },
    { id: "secretaria", label: "Secretaria" },
    { id: "documentos", label: "Arquivos & Documentos" },
  ];

  const menuAtual =
    user.role === "GESTOR"
      ? menuItensGestor
      : user.role === "PROFESSOR"
        ? menuItensProfessor
        : menuItensAluno;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Topbar do Sistema */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            <Sun className="w-4 h-4 text-sky-300" />
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">
            Alvora
          </span>
          <span className="text-xs text-slate-400 font-medium border-l border-slate-200 pl-3">
            Gestão Escolar Inteligente
          </span>
        </div>

        {/* Seletor Rápido de Perfil para Demonstração */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-full text-xs font-medium">
            <span className="text-slate-500 px-3 text-[11px]">Visão:</span>
            {(["ALUNO", "PROFESSOR", "GESTOR"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => {
                  switchRoleForDemo(r);
                  setCurrentMenu("mural");
                  if (onSelectMenu) onSelectMenu("mural");
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  user.role === r
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r.charAt(0) + r.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <button
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg relative"
              title="Notificações da Plataforma"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
            </button>

            <div className="text-right hidden sm:block">
              <span className="block text-xs font-semibold text-slate-800">
                {user.name}
              </span>
              <span className="block text-[10px] text-slate-500">
                {user.cursoOuDepartamento}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair do Sistema"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Faixa Lateral Azul Vívido */}
        <aside className="w-16 bg-blue-700 flex flex-col items-center py-4 gap-6 text-white shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-semibold text-xs border border-blue-400/30">
            <User className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 flex flex-col gap-3 w-full px-2">
            <button
              onClick={() => handleMenuClick("mural")}
              className={`w-full py-2.5 rounded-lg flex justify-center text-xs font-semibold transition-all ${
                currentMenu === "mural"
                  ? "bg-white text-blue-700 shadow-md font-bold"
                  : "text-blue-100 hover:bg-blue-600"
              }`}
              title="Mural"
            >
              M
            </button>
            <button
              onClick={() =>
                handleMenuClick(
                  user.role === "GESTOR"
                    ? "academica"
                    : user.role === "PROFESSOR"
                      ? "diario"
                      : "central",
                )
              }
              className={`w-full py-2.5 rounded-lg flex justify-center text-xs font-semibold transition-all ${
                currentMenu === "diario" ||
                currentMenu === "central" ||
                currentMenu === "academica"
                  ? "bg-white text-blue-700 shadow-md font-bold"
                  : "text-blue-100 hover:bg-blue-600"
              }`}
              title="Acesso Principal"
            >
              {user.role === "GESTOR"
                ? "G"
                : user.role === "PROFESSOR"
                  ? "D"
                  : "C"}
            </button>
          </div>
        </aside>

        {/* Submenu Lateral Expandido */}
        <nav className="w-64 bg-white border-r border-slate-200 py-6 px-4 flex flex-col shrink-0">
          <div className="mb-6 px-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Menu Institucional
            </span>
            <span className="text-sm font-bold text-slate-900">
              {user.role}
            </span>
          </div>

          <div className="space-y-1">
            {menuAtual.map((item) => {
              const ativo = currentMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    ativo
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  {ativo && <ChevronRight className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Áreas de Conteúdo do Portal */}
        <main className="flex-1 p-6 overflow-y-auto">
          {React.cloneElement(children as React.ReactElement, {
            selectedMenu: currentMenu,
          })}
        </main>
      </div>

      <CentralDuvidasDrawer />
    </div>
  );
};
