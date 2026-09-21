import { create } from "zustand";
import { User, UserRole } from "../../types";
import { mockUsers } from "../../mocks/data";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  isRAGDrawerOpen: boolean;
  isCalendarModalOpen: boolean;
  login: (credentials: {
    matricula?: string;
    code?: string;
    role?: UserRole;
  }) => boolean;
  logout: () => void;
  switchRoleDev: (role: UserRole) => void;
  toggleRAGDrawer: (open?: boolean) => void;
  toggleCalendarModal: (open?: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  activeRole: "ALUNO",
  isRAGDrawerOpen: false,
  isCalendarModalOpen: false,

  login: ({ matricula, code, role }) => {
    let matchedUser: User | undefined;

    if (matricula) {
      matchedUser = mockUsers.find((u) => u.matricula === matricula);
    } else if (role) {
      matchedUser = mockUsers.find((u) => u.role === role);
    } else if (code === "2026") {
      matchedUser = mockUsers[0]; // Retorna aluno por padrão com código único
    }

    if (matchedUser) {
      set({
        currentUser: matchedUser,
        isAuthenticated: true,
        activeRole: matchedUser.role,
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({
      currentUser: null,
      isAuthenticated: false,
      isRAGDrawerOpen: false,
      isCalendarModalOpen: false,
    });
  },

  switchRoleDev: (role: UserRole) => {
    const matchedUser = mockUsers.find((u) => u.role === role) || {
      ...mockUsers[0],
      role,
    };
    set({
      activeRole: role,
      currentUser: matchedUser,
    });
  },

  toggleRAGDrawer: (open) =>
    set((state) => ({
      isRAGDrawerOpen: open !== undefined ? open : !state.isRAGDrawerOpen,
    })),

  toggleCalendarModal: (open) =>
    set((state) => ({
      isCalendarModalOpen:
        open !== undefined ? open : !state.isCalendarModalOpen,
    })),
}));
