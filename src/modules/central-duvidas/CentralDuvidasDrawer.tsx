// src/modules/central-duvidas/CentralDuvidasDrawer.tsx
import React, { useState } from "react";
import { useAuthStore } from "../../core/auth/useAuthStore";
import { MOCK_FAQS } from "../../mocks/data";
import {
  HelpCircle,
  Search,
  MessageSquare,
  ThumbsUp,
  X,
  Check,
} from "lucide-react";
import { Button } from "../../core/ui/Button";

export const CentralDuvidasDrawer: React.FC = () => {
  const { user } = useAuthStore();
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("TODAS");
  const [feedbackAjudou, setFeedbackAjudou] = useState<Record<string, boolean>>(
    {},
  );

  if (!user) return null;

  // Filtra FAQs permitidas para o perfil ativo (ALUNO | PROFESSOR | GESTOR)
  const faqsDoPerfil = MOCK_FAQS.filter((faq) =>
    faq.perfisPermitidos.includes(user.role),
  );

  const categorias = [
    "TODAS",
    ...Array.from(new Set(faqsDoPerfil.map((f) => f.categoria))),
  ];

  const faqsFiltradas = faqsDoPerfil.filter((f) => {
    const bateCategoria =
      categoriaAtiva === "TODAS" || f.categoria === categoriaAtiva;
    const bateBusca =
      f.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      f.resposta.toLowerCase().includes(busca.toLowerCase()) ||
      f.categoria.toLowerCase().includes(busca.toLowerCase());
    return bateCategoria && bateBusca;
  });

  const toggleFeedback = (id: string) => {
    setFeedbackAjudou((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* Botão Flutuante Permanente de Suporte da Plataforma */}
      <button
        onClick={() => setAberto(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 active:scale-95 cursor-pointer"
        aria-label="Abrir Central de Dúvidas da Plataforma"
      >
        <HelpCircle className="w-4 h-4 text-sky-200" />
        <span>Dúvidas da Plataforma</span>
      </button>

      {/* Drawer Lateral */}
      {aberto && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity">
          <div className="w-full max-w-md bg-slate-50 h-full shadow-2xl flex flex-col border-l border-slate-200 font-sans">
            {/* Header Vívido do Drawer */}
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/30 border border-blue-400/30 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-sky-200" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight">
                    Central de Dúvidas
                  </h2>
                  <p className="text-[11px] text-blue-100 font-medium">
                    Guias para o perfil:{" "}
                    <span className="font-bold uppercase">{user.role}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAberto(false)}
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/40 transition-colors cursor-pointer"
                aria-label="Fechar Central de Dúvidas"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Campo de Busca e Filtro em Chips */}
            <div className="p-4 bg-white border-b border-slate-200 space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar funcionamento da plataforma..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-medium transition-all"
                />
              </div>

              {/* Categorias Filtráveis */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaAtiva(cat)}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                      categoriaAtiva === cat
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de Respostas Sanadas */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {faqsFiltradas.length === 0 ? (
                <div className="text-center py-12 px-4 text-slate-500 bg-white rounded-xl border border-slate-200 shadow-card">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-semibold text-slate-700">
                    Nenhuma instrução encontrada
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tente refinar sua busca ou selecione outra categoria.
                  </p>
                </div>
              ) : (
                faqsFiltradas.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl shadow-card hover:border-slate-300 transition-all space-y-2"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                      {faq.categoria}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {faq.pergunta}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {faq.resposta}
                    </p>
                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-500 font-medium">
                        Esta resposta foi útil?
                      </span>
                      <Button
                        size="sm"
                        variant={feedbackAjudou[faq.id] ? "primary" : "outline"}
                        onClick={() => toggleFeedback(faq.id)}
                        className={`py-1 px-2.5 text-[11px] ${
                          feedbackAjudou[faq.id]
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-slate-600 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {feedbackAjudou[faq.id] ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Obrigado!</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3 h-3 text-slate-400" />
                            <span>Sim</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Rodapé Fixo do Drawer */}
            <div className="p-3 bg-white border-t border-slate-200 text-center text-[11px] font-semibold text-slate-500 shrink-0">
              Plataforma Alvora · Central Operacional Multiperfil
            </div>
          </div>
        </div>
      )}
    </>
  );
};
