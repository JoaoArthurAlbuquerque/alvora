import React, { useState } from "react";
import { Card } from "../../core/ui/Card";
import { Button } from "../../core/ui/Button";
import { mockClassStudents } from "../../mocks/data";
import { StudentAttendanceRow, AttendanceStatus } from "../../types";
import {
  Search,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
} from "lucide-react";

export const LancamentoFrequencia: React.FC = () => {
  const [students, setStudents] =
    useState<StudentAttendanceRow[]>(mockClassStudents);
  const [selectedDate, setSelectedDate] = useState("2026-09-21");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleStatusChange = (
    studentId: string,
    newStatus: AttendanceStatus,
  ) => {
    setStudents((prev) =>
      prev.map((st) =>
        st.id === studentId ? { ...st, statusHoje: newStatus } : st,
      ),
    );
  };

  const handleObsChange = (studentId: string, obs: string) => {
    setStudents((prev) =>
      prev.map((st) => (st.id === studentId ? { ...st, observacao: obs } : st)),
    );
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    setStudents((prev) => prev.map((st) => ({ ...st, statusHoje: status })));
  };

  const handleSaveSheet = () => {
    const totalP = students.filter((s) => s.statusHoje === "PRESENTE").length;
    const totalF = students.filter((s) => s.statusHoje === "FALTA").length;

    setToastMessage(
      `Diário de classe salvo com sucesso! ${totalP} presenças e ${totalF} faltas registradas.`,
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = students.filter(
    (s) =>
      s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.matricula.includes(searchTerm),
  );

  const total = students.length;
  const presencas = students.filter((s) => s.statusHoje === "PRESENTE").length;
  const faltas = students.filter((s) => s.statusHoje === "FALTA").length;
  const justificadas = students.filter(
    (s) => s.statusHoje === "JUSTIFICADA",
  ).length;

  return (
    <div className="space-y-6 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Banner Informativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-blue-900 text-sm">
        <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">
            Diário de Classe — Chamada Diária de Turma
          </strong>
          <span>
            Registrando frequência referente à aula do dia. Os dados serão
            consolidados no histórico acadêmico do aluno.
          </span>
        </div>
      </div>

      {/* Barra de Seleção e Filtros */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label
              htmlFor="turma"
              className="text-xs font-bold text-slate-700 block mb-1"
            >
              Turma / Disciplina
            </label>
            <select
              id="turma"
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <option>
                ENG301 — Algoritmos e Estruturas de Dados (Turma A)
              </option>
              <option>IA402 — Sistemas Preditivos (Turma B)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="data-aula"
              className="text-xs font-bold text-slate-700 block mb-1"
            >
              Data da Aula
            </label>
            <input
              id="data-aula"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="horario"
              className="text-xs font-bold text-slate-700 block mb-1"
            >
              Horário / Etapa
            </label>
            <select
              id="horario"
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <option>Aula 01 & 02 (19:00 - 20:40)</option>
              <option>Aula 03 & 04 (20:50 - 22:30)</option>
            </select>
          </div>

          <Button variant="secondary" icon={<Search className="w-4 h-4" />}>
            Carregar Diário
          </Button>
        </div>
      </Card>

      {/* Ações em Massa e Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleMarkAll("PRESENTE")}
            className="px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer min-h-[44px]"
          >
            Marcar Todos Presentes
          </button>
          <button
            onClick={() => handleMarkAll("FALTA")}
            className="px-3 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded-md text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer min-h-[44px]"
          >
            Marcar Todos Ausentes
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            className="w-4 h-4 absolute left-3 top-3 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Buscar por nome ou matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Campo de Busca de Alunos"
          />
        </div>
      </div>

      {/* Tabela de Chamada Estilo TOTVS */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                <th scope="col" className="p-3">
                  Matrícula
                </th>
                <th scope="col" className="p-3">
                  Nome do Aluno
                </th>
                <th scope="col" className="p-3">
                  Freq. Acumulada
                </th>
                <th scope="col" className="p-3 text-center">
                  Status de Hoje (P / F / J)
                </th>
                <th scope="col" className="p-3">
                  Justificativa / Observação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-xs text-slate-600">
                    {st.matricula}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{st.nome}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    {st.frequenciaAcumulada}%
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleStatusChange(st.id, "PRESENTE")}
                        className={`w-10 h-9 rounded text-xs font-bold border transition-colors cursor-pointer ${
                          st.statusHoje === "PRESENTE"
                            ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-emerald-50"
                        }`}
                        aria-label={`Marcar Presente para ${st.nome}`}
                      >
                        P
                      </button>
                      <button
                        onClick={() => handleStatusChange(st.id, "FALTA")}
                        className={`w-10 h-9 rounded text-xs font-bold border transition-colors cursor-pointer ${
                          st.statusHoje === "FALTA"
                            ? "bg-rose-600 text-white border-rose-700 shadow-xs"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-rose-50"
                        }`}
                        aria-label={`Marcar Falta para ${st.nome}`}
                      >
                        F
                      </button>
                      <button
                        onClick={() => handleStatusChange(st.id, "JUSTIFICADA")}
                        className={`w-10 h-9 rounded text-xs font-bold border transition-colors cursor-pointer ${
                          st.statusHoje === "JUSTIFICADA"
                            ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-amber-50"
                        }`}
                        aria-label={`Marcar Justificada para ${st.nome}`}
                      >
                        J
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      disabled={st.statusHoje !== "JUSTIFICADA"}
                      value={st.observacao}
                      onChange={(e) => handleObsChange(st.id, e.target.value)}
                      placeholder={
                        st.statusHoje === "JUSTIFICADA"
                          ? "Informe a justificativa..."
                          : "—"
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs disabled:opacity-50"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 p-4 shadow-2xl z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs font-semibold">
            <div>
              Total: <span className="text-slate-900 font-bold">{total}</span>
            </div>
            <div className="text-emerald-700">
              Presenças: <span className="font-bold">{presencas}</span> (
              {((presencas / total) * 100).toFixed(0)}%)
            </div>
            <div className="text-rose-700">
              Faltas: <span className="font-bold">{faltas}</span> (
              {((faltas / total) * 100).toFixed(0)}%)
            </div>
            <div className="text-amber-700">
              Justificadas: <span className="font-bold">{justificadas}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden xl:inline-flex items-center gap-1.5 text-xs text-teal-700 font-medium bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
              <ShieldCheck className="w-4 h-4" />
              <span>[✓] Sugerida por IA (Consumo AVA)</span>
            </span>

            <Button
              variant="primary"
              icon={<Save className="w-4 h-4" />}
              onClick={handleSaveSheet}
            >
              Salvar Diário de Classe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
