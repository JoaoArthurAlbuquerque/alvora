// src/types/index.ts

export type UserRole = "ALUNO" | "PROFESSOR" | "GESTOR";

export type AlunoMenuOption =
  | "mural"
  | "grade"
  | "horarios"
  | "central"
  | "secretaria"
  | "documentos";

export type ProfessorMenuOption =
  | "mural"
  | "diario"
  | "horarios"
  | "planos"
  | "central"
  | "secretaria"
  | "documentos";

export type GestorMenuOption =
  | "mural"
  | "academica"
  | "horarios"
  | "analytics"
  | "aprovacoes"
  | "secretaria"
  | "documentos";

export type CentralTabOption =
  | "desempenho"
  | "faltas"
  | "notas"
  | "ocorrencias"
  | "plano";

export type DiarioTabOption =
  | "frequencia"
  | "notas"
  | "conteudo"
  | "avaliacoes";

export interface User {
  id: string;
  name: string;
  email: string;
  matricula: string;
  role: UserRole;
  avatarUrl?: string;
  cursoOuDepartamento: string;
}

export interface SolicitacaoAprovacao {
  id: string;
  requerente: string;
  tipoRequerente: "Aluno" | "Professor";
  tipo:
    | "Trancamento"
    | "Dispensa de Disciplina"
    | "Recurso de Nota"
    | "Abono de Faltas";
  dataSolicitacao: string;
  status: "Pendente" | "Deferido" | "Indeferido";
  justificativa: string;
}

export interface TurmaAcademica {
  codigo: string;
  nomeDisciplina: string;
  curso: string;
  vagasOcupadas: number;
  totalVagas: number;
  professorAtribuido: string;
  status: "Aberta" | "Fechada" | "Em Formação";
}
