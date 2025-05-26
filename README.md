
# 💡 Sistema de Controle Residencial Inteligente - Back-End

Este repositório contém a aplicação back-end desenvolvida como parte de um projeto acadêmico com o objetivo de aprofundar conhecimentos em **procedures** e **triggers no MySQL**, além de consolidar o uso do **Express.js** no padrão arquitetural **MVC (Model-View-Controller)**.

A aplicação simula um sistema de gerenciamento de login de usuários e registro de logs de acesso para um **aplicativo mobile de controle de lâmpadas inteligentes** em uma residência.

## 🎯 Objetivos do Projeto

- Praticar integração entre banco de dados e API REST.
- Aplicar triggers e procedures no MariaDB/MySQL.
- Estruturar uma API com Node.js utilizando o padrão MVC.
- Desenvolver funcionalidades reais de autenticação e controle de acesso.
- Simular integração entre mobile e back-end.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MariaDB / MySQL](https://mariadb.org/)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Json Web Token (JWT)](https://jwt.io/)
- [Thunder Client (VSCode)](https://www.thunderclient.com/)

---

## 📁 Estrutura do Projeto (MVC)

```
├── src/
│   ├── controllers/
│     ├── accounts.js
│     ├── logs.js
│     ├── movements.js
│   ├── middleware/
      ├── accounts.js
│     ├── logs.js
│     ├── movements.js
│   ├── models/
      ├── accounts.js
│     ├── logs.js
│     ├── movements.js
│   ├── routes/
      ├── accounts.js
│     ├── logs.js
│     ├── movements.js
│   ├── util/
      ├── connection.js
├── app.js
├── .env
```

---

## 🔐 Autenticação

A aplicação utiliza autenticação via **JWT**. Rotas protegidas exigem o envio de um token no cabeçalho `Authorization`.

---

## 📌 Rotas da API

### 👤 Conta (Account)

- `POST /account/register`  
  Cria um novo usuário.  
  Exemplo:
  ```json
  {
    "name": "Wendell Dev",
    "login": "wendell022",
    "password": "12345678"
  }
  ```

- `POST /account/login`  
  Autentica o usuário e retorna um token JWT.
  Exemplo:
  ```json
  {
    "login": "wendell022",
    "password": "12345678"
  }
  ```

- `GET /account/me`  
  Retorna os dados do usuário autenticado.  
  **Header:** `Authorization: Bearer <token>`

- `PUT /account/name`  
  Atualiza o nome do usuário.  

  **Header:** `Authorization: Bearer <token>`

  **Body:**
  ```json
  {
    "name": "Wendell Gabriel"
  }
  ```

- `PUT /account/password`  
  Altera a senha do usuário.  

  **Header:** `Authorization: Bearer <token>`

  **Body:**
  ```json
  {
    "password": "153280",
    "newPassword": "12345678"
  }
  ```

- `DELETE /account/user`  
  Exclui a conta do usuário autenticado.

  **Header:** `Authorization: Bearer <token>`

---

### 📝 Logs

- `POST /logs/new`  
  Registra um novo log de acesso.
  ```json
  {
    "id": 0,
    "tipo": "I",
    "descricao": "Luz acesa por sensor"
  }
  ```

- `GET /logs/get`  
  Retorna todos os logs do sistema.

---

### 🚶 Movimentos (Movements)

- `POST /movements/new`  
  Registra um novo evento de movimento.
  ```json
  {
    "tipo": "I",
    "descricao": "Luz acesa por sensor"
  }
  ```

- `GET /movements/get`  
  Lista todos os registros de movimentos.

---


---

## 🔧 Configuração do Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Conexão com o banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

# JWT
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1d
```

> ⚠️ Nunca compartilhe seu `.env` real publicamente. O arquivo `.env` deve estar no `.gitignore`.

Carregue o arquivo `tabelas.sql` em seu banco de dados mysql:

## 🧪 Testes

As requisições foram testadas utilizando o Thunder Client no VSCode.  
Sequência recomendada para testes:

1. `POST /account/register`
2. `POST /account/login`
3. Copiar o token JWT do login
4. Usar o token no header `Authorization` para testar as demais rotas protegidas

---

## 🏆 Avaliação

Este projeto foi entregue como substitutivo de prova na faculdade, com foco na aplicação prática dos conhecimentos e simulação de integração real entre sistemas mobile e back-end.  
**Nota obtida: 10/10** 🎓

---

## 📌 Observações

- Procedures e triggers do banco foram desenvolvidas para automatizar registros e integridade dos dados (não incluídas aqui, mas presumivelmente disponíveis na pasta `/database`).
- O sistema pode ser facilmente integrado com um aplicativo mobile para testes completos.

---

## 📫 Contato

Desenvolvido por Wendell Gabriel • Projeto Acadêmico  
📧 Email: [wendell9293@gmail.com]  
🛒 [Cyber Scripts](https://www.cyberscripts.com.br/)
