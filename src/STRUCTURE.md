# Estrutura do Projeto

Organização das pastas em `src/` para manter o código escalável e fácil de navegar.

## Visão geral

```
src/
├── components/       # Componentes de UI
│   ├── shared/       # Genéricos (ErrorBoundary, PageFallback, etc.)
│   └── users/        # Componentes da feature "usuários"
├── contexts/         # React Context (estado global, tema)
├── hooks/            # Hooks reutilizáveis
├── pages/            # Páginas da aplicação (uma por rota/tela)
├── routes/           # Definição de rotas lazy (React.lazy + code-split)
├── schemas/          # Schemas de validação (ex.: Yup)
├── services/         # Chamadas à API e instância HTTP
├── theme/            # Configuração do tema MUI
└── types/            # Tipos e interfaces TypeScript
```

As **stories** do Storybook ficam coladas aos componentes: `*.stories.tsx` na mesma pasta do componente (ex.: `components/shared/ErrorBoundary.stories.tsx`).

## Detalhes

| Pasta | Uso |
|-------|-----|
| **components/shared** | Componentes que não dependem de um domínio (ex.: ErrorBoundary). |
| **components/users** | Tudo relacionado à tela de usuários: tabela, toolbar, diálogos, estados de loading/erro. Exportados via `index.ts` (barrel). |
| **contexts** | Providers e hooks de contexto (Theme, Users). |
| **hooks** | Hooks compartilhados (ex.: useFilteredUsers). |
| **pages** | Um arquivo por rota/página; orquestra componentes e hooks. |
| **routes** | Páginas lazy (React.lazy); centraliza code-splitting para manter o App enxuto. |
| **schemas** | Validação de formulários (Yup, Zod, etc.). |
| **services** | Cliente HTTP (api.ts) e funções que chamam a API (users.ts). |
| **theme** | Definição do tema MUI (claro/escuro). |
| **types** | Tipos globais (User, etc.). |

## Convenções

- **Barrel exports**: pastas como `components/users` exportam via `index.ts` para imports mais limpos.
- **Agrupamento por domínio**: componentes da mesma feature ficam juntos (ex.: `components/users`).
- **Shared vs feature**: o que for genérico fica em `shared`; o que for específico de uma feature em subpastas nomeadas.
