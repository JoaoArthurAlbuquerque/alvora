import React, { useState } from "react";
import {
  GestorMenuOption,
  SolicitacaoAprovacao,
  TurmaAcademica,
} from "../../types";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";

interface Props {
  selectedMenu?: GestorMenuOption;
}

export const PortalGestor: React.FC<Props> = ({ selectedMenu = "mural" }) => {
  // Estado mockado da Central de Aprovações
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAprovacao[]>([
    {
      id: "req-101",
      requerente: "Lucas Mendes Albuquerque",
      tipoRequerente: "Aluno",
      tipo: "Dispensa de Disciplina",
      dataSolicitacao: "18/Set/2026",
      status: "Pendente",
      justificativa: "Aproveitamento de estudos equivalente concluído no IFPE.",
    },
    {
      id: "req-102",
      requerente: "Gabriel Souza Lima",
      tipoRequerente: "Aluno",
      tipo: "Trancamento",
      dataSolicitacao: "19/Set/2026",
      status: "Pendente",
      justificativa: "Motivos de saúde comprovados por atestado médico longo.",
    },
    {
      id: "req-103",
      requerente: "Dra. Helena Vasconcelos",
      tipoRequerente: "Professor",
      tipo: "Recurso de Nota",
      dataSolicitacao: "15/Set/2026",
      status: "Deferido",
      justificativa: "Ajuste de digitação em nota de avaliação prática.",
    },
  ]);

  // Turmas mockadas para gestão acadêmica
  const [turmas, setTurmas] = useState<TurmaAcademica[]>([
    {
      codigo: "INF-402",
      nomeDisciplina: "Arquitetura Web Avançada",
      curso: "ADS",
      vagasOcupadas: 42,
      totalVagas: 45,
      professorAtribuido: "Dra. Helena Vasconcelos",
      status: "Aberta",
    },
    {
      codigo: "INF-301",
      nomeDisciplina: "Engenharia de Software",
      curso: "ADS",
      vagasOcupadas: 38,
      totalVagas: 40,
      professorAtribuido: "Prof. Roberto Almeida",
      status: "Aberta",
    },
    {
      codigo: "INF-204",
      nomeDisciplina: "Algoritmos e Estruturas II",
      curso: "Ciência da Computação",
      vagasOcupadas: 50,
      totalVagas: 50,
      professorAtribuido: "Prof. Marcelo Silva",
      status: "Fechada",
    },
  ]);

  const handleAprovar = (id: string, novoStatus: "Deferido" | "Indeferido") => {
    setSolicitacoes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: novoStatus } : s)),
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. MURAL INICIAL / DASHBOARD */}
      {selectedMenu === "mural" && (
        <div className="space-y-6">
          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-modern flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-sky-200">
                Painel Executivo da Coordenação
              </span>
              <h1 className="text-2xl font-bold mt-1">
                Visão Geral da Instituição
              </h1>
              <p className="text-xs text-blue-100 mt-1">
                Semestre 2026.1 · 1.480 alunos ativos · Taxa global de
                adimplência em 94.8%
              </p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-xs shrink-0">
              Emitir Balanço Acadêmico
            </Button>
          </div>

          {/* Cards de Métricas Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Matrículas Ativas
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-slate-900">1.480</span>
                <span className="text-xs text-emerald-600 font-semibold">
                  +4.2%
                </span>
              </div>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Retenção de Alunos
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-emerald-600">
                  91.8%
                </span>
                <span className="text-xs text-slate-400">Meta: 90%</span>
              </div>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Alunos em Risco
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-red-600">24</span>
                <Badge variant="highRisk">Ação Requerida</Badge>
              </div>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Adimplência Escolar
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-bold text-blue-600">94.8%</span>
                <span className="text-xs text-emerald-600 font-semibold">
                  +1.1%
                </span>
              </div>
            </Card>
          </div>

          {/* Avisos Institucionais & Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Avisos e Comunicados Institucionais
              </h2>

              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    Geral para Toda a Comunidade
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Publicado hoje às 08:00
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Abertura do Período de Renovação de Matrículas 2026.2
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Informamos que a renovação de matrículas e ajuste de matérias
                  para o próximo ciclo começará em 15 de Outubro.
                </p>
              </Card>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Solicitações Pendentes
              </h2>

              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800">
                    Requerimentos Urgentes
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    2 pendentes
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  2 alunos aguardam deliberação da coordenação para trancamento
                  e dispensa.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* 2. GESTÃO ACADÊMICA & CURRICULAR */}
      {selectedMenu === "academica" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Gestão Acadêmica & Oferta de Turmas
              </h1>
              <p className="text-xs text-slate-500">
                Abertura de turmas, matrizes curriculares e alocação de docentes
              </p>
            </div>
            <Button size="sm" variant="primary" className="text-xs">
              + Abrir Nova Turma
            </Button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">Código / Disciplina</th>
                  <th className="p-3.5">Curso</th>
                  <th className="p-3.5">Ocupação de Vagas</th>
                  <th className="p-3.5">Docente Responsável</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {turmas.map((t) => (
                  <tr key={t.codigo} className="hover:bg-slate-50/80">
                    <td className="p-3.5">
                      <strong className="block text-slate-900">
                        {t.nomeDisciplina}
                      </strong>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {t.codigo}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{t.curso}</td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      {t.vagasOcupadas} / {t.totalVagas} alunos
                    </td>
                    <td className="p-3.5 text-slate-700">
                      {t.professorAtribuido}
                    </td>
                    <td className="p-3.5 text-right">
                      <Badge
                        variant={t.status === "Aberta" ? "lowRisk" : "highRisk"}
                      >
                        {t.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. GESTÃO DE HORÁRIOS & ALOCAÇÃO */}
      {selectedMenu === "horarios" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Alocação de Salas & Grade Horária
            </h1>
            <p className="text-xs text-slate-500">
              Distribuição de espaços físicos, laboratórios e horários docentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Bloco A · Auditório Principal
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Seminário Integrador de Tecnologia
              </h3>
              <span className="text-xs text-slate-500 block">
                Segundas · 19:00 - 22:00
              </span>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Bloco B · Laboratório 02
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                INF-402 (Arquitetura Web)
              </h3>
              <span className="text-xs text-slate-500 block">
                Quartas · 19:00 - 20:40
              </span>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Bloco C · Sala 104
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                INF-301 (Engenharia de Software)
              </h3>
              <span className="text-xs text-slate-500 block">
                Sextas · 20:40 - 22:20
              </span>
            </Card>
          </div>
        </div>
      )}

      {/* 4. RELATÓRIOS & ANALYTICS */}
      {selectedMenu === "analytics" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Relatórios & Analytics Institucional
            </h1>
            <p className="text-xs text-slate-500">
              Indicadores de evasão, desempenho por turma e adimplência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Desempenho Média por Curso
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-semibold text-slate-700">
                    <span>Análise e Desenvolvimento de Sistemas</span>
                    <span>7.8 Média</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[78%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-semibold text-slate-700">
                    <span>Ciência da Computação</span>
                    <span>8.2 Média</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[82%]" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Índice de Frequência por Período
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-semibold text-slate-700">
                    <span>Atividades Assíncronas Entregues</span>
                    <span>88.4%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[88%]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* 5. CENTRAL DE APROVAÇÕES */}
      {selectedMenu === "aprovacoes" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Central de Aprovações & Deferimentos
            </h1>
            <p className="text-xs text-slate-500">
              Análise de requerimentos de alunos e recursos docentes
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">Requerente</th>
                  <th className="p-3.5">Tipo de Solicitação</th>
                  <th className="p-3.5">Justificativa</th>
                  <th className="p-3.5">Data</th>
                  <th className="p-3.5 text-right">Ação / Parecer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {solicitacoes.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80">
                    <td className="p-3.5">
                      <strong className="block text-slate-900">
                        {s.requerente}
                      </strong>
                      <span className="text-[10px] text-slate-400">
                        {s.tipoRequerente}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      {s.tipo}
                    </td>
                    <td className="p-3.5 max-w-xs text-slate-600 truncate">
                      {s.justificativa}
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {s.dataSolicitacao}
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      {s.status === "Pendente" ? (
                        <>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleAprovar(s.id, "Deferido")}
                            className="text-[11px] py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700"
                          >
                            Deferir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAprovar(s.id, "Indeferido")}
                            className="text-[11px] py-1 px-2.5 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Indeferir
                          </Button>
                        </>
                      ) : (
                        <Badge
                          variant={
                            s.status === "Deferido" ? "lowRisk" : "highRisk"
                          }
                        >
                          {s.status}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. SECRETARIA GERAL */}
      {selectedMenu === "secretaria" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Secretaria Acadêmica Geral
            </h1>
            <p className="text-xs text-slate-500">
              Supervisão de registros, portarias e validação de documentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Registro de Diplomas
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Emissão e Validação de Históricos Finais
              </h3>
              <p className="text-xs text-slate-600">
                Lote de 45 diplomas do curso de ADS aguardando assinatura e
                validação digital.
              </p>
              <Button size="sm" variant="outline" className="text-xs">
                Acessar Lote de Documentos
              </Button>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                Portarias Institucionais
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Publicação de Portarias de Credenciamento
              </h3>
              <p className="text-xs text-slate-600">
                Consolidado de diretrizes de ensino assíncrono auditado para o
                ciclo 2026.
              </p>
              <Button size="sm" variant="outline" className="text-xs">
                Nova Portaria
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* 7. ARQUIVOS & DOCUMENTOS INSTITUCIONAIS */}
      {selectedMenu === "documentos" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Repositório Regulatório & Atas
            </h1>
            <p className="text-xs text-slate-500">
              Atas de reunião da congregação, normas internas e diretrizes MEC
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-card flex items-center justify-between">
              <div>
                <strong className="text-xs text-slate-900 block">
                  Ata de Congregação Acadêmica Nº 04/2026
                </strong>
                <span className="text-[10px] text-slate-500">
                  Formato .PDF · 2.4 MB
                </span>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Download
              </Button>
            </Card>

            <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-card flex items-center justify-between">
              <div>
                <strong className="text-xs text-slate-900 block">
                  Diretrizes do Ensino Assíncrono INEP/MEC
                </strong>
                <span className="text-[10px] text-slate-500">
                  Formato .PDF · 4.1 MB
                </span>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Download
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
