// src/modules/professor/PortalProfessor.tsx
import React, { useState } from "react";
import { Card } from "../../core/ui/Card";
import { Button } from "../../core/ui/Button";
import { Badge } from "../../core/ui/Badge";
import { Modal } from "../../core/ui/Modal";
import {
  mockGradeEntries,
  mockStudentsProgress,
  mockAuditLogs,
} from "../../mocks/data";
import {
  Save,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  History,
} from "lucide-react";

export const PortalProfessor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "NOTAS" | "FREQUENCIA" | "ALERTAS"
  >("NOTAS");
  const [grades, setGrades] = useState(mockGradeEntries);
  const [lastSavedTime, setLastSavedTime] = useState<string>("14:32");
  const [isSaving, setIsSaving] = useState(false);

  // Modal Human-in-the-Loop de Frequência
  const [selectedStudentForOverride, setSelectedStudentForOverride] = useState<
    string | null
  >(null);
  const [overrideValue, setOverrideValue] = useState<number>(75);
  const [justification, setJustification] = useState<string>("");

  const handleGradeChange = (
    studentId: string,
    field: "av1" | "av2" | "trabalhos",
    value: number,
  ) => {
    setGrades((prev) =>
      prev.map((item) => {
        if (item.studentId === studentId) {
          const updated = { ...item, [field]: value };
          const media = Number(
            ((updated.av1 + updated.av2 + updated.trabalhos) / 3).toFixed(1),
          );
          return { ...updated, mediaCalculada: media, status: "ALTERADO" };
        }
        return item;
      }),
    );

    // Simulação de Autosave
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const now = new Date();
      setLastSavedTime(
        `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
      );
    }, 400);
  };

  const handleConfirmOverride = () => {
    if (!justification.trim()) return;
    alert(
      `Frequência sobrescrita com sucesso para ${overrideValue}%. Justificativa registrada para auditoria.`,
    );
    setSelectedStudentForOverride(null);
    setJustification("");
  };

  return (
    <div className="space-y-6">
      {/* Filtro de Turma Ativa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <label
            htmlFor="turma-select"
            className="text-xs font-bold text-slate-500 uppercase block mb-1"
          >
            Turma Ativa sob Gestão
          </label>
          <select
            id="turma-select"
            className="bg-slate-50 border border-slate-300 font-bold text-slate-900 text-sm rounded-md px-3 py-2 focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
          >
            <option>
              ENG301 — Engenharia de Software Assíncrona (Turma A)
            </option>
            <option>
              IA402 — Sistemas Preditivos e RAG Aplicado (Turma B)
            </option>
            <option>
              UX205 — Design Systems e Acessibilidade Web (Turma C)
            </option>
          </select>
        </div>

        {/* Abas de Trabalho */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("NOTAS")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer min-h-[44px] ${
              activeTab === "NOTAS"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Lançamento de Notas
          </button>
          <button
            onClick={() => setActiveTab("FREQUENCIA")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer min-h-[44px] ${
              activeTab === "FREQUENCIA"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Frequência (Human-in-the-Loop)
          </button>
          <button
            onClick={() => setActiveTab("ALERTAS")}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer min-h-[44px] ${
              activeTab === "ALERTAS"
                ? "bg-white text-blue-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Alertas de Risco
          </button>
        </div>
      </div>

      {/* Aba 1: Lançamento Rápido de Notas */}
      {activeTab === "NOTAS" && (
        <Card
          title="Grade de Lançamento de Notas"
          subtitle="Edição rápida inline com recálculo automático de médias"
          action={
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Save
                className={`w-4 h-4 ${isSaving ? "text-blue-600 animate-spin" : "text-teal-600"}`}
              />
              <span>
                {isSaving
                  ? "Salvando..."
                  : `Salvo automaticamente às ${lastSavedTime}`}
              </span>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th scope="col" className="p-3">
                    Aluno / Matrícula
                  </th>
                  <th scope="col" className="p-3">
                    AV1 (Peso 1)
                  </th>
                  <th scope="col" className="p-3">
                    AV2 (Peso 1)
                  </th>
                  <th scope="col" className="p-3">
                    Trabalhos (Peso 1)
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
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={row.av1}
                        onChange={(e) =>
                          handleGradeChange(
                            row.studentId,
                            "av1",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue-600"
                        aria-label={`Nota AV1 para ${row.studentName}`}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={row.av2}
                        onChange={(e) =>
                          handleGradeChange(
                            row.studentId,
                            "av2",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue-600"
                        aria-label={`Nota AV2 para ${row.studentName}`}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={row.trabalhos}
                        onChange={(e) =>
                          handleGradeChange(
                            row.studentId,
                            "trabalhos",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-blue-600"
                        aria-label={`Nota Trabalhos para ${row.studentName}`}
                      />
                    </td>
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

      {/* Aba 2: Validação de Frequência Assíncrona (Human-in-the-Loop) */}
      {activeTab === "FREQUENCIA" && (
        <Card
          title="Validação de Frequência Assíncrona"
          subtitle="Ajuste manual docente com obrigatoriedade de justificativa pedagógica"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th scope="col" className="p-3">
                    Aluno
                  </th>
                  <th scope="col" className="p-3">
                    % Consumo Verificado (IA)
                  </th>
                  <th scope="col" className="p-3">
                    Ação Human-in-the-Loop
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockStudentsProgress.map((st) => (
                  <tr key={st.studentId} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">
                      {st.studentName}
                      <span className="text-xs text-slate-500 block">
                        {st.matricula}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800">
                      {st.frequenciaAsyncPercent}%
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setSelectedStudentForOverride(st.studentName)
                        }
                      >
                        Sobrescrever Frequência
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Aba 3: Alertas Preditivos de Risco */}
      {activeTab === "ALERTAS" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockStudentsProgress
            .filter((s) => s.riskLevel !== "BAIXO")
            .map((st) => (
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
                  <strong>Motivo do Alerta:</strong> {st.riskReason}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Score Preditivo: {st.riskScore}
                  </span>
                  <Button size="sm" variant="secondary">
                    Agendar Tutoria
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      )}

      {/* Modal de Sobrescrita de Frequência Docente */}
      <Modal
        isOpen={!!selectedStudentForOverride}
        onClose={() => setSelectedStudentForOverride(null)}
        title="Justificativa de Sobrescrita de Frequência"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Você está alterando manualmente a presença assíncrona calculada pela
            IA para <strong>{selectedStudentForOverride}</strong>.
          </p>
          <div>
            <label
              htmlFor="nova-freq"
              className="text-xs font-bold text-slate-700 block mb-1"
            >
              Nova Frequência (%)
            </label>
            <input
              id="nova-freq"
              type="number"
              min="0"
              max="100"
              value={overrideValue}
              onChange={(e) => setOverrideValue(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm font-semibold"
            />
          </div>
          <div>
            <label
              htmlFor="justificativa"
              className="text-xs font-bold text-slate-700 block mb-1"
            >
              Justificativa Pedagógica / Motivo (Obrigatório)
            </label>
            <textarea
              id="justificativa"
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Informe o motivo da alteração (ex: atestado médico, entrega fora do prazo validada)..."
              className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-sm"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setSelectedStudentForOverride(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              disabled={!justification.trim()}
              onClick={handleConfirmOverride}
            >
              Confirmar Alteração
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
