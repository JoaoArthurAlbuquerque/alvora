import React, { useState } from "react";
import { useAuthStore } from "../../core/auth/useAuthStore";
import { Button } from "../../core/ui/Button";
import { X, Send, Sparkles, BookOpen } from "lucide-react";
import { ChatMessage } from "../../types";

export const CentralDuvidasDrawer: React.FC = () => {
  const { isRAGDrawerOpen, toggleRAGDrawer } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "RAG_ASSISTANT",
      text: "Olá! Sou o Assistente Pedagógico SiDi. Como posso ajudar com suas dúvidas acadêmicas hoje?",
      timestamp: "14:00",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "USER",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const ragMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "RAG_ASSISTANT",
        text: "Conforme a ementa oficial, as presenças assíncronas são validadas mediante o consumo mínimo de 75% dos conteúdos e entrega dos exercícios dentro do prazo.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sourceChapter: "Ementa da Disciplina — Capítulo 1: Regras do AVA",
      };
      setMessages((prev) => [...prev, ragMsg]);
    }, 500);
  };

  if (!isRAGDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-200 bg-[#1E3A8A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-300" />
            <h2 className="font-bold text-base">Assistente Pedagógico RAG</h2>
          </div>
          <button
            onClick={() => toggleRAGDrawer(false)}
            className="p-1 text-white hover:bg-blue-800 rounded min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50"
          aria-live="polite"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === "USER" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl text-sm ${m.sender === "USER" ? "bg-[#2563EB] text-white" : "bg-white border border-slate-200 text-slate-900"}`}
              >
                <p>{m.text}</p>
                {m.sourceChapter && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-teal-700 font-semibold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>Fonte: {m.sourceChapter}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua dúvida sobre a disciplina..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-blue-600"
          />
          <Button
            variant="primary"
            onClick={handleSend}
            icon={<Send className="w-4 h-4" />}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};
