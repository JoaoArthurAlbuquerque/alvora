// src/modules/professor/PortalProfessor.tsx
import React from "react";
import { Card } from "../../core/ui/Card";
import { Button } from "../../core/ui/Button";
import { useNavigate } from "react-router-dom";

export const PortalProfessor: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Painel do Docente
          </h1>
          <p className="text-xs text-slate-500">
            Gerencie turmas, lançamentos e diários de classe.
          </p>
        </div>
        <Button onClick={() => navigate("/professor/frequencia")}>
          Lançar Frequência
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverable>
          <span className="text-xs font-bold text-[#5170FF] bg-[#5170FF]/10 px-2.5 py-1 rounded-full">
            Turma A - Noturno
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-3">
            Engenharia de Front-End
          </h3>
          <p className="text-xs text-slate-500 mt-1">42 Alunos Matriculados</p>
          <div className="mt-4 pt-4 border-t border-[#5170FF]/10 flex justify-between items-center">
            <span className="text-xs font-semibold text-emerald-600">
              Diário Atualizado
            </span>
            <Button variant="ghost" size="sm">
              Ver Detalhes
            </Button>
          </div>
        </Card>

        <Card hoverable>
          <span className="text-xs font-bold text-[#5170FF] bg-[#5170FF]/10 px-2.5 py-1 rounded-full">
            Turma B - Matutino
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-3">
            Arquitetura de Software
          </h3>
          <p className="text-xs text-slate-500 mt-1">38 Alunos Matriculados</p>
          <div className="mt-4 pt-4 border-t border-[#5170FF]/10 flex justify-between items-center">
            <span className="text-xs font-semibold text-amber-600">
              Pendência de Notas
            </span>
            <Button variant="ghost" size="sm">
              Ver Detalhes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
