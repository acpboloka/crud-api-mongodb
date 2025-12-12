# API CRUD - Sistema de Tarefas com MongoDB

API RESTful completa usando Node.js, Express e MongoDB para gerenciamento de tarefas.

## 🚀 Tecnologias
- Node.js
- Express
- MongoDB Atlas
- Vercel (Deploy)

## 🔗 API Online
**Base URL**: https://seu-projeto.vercel.app

## 📚 Documentação
Acesse: https://seu-projeto.vercel.app/api-docs

## 📋 Endpoints

### GET /api/tarefas
Lista todas as tarefas

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "673b4db631854701e7c3ac66",
      "Descricao": "tarefa demonstração aula 13",
      "DataInicial": "2024-11-18T18:50:14.314Z",
      "DataFinal": "2024-11-18T19:47:22.314Z",
      "Status": "Feito"
    }
  ],
  "total": 1
}
```

### POST /api/tarefas
Cria nova tarefa

**Body:**
```json
{
  "Descricao": "tarefa demonstração aula 13",
  "DataInicial": "2024-11-18T18:50:14.314Z",
  "DataFinal": "2024-11-18T19:47:22.314Z",
  "Status": "Feito"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "data": {
    "_id": "673b4db631854701e7c3ac66",
    "Descricao": "tarefa demonstração aula 13",
    "DataInicial": "2024-11-18T18:50:14.314Z",
    "DataFinal": "2024-11-18T19:47:22.314Z",
    "Status": "Feito",
    "criadoEm": "2024-12-12T10:00:00.000Z"
  }
}
```

### GET /api/tarefas/:id
Busca tarefa específica por ID

### PUT /api/tarefas/:id
Atualiza tarefa existente

**Body (todos os campos são opcionais):**
```json
{
  "Descricao": "tarefa atualizada",
  "Status": "Em Progresso"
}
```

### DELETE /api/tarefas/:id
Deleta tarefa

## 🗄️ Banco de Dados
MongoDB Atlas (Cloud Database)

## 📦 Instalação Local
```bash
npm install
npm start
```

## 👨‍💻 Desenvolvedor
[Seu Nome]
```

---

## 🎯 GUIA PASSO A PASSO SUPER DETALHADO

### 📍 PASSO 1: CRIAR MONGODB (10 minutos)

1. **Acesse**: https://www.mongodb.com/cloud/atlas/register
2. **Cadastre-se**: Use "Sign up with Google" (mais rápido)
3. **Criar Cluster**:
   - Escolha **M0 FREE**
   - Provider: **AWS**
   - Region: **N. Virginia** (ou qualquer FREE)
   - Nome: `tarefas`
   - Clique em **"Create Deployment"**
   - **AGUARDE 2-3 minutos**

4. **Criar Usuário**:
   - Username: `admin`
   - Password: `senha123` (anote isso!)
   - Clique em **"Create Database User"**

5. **Liberar Acesso**:
   - Clique em **"Add Entry"**
   - IP: `0.0.0.0/0`
   - Description: "Qualquer lugar"
   - Clique em **"Add Entry"**
   - Clique em **"Finish and Close"**

6. **Pegar String de Conexão**:
   - Clique em **"Connect"**
   - Escolha **"Drivers"**
   - Copie a string (começa com `mongodb+srv://`)
   - Substitua `<password>` por `senha123`
   - **SALVE NO BLOCO DE NOTAS!**

Exemplo final:
```
mongodb+srv://admin:senha123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

### 📍 PASSO 2: CRIAR ARQUIVOS (5 minutos)

1. **Criar pasta** `crud-api-mongodb` no seu computador
2. **Dentro dela**, criar pasta `api`
3. **Criar 3 arquivos** (copie os códigos acima):
   - `api/index.js` (código da API)
   - `package.json` (dependências)
   - `vercel.json` (config do Vercel)

**Estrutura final:**
```
crud-api-mongodb/
├── api/
│   └── index.js
├── package.json
└── vercel.json
```

---

### 📍 PASSO 3: GITHUB (10 minutos)

1. **Acesse**: https://github.com/new
2. **Repository name**: `crud-api-mongodb`
3. **Public** + ✅ **Add README**
4. Clique em **"Create repository"**

**Adicionar arquivos:**

5. **Arquivo 1**: 
   - Clique em **"Add file"** → **"Create new file"**
   - Nome: `api/index.js`
   - Cole o código completo
   - **"Commit changes"**

6. **Arquivo 2**:
   - **"Add file"** → **"Create new file"**
   - Nome: `package.json`
   - Cole o código
   - **"Commit changes"**

7. **Arquivo 3**:
   - **"Add file"** → **"Create new file"**
   - Nome: `vercel.json`
   - Cole o código
   - **"Commit changes"**

---

### 📍 PASSO 4: VERCEL (10 minutos)

1. **Acesse**: https://vercel.com/signup
2. **"Continue with GitHub"**
3. **Autorize** o Vercel

4. **Import Project**:
   - Clique em **"Add New..."** → **"Project"**
   - Procure `crud-api-mongodb`
   - Clique em **"Import"**

5. **IMPORTANTE - Variável de Ambiente**:
   - Expanda **"Environment Variables"**
   - **Name**: `MONGODB_URI`
   - **Value**: Cole sua string do MongoDB
   - Clique em **"Add"**

6. **Deploy**:
   - Clique em **"Deploy"**
   - Aguarde 2-3 minutos
   - **PRONTO!** 🎉

7. **Copie seu link**: `seu-projeto.vercel.app`

---

### 📍 PASSO 5: TESTAR (10 minutos)

**Opção 1: No Navegador**

Acesse:
```
https://seu-projeto.vercel.app/api/tarefas
