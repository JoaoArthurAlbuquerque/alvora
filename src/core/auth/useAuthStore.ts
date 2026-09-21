// src/core/auth/useAuthStore.ts
import { create } from "zustand";
import { User, UserRole } from "../../types";
import { mockUsers } from "../../mocks/data";

interface AuthState {
  currentUser: User;
  activeRole: UserRole;
  isRAGDrawerOpen: boolean;
  isCalendarModalOpen: boolean;
  setRole: (role: UserRole) => void;
  toggleRAGDrawer: (open?: boolean) => void;
  toggleCalendarModal: (open?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: mockUsers[0],
  activeRole: "ALUNO",
  isRAGDrawerOpen: false,
  isCalendarModalOpen: false,

  setRole: (role: UserRole) => {
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

  logout: () => {
    set({ activeRole: "ALUNO", currentUser: mockUsers[0] });
  },
}));
