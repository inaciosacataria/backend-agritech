# Sistema de Gestão Agritech - API RESTful

Uma API RESTful completa para gerenciamento de empresas, campanhas, técnicos e produtores no contexto de uma empresa de agritech.

## 🚀 Tecnologias

- **Node.js** com **Express.js**
- **PostgreSQL** como banco de dados
- **Sequelize** como ORM
- **TypeScript** para tipagem estática
- **Zod** para validação de dados
- **CORS** e **Helmet** para segurança

## 📋 Funcionalidades

### Entidades Principais
- **Empresas**: Gestão de empresas com validação de CNPJ
- **Campanhas**: Campanhas vinculadas a empresas com controle de datas
- **Técnicos**: Técnicos associados a campanhas
- **Produtores**: Produtores com localização
- **Atribuições**: Sistema de atribuição e transferência de produtores entre técnicos

### Endpoints Implementados
- ✅ POST /empresas - Cadastrar empresa
- ✅ POST /campanhas - Cadastrar campanha
- ✅ POST /tecnicos - Cadastrar técnico
- ✅ POST /produtores - Cadastrar produtor
- ✅ POST /produtores/atribuir - Atribuir produtor a técnico
- ✅ PUT /produtores/transferir - Transferir produtor entre técnicos
- ✅ GET /tecnicos/:id/produtores - Listar produtores de um técnico

## 🏗️ Arquitetura

O projeto segue o padrão **MVC** com camadas bem definidas:

```
Controller → Service → Repository → Model
```

### Estrutura de Pastas
```
src/
├── config/          # Configurações do ambiente
├── controllers/     # Controladores (camada de apresentação)
├── services/        # Serviços (regras de negócio)
├── repositories/    # Repositórios (acesso a dados)
├── models/          # Modelos do Sequelize
├── routes/          # Definição das rotas
├── middlewares/     # Middlewares customizados
├── validators/      # Schemas de validação
└── utils/           # Utilitários
```

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <repository-url>
cd backend-agritech
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o ambiente
Crie um arquivo `.env` baseado no exemplo:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agritech
DB_USER=postgres
DB_PASS=postgres
PORT=3000
NODE_ENV=development
```

### 4. Configure o banco de dados
Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:
```sql
CREATE DATABASE agritech;
```

### 5. Execute o servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 🌐 Deploy no Render

1. Gere o build:
```bash
npm run build
```
2. Faça push do repositório para o GitHub/GitLab.
3. No Render, crie um serviço Web a partir do repositório.
   - Build Command: `npm ci && npm run build`
   - Start Command: `node dist/server.js`
4. Configure as variáveis de ambiente no Render:
   - `NODE_ENV=production`
   - `DB_DIALECT=postgres`
   - `DB_SSL=true`
   - `DB_HOST` (valor do Postgres do Render)
   - `DB_PORT=5432`
   - `DB_NAME=agritech`
   - `DB_USER` (do Postgres do Render)
   - `DB_PASS` (do Postgres do Render)
5. Opcional: use `render.yaml` para Infra as Code.

## 📚 Documentação da API

A documentação completa da API está disponível em [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

### Exemplo de Uso

#### 1. Criar Empresa
```bash
curl -X POST http://localhost:3000/empresas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Agritech Solutions",
    "cnpj": "12.345.678/0001-90",
    "telefone": "(11) 99999-9999",
    "email": "contato@agritech.com"
  }'
```

#### 2. Criar Campanha
```bash
curl -X POST http://localhost:3000/campanhas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Campanha Soja 2024",
    "empresa_id": 1,
    "data_inicio": "2024-01-01",
    "data_fim": "2024-12-31"
  }'
```

## ✅ Validações Implementadas

- **CNPJ**: Validação de formato e unicidade
- **Datas**: Formato YYYY-MM-DD e lógica de negócio
- **Relacionamentos**: Validação de existência de entidades relacionadas
- **Regras de Negócio**: 
  - Produtor em apenas uma campanha por vez
  - Técnicos devem estar na mesma campanha para transferências
  - Controle de datas de início e fim das campanhas

## 🔒 Segurança

- **Helmet**: Headers de segurança
- **CORS**: Configuração de CORS
- **Validação de JSON**: Middleware para validação de entrada
- **Tratamento de Erros**: Middleware global de tratamento de erros

## 🧪 Testes

Para testar a API, você pode usar:

1. **cURL** (exemplos na documentação)
2. **Postman** (coleção disponível)
3. **Insomnia** ou qualquer cliente HTTP

### Health Check
```bash
curl -X GET http://localhost:3000/health
```

## 📝 Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Compila o TypeScript
npm start        # Executa em modo produção
npm test         # Executa os testes
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

