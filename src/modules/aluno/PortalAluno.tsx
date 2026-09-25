// src/modules/aluno/PortalAluno.tsx
import React from "react";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";

export const PortalAluno: React.FC = () => {
  const disciplinas = [
    {
      id: 1,
      nome: "Desenvolvimento Front-End Especializado",
      progresso: 85,
      faltas: 2,
      proximaAula: "Hoje, 19:00",
    },
    {
      id: 2,
      nome: "Engenharia de Software e Arquitetura",
      progresso: 60,
      faltas: 0,
      proximaAula: "Amanhã, 08:00",
    },
    {
      id: 3,
      nome: "Sistemas Distribuídos e Cloud",
      progresso: 40,
      faltas: 1,
      proximaAula: "Quinta, 10:00",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Principal */}
      <Card className="bg-gradient-to-r from-[#5170FF] to-[#3B59FF] text-white border-none p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Semestre 2026.2
            </span>
            <h1 className="text-2xl font-bold mt-2">
              Bem-vindo de volta, João!
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Seu rendimento acadêmico está 12% acima da média geral.
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-white text-[#5170FF] hover:bg-white/90 border-none"
          >
            Ver Boletim Completo
          </Button>
        </div>
      </Card>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">
            Média Geral
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">8.9</p>
          <Badge variant="success" className="mt-3">
            Aprovado por Média
          </Badge>
        </Card>
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">
            Frequência Global
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">96%</p>
          <Badge variant="primary" className="mt-3">
            Excelente
          </Badge>
        </Card>
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">
            Entregas Pendentes
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">02</p>
          <Badge variant="warning" className="mt-3">
            Prazo em 3 dias
          </Badge>
        </Card>
      </div>

      {/* Minhas Disciplinas */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">
          Minhas Disciplinas Em Andamento
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {disciplinas.map((d) => (
            <Card
              key={d.id}
              hoverable
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-slate-900 text-sm">{d.nome}</h4>
                <p className="text-xs text-slate-500">
                  Próxima Aula: {d.proximaAula}
                </p>
              </div>

              <div className="w-full md:w-48 space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Progresso</span>
                  <span className="text-[#5170FF]">{d.progresso}%</span>
                </div>
                <div className="w-full bg-[#5170FF]/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#5170FF] to-[#3B59FF] h-full rounded-full"
                    style={{ width: `${d.progresso}%` }}
                  />
                </div>
              </div>

              <Button variant="secondary" size="sm">
                Acessar Sala
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
