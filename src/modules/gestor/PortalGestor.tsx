// src/modules/gestor/PortalGestor.tsx
import React from "react";
import { Card } from "../../core/ui/Card";

export const PortalGestor: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Painel de Gestão Institucional
        </h1>
        <p className="text-xs text-slate-500">
          Indicadores gerais de desempenho e matrículas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">
            Total de Alunos
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">1,248</p>
        </Card>
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">
            Docentes Ativos
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">84</p>
        </Card>
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">Retenção</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">94.2%</p>
        </Card>
        <Card>
          <p className="text-xs font-bold text-[#5170FF] uppercase">Evasão</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">2.1%</p>
        </Card>
      </div>
    </div>
  );
};
