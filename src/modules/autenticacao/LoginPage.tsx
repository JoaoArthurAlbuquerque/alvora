// src/modules/autenticacao/LoginPage.tsx
import React, { useState } from "react";
import { useAuthStore } from "../../core/auth/useAuthStore";
import { Button } from "../../core/ui/Button";
import { KeyRound, Mail, ShieldCheck, SunMedium } from "lucide-react";

export const LoginPage: React.FC = () => {
  const { loginByMatrícula, loginByMagicLink, loginByCode } = useAuthStore();

  const [aba, setAba] = useState<"matricula" | "magic" | "codigo">("matricula");
  const [matricula, setMatricula] = useState("20261001");
  const [senha, setSenha] = useState("123");
  const [email, setEmail] = useState("lucas.mendes@alvora.edu.br");
  const [codigo, setCodigo] = useState("2026");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [erro, setErro] = useState("");

  const handleLoginMatricula = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const ok = loginByMatrícula(matricula, senha);
    if (!ok) {
      setErro("Matrícula não encontrada no cadastro de testes.");
    }
  };

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const ok = loginByMagicLink(email);
    if (ok) {
      setMensagemSucesso(
        "Link de acesso direto gerado e confirmado com sucesso!",
      );
    } else {
      setErro("E-mail institucional não encontrado.");
    }
  };

  const handleCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const ok = loginByCode(codigo);
    if (!ok) {
      setErro('Código inválido. Tente usar "2026".');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center p-4">
      {/* Header do Amanhecer */}
      <div className="w-full max-w-md text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCEEFA] text-[#0B3D66] rounded-[var(--radius-badge)] text-xs font-medium mb-3">
          <SunMedium className="w-4 h-4 text-[#E8A94C]" />
          <span>Plataforma Educacional Alvora</span>
        </div>
        <h1 className="text-4xl font-display text-[#0B3D66] font-normal tracking-tight">
          Abrir o dia letivo
        </h1>
        <p className="text-sm text-[#4A5A68] mt-2">
          Gestão Escolar & Ambiente Virtual de Aprendizagem Assíncrono
        </p>
      </div>

      <div className="w-full max-w-md bg-white border border-[#16232E]/12 rounded-[var(--radius-card)] p-6 shadow-sm">
        {/* Seletor de abas inclusivas */}
        <div className="flex border-b border-[#16232E]/10 mb-6" role="tablist">
          <button
            role="tab"
            aria-selected={aba === "matricula"}
            onClick={() => setAba("matricula")}
            className={`flex-1 pb-3 text-xs font-medium border-b-2 text-center transition-colors ${
              aba === "matricula"
                ? "border-[#0B3D66] text-[#0B3D66]"
                : "border-transparent text-[#4A5A68] hover:text-[#16232E]"
            }`}
          >
            Matrícula + Senha
          </button>
          <button
            role="tab"
            aria-selected={aba === "magic"}
            onClick={() => setAba("magic")}
            className={`flex-1 pb-3 text-xs font-medium border-b-2 text-center transition-colors ${
              aba === "magic"
                ? "border-[#0B3D66] text-[#0B3D66]"
                : "border-transparent text-[#4A5A68] hover:text-[#16232E]"
            }`}
          >
            Magic Link
          </button>
          <button
            role="tab"
            aria-selected={aba === "codigo"}
            onClick={() => setAba("codigo")}
            className={`flex-1 pb-3 text-xs font-medium border-b-2 text-center transition-colors ${
              aba === "codigo"
                ? "border-[#0B3D66] text-[#0B3D66]"
                : "border-transparent text-[#4A5A68] hover:text-[#16232E]"
            }`}
          >
            Código Único
          </button>
        </div>

        {erro && (
          <div className="mb-4 p-3 bg-[#C53030]/10 border border-[#C53030]/30 text-[#C53030] text-xs rounded-[var(--radius-control)]">
            {erro}
          </div>
        )}

        {mensagemSucesso && (
          <div className="mb-4 p-3 bg-[#2F855A]/10 border border-[#2F855A]/30 text-[#2F855A] text-xs rounded-[var(--radius-control)]">
            {mensagemSucesso}
          </div>
        )}

        {aba === "matricula" && (
          <form onSubmit={handleLoginMatricula} className="space-y-4">
            <div>
              <label
                htmlFor="mat"
                className="block text-xs font-medium text-[#16232E] mb-1"
              >
                Matrícula Institucional
              </label>
              <input
                id="mat"
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-[#16232E]/20 rounded-[var(--radius-control)] focus:outline-2 focus:outline-[#0B3D66]"
                placeholder="Ex: 20261001"
              />
            </div>
            <div>
              <label
                htmlFor="pass"
                className="block text-xs font-medium text-[#16232E] mb-1"
              >
                Senha
              </label>
              <input
                id="pass"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-[#16232E]/20 rounded-[var(--radius-control)] focus:outline-2 focus:outline-[#0B3D66]"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              <KeyRound className="w-4 h-4" />
              <span>Acessar Plataforma</span>
            </Button>
          </form>
        )}

        {aba === "magic" && (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label
                htmlFor="mail"
                className="block text-xs font-medium text-[#16232E] mb-1"
              >
                E-mail Cadastrado
              </label>
              <input
                id="mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-[#16232E]/20 rounded-[var(--radius-control)] focus:outline-2 focus:outline-[#0B3D66]"
                placeholder="seu.nome@alvora.edu.br"
              />
            </div>
            <Button type="submit" variant="secondary" className="w-full mt-2">
              <Mail className="w-4 h-4" />
              <span>Enviar Link de Acesso Sem Senha</span>
            </Button>
          </form>
        )}

        {aba === "codigo" && (
          <form onSubmit={handleCodigo} className="space-y-4">
            <div>
              <label
                htmlFor="cod"
                className="block text-xs font-medium text-[#16232E] mb-1"
              >
                Código de Segurança de Uso Único
              </label>
              <input
                id="cod"
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-[#16232E]/20 rounded-[var(--radius-control)] focus:outline-2 focus:outline-[#0B3D66] font-mono"
                placeholder="Digite 2026"
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Validar Código</span>
            </Button>
          </form>
        )}

        {/* Credenciais para facilidade de testes */}
        <div className="mt-8 pt-4 border-t border-[#16232E]/10">
          <p className="text-xs font-semibold text-[#0B3D66] mb-2">
            Contas de Teste Rápidas:
          </p>
          <div className="space-y-1.5 text-xs text-[#4A5A68]">
            <p>
              <strong className="text-[#16232E]">Aluno:</strong> Matrícula{" "}
              <code>20261001</code>
            </p>
            <p>
              <strong className="text-[#16232E]">Professor:</strong> Matrícula{" "}
              <code>P202688</code>
            </p>
            <p>
              <strong className="text-[#16232E]">Gestor:</strong> Matrícula{" "}
              <code>G202601</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
