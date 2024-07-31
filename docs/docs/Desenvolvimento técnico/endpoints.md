---
title: Documentação dos Endpoints
sidebar_position: 12
description: Documentação dos endpoints do projeto.
---

# Documentação dos Endpoints da API

## Método HTTP POST

### Criar Usuário

**Endpoint:** `/usuarios`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo usuário

**Parâmetros do Corpo da Requisição:**

- **email (obrigatório):** Email do usuário
- **senha (obrigatório):** Senha do usuário
- **tipo_usuario (obrigatório):** Tipo de usuário (ex: locatario)
- **ativo (obrigatório):** Status do usuário (true para ativo, false para inativo)
- **data_de_criacao (obrigatório):** Data e hora de criação do usuário (formato ISO 8601)

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/usuarios
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "senha123",
  "tipo_usuario": "Locatario",
  "ativo": true,
  "data_de_criacao": "2024-07-27T12:00:00Z"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "3",
  "email": "usuario@example.com",
  "tipo_usuario": "locatario",
  "ativo": true,
  "data_de_criacao": "2024-07-27T12:00:00Z"
}
```

**Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Email já cadastrado"
}
```

**Código de Status:** `400 Bad Request`  
**Tipo de Resposta:** `application/json`

### Criar Imóvel

**Endpoint:** `/imoveis`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo imóvel

**Parâmetros do Corpo da Requisição:**

- **tipo_imovel (obrigatório):** Tipo de imóvel (ex: Apartamento)
- **cep (obrigatório):** CEP do imóvel
- **condominio (obrigatório):** Valor do condomínio
- **valor_imovel (obrigatório):** Valor do imóvel
- **iptu (obrigatório):** Valor do iptu do imóvel
- **bairro (obrigatório):** Bairro onde o imóvel está localizado
- **endereco_imovel (obrigatório):** Endereço completo do imóvel
- **descricao (opcional):** Descrição detalhada do imóvel

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/imoveis
Content-Type: application/json

{
  "tipo_imovel": "Apartamento",
  "cep": 12345678,
  "condominio": 500,
  "valor_imovel": 300000.00,
  "iptu":1000.00,
  "bairro": "Centro",
  "endereco_imovel": "Rua das Flores, 123",
  "descricao": "Apartamento com 2 quartos e 2 banheiros."
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "tipo_imovel": "Apartamento",
  "cep": 12345678,
  "condominio": 500,
  "valor_imovel": 300000.00,
  "iptu": 1000.00,
  "bairro": "Centro",
  "endereco_imovel": "Rua das Flores, 123",
  "descricao": "Apartamento com 2 quartos e 2 banheiros."
}
```

**Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "CEP inválido"
}
```

**Código de Status:** `400 Bad Request`  
**Tipo de Resposta:** `application/json`

### Criar Pagamento

**Endpoint:** `/pagamentos`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo pagamento

**Parâmetros do Corpo da Requisição:**

- **id_contratos (obrigatório):** ID do contrato associado ao pagamento
- **valor (obrigatório):** Valor do pagamento
- **data (obrigatório):** Data do pagamento (formato ISO 8601)
- **pagante (obrigatório):** Nome do pagante
- **metodo_pagamento (obrigatório):** Método de pagamento (ex: Transferência bancária)
- **recebedor (obrigatório):** Nome do recebedor
- **tipo_pagamento (obrigatório):** Tipo de pagamento (ex: Aluguel)

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/pagamentos
Content-Type: application/json

{
  "id_contratos": 1,
  "valor": 1500.00,
  "data": "2024-07-27",
  "pagante": "Locatário XYZ",
  "metodo_pagamento": "Transferência bancária",
  "recebedor": "Locador ABC",
  "tipo_pagamento": "Aluguel"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_contratos": 1,
  "valor": 1500.00,
  "data": "2024-07-27",
  "pagante": "Locatário XYZ",
  "metodo_pagamento": "Transferência bancária",
  "recebedor": "Locador ABC",
  "tipo_pagamento": "Aluguel"
}
```

**Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "ID do contrato não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Criar Contrato de Aluguel

**Endpoint:** `/contratos`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo contrato de aluguel

**Parâmetros do Corpo da Requisição:**

- **valor_aluguel (obrigatório):** Valor do aluguel
- **data_inicio (obrigatório):** Data de início do contrato (formato ISO 8601)
- **data_fim (obrigatório):** Data de término do contrato (formato ISO 8601)
- **id_locadores (obrigatório):** ID do locador
- **id_locatarios (obrigatório):** ID do locatário
- **id_imoveis (obrigatório):** ID do imóvel
- **condicoes_especiais (opcional):** Condições especiais do contrato
- **multa_prazo (obrigatório):** Valor da multa por atraso no pagamento
- **status (obrigatório):** Status do contrato (true para ativo, false para inativo)
- **iptu (obrigatório):** Valor do IPTU
- **data_pagamento (obrigatório):** Data de pagamento (formato ISO 8601)
- **ativo (obrigatório):** Indica se o contrato está ativo (true para ativo, false para inativo)
- **data_recisao (opcional):** Data de rescisão do contrato (formato ISO 8601)
- **taxa_adm (obrigatório):** Valor da taxa administrativa
- **valor_reajuste (obrigatório):** Valor do reajuste anual do aluguel

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/contratos
Content-Type: application/json

{
  "valor_aluguel": "1200.00",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31",
  "id_locadores": 1,
  "id_locatarios": 2,
  "id_imoveis": 3,
  "condicoes_especiais": "Nenhuma",
  "multa_prazo": 200,
  "status": true,
  "iptu": 100.00,
  "data_pagamento": "2024-01-05T00:00:00Z",
  "ativo": true,
  "data_recisao": null,
  "taxa_adm": 10.00,
  "valor_reajuste": 50.00
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "valor_aluguel": "1200.00",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31",
  "id_locadores": 1,
  "id_locatarios": 2,
  "id_imoveis": 3,
  "condicoes_especiais": "Nenhuma",
  "multa_prazo": 200,
  "status": true,
  "iptu": 100.00,
  "data_pagamento": "2024-01-05T00:00:00Z",
  "ativo": true,
  "data_recisao": null,
  "taxa_adm": 10.00,
  "valor_reajuste": 50.00
}
```

**

Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "ID do locador, locatário ou imóvel não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Criar Locador

**Endpoint:** `/locadores`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo locador

**Parâmetros do Corpo da Requisição:**

- **id_imoveis (obrigatório):** ID do imóvel associado ao locador
- **nome_completo_locador (obrigatório):** Nome completo do locador
- **endereco (obrigatório):** Endereço do locador
- **passaporte (opcional):** Número do passaporte do locador
- **rg (obrigatório):** Número do RG do locador
- **cpf (obrigatório):** Número do CPF do locador
- **nacionalidade (obrigatório):** Nacionalidade do locador
- **numero_telefone (obrigatório):** Número de telefone do locador
- **email (obrigatório):** Email do locador
- **id_usuarios (obrigatório):** ID do usuário associado ao locador
- **pessoa_juridica (obrigatório):** Indica se o locador é pessoa jurídica (true para sim, false para não)
- **cnpj (opcional):** Número do CNPJ, caso o locador seja pessoa jurídica

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/locadores
Content-Type: application/json

{
  "id_imoveis": 1,
  "nome_completo_locador": "João Silva",
  "endereco": "Rua das Laranjeiras, 456",
  "passaporte": null,
  "rg": 12345678,
  "cpf": 987654321,
  "nacionalidade": "Brasileira",
  "numero_telefone": 11987654321,
  "email": "joaosilva@example.com",
  "id_usuarios": 1,
  "pessoa_juridica": false,
  "cnpj": null
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_imoveis": 1,
  "nome_completo_locador": "João Silva",
  "endereco": "Rua das Laranjeiras, 456",
  "passaporte": null,
  "rg": 12345678,
  "cpf": 987654321,
  "nacionalidade": "Brasileira",
  "numero_telefone": 11987654321,
  "email": "joaosilva@example.com",
  "id_usuarios": 1,
  "pessoa_juridica": false,
  "cnpj": null
}
```

**Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "ID do imóvel ou usuário não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Criar Locatário

**Endpoint:** `/locatarios`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo locatário

**Parâmetros do Corpo da Requisição:**

- **id_usuarios (obrigatório):** ID do usuário associado ao locatário
- **nome_completo_locatario (obrigatório):** Nome completo do locatário
- **email (obrigatório):** Email do locatário
- **numero_telefone (obrigatório):** Número de telefone do locatário
- **nacionalidade (obrigatório):** Nacionalidade do locatário
- **cpf (obrigatório):** Número do CPF do locatário
- **rg (obrigatório):** Número do RG do locatário
- **passaporte (opcional):** Número do passaporte do locatário
- **endereco (obrigatório):** Endereço do locatário

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/locatarios
Content-Type: application/json

{
  "id_usuarios": 2,
  "nome_completo_locatario": "Maria Oliveira",
  "email": "mariaoliveira@example.com",
  "numero_telefone": 21987654321,
  "nacionalidade": "Brasileira",
  "cpf": 123456789,
  "rg": 98765432,
  "passaporte": null,
  "endereco": "Rua das Margaridas, 789"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_usuarios": 2,
  "nome_completo_locatario": "Maria Oliveira",
  "email": "mariaoliveira@example.com",
  "numero_telefone": 21987654321,
  "nacionalidade": "Brasileira",
  "cpf": 123456789,
  "rg": 98765432,
  "passaporte": null,
  "endereco": "Rua das Margaridas, 789"
}
```

**Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "ID do usuário não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Criar Administrador

**Endpoint:** `/administradores`  
**Método HTTP:** `POST`  
**Descrição:** Cria um novo administrador

**Parâmetros do Corpo da Requisição:**

- **email (obrigatório):** Email do administrador
- **tipo_adm (obrigatório):** Tipo de administrador (ex: gerente)
- **senha (obrigatório):** Senha do administrador

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/administradores
Content-Type: application/json

{
  "email": "admin@example.com",
  "tipo_adm": "gerente",
  "senha": "senhaadmin"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "email": "admin@example.com",
  "tipo_adm": "gerente",
  "senha": "senhaadmin"
}
```

**Código de Status:** `201 Created`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Email já cadastrado"
}
```

**Código de Status:** `400 Bad Request`  
**Tipo de Resposta:** `application/json`


### Recuperação de Senha

**Endpoint:** `/recuperar-senha`  
**Método HTTP:** `POST`  
**Descrição:** Inicia o processo de recuperação de senha, enviando um email com instruções para redefinição.

**Parâmetros do Corpo da Requisição:**

- **email (obrigatório):** Email do usuário para o qual será enviado o link de recuperação

**Exemplo de Requisição:**

```http
POST https://api.exemplo.com/v1/recuperar-senha
Content-Type: application/json

{
  "email": "usuario@example.com"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "message": "Instruções para recuperação de senha foram enviadas para o email fornecido."
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Email não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

## Método HTTP PUT

### Atualizar Status do Aluguel

**Endpoint:** `/aluguels/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza o status de um aluguel

**Parâmetros do Corpo da Requisição:**

- **id_pagamentos (obrigatório):** ID do pagamento associado ao aluguel
- **id_contratos (obrigatório):** ID do contrato associado ao aluguel
- **status (obrigatório):** Status do aluguel (true para ativo, false para inativo)

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/aluguels/{id}
Content-Type: application/json

{
  "id_pagamentos": 1,
  "id_contratos": 1,
  "status": true
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_pagamentos": 1,
  "id_contratos": 1,
  "status": true
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "ID do pagamento ou contrato não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Usuário

**Endpoint:** `/usuarios/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um usuário

**Parâmetros do Corpo da Requisição:**

- **email (opcional):** Email do usuário
- **senha (opcional):** Senha do usuário
- **tipo_usuario (opcional):** Tipo de usuário (ex: administrador)
- **ativo (opcional):** Status do usuário (true para ativo, false para inativo)
- **data_de_criacao (opcional):** Data e hora de criação do usuário (formato ISO 8601)

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/usuarios/{id}
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "novaSenha123",
  "tipo_usuario": "administrador",
  "ativo": true,
  "data_de_criacao": "2024-07-27T12:00:00Z"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "3",
  "email": "usuario@example.com",
  "tipo_usuario": "administrador",
  "ativo": true,
  "data_de_criacao": "2024-07-27T12:00:00Z"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Usuário não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Imóvel

**Endpoint:** `/imoveis/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um imóvel

**Parâmetros do Corpo da Requisição:**

- **tipo_imovel (opcional):** Tipo de imóvel (ex: Apartamento)
- **cep (opcional):** CEP do imóvel
- **condominio (opcional):** Valor do condomínio
- **valor_imovel (opcional):** Valor do imóvel
- **bairro (opcional):** Bairro onde o imóvel está localizado
- **endereco_imovel (opcional):** Endereço completo do imóvel
- **descricao (opcional):** Descrição detalhada do imóvel

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/imoveis/{id}
Content-Type: application/json

{
  "tipo_imovel": "Apartamento",
  "cep": 12345678,
  "condominio": 500,
  "valor_imovel": 300000.00,
  "bairro": "Centro",
  "endereco_imovel": "Rua das Flores, 123",
  "descricao": "Apartamento com 2 quartos e 2 banheiros."
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "tipo_imovel": "Apartamento",
  "cep": 12345678,
  "condominio": 500,
  "valor_imovel": 300000.00,
  "bairro": "Centro",
  "endereco_imovel": "Rua das Flores, 123",
  "descricao": "Apartamento com 2 quartos e 2 banheiros."
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Imóvel não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Pagamento

**Endpoint:** `/pagamentos/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um pagamento

**Parâmetros do Corpo da Requisição:**

- **id_contratos (opcional):** ID do contrato associado ao pagamento
- **valor (opcional):** Valor do pagamento
- **data (opcional):** Data do pagamento (formato ISO 8601)
- **pagante (opcional):** Nome do pagante
- **metodo_pagamento (opcional):** Método de pagamento (ex: Transferência bancária)
- **recebedor (opcional):** Nome do recebedor
- **tipo_pagamento (opcional):** Tipo de pagamento (ex: Aluguel)

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/pagamentos/{id}
Content-Type: application/json

{
  "id_contratos": 1,
  "valor": 1500.00,
  "data": "2024-07-27",
  "pagante": "Locatário XYZ",
  "metodo_pagamento": "Transferência bancária",
  "recebedor": "Locador ABC",
  "tipo_pagamento": "Aluguel"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_contratos": 1,
  "valor": 1500.00,
  "data": "2024-07-27",
  "pagante": "Locatário XYZ",
  "metodo_pagamento": "Transferência bancária",
  "recebedor": "Locador ABC",
  "tipo_pagamento": "Aluguel"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Pagamento não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Contrato de Aluguel

**Endpoint:** `/contratos/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um contrato de aluguel

**Parâmetros do Corpo da Requisição:**

- **valor_aluguel (opcional):** Valor do aluguel
- **data_inicio (opcional):** Data de início do contrato (formato ISO 8601)
- **data_fim (opcional):** Data de término do contrato (formato ISO 8601)
- **id_locadores (opcional):** ID do locador
- **id_locatarios (opcional):** ID do locatário
- **id_imoveis (opcional):** ID do imóvel
- **condicoes_especiais (opcional):** Condições especiais do contrato
- **multa_prazo (opcional):** Valor da multa por atraso no pagamento
- **status (opcional):** Status do contrato (true para ativo, false para inativo)
- **iptu (opcional):** Valor do IPTU
- **data_pagamento (opcional):** Data de pagamento (formato ISO 8601)
- **ativo (opcional):** Indica se o contrato está ativo (true para ativo, false para inativo)
- **data_recisao (opcional):** Data de rescisão do contrato (formato ISO 8601)
- **taxa_adm (opcional):** Valor da taxa administrativa
- **valor_reajuste (opcional):** Valor do reajuste anual do aluguel

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/contratos/{id}
Content-Type: application/json

{
  "valor_aluguel": "1200.00",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31",
  "id_locadores": 1,
  "id_locatarios": 2,
  "id_imoveis": 3,
  "condicoes_especiais": "Nenhuma",
  "multa_prazo": 200,
  "status": true,
  "iptu": 100.00,
  "data_pagamento": "2024-01-05T00:00:00Z",
  "ativo": true,
  "data_recisao": null,
  "taxa_adm": 10.00,
  "valor_reajuste": 50.00
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "valor_aluguel": "1200.00",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31",
  "id_locadores": 1,
  "id_locatarios": 2,
  "id_imoveis": 3,
  "condicoes_especiais": "Nenhuma",
  "multa_prazo": 200,
  "status": true,
  "iptu": 100.00,
  "data_pagamento": "2024-01-05T00:00:00Z",
  "ativo": true,
  "data_recisao": null,
  "taxa_adm": 10.00,
  "valor_reajuste": 50.00
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Contrato não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Locador

**Endpoint:** `/locadores/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um locador

**Parâmetros do Corpo da Requisição:**

- **id_imoveis (opcional):** ID do imóvel associado ao locador
- **nome_completo_locador (opcional):** Nome completo do locador
- **endereco (opcional):** Endereço do locador
- **passaporte (opcional):** Número do passaporte do locador
- **rg (opcional):** Número do RG do locador
- **cpf (opcional):** Número do CPF do locador
- **nacionalidade (opcional):** Nacionalidade do locador
- **numero_telefone (opcional):** Número de telefone do locador
- **email (opcional):** Email do loc

ador
- **id_usuarios (opcional):** ID do usuário associado ao locador
- **pessoa_juridica (opcional):** Indica se o locador é pessoa jurídica (true para sim, false para não)
- **cnpj (opcional):** Número do CNPJ, caso o locador seja pessoa jurídica

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/locadores/{id}
Content-Type: application/json

{
  "id_imoveis": 1,
  "nome_completo_locador": "João Silva",
  "endereco": "Rua das Laranjeiras, 456",
  "passaporte": null,
  "rg": 12345678,
  "cpf": 987654321,
  "nacionalidade": "Brasileira",
  "numero_telefone": 11987654321,
  "email": "joaosilva@example.com",
  "id_usuarios": 1,
  "pessoa_juridica": false,
  "cnpj": null
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_imoveis": 1,
  "nome_completo_locador": "João Silva",
  "endereco": "Rua das Laranjeiras, 456",
  "passaporte": null,
  "rg": 12345678,
  "cpf": 987654321,
  "nacionalidade": "Brasileira",
  "numero_telefone": 11987654321,
  "email": "joaosilva@example.com",
  "id_usuarios": 1,
  "pessoa_juridica": false,
  "cnpj": null
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Locador não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Locatário

**Endpoint:** `/locatarios/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um locatário

**Parâmetros do Corpo da Requisição:**

- **id_usuarios (opcional):** ID do usuário associado ao locatário
- **nome_completo_locatario (opcional):** Nome completo do locatário
- **email (opcional):** Email do locatário
- **numero_telefone (opcional):** Número de telefone do locatário
- **nacionalidade (opcional):** Nacionalidade do locatário
- **cpf (opcional):** Número do CPF do locatário
- **rg (opcional):** Número do RG do locatário
- **passaporte (opcional):** Número do passaporte do locatário
- **endereco (opcional):** Endereço do locatário

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/locatarios/{id}
Content-Type: application/json

{
  "id_usuarios": 2,
  "nome_completo_locatario": "Maria Oliveira",
  "email": "mariaoliveira@example.com",
  "numero_telefone": 21987654321,
  "nacionalidade": "Brasileira",
  "cpf": 123456789,
  "rg": 98765432,
  "passaporte": null,
  "endereco": "Rua das Margaridas, 789"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_usuarios": 2,
  "nome_completo_locatario": "Maria Oliveira",
  "email": "mariaoliveira@example.com",
  "numero_telefone": 21987654321,
  "nacionalidade": "Brasileira",
  "cpf": 123456789,
  "rg": 98765432,
  "passaporte": null,
  "endereco": "Rua das Margaridas, 789"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Locatário não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Atualizar Administrador

**Endpoint:** `/administradores/{id}`  
**Método HTTP:** `PUT`  
**Descrição:** Atualiza as informações de um administrador

**Parâmetros do Corpo da Requisição:**

- **email (opcional):** Email do administrador
- **tipo_adm (opcional):** Tipo de administrador (ex: gerente)
- **senha (opcional):** Senha do administrador

**Exemplo de Requisição:**

```http
PUT https://api.exemplo.com/v1/administradores/{id}
Content-Type: application/json

{
  "email": "admin@example.com",
  "tipo_adm": "gerente",
  "senha": "novaSenhaAdmin"
}
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "email": "admin@example.com",
  "tipo_adm": "gerente",
  "senha": "novaSenhaAdmin"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Administrador não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

## Método HTTP GET

### Listar Usuários

**Endpoint:** `/usuarios`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os usuários

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/usuarios
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "nome": "João Silva",
    "email": "joao.silva@example.com"
  },
  {
    "id": "2",
    "nome": "Maria Souza",
    "email": "maria.souza@example.com"
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Usuário por ID

**Endpoint:** `/usuarios/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um usuário pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do usuário a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/usuarios/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "nome": "João Silva",
  "email": "joao.silva@example.com"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Usuário não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Listar Imóveis

**Endpoint:** `/imoveis`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os imóveis

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/imoveis
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "tipo_imovel": "Apartamento",
    "cep": 12345678,
    "condominio": 500,
    "valor_imovel": 300000.00,
    "bairro": "Centro",
    "endereco_imovel": "Rua das Flores, 123",
    "descricao": "Apartamento com 2 quartos e 2 banheiros."
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Imóvel por ID

**Endpoint:** `/imoveis/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um imóvel pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do imóvel a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/imoveis/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "tipo_imovel": "Apartamento",
  "cep": 12345678,
  "condominio": 500,
  "valor_imovel": 300000.00,
  "bairro": "Centro",
  "endereco_imovel": "Rua das Flores, 123",
  "descricao": "Apartamento com 2 quartos e 2 banheiros."
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Imóvel não

 encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Listar Pagamentos

**Endpoint:** `/pagamentos`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os pagamentos

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/pagamentos
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "id_contratos": 1,
    "valor": 1500.00,
    "data": "2024-07-27",
    "pagante": "Locatário XYZ",
    "metodo_pagamento": "Transferência bancária",
    "recebedor": "Locador ABC",
    "tipo_pagamento": "Aluguel"
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Pagamento por ID

**Endpoint:** `/pagamentos/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um pagamento pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do pagamento a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/pagamentos/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_contratos": 1,
  "valor": 1500.00,
  "data": "2024-07-27",
  "pagante": "Locatário XYZ",
  "metodo_pagamento": "Transferência bancária",
  "recebedor": "Locador ABC",
  "tipo_pagamento": "Aluguel"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Pagamento não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Listar Contratos de Aluguel

**Endpoint:** `/contratos`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os contratos de aluguel

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/contratos
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "valor_aluguel": "1200.00",
    "data_inicio": "2024-01-01",
    "data_fim": "2024-12-31",
    "id_locadores": 1,
    "id_locatarios": 2,
    "id_imoveis": 3,
    "condicoes_especiais": "Nenhuma",
    "multa_prazo": 200,
    "status": true,
    "iptu": 100.00,
    "data_pagamento": "2024-01-05T00:00:00Z",
    "ativo": true,
    "data_recisao": null,
    "taxa_adm": 10.00,
    "valor_reajuste": 50.00
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Contrato de Aluguel por ID

**Endpoint:** `/contratos/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um contrato de aluguel pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do contrato a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/contratos/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "valor_aluguel": "1200.00",
  "data_inicio": "2024-01-01",
  "data_fim": "2024-12-31",
  "id_locadores": 1,
  "id_locatarios": 2,
  "id_imoveis": 3,
  "condicoes_especiais": "Nenhuma",
  "multa_prazo": 200,
  "status": true,
  "iptu": 100.00,
  "data_pagamento": "2024-01-05T00:00:00Z",
  "ativo": true,
  "data_recisao": null,
  "taxa_adm": 10.00,
  "valor_reajuste": 50.00
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Contrato não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Listar Locadores

**Endpoint:** `/locadores`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os locadores

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/locadores
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "id_imoveis": 1,
    "nome_completo_locador": "João Silva",
    "endereco": "Rua das Laranjeiras, 456",
    "passaporte": null,
    "rg": 12345678,
    "cpf": 987654321,
    "nacionalidade": "Brasileira",
    "numero_telefone": 11987654321,
    "email": "joaosilva@example.com",
    "id_usuarios": 1,
    "pessoa_juridica": false,
    "cnpj": null
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Locador por ID

**Endpoint:** `/locadores/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um locador pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do locador a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/locadores/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_imoveis": 1,
  "nome_completo_locador": "João Silva",
  "endereco": "Rua das Laranjeiras, 456",
  "passaporte": null,
  "rg": 12345678,
  "cpf": 987654321,
  "nacionalidade": "Brasileira",
  "numero_telefone": 11987654321,
  "email": "joaosilva@example.com",
  "id_usuarios": 1,
  "pessoa_juridica": false,
  "cnpj": null
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Locador não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Listar Locatários

**Endpoint:** `/locatarios`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os locatários

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/locatarios
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "id_usuarios": 2,
    "nome_completo_locatario": "Maria Oliveira",
    "email": "mariaoliveira@example.com",
    "numero_telefone": 21987654321,
    "nacionalidade": "Brasileira",
    "cpf": 123456789,
    "rg": 98765432,
    "passaporte": null,
    "endereco": "Rua das Margaridas, 789"
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Locatário por ID

**Endpoint:** `/locatarios/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um locatário pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do locatário a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/locatarios/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "id_usuarios": 2,
  "nome_completo_locatario": "Maria Oliveira",
  "email": "mariaoliveira@example.com",
  "numero_telefone": 21987654321,
  "nacionalidade": "Brasileira",
  "cpf": 123456789,
  "rg

": 98765432,
  "passaporte": null,
  "endereco": "Rua das Margaridas, 789"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Locatário não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`

### Listar Administradores

**Endpoint:** `/administradores`  
**Método HTTP:** `GET`  
**Descrição:** Lista todos os administradores

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/administradores
```

**Exemplo de Resposta de Sucesso:**

```json
[
  {
    "id": "1",
    "email": "admin@example.com",
    "tipo_adm": "gerente",
    "senha": "senhaadmin"
  }
]
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

### Obter Administrador por ID

**Endpoint:** `/administradores/{id}`  
**Método HTTP:** `GET`  
**Descrição:** Obtém um administrador pelo ID

**Parâmetros:**

- **id (obrigatório):** ID do administrador a ser obtido

**Exemplo de Requisição:**

```http
GET https://api.exemplo.com/v1/administradores/1
```

**Exemplo de Resposta de Sucesso:**

```json
{
  "id": "1",
  "email": "admin@example.com",
  "tipo_adm": "gerente",
  "senha": "senhaadmin"
}
```

**Código de Status:** `200 OK`  
**Tipo de Resposta:** `application/json`

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Administrador não encontrado"
}
```

**Código de Status:** `404 Not Found`  
**Tipo de Resposta:** `application/json`