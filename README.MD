Perfeito! Agora dá pra montar uma **documentação completa e detalhada**, explicando desde setup até endpoints, DTOs, models, middleware, Docker e autenticação. Vou escrever como um `README.md` pronto para o seu GitHub, explicando tudo passo a passo.

---

# Gerenciamento de Usuários API

Uma API completa para gerenciamento de usuários com autenticação JWT, criação de administradores, controle de acesso, validações, Docker e TypeScript.

---

## 🔹 Tecnologias usadas

* **Node.js 20** + **TypeScript**
* **Express.js** – framework HTTP
* **MongoDB** – banco de dados
* **Mongoose** – ORM para MongoDB
* **bcrypt** – hash de senhas
* **JWT (JSON Web Tokens)** – autenticação
* **Docker** – containerização
* **ESLint/Prettier** – boas práticas de código

---

## 🔹 Estrutura do projeto

```text
src/
├─ @types/          # Tipos customizados (TypeScript)
├─ auth/            # Funções de autenticação e JWT
├─ constants/       # Mensagens e constantes
├─ controllers/     # Recebem requisições HTTP e chamam services
├─ database/
│  └─ models/       # Models do Mongoose
├─ dtos/            # DTOs (Data Transfer Objects) para validação e tipagem
├─ errors/          # Tratamento de erros customizados
├─ middleware/      # Middlewares de autenticação, validação e permissões
├─ routes/          # Rotas da aplicação
├─ services/        # Lógica de negócio e manipulação de dados
├─ types/           # Tipos TypeScript compartilhados
├─ utils/           # Funções utilitárias (hash de senha etc.)
├─ app.ts           # Configuração do Express
├─ route.ts         # Configuração das rotas globais
├─ server.ts        # Inicialização do servidor
├─ Dockerfile       # Configuração do container
└─ .env             # Variáveis de ambiente
```

---

## 🔹 Setup do projeto

### 1️⃣ Clonar repositório

```bash
git clone <seu-repositorio>
cd <nome-do-projeto>
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
PORT=3000

DB_PASSWORD="superSenh4$ecr3ta"
DB_USER="admin13"
MONGODB_URL="mongodb+srv://admin13:superSenh4$ecr3ta@gerenciamento-de-usuari.idezne1.mongodb.net/?appName=Gerenciamento-de-usuarios"

JWT_SECRET="8fK2xP9vQ4mL7sT1yZ0aB3cD6eH9jK2"
```

> ⚠️ Nunca comite o `.env` em repositórios públicos.

### 4️⃣ Rodando localmente

```bash
npm run build
npm run start
```

O servidor estará disponível em `http://localhost:3000`.

### 5️⃣ Rodando via Docker

```bash
docker build -t gerenciamento-usuarios .
docker run -p 3000:3000 gerenciamento-usuarios
```

---

## 🔹 Endpoints

### Autenticação & Admin

| Método | Rota        | Protegido | Descrição                         |
| ------ | ----------- | --------- | --------------------------------- |
| POST   | /auth/login | ❌         | Login do usuário e retorno do JWT |
| POST   | /auth/admin | ✅ Admin   | Criação de um novo administrador  |
| GET    | /auth/me    | ✅         | Retorna dados do usuário logado   |

### Usuários

| Método | Rota      | Protegido | Descrição                                   |
| ------ | --------- | --------- | ------------------------------------------- |
| POST   | /user     | ❌         | Criar usuário                               |
| GET    | /user     | ❌         | Listar todos os usuários                    |
| GET    | /user/:id | ❌         | Buscar usuário por ID                       |
| PUT    | /user/:id | ✅         | Atualizar usuário (Admin ou dono do perfil) |
| DELETE | /user/:id | ✅ Admin   | Deletar usuário                             |

---

## 🔹 DTOs (Data Transfer Objects)

**CreateUserDto**

```ts
interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}
```

**UserResponseDto**

```ts
interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  UpdateAt?: Date;
}
```

---

## 🔹 Models

**User**

```ts
{
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}
```

* `email` deve ser único.
* `role` padrão é `USER`.
* Campos `createdAt` e `updatedAt` gerados automaticamente.

---

## 🔹 Middleware

* **authMiddleware** – verifica JWT e adiciona `req.user`.
* **isAdmin** – permite apenas usuários com role `ADMIN`.
* **emptyFields** – valida preenchimento de campos obrigatórios.
* **checkObjectId** – valida IDs do MongoDB.
* **errorMiddleware** – captura erros e retorna JSON com detalhes.

---

## 🔹 Services

Cada controller chama um service que faz a lógica de negócio:

* **CreateUserService** – cria usuários.
* **CreateAdminService** – cria administradores (verifica permissão).
* **LoginService** – valida login e retorna JWT.
* **SearchUserService** – lista todos os usuários.
* **UpdateUserService** – atualiza nome/email (verifica permissão).
* **DeleteUserService** – remove usuários (Admin).
* **UserByIdService** – busca usuário pelo ID.

---

## 🔹 Exemplo de uso com Postman / Insomnia

### 1️⃣ Criar usuário

**POST** `/user`

```json
{
  "name": "João",
  "email": "joao@example.com",
  "password": "123456"
}
```

### 2️⃣ Login

**POST** `/auth/login`

```json
{
  "email": "joao@example.com",
  "password": "123456"
}
```

**Resposta**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### 3️⃣ Criar Admin

**POST** `/auth/admin`
**Headers**

```
Authorization: Bearer <JWT do admin>
```

**Body**

```json
{
  "name": "Admin2",
  "email": "admin2@example.com",
  "password": "superSenha",
  "role": "ADMIN"
}
```

### 4️⃣ Atualizar usuário

**PUT** `/user/<id>`
**Headers**

```
Authorization: Bearer <JWT>
```

**Body**

```json
{
  "name": "João Atualizado",
  "email": "novoemail@example.com"
}
```

---

##  Hash de Senhas

* Senhas são sempre **hashadas** com bcrypt antes de salvar no banco.
* Comparação segura no login.

---

##  JWT

* Todos os endpoints protegidos requerem JWT no header `Authorization: Bearer <token>`.
* Payload do token:

```ts
{
  sub: string, // user ID
  role: "USER" | "ADMIN",
  iat: number,
  exp: number
}
```

---

##  Boas práticas & segurança

* Senhas nunca armazenadas em texto.
* Verificação de permissões por middleware.
* Erros tratados com `AppError` e `errorMiddleware`.
* Rotas críticas protegidas por `isAdmin`.
* IDs validados com `checkObjectId`.

---

##  Docker

1. Build:

```bash
docker build -t gerenciamento-usuarios .
```

2. Run:

```bash
docker run -p 3000:3000 gerenciamento-usuarios
```

* Porta 3000 exposta no host.
* Ambiente configurado via `.env`.

---

##  Conclusão

Esta API fornece uma base sólida para gerenciamento de usuários com:

* CRUD completo
* Autenticação JWT
* Controle de permissões
* Docker para deploy rápido
* Boas práticas de TypeScript e Mongoose

> Pode ser expandida com features como reset de senha, logs de atividades, paginação de usuários, etc.

