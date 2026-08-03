# ⚡ Eletrostruct

Projeto de e-commerce moderno desenvolvido como projeto prático para a Empresa Júnior: **Struct**.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)
- **Banco de Dados & ORM:** [SQLite](https://www.sqlite.org/) + [Prisma ORM](https://www.prisma.io/)
- **Autenticação:** [Auth.js / NextAuth.js](https://authjs.dev/) (Google Provider)

---

## 📦 Pré-requisitos

Antes de começar, garante que você possui instalado em sua máquina:
- [Node.js](https://nodejs.org/) 
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)
---

## ⚙️ Passo a Passo para Instalação e Execução

### 1. Clonar o repositório
Abra o terminal no diretório desejado e faça o clone do projeto:
```bash
git clone https://github.com/avlis-mat/Eletrostruct.git
cd eletrostruct
``` 

### 2. Instalar as dependências
Execute o pnpm para baixar todas as dependências
```bash
pnpm install
``` 

### 3. Configurar as Variáveis de Ambiente (.env)
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo de exemplo:
```bash
# Conexão com o Banco de Dados SQLite
DATABASE_URL="file:./dev.db"

# Segredo do Auth.js (Gere rodando: npx auth secret)
AUTH_SECRET="sua_chave_secreta_aqui"

# Credenciais de Autenticação do Google Cloud Console
AUTH_GOOGLE_ID="seu_client_id_do_google"
AUTH_GOOGLE_SECRET="seu_client_secret_do_google"
``` 

### 4. Configurar e Sincronizar o Banco de Dados
Com o arquivo .env configurado, crie as tabelas no SQLite local:
```bash
pnpm db:push
``` 


### 5. Semear o Banco de Dados (Seed)
Para popular o banco com dados
```bash
pnpm db:seed
``` 

### 6. Executar 
Inicie a aplicação localmente:
```bash
pnpm dev

# Abra o seu navegador e acesse: http://localhost:3000
``` 
