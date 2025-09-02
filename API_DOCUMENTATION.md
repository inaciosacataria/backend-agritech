# API RESTful - Sistema de Gestão Agritech

## Visão Geral

Esta API RESTful foi desenvolvida para gerenciar empresas, campanhas, técnicos e produtores no contexto de uma empresa de agritech. A API segue o padrão MVC com camadas Controller → Service → Repository.

## Tecnologias Utilizadas

- **Node.js** com **Express.js**
- **PostgreSQL** como banco de dados
- **Sequelize** como ORM
- **TypeScript** para tipagem estática
- **Zod** para validação de dados
- **CORS** e **Helmet** para segurança

## Estrutura do Projeto

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

## Configuração do Ambiente

1. Instale as dependências:
```bash
npm install
```

2. Configure o arquivo `.env` baseado no `.env.example`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agritech
DB_USER=postgres
DB_PASS=postgres
PORT=3000
NODE_ENV=development
```

3. Execute o servidor:
```bash
npm run dev
```

## Endpoints da API

### 1. Empresas

#### POST /empresas
Cadastrar uma nova empresa.

**Body:**
```json
{
  "nome": "Agritech Solutions",
  "cnpj": "12.345.678/0001-90",
  "telefone": "(11) 99999-9999",
  "email": "contato@agritech.com"
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "nome": "Agritech Solutions",
  "cnpj": "12.345.678/0001-90",
  "telefone": "(11) 99999-9999",
  "email": "contato@agritech.com"
}
```

#### GET /empresas
Listar todas as empresas.

#### GET /empresas/:id
Buscar empresa por ID.

#### PUT /empresas/:id
Atualizar empresa.

#### DELETE /empresas/:id
Deletar empresa.

### 2. Campanhas

#### POST /campanhas
Cadastrar uma nova campanha.

**Body:**
```json
{
  "nome": "Campanha Soja 2024",
  "empresa_id": 1,
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31"
}
```

#### GET /campanhas
Listar todas as campanhas.

#### GET /campanhas/:id
Buscar campanha por ID.

#### GET /campanhas/empresa/:empresaId
Listar campanhas de uma empresa específica.

#### PUT /campanhas/:id
Atualizar campanha.

#### DELETE /campanhas/:id
Deletar campanha.

### 3. Técnicos

#### POST /tecnicos
Cadastrar um novo técnico.

**Body:**
```json
{
  "nome": "João Silva",
  "campanha_id": 1
}
```

#### GET /tecnicos
Listar todos os técnicos.

#### GET /tecnicos/:id
Buscar técnico por ID.

#### GET /tecnicos/campanha/:campanhaId
Listar técnicos de uma campanha específica.

#### GET /tecnicos/:id/produtores
Listar produtores atribuídos a um técnico.

#### PUT /tecnicos/:id
Atualizar técnico.

#### DELETE /tecnicos/:id
Deletar técnico.

### 4. Produtores

#### POST /produtores
Cadastrar um novo produtor.

**Body:**
```json
{
  "nome": "Maria Santos",
  "localizacao": "Fazenda São José, SP"
}
```

#### GET /produtores
Listar todos os produtores.

#### GET /produtores/:id
Buscar produtor por ID.

#### GET /produtores/:id/atribuicoes
Listar atribuições de um produtor.

#### PUT /produtores/:id
Atualizar produtor.

#### DELETE /produtores/:id
Deletar produtor.

#### POST /produtores/atribuir
Atribuir produtor a um técnico em uma campanha.

**Body:**
```json
{
  "produtor_id": 1,
  "tecnico_id": 1,
  "campanha_id": 1
}
```

#### PUT /produtores/transferir
Transferir produtor entre técnicos.

**Body:**
```json
{
  "produtor_id": 1,
  "tecnico_antigo_id": 1,
  "tecnico_novo_id": 2,
  "campanha_id": 1
}
```

## Exemplos de Teste com cURL

### 1. Criar Empresa
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

### 2. Criar Campanha
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

### 3. Criar Técnico
```bash
curl -X POST http://localhost:3000/tecnicos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "campanha_id": 1
  }'
```

### 4. Criar Produtor
```bash
curl -X POST http://localhost:3000/produtores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "localizacao": "Fazenda São José, SP"
  }'
```

### 5. Atribuir Produtor a Técnico
```bash
curl -X POST http://localhost:3000/produtores/atribuir \
  -H "Content-Type: application/json" \
  -d '{
    "produtor_id": 1,
    "tecnico_id": 1,
    "campanha_id": 1
  }'
```

### 6. Transferir Produtor
```bash
curl -X PUT http://localhost:3000/produtores/transferir \
  -H "Content-Type: application/json" \
  -d '{
    "produtor_id": 1,
    "tecnico_antigo_id": 1,
    "tecnico_novo_id": 2,
    "campanha_id": 1
  }'
```

### 7. Listar Produtores de um Técnico
```bash
curl -X GET http://localhost:3000/tecnicos/1/produtores
```

## Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Erro de validação ou dados inválidos
- **404**: Recurso não encontrado
- **409**: Conflito (ex: CNPJ duplicado)
- **500**: Erro interno do servidor

## Validações Implementadas

### Empresas
- CNPJ único e formato válido
- Nome obrigatório
- Email com formato válido (opcional)

### Campanhas
- Empresa deve existir
- Datas no formato YYYY-MM-DD
- Data de fim >= data de início

### Técnicos
- Campanha deve existir
- Nome obrigatório

### Produtores
- Nome e localização obrigatórios

### Atribuições/Transferências
- Produtor, técnico e campanha devem existir
- Técnico deve estar na mesma campanha
- Produtor não pode estar duplicado na mesma campanha
- Para transferência: produtor deve estar atribuído ao técnico antigo

## Regras de Negócio

1. **Um produtor pode estar em apenas uma campanha por vez**
2. **Ao transferir, ambos técnicos devem estar na mesma campanha**
3. **Registra data_transferencia quando houver mudança de técnico**
4. **Valida se empresa existe antes de criar campanha**
5. **Valida se campanha existe antes de criar técnico**

## Health Check

```bash
curl -X GET http://localhost:3000/health
```

**Resposta:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Tratamento de Erros

A API retorna erros padronizados com:
- Código de status HTTP apropriado
- Mensagem de erro descritiva
- Timestamp do erro

**Exemplo de erro:**
```json
{
  "error": "CNPJ já cadastrado",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```
