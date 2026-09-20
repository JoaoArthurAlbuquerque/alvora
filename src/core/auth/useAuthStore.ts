// src/core/auth/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "../../types";
import { MOCK_USERS } from "../../mocks/data";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginByMatrícula: (matricula: string, pass: string) => boolean;
  loginByMagicLink: (email: string) => boolean;
  loginByCode: (code: string) => boolean;
  switchRoleForDemo: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_USERS[0], // Padrão inicial: Aluno
      isAuthenticated: true,

      loginByMatrícula: (matricula: string) => {
        const found = MOCK_USERS.find((u) => u.matricula === matricula.trim());
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        return false;
      },

      loginByMagicLink: (email: string) => {
        const found = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return true;
        }
        return false;
      },

      loginByCode: (code: string) => {
        if (code === "2026") {
          set({ user: MOCK_USERS[0], isAuthenticated: true });
          return true;
        }
        return false;
      },

      switchRoleForDemo: (role: UserRole) => {
        const found = MOCK_USERS.find((u) => u.role === role);
        if (found) {
          set({ user: found, isAuthenticated: true });
        }
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "alvora-auth-session-v3",
    },
  ),
);
