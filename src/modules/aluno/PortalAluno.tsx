// src/modules/aluno/PortalAluno.tsx
import React, { useState } from "react";
import { CentralTabOption, SidebarMenuOption } from "../../types";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";
import { MOCK_NOTAS_ALUNO, MOCK_FREQUENCIA_ALUNO } from "../../mocks/data";
import { AssistentePedagogicoModal } from "../assistente-pedagogico/AssistentePedagogicoModal";

interface Props {
  selectedMenu?: SidebarMenuOption;
}

export const PortalAluno: React.FC<Props> = ({ selectedMenu = "mural" }) => {
  const [centralAba, setCentralAba] = useState<CentralTabOption>("desempenho");
  const [modalTutor, setModalTutor] = useState(false);

  return (
    <div className="space-y-6">
      {/* VISÃO: MURAL (Página Inicial) */}
      {selectedMenu === "mural" && (
        <div className="space-y-6">
          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-modern flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-sky-200">
                Mural do Aluno · 2026.1
              </span>
              <h1 className="text-2xl font-bold mt-1">
                Bem-vindo ao seu ambiente de estudos
              </h1>
              <p className="text-xs text-blue-100 mt-1">
                Você possui 2 entregas pendentes para esta semana e 1 aviso da
                coordenação.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setModalTutor(true)}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-xs"
            >
              Tutor Pedagógico IA
            </Button>
          </div>

          {/* Cards de Avisos e Quadro Geral */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Avisos e Ocorrências Recentes
              </h2>

              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    Coordenação Acadêmica
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Hoje às 09:40
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Prazo final para envio do Projeto Prático de React
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lembramos que a entrega final do Módulo Assíncrono deve ser
                  realizada até dia 22/Set às 23:59 via plataforma.
                </p>
              </Card>

              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Presença Confirmada
                  </span>
                  <span className="text-[11px] text-slate-400">Ontem</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Auditoria de Presença Assíncrona Atualizada
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sua participação nos fóruns de discussão garantiu 96% de
                  presença calculada na disciplina INF-204.
                </p>
              </Card>
            </div>

            {/* Resumo do Calendário */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Próximas Aulas
              </h2>
              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
                <div className="border-l-2 border-blue-600 pl-3">
                  <span className="text-[11px] font-bold text-slate-400 block">
                    Segunda-feira · 19:00
                  </span>
                  <strong className="text-xs text-slate-800 block">
                    Arquitetura Web Avançada
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Profª Dra. Helena Vasconcelos
                  </span>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 block">
                    Quarta-feira · 20:40
                  </span>
                  <strong className="text-xs text-slate-800 block">
                    Engenharia de Software
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Prof. Roberto Almeida
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* VISÃO: CENTRAL DO ALUNO (Com Abas) */}
      {selectedMenu === "central" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Central do Aluno
              </h1>
              <p className="text-xs text-slate-500">
                Acompanhamento completo de notas, faltas e vida acadêmica
              </p>
            </div>
          </div>

          {/* Seletor de Abas da Central */}
          <div className="flex gap-2 border-b border-slate-200">
            {(
              [
                ["desempenho", "Desempenho"],
                ["faltas", "Faltas & Presença"],
                ["notas", "Notas Detalhadas"],
                ["ocorrencias", "Ocorrências"],
                ["plano", "Plano de Aula"],
              ] as const
            ).map(([tabKey, label]) => (
              <button
                key={tabKey}
                onClick={() => setCentralAba(tabKey as CentralTabOption)}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  centralAba === tabKey
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Conteúdo da Aba Selecionada */}
          {centralAba === "notas" && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3.5">Disciplina</th>
                    <th className="p-3.5">P1</th>
                    <th className="p-3.5">P2</th>
                    <th className="p-3.5">Trabalho</th>
                    <th className="p-3.5">Média</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_NOTAS_ALUNO.map((n) => (
                    <tr key={n.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5 font-semibold text-slate-900">
                        {n.disciplina}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {n.p1.toFixed(1)}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {n.p2.toFixed(1)}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {n.trabalho.toFixed(1)}
                      </td>
                      <td className="p-3.5 font-bold text-blue-600">
                        {n.media.toFixed(1)}
                      </td>
                      <td className="p-3.5 text-right">
                        <Badge
                          variant={n.status === "Aprovado" ? "lowRisk" : "info"}
                        >
                          {n.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {centralAba === "faltas" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_FREQUENCIA_ALUNO.map((f) => (
                <Card
                  key={f.disciplinaId}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-card"
                >
                  <span className="text-[10px] font-bold text-blue-600 uppercase">
                    {f.disciplinaId}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-0.5">
                    {f.nomeDisciplina}
                  </h3>
                  <div className="mt-3 flex justify-between items-baseline">
                    <span className="text-2xl font-bold text-slate-900">
                      {f.percentualPresenca}%
                    </span>
                    <span className="text-xs text-slate-500">
                      Presença Calculada
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {(centralAba === "desempenho" ||
            centralAba === "ocorrencias" ||
            centralAba === "plano") && (
            <Card className="p-6 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500">
              Módulo de {centralAba.toUpperCase()} carregado e integrado ao
              sistema de registros.
            </Card>
          )}
        </div>
      )}

      {/* VISÃO: OUTRAS SEÇÕES (Grade, Horários, Secretaria, Documentos) */}
      {selectedMenu !== "mural" && selectedMenu !== "central" && (
        <Card className="p-8 bg-white border border-slate-200 rounded-xl text-center space-y-2">
          <h2 className="text-base font-bold text-slate-900 capitalize">
            {selectedMenu.replace("-", " ")}
          </h2>
          <p className="text-xs text-slate-500">
            Painel institucional do aluno para a seção {selectedMenu}.
          </p>
        </Card>
      )}

      <AssistentePedagogicoModal
        isOpen={modalTutor}
        onClose={() => setModalTutor(false)}
      />
    </div>
  );
};
