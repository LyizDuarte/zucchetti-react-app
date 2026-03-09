# Painel de Usuários — Zucchetti Challenge

Aplicação React para gerenciamento de usuários (listagem, cadastro, edição e exclusão), desenvolvida como solução ao desafio técnico de React da Zucchetti.

---

## Conteúdo

- [Requisitos do anúncio](#requisitos-do-anúncio)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Storybook](#storybook)
- [CI/CD e deploy](#cicd-e-deploy)
- [Deploy](#deploy)

---

## Requisitos do anúncio

| Requisito | Atendido |
|-----------|----------|
| **React** | Sim |
| **TypeScript** | Sim |
| **Redux Toolkit ou Context API** | Sim — Context API (UsersContext, ThemeContext) |
| **API REST** | Sim — [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) + Axios |
| **Material-UI (MUI)** | Sim |
| **ESLint** | Sim |
| **Prettier** | Sim |
| **Jest** | Sim |
| **React Testing Library** | Sim |
| **Listagem de usuários** | Sim |
| **Cadastro de usuário** | Sim |
| **Edição de usuário** | Sim |
| **Exclusão de usuário** | Sim (com confirmação) |
| **React Query** (diferencial) | Sim |
| **Dark mode** (diferencial) | Sim — Context API + persistência em `localStorage` |
| **Error Boundary** (diferencial) | Sim — componente customizado com fallback de UI |

---

## Tecnologias utilizadas

- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **Material-UI (MUI)** — componentes e tema (claro/escuro)
- **React Query (TanStack Query)** — cache, fetching e mutações da lista de usuários
- **React Hook Form** + **Yup** — formulários e validação
- **Axios** — cliente HTTP
- **Jest** + **React Testing Library** — testes automatizados
- **ESLint** + **Prettier** — lint e formatação
- **Storybook** — documentação e desenvolvimento de componentes

---

## Funcionalidades

- **Listagem** de usuários em tabela (Nome, E-mail, Status, Ações)
- **Filtro** por nome e **ordenação** (A→Z / Z→A)
- **Cadastro** de novo usuário (modal com validação)
- **Edição** de usuário existente
- **Exclusão** com diálogo de confirmação
- **Dark mode** com toggle e persistência da preferência
- **Error Boundary** com mensagem e botão “Tentar novamente”
- **Code-splitting** da página principal com `React.lazy` + `Suspense`
- **Acessibilidade**: labels, ARIA, foco em diálogos, navegação por teclado

---

## Instalação e execução

### Pré-requisitos

- **Node.js** 20+ (recomendado LTS)
- **npm** (ou yarn/pnpm)

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/LyizDuarte/zucchetti-react-app
   cd zucchetti-challenge
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em **http://localhost:5173**.

4. **(Opcional) Build para produção**

   ```bash
   npm run build
   npm run preview
   ```

   O build fica em `dist/`; `preview` sobe um servidor local para testar.

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Sobe o servidor de desenvolvimento (Vite) |
| `npm run build` | Gera o build de produção (`dist/`) |
| `npm run preview` | Servidor local para testar o build |
| `npm run lint` | Executa o ESLint |
| `npm test` | Executa os testes (Jest) |
| `npm run storybook` | Abre o Storybook em http://localhost:6006 |
| `npm run build-storybook` | Gera o build estático do Storybook |

---

## Estrutura do projeto

```
src/
├── components/          # Componentes de UI
│   ├── shared/          # Genéricos (ErrorBoundary, PageFallback)
│   └── users/            # Feature usuários (tabela, toolbar, diálogos, estados)
├── contexts/             # React Context (Theme, Users)
├── hooks/                # Hooks reutilizáveis (ex.: useFilteredUsers)
├── pages/                # Páginas (ex.: UsersPage)
├── routes/               # Rotas lazy (React.lazy + code-split)
├── schemas/              # Schemas de validação (Yup)
├── services/             # API (Axios, users)
├── theme/                # Tema MUI (claro/escuro)
└── types/                # Tipos TypeScript (User, etc.)
```

As **stories** do Storybook ficam ao lado dos componentes (`*.stories.tsx`).  
Detalhes em [`src/STRUCTURE.md`](src/STRUCTURE.md).

---

## Testes

Os testes cobrem:

- **UsersContext** — criação, edição e exclusão de usuários (com React Query)
- **ThemeContext** — modo claro/escuro, toggle e persistência
- **ErrorBoundary** — renderização normal e exibição do fallback em erro
- **UsersPage** — listagem, cadastro, edição, exclusão e toggle de tema

Para rodar:

```bash
npm test
```

---

## Storybook

Componentes documentados em stories:

- **Shared**: ErrorBoundary, PageFallback
- **Users**: DeleteUserDialog, UserFormDialog, UsersTable, UsersToolbar, UsersPageHeader, UsersLoadingState, UsersErrorState

```bash
npm run storybook
```

---

## CI/CD e deploy

- **GitHub Actions** (`.github/workflows/ci.yml`):
  - Em **push** e **pull request** para `main`/`master`: lint, testes e build.
  - Em **push** para `main`/`master`: deploy na Vercel (produção), usando o build gerado no CI.


---

## Deploy

**Aplicação em produção:**

🔗 **[https://zucchetti-react-app.vercel.app/](https://zucchetti-react-app.vercel.app/)**

---

