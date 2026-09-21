import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";
import { mockStudentsProgress, mockAuditLogs } from "../../mocks/data";
import { Download } from "lucide-react";

export const PortalGestor: React.FC = () => {
  const location = useLocation();
  const currentSub = location.pathname.split("/")[2] || "dashboard";

  return (
    <div className="space-y-6">
      {/* 4 KPIs do Topo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Alunos Ativos
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            1.240
          </span>
        </Card>
        <Card>
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Taxa de Retenção
          </span>
          <span className="text-2xl font-black text-[#1E3A8A] mt-1 block">
            91.4%
          </span>
        </Card>
        <Card>
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Alunos em Risco Alto
          </span>
          <span className="text-2xl font-black text-red-700 mt-1 block">
            18
          </span>
        </Card>
        <Card>
          <span className="text-xs font-bold text-slate-500 uppercase block">
            Conformidade A11y
          </span>
          <span className="text-2xl font-black text-teal-700 mt-1 block">
            98.2%
          </span>
        </Card>
      </div>

      {/* Tabela de Ranking de Risco */}
      {(currentSub === "dashboard" || currentSub === "risco") && (
        <Card
          title="Ranking Preditivo de Risco de Evasão"
          subtitle="Mapeamento institucional baseado em presencia e notas"
          action={
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
            >
              Exportar PDF
            </Button>
          }
        >
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
                    Nível de Risco
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockStudentsProgress.map((st) => (
                  <tr key={st.studentId} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">
                      {st.studentName}
                    </td>
                    <td className="p-3 text-slate-700">{st.curso}</td>
                    <td className="p-3 font-semibold">
                      {st.frequenciaAsyncPercent}%
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
      )}

      {/* Auditoria Geral */}
      {(currentSub === "auditoria" || currentSub === "relatorios") && (
        <Card
          title="Painel de Auditoria & Alterações Manuais"
          subtitle="Histórico transparente de intervenções docentes"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th scope="col" className="p-2.5">
                    Data/Hora
                  </th>
                  <th scope="col" className="p-2.5">
                    Professor
                  </th>
                  <th scope="col" className="p-2.5">
                    Aluno
                  </th>
                  <th scope="col" className="p-2.5">
                    Justificativa
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
                    <td className="p-2.5 text-slate-600">
                      {log.justification}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
