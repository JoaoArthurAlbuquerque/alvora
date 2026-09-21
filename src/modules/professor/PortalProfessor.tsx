import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../../core/ui/Card";
import { Button } from "../../core/ui/Button";
import { Badge } from "../../core/ui/Badge";
import {
  mockGradeEntries,
  mockStudentsProgress,
  mockAuditLogs,
} from "../../mocks/data";
import {
  Save,
  CheckSquare,
  FileSpreadsheet,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

export const PortalProfessor: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [grades, setGrades] = useState(mockGradeEntries);

  const currentSub = location.pathname.split("/")[2] || "turmas";

  return (
    <div className="space-y-6">
      {/* Cards de Turmas na sub-rota /turmas */}
      {currentSub === "turmas" && (
        <div className="space-y-6">
          <h1 className="text-xl font-bold text-slate-900">
            Visão Geral das Turmas Atribuídas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              title="Engenharia de Software (Turma A)"
              subtitle="ENG301 — 32 Alunos"
            >
              <div className="space-y-3 mt-2">
                <p className="text-xs text-slate-600">
                  Aulas Seg/Qua às 19:00 | Porto Digital
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<CheckSquare className="w-3.5 h-3.5" />}
                    onClick={() => navigate("/professor/frequencia")}
                  >
                    Frequência
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
                    onClick={() => navigate("/professor/notas")}
                  >
                    Notas
                  </Button>
                </div>
              </div>
            </Card>

            <Card
              title="Sistemas Preditivos (Turma B)"
              subtitle="IA402 — 28 Alunos"
            >
              <div className="space-y-3 mt-2">
                <p className="text-xs text-slate-600">
                  Aulas Ter/Qui às 19:00 | Campus SiDi
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<CheckSquare className="w-3.5 h-3.5" />}
                    onClick={() => navigate("/professor/frequencia")}
                  >
                    Frequência
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
                    onClick={() => navigate("/professor/notas")}
                  >
                    Notas
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Sub-rota Lançamento de Notas */}
      {currentSub === "notas" && (
        <Card
          title="Grade de Lançamento de Notas"
          subtitle="Edição inline com recálculo automático"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th scope="col" className="p-3">
                    Aluno / Matrícula
                  </th>
                  <th scope="col" className="p-3">
                    AV1
                  </th>
                  <th scope="col" className="p-3">
                    AV2
                  </th>
                  <th scope="col" className="p-3">
                    Trabalhos
                  </th>
                  <th scope="col" className="p-3">
                    Média Ponderada
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {grades.map((row) => (
                  <tr key={row.studentId} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">
                      {row.studentName}
                      <span className="text-xs text-slate-500 block">
                        {row.matricula}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">{row.av1}</td>
                    <td className="p-3 font-semibold">{row.av2}</td>
                    <td className="p-3 font-semibold">{row.trabalhos}</td>
                    <td className="p-3 font-bold text-slate-900 text-base">
                      {row.mediaCalculada.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Sub-rota Alertas de Evasão */}
      {currentSub === "alertas" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockStudentsProgress.map((st) => (
            <Card key={st.studentId} className="border-l-4 border-l-red-600">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {st.studentName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {st.matricula} | {st.curso}
                  </p>
                </div>
                <Badge level={st.riskLevel} text={`Risco ${st.riskLevel}`} />
              </div>
              <p className="text-xs text-slate-700 mt-3 bg-slate-50 p-2.5 rounded border border-slate-200">
                <strong>Motivo:</strong> {st.riskReason}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
