// PROJECT_LOG.md

# Registro de Continuidade e Arquitetura — Alvora v3

## Stack Decidida

- **Scaffold**: Vite 6+ (React + TypeScript SWC)
- **Estilização**: Tailwind CSS v4 (CSS-first via `@theme` no `src/index.css`)
- **Tipografia**: `Fraunces` (serifada display) + `Work Sans` (corpo de alta legibilidade) via `@fontsource`
- **Estado Global**: Zustand (Persistência no `localStorage` para sessão RBAC)
- **Estado Assíncrono**: TanStack Query v5 para fixtures/mocks com latência simulada
- **Primitivas UI Acessíveis**: Radix UI (Dialog, Tabs, Dropdown Menu) + Lucide React (ícones)

## Diretrizes de Identidade Visual (Amanhecer)

- Fundo global neutro quente `#FAF7F2` (nunca branco puro corporativo)
- Cabeçalho horizonte com micro-gradiente sutil azul-profundo (`#0B3D66`)
- Badges de auditoria e cálculo por IA com linguagem direta ("Calculado por IA · Auditado")
- Selos de risco com indicador visual triplo (cor + ícone + rótulo textual em contraste AA)

## Decisões Tomadas

- 2026-09-20: Criação do scaffolding oficial Vite + React TS.
- 2026-09-20: Implementação do RBAC em 3 perfis (Aluno, Professor, Gestor) com login funcional de 3 rotas (Magic Link, Matrícula+Senha, Código Único).
- 2026-09-20: Central de Dúvidas Transversal multiperfil integrada a todos os portais.
- 2026-09-20: Autosave reativo no lançamento de notas do Professor mantido via `localStorage`.

## O que já foi concluído

- [x] Tokens de design da marca Alvora em CSS puro com `@theme`
- [x] Login com 3 personas mockadas e persistência real
- [x] Portal do Aluno com Notas, Frequência Assíncrona e Assistente Pedagógico
- [x] Portal do Professor com autosave de notas, auditoria de presença por IA e alertas de evasão
- [x] Portal do Gestor com Dashboard Executivo, Ranking de Risco e Auditoria
- [x] Central de Dúvidas Frequentes da Plataforma (Transversal)
