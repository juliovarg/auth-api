# 🛡️ Auth API com FastAPI + JWT + React

Este projeto é uma solução completa de autenticação segura com:
- Backend em **FastAPI** com suporte a JWT, Refresh Token e RBAC
- Frontend em **React** simples para login, registro e exclusão de conta

---

## 🚀 Tecnologias Utilizadas

### 🔙 Backend
- [FastAPI](https://fastapi.tiangolo.com/)
- JWT (com `python-jose`)
- SQLAlchemy (assíncrono)
- SQLite
- Bcrypt
- Middleware CORS
- Swagger UI (`/docs`)

### 🔜 Frontend
- React + React Router
- Fetch API para integração com o backend

---

## 🔧 Como rodar localmente

### 🔙 Backend

```bash
# Crie o ambiente virtual
python -m venv venv
venv\Scripts\activate  # ou source venv/bin/activate no Linux/Mac

# Instale as dependências
pip install -r requirements.txt

# Rode a API
uvicorn app.main:app --reload
```

Acesse: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 🔜 Frontend

```bash
cd auth-frontend
npm install
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Funcionalidades Implementadas

- ✅ Cadastro de usuários
- ✅ Login com geração de `access_token` e `refresh_token`
- ✅ Controle de acesso via JWT
- ✅ Exclusão de conta com autenticação
- ✅ Frontend com páginas de registro, login e exclusão
- ✅ Logs de atividades
- ✅ Integração entre frontend e backend
