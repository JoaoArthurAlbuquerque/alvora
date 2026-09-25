export type PapelUsuario = "aluno" | "professor" | "gestor";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  papel: PapelUsuario;
  avatarUrl?: string;
  turmaOuCargo: string;
}

export interface NotaOuFrequencia {
  id: string;
  alunoNome: string;
  disciplina: string;
  nota: number;
  frequencia: number;
}
