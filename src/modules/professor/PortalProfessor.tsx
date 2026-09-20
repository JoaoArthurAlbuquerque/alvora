// src/modules/professor/PortalProfessor.tsx
import React, { useState, useEffect } from "react";
import { DiarioTabOption, ProfessorMenuOption } from "../../types";
import { Card } from "../../core/ui/Card";
import { Badge } from "../../core/ui/Badge";
import { Button } from "../../core/ui/Button";
import { MOCK_ALERTAS_RISCO } from "../../mocks/data";

interface Props {
  selectedMenu?: ProfessorMenuOption;
}

interface AlunoFrequencia {
  id: string;
  nome: string;
  matricula: string;
  presencas: number;
  faltas: number;
  p1: number;
  p2: number;
}

export const PortalProfessor: React.FC<Props> = ({
  selectedMenu = "mural",
}) => {
  const [diarioAba, setDiarioAba] = useState<DiarioTabOption>("frequencia");
  const [turmaSelecionada, setTurmaSelecionada] = useState("INF-402");
  const [salvoFeedback, setSalvoFeedback] = useState(false);

  // Estado dos alunos no diário com autosave em localStorage
  const [alunos, setAlunos] = useState<AlunoFrequencia[]>(() => {
    const salvo = localStorage.getItem("alvora_diario_professor_v4");
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        /* fallback */
      }
    }
    return [
      {
        id: "1",
        nome: "Lucas Mendes Albuquerque",
        matricula: "20261001",
        presencas: 18,
        faltas: 2,
        p1: 8.5,
        p2: 9.0,
      },
      {
        id: "2",
        nome: "Gabriel Souza Lima",
        matricula: "20261044",
        presencas: 10,
        faltas: 10,
        p1: 3.5,
        p2: 3.0,
      },
      {
        id: "3",
        nome: "Mariana Duarte Costa",
        matricula: "20261088",
        presencas: 16,
        faltas: 4,
        p1: 6.0,
        p2: 5.5,
      },
      {
        id: "4",
        nome: "Caio Fernando Rocha",
        matricula: "20261099",
        presencas: 19,
        faltas: 1,
        p1: 9.0,
        p2: 8.5,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("alvora_diario_professor_v4", JSON.stringify(alunos));
  }, [alunos]);

  const handleAlterarFalta = (id: string, delta: number) => {
    setAlunos((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const novasFaltas = Math.max(0, a.faltas + delta);
          return { ...a, faltas: novasFaltas };
        }
        return a;
      }),
    );
  };

  const handleNotaChange = (id: string, campo: "p1" | "p2", val: string) => {
    const num = parseFloat(val) || 0;
    setAlunos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [campo]: num } : a)),
    );
  };

  const handleSalvar = () => {
    setSalvoFeedback(true);
    setTimeout(() => setSalvoFeedback(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. MURAL INICIAL DO PROFESSOR */}
      {selectedMenu === "mural" && (
        <div className="space-y-6">
          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-modern flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-sky-200">
                Mural do Docente · Semestre 2026.1
              </span>
              <h1 className="text-2xl font-bold mt-1">
                Painel Institucional do Professor
              </h1>
              <p className="text-xs text-blue-100 mt-1">
                2 prazos de entrega pendentes nesta semana · 3 alunos necessitam
                de atenção pedagógica.
              </p>
            </div>
            <Button
              onClick={handleSalvar}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-xs shrink-0"
            >
              {salvoFeedback
                ? "Registros Sincronizados"
                : "Salvar Alterações do Dia"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Comunicados e Lembretes */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Avisos Dirigidos e Comunicados
              </h2>

              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    Prazo Crítico
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Até 25/Set às 23:59
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Fechamento da P1 e Lançamento de Diários de Classe
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Solicitamos a digitação das notas de P1 e validação das
                  frequências do módulo para consolidação do relatório de
                  retenção escolar.
                </p>
              </Card>

              <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    Coordenação
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Ontem às 14:00
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Reunião de Alinhamento Pedagógico do Bloco Tecnológico
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Disponibilizado o link da gravação do encontro pedagógico
                  sobre métodos de engajamento no ensino assíncrono.
                </p>
              </Card>
            </div>

            {/* Alertas de Evasão na Turma */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Alertas de Evasão (Suas Turmas)
              </h2>

              <div className="space-y-3">
                {MOCK_ALERTAS_RISCO.map((a) => (
                  <Card
                    key={a.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl shadow-card space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-slate-900">
                        {a.alunoNome}
                      </strong>
                      <Badge
                        variant={
                          a.nivelRisco === "ALTO" ? "highRisk" : "midRisk"
                        }
                      >
                        {a.nivelRisco}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {a.motivoPrincipal}
                    </p>
                    <span className="block text-[10px] font-semibold text-blue-600 pt-1 border-t border-slate-100">
                      Ação sugerida: {a.acaoRecomendada}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DIÁRIO DE CLASSE / MINHAS TURMAS */}
      {selectedMenu === "diario" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Diário de Classe Digital
              </h1>
              <p className="text-xs text-slate-500">
                Gerenciamento de presenças, notas e registros de aula
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">
                Turma:
              </span>
              <select
                value={turmaSelecionada}
                onChange={(e) => setTurmaSelecionada(e.target.value)}
                className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 bg-white font-semibold text-slate-800 focus:outline-2 focus:outline-blue-600"
              >
                <option value="INF-402">INF-402 (Arquitetura Web)</option>
                <option value="INF-301">
                  INF-301 (Engenharia de Software)
                </option>
                <option value="INF-204">INF-204 (Algoritmos II)</option>
              </select>
            </div>
          </div>

          {/* Abas do Diário */}
          <div className="flex gap-2 border-b border-slate-200">
            {(
              [
                ["frequencia", "Lançamento de Frequência"],
                ["notas", "Digitação de Notas"],
                ["conteudo", "Conteúdos Ministrados"],
                ["avaliacoes", "Criar Avaliação"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setDiarioAba(key as DiarioTabOption)}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  diarioAba === key
                    ? "border-blue-600 text-blue-600 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Aba: Frequência */}
          {diarioAba === "frequencia" && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3.5">Aluno / Matrícula</th>
                    <th className="p-3.5">Presenças</th>
                    <th className="p-3.5">Faltas Registradas</th>
                    <th className="p-3.5 text-right">Ajuste Rápido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alunos.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/80">
                      <td className="p-3.5">
                        <strong className="block text-slate-900">
                          {a.nome}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {a.matricula}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-emerald-600">
                        {a.presencas} aulas
                      </td>
                      <td className="p-3.5 font-bold text-slate-800">
                        {a.faltas} faltas
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAlterarFalta(a.id, 1)}
                          className="text-[11px] py-1 px-2 text-red-600 border-red-200 hover:bg-red-50"
                        >
                          +1 Falta
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAlterarFalta(a.id, -1)}
                          className="text-[11px] py-1 px-2 text-slate-600"
                        >
                          -1 Falta
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Aba: Digitação de Notas */}
          {diarioAba === "notas" && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3.5">Aluno</th>
                    <th className="p-3.5">Nota P1</th>
                    <th className="p-3.5">Nota P2</th>
                    <th className="p-3.5">Média Parcial</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alunos.map((a) => {
                    const media = (a.p1 + a.p2) / 2;
                    return (
                      <tr key={a.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5 font-semibold text-slate-900">
                          {a.nome}
                        </td>
                        <td className="p-3.5">
                          <input
                            type="number"
                            step="0.1"
                            value={a.p1}
                            onChange={(e) =>
                              handleNotaChange(a.id, "p1", e.target.value)
                            }
                            className="w-16 px-2 py-1 border border-slate-300 rounded text-center font-semibold text-slate-800 focus:outline-2 focus:outline-blue-600"
                          />
                        </td>
                        <td className="p-3.5">
                          <input
                            type="number"
                            step="0.1"
                            value={a.p2}
                            onChange={(e) =>
                              handleNotaChange(a.id, "p2", e.target.value)
                            }
                            className="w-16 px-2 py-1 border border-slate-300 rounded text-center font-semibold text-slate-800 focus:outline-2 focus:outline-blue-600"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-blue-600">
                          {media.toFixed(1)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {(diarioAba === "conteudo" || diarioAba === "avaliacoes") && (
            <Card className="p-6 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-500">
              Módulo de {diarioAba.toUpperCase()} pronto para inserção de
              tópicos e registro de avaliações da turma {turmaSelecionada}.
            </Card>
          )}
        </div>
      )}

      {/* 3. QUADRO DE HORÁRIOS */}
      {selectedMenu === "horarios" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Quadro de Horários Docente
            </h1>
            <p className="text-xs text-slate-500">
              Grade de aulas alocadas para o semestre 2026.1
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Segunda-feira · 19:00 - 20:40
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Arquitetura de Sistemas Web (INF-402)
              </h3>
              <span className="text-xs text-slate-500 block">
                Sala 304 · Bloco B
              </span>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Quarta-feira · 20:40 - 22:20
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Engenharia de Software (INF-301)
              </h3>
              <span className="text-xs text-slate-500 block">
                Laboratório 02 · Bloco C
              </span>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Sexta-feira · 19:00 - 20:40
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Algoritmos e Estruturas II (INF-204)
              </h3>
              <span className="text-xs text-slate-500 block">
                Sala 102 · Bloco A
              </span>
            </Card>
          </div>
        </div>
      )}

      {/* 4. PLANOS DE AULA / CONTEÚDO */}
      {selectedMenu === "planos" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Planos de Aula & Ementas
            </h1>
            <p className="text-xs text-slate-500">
              Elaboração de planos pedagógicos e materiais de apoio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Plano Aprovado
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Ementa INF-402: Arquitetura Web Avançada
              </h3>
              <p className="text-xs text-slate-600">
                12 módulos assíncronos · 4 projetos práticos em React/TS ·
                Avaliação por pares.
              </p>
              <Button size="sm" variant="outline" className="text-xs">
                Visualizar Ementa Completa
              </Button>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Em Elaboração
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Material de Apoio: Módulo de Microservices
              </h3>
              <p className="text-xs text-slate-600">
                Artigos complementares, roteiro de laboratório e código de
                referência.
              </p>
              <Button size="sm" variant="primary" className="text-xs">
                Editar Plano de Ensino
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* 5. CENTRAL DO PROFESSOR */}
      {selectedMenu === "central" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Central do Professor
            </h1>
            <p className="text-xs text-slate-500">
              Atendimento a alunos e acompanhamento de ocorrências
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-xs font-semibold text-blue-600">
                Mensagens de Alunos
              </span>
              <strong className="text-2xl font-bold text-slate-900 block">
                4 Não Lidas
              </strong>
              <span className="text-xs text-slate-500 block">
                Dúvidas sobre o trabalho prático de INF-402
              </span>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-xs font-semibold text-amber-600">
                Ocorrências Pedagógicas
              </span>
              <strong className="text-2xl font-bold text-slate-900 block">
                2 Em Aberto
              </strong>
              <span className="text-xs text-slate-500 block">
                Solicitação de segunda chamada registrada
              </span>
            </Card>

            <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-card space-y-2">
              <span className="text-xs font-semibold text-emerald-600">
                Tutoria Ativa
              </span>
              <strong className="text-2xl font-bold text-slate-900 block">
                98% Resposta
              </strong>
              <span className="text-xs text-slate-500 block">
                Tempo médio de resposta: 4h
              </span>
            </Card>
          </div>
        </div>
      )}

      {/* 6. SECRETARIA DOCENTE */}
      {selectedMenu === "secretaria" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Secretaria Docente
            </h1>
            <p className="text-xs text-slate-500">
              Requerimentos administrativos e solicitações de vínculo
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-card">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">Solicitação / Protocolo</th>
                  <th className="p-3.5">Data</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5">
                    <strong className="block text-slate-900">
                      Declaração de Vínculo Docente
                    </strong>
                    <span className="text-[10px] text-slate-400 font-mono">
                      PROT-2026-881
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">10/Set/2026</td>
                  <td className="p-3.5 font-bold text-emerald-600">
                    Concluído
                  </td>
                  <td className="p-3.5 text-right">
                    <Button size="sm" variant="outline" className="text-xs">
                      Baixar PDF
                    </Button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="p-3.5">
                    <strong className="block text-slate-900">
                      Requerimento de Férias Acadêmicas
                    </strong>
                    <span className="text-[10px] text-slate-400 font-mono">
                      PROT-2026-902
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">18/Set/2026</td>
                  <td className="p-3.5 font-bold text-amber-600">Em Análise</td>
                  <td className="p-3.5 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      disabled
                    >
                      Processando
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. ARQUIVOS & DOCUMENTOS */}
      {selectedMenu === "documentos" && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-xl font-bold text-slate-900">
              Repositório de Arquivos & Documentos
            </h1>
            <p className="text-xs text-slate-500">
              Modelos de prova, regulamentos institucionais e atas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-card flex items-center justify-between">
              <div>
                <strong className="text-xs text-slate-900 block">
                  Modelo Oficial de Prova 2026.1
                </strong>
                <span className="text-[10px] text-slate-500">
                  Formato .DOCX · 140 KB
                </span>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Download
              </Button>
            </Card>

            <Card className="p-4 bg-white border border-slate-200 rounded-xl shadow-card flex items-center justify-between">
              <div>
                <strong className="text-xs text-slate-900 block">
                  Regulamento do Ensino Assíncrono
                </strong>
                <span className="text-[10px] text-slate-500">
                  Formato .PDF · 1.2 MB
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
