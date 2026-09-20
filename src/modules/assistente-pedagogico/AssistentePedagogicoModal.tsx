import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../../core/ui/Modal";
import { Button } from "../../core/ui/Button";
import {
  Send,
  Bot,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Mensagem {
  id: string;
  remetente: "usuario" | "assistente";
  texto: string;
  horario: string;
  fonteEmenta?: string;
}

export const AssistentePedagogicoModal: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: "m-1",
      remetente: "assistente",
      texto:
        "Olá! Sou seu Tutor Pedagógico de Conteúdo. Estou conectado às ementas e materiais das suas disciplinas do semestre 2026.1. Como posso ajudar em seus estudos hoje?",
      horario: "Agora",
      fonteEmenta: "Ementa Geral · 2026.1",
    },
  ]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chips de perguntas frequentes do semestre
  const sugestoesRapidas = [
    "Explicar complexidade O(n log n)",
    "Como estruturar o projeto de React/TS?",
    "Dicas de estudo para a P1 de Arquitetura Web",
    "Diferença entre estado global e local",
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensagens, isOpen]);

  const processarMensagem = (textoPergunta: string) => {
    if (!textoPergunta.trim() || carregando) return;

    const horaAtual = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const novaMensagemUsuario: Mensagem = {
      id: Date.now().toString(),
      remetente: "usuario",
      texto: textoPergunta,
      horario: horaAtual,
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setInput("");
    setCarregando(true);

    // Simulação de resposta contextual fundamentada na ementa
    setTimeout(() => {
      let respostaTexto =
        "Com base no plano de ensino do semestre: para dominar este tópico, recomendo revisar os exemplos práticos disponibilizados no Módulo 2 da disciplina e praticar os exercícios do questionário quinzenal.";
      let ementaRef = "Plano de Ensino Geral";

      const termo = textoPergunta.toLowerCase();
      if (
        termo.includes("o(n log n)") ||
        termo.includes("complexidade") ||
        termo.includes("algoritmo")
      ) {
        respostaTexto =
          'Na disciplina INF-204 (Algoritmos e Estruturas II), a complexidade O(n log n) caracteriza algoritmos de ordenação eficientes como MergeSort e QuickSort. O fator "log n" vem da divisão sucessiva do problema em subproblemas (divisão e conquista).';
        ementaRef = "INF-204 · Módulo 3 (Análise de Algoritmos)";
      } else if (
        termo.includes("react") ||
        termo.includes("projeto") ||
        termo.includes("estruturar")
      ) {
        respostaTexto =
          "Para o projeto de INF-402, a boa prática recomendada pelo corpo docente é organizar por módulos de negócio (feature-based), isolando componentes reutilizáveis em core/ui e tipando as entidades com TypeScript em types/index.ts.";
        ementaRef = "INF-402 · Roteiro do Projeto Prático";
      } else if (termo.includes("estado") || termo.includes("global")) {
        respostaTexto =
          "No escopo de Engenharia de Software, utilize estado local (useState) para controle exclusivo de componentes (como modais e formulários). Reserve o estado global (Zustand) para sessão e preferências do usuário.";
        ementaRef = "INF-301 · Padrões de Arquitetura de Software";
      }

      const novaRespostaTutor: Mensagem = {
        id: (Date.now() + 1).toString(),
        remetente: "assistente",
        texto: respostaTexto,
        horario: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fonteEmenta: ementaRef,
      };

      setMensagens((prev) => [...prev, novaRespostaTutor]);
      setCarregando(false);
    }, 700);
  };

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    processarMensagem(input);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tutor Pedagógico de Conteúdo"
      description="Suporte conceitual baseado nas ementas e materiais oficiais das suas disciplinas."
    >
      <div className="flex flex-col h-[480px] font-sans -mx-2 -mb-2">
        {/* Banner de Contexto de Aprendizagem */}
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl mb-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-blue-900 font-medium">
            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Consultando disciplinas do semestre: INF-402, INF-301 e INF-204
            </span>
          </div>
          <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
            2026.1
          </span>
        </div>

        {/* Área de Conversa */}
        <div className="flex-1 overflow-y-auto space-y-3.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
          {mensagens.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.remetente === "usuario" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex gap-2 max-w-[85%] ${
                  m.remetente === "usuario" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {m.remetente === "assistente" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Bot className="w-4 h-4 text-sky-200" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.remetente === "usuario"
                      ? "bg-blue-600 text-white rounded-tr-xs shadow-xs font-medium"
                      : "bg-white text-slate-800 border border-slate-200 shadow-card rounded-tl-xs"
                  }`}
                >
                  <p>{m.texto}</p>

                  {m.fonteEmenta && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-blue-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{m.fonteEmenta}</span>
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-slate-400 font-medium mt-1 px-1">
                {m.horario}
              </span>
            </div>
          ))}

          {carregando && (
            <div className="flex items-center gap-2 text-xs text-slate-500 p-2 bg-white rounded-xl border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Analisando materiais de aula...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Sugestões Rápidas de Prompt */}
        <div className="py-2.5 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>Sugestões:</span>
          </div>
          {sugestoesRapidas.map((sugestao) => (
            <button
              key={sugestao}
              type="button"
              onClick={() => processarMensagem(sugestao)}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-[11px] font-semibold text-slate-600 rounded-lg whitespace-nowrap transition-all shadow-2xs cursor-pointer"
            >
              {sugestao}
            </button>
          ))}
        </div>

        {/* Formulário de Envio */}
        <form onSubmit={handleEnviar} className="flex gap-2 shrink-0 pt-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tire uma dúvida conceitual sobre suas matérias..."
            className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
          />
          <Button
            type="submit"
            disabled={!input.trim() || carregando}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 rounded-xl shrink-0 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar</span>
          </Button>
        </form>
      </div>
    </Modal>
  );
};
