import { create } from "zustand";
import { PapelUsuario, Usuario } from "../../types";

interface AuthState {
  autenticado: boolean;
  usuario: Usuario | null;
  login: (papel: PapelUsuario) => void;
  logout: () => void;
}

const mockUsuarios: Record<PapelUsuario, Usuario> = {
  aluno: {
    id: "usr-1",
    nome: "João Arthur Albuquerque",
    email: "joao.albuquerque@alvora.edu.br",
    papel: "aluno",
    turmaOuCargo: "Sistemas de Informação - 4º Período",
  },
  professor: {
    id: "usr-2",
    nome: "Prof. Carlos Eduardo",
    email: "carlos.eduardo@alvora.edu.br",
    papel: "professor",
    turmaOuCargo: "Docente de Algoritmos e Estrutura de Dados",
  },
  gestor: {
    id: "usr-3",
    nome: "Dra. Maria Helena",
    email: "maria.helena@alvora.edu.br",
    papel: "gestor",
    turmaOuCargo: "Coordenação Pedagógica Geral",
  },
};

export const useAuthStore = create<AuthState>((set) => ({
  autenticado: false,
  usuario: null,
  login: (papel: PapelUsuario) => {
    set({
      autenticado: true,
      usuario: mockUsuarios[papel],
    });
  },
  logout: () => {
    set({
      autenticado: false,
      usuario: null,
    });
  },
}));
