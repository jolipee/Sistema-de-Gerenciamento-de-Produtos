# Sistema-de-Gerenciamento-de-Produtos

👥 Integrantes do Grupo
Nome dos Alunos/Matrícula
[SEU NOME]	[SUA MATRÍCULA]




🚀 Como Executar a Aplicação
🔧 Backend (NestJS)
Navegue até a pasta do backend:

bash
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

🖥️ Frontend (React)
Navegue até a pasta do frontend:

bash
cd frontend
Instale as dependências:

bash
npm install
Inicie a aplicação:

bash
npm start
A aplicação estará disponível em: http://localhost:3001

🌐 Endpoints da API
GET /produtos - Lista todos os produtos

POST /produtos - Cria um novo produto

GET /produtos/:id - Obtém um produto específico

PATCH /produtos/:id - Atualiza um produto

DELETE /produtos/:id - Remove um produto

POST /produtos/:id/upload - Faz upload de imagem para um produto

📚 Documentação da API
Acesse a documentação Swagger em:
http://localhost:3000/api (quando o servidor estiver rodando)

🛠️ Tecnologias Utilizadas
Backend:

NestJS

TypeORM

SQLite

Swagger (documentação)

Frontend:

React (TypeScript)

Axios (chamadas HTTP)

Material-UI (componentes)

📌 Observações Importantes
Certifique-se de ter o Node.js instalado (versão 16 ou superior)

O projeto utiliza SQLite para desenvolvimento, mas pode ser configurado para outros bancos

Todas as imagens enviadas são salvas na pasta uploads no backend

📄 Licença
Este projeto está licenciado sob a licença MIT.
