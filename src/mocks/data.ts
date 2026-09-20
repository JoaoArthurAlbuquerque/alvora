// src/mocks/data.ts
import {
  User,
  NotaItem,
  FrequenciaAssincrona,
  AlertaRisco,
  FAQItem,
} from "../types";

export const MOCK_USERS: User[] = [
  {
    id: "usr-1",
    name: "Lucas Mendes Albuquerque",
    email: "lucas.mendes@alvora.edu.br",
    matricula: "20261001",
    role: "ALUNO",
    cursoOuDepartamento: "Análise e Desenvolvimento de Sistemas",
  },
  {
    id: "usr-2",
    name: "Dra. Helena Vasconcelos",
    email: "helena.vasconcelos@alvora.edu.br",
    matricula: "P202688",
    role: "PROFESSOR",
    cursoOuDepartamento: "Faculdade de Tecnologia e Computação",
  },
  {
    id: "usr-3",
    name: "Roberto Almeida",
    email: "roberto.almeida@alvora.edu.br",
    matricula: "G202601",
    role: "GESTOR",
    cursoOuDepartamento: "Coordenação Geral de Ensino Assíncrono",
  },
];

export const MOCK_NOTAS_ALUNO: NotaItem[] = [
  {
    id: "nt-1",
    disciplina: "Algoritmos e Estruturas de Dados II",
    codigo: "INF-204",
    p1: 8.5,
    p2: 9.0,
    trabalho: 9.5,
    media: 8.9,
    status: "Aprovado",
  },
  {
    id: "nt-2",
    disciplina: "Engenharia de Software Assíncrona",
    codigo: "INF-301",
    p1: 7.0,
    p2: 6.5,
    trabalho: 8.0,
    media: 7.1,
    status: "Em Andamento",
  },
  {
    id: "nt-3",
    disciplina: "Arquitetura de Sistemas Web Avançada",
    codigo: "INF-402",
    p1: 5.5,
    p2: 4.0,
    trabalho: 6.0,
    media: 5.0,
    status: "Em Risco",
  },
];

export const MOCK_FREQUENCIA_ALUNO: FrequenciaAssincrona[] = [
  {
    disciplinaId: "INF-204",
    nomeDisciplina: "Algoritmos e Estruturas de Dados II",
    percentualPresenca: 96,
    atividadesEntregues: 12,
    totalAtividades: 12,
    dataUltimoAcesso: "Hoje às 08:30",
    statusIa: "Auditado e Confirmado",
  },
  {
    disciplinaId: "INF-301",
    nomeDisciplina: "Engenharia de Software Assíncrona",
    percentualPresenca: 88,
    atividadesEntregues: 9,
    totalAtividades: 10,
    dataUltimoAcesso: "Ontem às 19:15",
    statusIa: "Auditado e Confirmado",
  },
  {
    disciplinaId: "INF-402",
    nomeDisciplina: "Arquitetura de Sistemas Web Avançada",
    percentualPresenca: 64,
    atividadesEntregues: 4,
    totalAtividades: 8,
    dataUltimoAcesso: "Há 6 dias",
    statusIa: "Pendente de Validação",
  },
];

export const MOCK_ALERTAS_RISCO: AlertaRisco[] = [
  {
    id: "alt-101",
    alunoId: "usr-901",
    alunoNome: "Gabriel Souza Lima",
    matricula: "20261044",
    turma: "INF-402 (Turma A)",
    nivelRisco: "ALTO",
    motivoPrincipal:
      "Ausência de entregas assíncronas há 14 dias + Média abaixo de 4.0",
    diasSemAcesso: 14,
    mediaAtual: 3.2,
    acaoRecomendada: "Disparar convocação de tutoria pedagógica individual",
  },
  {
    id: "alt-102",
    alunoId: "usr-902",
    alunoNome: "Mariana Duarte Costa",
    matricula: "20261088",
    turma: "INF-301 (Turma B)",
    nivelRisco: "MEDIO",
    motivoPrincipal: "Queda brusca na participação dos fóruns práticos",
    diasSemAcesso: 7,
    mediaAtual: 5.8,
    acaoRecomendada: "Enviar lembrete interativo de entrega de projeto",
  },
  {
    id: "alt-103",
    alunoId: "usr-903",
    alunoNome: "Caio Fernando Rocha",
    matricula: "20261099",
    turma: "INF-204 (Turma A)",
    nivelRisco: "BAIXO",
    motivoPrincipal: "Pequeno atraso em 1 questionário secundário",
    diasSemAcesso: 3,
    mediaAtual: 7.4,
    acaoRecomendada: "Acompanhar próxima entrega quinzenal",
  },
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    pergunta:
      "Como funciona o cálculo de frequência no ensino assíncrono do Alvora?",
    resposta:
      "A frequência não é medida por horas logadas, mas pela entrega pontual e engajamento ativo nos artefatos de aprendizagem (projetos, fóruns e questionários). Nosso modelo analisa a constância e gera uma sugestão auditável.",
    categoria: "Frequência Assíncrona",
    perfisPermitidos: ["ALUNO", "PROFESSOR", "GESTOR"],
  },
  {
    id: "faq-2",
    pergunta: "Como solicitar revisão de nota ou reenvio de atividade?",
    resposta:
      'Acesse o Portal do Aluno > seção Notas > clique em "Solicitar Revisão" na disciplina correspondente. O professor receberá uma notificação direta com seu parecer fundamentado.',
    categoria: "Avaliações",
    perfisPermitidos: ["ALUNO"],
  },
  {
    id: "faq-3",
    pergunta:
      "Como o professor valida ou ajusta a presença calculada automaticamente?",
    resposta:
      'No Portal do Professor > Diário de Turma, clique no ícone "Selo IA · Auditado" ao lado do aluno. Você pode sobrescrever manualmente qualquer percentual justificando no diário de classe.',
    categoria: "Diário de Classe",
    perfisPermitidos: ["PROFESSOR", "GESTOR"],
  },
  {
    id: "faq-4",
    pergunta: "Como exportar os relatórios institucionais de risco de evasão?",
    resposta:
      "No Painel do Gestor > Relatórios Executivos, selecione o período letivo e o filtro de risco desejado. O relatório pode ser baixado em formato de planilha auditável ou documento PDF assinado.",
    categoria: "Gestão & Auditoria",
    perfisPermitidos: ["GESTOR"],
  },
];
