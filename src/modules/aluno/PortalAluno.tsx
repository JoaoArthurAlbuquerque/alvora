import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";
import { mockDisciplines, mockDeadlines, mockUsers } from "../../mocks/data";
import { ShieldCheck, Clock, Sparkles } from "lucide-react";
import { useAuthStore } from "../../core/auth/useAuthStore";

export const PortalAluno: React.FC = () => {
  const location = useLocation();
  const { toggleRAGDrawer } = useAuthStore();
  const aluno = mockUsers[0];

  const currentTab = location.pathname.split("/")[2] || "painel";

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Olá, {aluno.name}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Matrícula:{" "}
            <strong className="text-slate-800">{aluno.matricula}</strong> |{" "}
            {aluno.curso}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div>
            <span className="text-xs text-slate-500 block">
              Progresso no Semestre
            </span>
            <span className="text-lg font-extrabold text-blue-900">
              88% Concluído
            </span>
          </div>
          <div className="w-24 bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[88%]" />
          </div>
        </div>
      </div>

      {/* Sub-rota: Painel */}
      {(currentTab === "painel" || currentTab === "frequencia") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Frequência Assíncrona Consolidada"
            subtitle="Registrada por consumo de conteúdo e entregas de atividades"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
              <div className="w-28 h-28 rounded-full border-8 border-teal-500/20 flex items-center justify-center">
                <span className="text-2xl font-black text-slate-900">88%</span>
              </div>
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 text-xs px-3 py-1.5 rounded-md font-semibold">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Calculado por IA (Auditado)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Presença computada considerando visualização de videoaulas,
                  leitura e tarefas.
                </p>
              </div>
            </div>
          </Card>

          <Card
            title="Assistente Pedagógico RAG"
            subtitle="Suporte direto baseado na ementa oficial"
          >
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Dúvidas em Engenharia de Software ou IA? O assistente RAG
                responde com base nas ementas.
              </p>
              <Button
                variant="primary"
                onClick={() => toggleRAGDrawer(true)}
                icon={<Sparkles className="w-4 h-4" />}
                className="w-full"
              >
                Iniciar Chat Tira-Dúvidas
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Sub-rota: Notas */}
      {(currentTab === "painel" || currentTab === "notas") && (
        <Card
          title="Minhas Disciplinas e Boletim"
          subtitle="Acompanhamento de médias parciais"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <th scope="col" className="p-3">
                    Código / Disciplina
                  </th>
                  <th scope="col" className="p-3">
                    Frequência
                  </th>
                  <th scope="col" className="p-3">
                    Média Parcial
                  </th>
                  <th scope="col" className="p-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockDisciplines.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-900">
                      <span className="text-xs text-slate-500 block">
                        {d.code}
                      </span>
                      {d.name}
                    </td>
                    <td className="p-3 font-semibold text-slate-800">
                      {d.frequenciaAsync}%
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {d.notaAtual.toFixed(1)}
                    </td>
                    <td className="p-3">
                      {d.statusAprovacao === "EM_RISCO" ? (
                        <Badge level="ALTO" text="Atenção / Risco" />
                      ) : (
                        <Badge level="BAIXO" text="Regular" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Sub-rota: Tarefas */}
      {(currentTab === "painel" || currentTab === "tarefas") && (
        <Card
          title="Próximos Prazos & Entregas"
          subtitle="Cronograma de atividades"
        >
          <div className="space-y-3">
            {mockDeadlines.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-500" />
                  <div>
                    <span className="text-xs font-bold text-blue-900 block">
                      {item.disciplineName}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </span>
                  </div>
                </div>
                <Badge
                  level={item.daysRemaining === 0 ? "ALTO" : "MEDIO"}
                  text={
                    item.daysRemaining === 0
                      ? "Vence Hoje"
                      : `Faltam ${item.daysRemaining} dias`
                  }
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
