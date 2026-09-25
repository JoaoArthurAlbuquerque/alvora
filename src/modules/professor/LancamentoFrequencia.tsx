// src/modules/professor/LancamentoFrequencia.tsx
import React, { useState } from "react";
import { Card } from "../../core/ui/Card";
import { Button } from "../../core/ui/Button";

export const LancamentoFrequencia: React.FC = () => {
  const [alunos, setAlunos] = useState([
    { id: "1", nome: "Ana Beatriz Souza", presente: true },
    { id: "2", nome: "Carlos Eduardo Lima", presente: true },
    { id: "3", nome: "João Arthur Albuquerque", presente: true },
    { id: "4", nome: "Mariana Costa", presente: false },
  ]);

  const togglePresenca = (id: string) => {
    setAlunos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, presente: !a.presente } : a)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Lançamento de Frequência
          </h1>
          <p className="text-xs text-slate-500">
            Disciplina: Engenharia de Front-End • Data: Hoje
          </p>
        </div>
        <Button variant="primary">Salvar Chamada</Button>
      </div>

      <Card>
        <div className="divide-y divide-[#5170FF]/10">
          {alunos.map((aluno) => (
            <div
              key={aluno.id}
              className="py-3 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-slate-800">
                {aluno.nome}
              </span>
              <button
                onClick={() => togglePresenca(aluno.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  aluno.presente
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                }`}
              >
                {aluno.presente ? "Presente" : "Ausente"}
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
