// src/modules/gestor/PortalGestor.tsx
import React, { useState } from "react";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";
import { mockStudentsProgress, mockAuditLogs } from "../../mocks/data";
import {
  Users,
  ShieldCheck,
  AlertTriangle,
  FileSpreadsheet,
  Search,
  Download,
} from "lucide-react";

export const PortalGestor: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<
    "TODOS" | "ALTO" | "MEDIO" | "BAIXO"
  >("TODOS");

  const filteredStudents = mockStudentsProgress.filter((st) => {
    const matchesSearch =
      st.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.matricula.includes(searchTerm);
    const matchesRisk = riskFilter === "TODOS" || st.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      {/* 4 KPIs do Topo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Alunos Ativos
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            1.240
          </span>
          <span className="text-[11px] text-teal-700 font-semibold mt-1 block">
            +4% em relação ao semestre anterior
          </span>
        </Card>

        <Card className="bg-white">
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Taxa de Retenção
          </span>
          <span className="text-2xl font-black text-[#1E3A8A] mt-1 block">
            91.4%
          </span>
          <span className="text-[11px] text-slate-600 mt-1 block">
            Meta institucional: ≥90%
          </span>
        </Card>

        <Card className="bg-white">
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Alunos em Risco Alto
          </span>
          <span className="text-2xl font-black text-red-700 mt-1 block">
            18
          </span>
          <span className="text-[11px] text-red-800 font-semibold mt-1 block">
            Requer intervenção da tutoria
          </span>
        </Card>

        <Card className="bg-white">
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Conformidade A11y
          </span>
          <span className="text-2xl font-black text-teal-700 mt-1 block">
            98.2%
          </span>
          <span className="text-[11px] text-slate-600 mt-1 block">
            Diretrizes WCAG 2.2 AA
          </span>
        </Card>
      </div>

      {/* Ranking Preditivo com Filtros */}
      <Card
        title="Ranking Preditivo de Risco de Evasão"
        subtitle="Mapeamento em tempo real baseado em presenças assíncronas e notas"
        action={
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
          >
            Exportar Relatório PDF
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <Search
              className="w-4 h-4 absolute left-3 top-3 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Buscar por nome ou matrícula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label="Campo de Busca de Alunos"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">
              Filtrar por Risco:
            </span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
            >
              <option value="TODOS">Todos</option>
              <option value="ALTO">Risco Alto</option>
              <option value="MEDIO">Risco Médio</option>
              <option value="BAIXO">Risco Baixo</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                <th scope="col" className="p-3">
                  Aluno
                </th>
                <th scope="col" className="p-3">
                  Curso
                </th>
                <th scope="col" className="p-3">
                  Frequência (%)
                </th>
                <th scope="col" className="p-3">
                  Média Parcial
                </th>
                <th scope="col" className="p-3">
                  Nível de Risco
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStudents.map((st) => (
                <tr key={st.studentId} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">
                    {st.studentName}
                    <span className="text-xs text-slate-500 block">
                      {st.matricula}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{st.curso}</td>
                  <td className="p-3 font-semibold">
                    {st.frequenciaAsyncPercent}%
                  </td>
                  <td className="p-3 font-bold">
                    {st.mediaParcial.toFixed(1)}
                  </td>
                  <td className="p-3">
                    <Badge level={st.riskLevel} text={st.riskLevel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Painel de Auditoria e Conformidade */}
      <Card
        title="Painel de Auditoria & Modificações Manuais"
        subtitle="Histórico transparente de alterações feitas por docentes (Human-in-the-Loop)"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                <th scope="col" className="p-2.5">
                  Data/Hora
                </th>
                <th scope="col" className="p-2.5">
                  Professor Responsável
                </th>
                <th scope="col" className="p-2.5">
                  Aluno Afetado
                </th>
                <th scope="col" className="p-2.5">
                  Original → Ajustado
                </th>
                <th scope="col" className="p-2.5">
                  Justificativa Registrada
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="p-2.5 font-bold text-slate-900">
                    {log.professorName}
                  </td>
                  <td className="p-2.5 text-slate-800">{log.studentName}</td>
                  <td className="p-2.5 font-semibold text-slate-900">
                    {log.originalPercent}% →{" "}
                    <span className="text-teal-700 font-bold">
                      {log.overridePercent}%
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-600 max-w-xs">
                    {log.justification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
