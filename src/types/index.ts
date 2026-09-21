export type UserRole = "ALUNO" | "PROFESSOR" | "GESTOR";

export type RiskLevel = "BAIXO" | "MEDIO" | "ALTO";

export type AttendanceStatus = "PRESENTE" | "FALTA" | "JUSTIFICADA";

export interface User {
  id: string;
  name: string;
  email: string;
  matricula: string;
  role: UserRole;
  avatarUrl?: string;
  curso?: string;
  polo?: string;
}

export interface StudentAttendanceRow {
  id: string;
  matricula: string;
  nome: string;
  frequenciaAcumulada: number;
  statusHoje: AttendanceStatus;
  observacao: string;
}

export interface Discipline {
  id: string;
  code: string;
  name: string;
  chTotal: number;
  frequenciaAsync: number;
  notaAtual: number;
  statusAprovacao: "APROVADO" | "EM_ANDAMENTO" | "EM_RISCO";
  ementaCapitulo: string;
}

export interface TaskDeadline {
  id: string;
  disciplineName: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
  status: "PENDENTE" | "ENTREGUE" | "ATRASADO";
  weight: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  matricula: string;
  frequenciaAsyncPercent: number;
  mediaParcial: number;
  riskLevel: RiskLevel;
  riskScore: number;
  lastAccessDays: number;
  riskReason: string;
  curso: string;
}

export interface GradeEntry {
  studentId: string;
  studentName: string;
  matricula: string;
  av1: number;
  av2: number;
  trabalhos: number;
  mediaCalculada: number;
  status: "SALVO" | "ALTERADO";
}

export interface AttendanceAuditLog {
  id: string;
  timestamp: string;
  professorName: string;
  studentName: string;
  discipline: string;
  originalPercent: number;
  overridePercent: number;
  justification: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "AULA" | "AVALIACAO" | "ENTREGA" | "INSTITUCIONAL";
  discipline?: string;
}

export interface ChatMessage {
  id: string;
  sender: "USER" | "RAG_ASSISTANT";
  text: string;
  timestamp: string;
  sourceChapter?: string;
}
