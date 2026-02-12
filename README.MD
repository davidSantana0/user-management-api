# API de Gerenciamento de Usuários

Uma API RESTful completa para gerenciamento de usuários, construída com Node.js, Express, MongoDB e TypeScript. Inclui autenticação baseada em JWT, controle de acesso por função (admin/usuário), hashing de senhas e containerização com Docker.

Este projeto foi projetado para ser um ponto de partida robusto e seguro para aplicações que necessitam de um sistema de autenticação e gerenciamento de usuários. O código é escrito com foco em boas práticas, clareza e manutenibilidade.

## ✨ Visão Geral dos Recursos

- **CRUD completo de usuários:** Crie, leia, atualize e delete usuários.
- **Autenticação com JWT:** Geração e validação de JSON Web Tokens para proteger rotas.
- **Controle de Acesso Baseado em Função (RBAC):** Distinção entre usuários comuns e administradores, com rotas e operações restritas.
- **Hashing de Senhas:** As senhas são armazenadas de forma segura usando o algoritmo bcrypt.
- **Validação de Dados:** Utilização de DTOs (Data Transfer Objects) para validar e tipar os dados de entrada.
- **Estrutura de Projeto Escalável:** O código é organizado em módulos (controllers, services, routes, etc.) para facilitar a manutenção e o crescimento do projeto.
- **Containerização com Docker:** Inclui um `Dockerfile` para criar uma imagem da aplicação e executá-la em um ambiente isolado e consistente.
- **Qualidade de Código:** Configurado com ESLint e Prettier para garantir um padrão de código limpo e consistente.

## 🚀 Começando

Estas instruções guiarão você na configuração e execução do projeto em seu ambiente de desenvolvimento local.

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [Docker](https://www.docker.com/products/docker-desktop) (opcional, para execução via container)
- [Git](https://git-scm.com/)

Você também precisará de uma instância do [MongoDB](https://www.mongodb.com/try/download/community) em execução. Você pode instalá-lo localmente ou usar um serviço de nuvem como o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 🔧 Instalação

Siga estes passos para configurar o projeto:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/davidSantana0/user-management-api.git
   cd user-management-api
   ```

2. **Instale as dependências:**

   Use o npm para instalar todas as dependências listadas no arquivo `package.json`.

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo chamado `.env` na raiz do projeto. Este arquivo armazenará suas variáveis de ambiente sensíveis. Copie o conteúdo do arquivo `.env.example` (se houver) ou adicione as seguintes variáveis:

   ```env
   # Porta em que o servidor será executado
   PORT=3000

   # Credenciais e URL do seu banco de dados MongoDB
   DB_USER=seu_usuario_do_banco
   DB_PASSWORD=sua_senha_do_banco
   MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/sua_base_de_dados

   # Chave secreta para assinar os tokens JWT
   JWT_SECRET=sua_chave_secreta_super_segura
   ```

   **Importante:** Substitua os valores de exemplo pelas suas próprias credenciais e informações. Nunca exponha suas chaves secretas ou senhas em repositórios públicos.

### ▶️ Executando a Aplicação

#### Localmente

1. **Compile o código TypeScript:**

   Este comando transpila o código TypeScript (`.ts`) para JavaScript (`.js`), que o Node.js pode executar. O resultado será salvo na pasta `dist`.

   ```bash
   npm run build
   ```

2. **Inicie o servidor:**

   Este comando inicia o servidor Node.js, que começará a ouvir por requisições na porta que você definiu no arquivo `.env`.

   ```bash
   npm run start
   ```

   Se tudo correr bem, você verá uma mensagem no console indicando que o servidor está rodando. A API estará disponível em `http://localhost:3000`.

#### Com Docker

Se você preferir usar o Docker para executar a aplicação em um container, siga estes passos:

1. **Construa a imagem Docker:**

   Este comando lê o `Dockerfile` e constrói uma imagem da sua aplicação, empacotando todo o código e as dependências.

   ```bash
   docker build -t auth-users-api-app .
   ```

2. **Execute o container:**

   Este comando cria e inicia um container a partir da imagem que você acabou de construir. A flag `-p 3000:3000` mapeia a porta 3000 do container para a porta 3000 da sua máquina local.

   ```bash
   docker run -p 3000:3000 auth-users-api-app
   ```

   A API estará acessível em `http://localhost:3000`, da mesma forma que na execução local.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e ferramentas:

- **Node.js 20:** Ambiente de execução JavaScript no lado do servidor.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Express.js:** Framework web minimalista e flexível para Node.js.
- **MongoDB:** Banco de dados NoSQL orientado a documentos.
- **Mongoose:** ODM (Object Data Modeling) para MongoDB e Node.js, facilitando a interação com o banco de dados.
- **bcrypt:** Biblioteca para hashing de senhas.
- **JSON Web Token (JWT):** Padrão aberto para criação de tokens de acesso que permitem a autenticação de requisições.
- **Docker:** Plataforma para desenvolvimento, envio e execução de aplicações em containers.
- **ESLint & Prettier:** Ferramentas para linting e formatação de código, garantindo a qualidade e a consistência do código.

## 📁 Estrutura do Projeto

A estrutura de pastas do projeto foi pensada para ser organizada e escalável:

```
src/
├─ @types/          # Definições de tipos customizados para bibliotecas externas.
├─ auth/            # Lógica de autenticação, geração e validação de JWT.
├─ constants/       # Constantes da aplicação, como mensagens de erro e status codes.
├─ controllers/     # Camada responsável por receber as requisições HTTP e retornar as respostas.
├─ database/
│  └─ models/       # Definição dos schemas e models do Mongoose.
├─ dtos/            # Data Transfer Objects: objetos que definem a estrutura dos dados que entram e saem da API.
├─ errors/          # Classes de erro customizadas para um tratamento de erros mais robusto.
├─ middleware/      # Funções que são executadas entre a requisição e a resposta (ex: autenticação, validação).
├─ routes/          # Definição das rotas da API.
├─ services/        # Camada de serviço, onde reside a lógica de negócio da aplicação.
├─ types/           # Tipos e interfaces TypeScript compartilhados pela aplicação.
├─ utils/           # Funções utilitárias genéricas (ex: hashing de senhas).
├─ app.ts           # Ponto de entrada da aplicação, onde o Express é configurado.
├─ route.ts         # Arquivo que agrega e configura todas as rotas da aplicação.
├─ server.ts        # Arquivo responsável por iniciar o servidor HTTP.
├─ Dockerfile       # Instruções para construir a imagem Docker da aplicação.
└─ .env             # Arquivo para armazenar as variáveis de ambiente (não versionado).
```

## 🗺️ Endpoints da API

A seguir, uma descrição detalhada dos endpoints disponíveis na API.

### Autenticação e Admin

| Método | Rota        | Protegido | Descrição                                                                 |
| :----- | :---------- | :-------- | :------------------------------------------------------------------------ |
| `POST` | `/auth/login` | ❌ Não      | Autentica um usuário com email e senha e retorna um token JWT.              |
| `POST` | `/auth/admin` | ✅ Admin    | Cria um novo usuário com a função de `ADMIN`. Requer token de um admin.     |
| `GET`  | `/auth/me`    | ✅ Sim      | Retorna as informações do usuário atualmente logado (identificado pelo JWT). |

### Usuários

| Método | Rota      | Protegido | Descrição                                                                    |
| :----- | :-------- | :-------- | :--------------------------------------------------------------------------- |
| `POST` | `/user`     | ❌ Não      | Cria um novo usuário.                                                        |
| `GET`  | `/user`     | ❌ Não      | Lista todos os usuários cadastrados.                                         |
| `GET`  | `/user/:id` | ❌ Não      | Busca e retorna um usuário específico pelo seu ID.                           |
| `PUT`  | `/user/:id` | ✅ Sim      | Atualiza as informações de um usuário. Requer token do próprio usuário ou de um admin. |
| `DELETE` | `/user/:id` | ✅ Admin    | Deleta um usuário. Requer token de um admin.                                 |

