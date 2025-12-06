# Super Painel de Tarefas

Aplicação fullstack para gerenciamento de tarefas com autenticação via GitHub.

## 🛠 Tecnologias

### Frontend
- Next.js 15
- React 19
- TypeScript
- TailwindCSS

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Passport (JWT + GitHub OAuth)

### Infraestrutura
- Docker (PostgreSQL)

## ✨ Funcionalidades

- ✅ Adicionar tarefas com prioridade (Urgente ⚡, Alta 🔴, Média 🟡, Baixa 🟢)
- ✅ Marcar tarefas como concluídas
- ✅ Editar tarefas (clique em Editar, altere e pressione Enter ou clique fora)
- ✅ Remover tarefas (apenas não concluídas)
- ✅ Filtrar por status (Todas, Pendentes, Concluídas)
- ✅ Filtrar por prioridade
- ✅ Ordenação automática por prioridade
- ✅ Paginação
- ✅ Design responsivo

## ⭐ Bônus Implementados

- ✅ **Bônus 1:** Autenticação com GitHub OAuth
- ✅ **Bônus 3:** Paginação, ordenação e filtros no backend

## 🏃‍♂️ Como Executar

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Conta no GitHub (para criar OAuth App)

### 1. Clone o repositório

```bash
git clone https://github. com/Augusto240/desafio_smv.git
cd desafio_smv
```

### 2.  Suba o banco de dados

```bash
docker-compose up -d
```

### 3. Configure o Backend

```bash
cd backend
npm install
```

Crie o arquivo `. env` baseado no `. env.example`:

```env
DATABASE_URL="postgresql://admin:admin123@localhost:5432/tarefas_db? schema=public"
GITHUB_CLIENT_ID="seu_client_id"
GITHUB_CLIENT_SECRET="seu_client_secret"
JWT_SECRET="sua_chave_secreta"
FRONTEND_URL="http://localhost:3000"
```

Para obter o `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET`:
1. Acesse https://github.com/settings/developers
2. Clique em "New OAuth App"
3.  Preencha:
   - Application name: `Super Painel de Tarefas`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3001/auth/github/callback`
4. Copie o Client ID e gere um Client Secret

Execute as migrations e inicie o servidor:

```bash
npx prisma migrate dev
npm run start:dev
```

O backend estará rodando em `http://localhost:3001`

### 4.  Configure o Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

### 5.  Acesse a aplicação

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
desafio_smv/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Autenticação (GitHub OAuth + JWT)
│   │   ├── prisma/         # Serviço do Prisma
│   │   └── tasks/          # CRUD de tarefas
│   └── prisma/
│       └── schema. prisma   # Modelos do banco
├── frontend/               # App Next.js
│   └── src/
│       ├── app/            # Páginas (App Router)
│       ├── components/     # Componentes React
│       ├── services/       # Comunicação com API
│       └── types/          # Tipos TypeScript
└── docker-compose.yml      # PostgreSQL
```

## 🔐 Autenticação

A aplicação utiliza OAuth2 com GitHub.  Ao fazer login:
1. O usuário é redirecionado para o GitHub
2.  Após autorizar, retorna com um token JWT
3.  Cada usuário tem suas próprias tarefas
