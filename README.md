# Sistema de Gerenciamento de Produtos

## 👥 Integrantes do Grupo

| Nome do Aluno                  | Matrícula    |
|---------------------------------|-------------|
| Louie Nery Silva               | UC24101358  |
| João Filipe Alves de Albuquerque | UC24102128  |
| Mateus Henrique Lacerda Lopes  | UC24102584  |
| Guilherme Souza Rocha          | UC24101057  |

## 🚀 Como Executar a Aplicação

### 🔧 Backend (NestJS)

1. Navegue até a pasta do backend:
 ``` bash
   cd nest_produtos
Instale as dependências:

bash
npm install
Configure o banco de dados (SQLite):

O banco será criado automaticamente no arquivo db.sqlite

Execute as migrations (se necessário):

bash
npm run typeorm migration:run
Inicie o servidor:

bash
npm run start:dev
O servidor estará disponível em: http://localhost:3000
```

### 🖥️ Frontend (React)
1. Navegue até a pasta do frontend:

  ```bash
cd frontend
Instale as dependências:

bash
npm install
Inicie a aplicação:

bash
npm start
A aplicação estará disponível em: http://localhost:3001
```

### 🌐 Endpoints da API
 ```GET /produtos - Lista todos os produtos

POST /produtos - Cria um novo produto

GET /produtos/:id - Obtém um produto específico

PATCH /produtos/:id - Atualiza um produto

DELETE /produtos/:id - Remove um produto

POST /produtos/:id/upload - Faz upload de imagem para um produto
 ```



### 🛠️ Tecnologias Utilizadas
 ```
Backend:

NestJS

TypeORM

SQLite
 

Frontend:

React (TypeScript)

Axios (chamadas HTTP)

Material-UI (componentes)
 ```
### 📌 Observações Importantes
Certifique-se de ter o Node.js instalado (versão 16 ou superior)

O projeto utiliza SQLite para desenvolvimento, mas pode ser configurado para outros bancos

Todas as imagens enviadas são salvas na pasta uploads no backend

📄 Licença
Este projeto está licenciado sob a licença MIT.
