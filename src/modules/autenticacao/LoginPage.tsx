import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../core/ui/Card";
import { Button } from "../../core/ui/Button";
import { useAuthStore } from "../../core/auth/useAuthStore";
import { UserRole } from "../../types";
import { KeyRound, Mail, ShieldCheck, UserCheck } from "lucide-react";

export const LoginPage: React.FC = () => {
  const [method, setMethod] = useState<"CODE" | "MATRICULA" | "MAGIC">("CODE");
  const [code, setCode] = useState("2026");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    let success = false;
    if (method === "CODE") {
      success = login({ code });
    } else if (method === "MATRICULA") {
      success = login({ matricula });
    } else if (method === "MAGIC") {
      success = login({ code: "2026" });
    }

    if (success) {
      const activeRole = useAuthStore.getState().activeRole;
      const targetPath =
        activeRole === "ALUNO"
          ? "/aluno/painel"
          : activeRole === "PROFESSOR"
            ? "/professor/turmas"
            : "/gestor/dashboard";
      navigate(targetPath, { replace: true });
    } else {
      setErrorMsg(
        "Credencial inválida. Utilize as contas de teste ou o código 2026.",
      );
    }
  };

  const handleQuickTestLogin = (testMatricula: string, role: UserRole) => {
    login({ matricula: testMatricula, role });
    const targetPath =
      role === "ALUNO"
        ? "/aluno/painel"
        : role === "PROFESSOR"
          ? "/professor/turmas"
          : "/gestor/dashboard";
    navigate(targetPath, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <div className="inline-block bg-[#1E3A8A] text-white font-black text-xl px-4 py-2 rounded-lg shadow-sm">
            Alvora
          </div>
          <p className="text-xs text-slate-600">
            Gestão Escolar & Ambiente Virtual de Aprendizagem Assíncrono
          </p>
        </div>

        <Card className="shadow-md border border-slate-200">
          {/* Seletor de Método */}
          <div className="flex border-b border-slate-200 mb-4 text-xs font-bold">
            <button
              onClick={() => setMethod("CODE")}
              className={`flex-1 py-2 text-center cursor-pointer ${
                method === "CODE"
                  ? "border-b-2 border-blue-600 text-blue-900"
                  : "text-slate-500"
              }`}
            >
              Código Único
            </button>
            <button
              onClick={() => setMethod("MATRICULA")}
              className={`flex-1 py-2 text-center cursor-pointer ${
                method === "MATRICULA"
                  ? "border-b-2 border-blue-600 text-blue-900"
                  : "text-slate-500"
              }`}
            >
              Matrícula + Senha
            </button>
            <button
              onClick={() => setMethod("MAGIC")}
              className={`flex-1 py-2 text-center cursor-pointer ${
                method === "MAGIC"
                  ? "border-b-2 border-blue-600 text-blue-900"
                  : "text-slate-500"
              }`}
            >
              Magic Link
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {method === "CODE" && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Código de Segurança de Uso Único
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="2026"
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue-600"
                  required
                />
              </div>
            )}

            {method === "MATRICULA" && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="20261001"
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-blue-600"
                    required
                  />
                </div>
              </>
            )}

            {method === "MAGIC" && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  E-mail Institucional
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@sidi.org.br"
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-sm focus-visible:ring-2 focus-visible:ring-blue-600"
                  required
                />
              </div>
            )}

            {errorMsg && (
              <p className="text-xs text-red-700 font-semibold bg-red-50 p-2 rounded border border-red-200">
                {errorMsg}
              </p>
            )}

            <Button
              variant="primary"
              type="submit"
              className="w-full font-bold"
            >
              Validar e Acessar Portal
            </Button>
          </form>

          {/* Dev Helper - Contas de Teste Rápido */}
          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase block text-center">
              Acesso Rápido para Avaliação (Dev Helper)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickTestLogin("20261001", "ALUNO")}
                className="p-2 bg-slate-100 hover:bg-blue-100 text-slate-800 rounded text-xs font-semibold text-center border border-slate-200 transition-colors cursor-pointer min-h-[44px]"
              >
                <UserCheck className="w-3.5 h-3.5 mx-auto mb-1 text-blue-600" />
                Aluno
              </button>

              <button
                onClick={() => handleQuickTestLogin("P202688", "PROFESSOR")}
                className="p-2 bg-slate-100 hover:bg-blue-100 text-slate-800 rounded text-xs font-semibold text-center border border-slate-200 transition-colors cursor-pointer min-h-[44px]"
              >
                <UserCheck className="w-3.5 h-3.5 mx-auto mb-1 text-blue-600" />
                Professor
              </button>

              <button
                onClick={() => handleQuickTestLogin("G202601", "GESTOR")}
                className="p-2 bg-slate-100 hover:bg-blue-100 text-slate-800 rounded text-xs font-semibold text-center border border-slate-200 transition-colors cursor-pointer min-h-[44px]"
              >
                <UserCheck className="w-3.5 h-3.5 mx-auto mb-1 text-blue-600" />
                Gestor
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
